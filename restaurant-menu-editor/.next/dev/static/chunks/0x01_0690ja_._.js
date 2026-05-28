(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/restaurant-menu-editor/node_modules/@swc/helpers/cjs/_interop_require_default.cjs [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
exports._ = _interop_require_default;
}),
"[project]/restaurant-menu-editor/node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) return obj;
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") return {
        default: obj
    };
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) return cache.get(obj);
    var newObj = {
        __proto__: null
    };
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) Object.defineProperty(newObj, key, desc);
            else newObj[key] = obj[key];
        }
    }
    newObj.default = obj;
    if (cache) cache.set(obj, newObj);
    return newObj;
}
exports._ = _interop_require_wildcard;
}),
"[project]/restaurant-menu-editor/node_modules/react/cjs/react.development.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/restaurant-menu-editor/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
/**
 * @license React
 * react.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ "use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function defineDeprecationWarning(methodName, info) {
        Object.defineProperty(Component.prototype, methodName, {
            get: function() {
                console.warn("%s(...) is deprecated in plain JavaScript React classes. %s", info[0], info[1]);
            }
        });
    }
    function getIteratorFn(maybeIterable) {
        if (null === maybeIterable || "object" !== typeof maybeIterable) return null;
        maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
        return "function" === typeof maybeIterable ? maybeIterable : null;
    }
    function warnNoop(publicInstance, callerName) {
        publicInstance = (publicInstance = publicInstance.constructor) && (publicInstance.displayName || publicInstance.name) || "ReactClass";
        var warningKey = publicInstance + "." + callerName;
        didWarnStateUpdateForUnmountedComponent[warningKey] || (console.error("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", callerName, publicInstance), didWarnStateUpdateForUnmountedComponent[warningKey] = !0);
    }
    function Component(props, context, updater) {
        this.props = props;
        this.context = context;
        this.refs = emptyObject;
        this.updater = updater || ReactNoopUpdateQueue;
    }
    function ComponentDummy() {}
    function PureComponent(props, context, updater) {
        this.props = props;
        this.context = context;
        this.refs = emptyObject;
        this.updater = updater || ReactNoopUpdateQueue;
    }
    function noop() {}
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function cloneAndReplaceKey(oldElement, newKey) {
        newKey = ReactElement(oldElement.type, newKey, oldElement.props, oldElement._owner, oldElement._debugStack, oldElement._debugTask);
        oldElement._store && (newKey._store.validated = oldElement._store.validated);
        return newKey;
    }
    function validateChildKeys(node) {
        isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
    }
    function isValidElement(object) {
        return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    function escape(key) {
        var escaperLookup = {
            "=": "=0",
            ":": "=2"
        };
        return "$" + key.replace(/[=:]/g, function(match) {
            return escaperLookup[match];
        });
    }
    function getElementKey(element, index) {
        return "object" === typeof element && null !== element && null != element.key ? (checkKeyStringCoercion(element.key), escape("" + element.key)) : index.toString(36);
    }
    function resolveThenable(thenable) {
        switch(thenable.status){
            case "fulfilled":
                return thenable.value;
            case "rejected":
                throw thenable.reason;
            default:
                switch("string" === typeof thenable.status ? thenable.then(noop, noop) : (thenable.status = "pending", thenable.then(function(fulfilledValue) {
                    "pending" === thenable.status && (thenable.status = "fulfilled", thenable.value = fulfilledValue);
                }, function(error) {
                    "pending" === thenable.status && (thenable.status = "rejected", thenable.reason = error);
                })), thenable.status){
                    case "fulfilled":
                        return thenable.value;
                    case "rejected":
                        throw thenable.reason;
                }
        }
        throw thenable;
    }
    function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
        var type = typeof children;
        if ("undefined" === type || "boolean" === type) children = null;
        var invokeCallback = !1;
        if (null === children) invokeCallback = !0;
        else switch(type){
            case "bigint":
            case "string":
            case "number":
                invokeCallback = !0;
                break;
            case "object":
                switch(children.$$typeof){
                    case REACT_ELEMENT_TYPE:
                    case REACT_PORTAL_TYPE:
                        invokeCallback = !0;
                        break;
                    case REACT_LAZY_TYPE:
                        return invokeCallback = children._init, mapIntoArray(invokeCallback(children._payload), array, escapedPrefix, nameSoFar, callback);
                }
        }
        if (invokeCallback) {
            invokeCallback = children;
            callback = callback(invokeCallback);
            var childKey = "" === nameSoFar ? "." + getElementKey(invokeCallback, 0) : nameSoFar;
            isArrayImpl(callback) ? (escapedPrefix = "", null != childKey && (escapedPrefix = childKey.replace(userProvidedKeyEscapeRegex, "$&/") + "/"), mapIntoArray(callback, array, escapedPrefix, "", function(c) {
                return c;
            })) : null != callback && (isValidElement(callback) && (null != callback.key && (invokeCallback && invokeCallback.key === callback.key || checkKeyStringCoercion(callback.key)), escapedPrefix = cloneAndReplaceKey(callback, escapedPrefix + (null == callback.key || invokeCallback && invokeCallback.key === callback.key ? "" : ("" + callback.key).replace(userProvidedKeyEscapeRegex, "$&/") + "/") + childKey), "" !== nameSoFar && null != invokeCallback && isValidElement(invokeCallback) && null == invokeCallback.key && invokeCallback._store && !invokeCallback._store.validated && (escapedPrefix._store.validated = 2), callback = escapedPrefix), array.push(callback));
            return 1;
        }
        invokeCallback = 0;
        childKey = "" === nameSoFar ? "." : nameSoFar + ":";
        if (isArrayImpl(children)) for(var i = 0; i < children.length; i++)nameSoFar = children[i], type = childKey + getElementKey(nameSoFar, i), invokeCallback += mapIntoArray(nameSoFar, array, escapedPrefix, type, callback);
        else if (i = getIteratorFn(children), "function" === typeof i) for(i === children.entries && (didWarnAboutMaps || console.warn("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), didWarnAboutMaps = !0), children = i.call(children), i = 0; !(nameSoFar = children.next()).done;)nameSoFar = nameSoFar.value, type = childKey + getElementKey(nameSoFar, i++), invokeCallback += mapIntoArray(nameSoFar, array, escapedPrefix, type, callback);
        else if ("object" === type) {
            if ("function" === typeof children.then) return mapIntoArray(resolveThenable(children), array, escapedPrefix, nameSoFar, callback);
            array = String(children);
            throw Error("Objects are not valid as a React child (found: " + ("[object Object]" === array ? "object with keys {" + Object.keys(children).join(", ") + "}" : array) + "). If you meant to render a collection of children, use an array instead.");
        }
        return invokeCallback;
    }
    function mapChildren(children, func, context) {
        if (null == children) return children;
        var result = [], count = 0;
        mapIntoArray(children, result, "", "", function(child) {
            return func.call(context, child, count++);
        });
        return result;
    }
    function lazyInitializer(payload) {
        if (-1 === payload._status) {
            var ioInfo = payload._ioInfo;
            null != ioInfo && (ioInfo.start = ioInfo.end = performance.now());
            ioInfo = payload._result;
            var thenable = ioInfo();
            thenable.then(function(moduleObject) {
                if (0 === payload._status || -1 === payload._status) {
                    payload._status = 1;
                    payload._result = moduleObject;
                    var _ioInfo = payload._ioInfo;
                    null != _ioInfo && (_ioInfo.end = performance.now());
                    void 0 === thenable.status && (thenable.status = "fulfilled", thenable.value = moduleObject);
                }
            }, function(error) {
                if (0 === payload._status || -1 === payload._status) {
                    payload._status = 2;
                    payload._result = error;
                    var _ioInfo2 = payload._ioInfo;
                    null != _ioInfo2 && (_ioInfo2.end = performance.now());
                    void 0 === thenable.status && (thenable.status = "rejected", thenable.reason = error);
                }
            });
            ioInfo = payload._ioInfo;
            if (null != ioInfo) {
                ioInfo.value = thenable;
                var displayName = thenable.displayName;
                "string" === typeof displayName && (ioInfo.name = displayName);
            }
            -1 === payload._status && (payload._status = 0, payload._result = thenable);
        }
        if (1 === payload._status) return ioInfo = payload._result, void 0 === ioInfo && console.error("lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))\n\nDid you accidentally put curly braces around the import?", ioInfo), "default" in ioInfo || console.error("lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))", ioInfo), ioInfo.default;
        throw payload._result;
    }
    function resolveDispatcher() {
        var dispatcher = ReactSharedInternals.H;
        null === dispatcher && console.error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.");
        return dispatcher;
    }
    function releaseAsyncTransition() {
        ReactSharedInternals.asyncTransitions--;
    }
    function enqueueTask(task) {
        if (null === enqueueTaskImpl) try {
            var requireString = ("require" + Math.random()).slice(0, 7);
            enqueueTaskImpl = (module && module[requireString]).call(module, "timers").setImmediate;
        } catch (_err) {
            enqueueTaskImpl = function(callback) {
                !1 === didWarnAboutMessageChannel && (didWarnAboutMessageChannel = !0, "undefined" === typeof MessageChannel && console.error("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."));
                var channel = new MessageChannel();
                channel.port1.onmessage = callback;
                channel.port2.postMessage(void 0);
            };
        }
        return enqueueTaskImpl(task);
    }
    function aggregateErrors(errors) {
        return 1 < errors.length && "function" === typeof AggregateError ? new AggregateError(errors) : errors[0];
    }
    function popActScope(prevActQueue, prevActScopeDepth) {
        prevActScopeDepth !== actScopeDepth - 1 && console.error("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. ");
        actScopeDepth = prevActScopeDepth;
    }
    function recursivelyFlushAsyncActWork(returnValue, resolve, reject) {
        var queue = ReactSharedInternals.actQueue;
        if (null !== queue) if (0 !== queue.length) try {
            flushActQueue(queue);
            enqueueTask(function() {
                return recursivelyFlushAsyncActWork(returnValue, resolve, reject);
            });
            return;
        } catch (error) {
            ReactSharedInternals.thrownErrors.push(error);
        }
        else ReactSharedInternals.actQueue = null;
        0 < ReactSharedInternals.thrownErrors.length ? (queue = aggregateErrors(ReactSharedInternals.thrownErrors), ReactSharedInternals.thrownErrors.length = 0, reject(queue)) : resolve(returnValue);
    }
    function flushActQueue(queue) {
        if (!isFlushing) {
            isFlushing = !0;
            var i = 0;
            try {
                for(; i < queue.length; i++){
                    var callback = queue[i];
                    do {
                        ReactSharedInternals.didUsePromise = !1;
                        var continuation = callback(!1);
                        if (null !== continuation) {
                            if (ReactSharedInternals.didUsePromise) {
                                queue[i] = callback;
                                queue.splice(0, i);
                                return;
                            }
                            callback = continuation;
                        } else break;
                    }while (1)
                }
                queue.length = 0;
            } catch (error) {
                queue.splice(0, i + 1), ReactSharedInternals.thrownErrors.push(error);
            } finally{
                isFlushing = !1;
            }
        }
    }
    "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
    var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), MAYBE_ITERATOR_SYMBOL = Symbol.iterator, didWarnStateUpdateForUnmountedComponent = {}, ReactNoopUpdateQueue = {
        isMounted: function() {
            return !1;
        },
        enqueueForceUpdate: function(publicInstance) {
            warnNoop(publicInstance, "forceUpdate");
        },
        enqueueReplaceState: function(publicInstance) {
            warnNoop(publicInstance, "replaceState");
        },
        enqueueSetState: function(publicInstance) {
            warnNoop(publicInstance, "setState");
        }
    }, assign = Object.assign, emptyObject = {};
    Object.freeze(emptyObject);
    Component.prototype.isReactComponent = {};
    Component.prototype.setState = function(partialState, callback) {
        if ("object" !== typeof partialState && "function" !== typeof partialState && null != partialState) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
        this.updater.enqueueSetState(this, partialState, callback, "setState");
    };
    Component.prototype.forceUpdate = function(callback) {
        this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
    };
    var deprecatedAPIs = {
        isMounted: [
            "isMounted",
            "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."
        ],
        replaceState: [
            "replaceState",
            "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."
        ]
    };
    for(fnName in deprecatedAPIs)deprecatedAPIs.hasOwnProperty(fnName) && defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
    ComponentDummy.prototype = Component.prototype;
    deprecatedAPIs = PureComponent.prototype = new ComponentDummy();
    deprecatedAPIs.constructor = PureComponent;
    assign(deprecatedAPIs, Component.prototype);
    deprecatedAPIs.isPureReactComponent = !0;
    var isArrayImpl = Array.isArray, REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = {
        H: null,
        A: null,
        T: null,
        S: null,
        actQueue: null,
        asyncTransitions: 0,
        isBatchingLegacy: !1,
        didScheduleLegacyUpdate: !1,
        didUsePromise: !1,
        thrownErrors: [],
        getCurrentStack: null,
        recentlyCreatedOwnerStacks: 0
    }, hasOwnProperty = Object.prototype.hasOwnProperty, createTask = console.createTask ? console.createTask : function() {
        return null;
    };
    deprecatedAPIs = {
        react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
        }
    };
    var specialPropKeyWarningShown, didWarnAboutOldJSXRuntime;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = deprecatedAPIs.react_stack_bottom_frame.bind(deprecatedAPIs, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutMaps = !1, userProvidedKeyEscapeRegex = /\/+/g, reportGlobalError = "function" === typeof reportError ? reportError : function(error) {
        if ("object" === typeof window && "function" === typeof window.ErrorEvent) {
            var event = new window.ErrorEvent("error", {
                bubbles: !0,
                cancelable: !0,
                message: "object" === typeof error && null !== error && "string" === typeof error.message ? String(error.message) : String(error),
                error: error
            });
            if (!window.dispatchEvent(event)) return;
        } else if ("object" === typeof __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"] && "function" === typeof __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].emit) {
            __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].emit("uncaughtException", error);
            return;
        }
        console.error(error);
    }, didWarnAboutMessageChannel = !1, enqueueTaskImpl = null, actScopeDepth = 0, didWarnNoAwaitAct = !1, isFlushing = !1, queueSeveralMicrotasks = "function" === typeof queueMicrotask ? function(callback) {
        queueMicrotask(function() {
            return queueMicrotask(callback);
        });
    } : enqueueTask;
    deprecatedAPIs = Object.freeze({
        __proto__: null,
        c: function(size) {
            return resolveDispatcher().useMemoCache(size);
        }
    });
    var fnName = {
        map: mapChildren,
        forEach: function(children, forEachFunc, forEachContext) {
            mapChildren(children, function() {
                forEachFunc.apply(this, arguments);
            }, forEachContext);
        },
        count: function(children) {
            var n = 0;
            mapChildren(children, function() {
                n++;
            });
            return n;
        },
        toArray: function(children) {
            return mapChildren(children, function(child) {
                return child;
            }) || [];
        },
        only: function(children) {
            if (!isValidElement(children)) throw Error("React.Children.only expected to receive a single React element child.");
            return children;
        }
    };
    exports.Activity = REACT_ACTIVITY_TYPE;
    exports.Children = fnName;
    exports.Component = Component;
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.Profiler = REACT_PROFILER_TYPE;
    exports.PureComponent = PureComponent;
    exports.StrictMode = REACT_STRICT_MODE_TYPE;
    exports.Suspense = REACT_SUSPENSE_TYPE;
    exports.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ReactSharedInternals;
    exports.__COMPILER_RUNTIME = deprecatedAPIs;
    exports.act = function(callback) {
        var prevActQueue = ReactSharedInternals.actQueue, prevActScopeDepth = actScopeDepth;
        actScopeDepth++;
        var queue = ReactSharedInternals.actQueue = null !== prevActQueue ? prevActQueue : [], didAwaitActCall = !1;
        try {
            var result = callback();
        } catch (error) {
            ReactSharedInternals.thrownErrors.push(error);
        }
        if (0 < ReactSharedInternals.thrownErrors.length) throw popActScope(prevActQueue, prevActScopeDepth), callback = aggregateErrors(ReactSharedInternals.thrownErrors), ReactSharedInternals.thrownErrors.length = 0, callback;
        if (null !== result && "object" === typeof result && "function" === typeof result.then) {
            var thenable = result;
            queueSeveralMicrotasks(function() {
                didAwaitActCall || didWarnNoAwaitAct || (didWarnNoAwaitAct = !0, console.error("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"));
            });
            return {
                then: function(resolve, reject) {
                    didAwaitActCall = !0;
                    thenable.then(function(returnValue) {
                        popActScope(prevActQueue, prevActScopeDepth);
                        if (0 === prevActScopeDepth) {
                            try {
                                flushActQueue(queue), enqueueTask(function() {
                                    return recursivelyFlushAsyncActWork(returnValue, resolve, reject);
                                });
                            } catch (error$0) {
                                ReactSharedInternals.thrownErrors.push(error$0);
                            }
                            if (0 < ReactSharedInternals.thrownErrors.length) {
                                var _thrownError = aggregateErrors(ReactSharedInternals.thrownErrors);
                                ReactSharedInternals.thrownErrors.length = 0;
                                reject(_thrownError);
                            }
                        } else resolve(returnValue);
                    }, function(error) {
                        popActScope(prevActQueue, prevActScopeDepth);
                        0 < ReactSharedInternals.thrownErrors.length ? (error = aggregateErrors(ReactSharedInternals.thrownErrors), ReactSharedInternals.thrownErrors.length = 0, reject(error)) : reject(error);
                    });
                }
            };
        }
        var returnValue$jscomp$0 = result;
        popActScope(prevActQueue, prevActScopeDepth);
        0 === prevActScopeDepth && (flushActQueue(queue), 0 !== queue.length && queueSeveralMicrotasks(function() {
            didAwaitActCall || didWarnNoAwaitAct || (didWarnNoAwaitAct = !0, console.error("A component suspended inside an `act` scope, but the `act` call was not awaited. When testing React components that depend on asynchronous data, you must await the result:\n\nawait act(() => ...)"));
        }), ReactSharedInternals.actQueue = null);
        if (0 < ReactSharedInternals.thrownErrors.length) throw callback = aggregateErrors(ReactSharedInternals.thrownErrors), ReactSharedInternals.thrownErrors.length = 0, callback;
        return {
            then: function(resolve, reject) {
                didAwaitActCall = !0;
                0 === prevActScopeDepth ? (ReactSharedInternals.actQueue = queue, enqueueTask(function() {
                    return recursivelyFlushAsyncActWork(returnValue$jscomp$0, resolve, reject);
                })) : resolve(returnValue$jscomp$0);
            }
        };
    };
    exports.cache = function(fn) {
        return function() {
            return fn.apply(null, arguments);
        };
    };
    exports.cacheSignal = function() {
        return null;
    };
    exports.captureOwnerStack = function() {
        var getCurrentStack = ReactSharedInternals.getCurrentStack;
        return null === getCurrentStack ? null : getCurrentStack();
    };
    exports.cloneElement = function(element, config, children) {
        if (null === element || void 0 === element) throw Error("The argument must be a React element, but you passed " + element + ".");
        var props = assign({}, element.props), key = element.key, owner = element._owner;
        if (null != config) {
            var JSCompiler_inline_result;
            a: {
                if (hasOwnProperty.call(config, "ref") && (JSCompiler_inline_result = Object.getOwnPropertyDescriptor(config, "ref").get) && JSCompiler_inline_result.isReactWarning) {
                    JSCompiler_inline_result = !1;
                    break a;
                }
                JSCompiler_inline_result = void 0 !== config.ref;
            }
            JSCompiler_inline_result && (owner = getOwner());
            hasValidKey(config) && (checkKeyStringCoercion(config.key), key = "" + config.key);
            for(propName in config)!hasOwnProperty.call(config, propName) || "key" === propName || "__self" === propName || "__source" === propName || "ref" === propName && void 0 === config.ref || (props[propName] = config[propName]);
        }
        var propName = arguments.length - 2;
        if (1 === propName) props.children = children;
        else if (1 < propName) {
            JSCompiler_inline_result = Array(propName);
            for(var i = 0; i < propName; i++)JSCompiler_inline_result[i] = arguments[i + 2];
            props.children = JSCompiler_inline_result;
        }
        props = ReactElement(element.type, key, props, owner, element._debugStack, element._debugTask);
        for(key = 2; key < arguments.length; key++)validateChildKeys(arguments[key]);
        return props;
    };
    exports.createContext = function(defaultValue) {
        defaultValue = {
            $$typeof: REACT_CONTEXT_TYPE,
            _currentValue: defaultValue,
            _currentValue2: defaultValue,
            _threadCount: 0,
            Provider: null,
            Consumer: null
        };
        defaultValue.Provider = defaultValue;
        defaultValue.Consumer = {
            $$typeof: REACT_CONSUMER_TYPE,
            _context: defaultValue
        };
        defaultValue._currentRenderer = null;
        defaultValue._currentRenderer2 = null;
        return defaultValue;
    };
    exports.createElement = function(type, config, children) {
        for(var i = 2; i < arguments.length; i++)validateChildKeys(arguments[i]);
        i = {};
        var key = null;
        if (null != config) for(propName in didWarnAboutOldJSXRuntime || !("__self" in config) || "key" in config || (didWarnAboutOldJSXRuntime = !0, console.warn("Your app (or one of its dependencies) is using an outdated JSX transform. Update to the modern JSX transform for faster performance: https://react.dev/link/new-jsx-transform")), hasValidKey(config) && (checkKeyStringCoercion(config.key), key = "" + config.key), config)hasOwnProperty.call(config, propName) && "key" !== propName && "__self" !== propName && "__source" !== propName && (i[propName] = config[propName]);
        var childrenLength = arguments.length - 2;
        if (1 === childrenLength) i.children = children;
        else if (1 < childrenLength) {
            for(var childArray = Array(childrenLength), _i = 0; _i < childrenLength; _i++)childArray[_i] = arguments[_i + 2];
            Object.freeze && Object.freeze(childArray);
            i.children = childArray;
        }
        if (type && type.defaultProps) for(propName in childrenLength = type.defaultProps, childrenLength)void 0 === i[propName] && (i[propName] = childrenLength[propName]);
        key && defineKeyPropWarningGetter(i, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        var propName = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        return ReactElement(type, key, i, getOwner(), propName ? Error("react-stack-top-frame") : unknownOwnerDebugStack, propName ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
    exports.createRef = function() {
        var refObject = {
            current: null
        };
        Object.seal(refObject);
        return refObject;
    };
    exports.forwardRef = function(render) {
        null != render && render.$$typeof === REACT_MEMO_TYPE ? console.error("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).") : "function" !== typeof render ? console.error("forwardRef requires a render function but was given %s.", null === render ? "null" : typeof render) : 0 !== render.length && 2 !== render.length && console.error("forwardRef render functions accept exactly two parameters: props and ref. %s", 1 === render.length ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined.");
        null != render && null != render.defaultProps && console.error("forwardRef render functions do not support defaultProps. Did you accidentally pass a React component?");
        var elementType = {
            $$typeof: REACT_FORWARD_REF_TYPE,
            render: render
        }, ownName;
        Object.defineProperty(elementType, "displayName", {
            enumerable: !1,
            configurable: !0,
            get: function() {
                return ownName;
            },
            set: function(name) {
                ownName = name;
                render.name || render.displayName || (Object.defineProperty(render, "name", {
                    value: name
                }), render.displayName = name);
            }
        });
        return elementType;
    };
    exports.isValidElement = isValidElement;
    exports.lazy = function(ctor) {
        ctor = {
            _status: -1,
            _result: ctor
        };
        var lazyType = {
            $$typeof: REACT_LAZY_TYPE,
            _payload: ctor,
            _init: lazyInitializer
        }, ioInfo = {
            name: "lazy",
            start: -1,
            end: -1,
            value: null,
            owner: null,
            debugStack: Error("react-stack-top-frame"),
            debugTask: console.createTask ? console.createTask("lazy()") : null
        };
        ctor._ioInfo = ioInfo;
        lazyType._debugInfo = [
            {
                awaited: ioInfo
            }
        ];
        return lazyType;
    };
    exports.memo = function(type, compare) {
        null == type && console.error("memo: The first argument must be a component. Instead received: %s", null === type ? "null" : typeof type);
        compare = {
            $$typeof: REACT_MEMO_TYPE,
            type: type,
            compare: void 0 === compare ? null : compare
        };
        var ownName;
        Object.defineProperty(compare, "displayName", {
            enumerable: !1,
            configurable: !0,
            get: function() {
                return ownName;
            },
            set: function(name) {
                ownName = name;
                type.name || type.displayName || (Object.defineProperty(type, "name", {
                    value: name
                }), type.displayName = name);
            }
        });
        return compare;
    };
    exports.startTransition = function(scope) {
        var prevTransition = ReactSharedInternals.T, currentTransition = {};
        currentTransition._updatedFibers = new Set();
        ReactSharedInternals.T = currentTransition;
        try {
            var returnValue = scope(), onStartTransitionFinish = ReactSharedInternals.S;
            null !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue);
            "object" === typeof returnValue && null !== returnValue && "function" === typeof returnValue.then && (ReactSharedInternals.asyncTransitions++, returnValue.then(releaseAsyncTransition, releaseAsyncTransition), returnValue.then(noop, reportGlobalError));
        } catch (error) {
            reportGlobalError(error);
        } finally{
            null === prevTransition && currentTransition._updatedFibers && (scope = currentTransition._updatedFibers.size, currentTransition._updatedFibers.clear(), 10 < scope && console.warn("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table.")), null !== prevTransition && null !== currentTransition.types && (null !== prevTransition.types && prevTransition.types !== currentTransition.types && console.error("We expected inner Transitions to have transferred the outer types set and that you cannot add to the outer Transition while inside the inner.This is a bug in React."), prevTransition.types = currentTransition.types), ReactSharedInternals.T = prevTransition;
        }
    };
    exports.unstable_useCacheRefresh = function() {
        return resolveDispatcher().useCacheRefresh();
    };
    exports.use = function(usable) {
        return resolveDispatcher().use(usable);
    };
    exports.useActionState = function(action, initialState, permalink) {
        return resolveDispatcher().useActionState(action, initialState, permalink);
    };
    exports.useCallback = function(callback, deps) {
        return resolveDispatcher().useCallback(callback, deps);
    };
    exports.useContext = function(Context) {
        var dispatcher = resolveDispatcher();
        Context.$$typeof === REACT_CONSUMER_TYPE && console.error("Calling useContext(Context.Consumer) is not supported and will cause bugs. Did you mean to call useContext(Context) instead?");
        return dispatcher.useContext(Context);
    };
    exports.useDebugValue = function(value, formatterFn) {
        return resolveDispatcher().useDebugValue(value, formatterFn);
    };
    exports.useDeferredValue = function(value, initialValue) {
        return resolveDispatcher().useDeferredValue(value, initialValue);
    };
    exports.useEffect = function(create, deps) {
        null == create && console.warn("React Hook useEffect requires an effect callback. Did you forget to pass a callback to the hook?");
        return resolveDispatcher().useEffect(create, deps);
    };
    exports.useEffectEvent = function(callback) {
        return resolveDispatcher().useEffectEvent(callback);
    };
    exports.useId = function() {
        return resolveDispatcher().useId();
    };
    exports.useImperativeHandle = function(ref, create, deps) {
        return resolveDispatcher().useImperativeHandle(ref, create, deps);
    };
    exports.useInsertionEffect = function(create, deps) {
        null == create && console.warn("React Hook useInsertionEffect requires an effect callback. Did you forget to pass a callback to the hook?");
        return resolveDispatcher().useInsertionEffect(create, deps);
    };
    exports.useLayoutEffect = function(create, deps) {
        null == create && console.warn("React Hook useLayoutEffect requires an effect callback. Did you forget to pass a callback to the hook?");
        return resolveDispatcher().useLayoutEffect(create, deps);
    };
    exports.useMemo = function(create, deps) {
        return resolveDispatcher().useMemo(create, deps);
    };
    exports.useOptimistic = function(passthrough, reducer) {
        return resolveDispatcher().useOptimistic(passthrough, reducer);
    };
    exports.useReducer = function(reducer, initialArg, init) {
        return resolveDispatcher().useReducer(reducer, initialArg, init);
    };
    exports.useRef = function(initialValue) {
        return resolveDispatcher().useRef(initialValue);
    };
    exports.useState = function(initialState) {
        return resolveDispatcher().useState(initialState);
    };
    exports.useSyncExternalStore = function(subscribe, getSnapshot, getServerSnapshot) {
        return resolveDispatcher().useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
    };
    exports.useTransition = function() {
        return resolveDispatcher().useTransition();
    };
    exports.version = "19.2.6";
    "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
}();
}),
"[project]/restaurant-menu-editor/node_modules/react/index.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/restaurant-menu-editor/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/restaurant-menu-editor/node_modules/react/cjs/react.development.js [client] (ecmascript)");
}
}),
"[project]/restaurant-menu-editor/node_modules/react/cjs/react-jsx-runtime.development.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/restaurant-menu-editor/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ "use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
            for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
        } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, maybeKey, getOwner(), debugStack, debugTask);
    }
    function validateChildKeys(node) {
        isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
    }
    function isValidElement(object) {
        return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    var React = __turbopack_context__.r("[project]/restaurant-menu-editor/node_modules/react/index.js [client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
    };
    React = {
        react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
        }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(React, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsx = function(type, config, maybeKey) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        return jsxDEVImpl(type, config, maybeKey, !1, trackActualOwner ? Error("react-stack-top-frame") : unknownOwnerDebugStack, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
    exports.jsxs = function(type, config, maybeKey) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        return jsxDEVImpl(type, config, maybeKey, !0, trackActualOwner ? Error("react-stack-top-frame") : unknownOwnerDebugStack, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
}();
}),
"[project]/restaurant-menu-editor/node_modules/react/jsx-runtime.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/restaurant-menu-editor/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/restaurant-menu-editor/node_modules/react/cjs/react-jsx-runtime.development.js [client] (ecmascript)");
}
}),
"[project]/restaurant-menu-editor/node_modules/react/cjs/react-jsx-dev-runtime.development.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/restaurant-menu-editor/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ "use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
            for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
        } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, maybeKey, getOwner(), debugStack, debugTask);
    }
    function validateChildKeys(node) {
        isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
    }
    function isValidElement(object) {
        return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    var React = __turbopack_context__.r("[project]/restaurant-menu-editor/node_modules/react/index.js [client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
    };
    React = {
        react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
        }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(React, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        return jsxDEVImpl(type, config, maybeKey, isStaticChildren, trackActualOwner ? Error("react-stack-top-frame") : unknownOwnerDebugStack, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
}();
}),
"[project]/restaurant-menu-editor/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/restaurant-menu-editor/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/restaurant-menu-editor/node_modules/react/cjs/react-jsx-dev-runtime.development.js [client] (ecmascript)");
}
}),
"[project]/restaurant-menu-editor/node_modules/scheduler/cjs/scheduler.development.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/restaurant-menu-editor/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
/**
 * @license React
 * scheduler.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ "use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function performWorkUntilDeadline() {
        needsPaint = !1;
        if (isMessageLoopRunning) {
            var currentTime = exports.unstable_now();
            startTime = currentTime;
            var hasMoreWork = !0;
            try {
                a: {
                    isHostCallbackScheduled = !1;
                    isHostTimeoutScheduled && (isHostTimeoutScheduled = !1, localClearTimeout(taskTimeoutID), taskTimeoutID = -1);
                    isPerformingWork = !0;
                    var previousPriorityLevel = currentPriorityLevel;
                    try {
                        b: {
                            advanceTimers(currentTime);
                            for(currentTask = peek(taskQueue); null !== currentTask && !(currentTask.expirationTime > currentTime && shouldYieldToHost());){
                                var callback = currentTask.callback;
                                if ("function" === typeof callback) {
                                    currentTask.callback = null;
                                    currentPriorityLevel = currentTask.priorityLevel;
                                    var continuationCallback = callback(currentTask.expirationTime <= currentTime);
                                    currentTime = exports.unstable_now();
                                    if ("function" === typeof continuationCallback) {
                                        currentTask.callback = continuationCallback;
                                        advanceTimers(currentTime);
                                        hasMoreWork = !0;
                                        break b;
                                    }
                                    currentTask === peek(taskQueue) && pop(taskQueue);
                                    advanceTimers(currentTime);
                                } else pop(taskQueue);
                                currentTask = peek(taskQueue);
                            }
                            if (null !== currentTask) hasMoreWork = !0;
                            else {
                                var firstTimer = peek(timerQueue);
                                null !== firstTimer && requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);
                                hasMoreWork = !1;
                            }
                        }
                        break a;
                    } finally{
                        currentTask = null, currentPriorityLevel = previousPriorityLevel, isPerformingWork = !1;
                    }
                    hasMoreWork = void 0;
                }
            } finally{
                hasMoreWork ? schedulePerformWorkUntilDeadline() : isMessageLoopRunning = !1;
            }
        }
    }
    function push(heap, node) {
        var index = heap.length;
        heap.push(node);
        a: for(; 0 < index;){
            var parentIndex = index - 1 >>> 1, parent = heap[parentIndex];
            if (0 < compare(parent, node)) heap[parentIndex] = node, heap[index] = parent, index = parentIndex;
            else break a;
        }
    }
    function peek(heap) {
        return 0 === heap.length ? null : heap[0];
    }
    function pop(heap) {
        if (0 === heap.length) return null;
        var first = heap[0], last = heap.pop();
        if (last !== first) {
            heap[0] = last;
            a: for(var index = 0, length = heap.length, halfLength = length >>> 1; index < halfLength;){
                var leftIndex = 2 * (index + 1) - 1, left = heap[leftIndex], rightIndex = leftIndex + 1, right = heap[rightIndex];
                if (0 > compare(left, last)) rightIndex < length && 0 > compare(right, left) ? (heap[index] = right, heap[rightIndex] = last, index = rightIndex) : (heap[index] = left, heap[leftIndex] = last, index = leftIndex);
                else if (rightIndex < length && 0 > compare(right, last)) heap[index] = right, heap[rightIndex] = last, index = rightIndex;
                else break a;
            }
        }
        return first;
    }
    function compare(a, b) {
        var diff = a.sortIndex - b.sortIndex;
        return 0 !== diff ? diff : a.id - b.id;
    }
    function advanceTimers(currentTime) {
        for(var timer = peek(timerQueue); null !== timer;){
            if (null === timer.callback) pop(timerQueue);
            else if (timer.startTime <= currentTime) pop(timerQueue), timer.sortIndex = timer.expirationTime, push(taskQueue, timer);
            else break;
            timer = peek(timerQueue);
        }
    }
    function handleTimeout(currentTime) {
        isHostTimeoutScheduled = !1;
        advanceTimers(currentTime);
        if (!isHostCallbackScheduled) if (null !== peek(taskQueue)) isHostCallbackScheduled = !0, isMessageLoopRunning || (isMessageLoopRunning = !0, schedulePerformWorkUntilDeadline());
        else {
            var firstTimer = peek(timerQueue);
            null !== firstTimer && requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);
        }
    }
    function shouldYieldToHost() {
        return needsPaint ? !0 : exports.unstable_now() - startTime < frameInterval ? !1 : !0;
    }
    function requestHostTimeout(callback, ms) {
        taskTimeoutID = localSetTimeout(function() {
            callback(exports.unstable_now());
        }, ms);
    }
    "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
    exports.unstable_now = void 0;
    if ("object" === typeof performance && "function" === typeof performance.now) {
        var localPerformance = performance;
        exports.unstable_now = function() {
            return localPerformance.now();
        };
    } else {
        var localDate = Date, initialTime = localDate.now();
        exports.unstable_now = function() {
            return localDate.now() - initialTime;
        };
    }
    var taskQueue = [], timerQueue = [], taskIdCounter = 1, currentTask = null, currentPriorityLevel = 3, isPerformingWork = !1, isHostCallbackScheduled = !1, isHostTimeoutScheduled = !1, needsPaint = !1, localSetTimeout = "function" === typeof setTimeout ? setTimeout : null, localClearTimeout = "function" === typeof clearTimeout ? clearTimeout : null, localSetImmediate = "undefined" !== typeof setImmediate ? setImmediate : null, isMessageLoopRunning = !1, taskTimeoutID = -1, frameInterval = 5, startTime = -1;
    if ("function" === typeof localSetImmediate) var schedulePerformWorkUntilDeadline = function() {
        localSetImmediate(performWorkUntilDeadline);
    };
    else if ("undefined" !== typeof MessageChannel) {
        var channel = new MessageChannel(), port = channel.port2;
        channel.port1.onmessage = performWorkUntilDeadline;
        schedulePerformWorkUntilDeadline = function() {
            port.postMessage(null);
        };
    } else schedulePerformWorkUntilDeadline = function() {
        localSetTimeout(performWorkUntilDeadline, 0);
    };
    exports.unstable_IdlePriority = 5;
    exports.unstable_ImmediatePriority = 1;
    exports.unstable_LowPriority = 4;
    exports.unstable_NormalPriority = 3;
    exports.unstable_Profiling = null;
    exports.unstable_UserBlockingPriority = 2;
    exports.unstable_cancelCallback = function(task) {
        task.callback = null;
    };
    exports.unstable_forceFrameRate = function(fps) {
        0 > fps || 125 < fps ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : frameInterval = 0 < fps ? Math.floor(1e3 / fps) : 5;
    };
    exports.unstable_getCurrentPriorityLevel = function() {
        return currentPriorityLevel;
    };
    exports.unstable_next = function(eventHandler) {
        switch(currentPriorityLevel){
            case 1:
            case 2:
            case 3:
                var priorityLevel = 3;
                break;
            default:
                priorityLevel = currentPriorityLevel;
        }
        var previousPriorityLevel = currentPriorityLevel;
        currentPriorityLevel = priorityLevel;
        try {
            return eventHandler();
        } finally{
            currentPriorityLevel = previousPriorityLevel;
        }
    };
    exports.unstable_requestPaint = function() {
        needsPaint = !0;
    };
    exports.unstable_runWithPriority = function(priorityLevel, eventHandler) {
        switch(priorityLevel){
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
                break;
            default:
                priorityLevel = 3;
        }
        var previousPriorityLevel = currentPriorityLevel;
        currentPriorityLevel = priorityLevel;
        try {
            return eventHandler();
        } finally{
            currentPriorityLevel = previousPriorityLevel;
        }
    };
    exports.unstable_scheduleCallback = function(priorityLevel, callback, options) {
        var currentTime = exports.unstable_now();
        "object" === typeof options && null !== options ? (options = options.delay, options = "number" === typeof options && 0 < options ? currentTime + options : currentTime) : options = currentTime;
        switch(priorityLevel){
            case 1:
                var timeout = -1;
                break;
            case 2:
                timeout = 250;
                break;
            case 5:
                timeout = 1073741823;
                break;
            case 4:
                timeout = 1e4;
                break;
            default:
                timeout = 5e3;
        }
        timeout = options + timeout;
        priorityLevel = {
            id: taskIdCounter++,
            callback: callback,
            priorityLevel: priorityLevel,
            startTime: options,
            expirationTime: timeout,
            sortIndex: -1
        };
        options > currentTime ? (priorityLevel.sortIndex = options, push(timerQueue, priorityLevel), null === peek(taskQueue) && priorityLevel === peek(timerQueue) && (isHostTimeoutScheduled ? (localClearTimeout(taskTimeoutID), taskTimeoutID = -1) : isHostTimeoutScheduled = !0, requestHostTimeout(handleTimeout, options - currentTime))) : (priorityLevel.sortIndex = timeout, push(taskQueue, priorityLevel), isHostCallbackScheduled || isPerformingWork || (isHostCallbackScheduled = !0, isMessageLoopRunning || (isMessageLoopRunning = !0, schedulePerformWorkUntilDeadline())));
        return priorityLevel;
    };
    exports.unstable_shouldYield = shouldYieldToHost;
    exports.unstable_wrapCallback = function(callback) {
        var parentPriorityLevel = currentPriorityLevel;
        return function() {
            var previousPriorityLevel = currentPriorityLevel;
            currentPriorityLevel = parentPriorityLevel;
            try {
                return callback.apply(this, arguments);
            } finally{
                currentPriorityLevel = previousPriorityLevel;
            }
        };
    };
    "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
}();
}),
"[project]/restaurant-menu-editor/node_modules/scheduler/index.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/restaurant-menu-editor/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/restaurant-menu-editor/node_modules/scheduler/cjs/scheduler.development.js [client] (ecmascript)");
}
}),
"[project]/restaurant-menu-editor/node_modules/@react-spring/types/dist/cjs/react-spring_types.development.cjs [client] (ecmascript)", ((__turbopack_context__, module, exports) => {

Object.defineProperty(exports, Symbol.toStringTag, {
    value: 'Module'
});
//#region src/utils.ts
/** Use `[T] extends [Any]` to know if a type parameter is `any` */ var Any = class {
};
//#endregion
exports.Any = Any;
}),
"[project]/restaurant-menu-editor/node_modules/@react-spring/types/dist/cjs/index.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/restaurant-menu-editor/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/restaurant-menu-editor/node_modules/@react-spring/types/dist/cjs/react-spring_types.development.cjs [client] (ecmascript)");
}
}),
"[project]/restaurant-menu-editor/node_modules/@react-spring/rafz/dist/cjs/react-spring_rafz.development.cjs [client] (ecmascript)", ((__turbopack_context__, module, exports) => {

Object.defineProperty(exports, Symbol.toStringTag, {
    value: 'Module'
});
//#region src/index.ts
let updateQueue = makeQueue();
/**
* Schedule an update for next frame.
* Your function can return `true` to repeat next frame.
*/ const raf = (fn)=>schedule(fn, updateQueue);
let writeQueue = makeQueue();
raf.write = (fn)=>schedule(fn, writeQueue);
let onStartQueue = makeQueue();
raf.onStart = (fn)=>schedule(fn, onStartQueue);
let onFrameQueue = makeQueue();
raf.onFrame = (fn)=>schedule(fn, onFrameQueue);
let onFinishQueue = makeQueue();
raf.onFinish = (fn)=>schedule(fn, onFinishQueue);
let timeouts = [];
raf.setTimeout = (handler, ms)=>{
    const time = raf.now() + ms;
    const cancel = ()=>{
        const i = timeouts.findIndex((t)=>t.cancel == cancel);
        if (~i) timeouts.splice(i, 1);
        pendingCount -= ~i ? 1 : 0;
    };
    const timeout = {
        time,
        handler,
        cancel
    };
    timeouts.splice(findTimeout(time), 0, timeout);
    pendingCount += 1;
    start();
    return timeout;
};
/** Find the index where the given time is not greater. */ const findTimeout = (time)=>~(~timeouts.findIndex((t)=>t.time > time) || ~timeouts.length);
raf.cancel = (fn)=>{
    onStartQueue.delete(fn);
    onFrameQueue.delete(fn);
    onFinishQueue.delete(fn);
    updateQueue.delete(fn);
    writeQueue.delete(fn);
};
raf.sync = (fn)=>{
    sync = true;
    raf.batchedUpdates(fn);
    sync = false;
};
raf.throttle = (fn)=>{
    let lastArgs;
    function queuedFn() {
        try {
            fn(...lastArgs);
        } finally{
            lastArgs = null;
        }
    }
    function throttled(...args) {
        lastArgs = args;
        raf.onStart(queuedFn);
    }
    throttled.handler = fn;
    throttled.cancel = ()=>{
        onStartQueue.delete(queuedFn);
        lastArgs = null;
    };
    return throttled;
};
let nativeRaf = typeof window != "undefined" ? window.requestAnimationFrame : ()=>{};
raf.use = (impl)=>nativeRaf = impl;
raf.now = typeof performance != "undefined" ? ()=>performance.now() : Date.now;
raf.batchedUpdates = (fn)=>fn();
raf.catch = console.error;
raf.frameLoop = "always";
raf.advance = ()=>{
    if (raf.frameLoop !== "demand") console.warn("Cannot call the manual advancement of rafz whilst frameLoop is not set as demand");
    else update();
};
/** The most recent timestamp. */ let ts = -1;
/** The number of pending tasks  */ let pendingCount = 0;
/** When true, scheduling is disabled. */ let sync = false;
function schedule(fn, queue) {
    if (sync) {
        queue.delete(fn);
        fn(0);
    } else {
        queue.add(fn);
        start();
    }
}
function start() {
    if (ts < 0) {
        ts = 0;
        if (raf.frameLoop !== "demand") nativeRaf(loop);
    }
}
function stop() {
    ts = -1;
}
function loop() {
    if (~ts) {
        nativeRaf(loop);
        raf.batchedUpdates(update);
    }
}
function update() {
    const prevTs = ts;
    ts = raf.now();
    const count = findTimeout(ts);
    if (count) {
        eachSafely(timeouts.splice(0, count), (t)=>t.handler());
        pendingCount -= count;
    }
    if (!pendingCount) {
        stop();
        return;
    }
    onStartQueue.flush();
    updateQueue.flush(prevTs ? Math.min(64, ts - prevTs) : 16.667);
    onFrameQueue.flush();
    writeQueue.flush();
    onFinishQueue.flush();
}
function makeQueue() {
    let next = /* @__PURE__ */ new Set();
    let current = next;
    return {
        add (fn) {
            pendingCount += current == next && !next.has(fn) ? 1 : 0;
            next.add(fn);
        },
        delete (fn) {
            pendingCount -= current == next && next.has(fn) ? 1 : 0;
            return next.delete(fn);
        },
        flush (arg) {
            if (current.size) {
                next = /* @__PURE__ */ new Set();
                pendingCount -= current.size;
                eachSafely(current, (fn)=>fn(arg) && next.add(fn));
                pendingCount += next.size;
                current = next;
            }
        }
    };
}
function eachSafely(values, each) {
    values.forEach((value)=>{
        try {
            each(value);
        } catch (e) {
            raf.catch(e);
        }
    });
}
/** Tree-shakable state for testing purposes */ const __raf = {
    /** The number of pending tasks */ count () {
        return pendingCount;
    },
    /** Whether there's a raf update loop running */ isRunning () {
        return ts >= 0;
    },
    /** Clear internal state. Never call from update loop! */ clear () {
        ts = -1;
        timeouts = [];
        onStartQueue = makeQueue();
        updateQueue = makeQueue();
        onFrameQueue = makeQueue();
        writeQueue = makeQueue();
        onFinishQueue = makeQueue();
        pendingCount = 0;
    }
};
//#endregion
exports.__raf = __raf;
exports.raf = raf;
}),
"[project]/restaurant-menu-editor/node_modules/@react-spring/rafz/dist/cjs/index.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/restaurant-menu-editor/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/restaurant-menu-editor/node_modules/@react-spring/rafz/dist/cjs/react-spring_rafz.development.cjs [client] (ecmascript)");
}
}),
"[project]/restaurant-menu-editor/node_modules/@react-spring/shared/dist/cjs/react-spring_shared.development.cjs [client] (ecmascript)", ((__turbopack_context__, module, exports) => {

Object.defineProperty(exports, Symbol.toStringTag, {
    value: 'Module'
});
//#region \0rolldown/runtime.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols)=>{
    let target = {};
    for(var name in all){
        __defProp(target, name, {
            get: all[name],
            enumerable: true
        });
    }
    if (!no_symbols) {
        __defProp(target, Symbol.toStringTag, {
            value: "Module"
        });
    }
    return target;
};
//#endregion
let _react_spring_rafz = __turbopack_context__.r("[project]/restaurant-menu-editor/node_modules/@react-spring/rafz/dist/cjs/index.js [client] (ecmascript)");
let react = __turbopack_context__.r("[project]/restaurant-menu-editor/node_modules/react/index.js [client] (ecmascript)");
//#region src/helpers.ts
function noop() {}
const defineHidden = (obj, key, value)=>Object.defineProperty(obj, key, {
        value,
        writable: true,
        configurable: true
    });
const is = {
    arr: Array.isArray,
    obj: (a)=>!!a && a.constructor.name === "Object",
    fun: (a)=>typeof a === "function",
    str: (a)=>typeof a === "string",
    num: (a)=>typeof a === "number",
    und: (a)=>a === void 0
};
/** Compare animatable values */ function isEqual(a, b) {
    if (is.arr(a)) {
        if (!is.arr(b) || a.length !== b.length) return false;
        for(let i = 0; i < a.length; i++)if (a[i] !== b[i]) return false;
        return true;
    }
    return a === b;
}
/** Minifiable `.forEach` call */ const each = (obj, fn)=>obj.forEach(fn);
/** Iterate the properties of an object */ function eachProp(obj, fn, ctx) {
    if (is.arr(obj)) {
        for(let i = 0; i < obj.length; i++)fn.call(ctx, obj[i], `${i}`);
        return;
    }
    for(const key in obj)if (obj.hasOwnProperty(key)) fn.call(ctx, obj[key], key);
}
const toArray = (a)=>is.und(a) ? [] : is.arr(a) ? a : [
        a
    ];
function flush(queue, iterator) {
    if (queue.size) {
        const items = Array.from(queue);
        queue.clear();
        each(items, iterator);
    }
}
/** Call every function in the queue with the same arguments. */ const flushCalls = (queue, ...args)=>flush(queue, (fn)=>fn(...args));
const isSSR = ()=>typeof window === "undefined" || !window.navigator || /ServerSideRendering|^Deno\//.test(window.navigator.userAgent);
//#endregion
//#region src/globals.ts
var globals_exports = /* @__PURE__ */ __exportAll({
    assign: ()=>assign,
    colors: ()=>colors$1,
    createStringInterpolator: ()=>createStringInterpolator$1,
    skipAnimation: ()=>skipAnimation,
    to: ()=>to,
    willAdvance: ()=>willAdvance
});
let createStringInterpolator$1;
let to;
let colors$1 = null;
let skipAnimation = false;
let willAdvance = noop;
const assign = (globals)=>{
    if (globals.to) to = globals.to;
    if (globals.now) _react_spring_rafz.raf.now = globals.now;
    if (globals.colors !== void 0) colors$1 = globals.colors;
    if (globals.skipAnimation != null) skipAnimation = globals.skipAnimation;
    if (globals.createStringInterpolator) createStringInterpolator$1 = globals.createStringInterpolator;
    if (globals.requestAnimationFrame) _react_spring_rafz.raf.use(globals.requestAnimationFrame);
    if (globals.batchedUpdates) _react_spring_rafz.raf.batchedUpdates = globals.batchedUpdates;
    if (globals.willAdvance) willAdvance = globals.willAdvance;
    if (globals.frameLoop) _react_spring_rafz.raf.frameLoop = globals.frameLoop;
};
//#endregion
//#region src/FrameLoop.ts
const startQueue = /* @__PURE__ */ new Set();
let currentFrame = [];
let prevFrame = [];
let priority = 0;
/**
* The frameloop executes its animations in order of lowest priority first.
* Animations are retained until idle.
*/ const frameLoop = {
    get idle () {
        return !startQueue.size && !currentFrame.length;
    },
    /** Advance the given animation on every frame until idle. */ start (animation) {
        if (priority > animation.priority) {
            startQueue.add(animation);
            _react_spring_rafz.raf.onStart(flushStartQueue);
        } else {
            startSafely(animation);
            (0, _react_spring_rafz.raf)(advance);
        }
    },
    /** Advance all animations by the given time. */ advance,
    /** Call this when an animation's priority changes. */ sort (animation) {
        if (priority) _react_spring_rafz.raf.onFrame(()=>frameLoop.sort(animation));
        else {
            const prevIndex = currentFrame.indexOf(animation);
            if (~prevIndex) {
                currentFrame.splice(prevIndex, 1);
                startUnsafely(animation);
            }
        }
    },
    /**
	* Clear all animations. For testing purposes.
	*
	* ☠️ Never call this from within the frameloop.
	*/ clear () {
        currentFrame = [];
        startQueue.clear();
    }
};
function flushStartQueue() {
    startQueue.forEach(startSafely);
    startQueue.clear();
    (0, _react_spring_rafz.raf)(advance);
}
function startSafely(animation) {
    if (!currentFrame.includes(animation)) startUnsafely(animation);
}
function startUnsafely(animation) {
    currentFrame.splice(findIndex(currentFrame, (other)=>other.priority > animation.priority), 0, animation);
}
function advance(dt) {
    const nextFrame = prevFrame;
    for(let i = 0; i < currentFrame.length; i++){
        const animation = currentFrame[i];
        priority = animation.priority;
        if (!animation.idle) {
            willAdvance(animation);
            animation.advance(dt);
            if (!animation.idle) nextFrame.push(animation);
        }
    }
    priority = 0;
    prevFrame = currentFrame;
    prevFrame.length = 0;
    currentFrame = nextFrame;
    return currentFrame.length > 0;
}
/** Like `Array.prototype.findIndex` but returns `arr.length` instead of `-1` */ function findIndex(arr, test) {
    const index = arr.findIndex(test);
    return index < 0 ? arr.length : index;
}
//#endregion
//#region src/clamp.ts
const clamp = (min, max, v)=>Math.min(Math.max(v, min), max);
//#endregion
//#region src/colors.ts
const colors = {
    transparent: 0,
    aliceblue: 4042850303,
    antiquewhite: 4209760255,
    aqua: 16777215,
    aquamarine: 2147472639,
    azure: 4043309055,
    beige: 4126530815,
    bisque: 4293182719,
    black: 255,
    blanchedalmond: 4293643775,
    blue: 65535,
    blueviolet: 2318131967,
    brown: 2771004159,
    burlywood: 3736635391,
    burntsienna: 3934150143,
    cadetblue: 1604231423,
    chartreuse: 2147418367,
    chocolate: 3530104575,
    coral: 4286533887,
    cornflowerblue: 1687547391,
    cornsilk: 4294499583,
    crimson: 3692313855,
    cyan: 16777215,
    darkblue: 35839,
    darkcyan: 9145343,
    darkgoldenrod: 3095792639,
    darkgray: 2846468607,
    darkgreen: 6553855,
    darkgrey: 2846468607,
    darkkhaki: 3182914559,
    darkmagenta: 2332068863,
    darkolivegreen: 1433087999,
    darkorange: 4287365375,
    darkorchid: 2570243327,
    darkred: 2332033279,
    darksalmon: 3918953215,
    darkseagreen: 2411499519,
    darkslateblue: 1211993087,
    darkslategray: 793726975,
    darkslategrey: 793726975,
    darkturquoise: 13554175,
    darkviolet: 2483082239,
    deeppink: 4279538687,
    deepskyblue: 12582911,
    dimgray: 1768516095,
    dimgrey: 1768516095,
    dodgerblue: 512819199,
    firebrick: 2988581631,
    floralwhite: 4294635775,
    forestgreen: 579543807,
    fuchsia: 4278255615,
    gainsboro: 3705462015,
    ghostwhite: 4177068031,
    gold: 4292280575,
    goldenrod: 3668254975,
    gray: 2155905279,
    green: 8388863,
    greenyellow: 2919182335,
    grey: 2155905279,
    honeydew: 4043305215,
    hotpink: 4285117695,
    indianred: 3445382399,
    indigo: 1258324735,
    ivory: 4294963455,
    khaki: 4041641215,
    lavender: 3873897215,
    lavenderblush: 4293981695,
    lawngreen: 2096890111,
    lemonchiffon: 4294626815,
    lightblue: 2916673279,
    lightcoral: 4034953471,
    lightcyan: 3774873599,
    lightgoldenrodyellow: 4210742015,
    lightgray: 3553874943,
    lightgreen: 2431553791,
    lightgrey: 3553874943,
    lightpink: 4290167295,
    lightsalmon: 4288707327,
    lightseagreen: 548580095,
    lightskyblue: 2278488831,
    lightslategray: 2005441023,
    lightslategrey: 2005441023,
    lightsteelblue: 2965692159,
    lightyellow: 4294959359,
    lime: 16711935,
    limegreen: 852308735,
    linen: 4210091775,
    magenta: 4278255615,
    maroon: 2147483903,
    mediumaquamarine: 1724754687,
    mediumblue: 52735,
    mediumorchid: 3126187007,
    mediumpurple: 2473647103,
    mediumseagreen: 1018393087,
    mediumslateblue: 2070474495,
    mediumspringgreen: 16423679,
    mediumturquoise: 1221709055,
    mediumvioletred: 3340076543,
    midnightblue: 421097727,
    mintcream: 4127193855,
    mistyrose: 4293190143,
    moccasin: 4293178879,
    navajowhite: 4292783615,
    navy: 33023,
    oldlace: 4260751103,
    olive: 2155872511,
    olivedrab: 1804477439,
    orange: 4289003775,
    orangered: 4282712319,
    orchid: 3664828159,
    palegoldenrod: 4008225535,
    palegreen: 2566625535,
    paleturquoise: 2951671551,
    palevioletred: 3681588223,
    papayawhip: 4293907967,
    peachpuff: 4292524543,
    peru: 3448061951,
    pink: 4290825215,
    plum: 3718307327,
    powderblue: 2967529215,
    purple: 2147516671,
    rebeccapurple: 1714657791,
    red: 4278190335,
    rosybrown: 3163525119,
    royalblue: 1097458175,
    saddlebrown: 2336560127,
    salmon: 4202722047,
    sandybrown: 4104413439,
    seagreen: 780883967,
    seashell: 4294307583,
    sienna: 2689740287,
    silver: 3233857791,
    skyblue: 2278484991,
    slateblue: 1784335871,
    slategray: 1887473919,
    slategrey: 1887473919,
    snow: 4294638335,
    springgreen: 16744447,
    steelblue: 1182971135,
    tan: 3535047935,
    teal: 8421631,
    thistle: 3636451583,
    tomato: 4284696575,
    turquoise: 1088475391,
    violet: 4001558271,
    wheat: 4125012991,
    white: 4294967295,
    whitesmoke: 4126537215,
    yellow: 4294902015,
    yellowgreen: 2597139199
};
//#endregion
//#region src/colorMatchers.ts
const NUMBER = "[-+]?\\d*\\.?\\d+";
const PERCENTAGE = "[-+]?\\d*\\.?\\d+%";
function call(...parts) {
    return "\\(\\s*(" + parts.join(")\\s*,\\s*(") + ")\\s*\\)";
}
const rgb = new RegExp("rgb" + call(NUMBER, NUMBER, NUMBER));
const rgba = new RegExp("rgba" + call(NUMBER, NUMBER, NUMBER, NUMBER));
const hsl = new RegExp("hsl" + call(NUMBER, PERCENTAGE, PERCENTAGE));
const hsla = new RegExp("hsla" + call(NUMBER, PERCENTAGE, PERCENTAGE, NUMBER));
const hex3 = /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/;
const hex4 = /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/;
const hex6 = /^#([0-9a-fA-F]{6})$/;
const hex8 = /^#([0-9a-fA-F]{8})$/;
//#endregion
//#region src/normalizeColor.ts
function normalizeColor(color) {
    let match;
    if (typeof color === "number") return color >>> 0 === color && color >= 0 && color <= 4294967295 ? color : null;
    if (match = hex6.exec(color)) return parseInt(match[1] + "ff", 16) >>> 0;
    if (colors$1 && colors$1[color] !== void 0) return colors$1[color];
    if (match = rgb.exec(color)) return (parse255(match[1]) << 24 | parse255(match[2]) << 16 | parse255(match[3]) << 8 | 255) >>> 0;
    if (match = rgba.exec(color)) return (parse255(match[1]) << 24 | parse255(match[2]) << 16 | parse255(match[3]) << 8 | parse1(match[4])) >>> 0;
    if (match = hex3.exec(color)) return parseInt(match[1] + match[1] + match[2] + match[2] + match[3] + match[3] + "ff", 16) >>> 0;
    if (match = hex8.exec(color)) return parseInt(match[1], 16) >>> 0;
    if (match = hex4.exec(color)) return parseInt(match[1] + match[1] + match[2] + match[2] + match[3] + match[3] + match[4] + match[4], 16) >>> 0;
    if (match = hsl.exec(color)) return (hslToRgb(parse360(match[1]), parsePercentage(match[2]), parsePercentage(match[3])) | 255) >>> 0;
    if (match = hsla.exec(color)) return (hslToRgb(parse360(match[1]), parsePercentage(match[2]), parsePercentage(match[3])) | parse1(match[4])) >>> 0;
    return null;
}
function hue2rgb(p, q, t) {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
}
function hslToRgb(h, s, l) {
    const q = l < .5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    const r = hue2rgb(p, q, h + 1 / 3);
    const g = hue2rgb(p, q, h);
    const b = hue2rgb(p, q, h - 1 / 3);
    return Math.round(r * 255) << 24 | Math.round(g * 255) << 16 | Math.round(b * 255) << 8;
}
function parse255(str) {
    const int = parseInt(str, 10);
    if (int < 0) return 0;
    if (int > 255) return 255;
    return int;
}
function parse360(str) {
    return (parseFloat(str) % 360 + 360) % 360 / 360;
}
function parse1(str) {
    const num = parseFloat(str);
    if (num < 0) return 0;
    if (num > 1) return 255;
    return Math.round(num * 255);
}
function parsePercentage(str) {
    const int = parseFloat(str);
    if (int < 0) return 0;
    if (int > 100) return 1;
    return int / 100;
}
//#endregion
//#region src/colorToRgba.ts
function colorToRgba(input) {
    let int32Color = normalizeColor(input);
    if (int32Color === null) return input;
    int32Color = int32Color || 0;
    return `rgba(${(int32Color & 4278190080) >>> 24}, ${(int32Color & 16711680) >>> 16}, ${(int32Color & 65280) >>> 8}, ${(int32Color & 255) / 255})`;
}
//#endregion
//#region src/createInterpolator.ts
const createInterpolator = (range, output, extrapolate)=>{
    if (is.fun(range)) return range;
    if (is.arr(range)) return createInterpolator({
        range,
        output,
        extrapolate
    });
    if (is.str(range.output[0])) return createStringInterpolator$1(range);
    const config = range;
    const outputRange = config.output;
    const inputRange = config.range || [
        0,
        1
    ];
    const extrapolateLeft = config.extrapolateLeft || config.extrapolate || "extend";
    const extrapolateRight = config.extrapolateRight || config.extrapolate || "extend";
    const easing = config.easing || ((t)=>t);
    return (input)=>{
        const range = findRange(input, inputRange);
        return interpolate(input, inputRange[range], inputRange[range + 1], outputRange[range], outputRange[range + 1], easing, extrapolateLeft, extrapolateRight, config.map);
    };
};
function interpolate(input, inputMin, inputMax, outputMin, outputMax, easing, extrapolateLeft, extrapolateRight, map) {
    let result = map ? map(input) : input;
    if (result < inputMin) {
        if (extrapolateLeft === "identity") return result;
        else if (extrapolateLeft === "clamp") result = inputMin;
    }
    if (result > inputMax) {
        if (extrapolateRight === "identity") return result;
        else if (extrapolateRight === "clamp") result = inputMax;
    }
    if (outputMin === outputMax) return outputMin;
    if (inputMin === inputMax) return input <= inputMin ? outputMin : outputMax;
    if (inputMin === -Infinity) result = -result;
    else if (inputMax === Infinity) result = result - inputMin;
    else result = (result - inputMin) / (inputMax - inputMin);
    result = easing(result);
    if (outputMin === -Infinity) result = -result;
    else if (outputMax === Infinity) result = result + outputMin;
    else result = result * (outputMax - outputMin) + outputMin;
    return result;
}
function findRange(input, inputRange) {
    for(var i = 1; i < inputRange.length - 1; ++i)if (inputRange[i] >= input) break;
    return i - 1;
}
//#endregion
//#region src/easings.ts
const steps = (steps, direction = "end")=>(progress)=>{
        progress = direction === "end" ? Math.min(progress, .999) : Math.max(progress, .001);
        const expanded = progress * steps;
        return clamp(0, 1, (direction === "end" ? Math.floor(expanded) : Math.ceil(expanded)) / steps);
    };
const c1 = 1.70158;
const c2 = c1 * 1.525;
const c3 = 2.70158;
const c4 = 2 * Math.PI / 3;
const c5 = 2 * Math.PI / 4.5;
const bounceOut = (x)=>{
    const n1 = 7.5625;
    const d1 = 2.75;
    if (x < 1 / d1) return n1 * x * x;
    else if (x < 2 / d1) return n1 * (x -= 1.5 / d1) * x + .75;
    else if (x < 2.5 / d1) return n1 * (x -= 2.25 / d1) * x + .9375;
    else return n1 * (x -= 2.625 / d1) * x + .984375;
};
const easings = {
    linear: (x)=>x,
    easeInQuad: (x)=>x * x,
    easeOutQuad: (x)=>1 - (1 - x) * (1 - x),
    easeInOutQuad: (x)=>x < .5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2,
    easeInCubic: (x)=>x * x * x,
    easeOutCubic: (x)=>1 - Math.pow(1 - x, 3),
    easeInOutCubic: (x)=>x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2,
    easeInQuart: (x)=>x * x * x * x,
    easeOutQuart: (x)=>1 - Math.pow(1 - x, 4),
    easeInOutQuart: (x)=>x < .5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2,
    easeInQuint: (x)=>x * x * x * x * x,
    easeOutQuint: (x)=>1 - Math.pow(1 - x, 5),
    easeInOutQuint: (x)=>x < .5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2,
    easeInSine: (x)=>1 - Math.cos(x * Math.PI / 2),
    easeOutSine: (x)=>Math.sin(x * Math.PI / 2),
    easeInOutSine: (x)=>-(Math.cos(Math.PI * x) - 1) / 2,
    easeInExpo: (x)=>x === 0 ? 0 : Math.pow(2, 10 * x - 10),
    easeOutExpo: (x)=>x === 1 ? 1 : 1 - Math.pow(2, -10 * x),
    easeInOutExpo: (x)=>x === 0 ? 0 : x === 1 ? 1 : x < .5 ? Math.pow(2, 20 * x - 10) / 2 : (2 - Math.pow(2, -20 * x + 10)) / 2,
    easeInCirc: (x)=>1 - Math.sqrt(1 - Math.pow(x, 2)),
    easeOutCirc: (x)=>Math.sqrt(1 - Math.pow(x - 1, 2)),
    easeInOutCirc: (x)=>x < .5 ? (1 - Math.sqrt(1 - Math.pow(2 * x, 2))) / 2 : (Math.sqrt(1 - Math.pow(-2 * x + 2, 2)) + 1) / 2,
    easeInBack: (x)=>c3 * x * x * x - c1 * x * x,
    easeOutBack: (x)=>1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2),
    easeInOutBack: (x)=>x < .5 ? Math.pow(2 * x, 2) * (3.5949095 * 2 * x - c2) / 2 : (Math.pow(2 * x - 2, 2) * (3.5949095 * (x * 2 - 2) + c2) + 2) / 2,
    easeInElastic: (x)=>x === 0 ? 0 : x === 1 ? 1 : -Math.pow(2, 10 * x - 10) * Math.sin((x * 10 - 10.75) * c4),
    easeOutElastic: (x)=>x === 0 ? 0 : x === 1 ? 1 : Math.pow(2, -10 * x) * Math.sin((x * 10 - .75) * c4) + 1,
    easeInOutElastic: (x)=>x === 0 ? 0 : x === 1 ? 1 : x < .5 ? -(Math.pow(2, 20 * x - 10) * Math.sin((20 * x - 11.125) * c5)) / 2 : Math.pow(2, -20 * x + 10) * Math.sin((20 * x - 11.125) * c5) / 2 + 1,
    easeInBounce: (x)=>1 - bounceOut(1 - x),
    easeOutBounce: bounceOut,
    easeInOutBounce: (x)=>x < .5 ? (1 - bounceOut(1 - 2 * x)) / 2 : (1 + bounceOut(2 * x - 1)) / 2,
    steps
};
//#endregion
//#region src/fluids.ts
/**
* MIT License
* Copyright (c) Alec Larson
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/ const $get = Symbol.for("FluidValue.get");
const $observers = Symbol.for("FluidValue.observers");
/** Returns true if `arg` can be observed. */ const hasFluidValue = (arg)=>Boolean(arg && arg[$get]);
/**
* Get the current value.
* If `arg` is not observable, `arg` is returned.
*/ const getFluidValue = (arg)=>arg && arg[$get] ? arg[$get]() : arg;
/** Get the current observer set. Never mutate it directly! */ const getFluidObservers = (target)=>target[$observers] || null;
function callFluidObserver(observer, event) {
    if (observer.eventObserved) observer.eventObserved(event);
    else observer(event);
}
function callFluidObservers(target, event) {
    const observers = target[$observers];
    if (observers) observers.forEach((observer)=>{
        callFluidObserver(observer, event);
    });
}
/**
* Extend this class for automatic TypeScript support when passing this
* value to `fluids`-compatible libraries.
*/ var FluidValue = class {
    constructor(get){
        if (!get && !(get = this.get)) throw Error("Unknown getter");
        setFluidGetter(this, get);
    }
};
/** Define the getter called by `getFluidValue`. */ const setFluidGetter = (target, get)=>setHidden(target, $get, get);
function addFluidObserver(target, observer) {
    if (target[$get]) {
        let observers = target[$observers];
        if (!observers) setHidden(target, $observers, observers = /* @__PURE__ */ new Set());
        if (!observers.has(observer)) {
            observers.add(observer);
            if (target.observerAdded) target.observerAdded(observers.size, observer);
        }
    }
    return observer;
}
function removeFluidObserver(target, observer) {
    const observers = target[$observers];
    if (observers && observers.has(observer)) {
        const count = observers.size - 1;
        if (count) observers.delete(observer);
        else target[$observers] = null;
        if (target.observerRemoved) target.observerRemoved(count, observer);
    }
}
const setHidden = (target, key, value)=>Object.defineProperty(target, key, {
        value,
        writable: true,
        configurable: true
    });
