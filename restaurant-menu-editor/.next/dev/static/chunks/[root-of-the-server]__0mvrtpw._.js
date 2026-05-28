(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[turbopack]/browser/dev/hmr-client/hmr-client.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference path="../../../shared/runtime/runtime-types.d.ts" />
/// <reference path="../../../shared/runtime/dev-globals.d.ts" />
/// <reference path="../../../shared/runtime/dev-protocol.d.ts" />
/// <reference path="../../../shared/runtime/dev-extensions.ts" />
__turbopack_context__.s([
    "connect",
    ()=>connect,
    "setHooks",
    ()=>setHooks,
    "subscribeToUpdate",
    ()=>subscribeToUpdate
]);
function connect({ addMessageListener, sendMessage, onUpdateError = console.error }) {
    addMessageListener((msg)=>{
        switch(msg.type){
            case 'turbopack-connected':
                handleSocketConnected(sendMessage);
                break;
            default:
                try {
                    if (Array.isArray(msg.data)) {
                        for(let i = 0; i < msg.data.length; i++){
                            handleSocketMessage(msg.data[i]);
                        }
                    } else {
                        handleSocketMessage(msg.data);
                    }
                    applyAggregatedUpdates();
                } catch (e) {
                    console.warn('[Fast Refresh] performing full reload\n\n' + "Fast Refresh will perform a full reload when you edit a file that's imported by modules outside of the React rendering tree.\n" + 'You might have a file which exports a React component but also exports a value that is imported by a non-React component file.\n' + 'Consider migrating the non-React component export to a separate file and importing it into both files.\n\n' + 'It is also possible the parent component of the component you edited is a class component, which disables Fast Refresh.\n' + 'Fast Refresh requires at least one parent function component in your React tree.');
                    onUpdateError(e);
                    location.reload();
                }
                break;
        }
    });
    const queued = globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS;
    if (queued != null && !Array.isArray(queued)) {
        throw new Error('A separate HMR handler was already registered');
    }
    globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS = {
        push: ([chunkPath, callback])=>{
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    };
    if (Array.isArray(queued)) {
        for (const [chunkPath, callback] of queued){
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    }
}
const updateCallbackSets = new Map();
function sendJSON(sendMessage, message) {
    sendMessage(JSON.stringify(message));
}
function resourceKey(resource) {
    return JSON.stringify({
        path: resource.path,
        headers: resource.headers || null
    });
}
function subscribeToUpdates(sendMessage, resource) {
    sendJSON(sendMessage, {
        type: 'turbopack-subscribe',
        ...resource
    });
    return ()=>{
        sendJSON(sendMessage, {
            type: 'turbopack-unsubscribe',
            ...resource
        });
    };
}
function handleSocketConnected(sendMessage) {
    for (const key of updateCallbackSets.keys()){
        subscribeToUpdates(sendMessage, JSON.parse(key));
    }
}
// we aggregate all pending updates until the issues are resolved
const chunkListsWithPendingUpdates = new Map();
function aggregateUpdates(msg) {
    const key = resourceKey(msg.resource);
    let aggregated = chunkListsWithPendingUpdates.get(key);
    if (aggregated) {
        aggregated.instruction = mergeChunkListUpdates(aggregated.instruction, msg.instruction);
    } else {
        chunkListsWithPendingUpdates.set(key, msg);
    }
}
function applyAggregatedUpdates() {
    if (chunkListsWithPendingUpdates.size === 0) return;
    hooks.beforeRefresh();
    for (const msg of chunkListsWithPendingUpdates.values()){
        triggerUpdate(msg);
    }
    chunkListsWithPendingUpdates.clear();
    finalizeUpdate();
}
function mergeChunkListUpdates(updateA, updateB) {
    let chunks;
    if (updateA.chunks != null) {
        if (updateB.chunks == null) {
            chunks = updateA.chunks;
        } else {
            chunks = mergeChunkListChunks(updateA.chunks, updateB.chunks);
        }
    } else if (updateB.chunks != null) {
        chunks = updateB.chunks;
    }
    let merged;
    if (updateA.merged != null) {
        if (updateB.merged == null) {
            merged = updateA.merged;
        } else {
            // Since `merged` is an array of updates, we need to merge them all into
            // one, consistent update.
            // Since there can only be `EcmascriptMergeUpdates` in the array, there is
            // no need to key on the `type` field.
            let update = updateA.merged[0];
            for(let i = 1; i < updateA.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateA.merged[i]);
            }
            for(let i = 0; i < updateB.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateB.merged[i]);
            }
            merged = [
                update
            ];
        }
    } else if (updateB.merged != null) {
        merged = updateB.merged;
    }
    return {
        type: 'ChunkListUpdate',
        chunks,
        merged
    };
}
function mergeChunkListChunks(chunksA, chunksB) {
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    return chunks;
}
function mergeChunkUpdates(updateA, updateB) {
    if (updateA.type === 'added' && updateB.type === 'deleted' || updateA.type === 'deleted' && updateB.type === 'added') {
        return undefined;
    }
    if (updateB.type === 'total') {
        // A total update replaces the entire chunk, so it supersedes any prior update.
        return updateB;
    }
    if (updateA.type === 'partial') {
        invariant(updateA.instruction, 'Partial updates are unsupported');
    }
    if (updateB.type === 'partial') {
        invariant(updateB.instruction, 'Partial updates are unsupported');
    }
    return undefined;
}
function mergeChunkListEcmascriptMergedUpdates(mergedA, mergedB) {
    const entries = mergeEcmascriptChunkEntries(mergedA.entries, mergedB.entries);
    const chunks = mergeEcmascriptChunksUpdates(mergedA.chunks, mergedB.chunks);
    return {
        type: 'EcmascriptMergedUpdate',
        entries,
        chunks
    };
}
function mergeEcmascriptChunkEntries(entriesA, entriesB) {
    return {
        ...entriesA,
        ...entriesB
    };
}
function mergeEcmascriptChunksUpdates(chunksA, chunksB) {
    if (chunksA == null) {
        return chunksB;
    }
    if (chunksB == null) {
        return chunksA;
    }
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeEcmascriptChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    if (Object.keys(chunks).length === 0) {
        return undefined;
    }
    return chunks;
}
function mergeEcmascriptChunkUpdates(updateA, updateB) {
    if (updateA.type === 'added' && updateB.type === 'deleted') {
        // These two completely cancel each other out.
        return undefined;
    }
    if (updateA.type === 'deleted' && updateB.type === 'added') {
        const added = [];
        const deleted = [];
        const deletedModules = new Set(updateA.modules ?? []);
        const addedModules = new Set(updateB.modules ?? []);
        for (const moduleId of addedModules){
            if (!deletedModules.has(moduleId)) {
                added.push(moduleId);
            }
        }
        for (const moduleId of deletedModules){
            if (!addedModules.has(moduleId)) {
                deleted.push(moduleId);
            }
        }
        if (added.length === 0 && deleted.length === 0) {
            return undefined;
        }
        return {
            type: 'partial',
            added,
            deleted
        };
    }
    if (updateA.type === 'partial' && updateB.type === 'partial') {
        const added = new Set([
            ...updateA.added ?? [],
            ...updateB.added ?? []
        ]);
        const deleted = new Set([
            ...updateA.deleted ?? [],
            ...updateB.deleted ?? []
        ]);
        if (updateB.added != null) {
            for (const moduleId of updateB.added){
                deleted.delete(moduleId);
            }
        }
        if (updateB.deleted != null) {
            for (const moduleId of updateB.deleted){
                added.delete(moduleId);
            }
        }
        return {
            type: 'partial',
            added: [
                ...added
            ],
            deleted: [
                ...deleted
            ]
        };
    }
    if (updateA.type === 'added' && updateB.type === 'partial') {
        const modules = new Set([
            ...updateA.modules ?? [],
            ...updateB.added ?? []
        ]);
        for (const moduleId of updateB.deleted ?? []){
            modules.delete(moduleId);
        }
        return {
            type: 'added',
            modules: [
                ...modules
            ]
        };
    }
    if (updateA.type === 'partial' && updateB.type === 'deleted') {
        // We could eagerly return `updateB` here, but this would potentially be
        // incorrect if `updateA` has added modules.
        const modules = new Set(updateB.modules ?? []);
        if (updateA.added != null) {
            for (const moduleId of updateA.added){
                modules.delete(moduleId);
            }
        }
        return {
            type: 'deleted',
            modules: [
                ...modules
            ]
        };
    }
    // Any other update combination is invalid.
    return undefined;
}
function invariant(_, message) {
    throw new Error(`Invariant: ${message}`);
}
const CRITICAL = [
    'bug',
    'error',
    'fatal'
];
function compareByList(list, a, b) {
    const aI = list.indexOf(a) + 1 || list.length;
    const bI = list.indexOf(b) + 1 || list.length;
    return aI - bI;
}
const chunksWithIssues = new Map();
function emitIssues() {
    const issues = [];
    const deduplicationSet = new Set();
    for (const [_, chunkIssues] of chunksWithIssues){
        for (const chunkIssue of chunkIssues){
            if (deduplicationSet.has(chunkIssue.formatted)) continue;
            issues.push(chunkIssue);
            deduplicationSet.add(chunkIssue.formatted);
        }
    }
    sortIssues(issues);
    hooks.issues(issues);
}
function handleIssues(msg) {
    const key = resourceKey(msg.resource);
    let hasCriticalIssues = false;
    for (const issue of msg.issues){
        if (CRITICAL.includes(issue.severity)) {
            hasCriticalIssues = true;
        }
    }
    if (msg.issues.length > 0) {
        chunksWithIssues.set(key, msg.issues);
    } else if (chunksWithIssues.has(key)) {
        chunksWithIssues.delete(key);
    }
    emitIssues();
    return hasCriticalIssues;
}
const SEVERITY_ORDER = [
    'bug',
    'fatal',
    'error',
    'warning',
    'info',
    'log'
];
const CATEGORY_ORDER = [
    'parse',
    'resolve',
    'code generation',
    'rendering',
    'typescript',
    'other'
];
function sortIssues(issues) {
    issues.sort((a, b)=>{
        const first = compareByList(SEVERITY_ORDER, a.severity, b.severity);
        if (first !== 0) return first;
        return compareByList(CATEGORY_ORDER, a.category, b.category);
    });
}
const hooks = {
    beforeRefresh: ()=>{},
    refresh: ()=>{},
    buildOk: ()=>{},
    issues: (_issues)=>{}
};
function setHooks(newHooks) {
    Object.assign(hooks, newHooks);
}
function handleSocketMessage(msg) {
    sortIssues(msg.issues);
    handleIssues(msg);
    switch(msg.type){
        case 'issues':
            break;
        case 'partial':
            // aggregate updates
            aggregateUpdates(msg);
            break;
        default:
            // run single update
            const runHooks = chunkListsWithPendingUpdates.size === 0;
            if (runHooks) hooks.beforeRefresh();
            triggerUpdate(msg);
            if (runHooks) finalizeUpdate();
            break;
    }
}
function finalizeUpdate() {
    hooks.refresh();
    hooks.buildOk();
    // This is used by the Next.js integration test suite to notify it when HMR
    // updates have been completed.
    // TODO: Only run this in test environments (gate by `process.env.__NEXT_TEST_MODE`)
    if (globalThis.__NEXT_HMR_CB) {
        globalThis.__NEXT_HMR_CB();
        globalThis.__NEXT_HMR_CB = null;
    }
}
function subscribeToChunkUpdate(chunkListPath, sendMessage, callback) {
    return subscribeToUpdate({
        path: chunkListPath
    }, sendMessage, callback);
}
function subscribeToUpdate(resource, sendMessage, callback) {
    const key = resourceKey(resource);
    let callbackSet;
    const existingCallbackSet = updateCallbackSets.get(key);
    if (!existingCallbackSet) {
        callbackSet = {
            callbacks: new Set([
                callback
            ]),
            unsubscribe: subscribeToUpdates(sendMessage, resource)
        };
        updateCallbackSets.set(key, callbackSet);
    } else {
        existingCallbackSet.callbacks.add(callback);
        callbackSet = existingCallbackSet;
    }
    return ()=>{
        callbackSet.callbacks.delete(callback);
        if (callbackSet.callbacks.size === 0) {
            callbackSet.unsubscribe();
            updateCallbackSets.delete(key);
        }
    };
}
function triggerUpdate(msg) {
    const key = resourceKey(msg.resource);
    const callbackSet = updateCallbackSets.get(key);
    if (!callbackSet) {
        return;
    }
    for (const callback of callbackSet.callbacks){
        callback(msg);
    }
    if (msg.type === 'notFound') {
        // This indicates that the resource which we subscribed to either does not exist or
        // has been deleted. In either case, we should clear all update callbacks, so if a
        // new subscription is created for the same resource, it will send a new "subscribe"
        // message to the server.
        // No need to send an "unsubscribe" message to the server, it will have already
        // dropped the update stream before sending the "notFound" message.
        updateCallbackSets.delete(key);
    }
}
}),
"[project]/restaurant-menu-editor/styles/Home.module.css [client] (css module)", ((__turbopack_context__) => {

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
"[project]/restaurant-menu-editor/pages/index.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>MenuEditor
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/restaurant-menu-editor/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/restaurant-menu-editor/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2d$tinder$2d$card$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/restaurant-menu-editor/node_modules/react-tinder-card/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$styles$2f$Home$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/restaurant-menu-editor/styles/Home.module.css [client] (css module)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
function MenuEditor() {
    _s();
    const [pinEntered, setPinEntered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [pin, setPin] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [tab, setTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('menu');
    const [restaurant, setRestaurant] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])({
        name: 'Gulf Island Grill',
        tagline: 'Fresh Gulf Coast Flavors'
    });
    const [gallery, setGallery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [sections, setSections] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])([
        'Appetizers',
        'Main Courses',
        'Drinks',
        'Desserts'
    ]);
    const [items, setItems] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [specials, setSpecials] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [dailySpecials, setDailySpecials] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [catchOfTheDay, setCatchOfTheDay] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])({
        name: '',
        price: '',
        desc: '',
        image: null
    });
    const [events, setEvents] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [editingItem, setEditingItem] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [editingSpecial, setEditingSpecial] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [editingEvent, setEditingEvent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [newItem, setNewItem] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])({
        section: 'Appetizers',
        name: '',
        price: '',
        desc: '',
        image: null
    });
    const [newSpecial, setNewSpecial] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])({
        name: '',
        price: '',
        desc: '',
        image: null,
        active: true
    });
    const [newEvent, setNewEvent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])({
        name: '',
        desc: '',
        date: '',
        location: '',
        image: null,
        active: true
    });
    const [newDailySpecial, setNewDailySpecial] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])({
        day: 'Monday',
        name: '',
        price: '',
        desc: '',
        image: null
    });
    const [newSection, setNewSection] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('');
    const fileInputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const days = [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
    ];
    const handlePinSubmit = (e)=>{
        e.preventDefault();
        if (pin === '1234') {
            setPinEntered(true);
        } else {
            alert('Invalid PIN');
            setPin('');
        }
    };
    const handleImageUpload = (e)=>{
        const file = e.target.files[0];
        if (file) {
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
        }
    };
    const addItem = ()=>{
        if (!newItem.name || !newItem.price || newItem.image === null) {
            alert('Fill all fields');
            return;
        }
        setItems([
            ...items,
            {
                id: Math.max(...items.map((i)=>i.id || 0), 0) + 1,
                ...newItem
            }
        ]);
        setNewItem({
            section: 'Appetizers',
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
    const deleteItem = (id)=>setItems(items.filter((i)=>i.id !== id));
    const addSpecial = ()=>{
        if (!newSpecial.name || !newSpecial.price || newSpecial.image === null) {
            alert('Fill all fields');
            return;
        }
        setSpecials([
            ...specials,
            {
                id: Math.max(...specials.map((s)=>s.id || 0), 0) + 1,
                ...newSpecial
            }
        ]);
        setNewSpecial({
            name: '',
            price: '',
            desc: '',
            image: null,
            active: true
        });
    };
    const updateSpecial = ()=>{
        if (!editingSpecial.name || !editingSpecial.price || editingSpecial.image === null) {
            alert('Fill all fields');
            return;
        }
        setSpecials(specials.map((s)=>s.id === editingSpecial.id ? editingSpecial : s));
        setEditingSpecial(null);
    };
    const deleteSpecial = (id)=>setSpecials(specials.filter((s)=>s.id !== id));
    const addDailySpecial = ()=>{
        if (!newDailySpecial.name || !newDailySpecial.price || newDailySpecial.image === null) {
            alert('Fill all fields');
            return;
        }
        setDailySpecials({
            ...dailySpecials,
            [newDailySpecial.day]: newDailySpecial
        });
        setNewDailySpecial({
            day: 'Monday',
            name: '',
            price: '',
            desc: '',
            image: null
        });
    };
    const deleteDailySpecial = (day)=>{
        const updated = {
            ...dailySpecials
        };
        delete updated[day];
        setDailySpecials(updated);
    };
    const addEvent = ()=>{
        if (!newEvent.name || !newEvent.date || newEvent.image === null) {
            alert('Fill all fields');
            return;
        }
        setEvents([
            ...events,
            {
                id: Math.max(...events.map((e)=>e.id || 0), 0) + 1,
                ...newEvent
            }
        ]);
        setNewEvent({
            name: '',
            desc: '',
            date: '',
            location: '',
            image: null,
            active: true
        });
    };
    const updateEvent = ()=>{
        if (!editingEvent.name || !editingEvent.date || editingEvent.image === null) {
            alert('Fill all fields');
            return;
        }
        setEvents(events.map((e)=>e.id === editingEvent.id ? editingEvent : e));
        setEditingEvent(null);
    };
    const deleteEvent = (id)=>setEvents(events.filter((e)=>e.id !== id));
    const addSection = ()=>{
        if (!newSection.trim()) return;
        if (sections.includes(newSection)) {
            alert('Section exists');
            return;
        }
        setSections([
            ...sections,
            newSection
        ]);
        setNewSection('');
    };
    if (!pinEntered) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$styles$2f$Home$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].pinScreen,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$styles$2f$Home$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].pinBox,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        children: "🔐 Menu Editor"
                    }, void 0, false, {
                        fileName: "[project]/restaurant-menu-editor/pages/index.js",
                        lineNumber: 120,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: "Enter PIN to continue"
                    }, void 0, false, {
                        fileName: "[project]/restaurant-menu-editor/pages/index.js",
                        lineNumber: 121,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        onSubmit: handlePinSubmit,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "password",
                                value: pin,
                                onChange: (e)=>setPin(e.target.value),
                                placeholder: "Enter PIN",
                                maxLength: "4",
                                autoFocus: true
                            }, void 0, false, {
                                fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                lineNumber: 123,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "submit",
                                children: "Unlock"
                            }, void 0, false, {
                                fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                lineNumber: 124,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/restaurant-menu-editor/pages/index.js",
                        lineNumber: 122,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/restaurant-menu-editor/pages/index.js",
                lineNumber: 119,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/restaurant-menu-editor/pages/index.js",
            lineNumber: 118,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$styles$2f$Home$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].container,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$styles$2f$Home$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].header,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                placeholder: "Restaurant Name",
                                value: restaurant.name,
                                onChange: (e)=>setRestaurant({
                                        ...restaurant,
                                        name: e.target.value
                                    }),
                                style: {
                                    fontSize: 28,
                                    fontWeight: 700,
                                    background: 'transparent',
                                    border: 'none',
                                    color: '#f1f5f9',
                                    marginBottom: 8,
                                    width: '100%'
                                }
                            }, void 0, false, {
                                fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                lineNumber: 135,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                placeholder: "Tagline",
                                value: restaurant.tagline,
                                onChange: (e)=>setRestaurant({
                                        ...restaurant,
                                        tagline: e.target.value
                                    }),
                                style: {
                                    fontSize: 14,
                                    background: 'transparent',
                                    border: 'none',
                                    color: '#b9d5de',
                                    width: '100%'
                                }
                            }, void 0, false, {
                                fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                lineNumber: 136,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/restaurant-menu-editor/pages/index.js",
                        lineNumber: 134,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$styles$2f$Home$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].tabs,
                        style: {
                            display: 'flex',
                            gap: 8,
                            flexWrap: 'wrap'
                        },
                        children: [
                            'menu',
                            'specials',
                            'daily',
                            'catch',
                            'events',
                            'gallery'
                        ].map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: tab === t ? __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$styles$2f$Home$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].active : '',
                                onClick: ()=>setTab(t),
                                style: {
                                    padding: '8px 12px',
                                    borderRadius: 6,
                                    cursor: 'pointer',
                                    background: tab === t ? '#0b7a75' : '#1e293b',
                                    color: '#f1f5f9',
                                    border: 'none',
                                    fontWeight: 600
                                },
                                children: [
                                    t === 'menu' && '🍽️ Menu',
                                    t === 'specials' && '⭐ Specials',
                                    t === 'daily' && '📅 Daily',
                                    t === 'catch' && '🎣 Catch',
                                    t === 'events' && '🎉 Events',
                                    t === 'gallery' && '📷 Gallery'
                                ]
                            }, t, true, {
                                fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                lineNumber: 140,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/restaurant-menu-editor/pages/index.js",
                        lineNumber: 138,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/restaurant-menu-editor/pages/index.js",
                lineNumber: 133,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$styles$2f$Home$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].editor,
                children: [
                    tab === 'menu' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$styles$2f$Home$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].section,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        children: "Sections"
                                    }, void 0, false, {
                                        fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                        lineNumber: 152,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            gap: 8,
                                            marginBottom: 16
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                placeholder: "New section",
                                                value: newSection,
                                                onChange: (e)=>setNewSection(e.target.value),
                                                style: {
                                                    flex: 1,
                                                    padding: 10,
                                                    border: '1px solid rgba(255,255,255,.15)',
                                                    background: '#1e293b',
                                                    color: '#f1f5f9',
                                                    borderRadius: 8
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                lineNumber: 154,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: addSection,
                                                style: {
                                                    padding: '10px 16px',
                                                    background: '#0b7a75',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: 8,
                                                    cursor: 'pointer',
                                                    fontWeight: 600
                                                },
                                                children: "Add"
                                            }, void 0, false, {
                                                fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                lineNumber: 155,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                        lineNumber: 153,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            gap: 8,
                                            flexWrap: 'wrap'
                                        },
                                        children: sections.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    background: '#1e293b',
                                                    padding: '6px 12px',
                                                    borderRadius: 20
                                                },
                                                children: s
                                            }, s, false, {
                                                fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                lineNumber: 158,
                                                columnNumber: 36
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                        lineNumber: 157,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                lineNumber: 151,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$styles$2f$Home$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].section,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        children: "Add Menu Item"
                                    }, void 0, false, {
                                        fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                        lineNumber: 163,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$styles$2f$Home$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].form,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                value: editingItem ? editingItem.section : newItem.section,
                                                onChange: (e)=>editingItem ? setEditingItem({
                                                        ...editingItem,
                                                        section: e.target.value
                                                    }) : setNewItem({
                                                        ...newItem,
                                                        section: e.target.value
                                                    }),
                                                style: {
                                                    marginBottom: 10,
                                                    padding: 10,
                                                    background: '#1e293b',
                                                    color: '#f1f5f9',
                                                    border: '1px solid rgba(255,255,255,.15)',
                                                    borderRadius: 8
                                                },
                                                children: sections.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        children: s
                                                    }, s, false, {
                                                        fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                        lineNumber: 166,
                                                        columnNumber: 38
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                lineNumber: 165,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                placeholder: "Name",
                                                value: editingItem ? editingItem.name : newItem.name,
                                                onChange: (e)=>editingItem ? setEditingItem({
                                                        ...editingItem,
                                                        name: e.target.value
                                                    }) : setNewItem({
                                                        ...newItem,
                                                        name: e.target.value
                                                    }),
                                                style: {
                                                    marginBottom: 10,
                                                    padding: 10,
                                                    background: '#1e293b',
                                                    color: '#f1f5f9',
                                                    border: '1px solid rgba(255,255,255,.15)',
                                                    borderRadius: 8,
                                                    width: '100%'
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                lineNumber: 168,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                placeholder: "Price",
                                                value: editingItem ? editingItem.price : newItem.price,
                                                onChange: (e)=>editingItem ? setEditingItem({
                                                        ...editingItem,
                                                        price: e.target.value
                                                    }) : setNewItem({
                                                        ...newItem,
                                                        price: e.target.value
                                                    }),
                                                style: {
                                                    marginBottom: 10,
                                                    padding: 10,
                                                    background: '#1e293b',
                                                    color: '#f1f5f9',
                                                    border: '1px solid rgba(255,255,255,.15)',
                                                    borderRadius: 8,
                                                    width: '100%'
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                lineNumber: 169,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                placeholder: "Description",
                                                value: editingItem ? editingItem.desc : newItem.desc,
                                                onChange: (e)=>editingItem ? setEditingItem({
                                                        ...editingItem,
                                                        desc: e.target.value
                                                    }) : setNewItem({
                                                        ...newItem,
                                                        desc: e.target.value
                                                    }),
                                                style: {
                                                    marginBottom: 10,
                                                    padding: 10,
                                                    background: '#1e293b',
                                                    color: '#f1f5f9',
                                                    border: '1px solid rgba(255,255,255,.15)',
                                                    borderRadius: 8,
                                                    width: '100%',
                                                    height: 80
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                lineNumber: 170,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                value: editingItem ? editingItem.image || '' : newItem.image || '',
                                                onChange: (e)=>editingItem ? setEditingItem({
                                                        ...editingItem,
                                                        image: e.target.value
                                                    }) : setNewItem({
                                                        ...newItem,
                                                        image: e.target.value
                                                    }),
                                                style: {
                                                    marginBottom: 10,
                                                    padding: 10,
                                                    background: '#1e293b',
                                                    color: '#f1f5f9',
                                                    border: '1px solid rgba(255,255,255,.15)',
                                                    borderRadius: 8,
                                                    width: '100%'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "",
                                                        children: "Select Image"
                                                    }, void 0, false, {
                                                        fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                        lineNumber: 172,
                                                        columnNumber: 19
                                                    }, this),
                                                    gallery.map((img)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: img.url,
                                                            children: img.name
                                                        }, img.id, false, {
                                                            fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                            lineNumber: 173,
                                                            columnNumber: 39
                                                        }, this))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                lineNumber: 171,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: editingItem ? updateItem : addItem,
                                                style: {
                                                    padding: '10px 16px',
                                                    background: '#0b7a75',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: 8,
                                                    cursor: 'pointer',
                                                    fontWeight: 600
                                                },
                                                children: editingItem ? 'Update Item' : 'Add Item'
                                            }, void 0, false, {
                                                fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                lineNumber: 175,
                                                columnNumber: 17
                                            }, this),
                                            editingItem && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setEditingItem(null),
                                                style: {
                                                    marginLeft: 8,
                                                    padding: '10px 16px',
                                                    background: '#64748b',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: 8,
                                                    cursor: 'pointer'
                                                },
                                                children: "Cancel"
                                            }, void 0, false, {
                                                fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                lineNumber: 178,
                                                columnNumber: 33
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                        lineNumber: 164,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                lineNumber: 162,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$styles$2f$Home$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].section,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        children: "Menu Items"
                                    }, void 0, false, {
                                        fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                        lineNumber: 183,
                                        columnNumber: 15
                                    }, this),
                                    sections.map((section)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                    children: section
                                                }, void 0, false, {
                                                    fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                    lineNumber: 186,
                                                    columnNumber: 19
                                                }, this),
                                                items.filter((i)=>i.section === section).map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$styles$2f$Home$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].itemRow,
                                                        children: [
                                                            item.image && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                src: item.image,
                                                                alt: item.name,
                                                                style: {
                                                                    width: 60,
                                                                    height: 60,
                                                                    borderRadius: 4
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                                lineNumber: 189,
                                                                columnNumber: 38
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                style: {
                                                                    flex: 1
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        style: {
                                                                            fontWeight: 600
                                                                        },
                                                                        children: item.name
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                                        lineNumber: 191,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        style: {
                                                                            fontSize: 12,
                                                                            color: '#b9d5de'
                                                                        },
                                                                        children: [
                                                                            item.price,
                                                                            " • ",
                                                                            item.desc.substring(0, 40)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                                        lineNumber: 192,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                                lineNumber: 190,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>setEditingItem(item),
                                                                style: {
                                                                    padding: '6px 10px',
                                                                    background: '#0b7a75',
                                                                    color: 'white',
                                                                    border: 'none',
                                                                    borderRadius: 4,
                                                                    cursor: 'pointer',
                                                                    fontSize: 12
                                                                },
                                                                children: "Edit"
                                                            }, void 0, false, {
                                                                fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                                lineNumber: 194,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>deleteItem(item.id),
                                                                style: {
                                                                    padding: '6px 10px',
                                                                    background: '#dc2626',
                                                                    color: 'white',
                                                                    border: 'none',
                                                                    borderRadius: 4,
                                                                    cursor: 'pointer',
                                                                    fontSize: 12,
                                                                    marginLeft: 4
                                                                },
                                                                children: "Delete"
                                                            }, void 0, false, {
                                                                fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                                lineNumber: 195,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, item.id, true, {
                                                        fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                        lineNumber: 188,
                                                        columnNumber: 21
                                                    }, this))
                                            ]
                                        }, section, true, {
                                            fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                            lineNumber: 185,
                                            columnNumber: 17
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                lineNumber: 182,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true),
                    tab === 'specials' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$styles$2f$Home$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].section,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        children: "Add Special"
                                    }, void 0, false, {
                                        fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                        lineNumber: 208,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$styles$2f$Home$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].form,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                placeholder: "Name",
                                                value: editingSpecial ? editingSpecial.name : newSpecial.name,
                                                onChange: (e)=>editingSpecial ? setEditingSpecial({
                                                        ...editingSpecial,
                                                        name: e.target.value
                                                    }) : setNewSpecial({
                                                        ...newSpecial,
                                                        name: e.target.value
                                                    }),
                                                style: {
                                                    marginBottom: 10,
                                                    padding: 10,
                                                    background: '#1e293b',
                                                    color: '#f1f5f9',
                                                    border: '1px solid rgba(255,255,255,.15)',
                                                    borderRadius: 8,
                                                    width: '100%'
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                lineNumber: 210,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                placeholder: "Price",
                                                value: editingSpecial ? editingSpecial.price : newSpecial.price,
                                                onChange: (e)=>editingSpecial ? setEditingSpecial({
                                                        ...editingSpecial,
                                                        price: e.target.value
                                                    }) : setNewSpecial({
                                                        ...newSpecial,
                                                        price: e.target.value
                                                    }),
                                                style: {
                                                    marginBottom: 10,
                                                    padding: 10,
                                                    background: '#1e293b',
                                                    color: '#f1f5f9',
                                                    border: '1px solid rgba(255,255,255,.15)',
                                                    borderRadius: 8,
                                                    width: '100%'
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                lineNumber: 211,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                placeholder: "Description",
                                                value: editingSpecial ? editingSpecial.desc : newSpecial.desc,
                                                onChange: (e)=>editingSpecial ? setEditingSpecial({
                                                        ...editingSpecial,
                                                        desc: e.target.value
                                                    }) : setNewSpecial({
                                                        ...newSpecial,
                                                        desc: e.target.value
                                                    }),
                                                style: {
                                                    marginBottom: 10,
                                                    padding: 10,
                                                    background: '#1e293b',
                                                    color: '#f1f5f9',
                                                    border: '1px solid rgba(255,255,255,.15)',
                                                    borderRadius: 8,
                                                    width: '100%',
                                                    height: 80
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                lineNumber: 212,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                value: editingSpecial ? editingSpecial.image || '' : newSpecial.image || '',
                                                onChange: (e)=>editingSpecial ? setEditingSpecial({
                                                        ...editingSpecial,
                                                        image: e.target.value
                                                    }) : setNewSpecial({
                                                        ...newSpecial,
                                                        image: e.target.value
                                                    }),
                                                style: {
                                                    marginBottom: 10,
                                                    padding: 10,
                                                    background: '#1e293b',
                                                    color: '#f1f5f9',
                                                    border: '1px solid rgba(255,255,255,.15)',
                                                    borderRadius: 8,
                                                    width: '100%'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "",
                                                        children: "Select Image"
                                                    }, void 0, false, {
                                                        fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                        lineNumber: 214,
                                                        columnNumber: 19
                                                    }, this),
                                                    gallery.map((img)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: img.url,
                                                            children: img.name
                                                        }, img.id, false, {
                                                            fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                            lineNumber: 215,
                                                            columnNumber: 39
                                                        }, this))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                lineNumber: 213,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                style: {
                                                    marginBottom: 10,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 8
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "checkbox",
                                                        checked: editingSpecial ? editingSpecial.active : newSpecial.active,
                                                        onChange: (e)=>editingSpecial ? setEditingSpecial({
                                                                ...editingSpecial,
                                                                active: e.target.checked
                                                            }) : setNewSpecial({
                                                                ...newSpecial,
                                                                active: e.target.checked
                                                            })
                                                    }, void 0, false, {
                                                        fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                        lineNumber: 218,
                                                        columnNumber: 19
                                                    }, this),
                                                    "Active"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                lineNumber: 217,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: editingSpecial ? updateSpecial : addSpecial,
                                                style: {
                                                    padding: '10px 16px',
                                                    background: '#0b7a75',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: 8,
                                                    cursor: 'pointer',
                                                    fontWeight: 600
                                                },
                                                children: editingSpecial ? 'Update Special' : 'Add Special'
                                            }, void 0, false, {
                                                fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                lineNumber: 221,
                                                columnNumber: 17
                                            }, this),
                                            editingSpecial && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setEditingSpecial(null),
                                                style: {
                                                    marginLeft: 8,
                                                    padding: '10px 16px',
                                                    background: '#64748b',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: 8,
                                                    cursor: 'pointer'
                                                },
                                                children: "Cancel"
                                            }, void 0, false, {
                                                fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                lineNumber: 224,
                                                columnNumber: 36
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                        lineNumber: 209,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                lineNumber: 207,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$styles$2f$Home$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].section,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        children: "Specials"
                                    }, void 0, false, {
                                        fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                        lineNumber: 229,
                                        columnNumber: 15
                                    }, this),
                                    specials.map((special)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$styles$2f$Home$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].itemRow,
                                            children: [
                                                special.image && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                    src: special.image,
                                                    alt: special.name,
                                                    style: {
                                                        width: 60,
                                                        height: 60,
                                                        borderRadius: 4
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                    lineNumber: 232,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        flex: 1
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                fontWeight: 600
                                                            },
                                                            children: special.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                            lineNumber: 234,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                fontSize: 12,
                                                                color: '#b9d5de'
                                                            },
                                                            children: [
                                                                special.price,
                                                                " ",
                                                                special.active ? '✓ Active' : '○ Inactive'
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                            lineNumber: 235,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                    lineNumber: 233,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>setEditingSpecial(special),
                                                    style: {
                                                        padding: '6px 10px',
                                                        background: '#0b7a75',
                                                        color: 'white',
                                                        border: 'none',
                                                        borderRadius: 4,
                                                        cursor: 'pointer',
                                                        fontSize: 12
                                                    },
                                                    children: "Edit"
                                                }, void 0, false, {
                                                    fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                    lineNumber: 237,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>deleteSpecial(special.id),
                                                    style: {
                                                        padding: '6px 10px',
                                                        background: '#dc2626',
                                                        color: 'white',
                                                        border: 'none',
                                                        borderRadius: 4,
                                                        cursor: 'pointer',
                                                        fontSize: 12,
                                                        marginLeft: 4
                                                    },
                                                    children: "Delete"
                                                }, void 0, false, {
                                                    fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                    lineNumber: 238,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, special.id, true, {
                                            fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                            lineNumber: 231,
                                            columnNumber: 17
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                lineNumber: 228,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true),
                    tab === 'daily' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$styles$2f$Home$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].section,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        children: "Add Daily Special"
                                    }, void 0, false, {
                                        fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                        lineNumber: 249,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$styles$2f$Home$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].form,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                value: newDailySpecial.day,
                                                onChange: (e)=>setNewDailySpecial({
                                                        ...newDailySpecial,
                                                        day: e.target.value
                                                    }),
                                                style: {
                                                    marginBottom: 10,
                                                    padding: 10,
                                                    background: '#1e293b',
                                                    color: '#f1f5f9',
                                                    border: '1px solid rgba(255,255,255,.15)',
                                                    borderRadius: 8,
                                                    width: '100%'
                                                },
                                                children: days.map((day)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        children: day
                                                    }, day, false, {
                                                        fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                        lineNumber: 252,
                                                        columnNumber: 36
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                lineNumber: 251,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                placeholder: "Name",
                                                value: newDailySpecial.name,
                                                onChange: (e)=>setNewDailySpecial({
                                                        ...newDailySpecial,
                                                        name: e.target.value
                                                    }),
                                                style: {
                                                    marginBottom: 10,
                                                    padding: 10,
                                                    background: '#1e293b',
                                                    color: '#f1f5f9',
                                                    border: '1px solid rgba(255,255,255,.15)',
                                                    borderRadius: 8,
                                                    width: '100%'
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                lineNumber: 254,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                placeholder: "Price",
                                                value: newDailySpecial.price,
                                                onChange: (e)=>setNewDailySpecial({
                                                        ...newDailySpecial,
                                                        price: e.target.value
                                                    }),
                                                style: {
                                                    marginBottom: 10,
                                                    padding: 10,
                                                    background: '#1e293b',
                                                    color: '#f1f5f9',
                                                    border: '1px solid rgba(255,255,255,.15)',
                                                    borderRadius: 8,
                                                    width: '100%'
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                lineNumber: 255,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                placeholder: "Description",
                                                value: newDailySpecial.desc,
                                                onChange: (e)=>setNewDailySpecial({
                                                        ...newDailySpecial,
                                                        desc: e.target.value
                                                    }),
                                                style: {
                                                    marginBottom: 10,
                                                    padding: 10,
                                                    background: '#1e293b',
                                                    color: '#f1f5f9',
                                                    border: '1px solid rgba(255,255,255,.15)',
                                                    borderRadius: 8,
                                                    width: '100%',
                                                    height: 80
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                lineNumber: 256,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                value: newDailySpecial.image || '',
                                                onChange: (e)=>setNewDailySpecial({
                                                        ...newDailySpecial,
                                                        image: e.target.value
                                                    }),
                                                style: {
                                                    marginBottom: 10,
                                                    padding: 10,
                                                    background: '#1e293b',
                                                    color: '#f1f5f9',
                                                    border: '1px solid rgba(255,255,255,.15)',
                                                    borderRadius: 8,
                                                    width: '100%'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "",
                                                        children: "Select Image"
                                                    }, void 0, false, {
                                                        fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                        lineNumber: 258,
                                                        columnNumber: 19
                                                    }, this),
                                                    gallery.map((img)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: img.url,
                                                            children: img.name
                                                        }, img.id, false, {
                                                            fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                            lineNumber: 259,
                                                            columnNumber: 39
                                                        }, this))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                lineNumber: 257,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: addDailySpecial,
                                                style: {
                                                    padding: '10px 16px',
                                                    background: '#0b7a75',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: 8,
                                                    cursor: 'pointer',
                                                    fontWeight: 600
                                                },
                                                children: "Add Daily Special"
                                            }, void 0, false, {
                                                fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                lineNumber: 261,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                        lineNumber: 250,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                lineNumber: 248,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$styles$2f$Home$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].section,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        children: "Daily Specials"
                                    }, void 0, false, {
                                        fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                        lineNumber: 266,
                                        columnNumber: 15
                                    }, this),
                                    days.map((day)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                    children: day
                                                }, void 0, false, {
                                                    fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                    lineNumber: 269,
                                                    columnNumber: 19
                                                }, this),
                                                dailySpecials[day] ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$styles$2f$Home$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].itemRow,
                                                    children: [
                                                        dailySpecials[day].image && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                            src: dailySpecials[day].image,
                                                            alt: dailySpecials[day].name,
                                                            style: {
                                                                width: 60,
                                                                height: 60,
                                                                borderRadius: 4
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                            lineNumber: 272,
                                                            columnNumber: 52
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                flex: 1
                                                            },
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: {
                                                                        fontWeight: 600
                                                                    },
                                                                    children: dailySpecials[day].name
                                                                }, void 0, false, {
                                                                    fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                                    lineNumber: 274,
                                                                    columnNumber: 25
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    style: {
                                                                        fontSize: 12,
                                                                        color: '#b9d5de'
                                                                    },
                                                                    children: dailySpecials[day].price
                                                                }, void 0, false, {
                                                                    fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                                    lineNumber: 275,
                                                                    columnNumber: 25
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                            lineNumber: 273,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>deleteDailySpecial(day),
                                                            style: {
                                                                padding: '6px 10px',
                                                                background: '#dc2626',
                                                                color: 'white',
                                                                border: 'none',
                                                                borderRadius: 4,
                                                                cursor: 'pointer',
                                                                fontSize: 12
                                                            },
                                                            children: "Delete"
                                                        }, void 0, false, {
                                                            fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                            lineNumber: 277,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                    lineNumber: 271,
                                                    columnNumber: 21
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        color: '#64748b',
                                                        fontSize: 12
                                                    },
                                                    children: "No special set"
                                                }, void 0, false, {
                                                    fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                    lineNumber: 280,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, day, true, {
                                            fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                            lineNumber: 268,
                                            columnNumber: 17
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                lineNumber: 265,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true),
                    tab === 'catch' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$styles$2f$Home$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].section,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                children: "Catch of the Day"
                            }, void 0, false, {
                                fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                lineNumber: 291,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$styles$2f$Home$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].form,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        placeholder: "Name",
                                        value: catchOfTheDay.name,
                                        onChange: (e)=>setCatchOfTheDay({
                                                ...catchOfTheDay,
                                                name: e.target.value
                                            }),
                                        style: {
                                            marginBottom: 10,
                                            padding: 10,
                                            background: '#1e293b',
                                            color: '#f1f5f9',
                                            border: '1px solid rgba(255,255,255,.15)',
                                            borderRadius: 8,
                                            width: '100%'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                        lineNumber: 293,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        placeholder: "Price",
                                        value: catchOfTheDay.price,
                                        onChange: (e)=>setCatchOfTheDay({
                                                ...catchOfTheDay,
                                                price: e.target.value
                                            }),
                                        style: {
                                            marginBottom: 10,
                                            padding: 10,
                                            background: '#1e293b',
                                            color: '#f1f5f9',
                                            border: '1px solid rgba(255,255,255,.15)',
                                            borderRadius: 8,
                                            width: '100%'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                        lineNumber: 294,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                        placeholder: "Description",
                                        value: catchOfTheDay.desc,
                                        onChange: (e)=>setCatchOfTheDay({
                                                ...catchOfTheDay,
                                                desc: e.target.value
                                            }),
                                        style: {
                                            marginBottom: 10,
                                            padding: 10,
                                            background: '#1e293b',
                                            color: '#f1f5f9',
                                            border: '1px solid rgba(255,255,255,.15)',
                                            borderRadius: 8,
                                            width: '100%',
                                            height: 80
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                        lineNumber: 295,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: catchOfTheDay.image || '',
                                        onChange: (e)=>setCatchOfTheDay({
                                                ...catchOfTheDay,
                                                image: e.target.value
                                            }),
                                        style: {
                                            marginBottom: 10,
                                            padding: 10,
                                            background: '#1e293b',
                                            color: '#f1f5f9',
                                            border: '1px solid rgba(255,255,255,.15)',
                                            borderRadius: 8,
                                            width: '100%'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "",
                                                children: "Select Image"
                                            }, void 0, false, {
                                                fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                lineNumber: 297,
                                                columnNumber: 17
                                            }, this),
                                            gallery.map((img)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: img.url,
                                                    children: img.name
                                                }, img.id, false, {
                                                    fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                    lineNumber: 298,
                                                    columnNumber: 37
                                                }, this))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                        lineNumber: 296,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        style: {
                                            padding: '10px 16px',
                                            background: '#0b7a75',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: 8,
                                            cursor: 'pointer',
                                            fontWeight: 600
                                        },
                                        children: "Update Catch"
                                    }, void 0, false, {
                                        fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                        lineNumber: 300,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                lineNumber: 292,
                                columnNumber: 13
                            }, this),
                            catchOfTheDay.name && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$styles$2f$Home$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].itemRow,
                                style: {
                                    marginTop: 20
                                },
                                children: [
                                    catchOfTheDay.image && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: catchOfTheDay.image,
                                        alt: catchOfTheDay.name,
                                        style: {
                                            width: 60,
                                            height: 60,
                                            borderRadius: 4
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                        lineNumber: 304,
                                        columnNumber: 41
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontWeight: 600
                                                },
                                                children: catchOfTheDay.name
                                            }, void 0, false, {
                                                fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                lineNumber: 305,
                                                columnNumber: 22
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontSize: 12,
                                                    color: '#b9d5de'
                                                },
                                                children: catchOfTheDay.price
                                            }, void 0, false, {
                                                fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                lineNumber: 305,
                                                columnNumber: 79
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                        lineNumber: 305,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                lineNumber: 303,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/restaurant-menu-editor/pages/index.js",
                        lineNumber: 290,
                        columnNumber: 11
                    }, this),
                    tab === 'events' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$styles$2f$Home$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].section,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        children: "Add Event"
                                    }, void 0, false, {
                                        fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                        lineNumber: 315,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$styles$2f$Home$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].form,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                placeholder: "Event Name",
                                                value: editingEvent ? editingEvent.name : newEvent.name,
                                                onChange: (e)=>editingEvent ? setEditingEvent({
                                                        ...editingEvent,
                                                        name: e.target.value
                                                    }) : setNewEvent({
                                                        ...newEvent,
                                                        name: e.target.value
                                                    }),
                                                style: {
                                                    marginBottom: 10,
                                                    padding: 10,
                                                    background: '#1e293b',
                                                    color: '#f1f5f9',
                                                    border: '1px solid rgba(255,255,255,.15)',
                                                    borderRadius: 8,
                                                    width: '100%'
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                lineNumber: 317,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                placeholder: "Description",
                                                value: editingEvent ? editingEvent.desc : newEvent.desc,
                                                onChange: (e)=>editingEvent ? setEditingEvent({
                                                        ...editingEvent,
                                                        desc: e.target.value
                                                    }) : setNewEvent({
                                                        ...newEvent,
                                                        desc: e.target.value
                                                    }),
                                                style: {
                                                    marginBottom: 10,
                                                    padding: 10,
                                                    background: '#1e293b',
                                                    color: '#f1f5f9',
                                                    border: '1px solid rgba(255,255,255,.15)',
                                                    borderRadius: 8,
                                                    width: '100%',
                                                    height: 80
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                lineNumber: 318,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "datetime-local",
                                                value: editingEvent ? editingEvent.date : newEvent.date,
                                                onChange: (e)=>editingEvent ? setEditingEvent({
                                                        ...editingEvent,
                                                        date: e.target.value
                                                    }) : setNewEvent({
                                                        ...newEvent,
                                                        date: e.target.value
                                                    }),
                                                style: {
                                                    marginBottom: 10,
                                                    padding: 10,
                                                    background: '#1e293b',
                                                    color: '#f1f5f9',
                                                    border: '1px solid rgba(255,255,255,.15)',
                                                    borderRadius: 8,
                                                    width: '100%'
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                lineNumber: 319,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "text",
                                                placeholder: "Location",
                                                value: editingEvent ? editingEvent.location : newEvent.location,
                                                onChange: (e)=>editingEvent ? setEditingEvent({
                                                        ...editingEvent,
                                                        location: e.target.value
                                                    }) : setNewEvent({
                                                        ...newEvent,
                                                        location: e.target.value
                                                    }),
                                                style: {
                                                    marginBottom: 10,
                                                    padding: 10,
                                                    background: '#1e293b',
                                                    color: '#f1f5f9',
                                                    border: '1px solid rgba(255,255,255,.15)',
                                                    borderRadius: 8,
                                                    width: '100%'
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                lineNumber: 320,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                value: editingEvent ? editingEvent.image || '' : newEvent.image || '',
                                                onChange: (e)=>editingEvent ? setEditingEvent({
                                                        ...editingEvent,
                                                        image: e.target.value
                                                    }) : setNewEvent({
                                                        ...newEvent,
                                                        image: e.target.value
                                                    }),
                                                style: {
                                                    marginBottom: 10,
                                                    padding: 10,
                                                    background: '#1e293b',
                                                    color: '#f1f5f9',
                                                    border: '1px solid rgba(255,255,255,.15)',
                                                    borderRadius: 8,
                                                    width: '100%'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "",
                                                        children: "Select Image"
                                                    }, void 0, false, {
                                                        fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                        lineNumber: 322,
                                                        columnNumber: 19
                                                    }, this),
                                                    gallery.map((img)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: img.url,
                                                            children: img.name
                                                        }, img.id, false, {
                                                            fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                            lineNumber: 323,
                                                            columnNumber: 39
                                                        }, this))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                lineNumber: 321,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                style: {
                                                    marginBottom: 10,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 8
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "checkbox",
                                                        checked: editingEvent ? editingEvent.active : newEvent.active,
                                                        onChange: (e)=>editingEvent ? setEditingEvent({
                                                                ...editingEvent,
                                                                active: e.target.checked
                                                            }) : setNewEvent({
                                                                ...newEvent,
                                                                active: e.target.checked
                                                            })
                                                    }, void 0, false, {
                                                        fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                        lineNumber: 326,
                                                        columnNumber: 19
                                                    }, this),
                                                    "Active"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                lineNumber: 325,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: editingEvent ? updateEvent : addEvent,
                                                style: {
                                                    padding: '10px 16px',
                                                    background: '#0b7a75',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: 8,
                                                    cursor: 'pointer',
                                                    fontWeight: 600
                                                },
                                                children: editingEvent ? 'Update Event' : 'Add Event'
                                            }, void 0, false, {
                                                fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                lineNumber: 329,
                                                columnNumber: 17
                                            }, this),
                                            editingEvent && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setEditingEvent(null),
                                                style: {
                                                    marginLeft: 8,
                                                    padding: '10px 16px',
                                                    background: '#64748b',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: 8,
                                                    cursor: 'pointer'
                                                },
                                                children: "Cancel"
                                            }, void 0, false, {
                                                fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                lineNumber: 332,
                                                columnNumber: 34
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                        lineNumber: 316,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                lineNumber: 314,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$styles$2f$Home$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].section,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        children: "Events"
                                    }, void 0, false, {
                                        fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                        lineNumber: 337,
                                        columnNumber: 15
                                    }, this),
                                    events.map((event)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$styles$2f$Home$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].itemRow,
                                            children: [
                                                event.image && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                    src: event.image,
                                                    alt: event.name,
                                                    style: {
                                                        width: 60,
                                                        height: 60,
                                                        borderRadius: 4
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                    lineNumber: 340,
                                                    columnNumber: 35
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    style: {
                                                        flex: 1
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                fontWeight: 600
                                                            },
                                                            children: event.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                            lineNumber: 342,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            style: {
                                                                fontSize: 12,
                                                                color: '#b9d5de'
                                                            },
                                                            children: [
                                                                event.date,
                                                                " • ",
                                                                event.location,
                                                                " ",
                                                                event.active ? '✓' : '○'
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                            lineNumber: 343,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                    lineNumber: 341,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>setEditingEvent(event),
                                                    style: {
                                                        padding: '6px 10px',
                                                        background: '#0b7a75',
                                                        color: 'white',
                                                        border: 'none',
                                                        borderRadius: 4,
                                                        cursor: 'pointer',
                                                        fontSize: 12
                                                    },
                                                    children: "Edit"
                                                }, void 0, false, {
                                                    fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                    lineNumber: 345,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>deleteEvent(event.id),
                                                    style: {
                                                        padding: '6px 10px',
                                                        background: '#dc2626',
                                                        color: 'white',
                                                        border: 'none',
                                                        borderRadius: 4,
                                                        cursor: 'pointer',
                                                        fontSize: 12,
                                                        marginLeft: 4
                                                    },
                                                    children: "Delete"
                                                }, void 0, false, {
                                                    fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                    lineNumber: 346,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, event.id, true, {
                                            fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                            lineNumber: 339,
                                            columnNumber: 17
                                        }, this))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                lineNumber: 336,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true),
                    tab === 'gallery' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$styles$2f$Home$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].section,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                children: "Image Gallery"
                            }, void 0, false, {
                                fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                lineNumber: 356,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>fileInputRef.current.click(),
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$styles$2f$Home$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].uploadBtn,
                                style: {
                                    marginBottom: 16,
                                    padding: '10px 16px',
                                    background: '#0b7a75',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: 8,
                                    cursor: 'pointer',
                                    fontWeight: 600
                                },
                                children: "+ Upload Image"
                            }, void 0, false, {
                                fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                lineNumber: 357,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                ref: fileInputRef,
                                type: "file",
                                accept: "image/*",
                                onChange: handleImageUpload,
                                style: {
                                    display: 'none'
                                }
                            }, void 0, false, {
                                fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                lineNumber: 360,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$styles$2f$Home$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].gallery,
                                style: {
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
                                    gap: 12
                                },
                                children: gallery.map((img)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$styles$2f$Home$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].galleryItem,
                                        style: {
                                            position: 'relative'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                src: img.url,
                                                alt: img.name,
                                                style: {
                                                    width: '100%',
                                                    height: 100,
                                                    objectFit: 'cover',
                                                    borderRadius: 8
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                lineNumber: 364,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                style: {
                                                    fontSize: 12,
                                                    marginTop: 4,
                                                    overflow: 'hidden',
                                                    whiteSpace: 'nowrap',
                                                    textOverflow: 'ellipsis'
                                                },
                                                children: img.name
                                            }, void 0, false, {
                                                fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                lineNumber: 365,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setGallery(gallery.filter((g)=>g.id !== img.id)),
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$styles$2f$Home$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].deleteBtn,
                                                style: {
                                                    position: 'absolute',
                                                    top: 4,
                                                    right: 4,
                                                    background: '#dc2626',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '50%',
                                                    width: 24,
                                                    height: 24,
                                                    cursor: 'pointer',
                                                    fontSize: 12
                                                },
                                                children: "✕"
                                            }, void 0, false, {
                                                fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                                lineNumber: 366,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, img.id, true, {
                                        fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                        lineNumber: 363,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/restaurant-menu-editor/pages/index.js",
                                lineNumber: 361,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/restaurant-menu-editor/pages/index.js",
                        lineNumber: 355,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/restaurant-menu-editor/pages/index.js",
                lineNumber: 147,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/restaurant-menu-editor/pages/index.js",
        lineNumber: 132,
        columnNumber: 5
    }, this);
}
_s(MenuEditor, "Xqp2GAv98Q2nyfsVgHFyob9GYDw=");
_c = MenuEditor;
var _c;
__turbopack_context__.k.register(_c, "MenuEditor");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[next]/entry/page-loader.ts { PAGE => \"[project]/restaurant-menu-editor/pages/index.js [client] (ecmascript)\" } [client] (ecmascript)", ((__turbopack_context__, module, exports) => {

const PAGE_PATH = "/";
(window.__NEXT_P = window.__NEXT_P || []).push([
    PAGE_PATH,
    ()=>{
        return __turbopack_context__.r("[project]/restaurant-menu-editor/pages/index.js [client] (ecmascript)");
    }
]);
// @ts-expect-error module.hot exists
if ("TURBOPACK compile-time truthy", 1) {
    // @ts-expect-error module.hot exists
    module.hot.dispose(function() {
        window.__NEXT_P.push([
            PAGE_PATH
        ]);
    });
}
}),
"[hmr-entry]/hmr-entry.js { ENTRY => \"[project]/restaurant-menu-editor/pages/index\" }", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.r("[next]/entry/page-loader.ts { PAGE => \"[project]/restaurant-menu-editor/pages/index.js [client] (ecmascript)\" } [client] (ecmascript)");
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__0mvrtpw._.js.map