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
"[project]/restaurant-menu-editor/pages/new.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>NewBusiness
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/restaurant-menu-editor/node_modules/next/router.js [ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$styles$2f$Home$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/restaurant-menu-editor/styles/Home.module.css [ssr] (css module)");
;
;
;
;
function NewBusiness() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$next$2f$router$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])({
        slug: '',
        name: '',
        tagline: '',
        icon: '🍽️',
        pin: ''
    });
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])('');
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(false);
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const initialData = {
                restaurant: {
                    name: form.name,
                    tagline: form.tagline,
                    icon: form.icon
                },
                sections: [
                    'Appetizers',
                    'Main Course',
                    'Drinks',
                    'Desserts'
                ],
                items: [],
                gallery: [],
                pin: form.pin
            };
            const res = await fetch(`/api/data?slug=${form.slug}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(initialData)
            });
            if (!res.ok) {
                const data = await res.json();
                setError(data.error || 'Failed to create');
                setLoading(false);
                return;
            }
            router.push(`/?slug=${form.slug}`);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$styles$2f$Home$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].pinScreen,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$styles$2f$Home$2e$module$2e$css__$5b$ssr$5d$__$28$css__module$29$__["default"].pinBox,
            style: {
                maxWidth: 400
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                    children: "🍽️ New Restaurant"
                }, void 0, false, {
                    fileName: "[project]/restaurant-menu-editor/pages/new.js",
                    lineNumber: 58,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                    children: "Create a menu"
                }, void 0, false, {
                    fileName: "[project]/restaurant-menu-editor/pages/new.js",
                    lineNumber: 59,
                    columnNumber: 9
                }, this),
                error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                    style: {
                        color: '#f87171',
                        marginBottom: 12,
                        fontSize: 14
                    },
                    children: error
                }, void 0, false, {
                    fileName: "[project]/restaurant-menu-editor/pages/new.js",
                    lineNumber: 60,
                    columnNumber: 19
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("form", {
                    onSubmit: handleSubmit,
                    style: {
                        textAlign: 'left'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                            placeholder: "Restaurant Name *",
                            required: true,
                            value: form.name,
                            onChange: (e)=>setForm({
                                    ...form,
                                    name: e.target.value
                                }),
                            style: {
                                marginBottom: 10
                            }
                        }, void 0, false, {
                            fileName: "[project]/restaurant-menu-editor/pages/new.js",
                            lineNumber: 62,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                            placeholder: "URL slug (e.g. island-grill) *",
                            required: true,
                            value: form.slug,
                            onChange: (e)=>setForm({
                                    ...form,
                                    slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-')
                                }),
                            style: {
                                marginBottom: 10
                            }
                        }, void 0, false, {
                            fileName: "[project]/restaurant-menu-editor/pages/new.js",
                            lineNumber: 69,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                            placeholder: "Tagline",
                            value: form.tagline,
                            onChange: (e)=>setForm({
                                    ...form,
                                    tagline: e.target.value
                                }),
                            style: {
                                marginBottom: 10
                            }
                        }, void 0, false, {
                            fileName: "[project]/restaurant-menu-editor/pages/new.js",
                            lineNumber: 76,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                            placeholder: "Icon emoji",
                            value: form.icon,
                            onChange: (e)=>setForm({
                                    ...form,
                                    icon: e.target.value.substring(0, 2)
                                }),
                            style: {
                                marginBottom: 10
                            }
                        }, void 0, false, {
                            fileName: "[project]/restaurant-menu-editor/pages/new.js",
                            lineNumber: 82,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                            type: "password",
                            placeholder: "PIN (4 digits) *",
                            required: true,
                            maxLength: "4",
                            value: form.pin,
                            onChange: (e)=>setForm({
                                    ...form,
                                    pin: e.target.value
                                }),
                            style: {
                                marginBottom: 16
                            }
                        }, void 0, false, {
                            fileName: "[project]/restaurant-menu-editor/pages/new.js",
                            lineNumber: 88,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                            type: "submit",
                            disabled: loading,
                            style: {
                                cursor: loading ? 'not-allowed' : 'pointer'
                            },
                            children: loading ? 'Creating...' : 'Create Restaurant'
                        }, void 0, false, {
                            fileName: "[project]/restaurant-menu-editor/pages/new.js",
                            lineNumber: 97,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/restaurant-menu-editor/pages/new.js",
                    lineNumber: 61,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/restaurant-menu-editor/pages/new.js",
            lineNumber: 57,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/restaurant-menu-editor/pages/new.js",
        lineNumber: 56,
        columnNumber: 5
    }, this);
}
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__02dqhm8._.js.map