//#endregion
//#region src/regexs.ts
const numberRegex = /[+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
const colorRegex = /(#(?:[0-9a-f]{2}){2,4}|(#[0-9a-f]{3})|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d\.]+%?\))/gi;
const unitRegex = new RegExp(`(${numberRegex.source})(%|[a-z]+)`, "i");
const rgbaRegex = /rgba\(([0-9\.-]+), ([0-9\.-]+), ([0-9\.-]+), ([0-9\.-]+)\)/gi;
/**
* Parse special CSS variable format into a CSS token and a fallback.
*
* ```
* `var(--foo, #fff)` => [`--foo`, '#fff']
* ```
*
*/ const cssVariableRegex = /var\((--[a-zA-Z0-9-_]+),? ?([a-zA-Z0-9 ()%#.,-]+)?\)/;
//#endregion
//#region src/variableToRgba.ts
/**
* takes a CSS variable and attempts
* to turn it into a RGBA value
*
* ```
* 'var(--white)' => 'rgba(255,255,255,1)'
* ```
*
* @param input string
* @returns string
*/ const variableToRgba = (input)=>{
    const [token, fallback] = parseCSSVariable(input);
    if (!token || isSSR()) return input;
    const value = window.getComputedStyle(document.documentElement).getPropertyValue(token);
    if (value) /**
	* We have a valid variable returned
	* trim and return
	*/ return value.trim();
    else if (fallback && fallback.startsWith("--")) {
        /**
		* fallback is something like --my-variable
		* so we try get property value
		*/ const value = window.getComputedStyle(document.documentElement).getPropertyValue(fallback);
        /**
		* if it exists, return else nothing was found so just return the input
		*/ if (value) return value;
        else return input;
    } else if (fallback && cssVariableRegex.test(fallback)) /**
	* We have a fallback and it's another CSS variable
	*/ return variableToRgba(fallback);
    else if (fallback) /**
	* We have a fallback and it's not a CSS variable
	*/ return fallback;
    /**
	* Nothing worked so just return the input
	* like our other FluidValue replace functions do
	*/ return input;
};
const parseCSSVariable = (current)=>{
    const match = cssVariableRegex.exec(current);
    if (!match) return [
        , 
    ];
    const [, token, fallback] = match;
    return [
        token,
        fallback
    ];
};
//#endregion
//#region src/stringInterpolation.ts
let namedColorRegex;
const rgbaRound = (_, p1, p2, p3, p4)=>`rgba(${Math.round(p1)}, ${Math.round(p2)}, ${Math.round(p3)}, ${p4})`;
/**
* Supports string shapes by extracting numbers so new values can be computed,
* and recombines those values into new strings of the same shape.  Supports
* things like:
*
*     "rgba(123, 42, 99, 0.36)"           // colors
*     "-45deg"                            // values with units
*     "0 2px 2px 0px rgba(0, 0, 0, 0.12)" // CSS box-shadows
*     "rotate(0deg) translate(2px, 3px)"  // CSS transforms
*/ const createStringInterpolator = (config)=>{
    if (!namedColorRegex) namedColorRegex = colors$1 ? new RegExp(`(${Object.keys(colors$1).join("|")})(?!\\w)`, "g") : /^\b$/;
    const output = config.output.map((value)=>{
        return getFluidValue(value).replace(cssVariableRegex, variableToRgba).replace(colorRegex, colorToRgba).replace(namedColorRegex, colorToRgba);
    });
    const keyframes = output.map((value)=>value.match(numberRegex).map(Number));
    const interpolators = keyframes[0].map((_, i)=>keyframes.map((values)=>{
            if (!(i in values)) throw Error("The arity of each \"output\" value must be equal");
            return values[i];
        })).map((output)=>createInterpolator({
            ...config,
            output
        }));
    const inputRange = config.range || [
        0,
        1
    ];
    const decimalCounts = output[0].match(numberRegex).map((_, pos)=>{
        const counts = output.map((value)=>{
            const token = value.match(numberRegex)[pos];
            const dot = token.indexOf(".");
            return dot === -1 ? 0 : token.length - dot - 1;
        });
        return counts.every((c)=>c === counts[0]) && counts[0] > 0 ? counts[0] : null;
    });
    return (input)=>{
        const keyIdx = inputRange.indexOf(input);
        if (keyIdx !== -1) return output[keyIdx];
        const missingUnit = !unitRegex.test(output[0]) && output.find((value)=>unitRegex.test(value))?.replace(numberRegex, "");
        let i = 0;
        return output[0].replace(numberRegex, ()=>{
            const pos = i++;
            const value = interpolators[pos](input);
            const decimals = decimalCounts[pos];
            return `${decimals != null ? value.toFixed(decimals) : value}${missingUnit || ""}`;
        }).replace(rgbaRegex, rgbaRound);
    };
};
//#endregion
//#region src/deprecations.ts
const prefix = "react-spring: ";
const once = (fn)=>{
    const func = fn;
    let called = false;
    if (typeof func != "function") throw new TypeError(`${prefix}once requires a function parameter`);
    return (...args)=>{
        if (!called) {
            func(...args);
            called = true;
        }
    };
};
const warnInterpolate = once(console.warn);
function deprecateInterpolate() {
    warnInterpolate(`${prefix}The "interpolate" function is deprecated in v9 (use "to" instead)`);
}
const warnDirectCall = once(console.warn);
function deprecateDirectCall() {
    warnDirectCall(`${prefix}Directly calling start instead of using the api object is deprecated in v9 (use ".start" instead), this will be removed in later 0.X.0 versions`);
}
//#endregion
//#region src/isAnimatedString.ts
function isAnimatedString(value) {
    return is.str(value) && (value[0] == "#" || /\d/.test(value) || !isSSR() && cssVariableRegex.test(value) || value in (colors$1 || {}));
}
//#endregion
//#region src/dom-events/resize/resizeElement.ts
let observer;
const resizeHandlers = /* @__PURE__ */ new WeakMap();
const getBorderBoxSize = (entry)=>{
    const boxSize = Array.isArray(entry.borderBoxSize) ? entry.borderBoxSize[0] : entry.borderBoxSize;
    if (!boxSize) return entry.contentRect;
    const writingMode = getComputedStyle(entry.target).writingMode;
    return writingMode.startsWith("vertical-") || writingMode.startsWith("sideways-") ? {
        width: boxSize.blockSize,
        height: boxSize.inlineSize
    } : {
        width: boxSize.inlineSize,
        height: boxSize.blockSize
    };
};
const handleObservation = (entries)=>entries.forEach((entry)=>{
        return resizeHandlers.get(entry.target)?.forEach((handler)=>handler(getBorderBoxSize(entry)));
    });
function resizeElement(handler, target) {
    /**
	* If there's a resize observer in the ENV then use that too.
	*/ if (!observer) {
        if (typeof ResizeObserver !== "undefined") observer = new ResizeObserver(handleObservation);
    }
    /**
	* Fetch the handlers for the target
	*/ let elementHandlers = resizeHandlers.get(target);
    /**
	* If there are no handlers create a new set for the target
	* and then add to the map
	*/ if (!elementHandlers) {
        elementHandlers = /* @__PURE__ */ new Set();
        resizeHandlers.set(target, elementHandlers);
    }
    /**
	* Add the handler to the target's set
	* and observe the target if possible.
	*/ elementHandlers.add(handler);
    if (observer) observer.observe(target, {
        box: "border-box"
    });
    /**
	* Cleanup the event handlers and potential observers.
	*/ return ()=>{
        const elementHandlers = resizeHandlers.get(target);
        if (!elementHandlers) return;
        elementHandlers.delete(handler);
        if (!elementHandlers.size && observer) observer.unobserve(target);
    };
}
//#endregion
//#region src/dom-events/resize/resizeWindow.ts
const listeners = /* @__PURE__ */ new Set();
let cleanupWindowResizeHandler;
const createResizeHandler = ()=>{
    const handleResize = ()=>{
        listeners.forEach((callback)=>callback({
                width: window.innerWidth,
                height: window.innerHeight
            }));
    };
    window.addEventListener("resize", handleResize);
    return ()=>{
        window.removeEventListener("resize", handleResize);
    };
};
const resizeWindow = (callback)=>{
    listeners.add(callback);
    if (!cleanupWindowResizeHandler) cleanupWindowResizeHandler = createResizeHandler();
    return ()=>{
        listeners.delete(callback);
        if (!listeners.size && cleanupWindowResizeHandler) {
            cleanupWindowResizeHandler();
            cleanupWindowResizeHandler = void 0;
        }
    };
};
//#endregion
//#region src/dom-events/resize/index.ts
const onResize = (callback, { container = document.documentElement } = {})=>{
    if (container === document.documentElement) return resizeWindow(callback);
    else return resizeElement(callback, container);
};
//#endregion
//#region src/progress.ts
const progress = (min, max, value)=>max - min === 0 ? 1 : (value - min) / (max - min);
//#endregion
//#region src/dom-events/scroll/ScrollHandler.ts
const SCROLL_KEYS = {
    x: {
        length: "Width",
        position: "Left"
    },
    y: {
        length: "Height",
        position: "Top"
    }
};
/**
* Why use a class? More extensible in the future.
*/ var ScrollHandler = class {
    constructor(callback, container){
        this.createAxis = ()=>({
                current: 0,
                progress: 0,
                scrollLength: 0
            });
        this.updateAxis = (axisName)=>{
            const axis = this.info[axisName];
            const { length, position } = SCROLL_KEYS[axisName];
            axis.current = this.container[`scroll${position}`];
            axis.scrollLength = this.container[`scroll${length}`] - this.container[`client${length}`];
            axis.progress = progress(0, axis.scrollLength, axis.current);
        };
        this.update = ()=>{
            this.updateAxis("x");
            this.updateAxis("y");
        };
        this.sendEvent = ()=>{
            this.callback(this.info);
        };
        this.advance = ()=>{
            this.update();
            this.sendEvent();
        };
        this.callback = callback;
        this.container = container;
        this.info = {
            time: 0,
            x: this.createAxis(),
            y: this.createAxis()
        };
    }
};
//#endregion
//#region src/dom-events/scroll/index.ts
const scrollListeners = /* @__PURE__ */ new WeakMap();
const resizeListeners = /* @__PURE__ */ new WeakMap();
const onScrollHandlers = /* @__PURE__ */ new WeakMap();
const getTarget = (container)=>container === document.documentElement ? window : container;
const onScroll = (callback, { container = document.documentElement } = {})=>{
    /**
	* get the current handlers for the target
	*/ let containerHandlers = onScrollHandlers.get(container);
    /**
	* If there aren't any handlers then create a new set.
	*/ if (!containerHandlers) {
        containerHandlers = /* @__PURE__ */ new Set();
        onScrollHandlers.set(container, containerHandlers);
    }
    /**
	* Create a new ScrollHandler class and add it to the set.
	*/ const containerHandler = new ScrollHandler(callback, container);
    containerHandlers.add(containerHandler);
    /**
	* If there are no scrollListeners then we need to make them
	*/ if (!scrollListeners.has(container)) {
        /**
		* Return true so RAFZ continues to run it
		*/ const listener = ()=>{
            containerHandlers?.forEach((handler)=>handler.advance());
            return true;
        };
        scrollListeners.set(container, listener);
        const target = getTarget(container);
        /**
		* Add resize handlers so we can correctly calculate the
		* scroll position on changes
		*/ window.addEventListener("resize", listener, {
            passive: true
        });
        if (container !== document.documentElement) resizeListeners.set(container, onResize(listener, {
            container
        }));
        /**
		* Add the actual scroll listener
		*/ target.addEventListener("scroll", listener, {
            passive: true
        });
    }
    /**
	* Start animation loop
	*/ const animateScroll = scrollListeners.get(container);
    (0, _react_spring_rafz.raf)(animateScroll);
    return ()=>{
        /**
		* Clear it on cleanup
		*/ _react_spring_rafz.raf.cancel(animateScroll);
        /**
		* Check if we even have any handlers for this container.
		*/ const containerHandlers = onScrollHandlers.get(container);
        if (!containerHandlers) return;
        containerHandlers.delete(containerHandler);
        if (containerHandlers.size) return;
        /**
		* If no more handlers, remove the scroll listener too.
		*/ const listener = scrollListeners.get(container);
        scrollListeners.delete(container);
        if (listener) {
            getTarget(container).removeEventListener("scroll", listener);
            window.removeEventListener("resize", listener);
            resizeListeners.get(container)?.();
        }
    };
};
//#endregion
//#region src/hooks/useConstant.ts
/**
* Creates a constant value over the lifecycle of a component.
*/ function useConstant(init) {
    const ref = (0, react.useRef)(null);
    if (ref.current === null) ref.current = init();
    return ref.current;
}
//#endregion
//#region src/hooks/useIsomorphicLayoutEffect.ts
/**
* Use this to read layout from the DOM and synchronously
* re-render if the isSSR returns true. Updates scheduled
* inside `useIsomorphicLayoutEffect` will be flushed
* synchronously in the browser, before the browser has
* a chance to paint.
*/ const useIsomorphicLayoutEffect = isSSR() ? react.useEffect : react.useLayoutEffect;
//#endregion
//#region src/hooks/useIsMounted.ts
const useIsMounted = ()=>{
    const isMounted = (0, react.useRef)(false);
    useIsomorphicLayoutEffect({
        "useIsMounted.useIsomorphicLayoutEffect": ()=>{
            isMounted.current = true;
            return ({
                "useIsMounted.useIsomorphicLayoutEffect": ()=>{
                    isMounted.current = false;
                }
            })["useIsMounted.useIsomorphicLayoutEffect"];
        }
    }["useIsMounted.useIsomorphicLayoutEffect"], []);
    return isMounted;
};
//#endregion
//#region src/hooks/useForceUpdate.ts
/** Return a function that re-renders this component, if still mounted */ function useForceUpdate() {
    const update = (0, react.useState)()[1];
    const isMounted = useIsMounted();
    return ()=>{
        if (isMounted.current) update(Math.random());
    };
}
//#endregion
//#region src/hooks/useMemoOne.ts
function useMemoOne(getResult, inputs) {
    const [initial] = (0, react.useState)(()=>({
            inputs,
            result: getResult()
        }));
    const committed = (0, react.useRef)(void 0);
    const prevCache = committed.current;
    let cache = prevCache;
    if (cache) {
        if (!Boolean(inputs && cache.inputs && areInputsEqual(inputs, cache.inputs))) cache = {
            inputs,
            result: getResult()
        };
    } else cache = initial;
    (0, react.useEffect)(()=>{
        committed.current = cache;
        if (prevCache == initial) initial.inputs = initial.result = void 0;
    }, [
        cache
    ]);
    return cache.result;
}
function areInputsEqual(next, prev) {
    if (next.length !== prev.length) return false;
    for(let i = 0; i < next.length; i++)if (next[i] !== prev[i]) return false;
    return true;
}
//#endregion
//#region src/hooks/useOnce.ts
const useOnce = (effect)=>(0, react.useEffect)(effect, emptyDeps);
const emptyDeps = [];
//#endregion
//#region src/hooks/usePrev.ts
/** Use a value from the previous render */ function usePrev(value) {
    const prevRef = (0, react.useRef)(void 0);
    (0, react.useEffect)(()=>{
        prevRef.current = value;
    });
    return prevRef.current;
}
//#endregion
//#region src/hooks/useReducedMotion.ts
/**
* Returns `boolean` or `null`, used to automatically
* set skipAnimations to the value of the user's
* `prefers-reduced-motion` query.
*
* The return value, post-effect, is the value of their prefered setting
*/ const useReducedMotion = ()=>{
    const [reducedMotion, setReducedMotion] = (0, react.useState)(null);
    useIsomorphicLayoutEffect({
        "useReducedMotion.useIsomorphicLayoutEffect": ()=>{
            const mql = window.matchMedia("(prefers-reduced-motion)");
            const handleMediaChange = {
                "useReducedMotion.useIsomorphicLayoutEffect.handleMediaChange": (e)=>{
                    setReducedMotion(e.matches);
                    assign({
                        skipAnimation: e.matches
                    });
                }
            }["useReducedMotion.useIsomorphicLayoutEffect.handleMediaChange"];
            handleMediaChange(mql);
            if (mql.addEventListener) mql.addEventListener("change", handleMediaChange);
            else mql.addListener(handleMediaChange);
            return ({
                "useReducedMotion.useIsomorphicLayoutEffect": ()=>{
                    if (mql.removeEventListener) mql.removeEventListener("change", handleMediaChange);
                    else mql.removeListener(handleMediaChange);
                }
            })["useReducedMotion.useIsomorphicLayoutEffect"];
        }
    }["useReducedMotion.useIsomorphicLayoutEffect"], []);
    return reducedMotion;
};
//#endregion
exports.FluidValue = FluidValue;
Object.defineProperty(exports, 'Globals', {
    enumerable: true,
    get: function() {
        return globals_exports;
    }
});
exports.addFluidObserver = addFluidObserver;
exports.callFluidObserver = callFluidObserver;
exports.callFluidObservers = callFluidObservers;
exports.clamp = clamp;
exports.colorToRgba = colorToRgba;
exports.colors = colors;
exports.createInterpolator = createInterpolator;
exports.createStringInterpolator = createStringInterpolator;
exports.defineHidden = defineHidden;
exports.deprecateDirectCall = deprecateDirectCall;
exports.deprecateInterpolate = deprecateInterpolate;
exports.each = each;
exports.eachProp = eachProp;
exports.easings = easings;
exports.flush = flush;
exports.flushCalls = flushCalls;
exports.frameLoop = frameLoop;
exports.getFluidObservers = getFluidObservers;
exports.getFluidValue = getFluidValue;
exports.hasFluidValue = hasFluidValue;
exports.hex3 = hex3;
exports.hex4 = hex4;
exports.hex6 = hex6;
exports.hex8 = hex8;
exports.hsl = hsl;
exports.hsla = hsla;
exports.is = is;
exports.isAnimatedString = isAnimatedString;
exports.isEqual = isEqual;
exports.isSSR = isSSR;
exports.noop = noop;
exports.onResize = onResize;
exports.onScroll = onScroll;
exports.once = once;
exports.prefix = prefix;
Object.defineProperty(exports, 'raf', {
    enumerable: true,
    get: function() {
        return _react_spring_rafz.raf;
    }
});
exports.removeFluidObserver = removeFluidObserver;
exports.rgb = rgb;
exports.rgba = rgba;
exports.setFluidGetter = setFluidGetter;
exports.toArray = toArray;
exports.useConstant = useConstant;
exports.useForceUpdate = useForceUpdate;
exports.useIsomorphicLayoutEffect = useIsomorphicLayoutEffect;
exports.useMemoOne = useMemoOne;
exports.useOnce = useOnce;
exports.usePrev = usePrev;
exports.useReducedMotion = useReducedMotion;
}),
"[project]/restaurant-menu-editor/node_modules/@react-spring/shared/dist/cjs/index.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/restaurant-menu-editor/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/restaurant-menu-editor/node_modules/@react-spring/shared/dist/cjs/react-spring_shared.development.cjs [client] (ecmascript)");
}
}),
"[project]/restaurant-menu-editor/node_modules/@react-spring/animated/dist/cjs/react-spring_animated.development.cjs [client] (ecmascript)", ((__turbopack_context__, module, exports) => {

Object.defineProperty(exports, Symbol.toStringTag, {
    value: 'Module'
});
//#region \0rolldown/runtime.js
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for(var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++){
            key = keys[i];
            if (!__hasOwnProp.call(to, key) && key !== except) {
                __defProp(to, key, {
                    get: ((k)=>from[k]).bind(null, key),
                    enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
                });
            }
        }
    }
    return to;
};
var __toESM = (mod, isNodeMode, target)=>(target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
        value: mod,
        enumerable: true
    }) : target, mod));
