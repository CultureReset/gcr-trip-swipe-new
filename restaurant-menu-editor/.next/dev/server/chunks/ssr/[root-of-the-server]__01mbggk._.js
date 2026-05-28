module.exports = [
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/react-dom [external] (react-dom, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("react-dom", () => require("react-dom"));

module.exports = mod;
}),
"[project]/restaurant-menu-editor/styles/Home.module.css [ssr] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "active": "Home-module__NyIQma__active",
  "activeCategory": "Home-module__NyIQma__activeCategory",
  "addBtn": "Home-module__NyIQma__addBtn",
  "cancelBtn": "Home-module__NyIQma__cancelBtn",
  "cardBody": "Home-module__NyIQma__cardBody",
  "cardDesc": "Home-module__NyIQma__cardDesc",
  "cardPrice": "Home-module__NyIQma__cardPrice",
  "cardsContainer": "Home-module__NyIQma__cardsContainer",
  "categoryNav": "Home-module__NyIQma__categoryNav",
  "container": "Home-module__NyIQma__container",
  "delBtn": "Home-module__NyIQma__delBtn",
  "deleteBtn": "Home-module__NyIQma__deleteBtn",
  "editBtn": "Home-module__NyIQma__editBtn",
  "editor": "Home-module__NyIQma__editor",
  "empty": "Home-module__NyIQma__empty",
  "form": "Home-module__NyIQma__form",
  "formButtons": "Home-module__NyIQma__formButtons",
  "formGrid": "Home-module__NyIQma__formGrid",
  "gallery": "Home-module__NyIQma__gallery",
  "galleryItem": "Home-module__NyIQma__galleryItem",
  "header": "Home-module__NyIQma__header",
  "hint": "Home-module__NyIQma__hint",
  "hintLike": "Home-module__NyIQma__hintLike",
  "hintNope": "Home-module__NyIQma__hintNope",
  "itemActions": "Home-module__NyIQma__itemActions",
  "itemInfo": "Home-module__NyIQma__itemInfo",
  "itemMeta": "Home-module__NyIQma__itemMeta",
  "itemName": "Home-module__NyIQma__itemName",
  "itemRow": "Home-module__NyIQma__itemRow",
  "itemsList": "Home-module__NyIQma__itemsList",
  "like": "Home-module__NyIQma__like",
  "nope": "Home-module__NyIQma__nope",
  "pinBox": "Home-module__NyIQma__pinBox",
  "pinScreen": "Home-module__NyIQma__pinScreen",
  "preview": "Home-module__NyIQma__preview",
  "publishBtn": "Home-module__NyIQma__publishBtn",
  "saveBtn": "Home-module__NyIQma__saveBtn",
  "section": "Home-module__NyIQma__section",
  "swipeCardContent": "Home-module__NyIQma__swipeCardContent",
  "swipeFlash": "Home-module__NyIQma__swipeFlash",
  "swipeFlashAnim": "Home-module__NyIQma__swipeFlashAnim",
  "swipeHint": "Home-module__NyIQma__swipeHint",
  "swipeImg": "Home-module__NyIQma__swipeImg",
  "tabs": "Home-module__NyIQma__tabs",
  "tinderCard": "Home-module__NyIQma__tinderCard",
  "uploadBtn": "Home-module__NyIQma__uploadBtn",
});
}),
"[project]/restaurant-menu-editor/pages/index.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MenuEditor
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$tinder$2d$card__$5b$external$5d$__$28$react$2d$tinder$2d$card$2c$__cjs$2c$__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2d$tinder$2d$card$29$__ = __turbopack_context__.i("[externals]/react-tinder-card [external] (react-tinder-card, cjs, [project]/restaurant-menu-editor/node_modules/react-tinder-card)");
var __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/restaurant-menu-editor/node_modules/next/router.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$styles$2f$Home$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/restaurant-menu-editor/styles/Home.module.css [ssr] (css module)");
;
;
;
;
;
function MenuEditor() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [slug, setSlug] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(true);
    const [saving, setSaving] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const pinRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const [pinEntered, setPinEntered] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const [pin, setPin] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [restaurant, setRestaurant] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])({
        name: '',
        icon: '🍽️',
        tagline: ''
    });
    const [gallery, setGallery] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [sections, setSections] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [items, setItems] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    const [editingItem, setEditingItem] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [newItem, setNewItem] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])({
        section: '',
        name: '',
        price: '',
        desc: '',
        image: null
    });
    const [view, setView] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('editor');
    const [selectedSection, setSelectedSection] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [lastAction, setLastAction] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const fileInputRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])(null);
    const swipeRef = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useRef"])([]);
    // Load data on mount
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        // Pre-seed Gulf Island Grill on first load
        if (!localStorage.getItem('menu_gulfislandgrill')) {
            const gulfData = {
                restaurant: {
                    name: 'Gulf Island Grill',
                    icon: '🍽️',
                    tagline: 'Fresh Gulf Coast Flavors'
                },
                sections: [
                    'Soups',
                    'Salads',
                    'From the Grill',
                    'House Specialties',
                    'Sandwiches',
                    'From the Fryer',
                    'Pasta',
                    'From the Steamer',
                    'Desserts',
                    'Drinks'
                ],
                items: [
                    {
                        id: 1,
                        section: 'Soups',
                        name: 'Crab and Corn Bisque',
                        price: '$8/$12',
                        desc: 'Creamy crab meat treasure served with crackers.',
                        image: null
                    },
                    {
                        id: 2,
                        section: 'Soups',
                        name: 'Seafood Gumbo',
                        price: '$8/$12',
                        desc: 'Made from scratch shrimp & sausage gumbo served with crackers.',
                        image: null
                    },
                    {
                        id: 3,
                        section: 'Salads',
                        name: 'The Grill Salad',
                        price: '$17',
                        desc: 'Fresh tossed greens with grilled chicken, craisins, pineapple, parmesan cheese, and toasted almonds.',
                        image: null
                    },
                    {
                        id: 4,
                        section: 'Salads',
                        name: 'Mango Shrimp Salad',
                        price: '$17',
                        desc: 'Fresh greens with red onions, cherry tomatoes, boiled egg, parmesan cheese topped with mango BBQ shrimp.',
                        image: null
                    },
                    {
                        id: 5,
                        section: 'Salads',
                        name: 'Tender Salad',
                        price: '$16',
                        desc: 'Fresh greens with red onions, cherry tomatoes, boiled egg, parmesan cheese topped with crispy fried chicken.',
                        image: null
                    },
                    {
                        id: 6,
                        section: 'From the Grill',
                        name: 'Islamorada Chicken',
                        price: '$20',
                        desc: 'Grilled chicken breast marinated with island flavors. Served with Caribbean rice, steamed veggies, and grilled pineapple.',
                        image: null
                    },
                    {
                        id: 7,
                        section: 'From the Grill',
                        name: 'Ribeye',
                        price: '$30',
                        desc: 'Hand cut and grilled to your liking, served with mashed potatoes and steamed veggies.',
                        image: null
                    },
                    {
                        id: 8,
                        section: 'From the Grill',
                        name: 'Caribbean Shrimp Kabobs',
                        price: '$24',
                        desc: '2 grilled shrimp skewers with Caribbean rice, steamed veggies, and grilled pineapple.',
                        image: null
                    },
                    {
                        id: 9,
                        section: 'From the Grill',
                        name: 'Surf and Turf',
                        price: '$36',
                        desc: '12oz ribeye with your choice of grilled shrimp skewer, fried shrimp, or stuffed crab. Served with Gulf Island potatoes and steamed veggies.',
                        image: null
                    },
                    {
                        id: 10,
                        section: 'From the Grill',
                        name: 'Mahi Tacos',
                        price: '$22',
                        desc: 'Fresh mahi mahi wrapped in flour tortilla with homemade pico de gallo, fresh lettuce, and cheese. Served with chips and salsa.',
                        image: null
                    },
                    {
                        id: 11,
                        section: 'From the Grill',
                        name: 'Baja Catch',
                        price: '$22',
                        desc: 'Fresh fish prepared grilled or blackened. Served with Caribbean rice and steamed veggies.',
                        image: null
                    },
                    {
                        id: 12,
                        section: 'From the Grill',
                        name: 'Shrimp Scampi',
                        price: '$22',
                        desc: 'Fresh gulf shrimp sautéed in garlic wine butter. Served with Caribbean rice and steamed veggies.',
                        image: null
                    },
                    {
                        id: 13,
                        section: 'House Specialties',
                        name: 'Grouper Roulade',
                        price: '$24',
                        desc: 'Fresh grouper stuffed with crabmeat and broiled in garlic-wine butter cream sauce. Served with mashed potatoes and steamed veggies.',
                        image: null
                    },
                    {
                        id: 14,
                        section: 'House Specialties',
                        name: 'Baby Back Ribs',
                        price: '$28',
                        desc: 'Full 2 lb rack rubbed with island spices and slow cooked. Served with fries and Key West slaw.',
                        image: null
                    },
                    {
                        id: 15,
                        section: 'House Specialties',
                        name: 'Grouper Parmesan',
                        price: '$24',
                        desc: 'Baked grouper topped with fresh parmesan. Served with mashed potatoes and steamed veggies.',
                        image: null
                    },
                    {
                        id: 16,
                        section: 'House Specialties',
                        name: 'Gulf Island Ya-Ya',
                        price: '$23',
                        desc: 'Shrimp, chicken, Andouille sausage, peppers, onions, and tomatoes in garlic cheddar sauce on Caribbean rice. Served with garlic bread.',
                        image: null
                    },
                    {
                        id: 17,
                        section: 'House Specialties',
                        name: 'Gulf Island Catch',
                        price: '$22',
                        desc: 'Voted one of the BEST dishes on the island. Lightly pan-fried fish topped with creamy shrimp & andouille sausage sauce. Served with steamed veggies.',
                        image: null
                    },
                    {
                        id: 18,
                        section: 'House Specialties',
                        name: 'Coconut Shrimp',
                        price: '$14',
                        desc: 'Homemade with crispy coconut batter. Served with homemade Jezabel sauce.',
                        image: null
                    },
                    {
                        id: 19,
                        section: 'House Specialties',
                        name: 'Buffalo Shrimp',
                        price: '$14',
                        desc: 'Hearty portion of popcorn shrimp tossed in honey BBQ, mango BBQ, or hot sauce.',
                        image: null
                    },
                    {
                        id: 20,
                        section: 'Sandwiches',
                        name: 'Po\'Boys',
                        price: '$17',
                        desc: 'Shrimp, crawfish, or grouper served on French loaf with lettuce, tomato, and onion.',
                        image: null
                    },
                    {
                        id: 21,
                        section: 'Sandwiches',
                        name: 'Jerk Chicken Sandwich',
                        price: '$15',
                        desc: 'Marinated chicken breast with grilled pineapple on toasted buns with lettuce, tomato, and onion.',
                        image: null
                    },
                    {
                        id: 22,
                        section: 'Sandwiches',
                        name: 'Island Burger',
                        price: '$14',
                        desc: '1/2 lb burger grilled with island spices. Customize with cheese, bacon, mushrooms, or pineapple.',
                        image: null
                    },
                    {
                        id: 23,
                        section: 'From the Fryer',
                        name: 'Fried Gulf Shrimp',
                        price: '$22',
                        desc: '10 golden brown shrimp served with cocktail sauce.',
                        image: null
                    },
                    {
                        id: 24,
                        section: 'From the Fryer',
                        name: 'Fried Grouper',
                        price: '$20',
                        desc: 'Fresh and local grouper cut into thin strips. Served with tartar sauce.',
                        image: null
                    },
                    {
                        id: 25,
                        section: 'From the Fryer',
                        name: 'Fried Chicken Tenders',
                        price: '$17',
                        desc: 'Fried, juicy chicken tenders. Served with homemade honey mustard.',
                        image: null
                    },
                    {
                        id: 26,
                        section: 'From the Fryer',
                        name: 'Bon Secour Platter',
                        price: '$26',
                        desc: 'Fried grouper strips, crawfish tails, gulf shrimp, and stuffed crab.',
                        image: null
                    },
                    {
                        id: 27,
                        section: 'Pasta',
                        name: 'Seafood Pasta',
                        price: '$24',
                        desc: 'Steamed shrimp & crawfish tails tossed in parmesan sauce with peppers and onions over penne noodles.',
                        image: null
                    },
                    {
                        id: 28,
                        section: 'Pasta',
                        name: 'Chicken Alfredo',
                        price: '$22',
                        desc: 'Grilled chicken tossed in parmesan sauce with peppers and onions over penne noodles. Served with french fries and slaw.',
                        image: null
                    },
                    {
                        id: 29,
                        section: 'Pasta',
                        name: 'Blackened Chicken Alfredo',
                        price: '$22',
                        desc: 'Creole-style blackened chicken tossed in parmesan sauce with peppers and onions over penne noodles.',
                        image: null
                    },
                    {
                        id: 30,
                        section: 'From the Steamer',
                        name: 'Boiled Shrimp Dinner',
                        price: '$24',
                        desc: 'Fresh local shrimp steamed with Old Bay. Served with new potatoes, corn, lemons, drawn butter, and hushpuppy.',
                        image: null
                    },
                    {
                        id: 31,
                        section: 'From the Steamer',
                        name: 'Snow Crab Legs',
                        price: 'Market Price',
                        desc: 'Your choice of 1 lb or 2 lb steamed crab legs with Old Bay. Served with potatoes, corn, lemons, and drawn butter.',
                        image: null
                    },
                    {
                        id: 32,
                        section: 'Desserts',
                        name: 'Peanut Butter Pie',
                        price: '$7.99',
                        desc: 'Creamy peanut butter pie drizzled with chocolate syrup with chocolate cracker crust.',
                        image: null
                    },
                    {
                        id: 33,
                        section: 'Desserts',
                        name: 'Salted Caramel Cheesecake',
                        price: '$7.99',
                        desc: 'Creamy, rich cheesecake with smooth caramel and a hint of sea salt.',
                        image: null
                    },
                    {
                        id: 34,
                        section: 'Desserts',
                        name: 'Key Lime Pie',
                        price: '$7.99',
                        desc: 'A classic made with graham cracker crust and drizzled with kiwi syrup.',
                        image: null
                    }
                ],
                gallery: [],
                pin: '1234'
            };
            localStorage.setItem('menu_gulfislandgrill', JSON.stringify(gulfData));
        }
        const businessSlug = new URLSearchParams(window.location.search).get('slug');
        if (!businessSlug) {
            router.replace('/?slug=gulfislandgrill');
            return;
        }
        setSlug(businessSlug);
        const loadData = ()=>{
            try {
                const stored = localStorage.getItem(`menu_${businessSlug}`);
                if (!stored) {
                    router.replace('/new');
                    return;
                }
                const data = JSON.parse(stored);
                pinRef.current = data.pin;
                setRestaurant(data.restaurant);
                setSections(data.sections);
                setItems(data.items);
                setGallery(data.gallery);
                setSelectedSection(data.sections[0] || '');
                setNewItem({
                    section: data.sections[0] || '',
                    name: '',
                    price: '',
                    desc: '',
                    image: null
                });
            } catch (err) {
                console.error('Load failed:', err);
            } finally{
                setLoading(false);
            }
        };
        loadData();
    }, []);
    // PIN handler
    const handlePinSubmit = (e)=>{
        e.preventDefault();
        if (pin === pinRef.current) {
            setPinEntered(true);
        } else {
            alert('Invalid PIN');
            setPin('');
        }
    };
    // Image upload
    const handleImageUpload = (e)=>{
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event)=>{
            const newImage = {
                id: Math.max(...gallery.map((g)=>g.id || 0), 0) + 1,
                url: event.target.result,
                name: file.name
            };
            setGallery([
                ...gallery,
                newImage
            ]);
        };
        reader.readAsDataURL(file);
    };
    // Item handlers
    const addItem = ()=>{
        if (!newItem.name || !newItem.price || newItem.image === null) {
            alert('Fill all fields');
            return;
        }
        const item = {
            id: Math.max(...items.map((i)=>i.id), 0) + 1,
            ...newItem
        };
        setItems([
            ...items,
            item
        ]);
        setNewItem({
            section: 'Seafood',
            name: '',
            price: '',
            desc: '',
            image: null
        });
    };
    const updateItem = ()=>{
        if (!editingItem.name || !editingItem.price || editingItem.image === null) {
            alert('Fill all fields');
            return;
        }
        setItems(items.map((i)=>i.id === editingItem.id ? editingItem : i));
        setEditingItem(null);
    };
    const deleteItem = (id)=>{
        setItems(items.filter((i)=>i.id !== id));
    };
    // Swipe handlers
    const itemsToShow = items.filter((i)=>i.section === selectedSection);
    const handleSwipe = (direction, item)=>{
        setLastAction(direction === 'right' ? 'like' : 'nope');
        setTimeout(()=>setLastAction(null), 1000);
    };
    const handleCardLeftScreen = (item)=>{
    // Card removed, next one will show automatically
    };
    // Publish/Save data
    const publishMenu = async ()=>{
        setSaving(true);
        try {
            const data = {
                restaurant,
                sections,
                items,
                gallery,
                pin: pinRef.current
            };
            localStorage.setItem(`menu_${slug}`, JSON.stringify(data));
            alert('✅ Saved!');
        } catch (err) {
            alert('Save error: ' + err.message);
        } finally{
            setSaving(false);
        }
    };
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$styles$2f$Home$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].pinScreen,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$styles$2f$Home$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].pinBox,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                    children: "Loading..."
                }, void 0, false, {
                    fileName: "[project]/restaurant-menu-editor/pages/index.js",
                    lineNumber: 198,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/restaurant-menu-editor/pages/index.js",
                lineNumber: 197,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/restaurant-menu-editor/pages/index.js",
            lineNumber: 196,
            columnNumber: 7
        }, this);
    }
    if (!pinEntered) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$styles$2f$Home$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].pinScreen,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$styles$2f$Home$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].pinBox,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                        children: "🔐 Menu Editor"
                    }, void 0, false, {
                        fileName: "[project]/restaurant-menu-editor/pages/index.js",
                        lineNumber: 208,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                        children: "Enter PIN to continue"
                    }, void 0, false, {
                        fileName: "[project]/restaurant-menu-editor/pages/index.js",
                        lineNumber: 209,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("form", {
                        onSubmit: handlePinSubmit,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                type: "password",
                                value: pin,
                                onChange: (e)=>setPin(e.target.value),
                                placeholder: "Enter PIN",
                                maxLength: "4",
                                autoFocus: true
                            }, void 0, false, {
                                fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                lineNumber: 211,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                type: "submit",
                                children: "Unlock"
                            }, void 0, false, {
                                fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                lineNumber: 219,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/restaurant-menu-editor/pages/index.js",
                        lineNumber: 210,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/restaurant-menu-editor/pages/index.js",
                lineNumber: 207,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/restaurant-menu-editor/pages/index.js",
            lineNumber: 206,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$styles$2f$Home$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].container,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("header", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$styles$2f$Home$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].header,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                        children: [
                            restaurant.icon,
                            " ",
                            restaurant.name
                        ]
                    }, void 0, true, {
                        fileName: "[project]/restaurant-menu-editor/pages/index.js",
                        lineNumber: 229,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                        children: restaurant.tagline
                    }, void 0, false, {
                        fileName: "[project]/restaurant-menu-editor/pages/index.js",
                        lineNumber: 230,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$styles$2f$Home$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].tabs,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                className: view === 'editor' ? __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$styles$2f$Home$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].active : '',
                                onClick: ()=>setView('editor'),
                                children: "✏️ Edit"
                            }, void 0, false, {
                                fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                lineNumber: 232,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                className: view === 'preview' ? __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$styles$2f$Home$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].active : '',
                                onClick: ()=>setView('preview'),
                                children: "👁️ Preview"
                            }, void 0, false, {
                                fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                lineNumber: 235,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/restaurant-menu-editor/pages/index.js",
                        lineNumber: 231,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/restaurant-menu-editor/pages/index.js",
                lineNumber: 228,
                columnNumber: 7
            }, this),
            view === 'editor' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$styles$2f$Home$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].editor,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$styles$2f$Home$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].section,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                children: "📷 Image Gallery"
                            }, void 0, false, {
                                fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                lineNumber: 245,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                onClick: ()=>fileInputRef.current.click(),
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$styles$2f$Home$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].uploadBtn,
                                children: "+ Upload Image"
                            }, void 0, false, {
                                fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                lineNumber: 246,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                ref: fileInputRef,
                                type: "file",
                                accept: "image/*",
                                onChange: handleImageUpload,
                                style: {
                                    display: 'none'
                                }
                            }, void 0, false, {
                                fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                lineNumber: 249,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$styles$2f$Home$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].gallery,
                                children: gallery.map((img)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$styles$2f$Home$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].galleryItem,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                                src: img.url,
                                                alt: img.name
                                            }, void 0, false, {
                                                fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                lineNumber: 259,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                children: img.name
                                            }, void 0, false, {
                                                fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                lineNumber: 260,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setGallery(gallery.filter((g)=>g.id !== img.id)),
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$styles$2f$Home$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].deleteBtn,
                                                children: "✕"
                                            }, void 0, false, {
                                                fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                lineNumber: 261,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, img.id, true, {
                                        fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                        lineNumber: 258,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                lineNumber: 256,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/restaurant-menu-editor/pages/index.js",
                        lineNumber: 244,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$styles$2f$Home$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].section,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                children: "🍽️ Menu Items"
                            }, void 0, false, {
                                fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                lineNumber: 274,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$styles$2f$Home$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].form,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h3", {
                                        children: editingItem ? 'Edit Item' : 'Add New Item'
                                    }, void 0, false, {
                                        fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                        lineNumber: 278,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$styles$2f$Home$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].formGrid,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("select", {
                                                value: editingItem ? editingItem.section : newItem.section,
                                                onChange: (e)=>editingItem ? setEditingItem({
                                                        ...editingItem,
                                                        section: e.target.value
                                                    }) : setNewItem({
                                                        ...newItem,
                                                        section: e.target.value
                                                    }),
                                                children: sections.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                        children: s
                                                    }, s, false, {
                                                        fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                        lineNumber: 287,
                                                        columnNumber: 38
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                lineNumber: 280,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                placeholder: "Item name",
                                                value: editingItem ? editingItem.name : newItem.name,
                                                onChange: (e)=>editingItem ? setEditingItem({
                                                        ...editingItem,
                                                        name: e.target.value
                                                    }) : setNewItem({
                                                        ...newItem,
                                                        name: e.target.value
                                                    })
                                            }, void 0, false, {
                                                fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                lineNumber: 290,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                placeholder: "Price",
                                                value: editingItem ? editingItem.price : newItem.price,
                                                onChange: (e)=>editingItem ? setEditingItem({
                                                        ...editingItem,
                                                        price: e.target.value
                                                    }) : setNewItem({
                                                        ...newItem,
                                                        price: e.target.value
                                                    })
                                            }, void 0, false, {
                                                fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                lineNumber: 300,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("select", {
                                                value: editingItem ? editingItem.image || '' : newItem.image || '',
                                                onChange: (e)=>editingItem ? setEditingItem({
                                                        ...editingItem,
                                                        image: e.target.value
                                                    }) : setNewItem({
                                                        ...newItem,
                                                        image: e.target.value
                                                    }),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                        value: "",
                                                        children: "Select Image"
                                                    }, void 0, false, {
                                                        fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                        lineNumber: 317,
                                                        columnNumber: 19
                                                    }, this),
                                                    gallery.map((img)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("option", {
                                                            value: img.url,
                                                            children: img.name
                                                        }, img.id, false, {
                                                            fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                            lineNumber: 319,
                                                            columnNumber: 21
                                                        }, this))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                lineNumber: 310,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("textarea", {
                                                placeholder: "Description",
                                                value: editingItem ? editingItem.desc : newItem.desc,
                                                onChange: (e)=>editingItem ? setEditingItem({
                                                        ...editingItem,
                                                        desc: e.target.value
                                                    }) : setNewItem({
                                                        ...newItem,
                                                        desc: e.target.value
                                                    })
                                            }, void 0, false, {
                                                fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                lineNumber: 323,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$styles$2f$Home$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].formButtons,
                                                children: editingItem ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["Fragment"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                            onClick: updateItem,
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$styles$2f$Home$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].saveBtn,
                                                            children: "Save"
                                                        }, void 0, false, {
                                                            fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                            lineNumber: 335,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>setEditingItem(null),
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$styles$2f$Home$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].cancelBtn,
                                                            children: "Cancel"
                                                        }, void 0, false, {
                                                            fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                            lineNumber: 336,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                    onClick: addItem,
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$styles$2f$Home$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].addBtn,
                                                    children: "Add Item"
                                                }, void 0, false, {
                                                    fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                    lineNumber: 339,
                                                    columnNumber: 21
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                lineNumber: 332,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                        lineNumber: 279,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                lineNumber: 277,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$styles$2f$Home$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].itemsList,
                                children: sections.map((section)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h4", {
                                                children: section
                                            }, void 0, false, {
                                                fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                lineNumber: 349,
                                                columnNumber: 19
                                            }, this),
                                            items.filter((i)=>i.section === section).map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$styles$2f$Home$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].itemRow,
                                                    children: [
                                                        item.image && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                                            src: item.image,
                                                            alt: item.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                            lineNumber: 352,
                                                            columnNumber: 40
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$styles$2f$Home$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].itemInfo,
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$styles$2f$Home$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].itemName,
                                                                    children: item.name
                                                                }, void 0, false, {
                                                                    fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                                    lineNumber: 354,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$styles$2f$Home$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].itemMeta,
                                                                    children: [
                                                                        item.price,
                                                                        " • ",
                                                                        item.desc.substring(0, 40),
                                                                        "..."
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                                    lineNumber: 355,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                            lineNumber: 353,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$styles$2f$Home$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].itemActions,
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                                    onClick: ()=>setEditingItem(item),
                                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$styles$2f$Home$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].editBtn,
                                                                    children: "Edit"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                                    lineNumber: 358,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                                                    onClick: ()=>deleteItem(item.id),
                                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$styles$2f$Home$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].delBtn,
                                                                    children: "Delete"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                                    lineNumber: 359,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                            lineNumber: 357,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, item.id, true, {
                                                    fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                    lineNumber: 351,
                                                    columnNumber: 23
                                                }, this))
                                        ]
                                    }, section, true, {
                                        fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                        lineNumber: 348,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                lineNumber: 346,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/restaurant-menu-editor/pages/index.js",
                        lineNumber: 273,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$styles$2f$Home$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].section,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                            onClick: publishMenu,
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$styles$2f$Home$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].publishBtn,
                            children: "📤 Publish to API"
                        }, void 0, false, {
                            fileName: "[project]/restaurant-menu-editor/pages/index.js",
                            lineNumber: 370,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/restaurant-menu-editor/pages/index.js",
                        lineNumber: 369,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/restaurant-menu-editor/pages/index.js",
                lineNumber: 242,
                columnNumber: 9
            }, this) : // CUSTOMER PREVIEW WITH SWIPE
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$styles$2f$Home$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].preview,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$styles$2f$Home$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].categoryNav,
                        children: sections.map((section)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                onClick: ()=>setSelectedSection(section),
                                className: selectedSection === section ? __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$styles$2f$Home$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].activeCategory : '',
                                children: section
                            }, section, false, {
                                fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                lineNumber: 380,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/restaurant-menu-editor/pages/index.js",
                        lineNumber: 378,
                        columnNumber: 11
                    }, this),
                    lastAction && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$styles$2f$Home$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].swipeFlash} ${__TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$styles$2f$Home$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"][lastAction]}`,
                        children: lastAction === 'like' ? '❤️ LIKE' : '✕ NOPE'
                    }, void 0, false, {
                        fileName: "[project]/restaurant-menu-editor/pages/index.js",
                        lineNumber: 391,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$styles$2f$Home$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].cardsContainer,
                        children: itemsToShow.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$styles$2f$Home$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].empty,
                            children: "No items in this section"
                        }, void 0, false, {
                            fileName: "[project]/restaurant-menu-editor/pages/index.js",
                            lineNumber: 398,
                            columnNumber: 15
                        }, this) : itemsToShow.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f$react$2d$tinder$2d$card__$5b$external$5d$__$28$react$2d$tinder$2d$card$2c$__cjs$2c$__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2d$tinder$2d$card$29$__["default"], {
                                onSwipe: (dir)=>handleSwipe(dir, item),
                                onCardLeftScreen: ()=>handleCardLeftScreen(item),
                                preventSwipe: [
                                    'up',
                                    'down'
                                ],
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$styles$2f$Home$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].tinderCard,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$styles$2f$Home$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].swipeCardContent,
                                    children: [
                                        item.image && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                            src: item.image,
                                            alt: item.name,
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$styles$2f$Home$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].swipeImg
                                        }, void 0, false, {
                                            fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                            lineNumber: 410,
                                            columnNumber: 25
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$styles$2f$Home$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].cardBody,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                                    children: item.name
                                                }, void 0, false, {
                                                    fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                    lineNumber: 413,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$styles$2f$Home$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].cardPrice,
                                                    children: item.price
                                                }, void 0, false, {
                                                    fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                    lineNumber: 414,
                                                    columnNumber: 25
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$styles$2f$Home$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].cardDesc,
                                                    children: item.desc
                                                }, void 0, false, {
                                                    fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                    lineNumber: 415,
                                                    columnNumber: 25
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                            lineNumber: 412,
                                            columnNumber: 23
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                    lineNumber: 408,
                                    columnNumber: 21
                                }, this)
                            }, item.id, false, {
                                fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                lineNumber: 401,
                                columnNumber: 19
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/restaurant-menu-editor/pages/index.js",
                        lineNumber: 396,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$styles$2f$Home$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].swipeHint,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$styles$2f$Home$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].hintNope,
                                children: "← NOPE"
                            }, void 0, false, {
                                fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                lineNumber: 424,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$styles$2f$Home$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].hintLike,
                                children: "LIKE →"
                            }, void 0, false, {
                                fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                lineNumber: 425,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/restaurant-menu-editor/pages/index.js",
                        lineNumber: 423,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/restaurant-menu-editor/pages/index.js",
                lineNumber: 377,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/restaurant-menu-editor/pages/index.js",
        lineNumber: 227,
        columnNumber: 5
    }, this);
}
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__01mbggk._.js.map