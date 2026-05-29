import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function MenuEditor() {
  const router = useRouter();
  const { slug } = router.query;

  const [pinEntered, setPinEntered] = useState(false);
  const [pin, setPin] = useState('');
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Business level
  const [business, setBusiness] = useState({ name: '', tagline: '', phone: '', website: '', address: '', about: '' });
  const [gallery, setGallery] = useState([]);
  const [sides, setSides] = useState([]);
  const [dailyFeatures, setDailyFeatures] = useState([]);

  // Area management
  const [areas, setAreas] = useState([]);
  const [selectedAreaId, setSelectedAreaId] = useState(null);
  const [newAreaName, setNewAreaName] = useState('');
  const [tab, setTab] = useState('menu');

  // Current tab state (menu, drinks, specials, etc.)
  const [editingSection, setEditingSection] = useState(null);
  const [newSectionName, setNewSectionName] = useState('');
  const [newSectionTime, setNewSectionTime] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [newItem, setNewItem] = useState({ section_id: '', name: '', description: '', price: '', images: [] });

  // Image upload
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageLabel, setImageLabel] = useState('Grilled');
  const fileInputRef = useRef(null);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // Initialize
  useEffect(() => {
    if (!slug) return;
    const newAreaId = Math.random().toString(36).substr(2, 9);
    setSelectedAreaId(newAreaId);
    setAreas([{ id: newAreaId, name: 'Main Restaurant', hours: days.reduce((acc, day) => ({ ...acc, [day]: { open: '09:00', close: '22:00' } }), {}), menu_sections: [], drink_sections: [], specials: [], daily_specials: {}, events: [] }]);
  }, [slug]);

  const handlePinSubmit = async (e) => {
    e.preventDefault();
    if (!slug) {
      alert('No business selected');
      return;
    }
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/menu-editor/${slug}/auth`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin })
      });
      if (!res.ok) {
        const err = await res.json();
        alert(err.error || 'Invalid PIN');
        setPin('');
        setLoading(false);
        return;
      }
      const data = await res.json();
      setToken(data.token);
      setPinEntered(true);
      setLoading(false);
    } catch (err) {
      alert('Error: ' + err.message);
      setLoading(false);
    }
  };

  const handleImageUpload = async (e, targetItem) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('label', imageLabel);

      const res = await fetch(`${API_URL}/api/menu-editor/${slug}/upload`, {
        method: 'POST',
        headers: { 'x-menu-token': token },
        body: formData
      });
      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();

      // Add image to item
      if (editingItem && editingItem.id === targetItem.id) {
        setEditingItem({ ...editingItem, images: [...(editingItem.images || []), { url: data.url, label: imageLabel }] });
      } else if (!editingItem) {
        setNewItem({ ...newItem, images: [...newItem.images, { url: data.url, label: imageLabel }] });
      }
      setImageLabel('Grilled');
      setUploadingImage(false);
    } catch (err) {
      alert('Error uploading image: ' + err.message);
      setUploadingImage(false);
    }
  };

  const getSectionField = (tabType) => tabType === 'menu' ? 'menu_sections' : tabType === 'drinks' ? 'drink_sections' : 'menu_sections';

  const addSection = (tabType = tab) => {
    if (!newSectionName.trim() || !selectedAreaId) return;
    const field = getSectionField(tabType);
    const newSection = { id: Math.random().toString(36).substr(2, 9), name: newSectionName, time_range: newSectionTime, items: [] };
    setAreas(areas.map(a => a.id === selectedAreaId ? { ...a, [field]: [...a[field], newSection] } : a));
    setNewSectionName('');
    setNewSectionTime('');
  };

  const deleteSection = (sectionId, tabType = tab) => {
    const field = getSectionField(tabType);
    setAreas(areas.map(a => a.id === selectedAreaId ? { ...a, [field]: a[field].filter(s => s.id !== sectionId) } : a));
  };

  const addItem = (tabType = tab) => {
    if (!newItem.name || !newItem.price || !newItem.section_id) {
      alert('Fill required fields');
      return;
    }
    const field = getSectionField(tabType);
    const area = areas.find(a => a.id === selectedAreaId);
    const section = area?.[field].find(s => s.id === newItem.section_id);
    if (!section) return;

    const item = { id: Math.random().toString(36).substr(2, 9), ...newItem, images: newItem.images || [] };
    setAreas(areas.map(a => a.id === selectedAreaId ? { ...a, [field]: a[field].map(s => s.id === newItem.section_id ? { ...s, items: [...s.items, item] } : s) } : a));
    setNewItem({ section_id: '', name: '', description: '', price: '', images: [] });
  };

  const updateItem = (tabType = tab) => {
    if (!editingItem.name || !editingItem.price) {
      alert('Fill required fields');
      return;
    }
    const field = getSectionField(tabType);
    setAreas(areas.map(a => a.id === selectedAreaId ? { ...a, [field]: a[field].map(s => s.id === editingItem.section_id ? { ...s, items: s.items.map(i => i.id === editingItem.id ? editingItem : i) } : s) } : a));
    setEditingItem(null);
  };

  const deleteItem = (sectionId, itemId, tabType = tab) => {
    const field = getSectionField(tabType);
    setAreas(areas.map(a => a.id === selectedAreaId ? { ...a, [field]: a[field].map(s => s.id === sectionId ? { ...s, items: s.items.filter(i => i.id !== itemId) } : s) } : a));
  };

  const deleteImage = (itemId, imageIndex, isSectionItem = true) => {
    if (editingItem && editingItem.id === itemId) {
      setEditingItem({ ...editingItem, images: editingItem.images.filter((_, i) => i !== imageIndex) });
    } else if (!isSectionItem) {
      setNewItem({ ...newItem, images: newItem.images.filter((_, i) => i !== imageIndex) });
    }
  };

  const addArea = () => {
    if (!newAreaName.trim()) return;
    const newAreaId = Math.random().toString(36).substr(2, 9);
    setAreas([...areas, {
      id: newAreaId,
      name: newAreaName,
      hours: days.reduce((acc, day) => ({ ...acc, [day]: { open: '09:00', close: '22:00' } }), {}),
      menu_sections: [],
      drink_sections: [],
      specials: [],
      daily_specials: {},
      events: []
    }]);
    setSelectedAreaId(newAreaId);
    setNewAreaName('');
  };

  const handleSave = async () => {
    if (!slug || !token) {
      alert('Not authenticated');
      return;
    }
    try {
      setSaving(true);
      const payload = { business, gallery, sides, dailyFeatures, areas };
      const res = await fetch(`${API_URL}/api/menu-editor/${slug}/save`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-menu-token': token },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('Save failed');
      alert('✅ Saved!');
      setSaving(false);
    } catch (err) {
      alert('Error saving: ' + err.message);
      setSaving(false);
    }
  };

  if (!pinEntered) {
    return (
      <div className={styles.pinScreen}>
        <div className={styles.pinBox}>
          <h1>🔐 Menu Editor</h1>
          <p>Enter PIN to continue</p>
          <form onSubmit={handlePinSubmit}>
            <input type="password" value={pin} onChange={(e) => setPin(e.target.value)} placeholder="Enter PIN" maxLength="6" autoFocus disabled={loading} />
            <button type="submit" disabled={loading}>{loading ? 'Unlocking...' : 'Unlock'}</button>
          </form>
        </div>
      </div>
    );
  }

  const selectedArea = areas.find(a => a.id === selectedAreaId);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <input type="text" placeholder="Business Name" value={business.name} onChange={(e) => setBusiness({...business, name: e.target.value})} style={{fontSize: 28, fontWeight: 700, background: 'transparent', border: 'none', color: '#f1f5f9', marginBottom: 8, width: '100%'}} />
          <input type="text" placeholder="Tagline" value={business.tagline} onChange={(e) => setBusiness({...business, tagline: e.target.value})} style={{fontSize: 14, background: 'transparent', border: 'none', color: '#b9d5de', width: '100%'}} />
        </div>
      </header>

      <div style={{borderBottom: '1px solid rgba(255,255,255,.1)', display: 'flex', gap: 8, padding: '12px 20px', overflowX: 'auto'}}>
        {areas.map(area => (
          <button key={area.id} onClick={() => setSelectedAreaId(area.id)} style={{padding: '8px 16px', background: selectedAreaId === area.id ? '#0b7a75' : '#1e293b', color: '#f1f5f9', border: 'none', borderRadius: 6, cursor: 'pointer', whiteSpace: 'nowrap'}}>
            {area.name}
          </button>
        ))}
        <button onClick={() => document.getElementById('newAreaInput').focus()} style={{padding: '8px 12px', background: '#1e293b', color: '#f1f5f9', border: '1px dashed rgba(255,255,255,.3)', borderRadius: 6, cursor: 'pointer'}}>+ Add Area</button>
      </div>

      {selectedArea && (
        <>
          <div style={{padding: '12px 20px', borderBottom: '1px solid rgba(255,255,255,.1)'}}>
            <input id="newAreaInput" type="text" placeholder="New area name" value={newAreaName} onChange={(e) => setNewAreaName(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addArea()} style={{padding: '8px 12px', background: '#1e293b', color: '#f1f5f9', border: '1px solid rgba(255,255,255,.15)', borderRadius: 6, width: '100%', maxWidth: 300}} />
          </div>

          <div style={{display: 'flex', gap: 8, padding: '12px 20px', borderBottom: '1px solid rgba(255,255,255,.1)', overflowX: 'auto'}}>
            {['menu', 'drinks', 'specials', 'daily', 'events', 'hours'].map(t => (
              <button key={t} onClick={() => setTab(t)} style={{padding: '8px 12px', background: tab === t ? '#0b7a75' : '#1e293b', color: '#f1f5f9', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: tab === t ? 600 : 400}}>
                {t === 'menu' && '🍽️'}{t === 'drinks' && '🥤'}{t === 'specials' && '⭐'}{t === 'daily' && '📅'}{t === 'events' && '🎉'}{t === 'hours' && '🕐'} {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          <div style={{padding: '20px', flex: 1, overflowY: 'auto'}}>
            {tab === 'menu' && (
              <>
                <h2>Menu Sections</h2>
                <div style={{display: 'flex', gap: 8, marginBottom: 20}}>
                  <input type="text" placeholder="Section name (Seafood, Breakfast, etc.)" value={newSectionName} onChange={(e) => setNewSectionName(e.target.value)} style={{flex: 1, padding: 10, background: '#1e293b', color: '#f1f5f9', border: '1px solid rgba(255,255,255,.15)', borderRadius: 8}} />
                  <input type="text" placeholder="Time range (e.g. 11am-3pm)" value={newSectionTime} onChange={(e) => setNewSectionTime(e.target.value)} style={{flex: 1, padding: 10, background: '#1e293b', color: '#f1f5f9', border: '1px solid rgba(255,255,255,.15)', borderRadius: 8}} />
                  <button onClick={addSection} style={{padding: '10px 16px', background: '#0b7a75', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600}}>Add Section</button>
                </div>

                {selectedArea.menu_sections.map(section => (
                  <div key={section.id} style={{background: '#1e293b', padding: 16, borderRadius: 8, marginBottom: 20}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12}}>
                      <div>
                        <h3 style={{margin: 0}}>{section.name}</h3>
                        {section.time_range && <p style={{margin: '4px 0 0 0', fontSize: 12, color: '#94a3b8'}}>{section.time_range}</p>}
                      </div>
                      <button onClick={() => deleteSection(section.id)} style={{padding: '6px 12px', background: '#dc2626', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 12}}>Delete</button>
                    </div>

                    <div style={{background: '#0f172a', padding: 12, borderRadius: 6, marginBottom: 12}}>
                      <h4 style={{margin: '0 0 12px 0'}}>Add Item</h4>
                      <input type="text" placeholder="Item name" value={newItem.section_id === section.id ? newItem.name : ''} onChange={(e) => newItem.section_id === section.id && setNewItem({...newItem, name: e.target.value})} style={{width: '100%', padding: 8, background: '#1e293b', color: '#f1f5f9', border: '1px solid rgba(255,255,255,.15)', borderRadius: 6, marginBottom: 8}} />
                      <textarea placeholder="Description" value={newItem.section_id === section.id ? newItem.description : ''} onChange={(e) => newItem.section_id === section.id && setNewItem({...newItem, description: e.target.value})} style={{width: '100%', padding: 8, background: '#1e293b', color: '#f1f5f9', border: '1px solid rgba(255,255,255,.15)', borderRadius: 6, marginBottom: 8, height: 60}} />
                      <input type="text" placeholder="Price" value={newItem.section_id === section.id ? newItem.price : ''} onChange={(e) => newItem.section_id === section.id && setNewItem({...newItem, price: e.target.value})} style={{width: '100%', padding: 8, background: '#1e293b', color: '#f1f5f9', border: '1px solid rgba(255,255,255,.15)', borderRadius: 6, marginBottom: 8}} />
                      <button onClick={() => setNewItem({...newItem, section_id: section.id})} style={{width: '100%', padding: 8, background: '#0b7a75', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer', marginBottom: 8}}>Select This Section</button>
                      <button onClick={() => fileInputRef.current?.click()} disabled={uploadingImage} style={{width: '100%', padding: 8, background: uploadingImage ? '#64748b' : '#1e293b', color: '#f1f5f9', border: '1px dashed rgba(255,255,255,.3)', borderRadius: 6, cursor: uploadingImage ? 'not-allowed' : 'pointer', marginBottom: 8}}>
                        {uploadingImage ? 'Uploading...' : '+ Add Image'}
                      </button>
                      <input ref={fileInputRef} type="file" accept="image/*" onChange={(e) => handleImageUpload(e, newItem)} style={{display: 'none'}} />
                      <div style={{display: 'flex', gap: 8, marginBottom: 8}}>
                        {newItem.images.map((img, idx) => (
                          <div key={idx} style={{position: 'relative', width: 60, height: 60}}>
                            <img src={img.url} alt="preview" style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: 4}} />
                            <div style={{fontSize: 10, color: '#94a3b8', marginTop: 2}}>{img.label}</div>
                            <button onClick={() => deleteImage(newItem.id, idx, false)} style={{position: 'absolute', top: -4, right: -4, background: '#dc2626', color: 'white', border: 'none', borderRadius: '50%', width: 20, height: 20, cursor: 'pointer', fontSize: 10}}>✕</button>
                          </div>
                        ))}
                      </div>
                      <div style={{display: 'flex', gap: 8}}>
                        <select value={imageLabel} onChange={(e) => setImageLabel(e.target.value)} style={{flex: 1, padding: 8, background: '#1e293b', color: '#f1f5f9', border: '1px solid rgba(255,255,255,.15)', borderRadius: 6}}>
                          <option>Grilled</option>
                          <option>Blackened</option>
                          <option>Fried</option>
                          <option>Steamed</option>
                          <option>Baked</option>
                        </select>
                        <button onClick={addItem} style={{flex: 1, padding: 8, background: '#0b7a75', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer'}}>Save Item</button>
                      </div>
                    </div>

                    {section.items.length > 0 && (
                      <>
                        <h4 style={{margin: '12px 0 8px 0'}}>Items</h4>
                        {section.items.map(item => (
                          <div key={item.id} style={{background: '#1e293b', padding: 12, borderRadius: 6, marginBottom: 8}}>
                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'start'}}>
                              <div style={{flex: 1}}>
                                <h5 style={{margin: '0 0 4px 0'}}>{item.name}</h5>
                                <p style={{margin: '0 0 4px 0', fontSize: 12, color: '#94a3b8'}}>{item.description}</p>
                                <p style={{margin: 0, fontWeight: 600}}>{item.price}</p>
                                {item.images.length > 0 && (
                                  <div style={{display: 'flex', gap: 6, marginTop: 8}}>
                                    {item.images.map((img, idx) => (
                                      <div key={idx} style={{width: 40, height: 40, borderRadius: 4, overflow: 'hidden'}}>
                                        <img src={img.url} alt="item" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                              <div style={{display: 'flex', gap: 6}}>
                                <button onClick={() => setEditingItem(item)} style={{padding: '6px 10px', background: '#0b7a75', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 12}}>Edit</button>
                                <button onClick={() => deleteItem(section.id, item.id)} style={{padding: '6px 10px', background: '#dc2626', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 12}}>Delete</button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                ))}
              </>
            )}

            {tab === 'drinks' && (
              <>
                <h2>Drink Sections</h2>
                <div style={{display: 'flex', gap: 8, marginBottom: 20}}>
                  <input type="text" placeholder="Section name (Cocktails, Beer, Wine, Coffee, etc.)" value={newSectionName} onChange={(e) => setNewSectionName(e.target.value)} style={{flex: 1, padding: 10, background: '#1e293b', color: '#f1f5f9', border: '1px solid rgba(255,255,255,.15)', borderRadius: 8}} />
                  <input type="text" placeholder="Time range (e.g. Happy Hour 4pm-7pm)" value={newSectionTime} onChange={(e) => setNewSectionTime(e.target.value)} style={{flex: 1, padding: 10, background: '#1e293b', color: '#f1f5f9', border: '1px solid rgba(255,255,255,.15)', borderRadius: 8}} />
                  <button onClick={() => addSection('drinks')} style={{padding: '10px 16px', background: '#0b7a75', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600}}>Add Section</button>
                </div>

                {selectedArea.drink_sections.map(section => (
                  <div key={section.id} style={{background: '#1e293b', padding: 16, borderRadius: 8, marginBottom: 20}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12}}>
                      <div>
                        <h3 style={{margin: 0}}>{section.name}</h3>
                        {section.time_range && <p style={{margin: '4px 0 0 0', fontSize: 12, color: '#94a3b8'}}>{section.time_range}</p>}
                      </div>
                      <button onClick={() => deleteSection(section.id, 'drinks')} style={{padding: '6px 12px', background: '#dc2626', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 12}}>Delete</button>
                    </div>

                    <div style={{background: '#0f172a', padding: 12, borderRadius: 6, marginBottom: 12}}>
                      <h4 style={{margin: '0 0 12px 0'}}>Add Item</h4>
                      <input type="text" placeholder="Item name" value={newItem.section_id === section.id ? newItem.name : ''} onChange={(e) => newItem.section_id === section.id && setNewItem({...newItem, name: e.target.value})} style={{width: '100%', padding: 8, background: '#1e293b', color: '#f1f5f9', border: '1px solid rgba(255,255,255,.15)', borderRadius: 6, marginBottom: 8}} />
                      <textarea placeholder="Description" value={newItem.section_id === section.id ? newItem.description : ''} onChange={(e) => newItem.section_id === section.id && setNewItem({...newItem, description: e.target.value})} style={{width: '100%', padding: 8, background: '#1e293b', color: '#f1f5f9', border: '1px solid rgba(255,255,255,.15)', borderRadius: 6, marginBottom: 8, height: 60}} />
                      <input type="text" placeholder="Price" value={newItem.section_id === section.id ? newItem.price : ''} onChange={(e) => newItem.section_id === section.id && setNewItem({...newItem, price: e.target.value})} style={{width: '100%', padding: 8, background: '#1e293b', color: '#f1f5f9', border: '1px solid rgba(255,255,255,.15)', borderRadius: 6, marginBottom: 8}} />
                      <button onClick={() => setNewItem({...newItem, section_id: section.id})} style={{width: '100%', padding: 8, background: '#0b7a75', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer', marginBottom: 8}}>Select This Section</button>
                      <button onClick={() => fileInputRef.current?.click()} disabled={uploadingImage} style={{width: '100%', padding: 8, background: uploadingImage ? '#64748b' : '#1e293b', color: '#f1f5f9', border: '1px dashed rgba(255,255,255,.3)', borderRadius: 6, cursor: uploadingImage ? 'not-allowed' : 'pointer', marginBottom: 8}}>
                        {uploadingImage ? 'Uploading...' : '+ Add Image'}
                      </button>
                      <input ref={fileInputRef} type="file" accept="image/*" onChange={(e) => handleImageUpload(e, newItem)} style={{display: 'none'}} />
                      <div style={{display: 'flex', gap: 8, marginBottom: 8}}>
                        {newItem.images.map((img, idx) => (
                          <div key={idx} style={{position: 'relative', width: 60, height: 60}}>
                            <img src={img.url} alt="preview" style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: 4}} />
                            <div style={{fontSize: 10, color: '#94a3b8', marginTop: 2}}>{img.label}</div>
                            <button onClick={() => deleteImage(newItem.id, idx, false)} style={{position: 'absolute', top: -4, right: -4, background: '#dc2626', color: 'white', border: 'none', borderRadius: '50%', width: 20, height: 20, cursor: 'pointer', fontSize: 10}}>✕</button>
                          </div>
                        ))}
                      </div>
                      <div style={{display: 'flex', gap: 8}}>
                        <select value={imageLabel} onChange={(e) => setImageLabel(e.target.value)} style={{flex: 1, padding: 8, background: '#1e293b', color: '#f1f5f9', border: '1px solid rgba(255,255,255,.15)', borderRadius: 6}}>
                          <option>Grilled</option>
                          <option>Blackened</option>
                          <option>Fried</option>
                          <option>Steamed</option>
                          <option>Baked</option>
                        </select>
                        <button onClick={() => addItem('drinks')} style={{flex: 1, padding: 8, background: '#0b7a75', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer'}}>Save Item</button>
                      </div>
                    </div>

                    {section.items.length > 0 && (
                      <>
                        <h4 style={{margin: '12px 0 8px 0'}}>Items</h4>
                        {section.items.map(item => (
                          <div key={item.id} style={{background: '#1e293b', padding: 12, borderRadius: 6, marginBottom: 8}}>
                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'start'}}>
                              <div style={{flex: 1}}>
                                <h5 style={{margin: '0 0 4px 0'}}>{item.name}</h5>
                                <p style={{margin: '0 0 4px 0', fontSize: 12, color: '#94a3b8'}}>{item.description}</p>
                                <p style={{margin: 0, fontWeight: 600}}>{item.price}</p>
                                {item.images.length > 0 && (
                                  <div style={{display: 'flex', gap: 6, marginTop: 8}}>
                                    {item.images.map((img, idx) => (
                                      <div key={idx} style={{width: 40, height: 40, borderRadius: 4, overflow: 'hidden'}}>
                                        <img src={img.url} alt="item" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                              <div style={{display: 'flex', gap: 6}}>
                                <button onClick={() => setEditingItem(item)} style={{padding: '6px 10px', background: '#0b7a75', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 12}}>Edit</button>
                                <button onClick={() => deleteItem(section.id, item.id, 'drinks')} style={{padding: '6px 10px', background: '#dc2626', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 12}}>Delete</button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                ))}
              </>
            )}

            {tab !== 'menu' && tab !== 'drinks' && <p style={{color: '#64748b'}}>Other tabs coming soon...</p>}
          </div>
        </>
      )}

      <footer style={{padding: '20px', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,.1)'}}>
        <button onClick={handleSave} disabled={saving || loading} style={{padding: '12px 24px', background: saving ? '#64748b' : '#0b7a75', color: 'white', border: 'none', borderRadius: 8, cursor: saving ? 'not-allowed' : 'pointer', fontWeight: 600}}>
          {saving ? '⏳ SAVING...' : '💾 SAVE ALL CHANGES'}
        </button>
      </footer>
    </div>
  );
}