//#endregion
let _react_spring_shared = __turbopack_context__.r("[project]/restaurant-menu-editor/node_modules/@react-spring/shared/dist/cjs/index.js [client] (ecmascript)");
let react = __turbopack_context__.r("[project]/restaurant-menu-editor/node_modules/react/index.js [client] (ecmascript)");
react = __toESM(react);
//#region src/Animated.ts
const $node = Symbol.for("Animated:node");
const isAnimated = (value)=>!!value && value[$node] === value;
/** Get the owner's `Animated` node. */ const getAnimated = (owner)=>owner && owner[$node];
/** Set the owner's `Animated` node. */ const setAnimated = (owner, node)=>(0, _react_spring_shared.defineHidden)(owner, $node, node);
/** Get every `AnimatedValue` in the owner's `Animated` node. */ const getPayload = (owner)=>owner && owner[$node] && owner[$node].getPayload();
var Animated = class {
    constructor(){
        setAnimated(this, this);
    }
    /** Get every `AnimatedValue` used by this node. */ getPayload() {
        return this.payload || [];
    }
};
//#endregion
//#region src/AnimatedValue.ts
/** An animated number or a native attribute value */ var AnimatedValue = class AnimatedValue extends Animated {
    constructor(_value){
        super();
        this._value = _value;
        this.done = true;
        this.durationProgress = 0;
        if (_react_spring_shared.is.num(this._value)) this.lastPosition = this._value;
    }
    /** @internal */ static create(value) {
        return new AnimatedValue(value);
    }
    getPayload() {
        return [
            this
        ];
    }
    getValue() {
        return this._value;
    }
    setValue(value, step) {
        if (_react_spring_shared.is.num(value)) {
            this.lastPosition = value;
            if (step) {
                value = Math.round(value / step) * step;
                if (this.done) this.lastPosition = value;
            }
        }
        if (this._value === value) return false;
        this._value = value;
        return true;
    }
    reset() {
        const { done } = this;
        this.done = false;
        if (_react_spring_shared.is.num(this._value)) {
            this.elapsedTime = 0;
            this.durationProgress = 0;
            this.lastPosition = this._value;
            if (done) this.lastVelocity = null;
            this.v0 = null;
        }
    }
};
//#endregion
//#region src/AnimatedString.ts
var AnimatedString = class AnimatedString extends AnimatedValue {
    constructor(value){
        super(0);
        this._string = null;
        this._toString = (0, _react_spring_shared.createInterpolator)({
            output: [
                value,
                value
            ]
        });
    }
    /** @internal */ static create(value) {
        return new AnimatedString(value);
    }
    getValue() {
        const value = this._string;
        return value == null ? this._string = this._toString(this._value) : value;
    }
    setValue(value) {
        if (_react_spring_shared.is.str(value)) {
            if (value == this._string) return false;
            this._string = value;
            this._value = 1;
        } else if (super.setValue(value)) this._string = null;
        else return false;
        return true;
    }
    reset(goal) {
        if (goal) this._toString = (0, _react_spring_shared.createInterpolator)({
            output: [
                this.getValue(),
                goal
            ]
        });
        this._value = 0;
        super.reset();
    }
};
//#endregion
//#region src/context.ts
const TreeContext = {
    dependencies: null
};
//#endregion
//#region src/AnimatedObject.ts
/** An object containing `Animated` nodes */ var AnimatedObject = class extends Animated {
    constructor(source){
        super();
        this.source = source;
        this.setValue(source);
    }
    getValue(animated) {
        const values = {};
        (0, _react_spring_shared.eachProp)(this.source, (source, key)=>{
            if (isAnimated(source)) values[key] = source.getValue(animated);
            else if ((0, _react_spring_shared.hasFluidValue)(source)) values[key] = (0, _react_spring_shared.getFluidValue)(source);
            else if (!animated) values[key] = source;
        });
        return values;
    }
    /** Replace the raw object data */ setValue(source) {
        this.source = source;
        this.payload = this._makePayload(source);
    }
    reset() {
        if (this.payload) (0, _react_spring_shared.each)(this.payload, (node)=>node.reset());
    }
    /** Create a payload set. */ _makePayload(source) {
        if (source) {
            const payload = /* @__PURE__ */ new Set();
            (0, _react_spring_shared.eachProp)(source, this._addToPayload, payload);
            return Array.from(payload);
        }
    }
    /** Add to a payload set. */ _addToPayload(source) {
        if (TreeContext.dependencies && (0, _react_spring_shared.hasFluidValue)(source)) TreeContext.dependencies.add(source);
        const payload = getPayload(source);
        if (payload) (0, _react_spring_shared.each)(payload, (node)=>this.add(node));
    }
};
//#endregion
//#region src/AnimatedArray.ts
/** An array of animated nodes */ var AnimatedArray = class AnimatedArray extends AnimatedObject {
    constructor(source){
        super(source);
    }
    /** @internal */ static create(source) {
        return new AnimatedArray(source);
    }
    getValue() {
        return this.source.map((node)=>node.getValue());
    }
    setValue(source) {
        const payload = this.getPayload();
        if (source.length == payload.length) return payload.map((node, i)=>node.setValue(source[i])).some(Boolean);
        super.setValue(source.map(makeAnimated));
        return true;
    }
};
function makeAnimated(value) {
    return ((0, _react_spring_shared.isAnimatedString)(value) ? AnimatedString : AnimatedValue).create(value);
}
//#endregion
//#region src/getAnimatedType.ts
/** Return the `Animated` node constructor for a given value */ function getAnimatedType(value) {
    const parentNode = getAnimated(value);
    return parentNode ? parentNode.constructor : _react_spring_shared.is.arr(value) ? AnimatedArray : (0, _react_spring_shared.isAnimatedString)(value) ? AnimatedString : AnimatedValue;
}
//#endregion
//#region src/withAnimated.tsx
const withAnimated = (Component, host)=>{
    const hasInstance = !_react_spring_shared.is.fun(Component) || Component.prototype && Component.prototype.isReactComponent;
    return (0, react.forwardRef)((givenProps, givenRef)=>{
        const instanceRef = (0, react.useRef)(null);
        const ref = hasInstance && (0, react.useCallback)((value)=>{
            instanceRef.current = updateRef(givenRef, value);
        }, [
            givenRef
        ]);
        const [props, deps] = getAnimatedState(givenProps, host);
        const forceUpdate = (0, _react_spring_shared.useForceUpdate)();
        const callback = ()=>{
            const instance = instanceRef.current;
            if (hasInstance && !instance) return;
            if ((instance ? host.applyAnimatedValues(instance, props.getValue(true)) : false) === false) forceUpdate();
        };
        const observer = new PropsObserver(callback, deps);
        const observerRef = (0, react.useRef)(void 0);
        (0, _react_spring_shared.useIsomorphicLayoutEffect)(()=>{
            observerRef.current = observer;
            (0, _react_spring_shared.each)(deps, (dep)=>(0, _react_spring_shared.addFluidObserver)(dep, observer));
            return ()=>{
                if (observerRef.current) {
                    (0, _react_spring_shared.each)(observerRef.current.deps, (dep)=>(0, _react_spring_shared.removeFluidObserver)(dep, observerRef.current));
                    _react_spring_shared.raf.cancel(observerRef.current.update);
                }
            };
        });
        (0, react.useEffect)(callback, []);
        (0, _react_spring_shared.useOnce)(()=>()=>{
                const observer = observerRef.current;
                (0, _react_spring_shared.each)(observer.deps, (dep)=>(0, _react_spring_shared.removeFluidObserver)(dep, observer));
            });
        const usedProps = host.getComponentProps(props.getValue());
        return /* @__PURE__ */ react.createElement(Component, {
            ...usedProps,
            ref
        });
    });
};
var PropsObserver = class {
    constructor(update, deps){
        this.update = update;
        this.deps = deps;
    }
    eventObserved(event) {
        if (event.type == "change") _react_spring_shared.raf.write(this.update);
    }
};
function getAnimatedState(props, host) {
    const dependencies = /* @__PURE__ */ new Set();
    TreeContext.dependencies = dependencies;
    if (props.style) props = {
        ...props,
        style: host.createAnimatedStyle(props.style)
    };
    props = new AnimatedObject(props);
    TreeContext.dependencies = null;
    return [
        props,
        dependencies
    ];
}
function updateRef(ref, value) {
    if (ref) if (_react_spring_shared.is.fun(ref)) ref(value);
    else ref.current = value;
    return value;
}
//#endregion
//#region src/createHost.ts
const cacheKey = Symbol.for("AnimatedComponent");
const createHost = (components, { applyAnimatedValues = ()=>false, createAnimatedStyle = (style)=>new AnimatedObject(style), getComponentProps = (props)=>props } = {})=>{
    const hostConfig = {
        applyAnimatedValues,
        createAnimatedStyle,
        getComponentProps
    };
    const animated = (Component)=>{
        const displayName = getDisplayName(Component) || "Anonymous";
        if (_react_spring_shared.is.str(Component)) Component = animated[Component] || (animated[Component] = withAnimated(Component, hostConfig));
        else Component = Component[cacheKey] || (Component[cacheKey] = withAnimated(Component, hostConfig));
        Component.displayName = `Animated(${displayName})`;
        return Component;
    };
    (0, _react_spring_shared.eachProp)(components, (Component, key)=>{
        if (_react_spring_shared.is.arr(components)) key = getDisplayName(Component);
        animated[key] = animated(Component);
    });
    return {
        animated
    };
};
const getDisplayName = (arg)=>_react_spring_shared.is.str(arg) ? arg : arg && _react_spring_shared.is.str(arg.displayName) ? arg.displayName : _react_spring_shared.is.fun(arg) && arg.name || null;
//#endregion
exports.Animated = Animated;
exports.AnimatedArray = AnimatedArray;
exports.AnimatedObject = AnimatedObject;
exports.AnimatedString = AnimatedString;
exports.AnimatedValue = AnimatedValue;
exports.createHost = createHost;
exports.getAnimated = getAnimated;
exports.getAnimatedType = getAnimatedType;
exports.getPayload = getPayload;
exports.isAnimated = isAnimated;
exports.setAnimated = setAnimated;
}),
"[project]/restaurant-menu-editor/node_modules/@react-spring/animated/dist/cjs/index.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/restaurant-menu-editor/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/restaurant-menu-editor/node_modules/@react-spring/animated/dist/cjs/react-spring_animated.development.cjs [client] (ecmascript)");
}
}),
"[project]/restaurant-menu-editor/node_modules/@react-spring/core/dist/cjs/react-spring_core.development.cjs [client] (ecmascript)", ((__turbopack_context__, module, exports) => {

Object.defineProperty(exports, Symbol.toStringTag, {
    value: 'Module'
});
//#region \0rolldown/runtime.js
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc)=>{
    if (from && typeof from === "object" || typeof from === "function") {
        for(var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++){
            key = keys[i];
            if (!__hasOwnProp.call(to, key) && key !== except) {
                __defProp(to, key, {
                    get: ((k)=>from[k]).bind(null, key),
                    enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
                });
            }
        }
    }
    return to;
};
var __toESM = (mod, isNodeMode, target)=>(target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
        value: mod,
        enumerable: true
    }) : target, mod));
