import { useState, useRef } from 'react';
import TinderCard from 'react-tinder-card';
import styles from '../styles/Home.module.css';

export default function MenuEditor() {
  const [pinEntered, setPinEntered] = useState(false);
  const [pin, setPin] = useState('');
  const [tab, setTab] = useState('menu');

  const [restaurant, setRestaurant] = useState({ name: 'Gulf Island Grill', tagline: 'Fresh Gulf Coast Flavors' });
  const [gallery, setGallery] = useState([]);
  const [sections, setSections] = useState(['Appetizers', 'Main Courses', 'Drinks', 'Desserts']);
  const [items, setItems] = useState([]);

  const [specials, setSpecials] = useState([]);
  const [dailySpecials, setDailySpecials] = useState({});
  const [catchOfTheDay, setCatchOfTheDay] = useState({ name: '', price: '', desc: '', image: null });
  const [events, setEvents] = useState([]);

  const [editingItem, setEditingItem] = useState(null);
  const [editingSpecial, setEditingSpecial] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);

  const [newItem, setNewItem] = useState({ section: 'Appetizers', name: '', price: '', desc: '', image: null });
  const [newSpecial, setNewSpecial] = useState({ name: '', price: '', desc: '', image: null, active: true });
  const [newEvent, setNewEvent] = useState({ name: '', desc: '', date: '', location: '', image: null, active: true });
  const [newDailySpecial, setNewDailySpecial] = useState({ day: 'Monday', name: '', price: '', desc: '', image: null });
  const [newSection, setNewSection] = useState('');

  const fileInputRef = useRef(null);
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (pin === '1234') {
      setPinEntered(true);
    } else {
      alert('Invalid PIN');
      setPin('');
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newImage = { id: Math.max(...gallery.map(g => g.id || 0), 0) + 1, url: event.target.result, name: file.name };
        setGallery([...gallery, newImage]);
      };
      reader.readAsDataURL(file);
    }
  };

  const addItem = () => {
    if (!newItem.name || !newItem.price || newItem.image === null) { alert('Fill all fields'); return; }
    setItems([...items, { id: Math.max(...items.map(i => i.id || 0), 0) + 1, ...newItem }]);
    setNewItem({ section: 'Appetizers', name: '', price: '', desc: '', image: null });
  };

  const updateItem = () => {
    if (!editingItem.name || !editingItem.price || editingItem.image === null) { alert('Fill all fields'); return; }
    setItems(items.map(i => i.id === editingItem.id ? editingItem : i));
    setEditingItem(null);
  };

  const deleteItem = (id) => setItems(items.filter(i => i.id !== id));

  const addSpecial = () => {
    if (!newSpecial.name || !newSpecial.price || newSpecial.image === null) { alert('Fill all fields'); return; }
    setSpecials([...specials, { id: Math.max(...specials.map(s => s.id || 0), 0) + 1, ...newSpecial }]);
    setNewSpecial({ name: '', price: '', desc: '', image: null, active: true });
  };

  const updateSpecial = () => {
    if (!editingSpecial.name || !editingSpecial.price || editingSpecial.image === null) { alert('Fill all fields'); return; }
    setSpecials(specials.map(s => s.id === editingSpecial.id ? editingSpecial : s));
    setEditingSpecial(null);
  };

  const deleteSpecial = (id) => setSpecials(specials.filter(s => s.id !== id));

  const addDailySpecial = () => {
    if (!newDailySpecial.name || !newDailySpecial.price || newDailySpecial.image === null) { alert('Fill all fields'); return; }
    setDailySpecials({ ...dailySpecials, [newDailySpecial.day]: newDailySpecial });
    setNewDailySpecial({ day: 'Monday', name: '', price: '', desc: '', image: null });
  };

  const deleteDailySpecial = (day) => {
    const updated = { ...dailySpecials };
    delete updated[day];
    setDailySpecials(updated);
  };

  const addEvent = () => {
    if (!newEvent.name || !newEvent.date || newEvent.image === null) { alert('Fill all fields'); return; }
    setEvents([...events, { id: Math.max(...events.map(e => e.id || 0), 0) + 1, ...newEvent }]);
    setNewEvent({ name: '', desc: '', date: '', location: '', image: null, active: true });
  };

  const updateEvent = () => {
    if (!editingEvent.name || !editingEvent.date || editingEvent.image === null) { alert('Fill all fields'); return; }
    setEvents(events.map(e => e.id === editingEvent.id ? editingEvent : e));
    setEditingEvent(null);
  };

  const deleteEvent = (id) => setEvents(events.filter(e => e.id !== id));

  const addSection = () => {
    if (!newSection.trim()) return;
    if (sections.includes(newSection)) { alert('Section exists'); return; }
    setSections([...sections, newSection]);
    setNewSection('');
  };

  if (!pinEntered) {
    return (
      <div className={styles.pinScreen}>
        <div className={styles.pinBox}>
          <h1>🔐 Menu Editor</h1>
          <p>Enter PIN to continue</p>
          <form onSubmit={handlePinSubmit}>
            <input type="password" value={pin} onChange={(e) => setPin(e.target.value)} placeholder="Enter PIN" maxLength="4" autoFocus />
            <button type="submit">Unlock</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <input type="text" placeholder="Restaurant Name" value={restaurant.name} onChange={(e) => setRestaurant({...restaurant, name: e.target.value})} style={{fontSize: 28, fontWeight: 700, background: 'transparent', border: 'none', color: '#f1f5f9', marginBottom: 8, width: '100%'}} />
          <input type="text" placeholder="Tagline" value={restaurant.tagline} onChange={(e) => setRestaurant({...restaurant, tagline: e.target.value})} style={{fontSize: 14, background: 'transparent', border: 'none', color: '#b9d5de', width: '100%'}} />
        </div>
        <div className={styles.tabs} style={{display: 'flex', gap: 8, flexWrap: 'wrap'}}>
          {['menu', 'specials', 'daily', 'catch', 'events', 'gallery'].map(t => (
            <button key={t} className={tab === t ? styles.active : ''} onClick={() => setTab(t)} style={{padding: '8px 12px', borderRadius: 6, cursor: 'pointer', background: tab === t ? '#0b7a75' : '#1e293b', color: '#f1f5f9', border: 'none', fontWeight: 600}}>
              {t === 'menu' && '🍽️ Menu'}{t === 'specials' && '⭐ Specials'}{t === 'daily' && '📅 Daily'}{t === 'catch' && '🎣 Catch'}{t === 'events' && '🎉 Events'}{t === 'gallery' && '📷 Gallery'}
            </button>
          ))}
        </div>
      </header>

      <div className={styles.editor}>
        {/* MENU TAB */}
        {tab === 'menu' && (
          <>
            <section className={styles.section}>
              <h2>Sections</h2>
              <div style={{display: 'flex', gap: 8, marginBottom: 16}}>
                <input type="text" placeholder="New section" value={newSection} onChange={(e) => setNewSection(e.target.value)} style={{flex: 1, padding: 10, border: '1px solid rgba(255,255,255,.15)', background: '#1e293b', color: '#f1f5f9', borderRadius: 8}} />
                <button onClick={addSection} style={{padding: '10px 16px', background: '#0b7a75', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600}}>Add</button>
              </div>
              <div style={{display: 'flex', gap: 8, flexWrap: 'wrap'}}>
                {sections.map(s => <div key={s} style={{background: '#1e293b', padding: '6px 12px', borderRadius: 20}}>{s}</div>)}
              </div>
            </section>

            <section className={styles.section}>
              <h2>Add Menu Item</h2>
              <div className={styles.form}>
                <select value={editingItem ? editingItem.section : newItem.section} onChange={(e) => editingItem ? setEditingItem({...editingItem, section: e.target.value}) : setNewItem({...newItem, section: e.target.value})} style={{marginBottom: 10, padding: 10, background: '#1e293b', color: '#f1f5f9', border: '1px solid rgba(255,255,255,.15)', borderRadius: 8}}>
                  {sections.map(s => <option key={s}>{s}</option>)}
                </select>
                <input type="text" placeholder="Name" value={editingItem ? editingItem.name : newItem.name} onChange={(e) => editingItem ? setEditingItem({...editingItem, name: e.target.value}) : setNewItem({...newItem, name: e.target.value})} style={{marginBottom: 10, padding: 10, background: '#1e293b', color: '#f1f5f9', border: '1px solid rgba(255,255,255,.15)', borderRadius: 8, width: '100%'}} />
                <input type="text" placeholder="Price" value={editingItem ? editingItem.price : newItem.price} onChange={(e) => editingItem ? setEditingItem({...editingItem, price: e.target.value}) : setNewItem({...newItem, price: e.target.value})} style={{marginBottom: 10, padding: 10, background: '#1e293b', color: '#f1f5f9', border: '1px solid rgba(255,255,255,.15)', borderRadius: 8, width: '100%'}} />
                <textarea placeholder="Description" value={editingItem ? editingItem.desc : newItem.desc} onChange={(e) => editingItem ? setEditingItem({...editingItem, desc: e.target.value}) : setNewItem({...newItem, desc: e.target.value})} style={{marginBottom: 10, padding: 10, background: '#1e293b', color: '#f1f5f9', border: '1px solid rgba(255,255,255,.15)', borderRadius: 8, width: '100%', height: 80}} />
                <select value={editingItem ? (editingItem.image || '') : (newItem.image || '')} onChange={(e) => editingItem ? setEditingItem({...editingItem, image: e.target.value}) : setNewItem({...newItem, image: e.target.value})} style={{marginBottom: 10, padding: 10, background: '#1e293b', color: '#f1f5f9', border: '1px solid rgba(255,255,255,.15)', borderRadius: 8, width: '100%'}}>
                  <option value="">Select Image</option>
                  {gallery.map(img => <option key={img.id} value={img.url}>{img.name}</option>)}
                </select>
                <button onClick={editingItem ? updateItem : addItem} style={{padding: '10px 16px', background: '#0b7a75', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600}}>
                  {editingItem ? 'Update Item' : 'Add Item'}
                </button>
                {editingItem && <button onClick={() => setEditingItem(null)} style={{marginLeft: 8, padding: '10px 16px', background: '#64748b', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer'}}>Cancel</button>}
              </div>
            </section>

            <section className={styles.section}>
              <h2>Menu Items</h2>
              {sections.map(section => (
                <div key={section}>
                  <h4>{section}</h4>
                  {items.filter(i => i.section === section).map(item => (
                    <div key={item.id} className={styles.itemRow}>
                      {item.image && <img src={item.image} alt={item.name} style={{width: 60, height: 60, borderRadius: 4}} />}
                      <div style={{flex: 1}}>
                        <div style={{fontWeight: 600}}>{item.name}</div>
                        <div style={{fontSize: 12, color: '#b9d5de'}}>{item.price} • {item.desc.substring(0, 40)}</div>
                      </div>
                      <button onClick={() => setEditingItem(item)} style={{padding: '6px 10px', background: '#0b7a75', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 12}}>Edit</button>
                      <button onClick={() => deleteItem(item.id)} style={{padding: '6px 10px', background: '#dc2626', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 12, marginLeft: 4}}>Delete</button>
                    </div>
                  ))}
                </div>
              ))}
            </section>
          </>
        )}

        {/* SPECIALS TAB */}
        {tab === 'specials' && (
          <>
            <section className={styles.section}>
              <h2>Add Special</h2>
              <div className={styles.form}>
                <input type="text" placeholder="Name" value={editingSpecial ? editingSpecial.name : newSpecial.name} onChange={(e) => editingSpecial ? setEditingSpecial({...editingSpecial, name: e.target.value}) : setNewSpecial({...newSpecial, name: e.target.value})} style={{marginBottom: 10, padding: 10, background: '#1e293b', color: '#f1f5f9', border: '1px solid rgba(255,255,255,.15)', borderRadius: 8, width: '100%'}} />
                <input type="text" placeholder="Price" value={editingSpecial ? editingSpecial.price : newSpecial.price} onChange={(e) => editingSpecial ? setEditingSpecial({...editingSpecial, price: e.target.value}) : setNewSpecial({...newSpecial, price: e.target.value})} style={{marginBottom: 10, padding: 10, background: '#1e293b', color: '#f1f5f9', border: '1px solid rgba(255,255,255,.15)', borderRadius: 8, width: '100%'}} />
                <textarea placeholder="Description" value={editingSpecial ? editingSpecial.desc : newSpecial.desc} onChange={(e) => editingSpecial ? setEditingSpecial({...editingSpecial, desc: e.target.value}) : setNewSpecial({...newSpecial, desc: e.target.value})} style={{marginBottom: 10, padding: 10, background: '#1e293b', color: '#f1f5f9', border: '1px solid rgba(255,255,255,.15)', borderRadius: 8, width: '100%', height: 80}} />
                <select value={editingSpecial ? (editingSpecial.image || '') : (newSpecial.image || '')} onChange={(e) => editingSpecial ? setEditingSpecial({...editingSpecial, image: e.target.value}) : setNewSpecial({...newSpecial, image: e.target.value})} style={{marginBottom: 10, padding: 10, background: '#1e293b', color: '#f1f5f9', border: '1px solid rgba(255,255,255,.15)', borderRadius: 8, width: '100%'}}>
                  <option value="">Select Image</option>
                  {gallery.map(img => <option key={img.id} value={img.url}>{img.name}</option>)}
                </select>
                <label style={{marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8}}>
                  <input type="checkbox" checked={editingSpecial ? editingSpecial.active : newSpecial.active} onChange={(e) => editingSpecial ? setEditingSpecial({...editingSpecial, active: e.target.checked}) : setNewSpecial({...newSpecial, active: e.target.checked})} />
                  Active
                </label>
                <button onClick={editingSpecial ? updateSpecial : addSpecial} style={{padding: '10px 16px', background: '#0b7a75', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600}}>
                  {editingSpecial ? 'Update Special' : 'Add Special'}
                </button>
                {editingSpecial && <button onClick={() => setEditingSpecial(null)} style={{marginLeft: 8, padding: '10px 16px', background: '#64748b', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer'}}>Cancel</button>}
              </div>
            </section>

            <section className={styles.section}>
              <h2>Specials</h2>
              {specials.map(special => (
                <div key={special.id} className={styles.itemRow}>
                  {special.image && <img src={special.image} alt={special.name} style={{width: 60, height: 60, borderRadius: 4}} />}
                  <div style={{flex: 1}}>
                    <div style={{fontWeight: 600}}>{special.name}</div>
                    <div style={{fontSize: 12, color: '#b9d5de'}}>{special.price} {special.active ? '✓ Active' : '○ Inactive'}</div>
                  </div>
                  <button onClick={() => setEditingSpecial(special)} style={{padding: '6px 10px', background: '#0b7a75', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 12}}>Edit</button>
                  <button onClick={() => deleteSpecial(special.id)} style={{padding: '6px 10px', background: '#dc2626', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 12, marginLeft: 4}}>Delete</button>
                </div>
              ))}
            </section>
          </>
        )}

        {/* DAILY SPECIALS TAB */}
        {tab === 'daily' && (
          <>
            <section className={styles.section}>
              <h2>Add Daily Special</h2>
              <div className={styles.form}>
                <select value={newDailySpecial.day} onChange={(e) => setNewDailySpecial({...newDailySpecial, day: e.target.value})} style={{marginBottom: 10, padding: 10, background: '#1e293b', color: '#f1f5f9', border: '1px solid rgba(255,255,255,.15)', borderRadius: 8, width: '100%'}}>
                  {days.map(day => <option key={day}>{day}</option>)}
                </select>
                <input type="text" placeholder="Name" value={newDailySpecial.name} onChange={(e) => setNewDailySpecial({...newDailySpecial, name: e.target.value})} style={{marginBottom: 10, padding: 10, background: '#1e293b', color: '#f1f5f9', border: '1px solid rgba(255,255,255,.15)', borderRadius: 8, width: '100%'}} />
                <input type="text" placeholder="Price" value={newDailySpecial.price} onChange={(e) => setNewDailySpecial({...newDailySpecial, price: e.target.value})} style={{marginBottom: 10, padding: 10, background: '#1e293b', color: '#f1f5f9', border: '1px solid rgba(255,255,255,.15)', borderRadius: 8, width: '100%'}} />
                <textarea placeholder="Description" value={newDailySpecial.desc} onChange={(e) => setNewDailySpecial({...newDailySpecial, desc: e.target.value})} style={{marginBottom: 10, padding: 10, background: '#1e293b', color: '#f1f5f9', border: '1px solid rgba(255,255,255,.15)', borderRadius: 8, width: '100%', height: 80}} />
                <select value={newDailySpecial.image || ''} onChange={(e) => setNewDailySpecial({...newDailySpecial, image: e.target.value})} style={{marginBottom: 10, padding: 10, background: '#1e293b', color: '#f1f5f9', border: '1px solid rgba(255,255,255,.15)', borderRadius: 8, width: '100%'}}>
                  <option value="">Select Image</option>
                  {gallery.map(img => <option key={img.id} value={img.url}>{img.name}</option>)}
                </select>
                <button onClick={addDailySpecial} style={{padding: '10px 16px', background: '#0b7a75', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600}}>Add Daily Special</button>
              </div>
            </section>

            <section className={styles.section}>
              <h2>Daily Specials</h2>
              {days.map(day => (
                <div key={day}>
                  <h4>{day}</h4>
                  {dailySpecials[day] ? (
                    <div className={styles.itemRow}>
                      {dailySpecials[day].image && <img src={dailySpecials[day].image} alt={dailySpecials[day].name} style={{width: 60, height: 60, borderRadius: 4}} />}
                      <div style={{flex: 1}}>
                        <div style={{fontWeight: 600}}>{dailySpecials[day].name}</div>
                        <div style={{fontSize: 12, color: '#b9d5de'}}>{dailySpecials[day].price}</div>
                      </div>
                      <button onClick={() => deleteDailySpecial(day)} style={{padding: '6px 10px', background: '#dc2626', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 12}}>Delete</button>
                    </div>
                  ) : (
                    <div style={{color: '#64748b', fontSize: 12}}>No special set</div>
                  )}
                </div>
              ))}
            </section>
          </>
        )}

        {/* CATCH OF THE DAY TAB */}
        {tab === 'catch' && (
          <section className={styles.section}>
            <h2>Catch of the Day</h2>
            <div className={styles.form}>
              <input type="text" placeholder="Name" value={catchOfTheDay.name} onChange={(e) => setCatchOfTheDay({...catchOfTheDay, name: e.target.value})} style={{marginBottom: 10, padding: 10, background: '#1e293b', color: '#f1f5f9', border: '1px solid rgba(255,255,255,.15)', borderRadius: 8, width: '100%'}} />
              <input type="text" placeholder="Price" value={catchOfTheDay.price} onChange={(e) => setCatchOfTheDay({...catchOfTheDay, price: e.target.value})} style={{marginBottom: 10, padding: 10, background: '#1e293b', color: '#f1f5f9', border: '1px solid rgba(255,255,255,.15)', borderRadius: 8, width: '100%'}} />
              <textarea placeholder="Description" value={catchOfTheDay.desc} onChange={(e) => setCatchOfTheDay({...catchOfTheDay, desc: e.target.value})} style={{marginBottom: 10, padding: 10, background: '#1e293b', color: '#f1f5f9', border: '1px solid rgba(255,255,255,.15)', borderRadius: 8, width: '100%', height: 80}} />
              <select value={catchOfTheDay.image || ''} onChange={(e) => setCatchOfTheDay({...catchOfTheDay, image: e.target.value})} style={{marginBottom: 10, padding: 10, background: '#1e293b', color: '#f1f5f9', border: '1px solid rgba(255,255,255,.15)', borderRadius: 8, width: '100%'}}>
                <option value="">Select Image</option>
                {gallery.map(img => <option key={img.id} value={img.url}>{img.name}</option>)}
              </select>
              <button style={{padding: '10px 16px', background: '#0b7a75', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600}}>Update Catch</button>
            </div>
            {catchOfTheDay.name && (
              <div className={styles.itemRow} style={{marginTop: 20}}>
                {catchOfTheDay.image && <img src={catchOfTheDay.image} alt={catchOfTheDay.name} style={{width: 60, height: 60, borderRadius: 4}} />}
                <div><div style={{fontWeight: 600}}>{catchOfTheDay.name}</div><div style={{fontSize: 12, color: '#b9d5de'}}>{catchOfTheDay.price}</div></div>
              </div>
            )}
          </section>
        )}

        {/* EVENTS TAB */}
        {tab === 'events' && (
          <>
            <section className={styles.section}>
              <h2>Add Event</h2>
              <div className={styles.form}>
                <input type="text" placeholder="Event Name" value={editingEvent ? editingEvent.name : newEvent.name} onChange={(e) => editingEvent ? setEditingEvent({...editingEvent, name: e.target.value}) : setNewEvent({...newEvent, name: e.target.value})} style={{marginBottom: 10, padding: 10, background: '#1e293b', color: '#f1f5f9', border: '1px solid rgba(255,255,255,.15)', borderRadius: 8, width: '100%'}} />
                <textarea placeholder="Description" value={editingEvent ? editingEvent.desc : newEvent.desc} onChange={(e) => editingEvent ? setEditingEvent({...editingEvent, desc: e.target.value}) : setNewEvent({...newEvent, desc: e.target.value})} style={{marginBottom: 10, padding: 10, background: '#1e293b', color: '#f1f5f9', border: '1px solid rgba(255,255,255,.15)', borderRadius: 8, width: '100%', height: 80}} />
                <input type="datetime-local" value={editingEvent ? editingEvent.date : newEvent.date} onChange={(e) => editingEvent ? setEditingEvent({...editingEvent, date: e.target.value}) : setNewEvent({...newEvent, date: e.target.value})} style={{marginBottom: 10, padding: 10, background: '#1e293b', color: '#f1f5f9', border: '1px solid rgba(255,255,255,.15)', borderRadius: 8, width: '100%'}} />
                <input type="text" placeholder="Location" value={editingEvent ? editingEvent.location : newEvent.location} onChange={(e) => editingEvent ? setEditingEvent({...editingEvent, location: e.target.value}) : setNewEvent({...newEvent, location: e.target.value})} style={{marginBottom: 10, padding: 10, background: '#1e293b', color: '#f1f5f9', border: '1px solid rgba(255,255,255,.15)', borderRadius: 8, width: '100%'}} />
                <select value={editingEvent ? (editingEvent.image || '') : (newEvent.image || '')} onChange={(e) => editingEvent ? setEditingEvent({...editingEvent, image: e.target.value}) : setNewEvent({...newEvent, image: e.target.value})} style={{marginBottom: 10, padding: 10, background: '#1e293b', color: '#f1f5f9', border: '1px solid rgba(255,255,255,.15)', borderRadius: 8, width: '100%'}}>
                  <option value="">Select Image</option>
                  {gallery.map(img => <option key={img.id} value={img.url}>{img.name}</option>)}
                </select>
                <label style={{marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8}}>
                  <input type="checkbox" checked={editingEvent ? editingEvent.active : newEvent.active} onChange={(e) => editingEvent ? setEditingEvent({...editingEvent, active: e.target.checked}) : setNewEvent({...newEvent, active: e.target.checked})} />
                  Active
                </label>
                <button onClick={editingEvent ? updateEvent : addEvent} style={{padding: '10px 16px', background: '#0b7a75', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600}}>
                  {editingEvent ? 'Update Event' : 'Add Event'}
                </button>
                {editingEvent && <button onClick={() => setEditingEvent(null)} style={{marginLeft: 8, padding: '10px 16px', background: '#64748b', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer'}}>Cancel</button>}
              </div>
            </section>

            <section className={styles.section}>
              <h2>Events</h2>
              {events.map(event => (
                <div key={event.id} className={styles.itemRow}>
                  {event.image && <img src={event.image} alt={event.name} style={{width: 60, height: 60, borderRadius: 4}} />}
                  <div style={{flex: 1}}>
                    <div style={{fontWeight: 600}}>{event.name}</div>
                    <div style={{fontSize: 12, color: '#b9d5de'}}>{event.date} • {event.location} {event.active ? '✓' : '○'}</div>
                  </div>
                  <button onClick={() => setEditingEvent(event)} style={{padding: '6px 10px', background: '#0b7a75', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 12}}>Edit</button>
                  <button onClick={() => deleteEvent(event.id)} style={{padding: '6px 10px', background: '#dc2626', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer', fontSize: 12, marginLeft: 4}}>Delete</button>
                </div>
              ))}
            </section>
          </>
        )}

        {/* GALLERY TAB */}
        {tab === 'gallery' && (
          <section className={styles.section}>
            <h2>Image Gallery</h2>
            <button onClick={() => fileInputRef.current.click()} className={styles.uploadBtn} style={{marginBottom: 16, padding: '10px 16px', background: '#0b7a75', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600}}>
              + Upload Image
            </button>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
            <div className={styles.gallery} style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: 12}}>
              {gallery.map((img) => (
                <div key={img.id} className={styles.galleryItem} style={{position: 'relative'}}>
                  <img src={img.url} alt={img.name} style={{width: '100%', height: 100, objectFit: 'cover', borderRadius: 8}} />
                  <p style={{fontSize: 12, marginTop: 4, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis'}}>{img.name}</p>
                  <button onClick={() => setGallery(gallery.filter(g => g.id !== img.id))} className={styles.deleteBtn} style={{position: 'absolute', top: 4, right: 4, background: '#dc2626', color: 'white', border: 'none', borderRadius: '50%', width: 24, height: 24, cursor: 'pointer', fontSize: 12}}>
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
