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

  // Current tab state (reusable across all tabs)
  const [editingSection, setEditingSection] = useState(null);
  const [newSectionName, setNewSectionName] = useState('');
  const [newSectionTime, setNewSectionTime] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [newItem, setNewItem] = useState({ section_id: '', name: '', description: '', price: '', date: '', time: '', location: '', images: [], active: true });

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
    setAreas([{
      id: newAreaId,
      name: 'Main Restaurant',
      hours: days.reduce((acc, day) => ({ ...acc, [day]: { open: '09:00', close: '22:00' } }), {}),
      menu_sections: [],
      drink_sections: [],
      specials: [],
      daily_specials: days.reduce((acc, day) => ({ ...acc, [day]: null }), {}),
      events: []
    }]);
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

  const handleImageUpload = async (e) => {
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

      const newImage = { url: data.url, label: imageLabel };
      if (editingItem) {
        setEditingItem({ ...editingItem, images: [...(editingItem.images || []), newImage] });
      } else {
        setNewItem({ ...newItem, images: [...newItem.images, newImage] });
      }
      setImageLabel('Grilled');
      setUploadingImage(false);
    } catch (err) {
      alert('Error uploading image: ' + err.message);
      setUploadingImage(false);
    }
  };

  const getSectionField = (tabType) => {
    if (tabType === 'menu') return 'menu_sections';
    if (tabType === 'drinks') return 'drink_sections';
    return 'menu_sections';
  };

  const getItemsField = (tabType) => {
    if (tabType === 'specials') return 'specials';
    if (tabType === 'daily') return 'daily_specials';
    if (tabType === 'events') return 'events';
    return 'specials';
  };

  // Reusable section management (for menu, drinks)
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

  const addSectionItem = (tabType = tab) => {
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
    setNewItem({ section_id: '', name: '', description: '', price: '', date: '', time: '', location: '', images: [], active: true });
  };

  const updateSectionItem = (tabType = tab) => {
    if (!editingItem.name || !editingItem.price) {
      alert('Fill required fields');
      return;
    }
    const field = getSectionField(tabType);
    setAreas(areas.map(a => a.id === selectedAreaId ? { ...a, [field]: a[field].map(s => s.id === editingItem.section_id ? { ...s, items: s.items.map(i => i.id === editingItem.id ? editingItem : i) } : s) } : a));
    setEditingItem(null);
  };

  const deleteSectionItem = (sectionId, itemId, tabType = tab) => {
    const field = getSectionField(tabType);
    setAreas(areas.map(a => a.id === selectedAreaId ? { ...a, [field]: a[field].map(s => s.id === sectionId ? { ...s, items: s.items.filter(i => i.id !== itemId) } : s) } : a));
  };

  // Reusable flat list management (specials, daily features, events, sides)
  const addFlatItem = (targetField) => {
    if (!newItem.name || !newItem.price) {
      alert('Fill required fields');
      return;
    }
    const item = { id: Math.random().toString(36).substr(2, 9), ...newItem, images: newItem.images || [], active: newItem.active !== false };

    if (targetField === 'specials') {
      const area = areas.find(a => a.id === selectedAreaId);
      setAreas(areas.map(a => a.id === selectedAreaId ? { ...a, specials: [...a.specials, item] } : a));
    } else if (targetField === 'events') {
      const area = areas.find(a => a.id === selectedAreaId);
      setAreas(areas.map(a => a.id === selectedAreaId ? { ...a, events: [...a.events, item] } : a));
    } else if (targetField === 'dailyFeatures') {
      setDailyFeatures([...dailyFeatures, item]);
    } else if (targetField === 'sides') {
      setSides([...sides, item]);
    }

    setNewItem({ section_id: '', name: '', description: '', price: '', date: '', time: '', location: '', images: [], active: true });
  };

  const updateFlatItem = (targetField) => {
    if (!editingItem.name || !editingItem.price) {
      alert('Fill required fields');
      return;
    }
    if (targetField === 'specials') {
      setAreas(areas.map(a => a.id === selectedAreaId ? { ...a, specials: a.specials.map(i => i.id === editingItem.id ? editingItem : i) } : a));
    } else if (targetField === 'events') {
      setAreas(areas.map(a => a.id === selectedAreaId ? { ...a, events: a.events.map(i => i.id === editingItem.id ? editingItem : i) } : a));
    } else if (targetField === 'dailyFeatures') {
      setDailyFeatures(dailyFeatures.map(i => i.id === editingItem.id ? editingItem : i));
    } else if (targetField === 'sides') {
      setSides(sides.map(i => i.id === editingItem.id ? editingItem : i));
    }
    setEditingItem(null);
  };

  const deleteFlatItem = (itemId, targetField) => {
    if (targetField === 'specials') {
      setAreas(areas.map(a => a.id === selectedAreaId ? { ...a, specials: a.specials.filter(i => i.id !== itemId) } : a));
    } else if (targetField === 'events') {
      setAreas(areas.map(a => a.id === selectedAreaId ? { ...a, events: a.events.filter(i => i.id !== itemId) } : a));
    } else if (targetField === 'dailyFeatures') {
      setDailyFeatures(dailyFeatures.filter(i => i.id !== itemId));
    } else if (targetField === 'sides') {
      setSides(sides.filter(i => i.id !== itemId));
    }
  };

  const deleteImage = (imageIndex, isEditing = false) => {
    if (isEditing) {
      setEditingItem({ ...editingItem, images: editingItem.images.filter((_, i) => i !== imageIndex) });
    } else {
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
      daily_specials: days.reduce((acc, day) => ({ ...acc, [day]: null }), {}),
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

  // ItemRenderer - displays a flat list of items (specials, events, sides, daily features)
  const ItemRenderer = ({ items, targetField, placeholder = 'Add Item' }) => (
    <div>
      {items.map(item => (
        <div key={item.id} style={{background: '#1e293b', padding: 12, borderRadius: 6, marginBottom: 8}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'start'}}>
            <div style={{flex: 1}}>
              <h5 style={{margin: '0 0 4px 0'}}>{item.name}</h5>
              {item.description && <p style={{margin: '0 0 4px 0', fontSize: 12, color: '#94a3b8'}}>{item.description}</p>}
              {item.price && <p style={{margin: '0 0 4px 0', fontWeight: 600}}>{item.price}</p>}
              {item.date && <p style={{margin: '0 0 4px 0', fontSize: 12}}>{item.date} {item.time}</p>}
              {item.location && <p style={{margin: '0 0 4px 0', fontSize: 12, color: '#94a3b8'}}>{item.location}</p>}
              {item.images?.length > 0 && (
                <div style={{display: 'flex', gap: 6, marginTop: 8}}>
                  {item.images.map((img, idx) => (
                    <div key={idx} style={{width: 40, height: 40, borderRadius: 4, overflow: 'hidden', position: 'relative', title: img.label}}>
                      <img src={img.url} alt="item" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                    </div>
                  ))}
                </div>
              )}
              {item.active !== undefined && <p style={{margin: '4px 0 0 0', fontSize: 11, color: item.active ? '#10b981' : '#f87171'}}>
                {item.active ? '✓ Active' : '✗ Inactive'}
              </p>}
            </div>
            <div style={{display: 'flex', gap: 6}}>
              <button onClick={() => setEditingItem(item)} style={{padding: '6px 10px', background: '#0b7a75', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 12}}>Edit</button>
              <button onClick={() => deleteFlatItem(item.id, targetField)} style={{padding: '6px 10px', background: '#dc2626', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 12}}>Delete</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  // ItemForm - form for adding/editing items
  const ItemForm = ({ isSectionItem = false, targetField = null, onAdd, onUpdate, showDate = false, showTime = false, showLocation = false }) => (
    <div style={{background: '#0f172a', padding: 12, borderRadius: 6, marginBottom: 12}}>
      <h4 style={{margin: '0 0 12px 0'}}>{editingItem ? 'Edit Item' : 'Add Item'}</h4>
      <input type="text" placeholder="Item name" value={editingItem ? editingItem.name : newItem.name} onChange={(e) => editingItem ? setEditingItem({...editingItem, name: e.target.value}) : setNewItem({...newItem, name: e.target.value})} style={{width: '100%', padding: 8, background: '#1e293b', color: '#f1f5f9', border: '1px solid rgba(255,255,255,.15)', borderRadius: 6, marginBottom: 8}} />
      <textarea placeholder="Description" value={editingItem ? editingItem.description : newItem.description} onChange={(e) => editingItem ? setEditingItem({...editingItem, description: e.target.value}) : setNewItem({...newItem, description: e.target.value})} style={{width: '100%', padding: 8, background: '#1e293b', color: '#f1f5f9', border: '1px solid rgba(255,255,255,.15)', borderRadius: 6, marginBottom: 8, height: 60}} />
      {!showDate && !showTime && !showLocation && <input type="text" placeholder="Price" value={editingItem ? editingItem.price : newItem.price} onChange={(e) => editingItem ? setEditingItem({...editingItem, price: e.target.value}) : setNewItem({...newItem, price: e.target.value})} style={{width: '100%', padding: 8, background: '#1e293b', color: '#f1f5f9', border: '1px solid rgba(255,255,255,.15)', borderRadius: 6, marginBottom: 8}} />}
      {showDate && <input type="date" value={editingItem ? editingItem.date : newItem.date} onChange={(e) => editingItem ? setEditingItem({...editingItem, date: e.target.value}) : setNewItem({...newItem, date: e.target.value})} style={{width: '100%', padding: 8, background: '#1e293b', color: '#f1f5f9', border: '1px solid rgba(255,255,255,.15)', borderRadius: 6, marginBottom: 8}} />}
      {showTime && <input type="time" value={editingItem ? editingItem.time : newItem.time} onChange={(e) => editingItem ? setEditingItem({...editingItem, time: e.target.value}) : setNewItem({...newItem, time: e.target.value})} style={{width: '100%', padding: 8, background: '#1e293b', color: '#f1f5f9', border: '1px solid rgba(255,255,255,.15)', borderRadius: 6, marginBottom: 8}} />}
      {showLocation && <input type="text" placeholder="Location" value={editingItem ? editingItem.location : newItem.location} onChange={(e) => editingItem ? setEditingItem({...editingItem, location: e.target.value}) : setNewItem({...newItem, location: e.target.value})} style={{width: '100%', padding: 8, background: '#1e293b', color: '#f1f5f9', border: '1px solid rgba(255,255,255,.15)', borderRadius: 6, marginBottom: 8}} />}
      {!isSectionItem && <div style={{display: 'flex', gap: 8, marginBottom: 8}}>
        <label style={{flex: 1, display: 'flex', alignItems: 'center', gap: 6, color: '#f1f5f9'}}>
          <input type="checkbox" checked={editingItem ? editingItem.active : newItem.active} onChange={(e) => editingItem ? setEditingItem({...editingItem, active: e.target.checked}) : setNewItem({...newItem, active: e.target.checked})} />
          Active
        </label>
      </div>}
      <button onClick={() => fileInputRef.current?.click()} disabled={uploadingImage} style={{width: '100%', padding: 8, background: uploadingImage ? '#64748b' : '#1e293b', color: '#f1f5f9', border: '1px dashed rgba(255,255,255,.3)', borderRadius: 6, cursor: uploadingImage ? 'not-allowed' : 'pointer', marginBottom: 8}}>
        {uploadingImage ? 'Uploading...' : '+ Add Image'}
      </button>
      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} style={{display: 'none'}} />
      <div style={{display: 'flex', gap: 8, marginBottom: 8}}>
        {(editingItem ? editingItem.images : newItem.images).map((img, idx) => (
          <div key={idx} style={{position: 'relative', width: 60, height: 60}}>
            <img src={img.url} alt="preview" style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: 4}} />
            <div style={{fontSize: 10, color: '#94a3b8', marginTop: 2}}>{img.label}</div>
            <button onClick={() => deleteImage(idx, !!editingItem)} style={{position: 'absolute', top: -4, right: -4, background: '#dc2626', color: 'white', border: 'none', borderRadius: '50%', width: 20, height: 20, cursor: 'pointer', fontSize: 10}}>✕</button>
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
        <button onClick={editingItem ? () => updateFlatItem(targetField) : () => addFlatItem(targetField)} style={{flex: 1, padding: 8, background: '#0b7a75', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer'}}>
          {editingItem ? 'Update' : 'Save Item'}
        </button>
      </div>
      {editingItem && <button onClick={() => setEditingItem(null)} style={{width: '100%', marginTop: 8, padding: 8, background: '#64748b', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer'}}>Cancel</button>}
    </div>
  );

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
            {['menu', 'drinks', 'specials', 'sides', 'daily', 'events', 'hours', 'dailyFeatures', 'gallery', 'business'].map(t => (
              <button key={t} onClick={() => { setTab(t); setEditingItem(null); setNewItem({ section_id: '', name: '', description: '', price: '', date: '', time: '', location: '', images: [], active: true }); }} style={{padding: '8px 12px', background: tab === t ? '#0b7a75' : '#1e293b', color: '#f1f5f9', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: tab === t ? 600 : 400, whiteSpace: 'nowrap'}}>
                {t === 'menu' && '🍽️'}{t === 'drinks' && '🥤'}{t === 'specials' && '⭐'}{t === 'sides' && '➕'}{t === 'daily' && '📅'}{t === 'events' && '🎉'}{t === 'hours' && '🕐'}{t === 'dailyFeatures' && '🎣'}{t === 'gallery' && '📷'}{t === 'business' && '🌐'}
              </button>
            ))}
          </div>

          <div style={{padding: '20px', flex: 1, overflowY: 'auto', maxHeight: 'calc(100vh - 300px)'}}>
            {/* MENU TAB */}
            {tab === 'menu' && (
              <>
                <h2>Menu Sections</h2>
                <div style={{display: 'flex', gap: 8, marginBottom: 20}}>
                  <input type="text" placeholder="Section name (Seafood, Breakfast, etc.)" value={newSectionName} onChange={(e) => setNewSectionName(e.target.value)} style={{flex: 1, padding: 10, background: '#1e293b', color: '#f1f5f9', border: '1px solid rgba(255,255,255,.15)', borderRadius: 8}} />
                  <input type="text" placeholder="Time range (e.g. 11am-3pm)" value={newSectionTime} onChange={(e) => setNewSectionTime(e.target.value)} style={{flex: 1, padding: 10, background: '#1e293b', color: '#f1f5f9', border: '1px solid rgba(255,255,255,.15)', borderRadius: 8}} />
                  <button onClick={() => addSection('menu')} style={{padding: '10px 16px', background: '#0b7a75', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600}}>Add Section</button>
                </div>

                {selectedArea.menu_sections.map(section => (
                  <div key={section.id} style={{background: '#1e293b', padding: 16, borderRadius: 8, marginBottom: 20}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12}}>
                      <div>
                        <h3 style={{margin: 0}}>{section.name}</h3>
                        {section.time_range && <p style={{margin: '4px 0 0 0', fontSize: 12, color: '#94a3b8'}}>{section.time_range}</p>}
                      </div>
                      <button onClick={() => deleteSection(section.id, 'menu')} style={{padding: '6px 12px', background: '#dc2626', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 12}}>Delete</button>
                    </div>

                    <ItemForm isSectionItem={true} onAdd={() => addSectionItem('menu')} onUpdate={() => updateSectionItem('menu')} />

                    {section.items.length > 0 && (
                      <>
                        <h4 style={{margin: '12px 0 8px 0'}}>Items</h4>
                        {section.items.map(item => (
                          <div key={item.id} style={{background: '#0f172a', padding: 12, borderRadius: 6, marginBottom: 8}}>
                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'start'}}>
                              <div style={{flex: 1}}>
                                <h5 style={{margin: '0 0 4px 0'}}>{item.name}</h5>
                                <p style={{margin: '0 0 4px 0', fontSize: 12, color: '#94a3b8'}}>{item.description}</p>
                                <p style={{margin: 0, fontWeight: 600}}>{item.price}</p>
                                {item.images?.length > 0 && (
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
                                <button onClick={() => deleteSectionItem(section.id, item.id, 'menu')} style={{padding: '6px 10px', background: '#dc2626', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 12}}>Delete</button>
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

            {/* DRINKS TAB */}
            {tab === 'drinks' && (
              <>
                <h2>Drink Sections</h2>
                <div style={{display: 'flex', gap: 8, marginBottom: 20}}>
                  <input type="text" placeholder="Section name (Cocktails, Beer, Wine, etc.)" value={newSectionName} onChange={(e) => setNewSectionName(e.target.value)} style={{flex: 1, padding: 10, background: '#1e293b', color: '#f1f5f9', border: '1px solid rgba(255,255,255,.15)', borderRadius: 8}} />
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

                    <ItemForm isSectionItem={true} onAdd={() => addSectionItem('drinks')} onUpdate={() => updateSectionItem('drinks')} />

                    {section.items.length > 0 && (
                      <>
                        <h4 style={{margin: '12px 0 8px 0'}}>Items</h4>
                        {section.items.map(item => (
                          <div key={item.id} style={{background: '#0f172a', padding: 12, borderRadius: 6, marginBottom: 8}}>
                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'start'}}>
                              <div style={{flex: 1}}>
                                <h5 style={{margin: '0 0 4px 0'}}>{item.name}</h5>
                                <p style={{margin: '0 0 4px 0', fontSize: 12, color: '#94a3b8'}}>{item.description}</p>
                                <p style={{margin: 0, fontWeight: 600}}>{item.price}</p>
                                {item.images?.length > 0 && (
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
                                <button onClick={() => deleteSectionItem(section.id, item.id, 'drinks')} style={{padding: '6px 10px', background: '#dc2626', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 12}}>Delete</button>
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

            {/* SPECIALS TAB */}
            {tab === 'specials' && (
              <>
                <h2>Specials</h2>
                <ItemForm targetField="specials" onAdd={() => addFlatItem('specials')} onUpdate={() => updateFlatItem('specials')} />
                {selectedArea.specials.length > 0 && <ItemRenderer items={selectedArea.specials} targetField="specials" />}
                {selectedArea.specials.length === 0 && !editingItem && <p style={{color: '#64748b'}}>No specials yet</p>}
              </>
            )}

            {/* SIDES TAB */}
            {tab === 'sides' && (
              <>
                <h2>Sides & Add-ons</h2>
                <ItemForm targetField="sides" onAdd={() => addFlatItem('sides')} onUpdate={() => updateFlatItem('sides')} />
                {sides.length > 0 && <ItemRenderer items={sides} targetField="sides" />}
                {sides.length === 0 && !editingItem && <p style={{color: '#64748b'}}>No sides yet</p>}
              </>
            )}

            {/* DAILY SPECIALS TAB */}
            {tab === 'daily' && (
              <>
                <h2>Daily Specials</h2>
                {days.map(day => (
                  <div key={day} style={{background: '#1e293b', padding: 12, borderRadius: 6, marginBottom: 12}}>
                    <h3 style={{margin: '0 0 12px 0'}}>{day}</h3>
                    {selectedArea.daily_specials[day] ? (
                      <div style={{background: '#0f172a', padding: 12, borderRadius: 6}}>
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 12}}>
                          <div style={{flex: 1}}>
                            <h5 style={{margin: 0}}>{selectedArea.daily_specials[day].name}</h5>
                            <p style={{margin: '4px 0 0 0', fontSize: 12, color: '#94a3b8'}}>{selectedArea.daily_specials[day].description}</p>
                            <p style={{margin: '4px 0 0 0', fontWeight: 600}}>{selectedArea.daily_specials[day].price}</p>
                            <label style={{display: 'flex', alignItems: 'center', gap: 6, marginTop: 8, color: '#f1f5f9'}}>
                              <input type="checkbox" checked={selectedArea.daily_specials[day].active !== false} onChange={(e) => setAreas(areas.map(a => a.id === selectedAreaId ? { ...a, daily_specials: { ...a.daily_specials, [day]: { ...a.daily_specials[day], active: e.target.checked } } } : a))} />
                              Active
                            </label>
                          </div>
                          <div style={{display: 'flex', gap: 6}}>
                            <button onClick={() => setEditingItem({...selectedArea.daily_specials[day], day})} style={{padding: '6px 10px', background: '#0b7a75', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 12}}>Edit</button>
                            <button onClick={() => setAreas(areas.map(a => a.id === selectedAreaId ? { ...a, daily_specials: { ...a.daily_specials, [day]: null } } : a))} style={{padding: '6px 10px', background: '#dc2626', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 12}}>Delete</button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div style={{background: '#0f172a', padding: 12, borderRadius: 6}}>
                        <ItemForm targetField="daily" onAdd={() => { const item = { id: Math.random().toString(36).substr(2, 9), ...newItem, images: newItem.images || [], active: newItem.active }; setAreas(areas.map(a => a.id === selectedAreaId ? { ...a, daily_specials: { ...a.daily_specials, [day]: item } } : a)); setNewItem({ section_id: '', name: '', description: '', price: '', date: '', time: '', location: '', images: [], active: true }); }} onUpdate={() => { setAreas(areas.map(a => a.id === selectedAreaId ? { ...a, daily_specials: { ...a.daily_specials, [day]: editingItem } } : a)); setEditingItem(null); }} />
                      </div>
                    )}
                  </div>
                ))}
              </>
            )}

            {/* EVENTS TAB */}
            {tab === 'events' && (
              <>
                <h2>Events</h2>
                <ItemForm targetField="events" showDate={true} showTime={true} showLocation={true} onAdd={() => addFlatItem('events')} onUpdate={() => updateFlatItem('events')} />
                {selectedArea.events.length > 0 && <ItemRenderer items={selectedArea.events} targetField="events" />}
                {selectedArea.events.length === 0 && !editingItem && <p style={{color: '#64748b'}}>No events yet</p>}
              </>
            )}

            {/* HOURS TAB */}
            {tab === 'hours' && (
              <>
                <h2>Hours of Operation</h2>
                {days.map(day => (
                  <div key={day} style={{display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12, background: '#1e293b', padding: 12, borderRadius: 6}}>
                    <div style={{width: 100, fontWeight: 600}}>{day}</div>
                    <input type="time" value={selectedArea.hours[day].open} onChange={(e) => setAreas(areas.map(a => a.id === selectedAreaId ? { ...a, hours: { ...a.hours, [day]: { ...a.hours[day], open: e.target.value } } } : a))} style={{padding: 8, background: '#0f172a', color: '#f1f5f9', border: '1px solid rgba(255,255,255,.15)', borderRadius: 6}} />
                    <div>to</div>
                    <input type="time" value={selectedArea.hours[day].close} onChange={(e) => setAreas(areas.map(a => a.id === selectedAreaId ? { ...a, hours: { ...a.hours, [day]: { ...a.hours[day], close: e.target.value } } } : a))} style={{padding: 8, background: '#0f172a', color: '#f1f5f9', border: '1px solid rgba(255,255,255,.15)', borderRadius: 6}} />
                  </div>
                ))}
              </>
            )}

            {/* DAILY FEATURES TAB */}
            {tab === 'dailyFeatures' && (
              <>
                <h2>Daily Features</h2>
                <ItemForm targetField="dailyFeatures" onAdd={() => addFlatItem('dailyFeatures')} onUpdate={() => updateFlatItem('dailyFeatures')} />
                {dailyFeatures.length > 0 && <ItemRenderer items={dailyFeatures} targetField="dailyFeatures" />}
                {dailyFeatures.length === 0 && !editingItem && <p style={{color: '#64748b'}}>No daily features yet</p>}
              </>
            )}

            {/* GALLERY TAB */}
            {tab === 'gallery' && (
              <>
                <h2>Gallery</h2>
                <div style={{marginBottom: 20}}>
                  <button onClick={() => fileInputRef.current?.click()} disabled={uploadingImage} style={{width: '100%', padding: 12, background: uploadingImage ? '#64748b' : '#0b7a75', color: 'white', border: 'none', borderRadius: 8, cursor: uploadingImage ? 'not-allowed' : 'pointer', fontWeight: 600}}>
                    {uploadingImage ? 'Uploading...' : '📤 Upload Image'}
                  </button>
                  <input ref={fileInputRef} type="file" accept="image/*" onChange={(e) => { if (e.target.files[0]) { setUploadingImage(true); handleImageUpload(e).finally(() => setUploadingImage(false)); } }} style={{display: 'none'}} />
                </div>

                {['Hero', 'Business', 'Trip Swipe'].map(type => (
                  <div key={type} style={{marginBottom: 20}}>
                    <h3>{type} Images</h3>
                    <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: 12}}>
                      {gallery.filter(img => img.type === type).map(img => (
                        <div key={img.id} style={{position: 'relative', borderRadius: 8, overflow: 'hidden'}}>
                          <img src={img.url} alt={img.name} style={{width: '100%', height: 100, objectFit: 'cover'}} />
                          <select value={img.type} onChange={(e) => setGallery(gallery.map(g => g.id === img.id ? {...g, type: e.target.value} : g))} style={{position: 'absolute', bottom: 4, right: 4, padding: '4px 6px', background: '#1e293b', color: '#f1f5f9', border: 'none', borderRadius: 4, fontSize: 10}}>
                            <option>Hero</option>
                            <option>Business</option>
                            <option>Trip Swipe</option>
                          </select>
                          <button onClick={() => setGallery(gallery.filter(g => g.id !== img.id))} style={{position: 'absolute', top: 4, right: 4, background: '#dc2626', color: 'white', border: 'none', borderRadius: '50%', width: 24, height: 24, cursor: 'pointer', fontSize: 12}}>✕</button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                {gallery.length === 0 && <p style={{color: '#64748b'}}>No images uploaded yet</p>}
              </>
            )}

            {/* BUSINESS INFO TAB */}
            {tab === 'business' && (
              <>
                <h2>Business Information</h2>
                <div style={{background: '#1e293b', padding: 16, borderRadius: 8}}>
                  <input type="text" placeholder="Business Name" value={business.name} onChange={(e) => setBusiness({...business, name: e.target.value})} style={{width: '100%', padding: 10, background: '#0f172a', color: '#f1f5f9', border: '1px solid rgba(255,255,255,.15)', borderRadius: 6, marginBottom: 12}} />
                  <input type="text" placeholder="Tagline" value={business.tagline} onChange={(e) => setBusiness({...business, tagline: e.target.value})} style={{width: '100%', padding: 10, background: '#0f172a', color: '#f1f5f9', border: '1px solid rgba(255,255,255,.15)', borderRadius: 6, marginBottom: 12}} />
                  <input type="text" placeholder="Phone" value={business.phone} onChange={(e) => setBusiness({...business, phone: e.target.value})} style={{width: '100%', padding: 10, background: '#0f172a', color: '#f1f5f9', border: '1px solid rgba(255,255,255,.15)', borderRadius: 6, marginBottom: 12}} />
                  <input type="text" placeholder="Website" value={business.website} onChange={(e) => setBusiness({...business, website: e.target.value})} style={{width: '100%', padding: 10, background: '#0f172a', color: '#f1f5f9', border: '1px solid rgba(255,255,255,.15)', borderRadius: 6, marginBottom: 12}} />
                  <input type="text" placeholder="Address" value={business.address} onChange={(e) => setBusiness({...business, address: e.target.value})} style={{width: '100%', padding: 10, background: '#0f172a', color: '#f1f5f9', border: '1px solid rgba(255,255,255,.15)', borderRadius: 6, marginBottom: 12}} />
                  <textarea placeholder="About / Description" value={business.about} onChange={(e) => setBusiness({...business, about: e.target.value})} style={{width: '100%', padding: 10, background: '#0f172a', color: '#f1f5f9', border: '1px solid rgba(255,255,255,.15)', borderRadius: 6, marginBottom: 12, height: 100}} />
                </div>
              </>
            )}
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