//#endregion
let _react_spring_shared = __turbopack_context__.r("[project]/restaurant-menu-editor/node_modules/@react-spring/shared/dist/cjs/index.js [client] (ecmascript)");
let react = __turbopack_context__.r("[project]/restaurant-menu-editor/node_modules/react/index.js [client] (ecmascript)");
react = __toESM(react);
let _react_spring_animated = __turbopack_context__.r("[project]/restaurant-menu-editor/node_modules/@react-spring/animated/dist/cjs/index.js [client] (ecmascript)");
//#region src/helpers.ts
function callProp(value, ...args) {
    return _react_spring_shared.is.fun(value) ? value(...args) : value;
}
/** Try to coerce the given value into a boolean using the given key */ const matchProp = (value, key)=>value === true || !!(key && value && (_react_spring_shared.is.fun(value) ? value(key) : (0, _react_spring_shared.toArray)(value).includes(key)));
const resolveProp = (prop, key)=>_react_spring_shared.is.obj(prop) ? key && prop[key] : prop;
/** Get the default value being set for the given `key` */ const getDefaultProp = (props, key)=>props.default === true ? props[key] : props.default ? props.default[key] : void 0;
const noopTransform = (value)=>value;
/**
* Extract the default props from an update.
*
* When the `default` prop is falsy, this function still behaves as if
* `default: true` was used. The `default` prop is always respected when
* truthy.
*/ const getDefaultProps = (props, transform = noopTransform)=>{
    let keys = DEFAULT_PROPS;
    if (props.default && props.default !== true) {
        props = props.default;
        keys = Object.keys(props);
    }
    const defaults = {};
    for (const key of keys){
        const value = transform(props[key], key);
        if (!_react_spring_shared.is.und(value)) defaults[key] = value;
    }
    return defaults;
};
/**
* These props are implicitly used as defaults when defined in a
* declarative update (eg: render-based) or any update with `default: true`.
*
* Use `default: {}` or `default: false` to opt-out of these implicit defaults
* for any given update.
*
* Note: These are not the only props with default values. For example, the
* `pause`, `cancel`, and `immediate` props. But those must be updated with
* the object syntax (eg: `default: { immediate: true }`).
*/ const DEFAULT_PROPS = [
    "config",
    "onProps",
    "onStart",
    "onChange",
    "onPause",
    "onResume",
    "onRest"
];
const RESERVED_PROPS = {
    config: 1,
    from: 1,
    to: 1,
    ref: 1,
    loop: 1,
    reset: 1,
    pause: 1,
    cancel: 1,
    reverse: 1,
    immediate: 1,
    default: 1,
    delay: 1,
    onProps: 1,
    onStart: 1,
    onChange: 1,
    onPause: 1,
    onResume: 1,
    onRest: 1,
    onResolve: 1,
    items: 1,
    trail: 1,
    sort: 1,
    expires: 1,
    initial: 1,
    enter: 1,
    update: 1,
    leave: 1,
    children: 1,
    onDestroyed: 1,
    keys: 1,
    callId: 1,
    parentId: 1
};
/**
* Extract any properties whose keys are *not* reserved for customizing your
* animations. All hooks use this function, which means `useTransition` props
* are reserved for `useSpring` calls, etc.
*/ function getForwardProps(props) {
    const forward = {};
    let count = 0;
    (0, _react_spring_shared.eachProp)(props, (value, prop)=>{
        if (!RESERVED_PROPS[prop]) {
            forward[prop] = value;
            count++;
        }
    });
    if (count) return forward;
}
/**
* Clone the given `props` and move all non-reserved props
* into the `to` prop.
*/ function inferTo(props) {
    const to = getForwardProps(props);
    if (to) {
        const out = {
            to
        };
        (0, _react_spring_shared.eachProp)(props, (val, key)=>key in to || (out[key] = val));
        return out;
    }
    return {
        ...props
    };
}
function computeGoal(value) {
    const resolved = (0, _react_spring_shared.getFluidValue)(value);
    if (_react_spring_shared.is.arr(resolved)) return resolved.map(computeGoal);
    if ((0, _react_spring_shared.isAnimatedString)(resolved)) return _react_spring_shared.Globals.createStringInterpolator({
        range: [
            0,
            1
        ],
        output: [
            resolved,
            resolved
        ]
    })(1);
    return resolved;
}
function hasProps(props) {
    for(const _ in props)return true;
    return false;
}
function isAsyncTo(to) {
    return _react_spring_shared.is.fun(to) || _react_spring_shared.is.arr(to) && _react_spring_shared.is.obj(to[0]);
}
/** Detach `ctrl` from `ctrl.ref` and (optionally) the given `ref` */ function detachRefs(ctrl, ref) {
    ctrl.ref?.delete(ctrl);
    ref?.delete(ctrl);
}
/** Replace `ctrl.ref` with the given `ref` (if defined) */ function replaceRef(ctrl, ref) {
    if (ref && ctrl.ref !== ref) {
        ctrl.ref?.delete(ctrl);
        ref.add(ctrl);
        ctrl.ref = ref;
    }
}
//#endregion
//#region src/hooks/useChain.ts
/**
* Used to orchestrate animation hooks in sequence with one another.
* This is best used when you specifically want to orchestrate different
* types of animation hook e.g. `useSpring` & `useTransition` in
* sequence as opposed to multiple `useSpring` hooks.
*
*
* ```jsx
* export const MyComponent = () => {
*  //...
*  useChain([springRef, transitionRef])
*  //...
* }
* ```
*
* @param refs – An array of `SpringRef`s.
* @param timeSteps – Optional array of numbers that define the
* delay between each animation from 0-1. The length should correlate
* to the length of `refs`.
* @param timeFrame – Optional number that defines the total duration
*
* @public
*/ function useChain(refs, timeSteps, timeFrame = 1e3) {
    (0, _react_spring_shared.useIsomorphicLayoutEffect)(()=>{
        if (timeSteps) {
            let prevDelay = 0;
            (0, _react_spring_shared.each)(refs, (ref, i)=>{
                const controllers = ref.current;
                if (controllers.length) {
                    let delay = timeFrame * timeSteps[i];
                    if (isNaN(delay)) delay = prevDelay;
                    else prevDelay = delay;
                    (0, _react_spring_shared.each)(controllers, (ctrl)=>{
                        (0, _react_spring_shared.each)(ctrl.queue, (props)=>{
                            const memoizedDelayProp = props.delay;
                            props.delay = (key)=>delay + callProp(memoizedDelayProp || 0, key);
                        });
                    });
                    ref.start();
                }
            });
        } else {
            let p = Promise.resolve();
            (0, _react_spring_shared.each)(refs, (ref)=>{
                const controllers = ref.current;
                if (controllers.length) {
                    const queues = controllers.map((ctrl)=>{
                        const q = ctrl.queue;
                        ctrl.queue = [];
                        return q;
                    });
                    p = p.then(()=>{
                        (0, _react_spring_shared.each)(controllers, (ctrl, i)=>(0, _react_spring_shared.each)(queues[i] || [], (update)=>ctrl.queue.push(update)));
                        return Promise.all(ref.start());
                    });
                }
            });
        }
    });
}
//#endregion
//#region src/constants.ts
const config = {
    default: {
        tension: 170,
        friction: 26
    },
    gentle: {
        tension: 120,
        friction: 14
    },
    wobbly: {
        tension: 180,
        friction: 12
    },
    stiff: {
        tension: 210,
        friction: 20
    },
    slow: {
        tension: 280,
        friction: 60
    },
    molasses: {
        tension: 280,
        friction: 120
    }
};
//#endregion
//#region src/AnimationConfig.ts
const defaults = {
    ...config.default,
    mass: 1,
    damping: 1,
    easing: _react_spring_shared.easings.linear,
    clamp: false
};
var AnimationConfig = class {
    constructor(){
        this.velocity = 0;
        Object.assign(this, defaults);
    }
};
function mergeConfig(config, newConfig, defaultConfig) {
    if (defaultConfig) {
        defaultConfig = {
            ...defaultConfig
        };
        sanitizeConfig(defaultConfig, newConfig);
        newConfig = {
            ...defaultConfig,
            ...newConfig
        };
    }
    sanitizeConfig(config, newConfig);
    Object.assign(config, newConfig);
    for(const key in defaults)if (config[key] == null) config[key] = defaults[key];
    let { frequency, damping } = config;
    const { mass } = config;
    if (!_react_spring_shared.is.und(frequency)) {
        if (frequency < .01) frequency = .01;
        if (damping < 0) damping = 0;
        config.tension = Math.pow(2 * Math.PI / frequency, 2) * mass;
        config.friction = 4 * Math.PI * damping * mass / frequency;
    }
    return config;
}
function sanitizeConfig(config, props) {
    if (!_react_spring_shared.is.und(props.decay)) config.duration = void 0;
    else {
        const isTensionConfig = !_react_spring_shared.is.und(props.tension) || !_react_spring_shared.is.und(props.friction);
        if (isTensionConfig || !_react_spring_shared.is.und(props.frequency) || !_react_spring_shared.is.und(props.damping) || !_react_spring_shared.is.und(props.mass)) {
            config.duration = void 0;
            config.decay = void 0;
        }
        if (isTensionConfig) config.frequency = void 0;
    }
}
//#endregion
//#region src/Animation.ts
const emptyArray = [];
/** An animation being executed by the frameloop */ var Animation = class {
    constructor(){
        this.changed = false;
        this.values = emptyArray;
        this.toValues = null;
        this.fromValues = emptyArray;
        this.config = new AnimationConfig();
        this.immediate = false;
    }
};
//#endregion
//#region src/scheduleProps.ts
/**
* This function sets a timeout if both the `delay` prop exists and
* the `cancel` prop is not `true`.
*
* The `actions.start` function must handle the `cancel` prop itself,
* but the `pause` prop is taken care of.
*/ function scheduleProps(callId, { key, props, defaultProps, state, actions }) {
    return new Promise((resolve, reject)=>{
        let delay;
        let timeout;
        let cancel = matchProp(props.cancel ?? defaultProps?.cancel, key);
        if (cancel) onStart();
        else {
            if (!_react_spring_shared.is.und(props.pause)) state.paused = matchProp(props.pause, key);
            let pause = defaultProps?.pause;
            if (pause !== true) pause = state.paused || matchProp(pause, key);
            delay = callProp(props.delay || 0, key);
            if (pause) {
                state.resumeQueue.add(onResume);
                actions.pause();
            } else {
                actions.resume();
                onResume();
            }
        }
        function onPause() {
            state.resumeQueue.add(onResume);
            state.timeouts.delete(timeout);
            timeout.cancel();
            delay = timeout.time - _react_spring_shared.raf.now();
        }
        function onResume() {
            if (delay > 0 && !_react_spring_shared.Globals.skipAnimation) {
                state.delayed = true;
                timeout = _react_spring_shared.raf.setTimeout(onStart, delay);
                state.pauseQueue.add(onPause);
                state.timeouts.add(timeout);
            } else onStart();
        }
        function onStart() {
            if (state.delayed) state.delayed = false;
            state.pauseQueue.delete(onPause);
            state.timeouts.delete(timeout);
            if (callId <= (state.cancelId || 0)) cancel = true;
            try {
                actions.start({
                    ...props,
                    callId,
                    cancel
                }, resolve);
            } catch (err) {
                reject(err);
            }
        }
    });
}
//#endregion
//#region src/AnimationResult.ts
/** @internal */ const getCombinedResult = (target, results)=>results.length == 1 ? results[0] : results.some((result)=>result.cancelled) ? getCancelledResult(target.get()) : results.every((result)=>result.noop) ? getNoopResult(target.get()) : getFinishedResult(target.get(), results.every((result)=>result.finished));
/** No-op results are for updates that never start an animation. */ const getNoopResult = (value)=>({
        value,
        noop: true,
        finished: true,
        cancelled: false
    });
const getFinishedResult = (value, finished, cancelled = false)=>({
        value,
        finished,
        cancelled
    });
const getCancelledResult = (value)=>({
        value,
        cancelled: true,
        finished: false
    });
//#endregion
//#region src/runAsync.ts
/**
* Start an async chain or an async script.
*
* Always call `runAsync` in the action callback of a `scheduleProps` call.
*
* The `T` parameter can be a set of animated values (as an object type)
* or a primitive type for a single animated value.
*/ function runAsync(to, props, state, target) {
    const { callId, parentId, onRest } = props;
    const { asyncTo: prevTo, promise: prevPromise } = state;
    if (!parentId && to === prevTo && !props.reset) return prevPromise;
    return state.promise = (async ()=>{
        state.asyncId = callId;
        state.asyncTo = to;
        const defaultProps = getDefaultProps(props, (value, key)=>key === "onRest" ? void 0 : value);
        let preventBail;
        let bail;
        const bailPromise = new Promise((resolve, reject)=>(preventBail = resolve, bail = reject));
        const bailIfEnded = (bailSignal)=>{
            const bailResult = callId <= (state.cancelId || 0) && getCancelledResult(target) || callId !== state.asyncId && getFinishedResult(target, false);
            if (bailResult) {
                bailSignal.result = bailResult;
                bail(bailSignal);
                throw bailSignal;
            }
        };
        let skipAnimationCallCount = 0;
        const SKIP_ANIMATION_CALL_LIMIT = 1024;
        const animate = (arg1, arg2)=>{
            const bailSignal = new BailSignal();
            const skipAnimationSignal = new SkipAnimationSignal();
            return (async ()=>{
                bailIfEnded(bailSignal);
                const props = _react_spring_shared.is.obj(arg1) ? {
                    ...arg1
                } : {
                    ...arg2,
                    to: arg1
                };
                props.parentId = callId;
                (0, _react_spring_shared.eachProp)(defaultProps, (value, key)=>{
                    if (_react_spring_shared.is.und(props[key])) props[key] = value;
                });
                if (_react_spring_shared.Globals.skipAnimation) {
                    if (++skipAnimationCallCount > SKIP_ANIMATION_CALL_LIMIT) {
                        stopAsync(state);
                        skipAnimationSignal.result = getFinishedResult(target, false);
                        bail(skipAnimationSignal);
                        throw skipAnimationSignal;
                    }
                    props.immediate = true;
                    return await target.start(props);
                }
                const result = await target.start(props);
                bailIfEnded(bailSignal);
                if (state.paused) await new Promise((resume)=>{
                    state.resumeQueue.add(resume);
                });
                return result;
            })();
        };
        let result;
        try {
            let animating;
            if (_react_spring_shared.is.arr(to)) animating = (async (queue)=>{
                for (const props of queue)await animate(props);
            })(to);
            else animating = Promise.resolve(to(animate, target.stop.bind(target)));
            await Promise.all([
                animating.then(preventBail),
                bailPromise
            ]);
            result = getFinishedResult(target.get(), true, false);
        } catch (err) {
            if (err instanceof BailSignal) result = err.result;
            else if (err instanceof SkipAnimationSignal) result = err.result;
            else throw err;
        } finally{
            if (callId == state.asyncId) {
                state.asyncId = parentId;
                state.asyncTo = parentId ? prevTo : void 0;
                state.promise = parentId ? prevPromise : void 0;
            }
        }
        if (_react_spring_shared.is.fun(onRest)) _react_spring_shared.raf.batchedUpdates(()=>{
            onRest(result, target, target.item);
        });
        return result;
    })();
}
/** Stop the current `runAsync` call with `finished: false` (or with `cancelled: true` when `cancelId` is defined) */ function stopAsync(state, cancelId) {
    (0, _react_spring_shared.flush)(state.timeouts, (t)=>t.cancel());
    state.pauseQueue.clear();
    state.resumeQueue.clear();
    state.asyncId = state.asyncTo = state.promise = void 0;
    if (cancelId) state.cancelId = cancelId;
}
/** This error is thrown to signal an interrupted async animation. */ var BailSignal = class extends Error {
    constructor(){
        super("An async animation has been interrupted. You see this error because you forgot to use `await` or `.catch(...)` on its returned promise.");
    }
};
var SkipAnimationSignal = class extends Error {
    constructor(){
        super("SkipAnimationSignal");
    }
};
//#endregion
//#region src/FrameValue.ts
const isFrameValue = (value)=>value instanceof FrameValue;
let nextId$1 = 1;
/**
* A kind of `FluidValue` that manages an `AnimatedValue` node.
*
* Its underlying value can be accessed and even observed.
*/ var FrameValue = class extends _react_spring_shared.FluidValue {
    constructor(..._args){
        super(..._args);
        this.id = nextId$1++;
        this._priority = 0;
    }
    get priority() {
        return this._priority;
    }
    set priority(priority) {
        if (this._priority != priority) {
            this._priority = priority;
            this._onPriorityChange(priority);
        }
    }
    /** Get the current value */ get() {
        const node = (0, _react_spring_animated.getAnimated)(this);
        return node && node.getValue();
    }
    /** Create a spring that maps our value to another value */ to(...args) {
        return _react_spring_shared.Globals.to(this, args);
    }
    /** @deprecated Use the `to` method instead. */ interpolate(...args) {
        (0, _react_spring_shared.deprecateInterpolate)();
        return _react_spring_shared.Globals.to(this, args);
    }
    toJSON() {
        return this.get();
    }
    observerAdded(count) {
        if (count == 1) this._attach();
    }
    observerRemoved(count) {
        if (count == 0) this._detach();
    }
    /** Called when the first child is added. */ _attach() {}
    /** Called when the last child is removed. */ _detach() {}
    /** Tell our children about our new value */ _onChange(value, idle = false) {
        (0, _react_spring_shared.callFluidObservers)(this, {
            type: "change",
            parent: this,
            value,
            idle
        });
    }
    /** Tell our children about our new priority */ _onPriorityChange(priority) {
        if (!this.idle) _react_spring_shared.frameLoop.sort(this);
        (0, _react_spring_shared.callFluidObservers)(this, {
            type: "priority",
            parent: this,
            priority
        });
    }
};
//#endregion
//#region src/SpringPhase.ts
/** The property symbol of the current animation phase. */ const $P = Symbol.for("SpringPhase");
const HAS_ANIMATED = 1;
const IS_ANIMATING = 2;
const IS_PAUSED = 4;
/** Returns true if the `target` has ever animated. */ const hasAnimated = (target)=>(target[$P] & HAS_ANIMATED) > 0;
/** Returns true if the `target` is animating (even if paused). */ const isAnimating = (target)=>(target[$P] & IS_ANIMATING) > 0;
/** Returns true if the `target` is paused (even if idle). */ const isPaused = (target)=>(target[$P] & IS_PAUSED) > 0;
/** Set the active bit of the `target` phase. */ const setActiveBit = (target, active)=>active ? target[$P] |= 3 : target[$P] &= -3;
const setPausedBit = (target, paused)=>paused ? target[$P] |= IS_PAUSED : target[$P] &= -5;
//#endregion
//#region src/SpringValue.ts
/**
* Only numbers, strings, and arrays of numbers/strings are supported.
* Non-animatable strings are also supported.
*/ var SpringValue = class extends FrameValue {
    constructor(arg1, arg2){
        super();
        this.animation = new Animation();
        this.defaultProps = {};
        this._state = {
            paused: false,
            delayed: false,
            pauseQueue: /* @__PURE__ */ new Set(),
            resumeQueue: /* @__PURE__ */ new Set(),
            timeouts: /* @__PURE__ */ new Set()
        };
        this._pendingCalls = /* @__PURE__ */ new Set();
        this._lastCallId = 0;
        this._lastToId = 0;
        this._memoizedDuration = 0;
        if (!_react_spring_shared.is.und(arg1) || !_react_spring_shared.is.und(arg2)) {
            const props = _react_spring_shared.is.obj(arg1) ? {
                ...arg1
            } : {
                ...arg2,
                from: arg1
            };
            if (_react_spring_shared.is.und(props.default)) props.default = true;
            this.start(props);
        }
    }
    /** Equals true when not advancing on each frame. */ get idle() {
        return !(isAnimating(this) || this._state.asyncTo) || isPaused(this);
    }
    get goal() {
        return (0, _react_spring_shared.getFluidValue)(this.animation.to);
    }
    get velocity() {
        const node = (0, _react_spring_animated.getAnimated)(this);
        return node instanceof _react_spring_animated.AnimatedValue ? node.lastVelocity || 0 : node.getPayload().map((node)=>node.lastVelocity || 0);
    }
    /**
	* When true, this value has been animated at least once.
	*/ get hasAnimated() {
        return hasAnimated(this);
    }
    /**
	* When true, this value has an unfinished animation,
	* which is either active or paused.
	*/ get isAnimating() {
        return isAnimating(this);
    }
    /**
	* When true, all current and future animations are paused.
	*/ get isPaused() {
        return isPaused(this);
    }
    /**
	*
	*
	*/ get isDelayed() {
        return this._state.delayed;
    }
    /** Advance the current animation by a number of milliseconds */ advance(dt) {
        let idle = true;
        let changed = false;
        const anim = this.animation;
        let { toValues } = anim;
        const { config } = anim;
        const payload = (0, _react_spring_animated.getPayload)(anim.to);
        if (!payload && (0, _react_spring_shared.hasFluidValue)(anim.to)) toValues = (0, _react_spring_shared.toArray)((0, _react_spring_shared.getFluidValue)(anim.to));
        anim.values.forEach((node, i)=>{
            if (node.done) return;
            const to = node.constructor == _react_spring_animated.AnimatedString ? 1 : payload ? payload[i].lastPosition : toValues[i];
            let finished = anim.immediate;
            let position = to;
            if (!finished) {
                position = node.lastPosition;
                if (config.tension <= 0) {
                    node.done = true;
                    return;
                }
                let elapsed = node.elapsedTime += dt;
                const from = anim.fromValues[i];
                const v0 = node.v0 != null ? node.v0 : node.v0 = _react_spring_shared.is.arr(config.velocity) ? config.velocity[i] : config.velocity;
                let velocity;
                /** The smallest distance from a value before being treated like said value. */ /**
				* TODO: make this value ~0.0001 by default in next breaking change
				* for more info see – https://github.com/pmndrs/react-spring/issues/1389
				*/ const precision = config.precision || (from == to ? .005 : Math.min(1, Math.abs(to - from) * .001));
                if (!_react_spring_shared.is.und(config.duration)) {
                    let p = 1;
                    if (config.duration > 0) {
                        /**
						* Here we check if the duration has changed in the config
						* and if so update the elapsed time to the percentage
						* of completition so there is no jank in the animation
						* https://github.com/pmndrs/react-spring/issues/1163
						*/ if (this._memoizedDuration !== config.duration) {
                            this._memoizedDuration = config.duration;
                            if (node.durationProgress > 0) {
                                node.elapsedTime = config.duration * node.durationProgress;
                                elapsed = node.elapsedTime += dt;
                            }
                        }
                        p = (config.progress || 0) + elapsed / this._memoizedDuration;
                        p = p > 1 ? 1 : p < 0 ? 0 : p;
                        node.durationProgress = p;
                    }
                    position = from + config.easing(p) * (to - from);
                    velocity = (position - node.lastPosition) / dt;
                    finished = p == 1;
                } else if (config.decay) {
                    const decay = config.decay === true ? .998 : config.decay;
                    const e = Math.exp(-(1 - decay) * elapsed);
                    position = from + v0 / (1 - decay) * (1 - e);
                    finished = Math.abs(node.lastPosition - position) <= precision;
                    velocity = v0 * e;
                } else {
                    velocity = node.lastVelocity == null ? v0 : node.lastVelocity;
                    /** The velocity at which movement is essentially none */ const restVelocity = config.restVelocity || precision / 10;
                    const bounceFactor = config.clamp ? 0 : config.bounce;
                    const canBounce = !_react_spring_shared.is.und(bounceFactor);
                    /** When `true`, the value is increasing over time */ const isGrowing = from == to ? node.v0 > 0 : from < to;
                    /** When `true`, the velocity is considered moving */ let isMoving;
                    /** When `true`, the velocity is being deflected or clamped */ let isBouncing = false;
                    const step = 1;
                    const numSteps = Math.ceil(dt / step);
                    for(let n = 0; n < numSteps; ++n){
                        isMoving = Math.abs(velocity) > restVelocity;
                        if (!isMoving) {
                            finished = Math.abs(to - position) <= precision;
                            if (finished) break;
                        }
                        if (canBounce) {
                            isBouncing = position == to || position > to == isGrowing;
                            if (isBouncing) {
                                velocity = -velocity * bounceFactor;
                                position = to;
                            }
                        }
                        const acceleration = (-config.tension * 1e-6 * (position - to) + -config.friction * .001 * velocity) / config.mass;
                        velocity = velocity + acceleration * step;
                        position = position + velocity * step;
                    }
                }
                node.lastVelocity = velocity;
                if (Number.isNaN(position)) {
                    console.warn(`Got NaN while animating:`, this);
                    finished = true;
                }
            }
            if (payload && !payload[i].done) finished = false;
            if (finished) node.done = true;
            else idle = false;
            if (node.setValue(position, config.round)) changed = true;
        });
        const node = (0, _react_spring_animated.getAnimated)(this);
        /**
		* Get the node's current value, this will be different
		* to anim.to when config.decay is true
		*/ const currVal = node.getValue();
        if (idle) {
            const finalVal = (0, _react_spring_shared.getFluidValue)(anim.to);
            /**
			* check if they're not equal, or if they're
			* change and if there's no config.decay set
			*/ if ((currVal !== finalVal || changed) && !config.decay) {
                node.setValue(finalVal);
                this._onChange(finalVal);
            } else if (changed && config.decay) /**
			* if it's changed but there is a config.decay,
			* just call _onChange with currrent value
			*/ this._onChange(currVal);
            this._stop();
        } else if (changed) /**
		* if the spring has changed, but is not idle,
		* just call the _onChange handler
		*/ this._onChange(currVal);
    }
    /** Set the current value, while stopping the current animation */ set(value) {
        _react_spring_shared.raf.batchedUpdates(()=>{
            this._stop();
            this._focus(value);
            this._set(value);
        });
        return this;
    }
    /**
	* Freeze the active animation in time, as well as any updates merged
	* before `resume` is called.
	*/ pause() {
        this._update({
            pause: true
        });
    }
    /** Resume the animation if paused. */ resume() {
        this._update({
            pause: false
        });
    }
    /** Skip to the end of the current animation. */ finish() {
        if (isAnimating(this)) {
            const { to, config } = this.animation;
            _react_spring_shared.raf.batchedUpdates(()=>{
                this._onStart();
                if (!config.decay) this._set(to, false);
                this._stop();
            });
        }
        return this;
    }
    /** Push props into the pending queue. */ update(props) {
        (this.queue || (this.queue = [])).push(props);
        return this;
    }
    start(to, arg2) {
        let queue;
        if (!_react_spring_shared.is.und(to)) queue = [
            _react_spring_shared.is.obj(to) ? to : {
                ...arg2,
                to
            }
        ];
        else {
            queue = this.queue || [];
            this.queue = [];
        }
        return Promise.all(queue.map((props)=>{
            return this._update(props);
        })).then((results)=>getCombinedResult(this, results));
    }
    /**
	* Stop the current animation, and cancel any delayed updates.
	*
	* Pass `true` to call `onRest` with `cancelled: true`.
	*/ stop(cancel) {
        const { to } = this.animation;
        if (!_react_spring_shared.is.und(to)) this._focus(this.get());
        stopAsync(this._state, cancel && this._lastCallId);
        _react_spring_shared.raf.batchedUpdates(()=>this._stop(to, cancel));
        return this;
    }
    /** Restart the animation. */ reset() {
        this._update({
            reset: true
        });
    }
    /** @internal */ eventObserved(event) {
        if (event.type == "change") this._start();
        else if (event.type == "priority") this.priority = event.priority + 1;
    }
    /**
	* Parse the `to` and `from` range from the given `props` object.
	*
	* This also ensures the initial value is available to animated components
	* during the render phase.
	*/ _prepareNode(props) {
        const key = this.key || "";
        let { to, from } = props;
        to = _react_spring_shared.is.obj(to) ? to[key] : to;
        if (to == null || isAsyncTo(to)) to = void 0;
        from = _react_spring_shared.is.obj(from) ? from[key] : from;
        if (from == null) from = void 0;
        const range = {
            to,
            from
        };
        if (!hasAnimated(this)) {
            if (props.reverse) [to, from] = [
                from,
                to
            ];
            from = (0, _react_spring_shared.getFluidValue)(from);
            if (!_react_spring_shared.is.und(from)) this._set(from);
            else if (!(0, _react_spring_animated.getAnimated)(this)) this._set(to);
        }
        return range;
    }
    /** Every update is processed by this method before merging. */ _update({ ...props }, isLoop) {
        const { key, defaultProps } = this;
        if (props.default) Object.assign(defaultProps, getDefaultProps(props, (value, prop)=>/^on/.test(prop) ? resolveProp(value, key) : value));
        mergeActiveFn(this, props, "onProps");
        sendEvent(this, "onProps", props, this);
        const range = this._prepareNode(props);
        if (Object.isFrozen(this)) throw Error("Cannot animate a `SpringValue` object that is frozen. Did you forget to pass your component to `animated(...)` before animating its props?");
        const state = this._state;
        return scheduleProps(++this._lastCallId, {
            key,
            props,
            defaultProps,
            state,
            actions: {
                pause: ()=>{
                    if (!isPaused(this)) {
                        setPausedBit(this, true);
                        (0, _react_spring_shared.flushCalls)(state.pauseQueue);
                        sendEvent(this, "onPause", getFinishedResult(this, checkFinished(this, this.animation.to)), this);
                    }
                },
                resume: ()=>{
                    if (isPaused(this)) {
                        setPausedBit(this, false);
                        if (isAnimating(this)) this._resume();
                        (0, _react_spring_shared.flushCalls)(state.resumeQueue);
                        sendEvent(this, "onResume", getFinishedResult(this, checkFinished(this, this.animation.to)), this);
                    }
                },
                start: this._merge.bind(this, range)
            }
        }).then((result)=>{
            if (props.loop && result.finished && !(isLoop && result.noop)) {
                const nextProps = createLoopUpdate(props);
                if (nextProps) return this._update(nextProps, true);
            }
            return result;
        });
    }
    /** Merge props into the current animation */ _merge(range, props, resolve) {
        if (props.cancel) {
            this.stop(true);
            return resolve(getCancelledResult(this));
        }
        /** The "to" prop is defined. */ const hasToProp = !_react_spring_shared.is.und(range.to);
        /** The "from" prop is defined. */ const hasFromProp = !_react_spring_shared.is.und(range.from);
        if (hasToProp || hasFromProp) if (props.callId > this._lastToId) this._lastToId = props.callId;
        else return resolve(getCancelledResult(this));
        const { key, defaultProps, animation: anim } = this;
        const { to: prevTo, from: prevFrom } = anim;
        let { to = prevTo, from = prevFrom } = range;
        if (hasFromProp && !hasToProp && (!props.default || _react_spring_shared.is.und(to))) to = from;
        if (props.reverse) [to, from] = [
            from,
            to
        ];
        /** The "from" value is changing. */ const hasFromChanged = !(0, _react_spring_shared.isEqual)(from, prevFrom);
        if (hasFromChanged) anim.from = from;
        from = (0, _react_spring_shared.getFluidValue)(from);
        /** The "to" value is changing. */ const hasToChanged = !(0, _react_spring_shared.isEqual)(to, prevTo);
        if (hasToChanged) this._focus(to);
        /** The "to" prop is async. */ const hasAsyncTo = isAsyncTo(props.to);
        const { config } = anim;
        const { decay, velocity } = config;
        if ((hasToProp || hasFromProp) && !config.decay) config.velocity = 0;
        if (props.config && !hasAsyncTo) mergeConfig(config, callProp(props.config, key), props.config !== defaultProps.config ? callProp(defaultProps.config, key) : void 0);
        let node = (0, _react_spring_animated.getAnimated)(this);
        if (!node || _react_spring_shared.is.und(to)) return resolve(getFinishedResult(this, true));
        /** When true, start at the "from" value. */ const reset = _react_spring_shared.is.und(props.reset) ? hasFromProp && !props.default : !_react_spring_shared.is.und(from) && matchProp(props.reset, key);
        const value = reset ? from : this.get();
        const goal = computeGoal(to);
        const isAnimatable = _react_spring_shared.is.num(goal) || _react_spring_shared.is.arr(goal) || (0, _react_spring_shared.isAnimatedString)(goal);
        const immediate = !hasAsyncTo && (!isAnimatable || matchProp(defaultProps.immediate || props.immediate, key));
        if (hasToChanged) {
            const nodeType = (0, _react_spring_animated.getAnimatedType)(to);
            if (nodeType !== node.constructor) if (immediate) node = this._set(goal);
            else throw Error(`Cannot animate between ${node.constructor.name} and ${nodeType.name}, as the "to" prop suggests`);
        }
        const goalType = node.constructor;
        let started = (0, _react_spring_shared.hasFluidValue)(to);
        let finished = false;
        if (!started) {
            const hasValueChanged = reset || !hasAnimated(this) && hasFromChanged;
            if (hasToChanged || hasValueChanged) {
                finished = (0, _react_spring_shared.isEqual)(computeGoal(value), goal);
                started = !finished;
            }
            if (!(0, _react_spring_shared.isEqual)(anim.immediate, immediate) && !immediate || !(0, _react_spring_shared.isEqual)(config.decay, decay) || !(0, _react_spring_shared.isEqual)(config.velocity, velocity)) started = true;
        }
        if (finished && isAnimating(this)) {
            if (anim.changed && !reset) started = true;
            else if (!started) this._stop(prevTo);
        }
        if (!hasAsyncTo) {
            if (started || (0, _react_spring_shared.hasFluidValue)(prevTo)) {
                anim.values = node.getPayload();
                anim.toValues = (0, _react_spring_shared.hasFluidValue)(to) ? null : goalType == _react_spring_animated.AnimatedString ? [
                    1
                ] : (0, _react_spring_shared.toArray)(goal);
            }
            if (anim.immediate != immediate) {
                anim.immediate = immediate;
                if (!immediate && !reset) this._set(prevTo);
            }
            if (started) {
                const { onRest } = anim;
                (0, _react_spring_shared.each)(ACTIVE_EVENTS, (type)=>mergeActiveFn(this, props, type));
                const result = getFinishedResult(this, checkFinished(this, prevTo));
                (0, _react_spring_shared.flushCalls)(this._pendingCalls, result);
                this._pendingCalls.add(resolve);
                if (anim.changed) _react_spring_shared.raf.batchedUpdates(()=>{
                    anim.changed = !reset;
                    onRest?.(result, this);
                    if (reset) callProp(defaultProps.onRest, result);
                    else anim.onStart?.(result, this);
                });
            }
        }
        if (reset) this._set(value);
        if (hasAsyncTo) resolve(runAsync(props.to, props, this._state, this));
        else if (started) this._start();
        else if (isAnimating(this) && !hasToChanged) this._pendingCalls.add(resolve);
        else resolve(getNoopResult(value));
    }
    /** Update the `animation.to` value, which might be a `FluidValue` */ _focus(value) {
        const anim = this.animation;
        if (value !== anim.to) {
            if ((0, _react_spring_shared.getFluidObservers)(this)) this._detach();
            anim.to = value;
            if ((0, _react_spring_shared.getFluidObservers)(this)) this._attach();
        }
    }
    _attach() {
        let priority = 0;
        const { to } = this.animation;
        if ((0, _react_spring_shared.hasFluidValue)(to)) {
            (0, _react_spring_shared.addFluidObserver)(to, this);
            if (isFrameValue(to)) priority = to.priority + 1;
        }
        this.priority = priority;
    }
    _detach() {
        const { to } = this.animation;
        if ((0, _react_spring_shared.hasFluidValue)(to)) (0, _react_spring_shared.removeFluidObserver)(to, this);
    }
    /**
	* Update the current value from outside the frameloop,
	* and return the `Animated` node.
	*/ _set(arg, idle = true) {
        const value = (0, _react_spring_shared.getFluidValue)(arg);
        if (!_react_spring_shared.is.und(value)) {
            const oldNode = (0, _react_spring_animated.getAnimated)(this);
            if (!oldNode || !(0, _react_spring_shared.isEqual)(value, oldNode.getValue())) {
                const nodeType = (0, _react_spring_animated.getAnimatedType)(value);
                if (!oldNode || oldNode.constructor != nodeType) (0, _react_spring_animated.setAnimated)(this, nodeType.create(value));
                else oldNode.setValue(value);
                if (oldNode) _react_spring_shared.raf.batchedUpdates(()=>{
                    this._onChange(value, idle);
                });
            }
        }
        return (0, _react_spring_animated.getAnimated)(this);
    }
    _onStart() {
        const anim = this.animation;
        if (!anim.changed) {
            anim.changed = true;
            sendEvent(this, "onStart", getFinishedResult(this, checkFinished(this, anim.to)), this);
        }
    }
    _onChange(value, idle) {
        if (!idle) {
            this._onStart();
            callProp(this.animation.onChange, value, this);
        }
        callProp(this.defaultProps.onChange, value, this);
        super._onChange(value, idle);
    }
    _start() {
        const anim = this.animation;
        (0, _react_spring_animated.getAnimated)(this).reset((0, _react_spring_shared.getFluidValue)(anim.to));
        if (!anim.immediate) anim.fromValues = anim.values.map((node)=>node.lastPosition);
        if (!isAnimating(this)) {
            setActiveBit(this, true);
            if (!isPaused(this)) this._resume();
        }
    }
    _resume() {
        if (_react_spring_shared.Globals.skipAnimation) this.finish();
        else _react_spring_shared.frameLoop.start(this);
    }
    /**
	* Exit the frameloop and notify `onRest` listeners.
	*
	* Always wrap `_stop` calls with `batchedUpdates`.
	*/ _stop(goal, cancel) {
        if (isAnimating(this)) {
            setActiveBit(this, false);
            const anim = this.animation;
            (0, _react_spring_shared.each)(anim.values, (node)=>{
                node.done = true;
            });
            if (anim.toValues) anim.onChange = anim.onPause = anim.onResume = void 0;
            (0, _react_spring_shared.callFluidObservers)(this, {
                type: "idle",
                parent: this
            });
            const result = cancel ? getCancelledResult(this.get()) : getFinishedResult(this.get(), checkFinished(this, goal ?? anim.to));
            (0, _react_spring_shared.flushCalls)(this._pendingCalls, result);
            anim.changed = false;
            sendEvent(this, "onRest", result, this);
        }
    }
};
/** Returns true when the current value and goal value are equal. */ function checkFinished(target, to) {
    const goal = computeGoal(to);
    return (0, _react_spring_shared.isEqual)(computeGoal(target.get()), goal);
}
function createLoopUpdate(props, loop = props.loop, to = props.to) {
    const loopRet = callProp(loop);
    if (loopRet) {
        const overrides = loopRet !== true && inferTo(loopRet);
        const reverse = (overrides || props).reverse;
        const reset = !overrides || overrides.reset;
        return createUpdate({
            ...props,
            loop,
            default: false,
            pause: void 0,
            to: !reverse || isAsyncTo(to) ? to : void 0,
            from: reset ? props.from : void 0,
            reset,
            ...overrides
        });
    }
}
/**
* Return a new object based on the given `props`.
*
* - All non-reserved props are moved into the `to` prop object.
* - The `keys` prop is set to an array of affected keys,
*   or `null` if all keys are affected.
*/ function createUpdate(props) {
    const { to, from } = props = inferTo(props);
    const keys = /* @__PURE__ */ new Set();
    if (_react_spring_shared.is.obj(to)) findDefined(to, keys);
    if (_react_spring_shared.is.obj(from)) findDefined(from, keys);
    props.keys = keys.size ? Array.from(keys) : null;
    return props;
}
/**
* A modified version of `createUpdate` meant for declarative APIs.
*/ function declareUpdate(props) {
    const update = createUpdate(props);
    if (_react_spring_shared.is.und(update.default)) update.default = getDefaultProps(update);
    return update;
}
/** Find keys with defined values */ function findDefined(values, keys) {
    (0, _react_spring_shared.eachProp)(values, (value, key)=>value != null && keys.add(key));
}
/** Event props with "active handler" support */ const ACTIVE_EVENTS = [
    "onStart",
    "onRest",
    "onChange",
    "onPause",
    "onResume"
];
function mergeActiveFn(target, props, type) {
    target.animation[type] = props[type] !== getDefaultProp(props, type) ? resolveProp(props[type], target.key) : void 0;
}
/** Call the active handler first, then the default handler. */ function sendEvent(target, type, ...args) {
    target.animation[type]?.(...args);
    target.defaultProps[type]?.(...args);
}
//#endregion
//#region src/Controller.ts
/** Events batched by the `Controller` class */ const BATCHED_EVENTS = [
    "onStart",
    "onChange",
    "onRest"
];
let nextId = 1;
var Controller = class {
    constructor(props, flush){
        this.id = nextId++;
        this.springs = {};
        this.queue = [];
        this._lastAsyncId = 0;
        this._lastLoopId = 0;
        this._active = /* @__PURE__ */ new Set();
        this._changed = /* @__PURE__ */ new Set();
        this._started = false;
        this._state = {
            paused: false,
            pauseQueue: /* @__PURE__ */ new Set(),
            resumeQueue: /* @__PURE__ */ new Set(),
            timeouts: /* @__PURE__ */ new Set()
        };
        this._events = {
            onStart: /* @__PURE__ */ new Map(),
            onChange: /* @__PURE__ */ new Map(),
            onRest: /* @__PURE__ */ new Map()
        };
        this._onFrame = this._onFrame.bind(this);
        if (flush) this._flush = flush;
        if (props) this.start({
            default: true,
            ...props
        });
    }
    /**
	* Equals `true` when no spring values are in the frameloop, and
	* no async animation is currently active.
	*/ get idle() {
        return !this._state.asyncTo && Object.values(this.springs).every((spring)=>{
            return spring.idle && !spring.isDelayed && !spring.isPaused;
        });
    }
    get item() {
        return this._item;
    }
    set item(item) {
        this._item = item;
    }
    /** Get the current values of our springs */ get() {
        const values = {};
        this.each((spring, key)=>values[key] = spring.get());
        return values;
    }
    /** Set the current values without animating. */ set(values) {
        for(const key in values){
            const value = values[key];
            if (!_react_spring_shared.is.und(value)) this.springs[key].set(value);
        }
    }
    /** Push an update onto the queue of each value. */ update(props) {
        if (props) this.queue.push(createUpdate(props));
        return this;
    }
    /**
	* Start the queued animations for every spring, and resolve the returned
	* promise once all queued animations have finished or been cancelled.
	*
	* When you pass a queue (instead of nothing), that queue is used instead of
	* the queued animations added with the `update` method, which are left alone.
	*/ start(props) {
        let { queue } = this;
        if (props) queue = (0, _react_spring_shared.toArray)(props).map(createUpdate);
        else this.queue = [];
        if (this._flush) return this._flush(this, queue);
        prepareKeys(this, queue);
        return flushUpdateQueue(this, queue);
    }
    /** @internal */ stop(arg, keys) {
        if (arg !== !!arg) keys = arg;
        if (keys) {
            const springs = this.springs;
            (0, _react_spring_shared.each)((0, _react_spring_shared.toArray)(keys), (key)=>springs[key].stop(!!arg));
        } else {
            stopAsync(this._state, this._lastAsyncId);
            this.each((spring)=>spring.stop(!!arg));
        }
        return this;
    }
    /** Freeze the active animation in time */ pause(keys) {
        if (_react_spring_shared.is.und(keys)) this.start({
            pause: true
        });
        else {
            const springs = this.springs;
            (0, _react_spring_shared.each)((0, _react_spring_shared.toArray)(keys), (key)=>springs[key].pause());
        }
        return this;
    }
    /** Resume the animation if paused. */ resume(keys) {
        if (_react_spring_shared.is.und(keys)) this.start({
            pause: false
        });
        else {
            const springs = this.springs;
            (0, _react_spring_shared.each)((0, _react_spring_shared.toArray)(keys), (key)=>springs[key].resume());
        }
        return this;
    }
    /** Call a function once per spring value */ each(iterator) {
        (0, _react_spring_shared.eachProp)(this.springs, iterator);
    }
    /**
	* Subscribe to loop iteration restarts on this controller. Returns an
	* unsubscribe function. Listeners fire synchronously inside `flushUpdate`
	* just before the next iteration is dispatched.
	* @internal
	*/ onLoopReset(fn) {
        const set = this._onLoopReset ?? (this._onLoopReset = /* @__PURE__ */ new Set());
        set.add(fn);
        return ()=>{
            set.delete(fn);
        };
    }
    /** @internal Called at the end of every animation frame */ _onFrame() {
        const { onStart, onChange, onRest } = this._events;
        const active = this._active.size > 0;
        const changed = this._changed.size > 0;
        if (active && !this._started || changed && !this._started) {
            this._started = true;
            (0, _react_spring_shared.flush)(onStart, ([onStart, result])=>{
                result.value = this.get();
                onStart(result, this, this._item);
            });
        }
        const idle = !active && this._started;
        const values = changed || idle && onRest.size ? this.get() : null;
        if (changed && onChange.size) (0, _react_spring_shared.flush)(onChange, ([onChange, result])=>{
            result.value = values;
            onChange(result, this, this._item);
        });
        if (idle) {
            this._started = false;
            (0, _react_spring_shared.flush)(onRest, ([onRest, result])=>{
                result.value = values;
                onRest(result, this, this._item);
            });
        }
    }
    /** @internal */ eventObserved(event) {
        if (event.type == "change") {
            this._changed.add(event.parent);
            if (!event.idle) this._active.add(event.parent);
        } else if (event.type == "idle") this._active.delete(event.parent);
        else return;
        _react_spring_shared.raf.onFrame(this._onFrame);
    }
};
/**
* Warning: Props might be mutated.
*/ function flushUpdateQueue(ctrl, queue) {
    return Promise.all(queue.map((props)=>flushUpdate(ctrl, props))).then((results)=>getCombinedResult(ctrl, results));
}
/**
* Warning: Props might be mutated.
*
* Process a single set of props using the given controller.
*
* The returned promise resolves to `true` once the update is
* applied and any animations it starts are finished without being
* stopped or cancelled.
*/ async function flushUpdate(ctrl, props, isLoop) {
    const { keys, to, from, loop, onRest, onResolve } = props;
    const defaults = _react_spring_shared.is.obj(props.default) && props.default;
    if (loop) props.loop = false;
    const propsAny = props;
    const loopId = !isLoop && !propsAny.parentId && "loop" in props ? ++ctrl["_lastLoopId"] : isLoop ? propsAny.loopId : ctrl["_lastLoopId"];
    if (to === false) props.to = null;
    if (from === false) props.from = null;
    const asyncTo = _react_spring_shared.is.arr(to) || _react_spring_shared.is.fun(to) ? to : void 0;
    if (asyncTo) {
        props.to = void 0;
        props.onRest = void 0;
        if (defaults) defaults.onRest = void 0;
    } else (0, _react_spring_shared.each)(BATCHED_EVENTS, (key)=>{
        const handler = props[key];
        if (_react_spring_shared.is.fun(handler)) {
            const queue = ctrl["_events"][key];
            props[key] = ({ finished, cancelled })=>{
                const result = queue.get(handler);
                if (result) {
                    if (!finished) result.finished = false;
                    if (cancelled) result.cancelled = true;
                } else queue.set(handler, {
                    value: null,
                    finished: finished || false,
                    cancelled: cancelled || false
                });
            };
            if (defaults) defaults[key] = props[key];
        }
    });
    const state = ctrl["_state"];
    if (props.pause === !state.paused) {
        state.paused = props.pause;
        (0, _react_spring_shared.flushCalls)(props.pause ? state.pauseQueue : state.resumeQueue);
    } else if (state.paused) props.pause = true;
    const promises = (keys || Object.keys(ctrl.springs)).map((key)=>ctrl.springs[key].start(props));
    const cancel = props.cancel === true || getDefaultProp(props, "cancel") === true;
    if (asyncTo || cancel && state.asyncId) promises.push(scheduleProps(++ctrl["_lastAsyncId"], {
        props,
        state,
        actions: {
            pause: _react_spring_shared.noop,
            resume: _react_spring_shared.noop,
            start (props, resolve) {
                if (cancel) {
                    stopAsync(state, ctrl["_lastAsyncId"]);
                    resolve(getCancelledResult(ctrl));
                } else {
                    props.onRest = onRest;
                    resolve(runAsync(asyncTo, props, state, ctrl));
                }
            }
        }
    }));
    if (state.paused) await new Promise((resume)=>{
        state.resumeQueue.add(resume);
    });
    const result = getCombinedResult(ctrl, await Promise.all(promises));
    if (loop && result.finished && !(isLoop && result.noop) && loopId === ctrl["_lastLoopId"]) {
        const nextProps = createLoopUpdate(props, loop, to);
        if (nextProps) {
            nextProps.loopId = loopId;
            ctrl["_onLoopReset"]?.forEach((fn)=>fn());
            prepareKeys(ctrl, [
                nextProps
            ]);
            return flushUpdate(ctrl, nextProps, true);
        }
    }
    if (onResolve) _react_spring_shared.raf.batchedUpdates(()=>onResolve(result, ctrl, ctrl.item));
    return result;
}
/**
* From an array of updates, get the map of `SpringValue` objects
* by their keys. Springs are created when any update wants to
* animate a new key.
*
* Springs created by `getSprings` are neither cached nor observed
* until they're given to `setSprings`.
*/ function getSprings(ctrl, props) {
    const springs = {
        ...ctrl.springs
    };
    if (props) (0, _react_spring_shared.each)((0, _react_spring_shared.toArray)(props), (props)=>{
        if (_react_spring_shared.is.und(props.keys)) props = createUpdate(props);
        if (!_react_spring_shared.is.obj(props.to)) props = {
            ...props,
            to: void 0
        };
        prepareSprings(springs, props, (key)=>{
            return createSpring(key);
        });
    });
    setSprings(ctrl, springs);
    return springs;
}
/**
* Tell a controller to manage the given `SpringValue` objects
* whose key is not already in use.
*/ function setSprings(ctrl, springs) {
    (0, _react_spring_shared.eachProp)(springs, (spring, key)=>{
        if (!ctrl.springs[key]) {
            ctrl.springs[key] = spring;
            (0, _react_spring_shared.addFluidObserver)(spring, ctrl);
        }
    });
}
function createSpring(key, observer) {
    const spring = new SpringValue();
    spring.key = key;
    if (observer) (0, _react_spring_shared.addFluidObserver)(spring, observer);
    return spring;
}
/**
* Ensure spring objects exist for each defined key.
*
* Using the `props`, the `Animated` node of each `SpringValue` may
* be created or updated.
*/ function prepareSprings(springs, props, create) {
    if (props.keys) (0, _react_spring_shared.each)(props.keys, (key)=>{
        (springs[key] || (springs[key] = create(key)))["_prepareNode"](props);
    });
}
/**
* Ensure spring objects exist for each defined key, and attach the
* `ctrl` to them for observation.
*
* The queue is expected to contain `createUpdate` results.
*/ function prepareKeys(ctrl, queue) {
    (0, _react_spring_shared.each)(queue, (props)=>{
        prepareSprings(ctrl.springs, props, (key)=>{
            return createSpring(key, ctrl);
        });
    });
}
//#endregion
//#region src/SpringContext.tsx
const SpringContext = react.createContext({
    pause: false,
    immediate: false
});
//#endregion
//#region src/SpringRef.ts
const SpringRef = ()=>{
    const current = [];
    const SpringRef = function(props) {
        (0, _react_spring_shared.deprecateDirectCall)();
        const results = [];
        (0, _react_spring_shared.each)(current, (ctrl, i)=>{
            if (_react_spring_shared.is.und(props)) results.push(ctrl.start());
            else {
                const update = _getProps(props, ctrl, i);
                if (update) results.push(ctrl.start(update));
            }
        });
        return results;
    };
    SpringRef.current = current;
    /** Add a controller to this ref */ SpringRef.add = function(ctrl) {
        if (!current.includes(ctrl)) current.push(ctrl);
    };
    /** Remove a controller from this ref */ SpringRef.delete = function(ctrl) {
        const i = current.indexOf(ctrl);
        if (~i) current.splice(i, 1);
    };
    /** Pause all animations. */ SpringRef.pause = function() {
        (0, _react_spring_shared.each)(current, (ctrl)=>ctrl.pause(...arguments));
        return this;
    };
    /** Resume all animations. */ SpringRef.resume = function() {
        (0, _react_spring_shared.each)(current, (ctrl)=>ctrl.resume(...arguments));
        return this;
    };
    /** Update the state of each controller without animating. */ SpringRef.set = function(values) {
        (0, _react_spring_shared.each)(current, (ctrl, i)=>{
            const update = _react_spring_shared.is.fun(values) ? values(i, ctrl) : values;
            if (update) ctrl.set(update);
        });
    };
    SpringRef.start = function(props) {
        const results = [];
        (0, _react_spring_shared.each)(current, (ctrl, i)=>{
            if (_react_spring_shared.is.und(props)) results.push(ctrl.start());
            else {
                const update = this._getProps(props, ctrl, i);
                if (update) results.push(ctrl.start(update));
            }
        });
        return results;
    };
    /** Stop all animations. */ SpringRef.stop = function() {
        (0, _react_spring_shared.each)(current, (ctrl)=>ctrl.stop(...arguments));
        return this;
    };
    SpringRef.update = function(props) {
        (0, _react_spring_shared.each)(current, (ctrl, i)=>ctrl.update(this._getProps(props, ctrl, i)));
        return this;
    };
    /** Overridden by `useTrail` to manipulate props */ const _getProps = function(arg, ctrl, index) {
        return _react_spring_shared.is.fun(arg) ? arg(index, ctrl) : arg;
    };
    SpringRef._getProps = _getProps;
    return SpringRef;
};
//#endregion
//#region src/hooks/useSprings.ts
/** @internal */ function useSprings(length, props, deps) {
    const propsFn = _react_spring_shared.is.fun(props) && props;
    if (propsFn && !deps) deps = [];
    const ref = (0, react.useMemo)(()=>propsFn || arguments.length == 3 ? SpringRef() : void 0, []);
    const layoutId = (0, react.useRef)(0);
    const forceUpdate = (0, _react_spring_shared.useForceUpdate)();
    const state = (0, react.useMemo)(()=>({
            ctrls: [],
            queue: [],
            flush (ctrl, updates) {
                const springs = getSprings(ctrl, updates);
                return layoutId.current > 0 && !state.queue.length && !Object.keys(springs).some((key)=>!ctrl.springs[key]) ? flushUpdateQueue(ctrl, updates) : new Promise((resolve)=>{
                    setSprings(ctrl, springs);
                    state.queue.push(()=>{
                        resolve(flushUpdateQueue(ctrl, updates));
                    });
                    forceUpdate();
                });
            }
        }), []);
    const ctrls = (0, react.useRef)([
        ...state.ctrls
    ]);
    const updates = (0, react.useRef)([]);
    const strictModeRestartSnapshot = (0, react.useRef)([]);
    strictModeRestartSnapshot.current = [];
    const prevLength = (0, _react_spring_shared.usePrev)(length) || 0;
    (0, react.useMemo)(()=>{
        (0, _react_spring_shared.each)(ctrls.current.slice(length, prevLength), (ctrl)=>{
            detachRefs(ctrl, ref);
            ctrl.stop(true);
        });
        ctrls.current.length = length;
        declareUpdates(prevLength, length);
    }, [
        length
    ]);
    (0, react.useMemo)(()=>{
        declareUpdates(0, Math.min(prevLength, length));
    }, deps);
    /** Fill the `updates` array with declarative updates for the given index range. */ function declareUpdates(startIndex, endIndex) {
        for(let i = startIndex; i < endIndex; i++){
            const ctrl = ctrls.current[i] || (ctrls.current[i] = new Controller(null, state.flush));
            const update = propsFn ? propsFn(i, ctrl) : props[i];
            if (update) updates.current[i] = declareUpdate(update);
        }
    }
    const springs = ctrls.current.map((ctrl, i)=>getSprings(ctrl, updates.current[i]));
    const context = (0, react.useContext)(SpringContext);
    const hasContext = context !== (0, _react_spring_shared.usePrev)(context) && hasProps(context);
    (0, _react_spring_shared.useIsomorphicLayoutEffect)(()=>{
        layoutId.current++;
        state.ctrls = ctrls.current;
        const { queue } = state;
        if (queue.length) {
            state.queue = [];
            (0, _react_spring_shared.each)(queue, (cb)=>cb());
        }
        const activeUpdates = updates.current.length > 0 ? updates.current : strictModeRestartSnapshot.current;
        (0, _react_spring_shared.each)(ctrls.current, (ctrl, i)=>{
            ref?.add(ctrl);
            if (hasContext) ctrl.start({
                default: context
            });
            const update = activeUpdates[i];
            if (update) {
                replaceRef(ctrl, update.ref);
                if (ctrl.ref) ctrl.queue.push({
                    ...update,
                    default: _react_spring_shared.is.obj(update.default) ? {
                        ...update.default
                    } : update.default
                });
                else ctrl.start(update);
            }
        });
        if (updates.current.length > 0) strictModeRestartSnapshot.current = updates.current;
        updates.current = [];
    });
    (0, _react_spring_shared.useOnce)(()=>()=>{
            (0, _react_spring_shared.each)(state.ctrls, (ctrl)=>ctrl.stop(true));
        });
    const values = springs.map((x)=>({
            ...x
        }));
    return ref ? [
        values,
        ref
    ] : values;
}
//#endregion
//#region src/hooks/useSpring.ts
/** @internal */ function useSpring(props, deps) {
    const isFn = _react_spring_shared.is.fun(props);
    const [[values], ref] = useSprings(1, isFn ? props : [
        props
    ], isFn ? deps || [] : deps);
    return isFn || arguments.length == 2 ? [
        values,
        ref
    ] : values;
}
//#endregion
//#region src/hooks/useSpringRef.ts
const initSpringRef = ()=>SpringRef();
const useSpringRef = ()=>(0, react.useState)(initSpringRef)[0];
//#endregion
//#region src/hooks/useSpringValue.ts
/**
* Creates a constant single `SpringValue` that can be interacted
* with imperatively. This is an advanced API and does not react
* to updates from the parent component e.g. passing a new initial value
*
*
* ```jsx
* export const MyComponent = () => {
*   const opacity = useSpringValue(1)
*
*   return <animated.div style={{ opacity }} />
* }
* ```
*
* @param initial – The initial value of the `SpringValue`.
* @param props – Typically the same props as `useSpring` e.g. `config`, `loop` etc.
*
* @public
*/ const useSpringValue = (initial, props)=>{
    const springValue = (0, _react_spring_shared.useConstant)(()=>new SpringValue(initial, props));
    (0, _react_spring_shared.useOnce)(()=>()=>{
            springValue.stop();
        });
    return springValue;
};
//#endregion
//#region src/hooks/useTrail.ts
function useTrail(length, propsArg, deps) {
    const propsFn = _react_spring_shared.is.fun(propsArg) && propsArg;
    if (propsFn && !deps) deps = [];
    let reverse;
    let passedRef = void 0;
    if (!propsFn) {
        reverse = propsArg.reverse;
        passedRef = propsArg.ref;
    } else reverse = true;
    const result = useSprings(length, {
        "useTrail.useSprings[result]": (i, ctrl)=>{
            const props = propsFn ? propsFn(i, ctrl) : propsArg;
            if (propsFn) {
                passedRef = props.ref;
                reverse = reverse && props.reverse;
            }
            return props;
        }
    }["useTrail.useSprings[result]"], deps || [
        {}
    ]);
    (0, _react_spring_shared.useIsomorphicLayoutEffect)(()=>{
        const ctrls = result[1].current;
        const head = ctrls[reverse ? ctrls.length - 1 : 0];
        const unsubscribers = [];
        /**
		* Run through the ref passed by the `useSprings` hook.
		*/ (0, _react_spring_shared.each)(ctrls, (ctrl, i)=>{
            const parent = ctrls[i + (reverse ? 1 : -1)];
            /**
			* If there's a passed ref then we replace the ctrl ref with it
			*/ replaceRef(ctrl, passedRef);
            /**
			* And if there's a ctrl ref then we update instead of start
			* which means nothing is fired until the start method
			* of said passedRef is called.
			*/ if (ctrl.ref) {
                if (parent) ctrl.update({
                    to: parent.springs
                });
            } else if (parent) ctrl.start({
                to: parent.springs
            });
            else ctrl.start();
            if (ctrl !== head) unsubscribers.push(head.onLoopReset(()=>{
                ctrl.start({
                    reset: true
                });
            }));
        });
        return ()=>{
            (0, _react_spring_shared.each)(unsubscribers, (unsubscribe)=>unsubscribe());
        };
    }, deps);
    if (propsFn || arguments.length == 3) {
        const ref = passedRef ?? result[1];
        ref["_getProps"] = (propsArg, ctrl, i)=>{
            const props = _react_spring_shared.is.fun(propsArg) ? propsArg(i, ctrl) : propsArg;
            if (props) {
                const parent = ref.current[i + (props.reverse ? 1 : -1)];
                if (parent) props.to = parent.springs;
                return props;
            }
        };
        return result;
    }
    return result[0];
}
//#endregion
//#region src/hooks/useTransition.tsx
function useTransition(data, props, deps) {
    const propsFn = _react_spring_shared.is.fun(props) && props;
    const { reset, sort, trail = 0, reverse = false, expires = true, exitBeforeEnter = false, onDestroyed, ref: propsRef, config: propsConfig } = propsFn ? propsFn() : props;
    const ref = (0, react.useMemo)(()=>propsFn || arguments.length == 3 ? SpringRef() : void 0, []);
    const items = (0, _react_spring_shared.toArray)(data);
    const transitions = [];
    const usedTransitions = (0, react.useRef)(null);
    const prevTransitions = reset ? null : usedTransitions.current;
    (0, _react_spring_shared.useIsomorphicLayoutEffect)(()=>{
        usedTransitions.current = transitions;
    });
    (0, _react_spring_shared.useOnce)(()=>{
        /**
		* If transitions exist on mount of the component
		* then reattach their refs on-mount, this was required
		* for react18 strict mode to work properly.
		*
		* See https://github.com/pmndrs/react-spring/issues/1890
		*/ (0, _react_spring_shared.each)(transitions, (t)=>{
            ref?.add(t.ctrl);
            t.ctrl.ref = ref;
        });
        return ()=>{
            (0, _react_spring_shared.each)(usedTransitions.current, (t)=>{
                if (t.expired) clearTimeout(t.expirationId);
                detachRefs(t.ctrl, ref);
                t.ctrl.stop(true);
            });
        };
    });
    const keys = getKeys(items, propsFn ? propsFn() : props, prevTransitions);
    const expired = reset && usedTransitions.current || [];
    (0, _react_spring_shared.useIsomorphicLayoutEffect)(()=>(0, _react_spring_shared.each)(expired, ({ ctrl, item, key })=>{
            detachRefs(ctrl, ref);
            callProp(onDestroyed, item, key);
        }));
    const reused = [];
    if (prevTransitions) (0, _react_spring_shared.each)(prevTransitions, (t, i)=>{
        if (t.expired) {
            clearTimeout(t.expirationId);
            expired.push(t);
        } else {
            i = reused[i] = keys.indexOf(t.key);
            if (~i) transitions[i] = t;
        }
    });
    (0, _react_spring_shared.each)(items, (item, i)=>{
        if (!transitions[i]) {
            transitions[i] = {
                key: keys[i],
                item,
                phase: "mount",
                ctrl: new Controller()
            };
            transitions[i].ctrl.item = item;
        }
    });
    if (reused.length) {
        let i = -1;
        const { leave } = propsFn ? propsFn() : props;
        (0, _react_spring_shared.each)(reused, (keyIndex, prevIndex)=>{
            const t = prevTransitions[prevIndex];
            if (~keyIndex) {
                i = transitions.indexOf(t);
                transitions[i] = {
                    ...t,
                    item: items[keyIndex]
                };
            } else if (leave) transitions.splice(++i, 0, t);
        });
    }
    if (_react_spring_shared.is.fun(sort)) transitions.sort((a, b)=>sort(a.item, b.item));
    let delay = -trail;
    const trailedPayloads = [];
    const forceUpdate = (0, _react_spring_shared.useForceUpdate)();
    const defaultProps = getDefaultProps(props);
    const changes = /* @__PURE__ */ new Map();
    const exitingTransitions = (0, react.useRef)(/* @__PURE__ */ new Map());
    const forceChange = (0, react.useRef)(false);
    (0, _react_spring_shared.each)(transitions, (t, i)=>{
        const key = t.key;
        const prevPhase = t.phase;
        const p = propsFn ? propsFn() : props;
        let to;
        let phase;
        const propsDelay = callProp(p.delay || 0, key);
        if (prevPhase == "mount") {
            to = p.enter;
            phase = "enter";
        } else {
            const isLeave = keys.indexOf(key) < 0;
            if (prevPhase != "leave") if (isLeave) {
                to = p.leave;
                phase = "leave";
            } else if (to = p.update) phase = "update";
            else return;
            else if (!isLeave) {
                to = p.enter;
                phase = "enter";
            } else return;
        }
        to = callProp(to, t.item, i);
        to = _react_spring_shared.is.obj(to) ? inferTo(to) : {
            to
        };
        /**
		* This would allow us to give different delays for phases.
		* If we were to do this, we'd have to suffle the prop
		* spreading below to set delay last.
		* But if we were going to do that, we should consider letting
		* the prop trail also be part of a phase.
		*/ if (!to.config) {
            const config = propsConfig || defaultProps.config;
            to.config = callProp(config, t.item, i, phase);
        }
        delay += trail;
        const payload = {
            ...defaultProps,
            delay: propsDelay + delay,
            ref: propsRef,
            immediate: p.immediate,
            reset: false,
            ...to
        };
        if (phase == "enter" && _react_spring_shared.is.und(payload.from)) {
            const p = propsFn ? propsFn() : props;
            payload.from = callProp(_react_spring_shared.is.und(p.initial) || prevTransitions ? p.from : p.initial, t.item, i);
        }
        const { onResolve } = payload;
        payload.onResolve = (result)=>{
            callProp(onResolve, result);
            const transitions = usedTransitions.current;
            const t = transitions.find((t)=>t.key === key);
            if (!t) return;
            if (result.cancelled && t.phase != "update") /**
			* @legacy Reset the phase of a cancelled enter/leave transition, so it can
			* retry the animation on the next render.
			*
			* Note: leaving this here made the transitioned item respawn.
			*/ return;
            if (t.ctrl.idle) {
                const idle = transitions.every((t)=>t.ctrl.idle);
                if (t.phase == "leave") {
                    exitingTransitions.current.delete(t);
                    const expiry = callProp(expires, t.item);
                    if (expiry !== false) {
                        const expiryMs = expiry === true ? 0 : expiry;
                        t.expired = true;
                        if (!idle && expiryMs > 0) {
                            if (expiryMs <= 2147483647) t.expirationId = setTimeout(forceUpdate, expiryMs);
                            return;
                        }
                    }
                }
                if (idle && transitions.some((t)=>t.expired)) {
                    if (exitBeforeEnter) /**
					* If we have exitBeforeEnter == true
					* we need to force the animation to start
					*/ forceChange.current = true;
                    forceUpdate();
                }
            }
        };
        const springs = getSprings(t.ctrl, payload);
        trailedPayloads.push({
            payload,
            propsDelay
        });
        /**
		* Make a separate map for the exiting changes and "regular" changes
		*/ if (phase === "leave" && exitBeforeEnter) exitingTransitions.current.set(t, {
            phase,
            springs,
            payload
        });
        else changes.set(t, {
            phase,
            springs,
            payload
        });
    });
    if (reverse && trail) {
        const total = trailedPayloads.length;
        (0, _react_spring_shared.each)(trailedPayloads, ({ payload, propsDelay }, i)=>{
            payload.delay = propsDelay + (total - 1 - i) * trail;
        });
    }
    const context = (0, react.useContext)(SpringContext);
    const hasContext = context !== (0, _react_spring_shared.usePrev)(context) && hasProps(context);
    (0, _react_spring_shared.useIsomorphicLayoutEffect)(()=>{
        if (hasContext) (0, _react_spring_shared.each)(transitions, (t)=>{
            t.ctrl.start({
                default: context
            });
        });
    }, [
        context
    ]);
    (0, _react_spring_shared.each)(changes, (_, t)=>{
        /**
		* If we have children to exit because exitBeforeEnter is
		* set to true, we remove the transitions so they go to back
		* to their initial state.
		*/ if (exitingTransitions.current.size) {
            const ind = transitions.findIndex((state)=>state.key === t.key);
            transitions.splice(ind, 1);
        }
    });
    (0, _react_spring_shared.useIsomorphicLayoutEffect)(()=>{
        (0, _react_spring_shared.each)(exitingTransitions.current.size ? exitingTransitions.current : changes, ({ phase, payload }, t)=>{
            const { ctrl } = t;
            t.phase = phase;
            ref?.add(ctrl);
            if (hasContext && phase == "enter") ctrl.start({
                default: context
            });
            if (payload) {
                replaceRef(ctrl, payload.ref);
                /**
				* When an injected ref exists, the update is postponed
				* until the ref has its `start` method called.
				* Unless we have exitBeforeEnter in which case will skip
				* to enter the new animation straight away as if they "overlapped"
				*/ if ((ctrl.ref || ref) && !forceChange.current) ctrl.update(payload);
                else {
                    ctrl.start(payload);
                    if (forceChange.current) forceChange.current = false;
                }
            }
        });
    }, reset ? void 0 : deps);
    const renderTransitions = (render)=>/* @__PURE__ */ react.createElement(react.Fragment, null, transitions.map((t, i)=>{
            const change = changes.get(t) || exitingTransitions.current.get(t);
            const { springs } = change || t.ctrl;
            const state = change ? {
                ...t,
                phase: change.phase
            } : t;
            const elem = render({
                ...springs
            }, t.item, state, i);
            const key = _react_spring_shared.is.str(t.key) || _react_spring_shared.is.num(t.key) ? t.key : t.ctrl.id;
            const isLegacyReact = react.version < "19.0.0";
            const props = elem?.props ?? {};
            const elemRef = isLegacyReact ? elem?.ref : props?.ref;
            return elem && elem.type ? /* @__PURE__ */ react.createElement(elem.type, {
                ...props,
                key,
                ref: elemRef
            }) : elem;
        }));
    return ref ? [
        renderTransitions,
        ref
    ] : renderTransitions;
}
/** Local state for auto-generated item keys */ let nextKey = 1;
function getKeys(items, { key, keys = key }, prevTransitions) {
    if (keys === null) {
        const reused = /* @__PURE__ */ new Set();
        return items.map((item)=>{
            const t = prevTransitions && prevTransitions.find((t)=>t.item === item && t.phase !== "leave" && !reused.has(t));
            if (t) {
                reused.add(t);
                return t.key;
            }
            return nextKey++;
        });
    }
    return _react_spring_shared.is.und(keys) ? items : _react_spring_shared.is.fun(keys) ? items.map(keys) : (0, _react_spring_shared.toArray)(keys);
}
//#endregion
//#region src/hooks/useScroll.ts
/**
* A small utility abstraction around our signature useSpring hook. It's a great way to create
* a scroll-linked animation. With either the raw value of distance or a 0-1 progress value.
* You can either use the scroll values of the whole document, or just a specific element.
*
* 
```jsx
import { useScroll, animated } from '@react-spring/web'

function MyComponent() {
const { scrollYProgress } = useScroll()

return (
<animated.div style={{ opacity: scrollYProgress }}>
Hello World
</animated.div>
)
}
```
* 
* @param {UseScrollOptions} useScrollOptions options for the useScroll hook.
* @param {MutableRefObject<HTMLElement>} useScrollOptions.container the container to listen to scroll events on, defaults to the window.
*
* @returns {SpringValues<{scrollX: number; scrollY: number; scrollXProgress: number; scrollYProgress: number}>} SpringValues the collection of values returned from the inner hook
*/ const useScroll = ({ container, ...springOptions } = {})=>{
    const [scrollValues, api] = useSpring({
        "useScroll.useSpring": ()=>({
                scrollX: 0,
                scrollY: 0,
                scrollXProgress: 0,
                scrollYProgress: 0,
                ...springOptions
            })
    }["useScroll.useSpring"], []);
    (0, _react_spring_shared.useIsomorphicLayoutEffect)(()=>{
        const cleanupScroll = (0, _react_spring_shared.onScroll)(({ x, y })=>{
            api.start({
                scrollX: x.current,
                scrollXProgress: x.progress,
                scrollY: y.current,
                scrollYProgress: y.progress
            });
        }, {
            container: container?.current || void 0
        });
        return ()=>{
            /**
			* Stop the springs on unmount.
			*/ (0, _react_spring_shared.each)(Object.values(scrollValues), (value)=>value.stop());
            cleanupScroll();
        };
    }, []);
    return scrollValues;
};
//#endregion
//#region src/hooks/useResize.ts
/**
* A small abstraction around the `useSpring` hook. It returns a `SpringValues` 
* object with the `width` and `height` of the element it's attached to & doesn't 
* necessarily have to be attached to the window, by passing a `container` you 
* can observe that element's size instead.
* 
```jsx
import { useResize, animated } from '@react-spring/web'

function MyComponent() {
const { width } = useResize()

return (
<animated.div style={{ width }}>
Hello World
</animated.div>
)
}
```
* 
* @param {UseResizeOptions} UseResizeOptions options for the useScroll hook.
* @param {MutableRefObject<HTMLElement>} UseResizeOptions.container the container to listen to scroll events on, defaults to the window.
*
* @returns {SpringValues<{width: number; height: number;}>} SpringValues the collection of values returned from the inner hook
*/ const useResize = ({ container, ...springOptions })=>{
    const [sizeValues, api] = useSpring({
        "useResize.useSpring": ()=>({
                width: 0,
                height: 0,
                ...springOptions
            })
    }["useResize.useSpring"], []);
    (0, _react_spring_shared.useIsomorphicLayoutEffect)(()=>{
        const cleanupScroll = (0, _react_spring_shared.onResize)(({ width, height })=>{
            api.start({
                width,
                height,
                immediate: sizeValues.width.get() === 0 || sizeValues.height.get() === 0 || springOptions.immediate === true
            });
        }, {
            container: container?.current || void 0
        });
        return ()=>{
            /**
			* Stop the springs on unmount.
			*/ (0, _react_spring_shared.each)(Object.values(sizeValues), (value)=>value.stop());
            cleanupScroll();
        };
    }, []);
    return sizeValues;
};
//#endregion
//#region src/hooks/useInView.ts
const defaultThresholdOptions = {
    any: 0,
    all: 1
};
function useInView(props, args) {
    const [isInView, setIsInView] = (0, react.useState)(false);
    const ref = (0, react.useRef)(void 0);
    const propsFn = _react_spring_shared.is.fun(props) && props;
    const { to = {}, from = {}, ...restSpringProps } = propsFn ? propsFn() : {};
    const intersectionArguments = propsFn ? args : props;
    const [springs, api] = useSpring({
        "useInView.useSpring": ()=>({
                from,
                ...restSpringProps
            })
    }["useInView.useSpring"], []);
    (0, _react_spring_shared.useIsomorphicLayoutEffect)(()=>{
        const element = ref.current;
        const { root, once, amount = "any", ...restArgs } = intersectionArguments ?? {};
        if (!element || once && isInView || typeof IntersectionObserver === "undefined") return;
        const activeIntersections = /* @__PURE__ */ new WeakMap();
        const onEnter = ()=>{
            if (to) api.start(to);
            setIsInView(true);
            const cleanup = ()=>{
                if (from) api.start(from);
                setIsInView(false);
            };
            return once ? void 0 : cleanup;
        };
        const handleIntersection = (entries)=>{
            entries.forEach((entry)=>{
                const onLeave = activeIntersections.get(entry.target);
                if (entry.isIntersecting === Boolean(onLeave)) return;
                if (entry.isIntersecting) {
                    const newOnLeave = onEnter();
                    if (_react_spring_shared.is.fun(newOnLeave)) activeIntersections.set(entry.target, newOnLeave);
                    else observer.unobserve(entry.target);
                } else if (onLeave) {
                    onLeave();
                    activeIntersections.delete(entry.target);
                }
            });
        };
        const observer = new IntersectionObserver(handleIntersection, {
            root: root && root.current || void 0,
            threshold: typeof amount === "number" || Array.isArray(amount) ? amount : defaultThresholdOptions[amount],
            ...restArgs
        });
        observer.observe(element);
        return ()=>observer.unobserve(element);
    }, [
        intersectionArguments
    ]);
    if (propsFn) return [
        ref,
        springs
    ];
    return [
        ref,
        isInView
    ];
}
//#endregion
//#region src/components/Spring.tsx
function Spring({ children, ...props }) {
    return children(useSpring(props));
}
//#endregion
//#region src/components/Trail.tsx
function Trail({ items, children, ...props }) {
    const trails = useTrail(items.length, props);
    return items.map((item, index)=>{
        const result = children(item, index);
        return _react_spring_shared.is.fun(result) ? result(trails[index]) : result;
    });
}
//#endregion
//#region src/components/Transition.tsx
function Transition({ items, children, ...props }) {
    return useTransition(items, props)(children);
}
//#endregion
//#region src/Interpolation.ts
/**
* An `Interpolation` is a memoized value that's computed whenever one of its
* `FluidValue` dependencies has its value changed.
*
* Other `FrameValue` objects can depend on this. For example, passing an
* `Interpolation` as the `to` prop of a `useSpring` call will trigger an
* animation toward the memoized value.
*/ var Interpolation = class extends FrameValue {
    constructor(source, args){
        super();
        this.source = source;
        this.idle = true;
        this._active = /* @__PURE__ */ new Set();
        this.calc = (0, _react_spring_shared.createInterpolator)(...args);
        const value = this._get();
        const nodeType = (0, _react_spring_animated.getAnimatedType)(value);
        (0, _react_spring_animated.setAnimated)(this, nodeType.create(value));
    }
    advance(_dt) {
        const value = this._get();
        if (!(0, _react_spring_shared.isEqual)(value, this.get())) {
            (0, _react_spring_animated.getAnimated)(this).setValue(value);
            this._onChange(value, this.idle);
        }
        if (!this.idle && checkIdle(this._active)) becomeIdle(this);
    }
    _get() {
        const inputs = _react_spring_shared.is.arr(this.source) ? this.source.map(_react_spring_shared.getFluidValue) : (0, _react_spring_shared.toArray)((0, _react_spring_shared.getFluidValue)(this.source));
        return this.calc(...inputs);
    }
    _start() {
        if (this.idle && !checkIdle(this._active)) {
            this.idle = false;
            (0, _react_spring_shared.each)((0, _react_spring_animated.getPayload)(this), (node)=>{
                node.done = false;
            });
            if (_react_spring_shared.Globals.skipAnimation) {
                _react_spring_shared.raf.batchedUpdates(()=>this.advance());
                becomeIdle(this);
            } else _react_spring_shared.frameLoop.start(this);
        }
    }
    _attach() {
        let priority = 1;
        (0, _react_spring_shared.each)((0, _react_spring_shared.toArray)(this.source), (source)=>{
            if ((0, _react_spring_shared.hasFluidValue)(source)) (0, _react_spring_shared.addFluidObserver)(source, this);
            if (isFrameValue(source)) {
                if (!source.idle) this._active.add(source);
                priority = Math.max(priority, source.priority + 1);
            }
        });
        this.priority = priority;
        this._start();
    }
    _detach() {
        (0, _react_spring_shared.each)((0, _react_spring_shared.toArray)(this.source), (source)=>{
            if ((0, _react_spring_shared.hasFluidValue)(source)) (0, _react_spring_shared.removeFluidObserver)(source, this);
        });
        this._active.clear();
        becomeIdle(this);
    }
    /** @internal */ eventObserved(event) {
        if (event.type == "change") if (event.idle) this.advance();
        else {
            this._active.add(event.parent);
            this._start();
        }
        else if (event.type == "idle") this._active.delete(event.parent);
        else if (event.type == "priority") this.priority = (0, _react_spring_shared.toArray)(this.source).reduce((highest, parent)=>Math.max(highest, (isFrameValue(parent) ? parent.priority : 0) + 1), 0);
    }
};
/** Returns true for an idle source. */ function isIdle(source) {
    return source.idle !== false;
}
/** Return true if all values in the given set are idle or paused. */ function checkIdle(active) {
    return !active.size || Array.from(active).every(isIdle);
}
/** Become idle if not already idle. */ function becomeIdle(self) {
    if (!self.idle) {
        self.idle = true;
        (0, _react_spring_shared.each)((0, _react_spring_animated.getPayload)(self), (node)=>{
            node.done = true;
        });
        (0, _react_spring_shared.callFluidObservers)(self, {
            type: "idle",
            parent: self
        });
    }
}
//#endregion
//#region src/interpolate.ts
/** Map the value of one or more dependencies */ const to = (source, ...args)=>new Interpolation(source, args);
/** @deprecated Use the `to` export instead */ const interpolate = (source, ...args)=>((0, _react_spring_shared.deprecateInterpolate)(), new Interpolation(source, args));
//#endregion
//#region src/globals.ts
_react_spring_shared.Globals.assign({
    createStringInterpolator: _react_spring_shared.createStringInterpolator,
    to: (source, args)=>new Interpolation(source, args)
});
/** Advance all animations by the given time */ const update = _react_spring_shared.frameLoop.advance;
//#endregion
exports.BailSignal = BailSignal;
exports.Controller = Controller;
exports.FrameValue = FrameValue;
exports.Globals = _react_spring_shared.Globals;
exports.Interpolation = Interpolation;
exports.Spring = Spring;
exports.SpringContext = SpringContext;
exports.SpringRef = SpringRef;
exports.SpringValue = SpringValue;
exports.Trail = Trail;
exports.Transition = Transition;
exports.config = config;
Object.defineProperty(exports, 'createInterpolator', {
    enumerable: true,
    get: function() {
        return _react_spring_shared.createInterpolator;
    }
});
Object.defineProperty(exports, 'easings', {
    enumerable: true,
    get: function() {
        return _react_spring_shared.easings;
    }
});
exports.inferTo = inferTo;
exports.interpolate = interpolate;
exports.to = to;
exports.update = update;
exports.useChain = useChain;
exports.useInView = useInView;
Object.defineProperty(exports, 'useIsomorphicLayoutEffect', {
    enumerable: true,
    get: function() {
        return _react_spring_shared.useIsomorphicLayoutEffect;
    }
});
Object.defineProperty(exports, 'useReducedMotion', {
    enumerable: true,
    get: function() {
        return _react_spring_shared.useReducedMotion;
    }
});
exports.useResize = useResize;
exports.useScroll = useScroll;
exports.useSpring = useSpring;
exports.useSpringRef = useSpringRef;
exports.useSpringValue = useSpringValue;
exports.useSprings = useSprings;
exports.useTrail = useTrail;
exports.useTransition = useTransition;
var _react_spring_types = __turbopack_context__.r("[project]/restaurant-menu-editor/node_modules/@react-spring/types/dist/cjs/index.js [client] (ecmascript)");
Object.keys(_react_spring_types).forEach(function(k) {
    if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
        enumerable: true,
        get: function() {
            return _react_spring_types[k];
        }
    });
});
}),
"[project]/restaurant-menu-editor/node_modules/@react-spring/core/dist/cjs/index.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/restaurant-menu-editor/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/restaurant-menu-editor/node_modules/@react-spring/core/dist/cjs/react-spring_core.development.cjs [client] (ecmascript)");
}
}),
"[project]/restaurant-menu-editor/node_modules/@react-spring/web/dist/cjs/react-spring_web.development.cjs [client] (ecmascript)", ((__turbopack_context__, module, exports) => {

Object.defineProperty(exports, Symbol.toStringTag, {
    value: 'Module'
});
let _react_spring_core = __turbopack_context__.r("[project]/restaurant-menu-editor/node_modules/@react-spring/core/dist/cjs/index.js [client] (ecmascript)");
let react_dom = __turbopack_context__.r("[project]/restaurant-menu-editor/node_modules/react-dom/index.js [client] (ecmascript)");
let _react_spring_shared = __turbopack_context__.r("[project]/restaurant-menu-editor/node_modules/@react-spring/shared/dist/cjs/index.js [client] (ecmascript)");
let _react_spring_animated = __turbopack_context__.r("[project]/restaurant-menu-editor/node_modules/@react-spring/animated/dist/cjs/index.js [client] (ecmascript)");
//#region src/applyAnimatedValues.ts
const isCustomPropRE = /^--/;
function dangerousStyleValue(name, value) {
    if (value == null || typeof value === "boolean" || value === "") return "";
    if (typeof value === "number" && value !== 0 && !isCustomPropRE.test(name) && !(isUnitlessNumber.hasOwnProperty(name) && isUnitlessNumber[name])) return value + "px";
    return ("" + value).trim();
}
const attributeCache = {};
function applyAnimatedValues(instance, props) {
    if (!instance.nodeType || !instance.setAttribute || !instance.removeAttribute) return false;
    const isFilterElement = instance.nodeName === "filter" || instance.parentNode && instance.parentNode.nodeName === "filter";
    const { className, style, children, scrollTop, scrollLeft, viewBox, ...attributes } = props;
    const values = Object.values(attributes);
    const names = Object.keys(attributes).map((name)=>isFilterElement || instance.hasAttribute(name) ? name : attributeCache[name] || (attributeCache[name] = name.replace(/([A-Z])/g, (n)=>"-" + n.toLowerCase())));
    if (props.hasOwnProperty("children")) instance.textContent = children;
    for(const name in style)if (style.hasOwnProperty(name)) {
        const value = dangerousStyleValue(name, style[name]);
        if (isCustomPropRE.test(name)) instance.style.setProperty(name, value);
        else instance.style[name] = value;
    }
    names.forEach((name, i)=>{
        const value = values[i];
        if (value !== void 0) instance.setAttribute(name, value);
        else instance.removeAttribute(name);
    });
    if (props.hasOwnProperty("className")) if (className !== void 0) instance.className = className;
    else instance.removeAttribute("class");
    if (scrollTop !== void 0) instance.scrollTop = scrollTop;
    if (scrollLeft !== void 0) instance.scrollLeft = scrollLeft;
    if (props.hasOwnProperty("viewBox")) if (viewBox !== void 0) instance.setAttribute("viewBox", viewBox);
    else instance.removeAttribute("viewBox");
}
let isUnitlessNumber = {
    animationIterationCount: true,
    borderImageOutset: true,
    borderImageSlice: true,
    borderImageWidth: true,
    boxFlex: true,
    boxFlexGroup: true,
    boxOrdinalGroup: true,
    columnCount: true,
    columns: true,
    flex: true,
    flexGrow: true,
    flexPositive: true,
    flexShrink: true,
    flexNegative: true,
    flexOrder: true,
    gridRow: true,
    gridRowEnd: true,
    gridRowSpan: true,
    gridRowStart: true,
    gridColumn: true,
    gridColumnEnd: true,
    gridColumnSpan: true,
    gridColumnStart: true,
    fontWeight: true,
    lineClamp: true,
    lineHeight: true,
    opacity: true,
    order: true,
    orphans: true,
    tabSize: true,
    widows: true,
    zIndex: true,
    zoom: true,
    fillOpacity: true,
    floodOpacity: true,
    stopOpacity: true,
    strokeDasharray: true,
    strokeDashoffset: true,
    strokeMiterlimit: true,
    strokeOpacity: true,
    strokeWidth: true
};
const prefixKey = (prefix, key)=>prefix + key.charAt(0).toUpperCase() + key.substring(1);
const prefixes = [
    "Webkit",
    "Ms",
    "Moz",
    "O"
];
isUnitlessNumber = Object.keys(isUnitlessNumber).reduce((acc, prop)=>{
    prefixes.forEach((prefix)=>acc[prefixKey(prefix, prop)] = acc[prop]);
    return acc;
}, isUnitlessNumber);
//#endregion
//#region src/AnimatedStyle.ts
/** The transform-functions
* (https://developer.mozilla.org/fr/docs/Web/CSS/transform-function)
* that you can pass as keys to your animated component style and that will be
* animated. Perspective has been left out as it would conflict with the
* non-transform perspective style.
*/ const domTransforms = /^(matrix3d|matrix|translate3d|translate[XYZ]?|scale3d|scale[XYZ]?|rotate3d|rotate[XYZ]?|skew[XY]?)$/;
const pxTransforms = /^(translate)/;
const degTransforms = /^(rotate|skew)/;
/** Add a unit to the value when the value is unit-less (eg: a number) */ const addUnit = (value, unit)=>_react_spring_shared.is.num(value) && value !== 0 ? value + unit : value;
/**
* Checks if the input value matches the identity value.
*
*     isValueIdentity(0, 0)              // => true
*     isValueIdentity('0px', 0)          // => true
*     isValueIdentity([0, '0px', 0], 0)  // => true
*/ const isValueIdentity = (value, id)=>_react_spring_shared.is.arr(value) ? value.every((v)=>isValueIdentity(v, id)) : _react_spring_shared.is.num(value) ? value === id : parseFloat(value) === id;
/**
* This AnimatedStyle will simplify animated components transforms by
* interpolating all transform function passed as keys in the style object
* including shortcuts such as x, y and z for translateX/Y/Z
*/ var AnimatedStyle = class extends _react_spring_animated.AnimatedObject {
    constructor({ x, y, z, ...style }){
        /**
		* An array of arrays that contains the values (static or fluid)
		* used by each transform function.
		*/ const inputs = [];
        /**
		* An array of functions that take a list of values (static or fluid)
		* and returns (1) a CSS transform string and (2) a boolean that's true
		* when the transform has no effect (eg: an identity transform).
		*/ const transforms = [];
        if (x || y || z) {
            inputs.push([
                x || 0,
                y || 0,
                z || 0
            ]);
            transforms.push((xyz)=>[
                    `translate3d(${xyz.map((v)=>addUnit(v, "px")).join(",")})`,
                    isValueIdentity(xyz, 0)
                ]);
        }
        (0, _react_spring_shared.eachProp)(style, (value, key)=>{
            if (key === "transform") {
                inputs.push([
                    value || ""
                ]);
                transforms.push((transform)=>[
                        transform,
                        transform === ""
                    ]);
            } else if (domTransforms.test(key)) {
                delete style[key];
                if (_react_spring_shared.is.und(value)) return;
                const unit = pxTransforms.test(key) ? "px" : degTransforms.test(key) ? "deg" : "";
                inputs.push((0, _react_spring_shared.toArray)(value));
                transforms.push(key === "rotate3d" ? ([x, y, z, deg])=>[
                        `rotate3d(${x},${y},${z},${addUnit(deg, unit)})`,
                        isValueIdentity(deg, 0)
                    ] : (input)=>[
                        `${key}(${input.map((v)=>addUnit(v, unit)).join(",")})`,
                        isValueIdentity(input, key.startsWith("scale") ? 1 : 0)
                    ]);
            }
        });
        if (inputs.length) style.transform = new FluidTransform(inputs, transforms);
        super(style);
    }
};
/** @internal */ var FluidTransform = class extends _react_spring_shared.FluidValue {
    constructor(inputs, transforms){
        super();
        this.inputs = inputs;
        this.transforms = transforms;
        this._value = null;
    }
    get() {
        return this._value || (this._value = this._get());
    }
    _get() {
        let transform = "";
        let identity = true;
        (0, _react_spring_shared.each)(this.inputs, (input, i)=>{
            const arg1 = (0, _react_spring_shared.getFluidValue)(input[0]);
            const [t, id] = this.transforms[i](_react_spring_shared.is.arr(arg1) ? arg1 : input.map(_react_spring_shared.getFluidValue));
            transform += " " + t;
            identity = identity && id;
        });
        return identity ? "none" : transform;
    }
    observerAdded(count) {
        if (count == 1) (0, _react_spring_shared.each)(this.inputs, (input)=>(0, _react_spring_shared.each)(input, (value)=>(0, _react_spring_shared.hasFluidValue)(value) && (0, _react_spring_shared.addFluidObserver)(value, this)));
    }
    observerRemoved(count) {
        if (count == 0) (0, _react_spring_shared.each)(this.inputs, (input)=>(0, _react_spring_shared.each)(input, (value)=>(0, _react_spring_shared.hasFluidValue)(value) && (0, _react_spring_shared.removeFluidObserver)(value, this)));
    }
    eventObserved(event) {
        if (event.type == "change") this._value = null;
        (0, _react_spring_shared.callFluidObservers)(this, event);
    }
};
//#endregion
//#region src/primitives.ts
const primitives = [
    "a",
    "abbr",
    "address",
    "area",
    "article",
    "aside",
    "audio",
    "b",
    "base",
    "bdi",
    "bdo",
    "big",
    "blockquote",
    "body",
    "br",
    "button",
    "canvas",
    "caption",
    "cite",
    "code",
    "col",
    "colgroup",
    "data",
    "datalist",
    "dd",
    "del",
    "details",
    "dfn",
    "dialog",
    "div",
    "dl",
    "dt",
    "em",
    "embed",
    "fieldset",
    "figcaption",
    "figure",
    "footer",
    "form",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "head",
    "header",
    "hgroup",
    "hr",
    "html",
    "i",
    "iframe",
    "img",
    "input",
    "ins",
    "kbd",
    "keygen",
    "label",
    "legend",
    "li",
    "link",
    "main",
    "map",
    "mark",
    "menu",
    "menuitem",
    "meta",
    "meter",
    "nav",
    "noscript",
    "object",
    "ol",
    "optgroup",
    "option",
    "output",
    "p",
    "param",
    "picture",
    "pre",
    "progress",
    "q",
    "rp",
    "rt",
    "ruby",
    "s",
    "samp",
    "script",
    "section",
    "select",
    "small",
    "source",
    "span",
    "strong",
    "style",
    "sub",
    "summary",
    "sup",
    "table",
    "tbody",
    "td",
    "textarea",
    "tfoot",
    "th",
    "thead",
    "time",
    "title",
    "tr",
    "track",
    "u",
    "ul",
    "var",
    "video",
    "wbr",
    "circle",
    "clipPath",
    "defs",
    "ellipse",
    "foreignObject",
    "g",
    "image",
    "line",
    "linearGradient",
    "mask",
    "path",
    "pattern",
    "polygon",
    "polyline",
    "radialGradient",
    "rect",
    "stop",
    "svg",
    "text",
    "tspan"
];
//#endregion
//#region src/index.ts
_react_spring_core.Globals.assign({
    batchedUpdates: react_dom.unstable_batchedUpdates,
    createStringInterpolator: _react_spring_shared.createStringInterpolator,
    colors: _react_spring_shared.colors
});
const host = (0, _react_spring_animated.createHost)(primitives, {
    applyAnimatedValues,
    createAnimatedStyle: (style)=>new AnimatedStyle(style),
    getComponentProps: ({ scrollTop, scrollLeft, ...props })=>props
});
const animated = host.animated;
//#endregion
exports.a = animated;
exports.animated = animated;
Object.keys(_react_spring_core).forEach(function(k) {
    if (k !== 'default' && !Object.prototype.hasOwnProperty.call(exports, k)) Object.defineProperty(exports, k, {
        enumerable: true,
        get: function() {
            return _react_spring_core[k];
        }
    });
});
}),
"[project]/restaurant-menu-editor/node_modules/@react-spring/web/dist/cjs/index.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$restaurant$2d$menu$2d$editor$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/restaurant-menu-editor/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/restaurant-menu-editor/node_modules/@react-spring/web/dist/cjs/react-spring_web.development.cjs [client] (ecmascript)");
}
}),
"[project]/restaurant-menu-editor/node_modules/react-tinder-card/useWindowSize.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {

const { useState, useEffect } = __turbopack_context__.r("[project]/restaurant-menu-editor/node_modules/react/index.js [client] (ecmascript)");
// this hook ensures that window size is only updated on the client and not on the server when using Next.js
function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined
    });
    useEffect({
        "useWindowSize.useEffect": ()=>{
            function handleResize() {
                setWindowSize({
                    width: window.innerWidth,
                    height: window.innerHeight
                });
            }
            window.addEventListener('resize', handleResize);
            handleResize();
            return ({
                "useWindowSize.useEffect": ()=>window.removeEventListener('resize', handleResize)
            })["useWindowSize.useEffect"];
        }
    }["useWindowSize.useEffect"], []);
    return windowSize;
}
module.exports = useWindowSize;
}),
"[project]/restaurant-menu-editor/node_modules/react-tinder-card/index.js [client] (ecmascript)", ((__turbopack_context__, module, exports) => {

const React = __turbopack_context__.r("[project]/restaurant-menu-editor/node_modules/react/index.js [client] (ecmascript)");
const { useSpring, animated } = __turbopack_context__.r("[project]/restaurant-menu-editor/node_modules/@react-spring/web/dist/cjs/index.js [client] (ecmascript)");
const useWindowSize = __turbopack_context__.r("[project]/restaurant-menu-editor/node_modules/react-tinder-card/useWindowSize.js [client] (ecmascript)");
const settings = {
    maxTilt: 25,
    rotationPower: 50,
    swipeThreshold: 0.5 // need to update this threshold for RN (1.5 seems reasonable...?)
};
// physical properties of the spring
const physics = {
    touchResponsive: {
        friction: 50,
        tension: 2000
    },
    animateOut: {
        friction: 30,
        tension: 400
    },
    animateBack: {
        friction: 10,
        tension: 200
    }
};
const pythagoras = (x, y)=>{
    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
};
const normalize = (vector)=>{
    const length = Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2));
    return {
        x: vector.x / length,
        y: vector.y / length
    };
};
const animateOut = async (gesture, setSpringTarget, windowHeight, windowWidth)=>{
    const diagonal = pythagoras(windowHeight, windowWidth);
    const velocity = pythagoras(gesture.x, gesture.y);
    const finalX = diagonal * gesture.x;
    const finalY = diagonal * gesture.y;
    const finalRotation = gesture.x * 45;
    const duration = diagonal / velocity;
    setSpringTarget.start({
        xyrot: [
            finalX,
            finalY,
            finalRotation
        ],
        config: {
            duration: duration
        }
    });
    // for now animate back
    return await new Promise((resolve)=>setTimeout(()=>{
            resolve();
        }, duration));
};
const animateBack = (setSpringTarget)=>{
    // translate back to the initial position
    return new Promise((resolve)=>{
        setSpringTarget.start({
            xyrot: [
                0,
                0,
                0
            ],
            config: physics.animateBack,
            onRest: resolve
        });
    });
};
const getSwipeDirection = (property)=>{
    if (Math.abs(property.x) > Math.abs(property.y)) {
        if (property.x > settings.swipeThreshold) {
            return 'right';
        } else if (property.x < -settings.swipeThreshold) {
            return 'left';
        }
    } else {
        if (property.y > settings.swipeThreshold) {
            return 'down';
        } else if (property.y < -settings.swipeThreshold) {
            return 'up';
        }
    }
    return 'none';
};
// must be created outside of the TinderCard forwardRef
const AnimatedDiv = animated.div;
const TinderCard = React.forwardRef(({ flickOnSwipe = true, children, onSwipe, onCardLeftScreen, className, preventSwipe = [], swipeRequirementType = 'velocity', swipeThreshold = settings.swipeThreshold, onSwipeRequirementFulfilled, onSwipeRequirementUnfulfilled }, ref)=>{
    const { width, height } = useWindowSize();
    const [{ xyrot }, setSpringTarget] = useSpring({
        "TinderCard.useSpring": ()=>({
                xyrot: [
                    0,
                    0,
                    0
                ],
                config: physics.touchResponsive
            })
    }["TinderCard.useSpring"]);
    settings.swipeThreshold = swipeThreshold;
    React.useImperativeHandle(ref, {
        "TinderCard.useImperativeHandle": ()=>({
                async swipe (dir = 'right') {
                    if (onSwipe) onSwipe(dir);
                    const power = 1.3;
                    const disturbance = (Math.random() - 0.5) / 2;
                    if (dir === 'right') {
                        await animateOut({
                            x: power,
                            y: disturbance
                        }, setSpringTarget, width, height);
                    } else if (dir === 'left') {
                        await animateOut({
                            x: -power,
                            y: disturbance
                        }, setSpringTarget, width, height);
                    } else if (dir === 'up') {
                        await animateOut({
                            x: disturbance,
                            y: -power
                        }, setSpringTarget, width, height);
                    } else if (dir === 'down') {
                        await animateOut({
                            x: disturbance,
                            y: power
                        }, setSpringTarget, width, height);
                    }
                    if (onCardLeftScreen) onCardLeftScreen(dir);
                },
                async restoreCard () {
                    await animateBack(setSpringTarget);
                }
            })
    }["TinderCard.useImperativeHandle"]);
    const handleSwipeReleased = React.useCallback({
        "TinderCard.useCallback[handleSwipeReleased]": async (setSpringTarget, gesture)=>{
            // Check if this is a swipe
            const dir = getSwipeDirection({
                x: swipeRequirementType === 'velocity' ? gesture.vx : gesture.dx,
                y: swipeRequirementType === 'velocity' ? gesture.vy : gesture.dy
            });
            if (dir !== 'none') {
                if (flickOnSwipe) {
                    if (!preventSwipe.includes(dir)) {
                        if (onSwipe) onSwipe(dir);
                        await animateOut(swipeRequirementType === 'velocity' ? {
                            x: gesture.vx,
                            y: gesture.vy
                        } : normalize({
                            x: gesture.dx,
                            y: gesture.dy
                        }) // Normalize to avoid flicking the card away with super fast speed only direction is wanted here
                        , setSpringTarget, width, height);
                        if (onCardLeftScreen) onCardLeftScreen(dir);
                        return;
                    }
                }
            }
            // Card was not flicked away, animate back to start
            animateBack(setSpringTarget);
        }
    }["TinderCard.useCallback[handleSwipeReleased]"], [
        swipeRequirementType,
        flickOnSwipe,
        preventSwipe,
        onSwipe,
        onCardLeftScreen,
        width,
        height
    ]);
    let swipeThresholdFulfilledDirection = 'none';
    const gestureStateFromWebEvent = (ev, startPositon, lastPosition, isTouch)=>{
        let dx = isTouch ? ev.touches[0].clientX - startPositon.x : ev.clientX - startPositon.x;
        let dy = isTouch ? ev.touches[0].clientY - startPositon.y : ev.clientY - startPositon.y;
        // We cant calculate velocity from the first event
        if (startPositon.x === 0 && startPositon.y === 0) {
            dx = 0;
            dy = 0;
        }
        const vx = -(dx - lastPosition.dx) / (lastPosition.timeStamp - Date.now());
        const vy = -(dy - lastPosition.dy) / (lastPosition.timeStamp - Date.now());
        const gestureState = {
            dx,
            dy,
            vx,
            vy,
            timeStamp: Date.now()
        };
        return gestureState;
    };
    React.useLayoutEffect({
        "TinderCard.useLayoutEffect": ()=>{
            let startPositon = {
                x: 0,
                y: 0
            };
            let lastPosition = {
                dx: 0,
                dy: 0,
                vx: 0,
                vy: 0,
                timeStamp: Date.now()
            };
            let isClicking = false;
            const onTouchStart = {
                "TinderCard.useLayoutEffect.onTouchStart": (ev)=>{
                    if (!ev.srcElement.className.includes('pressable') && ev.cancelable) {
                        ev.preventDefault();
                    }
                    const gestureState = gestureStateFromWebEvent(ev, startPositon, lastPosition, true);
                    lastPosition = gestureState;
                    startPositon = {
                        x: ev.touches[0].clientX,
                        y: ev.touches[0].clientY
                    };
                }
            }["TinderCard.useLayoutEffect.onTouchStart"];
            element.current.addEventListener('touchstart', onTouchStart);
            const onMouseDown = {
                "TinderCard.useLayoutEffect.onMouseDown": (ev)=>{
                    isClicking = true;
                    const gestureState = gestureStateFromWebEvent(ev, startPositon, lastPosition, false);
                    lastPosition = gestureState;
                    startPositon = {
                        x: ev.clientX,
                        y: ev.clientY
                    };
                }
            }["TinderCard.useLayoutEffect.onMouseDown"];
            element.current.addEventListener('mousedown', onMouseDown);
            const handleMove = {
                "TinderCard.useLayoutEffect.handleMove": (gestureState)=>{
                    // Check fulfillment
                    if (onSwipeRequirementFulfilled || onSwipeRequirementUnfulfilled) {
                        const dir = getSwipeDirection({
                            x: swipeRequirementType === 'velocity' ? gestureState.vx : gestureState.dx,
                            y: swipeRequirementType === 'velocity' ? gestureState.vy : gestureState.dy
                        });
                        if (dir !== swipeThresholdFulfilledDirection) {
                            swipeThresholdFulfilledDirection = dir;
                            if (swipeThresholdFulfilledDirection === 'none') {
                                if (onSwipeRequirementUnfulfilled) onSwipeRequirementUnfulfilled();
                            } else {
                                if (onSwipeRequirementFulfilled) onSwipeRequirementFulfilled(dir);
                            }
                        }
                    }
                    // use guestureState.vx / guestureState.vy for velocity calculations
                    // translate element
                    let rot = gestureState.vx * 15 // Magic number 15 looks about right
                    ;
                    if (isNaN(rot)) rot = 0;
                    rot = Math.max(Math.min(rot, settings.maxTilt), -settings.maxTilt);
                    setSpringTarget.start({
                        xyrot: [
                            gestureState.dx,
                            gestureState.dy,
                            rot
                        ],
                        config: physics.touchResponsive
                    });
                }
            }["TinderCard.useLayoutEffect.handleMove"];
            const onMouseMove = {
                "TinderCard.useLayoutEffect.onMouseMove": (ev)=>{
                    if (!isClicking) return;
                    const gestureState = gestureStateFromWebEvent(ev, startPositon, lastPosition, false);
                    lastPosition = gestureState;
                    handleMove(gestureState);
                }
            }["TinderCard.useLayoutEffect.onMouseMove"];
            window.addEventListener('mousemove', onMouseMove);
            const onMouseUp = {
                "TinderCard.useLayoutEffect.onMouseUp": (ev)=>{
                    if (!isClicking) return;
                    isClicking = false;
                    handleSwipeReleased(setSpringTarget, lastPosition);
                    startPositon = {
                        x: 0,
                        y: 0
                    };
                    lastPosition = {
                        dx: 0,
                        dy: 0,
                        vx: 0,
                        vy: 0,
                        timeStamp: Date.now()
                    };
                }
            }["TinderCard.useLayoutEffect.onMouseUp"];
            window.addEventListener('mouseup', onMouseUp);
            const onTouchMove = {
                "TinderCard.useLayoutEffect.onTouchMove": (ev)=>{
                    const gestureState = gestureStateFromWebEvent(ev, startPositon, lastPosition, true);
                    lastPosition = gestureState;
                    handleMove(gestureState);
                }
            }["TinderCard.useLayoutEffect.onTouchMove"];
            element.current.addEventListener('touchmove', onTouchMove);
            const onTouchEnd = {
                "TinderCard.useLayoutEffect.onTouchEnd": (ev)=>{
                    handleSwipeReleased(setSpringTarget, lastPosition);
                    startPositon = {
                        x: 0,
                        y: 0
                    };
                    lastPosition = {
                        dx: 0,
                        dy: 0,
                        vx: 0,
                        vy: 0,
                        timeStamp: Date.now()
                    };
                }
            }["TinderCard.useLayoutEffect.onTouchEnd"];
            element.current.addEventListener('touchend', onTouchEnd);
            return ({
                "TinderCard.useLayoutEffect": ()=>{
                    element.current.removeEventListener('touchstart', onTouchStart);
                    element.current.removeEventListener('touchmove', onTouchMove);
                    element.current.removeEventListener('touchend', onTouchEnd);
                    window.removeEventListener('mousemove', onMouseMove);
                    window.removeEventListener('mouseup', onMouseUp);
                    element.current.removeEventListener('mousedown', onMouseDown);
                }
            })["TinderCard.useLayoutEffect"];
        }
    }["TinderCard.useLayoutEffect"], [
        handleSwipeReleased,
        setSpringTarget,
        onSwipeRequirementFulfilled,
        onSwipeRequirementUnfulfilled
    ]);
    const element = React.useRef();
    return React.createElement(AnimatedDiv, {
        ref: element,
        className,
        style: {
            transform: xyrot.to((x, y, rot)=>`translate3d(${x}px, ${y}px, ${0}px) rotate(${rot}deg)`)
        },
        children
    });
});
module.exports = TinderCard;
}),
]);

//# sourceMappingURL=0x01_0690ja_._.js.map