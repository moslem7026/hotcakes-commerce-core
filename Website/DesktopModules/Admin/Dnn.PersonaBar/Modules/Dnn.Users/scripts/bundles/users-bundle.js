! function(e) {
    var t = {};

    function n(r) {
        if (t[r]) return t[r].exports;
        var o = t[r] = {
            i: r,
            l: !1,
            exports: {}
        };
        return e[r].call(o.exports, o, o.exports, n), o.l = !0, o.exports
    }
    n.m = e, n.c = t, n.d = function(e, t, r) {
        n.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: r
        })
    }, n.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, n.t = function(e, t) {
        if (1 & t && (e = n(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var r = Object.create(null);
        if (n.r(r), Object.defineProperty(r, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e)
            for (var o in e) n.d(r, o, function(t) {
                return e[t]
            }.bind(null, o));
        return r
    }, n.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return n.d(t, "a", t), t
    }, n.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, n.p = "", n(n.s = 127)
}([function(e, t) {
    e.exports = window.dnn.nodeModules.React
}, function(e, t) {
    e.exports = window.dnn.nodeModules.CommonComponents
}, function(e, t, n) {
    e.exports = n(56)()
}, function(e, t) {
    e.exports = window.dnn.nodeModules.ReactRedux
}, function(e, t) {
    e.exports = function(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }
}, function(e, t, n) {
    "use strict";
    e.exports = function(e) {
        var t = [];
        return t.toString = function() {
            return this.map(function(t) {
                var n = function(e, t) {
                    var n = e[1] || "",
                        r = e[3];
                    if (!r) return n;
                    if (t && "function" == typeof btoa) {
                        var o = (i = r, "/*# sourceMappingURL=data:application/json;charset=utf-8;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(i)))) + " */"),
                            a = r.sources.map(function(e) {
                                return "/*# sourceURL=" + r.sourceRoot + e + " */"
                            });
                        return [n].concat(a).concat([o]).join("\n")
                    }
                    var i;
                    return [n].join("\n")
                }(t, e);
                return t[2] ? "@media " + t[2] + "{" + n + "}" : n
            }).join("")
        }, t.i = function(e, n) {
            "string" == typeof e && (e = [
                [null, e, ""]
            ]);
            for (var r = {}, o = 0; o < this.length; o++) {
                var a = this[o][0];
                null != a && (r[a] = !0)
            }
            for (o = 0; o < e.length; o++) {
                var i = e[o];
                null != i[0] && r[i[0]] || (n && !i[2] ? i[2] = n : n && (i[2] = "(" + i[2] + ") and (" + n + ")"), t.push(i))
            }
        }, t
    }
}, function(e, t, n) {
    var r, o, a = {},
        i = (r = function() {
            return window && document && document.all && !window.atob
        }, function() {
            return void 0 === o && (o = r.apply(this, arguments)), o
        }),
        s = function(e) {
            var t = {};
            return function(e, n) {
                if ("function" == typeof e) return e();
                if (void 0 === t[e]) {
                    var r = function(e, t) {
                        return t ? t.querySelector(e) : document.querySelector(e)
                    }.call(this, e, n);
                    if (window.HTMLIFrameElement && r instanceof window.HTMLIFrameElement) try {
                        r = r.contentDocument.head
                    } catch (e) {
                        r = null
                    }
                    t[e] = r
                }
                return t[e]
            }
        }(),
        l = null,
        u = 0,
        c = [],
        d = n(55);

    function p(e, t) {
        for (var n = 0; n < e.length; n++) {
            var r = e[n],
                o = a[r.id];
            if (o) {
                o.refs++;
                for (var i = 0; i < o.parts.length; i++) o.parts[i](r.parts[i]);
                for (; i < r.parts.length; i++) o.parts.push(v(r.parts[i], t))
            } else {
                var s = [];
                for (i = 0; i < r.parts.length; i++) s.push(v(r.parts[i], t));
                a[r.id] = {
                    id: r.id,
                    refs: 1,
                    parts: s
                }
            }
        }
    }

    function f(e, t) {
        for (var n = [], r = {}, o = 0; o < e.length; o++) {
            var a = e[o],
                i = t.base ? a[0] + t.base : a[0],
                s = {
                    css: a[1],
                    media: a[2],
                    sourceMap: a[3]
                };
            r[i] ? r[i].parts.push(s) : n.push(r[i] = {
                id: i,
                parts: [s]
            })
        }
        return n
    }

    function h(e, t) {
        var n = s(e.insertInto);
        if (!n) throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
        var r = c[c.length - 1];
        if ("top" === e.insertAt) r ? r.nextSibling ? n.insertBefore(t, r.nextSibling) : n.appendChild(t) : n.insertBefore(t, n.firstChild), c.push(t);
        else if ("bottom" === e.insertAt) n.appendChild(t);
        else {
            if ("object" != typeof e.insertAt || !e.insertAt.before) throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
            var o = s(e.insertAt.before, n);
            n.insertBefore(t, o)
        }
    }

    function m(e) {
        if (null === e.parentNode) return !1;
        e.parentNode.removeChild(e);
        var t = c.indexOf(e);
        t >= 0 && c.splice(t, 1)
    }

    function g(e) {
        var t = document.createElement("style");
        if (void 0 === e.attrs.type && (e.attrs.type = "text/css"), void 0 === e.attrs.nonce) {
            var r = function() {
                0;
                return n.nc
            }();
            r && (e.attrs.nonce = r)
        }
        return y(t, e.attrs), h(e, t), t
    }

    function y(e, t) {
        Object.keys(t).forEach(function(n) {
            e.setAttribute(n, t[n])
        })
    }

    function v(e, t) {
        var n, r, o, a;
        if (t.transform && e.css) {
            if (!(a = "function" == typeof t.transform ? t.transform(e.css) : t.transform.default(e.css))) return function() {};
            e.css = a
        }
        if (t.singleton) {
            var i = u++;
            n = l || (l = g(t)), r = E.bind(null, n, i, !1), o = E.bind(null, n, i, !0)
        } else e.sourceMap && "function" == typeof URL && "function" == typeof URL.createObjectURL && "function" == typeof URL.revokeObjectURL && "function" == typeof Blob && "function" == typeof btoa ? (n = function(e) {
            var t = document.createElement("link");
            return void 0 === e.attrs.type && (e.attrs.type = "text/css"), e.attrs.rel = "stylesheet", y(t, e.attrs), h(e, t), t
        }(t), r = function(e, t, n) {
            var r = n.css,
                o = n.sourceMap,
                a = void 0 === t.convertToAbsoluteUrls && o;
            (t.convertToAbsoluteUrls || a) && (r = d(r));
            o && (r += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(o)))) + " */");
            var i = new Blob([r], {
                    type: "text/css"
                }),
                s = e.href;
            e.href = URL.createObjectURL(i), s && URL.revokeObjectURL(s)
        }.bind(null, n, t), o = function() {
            m(n), n.href && URL.revokeObjectURL(n.href)
        }) : (n = g(t), r = function(e, t) {
            var n = t.css,
                r = t.media;
            r && e.setAttribute("media", r);
            if (e.styleSheet) e.styleSheet.cssText = n;
            else {
                for (; e.firstChild;) e.removeChild(e.firstChild);
                e.appendChild(document.createTextNode(n))
            }
        }.bind(null, n), o = function() {
            m(n)
        });
        return r(e),
            function(t) {
                if (t) {
                    if (t.css === e.css && t.media === e.media && t.sourceMap === e.sourceMap) return;
                    r(e = t)
                } else o()
            }
    }
    e.exports = function(e, t) {
        if ("undefined" != typeof DEBUG && DEBUG && "object" != typeof document) throw new Error("The style-loader cannot be used in a non-browser environment");
        (t = t || {}).attrs = "object" == typeof t.attrs ? t.attrs : {}, t.singleton || "boolean" == typeof t.singleton || (t.singleton = i()), t.insertInto || (t.insertInto = "head"), t.insertAt || (t.insertAt = "bottom");
        var n = f(e, t);
        return p(n, t),
            function(e) {
                for (var r = [], o = 0; o < n.length; o++) {
                    var i = n[o];
                    (s = a[i.id]).refs--, r.push(s)
                }
                e && p(f(e, t), t);
                for (o = 0; o < r.length; o++) {
                    var s;
                    if (0 === (s = r[o]).refs) {
                        for (var l = 0; l < s.parts.length; l++) s.parts[l]();
                        delete a[s.id]
                    }
                }
            }
    };
    var b, w = (b = [], function(e, t) {
        return b[e] = t, b.filter(Boolean).join("\n")
    });

    function E(e, t, n, r) {
        var o = n ? "" : r.css;
        if (e.styleSheet) e.styleSheet.cssText = w(t, o);
        else {
            var a = document.createTextNode(o),
                i = e.childNodes;
            i[t] && e.removeChild(i[t]), i.length ? e.insertBefore(a, i[t]) : e.appendChild(a)
        }
    }
}, function(e, t, n) {
    var r;
    /*!
      Copyright (c) 2017 Jed Watson.
      Licensed under the MIT License (MIT), see
      http://jedwatson.github.io/classnames
    */
    /*!
      Copyright (c) 2017 Jed Watson.
      Licensed under the MIT License (MIT), see
      http://jedwatson.github.io/classnames
    */
    ! function() {
        "use strict";
        var n = {}.hasOwnProperty;

        function o() {
            for (var e = [], t = 0; t < arguments.length; t++) {
                var r = arguments[t];
                if (r) {
                    var a = typeof r;
                    if ("string" === a || "number" === a) e.push(r);
                    else if (Array.isArray(r) && r.length) {
                        var i = o.apply(null, r);
                        i && e.push(i)
                    } else if ("object" === a)
                        for (var s in r) n.call(r, s) && r[s] && e.push(s)
                }
            }
            return e.join(" ")
        }
        e.exports ? (o.default = o, e.exports = o) : void 0 === (r = function() {
            return o
        }.apply(t, [])) || (e.exports = r)
    }()
}, function(e, t) {
    e.exports = window.dnn.nodeModules.ReactDOM
}, function(e, t) {
    e.exports = window.dnn.Users.CommonActions
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.default = void 0;
    var r = !("undefined" == typeof window || !window.document || !window.document.createElement);
    t.default = r, e.exports = t.default
}, function(e, t, n) {
    "use strict";
    t.a = {
        init: function(e) {
            e || (this.applicationSettings = {}), this.applicationSettings = e
        },
        applicationSettings: null
    }
}, function(e, t) {
    e.exports = window.dnn.nodeModules.Redux
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.message = t.accessor = t.disabled = t.dateFormat = t.numberFormat = void 0;
    var r = s(n(2)),
        o = s(n(83));
    t.elementType = o.default;
    var a = s(n(26)),
        i = n(86);

    function s(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }
    var l = (0, a.default)(function() {
        return i.number.propType.apply(i.number, arguments)
    });
    t.numberFormat = l;
    var u = (0, a.default)(function() {
        return i.date.propType.apply(i.date, arguments)
    });
    t.dateFormat = u;
    var c = (0, a.default)(function() {
        return r.default.bool.apply(r.default, arguments)
    });
    t.disabled = c, c.acceptsArray = r.default.oneOfType([c, r.default.array]);
    var d = r.default.oneOfType([r.default.string, r.default.func]);
    t.accessor = d;
    var p = r.default.oneOfType([r.default.node, r.default.string, r.default.func]);
    t.message = p
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.isShallowEqual = function(e, t) {
        if (e === t) return !0;
        if (e instanceof Date && t instanceof Date) return +e == +t;
        if ("object" != typeof e && "object" != typeof t) return e === t;
        if (typeof e != typeof t) return !1;
        if (null == e || null == t) return !1;
        var n = Object.keys(e),
            r = Object.keys(t);
        if (n.length !== r.length) return !1;
        for (var a = 0; a < n.length; a++)
            if (!o(t, n[a]) || e[n[a]] !== t[n[a]]) return !1;
        return !0
    }, t.chunk = function(e, t) {
        var n = 0,
            r = e ? e.length : 0,
            o = [];
        t = Math.max(+t || 1, 1);
        for (; n < r;) o.push(e.slice(n, n += t));
        return o
    }, t.groupBySortedKeys = function(e, t, n) {
        var r = "function" == typeof e ? e : function(t) {
            return t[e]
        };
        return n = n || [], t.reduce(function(e, t) {
            var a = r(t);
            return o(e, a) ? e[a].push(t) : (n.push(a), e[a] = [t]), e
        }, {})
    }, t.has = t.makeArray = void 0;
    var r;
    (r = n(87)) && r.__esModule;
    t.makeArray = function(e) {
        return null == e ? [] : [].concat(e)
    };
    var o = function(e, t) {
        return !!e && Object.prototype.hasOwnProperty.call(e, t)
    };
    t.has = o
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.default = function(e) {
        return e === e.window ? e : 9 === e.nodeType && (e.defaultView || e.parentWindow)
    }, e.exports = t.default
}, function(e, t) {
    var n = {
            componentWillMount: !0,
            componentDidMount: !0,
            componentWillReceiveProps: !0,
            getSnapshotBeforeUpdate: !0,
            shouldComponentUpdate: !0,
            componentWillUpdate: !0,
            componentDidUpdate: !0,
            componentWillUnmount: !0
        },
        r = {
            getDerivedStateFromProps: !0
        };

    function o(e, t, n) {
        var r = !0;
        return Array.isArray(t) && (r = "after" !== t[0], t = t[1]), e ? function() {
            var o = n ? null : this;
            r && t.apply(o, arguments), e.apply(o, arguments), !r && t.apply(o, arguments)
        } : t
    }
    e.exports = function(e, t) {
        var a = Object.create(null);
        for (var i in t) r[i] && (e.constructor[i] = o(a[i] = e.constructor[i], t[i], !0));
        for (var i in t) n[i] && (e[i] = o(a[i] = e[i], t[i]));
        return function(t) {
            var n = r[t] ? e.constructor : e;
            if (t && t in a) n[t] = a[t];
            else
                for (var t in a) n[t] = a[t]
        }
    }, e.exports.mixin = function(e, t) {
        return spyOnComponent(e.prototype, t), e
    }
}, function(e, t, n) {
    "use strict";
    e.exports = function(e, t, n, r, o, a, i, s) {
        if (!e) {
            var l;
            if (void 0 === t) l = new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
            else {
                var u = [n, r, o, a, i, s],
                    c = 0;
                (l = new Error(t.replace(/%s/g, function() {
                    return u[c++]
                }))).name = "Invariant Violation"
            }
            throw l.framesToPop = 1, l
        }
    }
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.pick = function(e, t) {
        var n = Object.keys(t.propTypes),
            r = {};
        return Object.keys(e).forEach(function(t) {
            -1 !== n.indexOf(t) && (r[t] = e[t])
        }), r
    }, t.pickElementProps = function(e) {
        for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++) n[i - 1] = arguments[i];
        var s = a.apply(void 0, [e].concat(n)),
            l = {};
        return Object.keys(s).forEach(function(e) {
            (-1 !== r.indexOf(e) || o.some(function(t) {
                return !!e.match(t)
            })) && (l[e] = s[e])
        }), l
    }, t.omitOwn = a;
    var r = ["style", "className", "role", "id", "autocomplete", "size", "tabIndex", "maxLength", "name"],
        o = [/^aria-/, /^data-/, /^on[A-Z]\w+/];

    function a(e) {
        for (var t = Object.keys(e.constructor.propTypes), n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), o = 1; o < n; o++) r[o - 1] = arguments[o];
        var a = r.reduce(function(e, t) {
                return e.concat(Object.keys(t.propTypes))
            }, t),
            i = {};
        return Object.keys(e.props).forEach(function(t) {
            -1 === a.indexOf(t) && (i[t] = e.props[t])
        }), i
    }
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.notify = function(e, t) {
        e && e.apply(null, [].concat(t))
    }, t.instanceId = function(e, t) {
        void 0 === t && (t = "");
        return e.__id || (e.__id = (n = "rw_", "" + ((null == n ? "" : n) + ++r))), (e.props.id || e.__id) + t;
        var n
    }, t.isFirstFocusedRender = function(e) {
        return e._firstFocus || (e.state.focused || !!e.props.open) && (e._firstFocus = !0)
    };
    var r = 0
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.dataIndexOf = a, t.valueMatcher = i, t.dataItem = function(e, t, n) {
        var r = a(e, t, n);
        return -1 !== r ? e[r] : t
    }, t.dataText = t.dataValue = void 0;
    var r = n(14),
        o = function(e, t) {
            var n = e;
            return "function" == typeof t ? n = t(e) : null == e ? n = e : "string" == typeof t && "object" == typeof e && t in e && (n = e[t]), n
        };
    t.dataValue = o;

    function a(e, t, n) {
        for (var r = -1, o = function(e) {
                return i(t, e, n)
            }; ++r < e.length;) {
            var a = e[r];
            if (a === t || o(a)) return r
        }
        return -1
    }

    function i(e, t, n) {
        return (0, r.isShallowEqual)(o(e, n), o(t, n))
    }
    t.dataText = function(e, t) {
        var n = o(e, t);
        return null == n ? "" : n + ""
    }
}, function(e, t, n) {
    "use strict";
    var r = n(4);
    t.__esModule = !0, t.default = function(e, t) {
        var n = (0, a.default)(e);
        return n ? n.innerHeight : t ? e.clientHeight : (0, o.default)(e).height
    };
    var o = r(n(37)),
        a = r(n(15));
    e.exports = t.default
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.default = function(e) {
        var t = !0;
        return (0, o.default)(e, {
                componentWillUnmount: function() {
                    t = !1
                }
            }),
            function() {
                return t
            }
    };
    var r, o = (r = n(16)) && r.__esModule ? r : {
        default: r
    };
    e.exports = t.default
}, function(e, t) {
    e.exports = window.dnn.nodeModules.ReduxThunk
}, function(e, t, n) {
    var r = n(61);
    "string" == typeof r && (r = [
        [e.i, r, ""]
    ]);
    var o = {
        hmr: !0,
        transform: void 0,
        insertInto: void 0
    };
    n(6)(r, o);
    r.locals && (e.exports = r.locals)
}, function(e, t, n) {
    "use strict";

    function r() {
        var e = this.constructor.getDerivedStateFromProps(this.props, this.state);
        null != e && this.setState(e)
    }

    function o(e) {
        this.setState(function(t) {
            var n = this.constructor.getDerivedStateFromProps(e, t);
            return null != n ? n : null
        }.bind(this))
    }

    function a(e, t) {
        try {
            var n = this.props,
                r = this.state;
            this.props = e, this.state = t, this.__reactInternalSnapshotFlag = !0, this.__reactInternalSnapshot = this.getSnapshotBeforeUpdate(n, r)
        } finally {
            this.props = n, this.state = r
        }
    }

    function i(e) {
        var t = e.prototype;
        if (!t || !t.isReactComponent) throw new Error("Can only polyfill class components");
        if ("function" != typeof e.getDerivedStateFromProps && "function" != typeof t.getSnapshotBeforeUpdate) return e;
        var n = null,
            i = null,
            s = null;
        if ("function" == typeof t.componentWillMount ? n = "componentWillMount" : "function" == typeof t.UNSAFE_componentWillMount && (n = "UNSAFE_componentWillMount"), "function" == typeof t.componentWillReceiveProps ? i = "componentWillReceiveProps" : "function" == typeof t.UNSAFE_componentWillReceiveProps && (i = "UNSAFE_componentWillReceiveProps"), "function" == typeof t.componentWillUpdate ? s = "componentWillUpdate" : "function" == typeof t.UNSAFE_componentWillUpdate && (s = "UNSAFE_componentWillUpdate"), null !== n || null !== i || null !== s) {
            var l = e.displayName || e.name,
                u = "function" == typeof e.getDerivedStateFromProps ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
            throw Error("Unsafe legacy lifecycles will not be called for components using new component APIs.\n\n" + l + " uses " + u + " but also contains the following legacy lifecycles:" + (null !== n ? "\n  " + n : "") + (null !== i ? "\n  " + i : "") + (null !== s ? "\n  " + s : "") + "\n\nThe above lifecycles should be removed. Learn more about this warning here:\nhttps://fb.me/react-async-component-lifecycle-hooks")
        }
        if ("function" == typeof e.getDerivedStateFromProps && (t.componentWillMount = r, t.componentWillReceiveProps = o), "function" == typeof t.getSnapshotBeforeUpdate) {
            if ("function" != typeof t.componentDidUpdate) throw new Error("Cannot polyfill getSnapshotBeforeUpdate() for components that do not define componentDidUpdate() on the prototype");
            t.componentWillUpdate = a;
            var c = t.componentDidUpdate;
            t.componentDidUpdate = function(e, t, n) {
                var r = this.__reactInternalSnapshotFlag ? this.__reactInternalSnapshot : n;
                c.call(this, e, t, r)
            }
        }
        return e
    }
    n.r(t), n.d(t, "polyfill", function() {
        return i
    }), r.__suppressDeprecationWarning = !0, o.__suppressDeprecationWarning = !0, a.__suppressDeprecationWarning = !0
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    }), t.default = function(e) {
        function t(t, n, r, o, a, i) {
            var s = o || "<<anonymous>>",
                l = i || r;
            if (null == n[r]) return t ? new Error("Required " + a + " `" + l + "` was not specified in `" + s + "`.") : null;
            for (var u = arguments.length, c = Array(u > 6 ? u - 6 : 0), d = 6; d < u; d++) c[d - 6] = arguments[d];
            return e.apply(void 0, [n, r, s, a, l].concat(c))
        }
        var n = t.bind(null, !1);
        return n.isRequired = t.bind(null, !0), n
    }, e.exports = t.default
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.defaultGetDataState = u, t.getCommonListProps = function(e, t, n) {
        var r = n.groupBy,
            o = n.optionComponent,
            a = n.itemComponent,
            s = n.groupComponent,
            l = n.searchTerm,
            u = n.listProps;
        return i({
            searchTerm: l,
            groupBy: r,
            groupComponent: s,
            itemComponent: a,
            optionComponent: o
        }, u, {
            data: e.data,
            dataState: e.state,
            textAccessor: t.text,
            valueAccessor: t.value
        })
    }, t.default = function(e, t, n) {
        var o = void 0 === n ? {} : n,
            i = o.nextProps,
            l = o.getDataState,
            p = i.disabled,
            f = i.valueField,
            h = i.textField,
            m = (l = l || c(i) || u)(e, i, t && t.dataState),
            g = m && m.sequentialData || e,
            y = d(p, f),
            v = function(e, t) {
                return y(e) || t && !r.presets.startsWith((0, a.dataText)(e, h).toLowerCase(), t.toLowerCase())
            },
            b = {
                dataState: m,
                isDisabled: y,
                first: function() {
                    return b.next(s)
                },
                last: function() {
                    return b.prevEnabled(g[g.length - 1])
                },
                prev: function(e, t) {
                    for (var n = Math.max(0, g.indexOf(e)) - 1; n > -1 && v(g[n], t);) n--;
                    return n >= 0 ? g[n] : y(e) ? null : e
                },
                next: function(e, t) {
                    for (var n = g.indexOf(e) + 1; n < g.length && v(g[n], t);) n++;
                    return n < g.length ? g[n] : y(e) ? null : e
                },
                prevEnabled: function(e) {
                    return y(e) ? b.prev(e) : e
                },
                nextEnabled: function(e) {
                    return y(e) ? b.next(e) : e
                }
            };
        return b
    };
    var r = n(28),
        o = n(14),
        a = n(20);

    function i() {
        return (i = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        }).apply(this, arguments)
    }
    var s = {},
        l = function() {
            return !1
        };

    function u(e, t, n) {
        var r = t.groupBy;
        if (void 0 === n && (n = {}), n.data !== e || n.groupBy !== r) {
            if (!r) return {};
            var a = [],
                i = (0, o.groupBySortedKeys)(r, e, a);
            return {
                data: e,
                groupBy: r,
                groups: i,
                sortedKeys: a,
                sequentialData: Object.keys(i).reduce(function(e, t) {
                    return e.concat(i[t])
                }, [])
            }
        }
        return n
    }
    var c = function(e) {
            var t = e.listComponent;
            return t && t.getDataState
        },
        d = function(e, t) {
            return Array.isArray(e) ? function(n) {
                return e.some(function(e) {
                    return (0, a.dataValue)(n, t) === (0, a.dataValue)(e, t)
                })
            } : l
        }
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.indexOf = function(e, t) {
        var n = t.searchTerm,
            r = void 0 === n ? "" : n,
            o = c(s(t, ["searchTerm"])),
            a = o.filter,
            i = o.minLength;
        if (!a || !r || !r.trim() || r.length < i) return -1;
        for (var l = 0; l < e.length; l++)
            if (a(e[l], r, l)) return l;
        return -1
    }, t.filter = function(e, t) {
        var n = t.searchTerm,
            r = void 0 === n ? "" : n,
            o = c(s(t, ["searchTerm"])),
            a = o.filter,
            i = o.minLength;
        return !a || !r || !r.trim() || r.length < i ? e : e.filter(function(e, t) {
            return a(e, r, t)
        })
    }, t.suggest = function(e, t) {
        var n = t.searchTerm,
            r = void 0 === n ? "" : n,
            o = c(s(t, ["searchTerm"])),
            a = o.filter,
            i = o.minLength;
        if (!a || !r || !r.trim() || r.length < i) return r;
        for (var l = 0; l < e.length; l++)
            if (a(e[l], r, l)) return e[l];
        return r
    }, t.propTypes = t.presets = void 0;
    var r, o = (r = n(2)) && r.__esModule ? r : {
            default: r
        },
        a = function(e) {
            if (e && e.__esModule) return e;
            var t = {};
            if (null != e)
                for (var n in e)
                    if (Object.prototype.hasOwnProperty.call(e, n)) {
                        var r = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(e, n) : {};
                        r.get || r.set ? Object.defineProperty(t, n, r) : t[n] = e[n]
                    } return t.default = e, t
        }(n(13)),
        i = n(20);

    function s(e, t) {
        if (null == e) return {};
        var n, r, o = {},
            a = Object.keys(e);
        for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) >= 0 || (o[n] = e[n]);
        if (Object.getOwnPropertySymbols) {
            var i = Object.getOwnPropertySymbols(e);
            for (r = 0; r < i.length; r++) n = i[r], t.indexOf(n) >= 0 || Object.prototype.propertyIsEnumerable.call(e, n) && (o[n] = e[n])
        }
        return o
    }

    function l() {
        return (l = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        }).apply(this, arguments)
    }
    var u = {
        eq: function(e, t) {
            return e === t
        },
        neq: function(e, t) {
            return e !== t
        },
        gt: function(e, t) {
            return e > t
        },
        gte: function(e, t) {
            return e >= t
        },
        lt: function(e, t) {
            return e < t
        },
        lte: function(e, t) {
            return e <= t
        },
        contains: function(e, t) {
            return -1 !== e.indexOf(t)
        },
        startsWith: function(e, t) {
            return 0 === e.lastIndexOf(t, 0)
        },
        endsWith: function(e, t) {
            var n = e.length - t.length,
                r = e.indexOf(t, n);
            return -1 !== r && r === n
        }
    };

    function c(e) {
        var t, n, r, o, a, s, c = l({}, e);
        return c.minLengh = c.minLengh || 0, c.filter = (r = (t = c).filter, o = t.caseSensitive, a = void 0 !== o && o, s = t.textField, "function" != typeof(r = !1 === (n = r) ? null : !0 === n ? "startsWith" : n || "eq") && r ? (r = u[r], function(e, t) {
            var n = (0, i.dataText)(e, s);
            return a || (n = n.toLowerCase(), t = t.toLowerCase()), r(n, t)
        }) : r), c
    }
    t.presets = u;
    var d = {
        textField: a.accessor,
        caseSensitive: o.default.bool,
        minLength: o.default.number,
        filter: o.default.oneOfType([o.default.func, o.default.bool, o.default.oneOf(Object.keys(u))])
    };
    t.propTypes = d
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.getMessages = function(e) {
        void 0 === e && (e = {});
        var t = {};
        return Object.keys(a).forEach(function(n) {
            var r = e[n];
            null == r && (r = a[n]), t[n] = "function" == typeof r ? r : function() {
                return r
            }
        }), t
    };
    var r, o = (r = n(0)) && r.__esModule ? r : {
        default: r
    };
    var a = {
        moveBack: "Navigate back",
        moveForward: "Navigate forward",
        dateButton: "Select date",
        timeButton: "Select time",
        openCombobox: "open combobox",
        openDropdown: "open dropdown",
        placeholder: "",
        filterPlaceholder: "",
        emptyList: "There are no items in this list",
        emptyFilter: "The filter returned no results",
        createOption: function(e) {
            var t = e.searchTerm;
            return [" Create option", t && " ", t && o.default.createElement("strong", {
                key: "_"
            }, '"' + t + '"')]
        },
        tagsLabel: "Selected items",
        removeLabel: "Remove selected item",
        noneSelected: "no selected items",
        selectedItems: function(e) {
            return "Selected items: " + e.join(", ")
        },
        increment: "Increment value",
        decrement: "Decrement value"
    }
}, function(e, t, n) {
    "use strict";
    var r = n(4);
    t.__esModule = !0, t.default = void 0;
    var o = function() {};
    r(n(10)).default && (o = document.addEventListener ? function(e, t, n, r) {
        return e.addEventListener(t, n, r || !1)
    } : document.attachEvent ? function(e, t, n) {
        return e.attachEvent("on" + t, function(t) {
            (t = t || window.event).target = t.target || t.srcElement, t.currentTarget = e, n.call(e, t)
        })
    } : void 0);
    var a = o;
    t.default = a, e.exports = t.default
}, function(e, t, n) {
    "use strict";
    var r = n(4);
    t.__esModule = !0, t.default = void 0;
    var o = function() {};
    r(n(10)).default && (o = document.addEventListener ? function(e, t, n, r) {
        return e.removeEventListener(t, n, r || !1)
    } : document.attachEvent ? function(e, t, n) {
        return e.detachEvent("on" + t, n)
    } : void 0);
    var a = o;
    t.default = a, e.exports = t.default
}, function(e, t, n) {
    "use strict";
    var r = n(4);
    t.__esModule = !0, t.default = void 0;
    var o = r(n(10)).default ? function(e, t) {
        return e.contains ? e.contains(t) : e.compareDocumentPosition ? e === t || !!(16 & e.compareDocumentPosition(t)) : a(e, t)
    } : a;

    function a(e, t) {
        if (t)
            do {
                if (t === e) return !0
            } while (t = t.parentNode);
        return !1
    }
    t.default = o, e.exports = t.default
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.default = function(e, t) {
        var n, a = "#" === t[0],
            i = "." === t[0],
            s = a || i ? t.slice(1) : t;
        if (r.test(s)) return a ? (e = e.getElementById ? e : document, (n = e.getElementById(s)) ? [n] : []) : e.getElementsByClassName && i ? o(e.getElementsByClassName(s)) : o(e.getElementsByTagName(t));
        return o(e.querySelectorAll(t))
    };
    var r = /^[\w-]*$/,
        o = Function.prototype.bind.call(Function.prototype.call, [].slice);
    e.exports = t.default
}, function(e, t, n) {
    "use strict";
    var r = n(4);
    t.__esModule = !0, t.default = function(e, t, n) {
        var r = "",
            c = "",
            d = t;
        if ("string" == typeof t) {
            if (void 0 === n) return e.style[(0, o.default)(t)] || (0, i.default)(e).getPropertyValue((0, a.default)(t));
            (d = {})[t] = n
        }
        Object.keys(d).forEach(function(t) {
            var n = d[t];
            n || 0 === n ? (0, u.default)(t) ? c += t + "(" + n + ") " : r += (0, a.default)(t) + ": " + n + ";" : (0, s.default)(e, (0, a.default)(t))
        }), c && (r += l.transform + ": " + c + ";");
        e.style.cssText += ";" + r
    };
    var o = r(n(35)),
        a = r(n(97)),
        i = r(n(99)),
        s = r(n(100)),
        l = n(36),
        u = r(n(101));
    e.exports = t.default
}, function(e, t, n) {
    "use strict";
    var r = n(4);
    t.__esModule = !0, t.default = function(e) {
        return (0, o.default)(e.replace(a, "ms-"))
    };
    var o = r(n(96)),
        a = /^-ms-/;
    e.exports = t.default
}, function(e, t, n) {
    "use strict";
    var r = n(4);
    t.__esModule = !0, t.default = t.animationEnd = t.animationDelay = t.animationTiming = t.animationDuration = t.animationName = t.transitionEnd = t.transitionDuration = t.transitionDelay = t.transitionTiming = t.transitionProperty = t.transform = void 0;
    var o, a, i, s, l, u, c, d, p, f, h, m = r(n(10)),
        g = "transform";
    if (t.transform = g, t.animationEnd = i, t.transitionEnd = a, t.transitionDelay = c, t.transitionTiming = u, t.transitionDuration = l, t.transitionProperty = s, t.animationDelay = h, t.animationTiming = f, t.animationDuration = p, t.animationName = d, m.default) {
        var y = function() {
            for (var e, t, n = document.createElement("div").style, r = {
                    O: function(e) {
                        return "o" + e.toLowerCase()
                    },
                    Moz: function(e) {
                        return e.toLowerCase()
                    },
                    Webkit: function(e) {
                        return "webkit" + e
                    },
                    ms: function(e) {
                        return "MS" + e
                    }
                }, o = Object.keys(r), a = "", i = 0; i < o.length; i++) {
                var s = o[i];
                if (s + "TransitionProperty" in n) {
                    a = "-" + s.toLowerCase(), e = r[s]("TransitionEnd"), t = r[s]("AnimationEnd");
                    break
                }
            }!e && "transitionProperty" in n && (e = "transitionend");
            !t && "animationName" in n && (t = "animationend");
            return n = null, {
                animationEnd: t,
                transitionEnd: e,
                prefix: a
            }
        }();
        o = y.prefix, t.transitionEnd = a = y.transitionEnd, t.animationEnd = i = y.animationEnd, t.transform = g = o + "-" + g, t.transitionProperty = s = o + "-transition-property", t.transitionDuration = l = o + "-transition-duration", t.transitionDelay = c = o + "-transition-delay", t.transitionTiming = u = o + "-transition-timing-function", t.animationName = d = o + "-animation-name", t.animationDuration = p = o + "-animation-duration", t.animationTiming = f = o + "-animation-delay", t.animationDelay = h = o + "-animation-timing-function"
    }
    var v = {
        transform: g,
        end: a,
        property: s,
        timing: u,
        delay: c,
        duration: l
    };
    t.default = v
}, function(e, t, n) {
    "use strict";
    var r = n(4);
    t.__esModule = !0, t.default = function(e) {
        var t = (0, i.default)(e),
            n = (0, a.default)(t),
            r = t && t.documentElement,
            s = {
                top: 0,
                left: 0,
                height: 0,
                width: 0
            };
        if (!t) return;
        if (!(0, o.default)(r, e)) return s;
        void 0 !== e.getBoundingClientRect && (s = e.getBoundingClientRect());
        return s = {
            top: s.top + (n.pageYOffset || r.scrollTop) - (r.clientTop || 0),
            left: s.left + (n.pageXOffset || r.scrollLeft) - (r.clientLeft || 0),
            width: (null == s.width ? e.offsetWidth : s.width) || 0,
            height: (null == s.height ? e.offsetHeight : s.height) || 0
        }
    };
    var o = r(n(32)),
        a = r(n(15)),
        i = r(n(102));
    e.exports = t.default
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0;
    var r = u(n(16));
    t.spyOnComponent = r.default;
    var o = u(n(110));
    t.autoFocus = o.default;
    var a = u(n(111));
    t.focusManager = a.default;
    var i = u(n(22));
    t.mountManager = i.default;
    var s = u(n(39));
    t.timeoutManager = s.default;
    var l = u(n(112));

    function u(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }
    t.mixin = l.default
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.default = function(e) {
        var t, n = (0, o.default)(e),
            a = Object.create(null);
        return (0, r.default)(e, {
            componentWillUnmount: function() {
                for (var e in a) clearTimeout(a[e]);
                a = null
            }
        }), t = {
            clear: function(e) {
                clearTimeout(a[e])
            },
            set: function(e, r, o) {
                n() && (t.clear(e), a[e] = setTimeout(r, o))
            }
        }
    };
    var r = a(n(16)),
        o = a(n(22));

    function a(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }
    e.exports = t.default
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.widgetEditable = t.widgetEnabled = t.isInDisabledFieldset = void 0;
    var r, o = n(8),
        a = (r = n(113)) && r.__esModule ? r : {
            default: r
        };
    var i = function(e) {
        var t;
        try {
            t = (0, o.findDOMNode)(e)
        } catch (e) {}
        return !!t && (0, a.default)(t, "fieldset[disabled] *")
    };
    t.isInDisabledFieldset = i;
    var s = u(!0);
    t.widgetEnabled = s;
    var l = u(!1);

    function u(e) {
        function t(t) {
            return function() {
                var n = this.props,
                    r = n.disabled,
                    o = n.readOnly;
                r = i(this) || 1 == r || !e && !0 === o;
                for (var a = arguments.length, s = new Array(a), l = 0; l < a; l++) s[l] = arguments[l];
                if (!r) return t.apply(this, s)
            }
        }
        return function(e, n, r) {
            if (r.initializer) {
                var o = r.initializer;
                r.initializer = function() {
                    return t(o.call(this)).bind(this)
                }
            } else r.value = t(r.value);
            return r
        }
    }
    t.widgetEditable = l
}, function(e, t) {
    e.exports = window.dnn.nodeModules.ReduxImmutableStateInvariant
}, function(e, t) {
    e.exports = window.dnn.Users.CommonReducers
}, function(e, t) {
    e.exports = window.dnn.nodeModules.ReduxDevTools
}, function(e, t) {
    e.exports = window.dnn.nodeModules.ReduxDevToolsLogMonitor
}, function(e, t) {
    e.exports = window.dnn.nodeModules.ReduxDevToolsDockMonitor
}, function(e, t, n) {
    e.exports = n(126)
}, function(e, t, n) {
    var r = n(60);
    "string" == typeof r && (r = [
        [e.i, r, ""]
    ]);
    var o = {
        hmr: !0,
        transform: void 0,
        insertInto: void 0
    };
    n(6)(r, o);
    r.locals && (e.exports = r.locals)
}, function(e, t) {
    e.exports = window.dnn.nodeModules.Moment
}, function(e, t, n) {
    var r = n(68);
    "string" == typeof r && (r = [
        [e.i, r, ""]
    ]);
    var o = {
        hmr: !0,
        transform: void 0,
        insertInto: void 0
    };
    n(6)(r, o);
    r.locals && (e.exports = r.locals)
}, function(e, t, n) {
    var r = n(71);
    "string" == typeof r && (r = [
        [e.i, r, ""]
    ]);
    var o = {
        hmr: !0,
        transform: void 0,
        insertInto: void 0
    };
    n(6)(r, o);
    r.locals && (e.exports = r.locals)
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.default = void 0;
    var r, o, a, i, s, l, u, c = N(n(0)),
        d = N(n(2)),
        p = N(n(7)),
        f = n(25),
        h = N(n(78)),
        m = N(n(80)),
        g = N(n(81)),
        y = N(n(82)),
        v = N(n(91)),
        b = N(n(105)),
        w = N(n(107)),
        E = n(29),
        S = N(n(109)),
        O = N(n(27)),
        x = N(n(114)),
        C = I(n(13)),
        T = N(n(115)),
        _ = n(14),
        R = I(n(18)),
        k = I(n(28)),
        D = n(40),
        P = n(19),
        U = n(120);

    function I(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
            for (var n in e)
                if (Object.prototype.hasOwnProperty.call(e, n)) {
                    var r = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(e, n) : {};
                    r.get || r.set ? Object.defineProperty(t, n, r) : t[n] = e[n]
                } return t.default = e, t
    }

    function N(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }

    function j(e, t, n, r) {
        n && Object.defineProperty(e, t, {
            enumerable: n.enumerable,
            configurable: n.configurable,
            writable: n.writable,
            value: n.initializer ? n.initializer.call(r) : void 0
        })
    }

    function M(e) {
        if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e
    }

    function A(e, t, n, r, o) {
        var a = {};
        return Object.keys(r).forEach(function(e) {
            a[e] = r[e]
        }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = n.slice().reverse().reduce(function(n, r) {
            return r(e, t, n) || n
        }, a), o && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(o) : void 0, a.initializer = void 0), void 0 === a.initializer && (Object.defineProperty(e, t, a), a = null), a
    }

    function L() {
        return (L = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        }).apply(this, arguments)
    }
    var G = L({}, k.propTypes, {
            value: d.default.any,
            onChange: d.default.func,
            open: d.default.bool,
            onToggle: d.default.func,
            itemComponent: C.elementType,
            listComponent: C.elementType,
            groupComponent: C.elementType,
            groupBy: C.accessor,
            data: d.default.array,
            valueField: C.accessor,
            textField: C.accessor,
            name: d.default.string,
            onSelect: d.default.func,
            autoFocus: d.default.bool,
            disabled: C.disabled.acceptsArray,
            readOnly: C.disabled,
            suggest: k.propTypes.filter,
            busy: d.default.bool,
            selectIcon: d.default.node,
            busySpinner: d.default.node,
            delay: d.default.number,
            dropUp: d.default.bool,
            popupTransition: C.elementType,
            placeholder: d.default.string,
            containerClassName: d.default.string,
            inputProps: d.default.object,
            listProps: d.default.object,
            isRtl: d.default.bool,
            messages: d.default.shape({
                openCombobox: C.message,
                emptyList: C.message,
                emptyFilter: C.message
            })
        }),
        F = (0, f.polyfill)((u = l = function(e) {
            var t, n;

            function r(t, n) {
                var r;
                return (r = e.call(this, t, n) || this).handleFocusWillChange = function(e) {
                    !e && r.inputRef && r.inputRef.accept(), e && r.focus()
                }, r.handleFocusChanged = function(e) {
                    e || r.close()
                }, j(r, "handleSelect", a, M(M(r))), r.handleInputKeyDown = function(e) {
                    var t = e.key;
                    r._deleting = "Backspace" === t || "Delete" === t, r._isTyping = !0
                }, r.handleInputChange = function(e) {
                    var t = r.suggest(e.target.value);
                    r.change(t, !0, e), r.open()
                }, j(r, "handleKeyDown", i, M(M(r))), r.attachListRef = function(e) {
                    r.listRef = e
                }, r.attachInputRef = function(e) {
                    r.inputRef = e
                }, j(r, "toggle", s, M(M(r))), r.inputId = (0, P.instanceId)(M(M(r)), "_input"), r.listId = (0, P.instanceId)(M(M(r)), "_listbox"), r.activeId = (0, P.instanceId)(M(M(r)), "_listbox_active_option"), r.handleScroll = (0, T.default)(M(M(r))), r.focusManager = (0, S.default)(M(M(r)), {
                    willHandle: r.handleFocusWillChange,
                    didHandle: r.handleFocusChanged
                }), r.state = {
                    isSuggesting: function() {
                        return r.inputRef && r.inputRef.isSuggesting()
                    }
                }, r
            }
            n = e, (t = r).prototype = Object.create(n.prototype), t.prototype.constructor = t, t.__proto__ = n;
            var o = r.prototype;
            return o.shouldComponentUpdate = function(e, t) {
                var n = t.isSuggesting(),
                    r = !(0, _.isShallowEqual)(t, this.state),
                    o = !(0, _.isShallowEqual)(e, this.props);
                return n || r || o
            }, r.getDerivedStateFromProps = function(e, t) {
                var n, r = e.value,
                    o = e.data,
                    a = e.messages,
                    i = e.filter,
                    s = e.minLength,
                    l = e.caseSensitive,
                    u = t.focusedItem,
                    c = (0, x.default)(e),
                    d = r !== t.lastValue,
                    p = c.indexOf(o, r),
                    f = -1 === p ? r : o[p];
                (-1 === p || t.isSuggesting()) && (n = c.text(f)), o = k.filter(o, {
                    filter: i,
                    searchTerm: n,
                    minLength: s,
                    caseSensitive: l,
                    textField: c.text
                });
                var h = (0, O.default)(o, t.list, {
                    nextProps: e
                }); - 1 !== p && (p = c.indexOf(o, r));
                var m = c.indexOf(o, u); - 1 === m && (m = k.indexOf(o, {
                    searchTerm: n,
                    textField: c.text,
                    filter: i || !0
                }));
                var g = o[p],
                    y = null;
                return y = -1 === m ? void 0 !== g ? g : o[0] : o[m], {
                    data: o,
                    list: h,
                    accessors: c,
                    lastValue: r,
                    messages: (0, E.getMessages)(a),
                    selectedItem: d ? h.nextEnabled(g) : t.selectedItem,
                    focusedItem: d || void 0 === u ? h.nextEnabled(void 0 !== g ? g : y) : y
                }
            }, o.renderInput = function() {
                var e = this.props,
                    t = e.suggest,
                    n = e.filter,
                    r = e.busy,
                    o = e.name,
                    a = e.data,
                    i = e.value,
                    s = e.autoFocus,
                    l = e.tabIndex,
                    u = e.placeholder,
                    d = e.inputProps,
                    p = e.disabled,
                    f = e.readOnly,
                    h = e.open,
                    m = this.state.accessors,
                    g = m.findOrSelf(a, i),
                    y = t ? n ? "both" : "inline" : n ? "list" : "";
                return c.default.createElement(w.default, L({}, d, {
                    role: "combobox",
                    name: o,
                    id: this.inputId,
                    autoFocus: s,
                    tabIndex: l,
                    suggest: t,
                    disabled: !0 === p,
                    readOnly: !0 === f,
                    "aria-busy": !!r,
                    "aria-owns": this.listId,
                    "aria-autocomplete": y,
                    "aria-activedescendant": h ? this.activeId : null,
                    "aria-expanded": h,
                    "aria-haspopup": !0,
                    placeholder: u,
                    value: m.text(g),
                    onChange: this.handleInputChange,
                    onKeyDown: this.handleInputKeyDown,
                    ref: this.attachInputRef
                }))
            }, o.renderList = function(e) {
                var t = this.activeId,
                    n = this.inputId,
                    r = this.listId,
                    o = this.props,
                    a = o.open,
                    i = o.data,
                    s = o.value,
                    l = o.listProps,
                    u = o.optionComponent,
                    d = o.itemComponent,
                    p = o.groupComponent,
                    f = this.state,
                    h = f.list,
                    m = f.accessors,
                    g = f.focusedItem,
                    y = f.selectedItem,
                    v = f.data,
                    b = this.props.listComponent;
                return c.default.createElement(b, L({}, l, {
                    id: r,
                    activeId: t,
                    data: v,
                    dataState: h.dataState,
                    isDisabled: h.isDisabled,
                    textAccessor: m.text,
                    valueAccessor: m.value,
                    itemComponent: d,
                    groupComponent: p,
                    optionComponent: u,
                    selectedItem: y,
                    focusedItem: a ? g : null,
                    searchTerm: m.text(s) || "",
                    "aria-hidden": !a,
                    "aria-labelledby": n,
                    "aria-live": a && "polite",
                    onSelect: this.handleSelect,
                    onMove: this.handleScroll,
                    ref: this.attachListRef,
                    messages: {
                        emptyList: i.length ? e.emptyFilter : e.emptyList
                    }
                }))
            }, o.render = function() {
                var e = this,
                    t = this.props,
                    n = t.isRtl,
                    r = t.className,
                    o = t.popupTransition,
                    a = t.busy,
                    i = t.dropUp,
                    s = t.open,
                    l = t.selectIcon,
                    u = t.busySpinner,
                    d = t.containerClassName,
                    f = this.state,
                    h = f.focused,
                    y = f.messages,
                    w = !0 === this.props.disabled,
                    E = !0 === this.props.readOnly,
                    S = R.pickElementProps(this),
                    O = (0, P.isFirstFocusedRender)(this);
                return c.default.createElement(m.default, L({}, S, {
                    open: s,
                    isRtl: n,
                    dropUp: i,
                    focused: h,
                    disabled: w,
                    readOnly: E,
                    onBlur: this.focusManager.handleBlur,
                    onFocus: this.focusManager.handleFocus,
                    onKeyDown: this.handleKeyDown,
                    className: (0, p.default)(r, "rw-combobox")
                }), c.default.createElement(g.default, {
                    className: d
                }, this.renderInput(), c.default.createElement(b.default, {
                    bordered: !0,
                    busy: a,
                    icon: l,
                    spinner: u,
                    onClick: this.toggle,
                    disabled: w || E,
                    label: y.openCombobox(this.props)
                })), O && c.default.createElement(v.default, {
                    open: s,
                    dropUp: i,
                    transition: o,
                    onEntering: function() {
                        return e.listRef.forceUpdate()
                    }
                }, c.default.createElement("div", null, this.renderList(y))))
            }, o.focus = function() {
                this.inputRef && this.inputRef.focus()
            }, o.change = function(e, t, n) {
                var r = this.props,
                    o = r.onChange,
                    a = r.value;
                this._typedChange = !!t, (0, P.notify)(o, [e, {
                    lastValue: a,
                    originalEvent: n
                }])
            }, o.open = function() {
                this.props.open || (0, P.notify)(this.props.onToggle, !0)
            }, o.close = function() {
                this.props.open && (0, P.notify)(this.props.onToggle, !1)
            }, o.suggest = function(e) {
                var t = this.props,
                    n = t.textField,
                    r = t.suggest,
                    o = t.minLength,
                    a = this.state.data;
                return this._deleting ? e : k.suggest(a, {
                    minLength: o,
                    textField: n,
                    searchTerm: e,
                    filter: r,
                    caseSensitive: !1
                })
            }, r
        }(c.default.Component), l.propTypes = G, l.defaultProps = {
            data: [],
            value: "",
            open: !1,
            suggest: !1,
            filter: !1,
            delay: 500,
            selectIcon: U.caretDown,
            listComponent: y.default
        }, a = A((o = u).prototype, "handleSelect", [D.widgetEditable], {
            enumerable: !0,
            initializer: function() {
                var e = this;
                return function(t, n) {
                    e.close(), (0, P.notify)(e.props.onSelect, [t, {
                        originalEvent: n
                    }]), e.change(t, !1, n), e.inputRef && e.inputRef.accept(!0), e.focus()
                }
            }
        }), i = A(o.prototype, "handleKeyDown", [D.widgetEditable], {
            enumerable: !0,
            initializer: function() {
                var e = this;
                return function(t) {
                    var n = t.key,
                        r = t.altKey,
                        o = e.props,
                        a = o.open,
                        i = o.onKeyDown,
                        s = e.state,
                        l = s.focusedItem,
                        u = s.selectedItem,
                        c = s.list;
                    if ((0, P.notify)(i, [t]), !t.defaultPrevented) {
                        var d = function(n) {
                                return null != n && e.handleSelect(n, t)
                            },
                            p = function(t) {
                                return e.setState({
                                    focusedItem: t
                                })
                            };
                        if ("End" === n && a) t.preventDefault(), p(c.last());
                        else if ("Home" === n && a) t.preventDefault(), p(c.first());
                        else if ("Escape" === n && a) t.preventDefault(), e.close();
                        else if ("Enter" === n && a) t.preventDefault(), d(e.state.focusedItem);
                        else if ("Tab" === n) e.inputRef.accept();
                        else if ("ArrowDown" === n) {
                            if (t.preventDefault(), r) return e.open();
                            a ? p(c.next(l)) : d(c.next(u))
                        } else if ("ArrowUp" === n) {
                            if (t.preventDefault(), r) return e.close();
                            a ? p(c.prev(l)) : d(c.prev(u))
                        }
                    }
                }
            }
        }), s = A(o.prototype, "toggle", [D.widgetEditable], {
            enumerable: !0,
            initializer: function() {
                var e = this;
                return function() {
                    e.focus(), e.props.open ? e.close() : e.open()
                }
            }
        }), r = o)) || r,
        z = (0, h.default)(F, {
            open: "onToggle",
            value: "onChange"
        }, ["focus"]);
    t.default = z, e.exports = t.default
}, function(e, t, n) {
    var r = n(121);
    "string" == typeof r && (r = [
        [e.i, r, ""]
    ]);
    var o = {
        hmr: !0,
        transform: void 0,
        insertInto: void 0
    };
    n(6)(r, o);
    r.locals && (e.exports = r.locals)
}, function(e, t, n) {
    var r = n(54);
    "string" == typeof r && (r = [
        [e.i, r, ""]
    ]);
    var o = {
        hmr: !0,
        transform: void 0,
        insertInto: void 0
    };
    n(6)(r, o);
    r.locals && (e.exports = r.locals)
}, function(e, t, n) {
    (e.exports = n(5)(!1)).push([e.i, "", ""])
}, function(e, t) {
    e.exports = function(e) {
        var t = "undefined" != typeof window && window.location;
        if (!t) throw new Error("fixUrls requires window.location");
        if (!e || "string" != typeof e) return e;
        var n = t.protocol + "//" + t.host,
            r = n + t.pathname.replace(/\/[^\/]*$/, "/");
        return e.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(e, t) {
            var o, a = t.trim().replace(/^"(.*)"$/, function(e, t) {
                return t
            }).replace(/^'(.*)'$/, function(e, t) {
                return t
            });
            return /^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(a) ? e : (o = 0 === a.indexOf("//") ? a : 0 === a.indexOf("/") ? n + a : r + a.replace(/^\.\//, ""), "url(" + JSON.stringify(o) + ")")
        })
    }
}, function(e, t, n) {
    "use strict";
    var r = n(57);

    function o() {}
    e.exports = function() {
        function e(e, t, n, o, a, i) {
            if (i !== r) {
                var s = new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");
                throw s.name = "Invariant Violation", s
            }
        }

        function t() {
            return e
        }
        e.isRequired = e;
        var n = {
            array: e,
            bool: e,
            func: e,
            number: e,
            object: e,
            string: e,
            symbol: e,
            any: e,
            arrayOf: t,
            element: e,
            instanceOf: t,
            node: e,
            objectOf: t,
            oneOf: t,
            oneOfType: t,
            shape: t,
            exact: t
        };
        return n.checkPropTypes = o, n.PropTypes = n, n
    }
}, function(e, t, n) {
    "use strict";
    e.exports = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"
}, function(e, t, n) {
    var r = n(59);
    "string" == typeof r && (r = [
        [e.i, r, ""]
    ]);
    var o = {
        hmr: !0,
        transform: void 0,
        insertInto: void 0
    };
    n(6)(r, o);
    r.locals && (e.exports = r.locals)
}, function(e, t, n) {
    (e.exports = n(5)(!1)).push([e.i, "/* START EVOQ COLOR PALETTE */\n/* END EVOQ COLOR PALETTE */\n/* START ATTENTION COLORS */\n/* END ATTENTION COLORS */\n/* SVG HOVER STATES */\nsvg {\n  fill: #C8C8C8;\n}\nsvg:hover {\n  fill: #6F7273;\n}\nsvg:active {\n  fill: #1E88C3;\n}\n/* END SVG HOVER STATES */\n.header-row {\n  padding: 10px 0 10px;\n  border-bottom: 1px solid #C8C8C8;\n  text-transform: uppercase;\n}\n.header-row .dnn-grid-cell {\n  padding: 0 15px;\n}\n.header-row .dnn-grid-cell.empty {\n  text-indent: -100px;\n  overflow: hidden;\n}\n", ""])
}, function(e, t, n) {
    (t = e.exports = n(5)(!1)).push([e.i, "/* START EVOQ COLOR PALETTE */\n/* END EVOQ COLOR PALETTE */\n/* START ATTENTION COLORS */\n/* END ATTENTION COLORS */\n/* SVG HOVER STATES */\nsvg {\n  fill: #C8C8C8;\n}\nsvg:hover {\n  fill: #6F7273;\n}\nsvg:active {\n  fill: #1E88C3;\n}\n/* END SVG HOVER STATES */\n.collapsible-component-users .collapsible-header-users.false {\n  border-top: 2px solid #1E88C3;\n  border-bottom: 2px solid #1E88C3;\n  margin-top: -2px;\n}\n.bGdYRolpGrDH0JPnc2Q4t {\n  padding: 15px 0 7.5px;\n  border-bottom: 1px solid #C8C8C8;\n}\n.bGdYRolpGrDH0JPnc2Q4t.closed {\n  padding: 0;\n  border-bottom: none;\n}\n.bGdYRolpGrDH0JPnc2Q4t .user-avatar {\n  text-align: center;\n}\n.bGdYRolpGrDH0JPnc2Q4t .user-avatar img {\n  border-radius: 25px;\n  width: 40px;\n}\n.bGdYRolpGrDH0JPnc2Q4t .user-detail-row {\n  float: left;\n  width: 100%;\n}\n.bGdYRolpGrDH0JPnc2Q4t .user-detail-row > div {\n  width: 100%;\n  float: left;\n}\n.bGdYRolpGrDH0JPnc2Q4t .user-emails {\n  padding-left: 11px !important;\n}\n.bGdYRolpGrDH0JPnc2Q4t .email-link > a {\n  color: #1E88C3;\n  text-decoration: none;\n}\n.bGdYRolpGrDH0JPnc2Q4t .user-names {\n  padding-left: 2px !important;\n}\n.bGdYRolpGrDH0JPnc2Q4t .user-names h6 {\n  font-size: 15px;\n}\n.bGdYRolpGrDH0JPnc2Q4t .user-names p {\n  text-transform: lowercase;\n}\n.bGdYRolpGrDH0JPnc2Q4t .user-joined {\n  padding-left: 22px !important;\n}\n.bGdYRolpGrDH0JPnc2Q4t .deleted {\n  text-decoration: line-through;\n}\n.bGdYRolpGrDH0JPnc2Q4t .extension-action {\n  margin-left: 5px;\n  float: right;\n  cursor: pointer;\n}\n.bGdYRolpGrDH0JPnc2Q4t .extension-action svg {\n  width: 20px;\n  float: left;\n  height: 20px;\n}\n.bGdYRolpGrDH0JPnc2Q4t .extension-action.false svg {\n  fill: #1E88C3;\n}\n.bGdYRolpGrDH0JPnc2Q4t .extension-action.false svg:hover {\n  fill: #4B4E4F;\n}\n.bGdYRolpGrDH0JPnc2Q4t .extension-action.more-menu {\n  position: relative;\n}\n.bGdYRolpGrDH0JPnc2Q4t .user-status svg {\n  width: 20px;\n  float: left;\n  height: 20px;\n}\n.bGdYRolpGrDH0JPnc2Q4t .user-status.grey svg {\n  fill: #C8C8C8;\n}\n.bGdYRolpGrDH0JPnc2Q4t .user-status.red svg {\n  fill: #EA2134;\n}\n.bGdYRolpGrDH0JPnc2Q4t .user-status.black svg {\n  fill: #0B1C24;\n}\n.bGdYRolpGrDH0JPnc2Q4t .dnn-grid-cell {\n  padding: 0 15px;\n}\n.bGdYRolpGrDH0JPnc2Q4t .dnn-grid-cell p {\n  word-wrap: break-word;\n}\n.bGdYRolpGrDH0JPnc2Q4t .package-name {\n  word-wrap: break-word;\n  display: inline;\n  vertical-align: top;\n}\n", ""]), t.locals = {
        extensionDetailRow: "bGdYRolpGrDH0JPnc2Q4t"
    }
}, function(e, t, n) {
    (e.exports = n(5)(!1)).push([e.i, "/* START EVOQ COLOR PALETTE */\n/* END EVOQ COLOR PALETTE */\n/* START ATTENTION COLORS */\n/* END ATTENTION COLORS */\n/* SVG HOVER STATES */\nsvg {\n  fill: #C8C8C8;\n}\nsvg:hover {\n  fill: #6F7273;\n}\nsvg:active {\n  fill: #1E88C3;\n}\n/* END SVG HOVER STATES */\n.dnn-user-menu.menu-item {\n  padding: 10px 20px;\n  cursor: pointer;\n  color: black;\n}\n.dnn-user-menu.menu-item:hover {\n  background-color: #EFF0F0;\n  color: #1E88C3;\n}\n.dnn-user-menu.menu {\n  position: absolute;\n  right: -18px;\n  top: 35px;\n  text-align: left;\n  min-width: 200px;\n  border: 1px solid #C8C8C8;\n  border-radius: 3px;\n  background-color: #FFFFFF;\n  list-style: none;\n  padding: 10px 0px;\n  box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.1);\n  z-index: 1000;\n}\n", ""])
}, function(e, t, n) {
    var r = n(63);
    "string" == typeof r && (r = [
        [e.i, r, ""]
    ]);
    var o = {
        hmr: !0,
        transform: void 0,
        insertInto: void 0
    };
    n(6)(r, o);
    r.locals && (e.exports = r.locals)
}, function(e, t, n) {
    (e.exports = n(5)(!1)).push([e.i, "/* START EVOQ COLOR PALETTE */\n/* END EVOQ COLOR PALETTE */\n/* START ATTENTION COLORS */\n/* END ATTENTION COLORS */\n/* SVG HOVER STATES */\nsvg {\n  fill: #C8C8C8;\n}\nsvg:hover {\n  fill: #6F7273;\n}\nsvg:active {\n  fill: #1E88C3;\n}\n/* END SVG HOVER STATES */\n.dnn-user-change-password {\n  background-color: #FFFFFF;\n  position: absolute;\n  width: 47%;\n  left: 30px;\n  z-index: 100;\n  box-sizing: border-box;\n  float: left;\n  border: 1px solid #C8C8C8;\n  box-shadow: 0px 0px 17px 2px rgba(0, 0, 0, 0.2);\n}\n.dnn-user-change-password .dnn-grid-cell {\n  padding: 15px;\n  margin: 0px;\n  float: left;\n  text-align: left;\n}\n.dnn-user-change-password .dnn-grid-cell .title {\n  text-transform: uppercase;\n  font-weight: bold;\n  margin-bottom: 20px;\n  float: left;\n}\n.dnn-user-change-password .dnn-grid-system .dnn-grid-cell {\n  padding: 0px 15px;\n  margin: 0px;\n}\n.dnn-user-change-password .dnn-grid-system .dnn-grid-cell .right {\n  float: right;\n}\n.dnn-user-change-password .buttons .dnn-grid-cell.leftBtn {\n  padding-right: 0px;\n  text-align: right;\n}\n.dnn-user-change-password .buttons .dnn-grid-cell.rightBtn {\n  padding-left: 30px;\n}\n", ""])
}, function(e, t, n) {
    var r = n(65);
    "string" == typeof r && (r = [
        [e.i, r, ""]
    ]);
    var o = {
        hmr: !0,
        transform: void 0,
        insertInto: void 0
    };
    n(6)(r, o);
    r.locals && (e.exports = r.locals)
}, function(e, t, n) {
    (e.exports = n(5)(!1)).push([e.i, "/* START EVOQ COLOR PALETTE */\n/* END EVOQ COLOR PALETTE */\n/* START ATTENTION COLORS */\n/* END ATTENTION COLORS */\n/* SVG HOVER STATES */\nsvg {\n  fill: #C8C8C8;\n}\nsvg:hover {\n  fill: #6F7273;\n}\nsvg:active {\n  fill: #1E88C3;\n}\n/* END SVG HOVER STATES */\n#users-container .dnn-user-menu.menu-popup {\n  position: absolute;\n}\n#users-container .dnn-user-menu .dnn-user-change-password {\n  width: 400px;\n  right: -18px;\n  top: 35px;\n  left: auto;\n}\n", ""])
}, function(e, t, n) {
    var r = n(67);
    "string" == typeof r && (r = [
        [e.i, r, ""]
    ]);
    var o = {
        hmr: !0,
        transform: void 0,
        insertInto: void 0
    };
    n(6)(r, o);
    r.locals && (e.exports = r.locals)
}, function(e, t, n) {
    (e.exports = n(5)(!1)).push([e.i, "", ""])
}, function(e, t, n) {
    (t = e.exports = n(5)(!1)).push([e.i, "/* START EVOQ COLOR PALETTE */\n/* END EVOQ COLOR PALETTE */\n/* START ATTENTION COLORS */\n/* END ATTENTION COLORS */\n/* SVG HOVER STATES */\nsvg {\n  fill: #C8C8C8;\n}\nsvg:hover {\n  fill: #6F7273;\n}\nsvg:active {\n  fill: #1E88C3;\n}\n/* END SVG HOVER STATES */\n._2OSLkzbQ6tig00E5g1sn8J {\n  box-sizing: border-box;\n  margin-top: 10px;\n}\n._2OSLkzbQ6tig00E5g1sn8J .new-user-box {\n  width: 100%;\n  background-color: white;\n  padding: 10px 0;\n}\n._2OSLkzbQ6tig00E5g1sn8J .new-user-box .box-title {\n  margin-bottom: 15px;\n  text-transform: uppercase;\n}\n._2OSLkzbQ6tig00E5g1sn8J .new-user-box .dnn-grid-system.with-right-border.bottom-half {\n  padding-top: 25px;\n}\n._2OSLkzbQ6tig00E5g1sn8J .new-user-box .dnn-switch-container {\n  width: 100%;\n}\n._2OSLkzbQ6tig00E5g1sn8J .new-user-box .dnn-switch-container .dnn-switch {\n  float: right;\n}\n._2OSLkzbQ6tig00E5g1sn8J .new-user-box .dnn-single-line-input-with-error .__react_component_tooltip {\n  max-width: 200px;\n}\n._2OSLkzbQ6tig00E5g1sn8J .new-user-box .dnn-grid-cell {\n  padding: 10px 15px;\n  box-sizing: border-box;\n}\n._2OSLkzbQ6tig00E5g1sn8J .new-user-box .dnn-grid-cell > hr {\n  border: none;\n  height: 1px;\n  color: #C8C8C8;\n  background-color: #C8C8C8;\n}\n._2OSLkzbQ6tig00E5g1sn8J .new-user-box .dnn-grid-cell .version-dropdown {\n  width: 31.1%;\n  box-sizing: border-box;\n  margin-right: 10px;\n  vertical-align: bottom;\n}\n._2OSLkzbQ6tig00E5g1sn8J .new-user-box .dnn-grid-cell .version-dropdown:last-child {\n  margin-right: 0;\n}\n._2OSLkzbQ6tig00E5g1sn8J .new-user-box .dnn-grid-cell.modal-footer {\n  text-align: center;\n}\n._2OSLkzbQ6tig00E5g1sn8J .new-user-box .dnn-grid-cell.modal-footer button {\n  min-width: 100px;\n  margin-right: 10px;\n}\n._2OSLkzbQ6tig00E5g1sn8J .new-user-box .email-notification-line {\n  text-align: center;\n}\n._2OSLkzbQ6tig00E5g1sn8J .new-user-box .email-notification-line .dnn-checkbox-container.right {\n  float: none;\n}\n", ""]), t.locals = {
        newExtensionModal: "_2OSLkzbQ6tig00E5g1sn8J"
    }
}, function(e, t, n) {
    var r = n(70);
    "string" == typeof r && (r = [
        [e.i, r, ""]
    ]);
    var o = {
        hmr: !0,
        transform: void 0,
        insertInto: void 0
    };
    n(6)(r, o);
    r.locals && (e.exports = r.locals)
}, function(e, t, n) {
    (e.exports = n(5)(!1)).push([e.i, "/* START EVOQ COLOR PALETTE */\n/* END EVOQ COLOR PALETTE */\n/* START ATTENTION COLORS */\n/* END ATTENTION COLORS */\n/* SVG HOVER STATES */\nsvg {\n  fill: #C8C8C8;\n}\nsvg:hover {\n  fill: #6F7273;\n}\nsvg:active {\n  fill: #1E88C3;\n}\n/* END SVG HOVER STATES */\n.passwordContainer {\n  position: relative;\n}\n.passwordStrength {\n  line-height: 1.5pt;\n  height: 1.5pt;\n  position: relative;\n  top: -18px;\n}\n.passwordStrength.weak {\n  background-color: red;\n  width: 25%;\n}\n.passwordStrength.fair {\n  background-color: #f6d500;\n  width: 75%;\n}\n.passwordStrength.strong {\n  background-color: green;\n  width: 100%;\n}\n.passwordStrengthLabel {\n  position: absolute;\n  bottom: 30px;\n  right: 1em;\n  font-weight: 700;\n  text-align: right;\n}\n.passwordStrengthLabel.weak {\n  color: red;\n}\n.passwordStrengthLabel.fair {\n  color: #f6d500;\n}\n.passwordStrengthLabel.strong {\n  color: green;\n}\n", ""])
}, function(e, t, n) {
    (t = e.exports = n(5)(!1)).push([e.i, "/* START EVOQ COLOR PALETTE */\n/* END EVOQ COLOR PALETTE */\n/* START ATTENTION COLORS */\n/* END ATTENTION COLORS */\n/* SVG HOVER STATES */\nsvg {\n  fill: #C8C8C8;\n}\nsvg:hover {\n  fill: #6F7273;\n}\nsvg:active {\n  fill: #1E88C3;\n}\n/* END SVG HOVER STATES */\n._1rTdzk7de1nTiRWOkYYec7 {\n  box-sizing: border-box;\n  float: left;\n  margin: 15px 0px;\n}\n._1rTdzk7de1nTiRWOkYYec7 .dnn-grid-cell {\n  margin: 5px 0px;\n  float: left;\n  text-align: left;\n}\n._1rTdzk7de1nTiRWOkYYec7 .dnn-grid-cell .outer-box {\n  padding: 10px 30px;\n}\n._1rTdzk7de1nTiRWOkYYec7 .dnn-grid-cell .outer-box.right {\n  border-left: 1px solid #C8C8C8;\n}\n._1rTdzk7de1nTiRWOkYYec7 .dnn-grid-cell .outer-box.right .dnn-grid-system {\n  margin: 10px 0px;\n}\n._1rTdzk7de1nTiRWOkYYec7 .dnn-grid-cell .outer-box.right .dnn-grid-system.first {\n  margin-bottom: 4.5px;\n  margin-right: 0px;\n  margin-left: 0px;\n  margin-top: 0px;\n}\n._1rTdzk7de1nTiRWOkYYec7 .dnn-grid-cell .outer-box.right .dnn-grid-system .dnn-grid-cell {\n  padding: 0px;\n  margin: 0px;\n}\n._1rTdzk7de1nTiRWOkYYec7 .dnn-grid-cell.no-padding {\n  padding: 0px;\n}\n._1rTdzk7de1nTiRWOkYYec7 .dnn-grid-cell .title {\n  text-transform: uppercase;\n  font-weight: bold;\n  margin-bottom: 20px;\n  float: left;\n}\n._1rTdzk7de1nTiRWOkYYec7 .dnn-grid-cell .link {\n  padding: 0px;\n  font-weight: bold;\n  cursor: pointer;\n  color: #1E88C3;\n}\n._1rTdzk7de1nTiRWOkYYec7 .dnn-grid-cell .link:active,\n._1rTdzk7de1nTiRWOkYYec7 .dnn-grid-cell .link:hover {\n  color: #21A3DA;\n}\n._1rTdzk7de1nTiRWOkYYec7 .dnn-grid-cell .link.disabled {\n  color: #C8C8C8;\n  cursor: default;\n}\n._1rTdzk7de1nTiRWOkYYec7 .dnn-grid-cell .link:visited {\n  color: #226F9B;\n}\n._1rTdzk7de1nTiRWOkYYec7 .dnn-grid-cell span.importantNote {\n  text-transform: uppercase;\n  color: #EA2134;\n  display: block;\n  font-weight: bold;\n}\n._1rTdzk7de1nTiRWOkYYec7 .buttons .dnn-grid-cell.leftBtn {\n  padding-right: 5px;\n  text-align: right;\n}\n._1rTdzk7de1nTiRWOkYYec7 .buttons .dnn-grid-cell.rightBtn {\n  padding-left: 10px;\n}\n._1rTdzk7de1nTiRWOkYYec7 .isloading .input-tooltip-container input {\n  pointer-events: none;\n  border-color: #C8C8C8;\n}\n", ""]), t.locals = {
        userSettings: "_1rTdzk7de1nTiRWOkYYec7"
    }
}, function(e, t, n) {
    var r = n(73);
    "string" == typeof r && (r = [
        [e.i, r, ""]
    ]);
    var o = {
        hmr: !0,
        transform: void 0,
        insertInto: void 0
    };
    n(6)(r, o);
    r.locals && (e.exports = r.locals)
}, function(e, t, n) {
    (e.exports = n(5)(!1)).push([e.i, "/* START EVOQ COLOR PALETTE */\n/* END EVOQ COLOR PALETTE */\n/* START ATTENTION COLORS */\n/* END ATTENTION COLORS */\n/* SVG HOVER STATES */\nsvg {\n  fill: #C8C8C8;\n}\nsvg:hover {\n  fill: #6F7273;\n}\nsvg:active {\n  fill: #1E88C3;\n}\n/* END SVG HOVER STATES */\n.user-detail-row .edit-profile {\n  float: left;\n  padding: 0px;\n  width: 100%;\n  border: 0px;\n  min-height: 700px;\n  padding: 10px 25px;\n}\n", ""])
}, function(e, t, n) {
    var r = n(75);
    "string" == typeof r && (r = [
        [e.i, r, ""]
    ]);
    var o = {
        hmr: !0,
        transform: void 0,
        insertInto: void 0
    };
    n(6)(r, o);
    r.locals && (e.exports = r.locals)
}, function(e, t, n) {
    (e.exports = n(5)(!1)).push([e.i, "/* START EVOQ COLOR PALETTE */\n/* END EVOQ COLOR PALETTE */\n/* START ATTENTION COLORS */\n/* END ATTENTION COLORS */\n/* SVG HOVER STATES */\nsvg {\n  fill: #C8C8C8;\n}\nsvg:hover {\n  fill: #6F7273;\n}\nsvg:active {\n  fill: #1E88C3;\n}\n/* END SVG HOVER STATES */\n#users-container .user-role-row {\n  width: 100%;\n  float: left;\n  padding: 13px 20px;\n  box-sizing: border-box;\n  text-align: left;\n}\n#users-container .user-role-row:not(:last-child) {\n  border-bottom: 1px solid #C8C8C8;\n}\n#users-container .user-role-row div.edit-row a {\n  display: inline-block;\n}\n#users-container .user-role-row .dnn-grid-cell {\n  box-sizing: border-box;\n}\n#users-container .user-role-row .dnn-grid-cell .actions {\n  float: right;\n  box-sizing: border-box;\n  height: 20px;\n  text-align: right;\n}\n#users-container .user-role-row .dnn-grid-cell .actions > div {\n  text-align: left;\n  float: left;\n}\n#users-container .user-role-row .dnn-grid-cell .actions span {\n  float: left;\n}\n#users-container .user-role-row .dnn-grid-cell .actions span .dnn-day-picker {\n  height: 19px;\n}\n#users-container .user-role-row .dnn-grid-cell .actions span .dnn-day-picker .calendar-icon {\n  opacity: 0;\n  width: 19px;\n  height: 19px;\n}\n#users-container .user-role-row .dnn-grid-cell .actions span .dnn-day-picker .calendar-icon.active {\n  opacity: 1;\n}\n#users-container .user-role-row .dnn-grid-cell .actions span a svg {\n  width: 23px;\n  height: 23px;\n}\n#users-container .user-role-row .dnn-grid-cell .actions a {\n  float: left;\n  opacity: 0;\n}\n#users-container .user-role-row .dnn-grid-cell .actions:hover a {\n  display: inline-block;\n}\n#users-container .user-role-row .dnn-grid-cell .actions div.edit-row a {\n  display: inline-block;\n}\n#users-container .user-role-row:hover .dnn-grid-cell .actions span .dnn-day-picker .calendar-icon {\n  opacity: 1;\n}\n#users-container .user-role-row:hover .dnn-grid-cell .actions a {\n  opacity: 1;\n}\n", ""])
}, function(e, t, n) {
    var r = n(77);
    "string" == typeof r && (r = [
        [e.i, r, ""]
    ]);
    var o = {
        hmr: !0,
        transform: void 0,
        insertInto: void 0
    };
    n(6)(r, o);
    r.locals && (e.exports = r.locals)
}, function(e, t, n) {
    (e.exports = n(5)(!1)).push([e.i, '/* START EVOQ COLOR PALETTE */\n/* END EVOQ COLOR PALETTE */\n/* START ATTENTION COLORS */\n/* END ATTENTION COLORS */\n/* SVG HOVER STATES */\nsvg {\n  fill: #C8C8C8;\n}\nsvg:hover {\n  fill: #6F7273;\n}\nsvg:active {\n  fill: #1E88C3;\n}\n/* END SVG HOVER STATES */\n#users-container .userroles-form-form {\n  width: 80%;\n  margin: 20px 10%;\n  float: left;\n  box-sizing: border-box;\n}\n#users-container .userroles-form-form .user-roles-list {\n  float: left;\n  width: 100%;\n  margin: 15px 0;\n  display: table;\n  cursor: auto;\n  box-sizing: border-box;\n  border: 1px solid #C8C8C8;\n  text-align: left;\n}\n#users-container .userroles-form-form .user-roles-list .user-role-body {\n  color: #6F7273;\n}\n#users-container .userroles-form-form .user-roles-list .user-role-body .no-roles-row {\n  width: 100%;\n  float: left;\n  text-align: center;\n  font-weight: bold;\n  padding: 13px 20px;\n  box-sizing: border-box;\n}\n#users-container .userroles-form-form .user-roles-list .user-role-header-row {\n  display: table;\n  border-bottom: 1px solid #C8C8C8;\n  width: 100%;\n  float: left;\n  position: relative;\n  padding: 15px 20px;\n  box-sizing: border-box;\n  text-transform: uppercase;\n}\n#users-container .userroles-form-form .user-roles-list-paging {\n  text-align: left;\n}\n#users-container .userroles-form-form .header {\n  width: 100%;\n  float: left;\n  box-sizing: border-box;\n}\n#users-container .userroles-form-form .header .header-title {\n  text-align: left;\n  width: 100%;\n  font-weight: bold;\n  display: inline-block;\n  text-transform: uppercase;\n  margin-top: 10px;\n  margin-bottom: 10px;\n}\n#users-container .userroles-form-form .header .add-box {\n  width: 100%;\n  float: left;\n  box-sizing: border-box;\n  border-bottom: 1px solid #C8C8C8;\n}\n#users-container .userroles-form-form .header .add-box .dnn-grid-cell {\n  padding: 0px;\n}\n#users-container .userroles-form-form .header .add-box .send-email-box {\n  width: 100%;\n  float: left;\n}\n#users-container .userroles-form-form .header .add-box .send-email-box .dnn-checkbox-container {\n  float: left;\n  margin-top: 10px;\n  margin-right: 10px;\n}\n#users-container .userroles-form-form .header .add-box .send-email-box .dnn-checkbox-container .checkbox {\n  margin-bottom: 0px;\n}\n#users-container .userroles-form-form .header .add-box .send-email-box label {\n  color: #C8C8C8;\n}\n#users-container .userroles-form-form .header .add-box span {\n  float: left;\n  width: 100%;\n  display: inline-block;\n  border-left: 1px solid #C8C8C8;\n}\n#users-container .userroles-form-form .header .add-box span .rw-combobox {\n  float: left;\n  width: 250px;\n  height: 34px;\n  line-height: 34px;\n  vertical-align: middle;\n  padding: 0;\n  border: none;\n  color: #46292B;\n  border-radius: 0;\n  display: inline-block;\n  box-shadow: none;\n  background: transparent;\n}\n#users-container .userroles-form-form .header .add-box span .rw-combobox .rw-widget-picker.rw-widget-container {\n  height: 32px;\n  line-height: 32px;\n  border: none;\n}\n#users-container .userroles-form-form .header .add-box span .rw-combobox .rw-widget-picker.rw-widget-container input {\n  height: inherit;\n  line-height: inherit;\n  border: inherit;\n}\n#users-container .userroles-form-form .header .add-box span .rw-combobox button {\n  display: none;\n}\n#users-container .userroles-form-form .header .add-box span .rw-combobox ::-webkit-input-placeholder {\n  /* WebKit, Blink, Edge */\n  color: #C8C8C8;\n}\n#users-container .userroles-form-form .header .add-box span .rw-combobox :-moz-placeholder {\n  /* Mozilla Firefox 4 to 18 */\n  color: #C8C8C8;\n  opacity: 1;\n}\n#users-container .userroles-form-form .header .add-box span .rw-combobox ::-moz-placeholder {\n  /* Mozilla Firefox 19+ */\n  color: #C8C8C8;\n  opacity: 1;\n}\n#users-container .userroles-form-form .header .add-box span .rw-combobox :-ms-input-placeholder {\n  /* Internet Explorer 10-11 */\n  color: #C8C8C8;\n}\n#users-container .userroles-form-form .header .add-box span .rw-combobox input {\n  -webkit-box-shadow: none;\n  padding: 0 0 0 12px;\n  height: 100%;\n  vertical-align: top;\n  background-color: transparent;\n}\n#users-container .userroles-form-form .header .add-box span .rw-combobox input::-ms-clear {\n  display: none;\n}\n#users-container .userroles-form-form .header .add-box span .rw-combobox .rw-popup-container {\n  box-shadow: none;\n}\n#users-container .userroles-form-form .header .add-box span .rw-combobox .rw-popup-container .rw-popup {\n  border-radius: 0px;\n  border: 1px solid #C8C8C8;\n  box-shadow: none;\n}\n#users-container .userroles-form-form .header .add-box span .rw-combobox .rw-popup-container .rw-popup ul.rw-list {\n  margin: 0;\n  padding: 0;\n}\n#users-container .userroles-form-form .header .add-box span .rw-combobox .rw-popup-container .rw-popup ul.rw-list li {\n  padding-left: 15px;\n  height: 30px;\n  line-height: 26px;\n  color: #6F7273;\n  border: none;\n  outline: none;\n  white-space: nowrap;\n  overflow-x: hidden;\n  text-overflow: ellipsis;\n}\n#users-container .userroles-form-form .header .add-box span .rw-combobox .rw-popup-container .rw-popup ul.rw-list li:hover {\n  background-color: #EFF0F0;\n  color: #1E88C3;\n}\n#users-container .userroles-form-form .header .add-box span .rw-combobox .rw-popup-container .rw-popup ul.rw-list li.rw-state-selected {\n  background-color: transparent;\n  color: #1E88C3;\n}\n#users-container .userroles-form-form .header .add-box span .add-role-button {\n  float: right;\n  text-align: right;\n  width: auto;\n  font-weight: bolder;\n  overflow: hidden;\n  cursor: pointer;\n  box-sizing: border-box;\n  padding-top: 10px;\n}\n#users-container .userroles-form-form .header .add-box span .add-role-button svg {\n  fill: #6F7273;\n}\n#users-container .userroles-form-form .header .add-box span .add-role-button span {\n  border: none;\n}\n#users-container .userroles-form-form .header .add-box span .add-role-button .extension-action {\n  float: left;\n}\n#users-container .userroles-form-form .header .add-box span button[role="secondary"] {\n  vertical-align: middle;\n  margin: 0 0 0 10px;\n}\n', ""])
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.default = function e(t, n, a) {
        void 0 === a && (a = []);
        var s = t.displayName || t.name || "Component";
        var l = o.isReactComponent(t);
        var u = Object.keys(n);
        var c = u.map(o.defaultKey);
        !l && a.length && invariant(!1);
        var d = function(e) {
            var a, s;

            function d() {
                for (var t, r = arguments.length, o = new Array(r), a = 0; a < r; a++) o[a] = arguments[a];
                return (t = e.call.apply(e, [this].concat(o)) || this).handlers = Object.create(null), u.forEach(function(e) {
                    var r = n[e];
                    t.handlers[r] = function(n) {
                        if (t.props[r]) {
                            var o;
                            t._notifying = !0;
                            for (var a = arguments.length, i = new Array(a > 1 ? a - 1 : 0), s = 1; s < a; s++) i[s - 1] = arguments[s];
                            (o = t.props)[r].apply(o, [n].concat(i)), t._notifying = !1
                        }
                        t._values[e] = n, t.unmounted || t.forceUpdate()
                    }
                }), l && (t.attachRef = function(e) {
                    t.inner = e
                }), t
            }
            s = e, (a = d).prototype = Object.create(s.prototype), a.prototype.constructor = a, a.__proto__ = s;
            var p = d.prototype;
            return p.shouldComponentUpdate = function() {
                return !this._notifying
            }, p.componentWillMount = function() {
                var e = this,
                    t = this.props;
                this._values = Object.create(null), u.forEach(function(n) {
                    e._values[n] = t[o.defaultKey(n)]
                })
            }, p.componentWillReceiveProps = function(e) {
                var t = this,
                    n = this.props;
                u.forEach(function(r) {
                    !o.isProp(e, r) && o.isProp(n, r) && (t._values[r] = e[o.defaultKey(r)])
                })
            }, p.componentWillUnmount = function() {
                this.unmounted = !0
            }, p.getControlledInstance = function() {
                return this.inner
            }, p.render = function() {
                var e = this,
                    n = i({}, this.props);
                c.forEach(function(e) {
                    delete n[e]
                });
                var o = {};
                return u.forEach(function(t) {
                    var n = e.props[t];
                    o[t] = void 0 !== n ? n : e._values[t]
                }), r.default.createElement(t, i({}, n, o, this.handlers, {
                    ref: this.attachRef
                }))
            }, d
        }(r.default.Component);
        d.displayName = "Uncontrolled(" + s + ")";
        d.propTypes = o.uncontrolledPropTypes(n, s);
        a.forEach(function(e) {
            d.prototype[e] = function() {
                var t;
                return (t = this.inner)[e].apply(t, arguments)
            }
        });
        d.ControlledComponent = t;
        d.deferControlTo = function(t, r, o) {
            return void 0 === r && (r = {}), e(t, i({}, n, r), o)
        };
        return d
    };
    var r = a(n(0)),
        o = (a(n(17)), function(e) {
            if (e && e.__esModule) return e;
            var t = {};
            if (null != e)
                for (var n in e)
                    if (Object.prototype.hasOwnProperty.call(e, n)) {
                        var r = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(e, n) : {};
                        r.get || r.set ? Object.defineProperty(t, n, r) : t[n] = e[n]
                    } return t.default = e, t
        }(n(79)));

    function a(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }

    function i() {
        return (i = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        }).apply(this, arguments)
    }
    e.exports = t.default
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.uncontrolledPropTypes = function(e, t) {
        var n = {};
        return Object.keys(e).forEach(function(e) {
            n[a(e)] = o
        }), n
    }, t.isProp = function(e, t) {
        return void 0 !== e[t]
    }, t.defaultKey = a, t.isReactComponent = function(e) {
        return !!(e && e.prototype && e.prototype.isReactComponent)
    };
    var r;
    (r = n(17)) && r.__esModule;
    var o = function() {};

    function a(e) {
        return "default" + e.charAt(0).toUpperCase() + e.substr(1)
    }
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.default = void 0;
    var r = i(n(0)),
        o = i(n(2)),
        a = i(n(7));

    function i(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }

    function s() {
        return (s = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        }).apply(this, arguments)
    }
    var l = function(e) {
        var t, n;

        function o() {
            return e.apply(this, arguments) || this
        }
        return n = e, (t = o).prototype = Object.create(n.prototype), t.prototype.constructor = t, t.__proto__ = n, o.prototype.render = function() {
            var e = this.props,
                t = e.className,
                n = e.tabIndex,
                o = e.focused,
                i = e.open,
                l = e.dropUp,
                u = e.disabled,
                c = e.readOnly,
                d = e.autofilling,
                p = e.isRtl,
                f = void 0 === p ? this.context.isRtl : p,
                h = function(e, t) {
                    if (null == e) return {};
                    var n, r, o = {},
                        a = Object.keys(e);
                    for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) >= 0 || (o[n] = e[n]);
                    if (Object.getOwnPropertySymbols) {
                        var i = Object.getOwnPropertySymbols(e);
                        for (r = 0; r < i.length; r++) n = i[r], t.indexOf(n) >= 0 || Object.prototype.propertyIsEnumerable.call(e, n) && (o[n] = e[n])
                    }
                    return o
                }(e, ["className", "tabIndex", "focused", "open", "dropUp", "disabled", "readOnly", "autofilling", "isRtl"]);
            return n = null != n ? n : "-1", r.default.createElement("div", s({}, h, {
                tabIndex: n,
                className: (0, a.default)(t, "rw-widget", f && "rw-rtl", u && "rw-state-disabled", c && "rw-state-readonly", o && "rw-state-focus", d && "rw-webkit-autofill", i && "rw-open" + (l ? "-up" : ""))
            }))
        }, o
    }(r.default.Component);
    l.contextTypes = {
        isRtl: o.default.bool
    }, l.propTypes = {
        tabIndex: o.default.node,
        focused: o.default.bool,
        disabled: o.default.bool,
        readOnly: o.default.bool,
        autofilling: o.default.bool,
        open: o.default.bool,
        dropUp: o.default.bool,
        isRtl: o.default.bool
    };
    var u = l;
    t.default = u, e.exports = t.default
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.default = void 0;
    var r = i(n(0)),
        o = i(n(2)),
        a = i(n(7));

    function i(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }

    function s() {
        return (s = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        }).apply(this, arguments)
    }
    var l = function(e) {
        var t, n;

        function o() {
            return e.apply(this, arguments) || this
        }
        return n = e, (t = o).prototype = Object.create(n.prototype), t.prototype.constructor = t, t.__proto__ = n, o.prototype.render = function() {
            var e = this.props,
                t = e.open,
                n = e.dropUp,
                o = e.className,
                i = e.disabled,
                l = e.readOnly,
                u = e.focused,
                c = function(e, t) {
                    if (null == e) return {};
                    var n, r, o = {},
                        a = Object.keys(e);
                    for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) >= 0 || (o[n] = e[n]);
                    if (Object.getOwnPropertySymbols) {
                        var i = Object.getOwnPropertySymbols(e);
                        for (r = 0; r < i.length; r++) n = i[r], t.indexOf(n) >= 0 || Object.prototype.propertyIsEnumerable.call(e, n) && (o[n] = e[n])
                    }
                    return o
                }(e, ["open", "dropUp", "className", "disabled", "readOnly", "focused"]),
                d = "rw-open" + (n ? "-up" : "");
            return r.default.createElement("div", s({}, c, {
                className: (0, a.default)(o, "rw-widget-picker", "rw-widget-container", t && d, i && "rw-state-disabled", l && "rw-state-readonly", u && "rw-state-focus")
            }))
        }, o
    }(r.default.Component);
    l.propTypes = {
        tabIndex: o.default.node,
        focused: o.default.bool,
        disabled: o.default.bool,
        readOnly: o.default.bool,
        open: o.default.bool,
        dropUp: o.default.bool,
        picker: o.default.bool
    };
    var u = l;
    t.default = u, e.exports = t.default
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.default = void 0;
    var r = m(n(2)),
        o = m(n(0)),
        a = n(8),
        i = h(n(13)),
        s = h(n(18)),
        l = n(19),
        u = n(27),
        c = m(n(88)),
        d = m(n(89)),
        p = m(n(90)),
        f = n(29);

    function h(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
            for (var n in e)
                if (Object.prototype.hasOwnProperty.call(e, n)) {
                    var r = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(e, n) : {};
                    r.get || r.set ? Object.defineProperty(t, n, r) : t[n] = e[n]
                } return t.default = e, t
    }

    function m(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }

    function g() {
        return (g = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        }).apply(this, arguments)
    }
    var y = {
            data: r.default.array,
            dataState: r.default.shape({
                sortedKeys: r.default.array,
                groups: r.default.object,
                data: r.default.array,
                sequentialData: r.default.array
            }),
            valueAccessor: i.accessor,
            textAccessor: i.accessor,
            onSelect: r.default.func,
            onMove: r.default.func,
            activeId: r.default.string,
            itemComponent: i.elementType,
            groupComponent: i.elementType,
            optionComponent: i.elementType,
            renderItem: r.default.func,
            renderGroup: r.default.func,
            focusedItem: r.default.any,
            selectedItem: r.default.any,
            searchTerm: r.default.string,
            isDisabled: r.default.func.isRequired,
            messages: r.default.shape({
                emptyList: r.default.func.isRequired
            })
        },
        v = {
            onSelect: function() {},
            data: [],
            dataState: {},
            optionComponent: d.default
        },
        b = function(e) {
            var t, n;

            function r() {
                for (var t, n = arguments.length, r = new Array(n), a = 0; a < n; a++) r[a] = arguments[a];
                return (t = e.call.apply(e, [this].concat(r)) || this).renderItem = function(e) {
                    var n = e.item,
                        r = function(e, t) {
                            if (null == e) return {};
                            var n, r, o = {},
                                a = Object.keys(e);
                            for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) >= 0 || (o[n] = e[n]);
                            if (Object.getOwnPropertySymbols) {
                                var i = Object.getOwnPropertySymbols(e);
                                for (r = 0; r < i.length; r++) n = i[r], t.indexOf(n) >= 0 || Object.prototype.propertyIsEnumerable.call(e, n) && (o[n] = e[n])
                            }
                            return o
                        }(e, ["item"]),
                        a = t.props,
                        i = a.isDisabled,
                        s = a.renderItem,
                        l = a.textAccessor,
                        u = a.valueAccessor,
                        c = t.props.itemComponent;
                    return s ? s(g({
                        item: n
                    }, r)) : c ? o.default.createElement(c, g({
                        item: n,
                        value: u(n),
                        text: l(n),
                        disabled: i(n)
                    }, r)) : l(n)
                }, t.renderGroup = function(e) {
                    var n = t.props,
                        r = n.renderGroup,
                        a = n.groupComponent;
                    return r ? r({
                        group: e
                    }) : a ? o.default.createElement(a, {
                        item: e
                    }) : e
                }, t
            }
            n = e, (t = r).prototype = Object.create(n.prototype), t.prototype.constructor = t, t.__proto__ = n;
            var i = r.prototype;
            return i.componentDidMount = function() {
                this.move()
            }, i.componentDidUpdate = function() {
                this.move()
            }, i.mapItems = function(e) {
                var t = this.props,
                    n = t.data,
                    r = t.dataState,
                    o = r.sortedKeys,
                    a = r.groups;
                if (!a) return n.map(function(t, n) {
                    return e(t, n, !1)
                });
                var i = -1;
                return o.reduce(function(t, n) {
                    var r = a[n];
                    return t.concat(e(n, i, !0), r.map(function(t) {
                        return e(t, ++i, !1)
                    }))
                }, [])
            }, i.move = function() {
                var e = this.props,
                    t = e.focusedItem,
                    n = e.onMove,
                    r = e.data,
                    o = e.dataState,
                    i = (0, a.findDOMNode)(this),
                    s = function(e, t, n, r) {
                        var o = r.groups,
                            a = r.sortedKeys;
                        if (!o) return n.indexOf(e);
                        var i = -1,
                            s = -1;
                        return a.some(function(t) {
                            var n = o[t].indexOf(e);
                            if (i++, -1 !== n) return s = i + n + 1, !0;
                            i += o[t].length
                        }), s
                    }(t, 0, r, o),
                    u = i.children[s];
                u && (0, l.notify)(n, [u, i, t])
            }, i.renderOption = function(e, t) {
                var n = this.props,
                    r = n.activeId,
                    a = n.focusedItem,
                    i = n.selectedItem,
                    s = n.onSelect,
                    l = n.isDisabled,
                    u = n.searchTerm,
                    c = n.optionComponent,
                    d = a === e;
                return o.default.createElement(c, {
                    dataItem: e,
                    key: "item_" + t,
                    index: t,
                    activeId: r,
                    focused: d,
                    onSelect: s,
                    disabled: l(e),
                    selected: i === e
                }, this.renderItem({
                    item: e,
                    index: t,
                    searchTerm: u
                }))
            }, i.render = function() {
                var e = this,
                    t = this.props,
                    n = t.className,
                    r = t.messages,
                    a = s.pickElementProps(this),
                    i = (0, f.getMessages)(r).emptyList;
                return o.default.createElement(c.default, g({}, a, {
                    className: n,
                    emptyListMessage: i(this.props)
                }), this.mapItems(function(t, n, r) {
                    return r ? o.default.createElement(p.default, {
                        key: "group_" + t,
                        group: t
                    }, e.renderGroup(t)) : e.renderOption(t, n)
                }))
            }, r
        }(o.default.Component);
    b.getDataState = u.defaultGetDataState, b.propTypes = y, b.defaultProps = v;
    var w = b;
    t.default = w, e.exports = t.default
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = i(n(0)),
        o = n(84),
        a = i(n(26));

    function i(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }
    t.default = (0, a.default)(function(e, t, n, a, i) {
        var s = e[t];
        return r.default.isValidElement(s) ? new Error("Invalid " + a + " `" + i + "` of type ReactElement supplied to `" + n + "`,expected an element type (a string , component class, or function component).") : (0, o.isValidElementType)(s) ? null : new Error("Invalid " + a + " `" + i + "` of value `" + s + "` supplied to `" + n + "`, expected an element type (a string , component class, or function component).")
    }), e.exports = t.default
}, function(e, t, n) {
    "use strict";
    e.exports = n(85)
}, function(e, t, n) {
    "use strict";
    /** @license React v16.8.6
     * react-is.production.min.js
     *
     * Copyright (c) Facebook, Inc. and its affiliates.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = "function" == typeof Symbol && Symbol.for,
        o = r ? Symbol.for("react.element") : 60103,
        a = r ? Symbol.for("react.portal") : 60106,
        i = r ? Symbol.for("react.fragment") : 60107,
        s = r ? Symbol.for("react.strict_mode") : 60108,
        l = r ? Symbol.for("react.profiler") : 60114,
        u = r ? Symbol.for("react.provider") : 60109,
        c = r ? Symbol.for("react.context") : 60110,
        d = r ? Symbol.for("react.async_mode") : 60111,
        p = r ? Symbol.for("react.concurrent_mode") : 60111,
        f = r ? Symbol.for("react.forward_ref") : 60112,
        h = r ? Symbol.for("react.suspense") : 60113,
        m = r ? Symbol.for("react.memo") : 60115,
        g = r ? Symbol.for("react.lazy") : 60116;

    function y(e) {
        if ("object" == typeof e && null !== e) {
            var t = e.$$typeof;
            switch (t) {
                case o:
                    switch (e = e.type) {
                        case d:
                        case p:
                        case i:
                        case l:
                        case s:
                        case h:
                            return e;
                        default:
                            switch (e = e && e.$$typeof) {
                                case c:
                                case f:
                                case u:
                                    return e;
                                default:
                                    return t
                            }
                    }
                    case g:
                    case m:
                    case a:
                        return t
            }
        }
    }

    function v(e) {
        return y(e) === p
    }
    t.typeOf = y, t.AsyncMode = d, t.ConcurrentMode = p, t.ContextConsumer = c, t.ContextProvider = u, t.Element = o, t.ForwardRef = f, t.Fragment = i, t.Lazy = g, t.Memo = m, t.Portal = a, t.Profiler = l, t.StrictMode = s, t.Suspense = h, t.isValidElementType = function(e) {
        return "string" == typeof e || "function" == typeof e || e === i || e === p || e === l || e === s || e === h || "object" == typeof e && null !== e && (e.$$typeof === g || e.$$typeof === m || e.$$typeof === u || e.$$typeof === c || e.$$typeof === f)
    }, t.isAsyncMode = function(e) {
        return v(e) || y(e) === d
    }, t.isConcurrentMode = v, t.isContextConsumer = function(e) {
        return y(e) === c
    }, t.isContextProvider = function(e) {
        return y(e) === u
    }, t.isElement = function(e) {
        return "object" == typeof e && null !== e && e.$$typeof === o
    }, t.isForwardRef = function(e) {
        return y(e) === f
    }, t.isFragment = function(e) {
        return y(e) === i
    }, t.isLazy = function(e) {
        return y(e) === g
    }, t.isMemo = function(e) {
        return y(e) === m
    }, t.isPortal = function(e) {
        return y(e) === a
    }, t.isProfiler = function(e) {
        return y(e) === l
    }, t.isStrictMode = function(e) {
        return y(e) === s
    }, t.isSuspense = function(e) {
        return y(e) === h
    }
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.setNumber = function(e) {
        var t = e.format,
            n = e.parse,
            r = e.formats,
            o = e.propType,
            s = void 0 === o ? a : o,
            u = e.decimalChar,
            c = void 0 === u ? function() {
                return "."
            } : u,
            d = e.precision,
            h = void 0 === d ? function() {
                return null
            } : d;
        f(i, r), l = {
            formats: r,
            precision: h,
            decimalChar: c,
            propType: s,
            format: p(t),
            parse: function(e, t, r) {
                var o = n.call(this, e, t, r);
                return null != o && "number" != typeof o && invariant(!1), o
            }
        }
    }, t.setDate = function(e) {
        var t = e.formats,
            n = e.format,
            r = e.parse,
            o = e.firstOfWeek,
            i = e.propType,
            l = void 0 === i ? a : i;
        f(s, t), c = {
            formats: t,
            propType: l,
            firstOfWeek: o,
            format: p(n),
            parse: function(e, t, n) {
                var o = r.call(this, e, t, n);
                return null == o || o instanceof Date && !isNaN(o.getTime()) || invariant(!1), o
            }
        }
    }, t.date = t.number = void 0;
    o(n(17)), n(14);
    var r = o(n(2));

    function o(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }
    var a = r.default.oneOfType([r.default.string, r.default.func]),
        i = ["default"],
        s = ["default", "date", "time", "header", "footer", "weekday", "dayOfMonth", "month", "year", "decade", "century"],
        l = h(),
        u = {
            propType: function() {
                var e;
                return (e = l).propType.apply(e, arguments)
            },
            getFormat: function(e, t) {
                return t || l.formats[e]
            },
            parse: function() {
                var e;
                return (e = l).parse.apply(e, arguments)
            },
            format: function() {
                var e;
                return (e = l).format.apply(e, arguments)
            },
            decimalChar: function() {
                var e;
                return (e = l).decimalChar.apply(e, arguments)
            },
            precision: function() {
                var e;
                return (e = l).precision.apply(e, arguments)
            }
        };
    t.number = u;
    var c = h(),
        d = {
            propType: function() {
                var e;
                return (e = c).propType.apply(e, arguments)
            },
            getFormat: function(e, t) {
                return t || c.formats[e]
            },
            parse: function() {
                var e;
                return (e = c).parse.apply(e, arguments)
            },
            format: function() {
                var e;
                return (e = c).format.apply(e, arguments)
            },
            firstOfWeek: function() {
                var e;
                return (e = c).firstOfWeek.apply(e, arguments)
            }
        };
    t.date = d;
    var p = function(e) {
        return function(t, n, r) {
            var o = "function" == typeof n ? n(t, r, this) : e.call(this, t, n, r);
            return null != o && "string" != typeof o && invariant(!1), o
        }
    };

    function f(e, t) {
        0
    }

    function h() {
        return {}
    }
}, function(e, t, n) {
    "use strict";
    e.exports = function() {}
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.default = void 0;
    var r = s(n(0)),
        o = s(n(2)),
        a = s(n(7)),
        i = n(19);

    function s(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }

    function l() {
        return (l = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        }).apply(this, arguments)
    }
    var u = {
            className: o.default.string,
            role: o.default.string,
            nodeRef: o.default.func,
            emptyListMessage: o.default.node
        },
        c = function(e) {
            var t, n;

            function o() {
                return e.apply(this, arguments) || this
            }
            return n = e, (t = o).prototype = Object.create(n.prototype), t.prototype.constructor = t, t.__proto__ = n, o.prototype.render = function() {
                var e = this.props,
                    t = e.className,
                    n = e.role,
                    o = e.children,
                    s = e.emptyListMessage,
                    u = e.nodeRef,
                    c = function(e, t) {
                        if (null == e) return {};
                        var n, r, o = {},
                            a = Object.keys(e);
                        for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) >= 0 || (o[n] = e[n]);
                        if (Object.getOwnPropertySymbols) {
                            var i = Object.getOwnPropertySymbols(e);
                            for (r = 0; r < i.length; r++) n = i[r], t.indexOf(n) >= 0 || Object.prototype.propertyIsEnumerable.call(e, n) && (o[n] = e[n])
                        }
                        return o
                    }(e, ["className", "role", "children", "emptyListMessage", "nodeRef"]),
                    d = (0, i.instanceId)(this);
                return r.default.createElement("ul", l({
                    id: d,
                    tabIndex: "-1",
                    ref: u,
                    className: (0, a.default)(t, "rw-list"),
                    role: void 0 === n ? "listbox" : n
                }, c), r.default.Children.count(o) ? o : r.default.createElement("li", {
                    className: "rw-list-empty"
                }, s))
            }, o
        }(r.default.Component);
    c.propTypes = u;
    var d = c;
    t.default = d, e.exports = t.default
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.default = void 0;
    var r = s(n(0)),
        o = s(n(2)),
        a = s(n(7)),
        i = function(e) {
            if (e && e.__esModule) return e;
            var t = {};
            if (null != e)
                for (var n in e)
                    if (Object.prototype.hasOwnProperty.call(e, n)) {
                        var r = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(e, n) : {};
                        r.get || r.set ? Object.defineProperty(t, n, r) : t[n] = e[n]
                    } return t.default = e, t
        }(n(18));

    function s(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }

    function l() {
        return (l = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        }).apply(this, arguments)
    }
    var u = function(e) {
        var t, n;

        function o() {
            for (var t, n = arguments.length, r = new Array(n), o = 0; o < n; o++) r[o] = arguments[o];
            return (t = e.call.apply(e, [this].concat(r)) || this).handleSelect = function(e) {
                var n = t.props,
                    r = n.onSelect,
                    o = n.disabled,
                    a = n.dataItem;
                r && !o && r(a, e)
            }, t
        }
        return n = e, (t = o).prototype = Object.create(n.prototype), t.prototype.constructor = t, t.__proto__ = n, o.prototype.render = function() {
            var e = this.props,
                t = e.className,
                n = e.children,
                o = e.focused,
                s = e.selected,
                u = e.disabled,
                c = e.activeId,
                d = this.props.component || "li",
                p = i.omitOwn(this),
                f = {
                    "rw-state-focus": o,
                    "rw-state-selected": s,
                    "rw-state-disabled": u
                },
                h = o ? c : void 0;
            return r.default.createElement(d, l({
                id: h,
                role: "option",
                tabIndex: u ? void 0 : "-1",
                "aria-selected": !!s,
                className: (0, a.default)("rw-list-option", t, f),
                onClick: this.handleSelect
            }, p), n)
        }, o
    }(r.default.Component);
    u.propTypes = {
        activeId: o.default.string,
        dataItem: o.default.any,
        index: o.default.number,
        focused: o.default.bool,
        selected: o.default.bool,
        disabled: o.default.bool,
        onSelect: o.default.func,
        component: o.default.string
    };
    var c = u;
    t.default = c, e.exports = t.default
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.default = void 0;
    var r = i(n(7)),
        o = i(n(0)),
        a = i(n(2));

    function i(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }
    var s = {
        className: a.default.string,
        component: a.default.string
    };

    function l(e) {
        var t = e.children,
            n = e.className,
            a = e.component,
            i = void 0 === a ? "li" : a;
        return o.default.createElement(i, {
            tabIndex: "-1",
            role: "separator",
            className: (0, r.default)(n, "rw-list-optgroup")
        }, t)
    }
    l.propTypes = s;
    var u = l;
    t.default = u, e.exports = t.default
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.default = void 0;
    var r = l(n(7)),
        o = l(n(2)),
        a = function(e) {
            if (e && e.__esModule) return e;
            var t = {};
            if (null != e)
                for (var n in e)
                    if (Object.prototype.hasOwnProperty.call(e, n)) {
                        var r = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(e, n) : {};
                        r.get || r.set ? Object.defineProperty(t, n, r) : t[n] = e[n]
                    } return t.default = e, t
        }(n(0)),
        i = l(n(92)),
        s = n(13);

    function l(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }

    function u() {
        return (u = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        }).apply(this, arguments)
    }

    function c(e, t) {
        if (null == e) return {};
        var n, r, o = {},
            a = Object.keys(e);
        for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) >= 0 || (o[n] = e[n]);
        if (Object.getOwnPropertySymbols) {
            var i = Object.getOwnPropertySymbols(e);
            for (r = 0; r < i.length; r++) n = i[r], t.indexOf(n) >= 0 || Object.prototype.propertyIsEnumerable.call(e, n) && (o[n] = e[n])
        }
        return o
    }

    function d(e, t) {
        e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e.__proto__ = t
    }
    var p = function(e) {
        function t() {
            return e.apply(this, arguments) || this
        }
        d(t, e);
        var n = t.prototype;
        return n.shouldComponentUpdate = function(e) {
            return !!e.shouldUpdate
        }, n.render = function() {
            var e = this.props,
                t = e.className,
                n = e.children,
                o = c(e, ["className", "children"]);
            return delete o.shouldUpdate, (0, a.cloneElement)(n, u({}, o, {
                className: (0, r.default)(t, n.props.className, "rw-popup")
            }))
        }, t
    }(a.default.Component);
    p.propTypes = {
        shouldUpdate: function() {}
    };
    var f = function(e) {
        function t() {
            return e.apply(this, arguments) || this
        }
        return d(t, e), t.prototype.render = function() {
            var e = this.props,
                t = e.className,
                n = e.dropUp,
                o = e.open,
                i = e.transition,
                s = c(e, ["className", "dropUp", "open", "transition"]);
            return a.default.createElement(i, u({}, s, {
                in: o,
                dropUp: n,
                className: (0, r.default)(t, "rw-popup-container")
            }), a.default.createElement(p, {
                shouldUpdate: o
            }, a.default.Children.only(this.props.children)))
        }, t
    }(a.default.Component);
    f.defaultProps = {
        open: !1,
        transition: i.default
    }, f.propTypes = {
        open: o.default.bool,
        dropUp: o.default.bool,
        onEntering: o.default.func,
        onEntered: o.default.func,
        transition: s.elementType
    };
    var h = f;
    t.default = h, e.exports = t.default
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.default = void 0;
    var r, o = p(n(7)),
        a = p(n(93)),
        i = p(n(34)),
        s = p(n(21)),
        l = n(36),
        u = p(n(2)),
        c = p(n(0)),
        d = function(e) {
            if (e && e.__esModule) return e;
            var t = {};
            if (null != e)
                for (var n in e)
                    if (Object.prototype.hasOwnProperty.call(e, n)) {
                        var r = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(e, n) : {};
                        r.get || r.set ? Object.defineProperty(t, n, r) : t[n] = e[n]
                    } return t.default = e, t
        }(n(103));

    function p(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }

    function f() {
        return (f = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        }).apply(this, arguments)
    }
    var h = ((r = {})[d.ENTERING] = "rw-popup-transition-entering", r[d.EXITING] = "rw-popup-transition-exiting", r[d.EXITED] = "rw-popup-transition-exited", r),
        m = {
            in: u.default.bool.isRequired,
            dropUp: u.default.bool,
            onEntering: u.default.func,
            onEntered: u.default.func
        };
    var g = function(e) {
        var t, n;

        function r() {
            for (var t, n = arguments.length, r = new Array(n), o = 0; o < n; o++) r[o] = arguments[o];
            return (t = e.call.apply(e, [this].concat(r)) || this).setContainerHeight = function(e) {
                e.style.height = t.getHeight() + "px"
            }, t.clearContainerHeight = function(e) {
                e.style.height = ""
            }, t.handleEntered = function(e) {
                t.clearContainerHeight(e), t.props.onEntered && t.props.onEntered()
            }, t.handleEntering = function() {
                t.props.onEntering && t.props.onEntering()
            }, t.handleTransitionEnd = function(e, t) {
                var n = function(e) {
                        var t = (0, i.default)(e, l.transitionDuration),
                            n = -1 === t.indexOf("ms") ? 1e3 : 1;
                        return parseFloat(t) * n
                    }(e.lastChild) || 0,
                    r = function n() {
                        a.default.off(e, l.transitionEnd, n, !1), t()
                    };
                setTimeout(r, 1.5 * n), a.default.on(e, l.transitionEnd, r, !1)
            }, t.attachRef = function(e) {
                return t.element = e
            }, t
        }
        n = e, (t = r).prototype = Object.create(n.prototype), t.prototype.constructor = t, t.__proto__ = n;
        var u = r.prototype;
        return u.getHeight = function() {
            var e, t = this.element,
                n = t.firstChild,
                r = parseInt((0, i.default)(n, "margin-top"), 10) + parseInt((0, i.default)(n, "margin-bottom"), 10),
                o = t.style.display;
            return t.style.display = "block", e = ((0, s.default)(n) || 0) + (isNaN(r) ? 0 : r), t.style.display = o, e
        }, u.render = function() {
            var e = this,
                t = this.props,
                n = t.children,
                r = t.className,
                a = t.dropUp;
            return c.default.createElement(d.default, {
                appear: !0,
                in: this.props.in,
                timeout: 5e3,
                onEnter: this.setContainerHeight,
                onEntering: this.handleEntering,
                onEntered: this.handleEntered,
                onExit: this.setContainerHeight,
                onExited: this.clearContainerHeight,
                addEndListener: this.handleTransitionEnd
            }, function(t, i) {
                return c.default.createElement("div", f({}, i, {
                    ref: e.attachRef,
                    className: (0, o.default)(r, a && "rw-dropup", h[t])
                }), c.default.createElement("div", {
                    className: "rw-popup-transition"
                }, n))
            })
        }, r
    }(c.default.Component);
    g.propTypes = m;
    var y = g;
    t.default = y, e.exports = t.default
}, function(e, t, n) {
    "use strict";
    var r = n(4);
    t.__esModule = !0, t.default = void 0;
    var o = r(n(30));
    t.on = o.default;
    var a = r(n(31));
    t.off = a.default;
    var i = r(n(94));
    t.filter = i.default;
    var s = r(n(95));
    t.listen = s.default;
    var l = {
        on: o.default,
        off: a.default,
        filter: i.default,
        listen: s.default
    };
    t.default = l
}, function(e, t, n) {
    "use strict";
    var r = n(4);
    t.__esModule = !0, t.default = function(e, t) {
        return function(n) {
            var r = n.currentTarget,
                i = n.target,
                s = (0, a.default)(r, e);
            s.some(function(e) {
                return (0, o.default)(e, i)
            }) && t.call(this, n)
        }
    };
    var o = r(n(32)),
        a = r(n(33));
    e.exports = t.default
}, function(e, t, n) {
    "use strict";
    var r = n(4);
    t.__esModule = !0, t.default = void 0;
    var o = r(n(10)),
        a = r(n(30)),
        i = r(n(31)),
        s = function() {};
    o.default && (s = function(e, t, n, r) {
        return (0, a.default)(e, t, n, r),
            function() {
                (0, i.default)(e, t, n, r)
            }
    });
    var l = s;
    t.default = l, e.exports = t.default
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.default = function(e) {
        return e.replace(r, function(e, t) {
            return t.toUpperCase()
        })
    };
    var r = /-(.)/g;
    e.exports = t.default
}, function(e, t, n) {
    "use strict";
    var r = n(4);
    t.__esModule = !0, t.default = function(e) {
        return (0, o.default)(e).replace(a, "-ms-")
    };
    var o = r(n(98)),
        a = /^ms-/;
    e.exports = t.default
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.default = function(e) {
        return e.replace(r, "-$1").toLowerCase()
    };
    var r = /([A-Z])/g;
    e.exports = t.default
}, function(e, t, n) {
    "use strict";
    var r = n(4);
    t.__esModule = !0, t.default = function(e) {
        if (!e) throw new TypeError("No Element passed to `getComputedStyle()`");
        var t = e.ownerDocument;
        return "defaultView" in t ? t.defaultView.opener ? e.ownerDocument.defaultView.getComputedStyle(e, null) : window.getComputedStyle(e, null) : {
            getPropertyValue: function(t) {
                var n = e.style;
                "float" == (t = (0, o.default)(t)) && (t = "styleFloat");
                var r = e.currentStyle[t] || null;
                if (null == r && n && n[t] && (r = n[t]), i.test(r) && !a.test(t)) {
                    var s = n.left,
                        l = e.runtimeStyle,
                        u = l && l.left;
                    u && (l.left = e.currentStyle.left), n.left = "fontSize" === t ? "1em" : r, r = n.pixelLeft + "px", n.left = s, u && (l.left = u)
                }
                return r
            }
        }
    };
    var o = r(n(35)),
        a = /^(top|right|bottom|left)$/,
        i = /^([+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|))(?!px)[a-z%]+$/i;
    e.exports = t.default
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.default = function(e, t) {
        return "removeProperty" in e.style ? e.style.removeProperty(t) : e.style.removeAttribute(t)
    }, e.exports = t.default
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.default = function(e) {
        return !(!e || !r.test(e))
    };
    var r = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i;
    e.exports = t.default
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.default = function(e) {
        return e && e.ownerDocument || document
    }, e.exports = t.default
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.default = t.EXITING = t.ENTERED = t.ENTERING = t.EXITED = t.UNMOUNTED = void 0;
    var r = function(e) {
            if (e && e.__esModule) return e;
            var t = {};
            if (null != e)
                for (var n in e)
                    if (Object.prototype.hasOwnProperty.call(e, n)) {
                        var r = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(e, n) : {};
                        r.get || r.set ? Object.defineProperty(t, n, r) : t[n] = e[n]
                    } return t.default = e, t
        }(n(2)),
        o = s(n(0)),
        a = s(n(8)),
        i = n(25);
    n(104);

    function s(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }
    var l = "unmounted";
    t.UNMOUNTED = l;
    var u = "exited";
    t.EXITED = u;
    var c = "entering";
    t.ENTERING = c;
    var d = "entered";
    t.ENTERED = d;
    t.EXITING = "exiting";
    var p = function(e) {
        var t, n;

        function r(t, n) {
            var r;
            r = e.call(this, t, n) || this;
            var o, a = n.transitionGroup,
                i = a && !a.isMounting ? t.enter : t.appear;
            return r.appearStatus = null, t.in ? i ? (o = u, r.appearStatus = c) : o = d : o = t.unmountOnExit || t.mountOnEnter ? l : u, r.state = {
                status: o
            }, r.nextCallback = null, r
        }
        n = e, (t = r).prototype = Object.create(n.prototype), t.prototype.constructor = t, t.__proto__ = n;
        var i = r.prototype;
        return i.getChildContext = function() {
            return {
                transitionGroup: null
            }
        }, r.getDerivedStateFromProps = function(e, t) {
            return e.in && t.status === l ? {
                status: u
            } : null
        }, i.componentDidMount = function() {
            this.updateStatus(!0, this.appearStatus)
        }, i.componentDidUpdate = function(e) {
            var t = null;
            if (e !== this.props) {
                var n = this.state.status;
                this.props.in ? n !== c && n !== d && (t = c) : n !== c && n !== d || (t = "exiting")
            }
            this.updateStatus(!1, t)
        }, i.componentWillUnmount = function() {
            this.cancelNextCallback()
        }, i.getTimeouts = function() {
            var e, t, n, r = this.props.timeout;
            return e = t = n = r, null != r && "number" != typeof r && (e = r.exit, t = r.enter, n = void 0 !== r.appear ? r.appear : t), {
                exit: e,
                enter: t,
                appear: n
            }
        }, i.updateStatus = function(e, t) {
            if (void 0 === e && (e = !1), null !== t) {
                this.cancelNextCallback();
                var n = a.default.findDOMNode(this);
                t === c ? this.performEnter(n, e) : this.performExit(n)
            } else this.props.unmountOnExit && this.state.status === u && this.setState({
                status: l
            })
        }, i.performEnter = function(e, t) {
            var n = this,
                r = this.props.enter,
                o = this.context.transitionGroup ? this.context.transitionGroup.isMounting : t,
                a = this.getTimeouts(),
                i = o ? a.appear : a.enter;
            t || r ? (this.props.onEnter(e, o), this.safeSetState({
                status: c
            }, function() {
                n.props.onEntering(e, o), n.onTransitionEnd(e, i, function() {
                    n.safeSetState({
                        status: d
                    }, function() {
                        n.props.onEntered(e, o)
                    })
                })
            })) : this.safeSetState({
                status: d
            }, function() {
                n.props.onEntered(e)
            })
        }, i.performExit = function(e) {
            var t = this,
                n = this.props.exit,
                r = this.getTimeouts();
            n ? (this.props.onExit(e), this.safeSetState({
                status: "exiting"
            }, function() {
                t.props.onExiting(e), t.onTransitionEnd(e, r.exit, function() {
                    t.safeSetState({
                        status: u
                    }, function() {
                        t.props.onExited(e)
                    })
                })
            })) : this.safeSetState({
                status: u
            }, function() {
                t.props.onExited(e)
            })
        }, i.cancelNextCallback = function() {
            null !== this.nextCallback && (this.nextCallback.cancel(), this.nextCallback = null)
        }, i.safeSetState = function(e, t) {
            t = this.setNextCallback(t), this.setState(e, t)
        }, i.setNextCallback = function(e) {
            var t = this,
                n = !0;
            return this.nextCallback = function(r) {
                n && (n = !1, t.nextCallback = null, e(r))
            }, this.nextCallback.cancel = function() {
                n = !1
            }, this.nextCallback
        }, i.onTransitionEnd = function(e, t, n) {
            this.setNextCallback(n);
            var r = null == t && !this.props.addEndListener;
            e && !r ? (this.props.addEndListener && this.props.addEndListener(e, this.nextCallback), null != t && setTimeout(this.nextCallback, t)) : setTimeout(this.nextCallback, 0)
        }, i.render = function() {
            var e = this.state.status;
            if (e === l) return null;
            var t = this.props,
                n = t.children,
                r = function(e, t) {
                    if (null == e) return {};
                    var n, r, o = {},
                        a = Object.keys(e);
                    for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) >= 0 || (o[n] = e[n]);
                    return o
                }(t, ["children"]);
            if (delete r.in, delete r.mountOnEnter, delete r.unmountOnExit, delete r.appear, delete r.enter, delete r.exit, delete r.timeout, delete r.addEndListener, delete r.onEnter, delete r.onEntering, delete r.onEntered, delete r.onExit, delete r.onExiting, delete r.onExited, "function" == typeof n) return n(e, r);
            var a = o.default.Children.only(n);
            return o.default.cloneElement(a, r)
        }, r
    }(o.default.Component);

    function f() {}
    p.contextTypes = {
        transitionGroup: r.object
    }, p.childContextTypes = {
        transitionGroup: function() {}
    }, p.propTypes = {}, p.defaultProps = {
        in: !1,
        mountOnEnter: !1,
        unmountOnExit: !1,
        appear: !1,
        enter: !0,
        exit: !0,
        onEnter: f,
        onEntering: f,
        onEntered: f,
        onExit: f,
        onExiting: f,
        onExited: f
    }, p.UNMOUNTED = 0, p.EXITED = 1, p.ENTERING = 2, p.ENTERED = 3, p.EXITING = 4;
    var h = (0, i.polyfill)(p);
    t.default = h
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.classNamesShape = t.timeoutsShape = void 0;
    var r;
    (r = n(2)) && r.__esModule;
    t.timeoutsShape = null;
    t.classNamesShape = null
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.default = void 0;
    var r = s(n(0)),
        o = s(n(2)),
        a = s(n(7)),
        i = s(n(106));

    function s(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }

    function l() {
        return (l = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        }).apply(this, arguments)
    }
    var u = function(e) {
        var t, n;

        function o() {
            return e.apply(this, arguments) || this
        }
        return n = e, (t = o).prototype = Object.create(n.prototype), t.prototype.constructor = t, t.__proto__ = n, o.prototype.render = function() {
            var e = this.props,
                t = e.className,
                n = e.bordered,
                o = e.children,
                s = function(e, t) {
                    if (null == e) return {};
                    var n, r, o = {},
                        a = Object.keys(e);
                    for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) >= 0 || (o[n] = e[n]);
                    if (Object.getOwnPropertySymbols) {
                        var i = Object.getOwnPropertySymbols(e);
                        for (r = 0; r < i.length; r++) n = i[r], t.indexOf(n) >= 0 || Object.prototype.propertyIsEnumerable.call(e, n) && (o[n] = e[n])
                    }
                    return o
                }(e, ["className", "bordered", "children"]);
            return r.default.createElement("span", {
                className: (0, a.default)(t, "rw-select", n && "rw-select-bordered")
            }, o ? r.default.Children.map(o, function(e) {
                return e && r.default.cloneElement(e, {
                    variant: "select"
                })
            }) : r.default.createElement(i.default, l({}, s, {
                variant: "select"
            })))
        }, o
    }(r.default.Component);
    u.propTypes = {
        bordered: o.default.bool
    };
    var c = u;
    t.default = c, e.exports = t.default
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.default = void 0;
    var r = i(n(0)),
        o = i(n(2)),
        a = i(n(7));

    function i(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }

    function s() {
        return (s = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        }).apply(this, arguments)
    }
    var l = function() {
            return r.default.createElement("span", {
                "aria-hidden": "true",
                className: "rw-i rw-loading"
            })
        },
        u = function(e) {
            var t, n;

            function o() {
                return e.apply(this, arguments) || this
            }
            return n = e, (t = o).prototype = Object.create(n.prototype), t.prototype.constructor = t, t.__proto__ = n, o.prototype.render = function() {
                var e = this.props,
                    t = e.className,
                    n = e.disabled,
                    o = e.label,
                    i = e.icon,
                    u = e.busy,
                    c = e.active,
                    d = e.children,
                    p = e.variant,
                    f = void 0 === p ? "primary" : p,
                    h = e.spinner,
                    m = void 0 === h ? r.default.createElement(l, null) : h,
                    g = e.component,
                    y = void 0 === g ? "button" : g,
                    v = function(e, t) {
                        if (null == e) return {};
                        var n, r, o = {},
                            a = Object.keys(e);
                        for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) >= 0 || (o[n] = e[n]);
                        if (Object.getOwnPropertySymbols) {
                            var i = Object.getOwnPropertySymbols(e);
                            for (r = 0; r < i.length; r++) n = i[r], t.indexOf(n) >= 0 || Object.prototype.propertyIsEnumerable.call(e, n) && (o[n] = e[n])
                        }
                        return o
                    }(e, ["className", "disabled", "label", "icon", "busy", "active", "children", "variant", "spinner", "component"]),
                    b = v.type;
                return "button" === y && (b = b || "button"), r.default.createElement(y, s({}, v, {
                    tabIndex: "-1",
                    title: o,
                    type: b,
                    disabled: n,
                    "aria-disabled": n,
                    "aria-label": o,
                    className: (0, a.default)(t, "rw-btn", c && !n && "rw-state-active", f && "rw-btn-" + f)
                }), u ? m : i, d)
            }, o
        }(r.default.Component);
    u.propTypes = {
        disabled: o.default.bool,
        label: o.default.string,
        icon: o.default.node,
        busy: o.default.bool,
        active: o.default.bool,
        variant: o.default.oneOf(["primary", "select"]),
        component: o.default.any,
        spinner: o.default.node
    };
    var c = u;
    t.default = c, e.exports = t.default
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.default = t.caretSet = void 0;
    var r = s(n(0)),
        o = s(n(2)),
        a = n(8),
        i = s(n(108));

    function s(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }

    function l() {
        return (l = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        }).apply(this, arguments)
    }
    var u = function(e, t, n) {
        void 0 === n && (n = t);
        try {
            e.setSelectionRange(t, n)
        } catch (e) {}
    };
    t.caretSet = u;
    var c = function(e) {
        var t, n;

        function o() {
            for (var t, n = arguments.length, r = new Array(n), o = 0; o < n; o++) r[o] = arguments[o];
            return (t = e.call.apply(e, [this].concat(r)) || this).handleChange = function(e) {
                var n = t.props,
                    r = n.placeholder,
                    o = n.value,
                    a = n.onChange,
                    i = e.target.value;
                !!r && !i && i === (o || "") || (t._last = i, a(e, i))
            }, t
        }
        n = e, (t = o).prototype = Object.create(n.prototype), t.prototype.constructor = t, t.__proto__ = n;
        var s = o.prototype;
        return s.componentDidUpdate = function() {
            var e = (0, a.findDOMNode)(this),
                t = this.props.value;
            if (this.isSuggesting()) {
                var n = t.toLowerCase().indexOf(this._last.toLowerCase()) + this._last.length,
                    r = t.length - n;
                n >= 0 && 0 !== r && u(e, n, n + r)
            }
        }, s.accept = function(e) {
            if (void 0 === e && (e = !1), this._last = null, e) {
                var t = (0, a.findDOMNode)(this);
                u(t, t.value.length)
            }
        }, s.focus = function() {
            (0, a.findDOMNode)(this).focus()
        }, s.isSuggesting = function() {
            var e = this.props,
                t = e.value;
            return !!e.suggest && (null != this._last && -1 !== t.toLowerCase().indexOf(this._last.toLowerCase()))
        }, s.render = function() {
            var e = this.props,
                t = e.onKeyDown,
                n = function(e, t) {
                    if (null == e) return {};
                    var n, r, o = {},
                        a = Object.keys(e);
                    for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) >= 0 || (o[n] = e[n]);
                    if (Object.getOwnPropertySymbols) {
                        var i = Object.getOwnPropertySymbols(e);
                        for (r = 0; r < i.length; r++) n = i[r], t.indexOf(n) >= 0 || Object.prototype.propertyIsEnumerable.call(e, n) && (o[n] = e[n])
                    }
                    return o
                }(e, ["onKeyDown"]);
            return delete n.suggest, r.default.createElement(i.default, l({}, n, {
                className: "rw-widget-input",
                onKeyDown: t,
                onChange: this.handleChange
            }))
        }, o
    }(r.default.Component);
    c.defaultProps = {
        value: ""
    }, c.propTypes = {
        value: o.default.string,
        placeholder: o.default.string,
        suggest: o.default.bool,
        onChange: o.default.func.isRequired,
        onKeyDown: o.default.func
    };
    var d = c;
    t.default = d
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.default = void 0;
    var r = i(n(0)),
        o = i(n(2)),
        a = i(n(7));

    function i(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }

    function s() {
        return (s = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        }).apply(this, arguments)
    }

    function l(e) {
        var t = e.className,
            n = e.disabled,
            o = e.readOnly,
            i = e.value,
            l = e.tabIndex,
            u = e.nodeRef,
            c = e.type,
            d = void 0 === c ? "text" : c,
            p = e.component,
            f = void 0 === p ? "input" : p,
            h = function(e, t) {
                if (null == e) return {};
                var n, r, o = {},
                    a = Object.keys(e);
                for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) >= 0 || (o[n] = e[n]);
                if (Object.getOwnPropertySymbols) {
                    var i = Object.getOwnPropertySymbols(e);
                    for (r = 0; r < i.length; r++) n = i[r], t.indexOf(n) >= 0 || Object.prototype.propertyIsEnumerable.call(e, n) && (o[n] = e[n])
                }
                return o
            }(e, ["className", "disabled", "readOnly", "value", "tabIndex", "nodeRef", "type", "component"]);
        return r.default.createElement(f, s({}, h, {
            type: d,
            ref: u,
            tabIndex: l || 0,
            autoComplete: "off",
            disabled: n,
            readOnly: o,
            "aria-disabled": n,
            "aria-readonly": o,
            value: null == i ? "" : i,
            className: (0, a.default)(t, "rw-input")
        }))
    }
    l.propTypes = {
        disabled: o.default.bool,
        readOnly: o.default.bool,
        value: o.default.string,
        type: o.default.string,
        tabIndex: o.default.string,
        component: o.default.any,
        nodeRef: o.default.func
    };
    var u = l;
    t.default = u, e.exports = t.default
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.default = function(e, t) {
        var n = t.didHandle;
        return (0, r.focusManager)(e, a({}, t, {
            onChange: function(t) {
                e.setState({
                    focused: t
                })
            },
            isDisabled: function() {
                return !0 === e.props.disabled || (0, o.isInDisabledFieldset)(e)
            },
            didHandle: function(e, t) {
                var r = this.props[e ? "onFocus" : "onBlur"];
                r && r(t), n && !t.isWidgetDefaultPrevented && n(e, t)
            }
        }))
    };
    var r = n(38),
        o = n(40);

    function a() {
        return (a = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        }).apply(this, arguments)
    }
    e.exports = t.default
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.default = function(e) {
        (0, i.default)(e, {
            componentDidMount: function() {
                var e = this.props.autoFocus;
                e && (this.focus ? this.focus() : (0, a.findDOMNode)(this).focus())
            }
        })
    }, t.PropTypes = void 0;
    var r, o = n(2),
        a = n(8),
        i = (r = n(16)) && r.__esModule ? r : {
            default: r
        };
    var s = {
        autoFocus: o.bool
    };
    t.PropTypes = s
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.callFocusEventHandler = function(e, t, n) {
        var r = e.props[t ? "onFocus" : "onBlur"];
        r && r(n)
    }, t.default = function(e, t) {
        var n, i = void 0 === t ? {} : t,
            s = i.willHandle,
            l = i.didHandle,
            u = i.onChange,
            c = i.isDisabled,
            d = void 0 === c ? function() {
                return !!e.props.disabled
            } : c,
            p = (0, o.default)(e),
            f = (0, a.default)(e);

        function h(t, o) {
            o && o.persist && o.persist(), s && !1 === s(t, o) || p.set("focus", function() {
                (0, r.unstable_batchedUpdates)(function() {
                    t !== n && (l && l.call(e, t, o), !f() && t || (n = t, u && u(t, o)))
                })
            })
        }
        return {
            handleBlur: function(e) {
                d() || h(!1, e)
            },
            handleFocus: function(e) {
                d() || h(!0, e)
            }
        }
    };
    var r = n(8),
        o = i(n(39)),
        a = i(n(22));

    function i(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }
}, function(e, t, n) {
    "use strict";

    function r() {
        return (r = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        }).apply(this, arguments)
    }

    function o(e, t) {
        var n = t.propTypes,
            o = t.contextTypes,
            a = t.childContextTypes,
            i = t.getChildContext,
            s = function(e, t) {
                if (null == e) return {};
                var n, r, o = {},
                    a = Object.keys(e);
                for (r = 0; r < a.length; r++) n = a[r], t.indexOf(n) >= 0 || (o[n] = e[n]);
                if (Object.getOwnPropertySymbols) {
                    var i = Object.getOwnPropertySymbols(e);
                    for (r = 0; r < i.length; r++) n = i[r], t.indexOf(n) >= 0 || Object.prototype.propertyIsEnumerable.call(e, n) && (o[n] = e[n])
                }
                return o
            }(t, ["propTypes", "contextTypes", "childContextTypes", "getChildContext"]);
        if (n && (e.propTypes = r({}, e.propTypes, n)), o && (e.contextTypes = r({}, e.contextTypes, o)), a && (e.childContextTypes = r({}, e.childContextTypes, a)), i) {
            var l = e.prototype.getChildContext;
            e.prototype.getChildContext = function() {
                return r({}, l && l.call(this), i.call(this))
            }
        }
        return r(e.prototype, s), e
    }
    t.__esModule = !0, t.mixin = o, t.default = function(e) {
        return function(t) {
            return o(t, e)
        }
    }
}, function(e, t, n) {
    "use strict";
    var r = n(4);
    t.__esModule = !0, t.default = function(e, t) {
        if (!o && a.default) {
            var n = document.body,
                r = n.matches || n.matchesSelector || n.webkitMatchesSelector || n.mozMatchesSelector || n.msMatchesSelector;
            o = r ? function(e, t) {
                return r.call(e, t)
            } : s
        }
        return o ? o(e, t) : null
    };
    var o, a = r(n(10)),
        i = r(n(33));

    function s(e, t) {
        for (var n = (0, i.default)(e.document || e.ownerDocument, t), r = 0; n[r] && n[r] !== e;) r++;
        return !!n[r]
    }
    e.exports = t.default
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.default = function(e) {
        var t = e.textField,
            n = e.valueField;
        return {
            text: function(e) {
                return r.dataText(e, t)
            },
            value: function(e) {
                return r.dataValue(e, n)
            },
            indexOf: function(e, t) {
                return r.dataIndexOf(e, t, n)
            },
            matches: function(e, t) {
                return r.valueMatcher(e, t, n)
            },
            findOrSelf: function(e, t) {
                return r.dataItem(e, t, n)
            },
            includes: function(e, t) {
                return -1 !== r.dataIndexOf(e, t, n)
            }
        }
    };
    var r = function(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
            for (var n in e)
                if (Object.prototype.hasOwnProperty.call(e, n)) {
                    var r = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(e, n) : {};
                    r.get || r.set ? Object.defineProperty(t, n, r) : t[n] = e[n]
                } return t.default = e, t
    }(n(20));
    e.exports = t.default
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.default = function(e, t) {
        void 0 === t && (t = function(e) {
            return e.parentNode
        });
        var n, r, i, s = (0, a.mountManager)(e);
        return function(e, t, a) {
            if (!s()) return;
            var l, u = r,
                c = n;
            r = !(!t.offsetWidth || !t.offsetHeight), n = a, l = c !== a, (r && !u || r && l) && (this.props.onMove ? this.props.onMove(e, t, a) : (i && i(), i = (0, o.default)(e, !1)))
        }.bind(e)
    };
    var r, o = (r = n(116)) && r.__esModule ? r : {
            default: r
        },
        a = n(38);
    e.exports = t.default
}, function(e, t, n) {
    "use strict";
    var r = n(4);
    t.__esModule = !0, t.default = function(e, t) {
        var n, r, c, d, p, f, h, m = (0, o.default)(e),
            g = {
                top: 0,
                left: 0
            };
        if (!e) return;
        n = t || (0, i.default)(e), d = (0, u.default)(n), r = (0, s.default)(n), f = (0, a.default)(n, !0), (d = (0, u.default)(n)) || (g = (0, o.default)(n));
        m = {
            top: m.top - g.top,
            left: m.left - g.left,
            height: m.height,
            width: m.width
        }, p = m.height, c = m.top + (d ? 0 : r), h = c + p, r = r > c ? c : h > r + f ? h - f : r;
        var y = (0, l.default)(function() {
            return (0, s.default)(n, r)
        });
        return function() {
            return l.default.cancel(y)
        }
    };
    var o = r(n(37)),
        a = r(n(21)),
        i = r(n(117)),
        s = r(n(118)),
        l = r(n(119)),
        u = r(n(15));
    e.exports = t.default
}, function(e, t, n) {
    "use strict";
    var r = n(4);
    t.__esModule = !0, t.default = function(e) {
        var t = (0, o.default)(e, "position"),
            n = "absolute" === t,
            r = e.ownerDocument;
        if ("fixed" === t) return r || document;
        for (;
            (e = e.parentNode) && 9 !== e.nodeType;) {
            var i = n && "static" === (0, o.default)(e, "position"),
                s = (0, o.default)(e, "overflow") + (0, o.default)(e, "overflow-y") + (0, o.default)(e, "overflow-x");
            if (!i && (/(auto|scroll)/.test(s) && (0, a.default)(e) < e.scrollHeight)) return e
        }
        return document
    };
    var o = r(n(34)),
        a = r(n(21));
    e.exports = t.default
}, function(e, t, n) {
    "use strict";
    var r = n(4);
    t.__esModule = !0, t.default = function(e, t) {
        var n = (0, o.default)(e);
        if (void 0 === t) return n ? "pageYOffset" in n ? n.pageYOffset : n.document.documentElement.scrollTop : e.scrollTop;
        n ? n.scrollTo("pageXOffset" in n ? n.pageXOffset : n.document.documentElement.scrollLeft, t) : e.scrollTop = t
    };
    var o = r(n(15));
    e.exports = t.default
}, function(e, t, n) {
    "use strict";
    var r = n(4);
    t.__esModule = !0, t.default = void 0;
    var o, a = r(n(10)),
        i = "clearTimeout",
        s = function(e) {
            var t = (new Date).getTime(),
                n = Math.max(0, 16 - (t - u)),
                r = setTimeout(e, n);
            return u = t, r
        },
        l = function(e, t) {
            return e + (e ? t[0].toUpperCase() + t.substr(1) : t) + "AnimationFrame"
        };
    a.default && ["", "webkit", "moz", "o", "ms"].some(function(e) {
        var t = l(e, "request");
        if (t in window) return i = l(e, "cancel"), s = function(e) {
            return window[t](e)
        }
    });
    var u = (new Date).getTime();
    (o = function(e) {
        return s(e)
    }).cancel = function(e) {
        window[i] && "function" == typeof window[i] && window[i](e)
    };
    var c = o;
    t.default = c, e.exports = t.default
}, function(e, t, n) {
    "use strict";
    t.__esModule = !0, t.default = t.search = t.clock = t.calendar = t.chevronLeft = t.chevronRight = t.caretDown = t.caretUp = void 0;
    var r = a(n(2)),
        o = a(n(0));

    function a(e) {
        return e && e.__esModule ? e : {
            default: e
        }
    }
    var i = {
            icon: r.default.string.isRequired
        },
        s = function(e) {
            var t = e.icon;
            return o.default.createElement("span", {
                "aria-hidden": "true",
                className: "rw-i rw-i-" + t
            })
        };
    s.propTypes = i;
    var l = o.default.createElement(s, {
        icon: "caret-up"
    });
    t.caretUp = l;
    var u = o.default.createElement(s, {
        icon: "caret-down"
    });
    t.caretDown = u;
    var c = o.default.createElement(s, {
        icon: "chevron-right"
    });
    t.chevronRight = c;
    var d = o.default.createElement(s, {
        icon: "chevron-left"
    });
    t.chevronLeft = d;
    var p = o.default.createElement(s, {
        icon: "calendar"
    });
    t.calendar = p;
    var f = o.default.createElement(s, {
        icon: "clock-o"
    });
    t.clock = f;
    var h = o.default.createElement(s, {
        icon: "search"
    });
    t.search = h;
    var m = s;
    t.default = m
}, function(e, t, n) {
    (t = e.exports = n(5)(!1)).push([e.i, "._3lH-yqIZ7EVQWaiSC6kQ5F .dnn-grid-cell {\n  overflow-wrap: break-word;\n}\n._3lH-yqIZ7EVQWaiSC6kQ5F .dnn-grid-cell.no-users {\n  float: left;\n  width: 100%;\n  text-align: center;\n  padding: 10px;\n}\n", ""]), t.locals = {
        usersList: "_3lH-yqIZ7EVQWaiSC6kQ5F"
    }
}, function(e, t, n) {
    var r = n(123);
    "string" == typeof r && (r = [
        [e.i, r, ""]
    ]);
    var o = {
        hmr: !0,
        transform: void 0,
        insertInto: void 0
    };
    n(6)(r, o);
    r.locals && (e.exports = r.locals)
}, function(e, t, n) {
    (e.exports = n(5)(!1)).push([e.i, "/* START EVOQ COLOR PALETTE */\n/* END EVOQ COLOR PALETTE */\n/* START ATTENTION COLORS */\n/* END ATTENTION COLORS */\n/* SVG HOVER STATES */\nsvg {\n  fill: #C8C8C8;\n}\nsvg:hover {\n  fill: #6F7273;\n}\nsvg:active {\n  fill: #1E88C3;\n}\n/* END SVG HOVER STATES */\n.users-filter-container {\n  float: left;\n  box-sizing: border-box;\n  margin-bottom: 15px;\n  width: 100%;\n  border: none;\n}\n.users-filter-container .dnn-grid-cell {\n  margin-bottom: 5px;\n}\n.users-filter-container .dnn-grid-cell .user-filters-filter {\n  width: 100%;\n  border-right: 1px solid #C8C8C8;\n  font-size: 13px;\n  font-family: inherit;\n  float: left;\n  height: 24px;\n}\n.users-filter-container .dnn-grid-cell .user-filters-filter .dnn-dropdown .collapsible-label {\n  padding-top: 4px;\n  padding-left: 0;\n}\n.users-filter-container .dnn-grid-cell .user-filters-filter .dnn-dropdown .dropdown-icon {\n  top: 5px;\n}\n.users-filter-container .dnn-grid-cell .user-filters-filter .dnn-search-box {\n  width: 100%;\n  height: 24px;\n}\n.users-filter-container .dnn-grid-cell .user-filters-filter .dnn-search-box input {\n  padding: 0px 16px;\n}\n.users-filter-container .dnn-grid-cell .user-filters-filter .dnn-dropdown .collapsible-toggle {\n  width: auto;\n}\n.users-filter-container .dnn-grid-cell .search-filter {\n  float: left;\n  width: 100%;\n}\n.users-filter-container .dnn-grid-cell .search-filter > div {\n  display: block !important;\n  border-left: 1px solid #C8C8C8;\n}\n.users-filter-container .dnn-grid-cell .search-filter > div input {\n  display: block;\n  width: 100%;\n  position: inherit !important;\n  border: none;\n  border-radius: none;\n  background-color: transparent;\n  outline: none;\n  padding-right: 45px;\n}\n", ""])
}, function(e, t, n) {
    var r = n(125);
    "string" == typeof r && (r = [
        [e.i, r, ""]
    ]);
    var o = {
        hmr: !0,
        transform: void 0,
        insertInto: void 0
    };
    n(6)(r, o);
    r.locals && (e.exports = r.locals)
}, function(e, t, n) {
    (e.exports = n(5)(!1)).push([e.i, "#users-container * {\n  box-sizing: border-box;\n}\n#users-container .create-user-box-collapse {\n  float: left;\n}\n#users-container .create-user-box-collapse > div {\n  float: left;\n}\n#users-container .header-row {\n  padding: 10px 15px 10px;\n}\n#users-container .user-names {\n  padding-left: 17px !important;\n}\n#users-container .user-emails,\n#users-container .user-joined {\n  padding-left: 15px !important;\n}\n#users-container .dnn-persona-bar-page-header button.dnn-ui-common-button {\n  margin-left: 10px;\n}\n#users-container .dnn-persona-bar-page-body.without-margin {\n  margin-top: 0;\n}\n#users-container .dnn-persona-bar-page-body .users-workspace-tray {\n  height: 37px;\n}\n#users-container .dnn-persona-bar-page-body .users-workspace-tray .dnn-grid-cell {\n  height: 100%;\n  padding-top: 7px;\n}\n#users-container .dnn-persona-bar-page-body .users-workspace-tray .dnn-grid-cell .users-filter-container .user-filters-filter {\n  height: 30px;\n}\n#users-container .dnn-persona-bar-page-body .users-workspace-tray .dnn-grid-cell .users-filter-container .user-filters-filter .dnn-dropdown .collapsible-label {\n  padding-top: 4px;\n}\n#users-container .dnn-persona-bar-page-body .users-workspace-tray .dnn-grid-cell .users-filter-container .user-filters-filter .dnn-dropdown .dropdown-icon {\n  top: 5px;\n}\n#users-container .dnn-persona-bar-page-body .users-workspace-tray .dnn-grid-cell .dnn-search-box {\n  width: 100%;\n  height: 30px;\n}\n#users-container .dnn-persona-bar-page-body .users-paging {\n  float: left;\n  width: 100%;\n  margin: 0 2px;\n  padding: 18px;\n}\n", ""])
}, function(e, t, n) {
    "use strict";
    n.r(t);
    var r = n(0),
        o = n.n(r),
        a = n(2),
        i = n.n(a),
        s = n(3),
        l = Object.assign({}, window.dnn.utility),
        u = {
            get: function(e) {
                return l.getResx("Users", e)
            }
        },
        c = n(1);
    n(58);

    function d(e) {
        return (d = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        })(e)
    }

    function p(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
        }
    }

    function f(e, t) {
        return !t || "object" !== d(t) && "function" != typeof t ? function(e) {
            if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e
        }(e) : t
    }

    function h(e) {
        return (h = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
            return e.__proto__ || Object.getPrototypeOf(e)
        })(e)
    }

    function m(e, t) {
        return (m = Object.setPrototypeOf || function(e, t) {
            return e.__proto__ = t, e
        })(e, t)
    }
    var g = function(e) {
        function t() {
            return function(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, t), f(this, h(t).apply(this, arguments))
        }
        var n, a, i;
        return function(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    writable: !0,
                    configurable: !0
                }
            }), t && m(e, t)
        }(t, r["Component"]), n = t, (a = [{
            key: "render",
            value: function() {
                return o.a.createElement(c.GridCell, {
                    columnSize: 100,
                    className: "header-row"
                }, this.props.headers.map(function(e, t) {
                    return o.a.createElement(c.GridCell, {
                        key: "header-row-grid-cell-".concat(t),
                        columnSize: e.size,
                        className: e.header ? "" : "empty"
                    }, o.a.createElement("h6", null, e.header || "Default"))
                }))
            }
        }]) && p(n.prototype, a), i && p(n, i), t
    }();
    g.propTypes = {
        headers: i.a.array.isRequired
    };
    var y = g,
        v = n(47),
        b = n.n(v),
        w = n(48),
        E = n.n(w);

        function S(e, t) {
        //START persian-dnnsoftware
        if (!e) return "";
        try {
            return window.isRtl && e != null && moment.loadPersian(), !0 === t ? moment(e).format("jYYYY/jM/jD (hh:mm:ss a)") : moment(e).format("jYYYY/jM/jD")
        } catch (e) { }
        //END persian-dnnsoftware
        return e ? new Date(e).getFullYear() < 1900 ? "-" : E()(e).locale(l.getCulture()).format(!0 === t ? "LLL" : "L") : ""

    }

    function O(e) {
        return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e)
    }

    function x(e, t, n) {
        return n = void 0 === n ? "asc" : n, e = e.sort(function(e, r) {
            return e[t] > r[t] ? "asc" === n ? 1 : -1 : e[t] < r[t] ? "asc" === n ? -1 : 1 : 0
        })
    }
    n(24);

    function C(e) {
        return (C = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        })(e)
    }

    function T(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
        }
    }

    function _(e, t) {
        return !t || "object" !== C(t) && "function" != typeof t ? function(e) {
            if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e
        }(e) : t
    }

    function R(e) {
        return (R = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
            return e.__proto__ || Object.getPrototypeOf(e)
        })(e)
    }

    function k(e, t) {
        return (k = Object.setPrototypeOf || function(e, t) {
            return e.__proto__ = t, e
        })(e, t)
    }
    var D = function(e) {
        function t() {
            return function(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, t), _(this, R(t).apply(this, arguments))
        }
        var n, a, i;
        return function(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    writable: !0,
                    configurable: !0
                }
            }), t && k(e, t)
        }(t, r["Component"]), n = t, (a = [{
            key: "render",
            value: function() {
                return o.a.createElement("ul", {
                    className: "dnn-user-menu menu"
                }, this.props.children)
            }
        }]) && T(n.prototype, a), i && T(n, i), t
    }();
    D.propTypes = {
        children: i.a.node
    };
    var P = D;

    function U(e) {
        return (U = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        })(e)
    }

    function I(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
        }
    }

    function N(e, t) {
        return !t || "object" !== U(t) && "function" != typeof t ? function(e) {
            if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e
        }(e) : t
    }

    function j(e) {
        return (j = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
            return e.__proto__ || Object.getPrototypeOf(e)
        })(e)
    }

    function M(e, t) {
        return (M = Object.setPrototypeOf || function(e, t) {
            return e.__proto__ = t, e
        })(e, t)
    }
    var A = function(e) {
        function t() {
            var e;
            return function(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, t), (e = N(this, j(t).call(this))).state = {
                hover: !1
            }, e
        }
        var n, a, i;
        return function(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    writable: !0,
                    configurable: !0
                }
            }), t && M(e, t)
        }(t, r["Component"]), n = t, (a = [{
            key: "render",
            value: function() {
                var e = this;
                return o.a.createElement("li", {
                    className: "dnn-user-menu menu-item",
                    onMouseEnter: function() {
                        return e.setState({
                            hover: !0
                        })
                    },
                    onMouseLeave: function() {
                        return e.setState({
                            hover: !1
                        })
                    },
                    onClick: this.props.onMenuAction
                }, this.props.children)
            }
        }]) && I(n.prototype, a), i && I(n, i), t
    }();
    A.propTypes = {
        onMenuAction: i.a.func.isRequired,
        children: i.a.node.isRequired
    };
    var L = A,
        G = {
            RETRIEVED_USERS: "RETRIEVED_USERS",
            RETRIEVED_USER_DETAILS: "RETRIEVED_USER_DETAILS",
            CREATE_USER: "CREATE_USER",
            UPDATE_USER: "UPDATE_USER",
            DELETE_USER: "DELETE_USER",
            ERASE_USER: "ERASE_USER",
            RESTORE_USER: "RESTORE_USER",
            RETRIEVED_USER_FILTERS: "RETRIEVED_USER_FILTERS",
            USER_MADE_SUPERUSER: "USER_MADE_SUPERUSER",
            RETRIEVED_USERS_ROLES: "RETRIEVED_USERS_ROLES",
            RETRIEVED_SUGGEST_ROLES: "RETRIEVED_SUGGEST_ROLES",
            SAVE_USER_ROLE: "SAVE_USER_ROLE",
            REMOVE_USER_ROLE: "REMOVE_USER_ROLE",
            UPDATE_USER_AUTHORIZE_STATUS: "UPDATE_USER_AUTHORIZE_STATUS",
            USER_UNLOCKED: "USER_UNLOCKED",
            RETRIEVED_PASSWORD_STRENGTH_OPTIONS: "RETRIEVED_PASSWORD_STRENGTH_OPTIONS"
        };

    function F(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
        }
    }

    function z(e) {
        var t = [];
        for (var n in e) e.hasOwnProperty(n) && t.push(encodeURIComponent(n) + "=" + encodeURIComponent(e[n]));
        return t.join("&")
    }
    var V = new(function() {
        function e() {
            ! function(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, e)
        }
        var t, n, r;
        return t = e, (n = [{
            key: "getServiceFramework",
            value: function(e) {
                var t = l.sf;
                return t.moduleRoot = "PersonaBar", t.controller = e, t
            }
        }, {
            key: "getUsers",
            value: function(e, t, n) {
                this.getServiceFramework("Users").get("GetUsers?" + z(e), {}, t, n)
            }
        }, {
            key: "getUserDetails",
            value: function(e, t, n) {
                this.getServiceFramework("Users").get("GetUserDetail?" + z(e), {}, t, n)
            }
        }, {
            key: "updateUserBasicInfo",
            value: function(e, t, n) {
                this.getServiceFramework("Users").post("UpdateUserBasicInfo", e, t, n)
            }
        }, {
            key: "getUserFilters",
            value: function(e, t) {
                this.getServiceFramework("Users").get("GetUserFilters", {}, e, t)
            }
        }, {
            key: "createUser",
            value: function(e, t, n) {
                this.getServiceFramework("Users").post("CreateUser", e, t, n)
            }
        }, {
            key: "changePassword",
            value: function(e, t, n) {
                this.getServiceFramework("Users").post("ChangePassword", e, t, n)
            }
        }, {
            key: "forceChangePassword",
            value: function(e, t, n) {
                this.getServiceFramework("Users").post("ForceChangePassword?" + z(e), null, t, n)
            }
        }, {
            key: "sendPasswordResetLink",
            value: function(e, t, n) {
                this.getServiceFramework("Users").post("SendPasswordResetLink?" + z(e), null, t, n)
            }
        }, {
            key: "deleteUser",
            value: function(e, t, n) {
                this.getServiceFramework("Users").post("SoftDeleteUser?" + z(e), null, t, n)
            }
        }, {
            key: "hardDeleteUser",
            value: function(e, t, n) {
                this.getServiceFramework("Users").post("HardDeleteUser?" + z(e), null, t, n)
            }
        }, {
            key: "removeDeletedUsers",
            value: function(e, t) {
                this.getServiceFramework("Users").post("RemoveDeletedUsers", null, e, t)
            }
        }, {
            key: "restoreUser",
            value: function(e, t, n) {
                this.getServiceFramework("Users").post("RestoreDeletedUser?" + z(e), null, t, n)
            }
        }, {
            key: "updateSuperUserStatus",
            value: function(e, t, n) {
                this.getServiceFramework("Users").post("UpdateSuperUserStatus?" + z(e), null, t, n)
            }
        }, {
            key: "updateAuthorizeStatus",
            value: function(e, t, n) {
                this.getServiceFramework("Users").post("UpdateAuthorizeStatus?" + z(e), null, t, n)
            }
        }, {
            key: "unlockUser",
            value: function(e, t, n) {
                this.getServiceFramework("Users").post("UnlockUser?" + z(e), null, t, n)
            }
        }, {
            key: "getUserRoles",
            value: function(e, t, n) {
                this.getServiceFramework("Users").get("GetUserRoles?" + z(e), {}, t, n)
            }
        }, {
            key: "getSuggestRoles",
            value: function(e, t, n) {
                this.getServiceFramework("Users").get("GetSuggestRoles?" + z(e), {}, t, n)
            }
        }, {
            key: "saveUserRole",
            value: function(e, t, n, r, o) {
                this.getServiceFramework("Users").post("SaveUserRole?notifyUser=" + t + "&isOwner=" + n, e, r, o)
            }
        }, {
            key: "removeUserRole",
            value: function(e, t, n) {
                this.getServiceFramework("Users").post("RemoveUserRole", e, t, n)
            }
        }, {
            key: "passwordStrengthOptions",
            value: function(e, t) {
                this.getServiceFramework("Users").get("PasswordStrengthOptions", {}, e, t)
            }
        }]) && F(t.prototype, n), r && F(t, r), e
    }());

    function H(e) {
        l.notifyError(JSON.parse(e.responseText).Message, 5e3)
    }
    var B = {
        getUsers: function(e, t) {
            return function(n) {
                V.getUsers(e, function(e) {
                    n({
                        type: G.RETRIEVED_USERS,
                        payload: e
                    }), t && t(e)
                }, H)
            }
        },
        getUserDetails: function(e, t) {
            return function(n) {
                V.getUserDetails(e, function(e) {
                    n({
                        type: G.RETRIEVED_USER_DETAILS,
                        payload: e
                    }), t && t(e)
                }, H)
            }
        },
        getUserFilters: function(e) {
            return function() {
                V.getUserFilters(function(t) {
                    e && e(t)
                }, H)
            }
        },
        createUser: function(e, t, n) {
            return function(r) {
                V.createUser(e, function(e) {
                    r({
                        type: G.CREATE_USER,
                        payload: e,
                        filter: t
                    }), n && n(e)
                }, H)
            }
        },
        updateUserBasicInfo: function(e, t) {
            return function(n) {
                V.updateUserBasicInfo(e, function(e) {
                    n({
                        type: G.UPDATE_USER,
                        payload: e
                    }), t && t(e)
                }, H)
            }
        },
        changePassword: function(e, t) {
            return function() {
                V.changePassword(e, function(e) {
                    t && t(e)
                }, H)
            }
        },
        forceChangePassword: function(e, t) {
            return function() {
                V.forceChangePassword(e, function(e) {
                    t && t(e)
                }, H)
            }
        },
        sendPasswordResetLink: function(e, t) {
            return function() {
                V.sendPasswordResetLink(e, function(e) {
                    t && t(e)
                }, H)
            }
        },
        deleteUser: function(e, t, n) {
            return function(r) {
                var o = Object.assign({}, e.userDetails);
                o.isDeleted = !0, V.deleteUser({
                    userId: e.userDetails.userId
                }, function(e) {
                    r({
                        type: G.DELETE_USER,
                        payload: o,
                        filter: t
                    }), n && n(e)
                }, H)
            }
        },
        eraseUser: function(e, t) {
            return function(n) {
                V.hardDeleteUser(e, function(r) {
                    n({
                        type: G.ERASE_USER,
                        payload: {
                            userId: e.userId
                        }
                    }), t && t(r)
                }, H)
            }
        },
        removeDeletedUsers: function(e) {
            return function(t) {
                V.removeDeletedUsers(function(t) {
                    e && e(t)
                }, H)
            }
        },
        restoreUser: function(e, t, n) {
            return function(r) {
                var o = Object.assign({}, e.userDetails);
                o.isDeleted = !1, V.restoreUser({
                    userId: e.userDetails.userId
                }, function(e) {
                    r({
                        type: G.RESTORE_USER,
                        payload: o,
                        filter: t
                    }), n && n(e)
                }, H)
            }
        },
        updateSuperUserStatus: function(e, t, n) {
            return function(r) {
                V.updateSuperUserStatus(e, function(o) {
                    r({
                        type: G.USER_MADE_SUPERUSER,
                        payload: {
                            userId: e.userId,
                            setSuperUser: e.setSuperUser
                        },
                        filter: t
                    }), n && n(o)
                }, H)
            }
        },
        updateAuthorizeStatus: function(e, t, n, r) {
            return function(o) {
                var a = Object.assign({}, e.userDetails);
                a.authorized = t, V.updateAuthorizeStatus({
                    userId: e.userDetails.userId,
                    authorized: t
                }, function(e) {
                    o({
                        type: G.UPDATE_USER_AUTHORIZE_STATUS,
                        payload: a,
                        filter: n
                    }), r && r(e)
                }, H)
            }
        },
        unLockUser: function(e, t) {
            return function(n) {
                var r = Object.assign({}, e.userDetails);
                V.unlockUser({
                    userId: e.userDetails.userId
                }, function(e) {
                    n({
                        type: G.USER_UNLOCKED,
                        payload: r
                    }), t && t(e)
                }, H)
            }
        },
        getUserRoles: function(e, t) {
            return function(n) {
                V.getUserRoles(e, function(e) {
                    n({
                        type: G.RETRIEVED_USERS_ROLES,
                        payload: e
                    }), t && t(e)
                }, H)
            }
        },
        passwordStrength: function() {
            return function(e) {
                V.passwordStrengthOptions(function(t) {
                    e({
                        type: G.RETRIEVED_PASSWORD_STRENGTH_OPTIONS,
                        payload: t
                    })
                })
            }
        },
        getSuggestRoles: function(e, t) {
            return function(n) {
                V.getSuggestRoles(e, function(e) {
                    n({
                        type: G.RETRIEVED_SUGGEST_ROLES,
                        payload: {
                            matchedRoles: e
                        }
                    }), t && t(e)
                }, H)
            }
        },
        saveUserRole: function(e, t, n, r) {
            return function(o) {
                V.saveUserRole(e, t, n, function(e) {
                    o({
                        type: G.SAVE_USER_ROLE,
                        payload: e
                    }), r && r(e)
                }, H)
            }
        },
        removeUserRole: function(e, t) {
            return function(n) {
                V.removeUserRole(e, function(r) {
                    n({
                        type: G.REMOVE_USER_ROLE,
                        payload: {
                            userId: e.userId,
                            roleId: e.roleId
                        }
                    }), t && t(r)
                }, H)
            }
        }
    };
    n(62);

    function W(e) {
        return (W = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        })(e)
    }

    function q(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
        }
    }

    function Q(e, t) {
        return !t || "object" !== W(t) && "function" != typeof t ? function(e) {
            if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e
        }(e) : t
    }

    function Y(e) {
        return (Y = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
            return e.__proto__ || Object.getPrototypeOf(e)
        })(e)
    }

    function J(e, t) {
        return (J = Object.setPrototypeOf || function(e, t) {
            return e.__proto__ = t, e
        })(e, t)
    }
    var K = {
            width: "100%"
        },
        $ = {
            userId: 0,
            password: ""
        },
        X = function(e) {
            function t(e) {
                var n;
                return function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, t), (n = Q(this, Y(t).call(this, e))).state = {
                    changePassword: Object.assign({}, $),
                    errors: {
                        password: !1,
                        confirmPassword: !1,
                        passwordsMatch: !1
                    },
                    confirmPassword: ""
                }, n
            }
            var n, a, i;
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        writable: !0,
                        configurable: !0
                    }
                }), t && J(e, t)
            }(t, r["Component"]), n = t, (a = [{
                key: "componentWillMount",
                value: function() {
                    var e = this.state.changePassword;
                    e.userId = this.props.userId, e.password = "", this.setState({
                        changePassword: e
                    })
                }
            }, {
                key: "componentWillReceiveProps",
                value: function(e) {
                    var t = this;
                    this.clear(function() {
                        var n = t.state.changePassword;
                        n.userId = e.userId, t.setState({
                            changePassword: n
                        })
                    })
                }
            }, {
                key: "onChange",
                value: function(e, t) {
                    var n = this;
                    if ("confirmPassword" === e) this.setState({
                        confirmPassword: t.target.value
                    }, function() {
                        n.validateForm()
                    });
                    else {
                        var r = this.state.changePassword;
                        r[e] = t.target.value, this.setState({
                            changePassword: r
                        }, function() {
                            n.validateForm()
                        })
                    }
                }
            }, {
                key: "save",
                value: function() {
                    var e = this;
                    this.validateForm() && this.props.dispatch(B.changePassword(this.state.changePassword, function() {
                        e.cancel(), l.notify(u.get("ChangeSuccessful"), 3e3)
                    }))
                }
            }, {
                key: "validateForm",
                value: function() {
                    var e = !0,
                        t = this.state.errors;
                    t.password = !1, t.confirmPassword = !1, t.passwordsMatch = !1;
                    var n = this.state.changePassword,
                        r = this.state.confirmPassword;
                    return "" === n.password && (t.password = !0, e = !1), "" === n.confirmPassword ? (t.confirmPassword = !0, e = !1) : r !== n.password && (t.passwordsMatch = !0, e = !1), this.setState({
                        errors: t
                    }), e
                }
            }, {
                key: "clear",
                value: function(e) {
                    this.setState({
                        changePassword: Object.assign({}, $),
                        confirmPassword: "",
                        errors: {
                            password: !1,
                            confirmPassword: !1,
                            passwordsMatch: !1
                        }
                    }, function() {
                        "function" == typeof e && e()
                    })
                }
            }, {
                key: "cancel",
                value: function() {
                    this.clear(), "function" == typeof this.props.onCancel && this.props.onCancel()
                }
            }, {
                key: "render",
                value: function() {
                    var e = this.state;
                    return this.props.visible && o.a.createElement("div", {
                        className: "dnn-user-change-password"
                    }, o.a.createElement(c.GridCell, {
                        className: "do-not-close"
                    }, o.a.createElement(c.GridCell, null, o.a.createElement("div", {
                        className: "title"
                    }, u.get("ChangePassword")), o.a.createElement(c.SingleLineInputWithError, {
                        label: u.get("NewPassword"),
                        error: e.errors.password,
                        onChange: this.onChange.bind(this, "password"),
                        tooltipMessage: u.get("NewPassword.Help"),
                        errorMessage: u.get("NewPassword.Required"),
                        style: K,
                        type: "password",
                        autoComplete: "off",
                        inputStyle: {
                            marginBottom: 15
                        },
                        value: e.changePassword.password
                    }), o.a.createElement(c.SingleLineInputWithError, {
                        label: u.get("NewConfirm"),
                        error: e.errors.confirmPassword || e.errors.passwordsMatch,
                        onChange: this.onChange.bind(this, "confirmPassword"),
                        tooltipMessage: u.get("NewConfirm.Help"),
                        errorMessage: e.errors.confirmPassword ? u.get("NewConfirm.Required") : u.get("NewConfirmMismatch.ErrorMessage"),
                        style: K,
                        type: "password",
                        inputStyle: {
                            marginBottom: 15
                        },
                        autoComplete: "off",
                        value: e.confirmPassword
                    })), o.a.createElement(c.GridSystem, null, o.a.createElement(c.Button, {
                        className: "right do-not-close",
                        id: "cancelbtn",
                        type: "secondary",
                        onClick: this.cancel.bind(this)
                    }, u.get("btnCancel")), o.a.createElement(c.Button, {
                        id: "confirmbtn do-not-close",
                        type: "primary",
                        onClick: this.save.bind(this)
                    }, u.get("btnApply")))))
                }
            }]) && q(n.prototype, a), i && q(n, i), t
        }();
    X.propTypes = {
        dispatch: i.a.func.isRequired,
        userId: i.a.number.isRequired,
        visible: i.a.bool,
        onCancel: i.a.func
    }, X.defaultProps = {
        visible: !0
    };
    var Z = Object(s.connect)(function(e) {
        return {
            userDetails: e.users.userDetails
        }
    })(X);
    n(64);

    function ee(e, t) {
        return !t.isSuperUser && (e.isAdmin || e.permissions.MANAGE_ROLES)
    }

    function te(e) {
        return e.isAdmin || e.permissions.MANAGE_PROFILE
    }

    function ne(e) {
        return e.isAdmin || e.permissions.VIEW_SETTINGS
    }

    function re(e) {
        return e.isAdmin || e.permissions.MANAGE_PASSWORD
    }

    function oe(e) {
        return e.isAdmin || e.permissions.EDIT_SETTINGS
    }

    function ae(e) {
        return (ae = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        })(e)
    }

    function ie(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
        }
    }

    function se(e) {
        return (se = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
            return e.__proto__ || Object.getPrototypeOf(e)
        })(e)
    }

    function le(e) {
        if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return e
    }

    function ue(e, t) {
        return (ue = Object.setPrototypeOf || function(e, t) {
            return e.__proto__ = t, e
        })(e, t)
    }
    var ce = function(e) {
        function t(e) {
            var n, r, o;
            return function(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, t), r = this, (n = !(o = se(t).call(this, e)) || "object" !== ae(o) && "function" != typeof o ? le(r) : o).state = {
                userDetails: e.userDetails,
                ChangePasswordVisible: !1
            }, n.showMenu = !1, n.handleClick = n.handleClick.bind(le(n)), n
        }
        var n, a, i;
        return function(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    writable: !0,
                    configurable: !0
                }
            }), t && ue(e, t)
        }(t, r["Component"]), n = t, (a = [{
            key: "handleClick",
            value: function(e) {
                this.rootElement && this.rootElement.contains(e.target) || "string" == typeof e.target.className && ("string" != typeof e.target.className || -1 !== e.target.className.indexOf("menu-item")) || this.props.onClose()
            }
        }, {
            key: "componentDidMount",
            value: function() {
                document.addEventListener("click", this.handleClick, !1);
                var e = this.props;
                this.showMenu = !1, this.getUserDetails(e)
            }
        }, {
            key: "componentDidUpdate",
            value: function() {
                void 0 === this.props.userDetails && this.props.userDetails.userId !== this.props.userId ? (this.showMenu = !1, this.getUserDetails(this.props)) : this.showMenu = !0
            }
        }, {
            key: "getUserDetails",
            value: function(e) {
                var t = this;
                e.dispatch(B.getUserDetails({
                    userId: e.userId
                }, function(e) {
                    var n = Object.assign({}, e);
                    t.setState({
                        userDetails: n
                    }, function() {
                        t.showMenu = !0
                    })
                }))
            }
        }, {
            key: "reload",
            value: function() {
                this.getUserDetails(this.props)
            }
        }, {
            key: "componentWillUnmount",
            value: function() {
                document.removeEventListener("click", this.handleClick, !1)
            }
        }, {
            key: "sort",
            value: function(e, t, n) {
                return n = void 0 === n ? "asc" : n, e = e.sort(function(e, r) {
                    return e[t] > r[t] ? "asc" === n ? 1 : -1 : e[t] < r[t] ? "asc" === n ? -1 : 1 : 0
                })
            }
        }, {
            key: "onItemClick",
            value: function(e) {
                switch (e) {
                    case "ResetPassword":
                        this.onSendPasswordLink(), this.props.onClose();
                        break;
                    case "ChangePassword":
                        this.toggleChangePassword();
                        break;
                    case "ForceChangePassword":
                        this.forcePasswordChange(), this.props.onClose();
                        break;
                    case "DeleteUser":
                        this.deleteUser(), this.props.onClose();
                        break;
                    case "RemoveUser":
                        this.hardDeleteUser(), this.props.onClose();
                        break;
                    case "RestoreUser":
                        this.restoreUser(), this.props.onClose();
                        break;
                    case "cmdUnAuthorize":
                        this.updateAuthorizeStatus(!1), this.props.onClose();
                        break;
                    case "cmdAuthorize":
                        this.updateAuthorizeStatus(!0), this.props.onClose();
                        break;
                    case "cmdUnLock":
                        this.unLockUser(), this.props.onClose();
                        break;
                    case "PromoteToSuperUser":
                        this.updateSuperUserStatus(!0), this.props.onClose();
                        break;
                    case "DemoteToRegularUser":
                        this.updateSuperUserStatus(!1), this.props.onClose();
                        break;
                    case "ViewProfile":
                        this.onViewProfile(), this.props.onClose();
                        break;
                    default:
                        "function" == typeof this.props.userMenuAction && this.props.userMenuAction(e, this.state.userDetails), this.props.onClose()
                }
            }
        }, {
            key: "onViewProfile",
            value: function() {
                var e = this;
                l.closePersonaBar(function() {
                    window.top.location = e.state.userDetails.profileUrl
                })
            }
        }, {
            key: "onSendPasswordLink",
            value: function() {
                this.props.dispatch(B.sendPasswordResetLink({
                    userId: this.props.userId
                }, function() {
                    l.notify(u.get("PasswordSent"), 1e4)
                }))
            }
        }, {
            key: "deleteUser",
            value: function() {
                var e = this;
                l.confirm(u.get("DeleteUser.Confirm"), u.get("Delete"), u.get("Cancel"), function() {
                    e.props.dispatch(B.deleteUser({
                        userDetails: e.props.userDetails
                    }, e.props.filter, function() {
                        l.notify(u.get("UserDeleted"), 3e3), e.reload()
                    }))
                })
            }
        }, {
            key: "hardDeleteUser",
            value: function() {
                var e = this;
                l.confirm(u.get("RemoveUser.Confirm"), u.get("Delete"), u.get("Cancel"), function() {
                    e.props.dispatch(B.eraseUser({
                        userId: e.props.userId
                    }))
                })
            }
        }, {
            key: "restoreUser",
            value: function() {
                var e = this;
                this.props.dispatch(B.restoreUser({
                    userDetails: this.props.userDetails
                }, this.props.filter, function() {
                    l.notify(u.get("UserRestored"), 3e3), e.reload()
                }))
            }
        }, {
            key: "forcePasswordChange",
            value: function() {
                var e = this;
                this.props.dispatch(B.forceChangePassword({
                    userId: this.props.userId
                }, function() {
                    l.notify(u.get("UserPasswordUpdateChanged"), 1e4), e.reload()
                }))
            }
        }, {
            key: "updateAuthorizeStatus",
            value: function(e) {
                var t = this;
                this.props.dispatch(B.updateAuthorizeStatus({
                    userDetails: this.props.userDetails
                }, e, this.props.filter, function() {
                    l.notify(e ? u.get("UserAuthorized") : u.get("UserUnAuthorized"), 3e3), t.reload()
                }))
            }
        }, {
            key: "unLockUser",
            value: function() {
                var e = this;
                this.props.dispatch(B.unLockUser({
                    userDetails: this.props.userDetails
                }, function() {
                    l.notify(u.get("UserUnLocked"), 3e3), e.reload()
                }))
            }
        }, {
            key: "updateSuperUserStatus",
            value: function(e) {
                var t = this;
                this.props.dispatch(B.updateSuperUserStatus({
                    userId: this.props.userId,
                    setSuperUser: e
                }, this.props.filter, function() {
                    t.reload()
                }))
            }
        }, {
            key: "toggleChangePassword",
            value: function(e) {
                var t = !this.state.ChangePasswordVisible;
                this.setState({
                    ChangePasswordVisible: t
                }), e && this.props.onClose()
            }
        }, {
            key: "render",
            value: function() {
                var e, t, n = this,
                    r = [{
                        key: "ViewProfile",
                        title: u.get("ViewProfile"),
                        index: 10
                    }];
                return e = this.props.appSettings.applicationSettings.settings, t = this.state.userDetails.userId, e.isHost && t !== e.userId && (this.state.userDetails.isSuperUser ? this.state.userDetails.isSuperUser && (r = [{
                        key: "DemoteToRegularUser",
                        title: u.get("DemoteToRegularUser"),
                        index: 80
                    }].concat(r)) : r = [{
                        key: "PromoteToSuperUser",
                        title: u.get("PromoteToSuperUser"),
                        index: 80
                    }].concat(r)), re(this.props.appSettings.applicationSettings.settings, this.state.userDetails.userId) && (r = [{
                        key: "ResetPassword",
                        title: u.get("ResetPassword"),
                        index: 40
                    }].concat(r), r = [{
                        key: "ChangePassword",
                        title: u.get("ChangePassword"),
                        index: 30
                    }].concat(r), this.state.userDetails.needUpdatePassword || (r = [{
                        key: "ForceChangePassword",
                        title: u.get("ForceChangePassword"),
                        index: 40
                    }].concat(r))),
                    function(e, t) {
                        return (e.isAdmin || e.permissions.DELETE_USER) && t !== e.userId
                    }(this.props.appSettings.applicationSettings.settings, this.state.userDetails.userId) && (this.state.userDetails.isDeleted ? (r = [{
                        key: "RestoreUser",
                        title: u.get("RestoreUser"),
                        index: 70
                    }].concat(r), r = [{
                        key: "RemoveUser",
                        title: u.get("RemoveUser"),
                        index: 60
                    }].concat(r)) : r = [{
                        key: "DeleteUser",
                        title: u.get("DeleteUser"),
                        index: 60
                    }].concat(r)),
                    function(e, t) {
                        return (e.isAdmin || e.permissions.AUTHORIZE_UNAUTHORIZE_USER) && t !== e.userId
                    }(this.props.appSettings.applicationSettings.settings, this.state.userDetails.userId) && (r = this.state.userDetails.authorized ? [{
                        key: "cmdUnAuthorize",
                        title: u.get("cmdUnAuthorize"),
                        index: 50
                    }].concat(r) : [{
                        key: "cmdAuthorize",
                        title: u.get("cmdAuthorize"),
                        index: 50
                    }].concat(r), this.state.userDetails.isLocked && (r = [{
                        key: "cmdUnLock",
                        title: u.get("cmUnlockUser"),
                        index: 100
                    }].concat(r))), r = r.concat(this.props.getUserMenu && this.props.getUserMenu(this.state.userDetails) || []), r = this.sort(r, "index"), this.showMenu ? o.a.createElement("div", {
                        ref: function(e) {
                            return n.rootElement = e
                        }
                    }, o.a.createElement(c.GridCell, {
                        className: "dnn-user-menu menu-popup"
                    }, !this.state.ChangePasswordVisible && o.a.createElement(P, null, r.map(function(e, t) {
                        return o.a.createElement(L, {
                            key: "menu_item_".concat(t),
                            onMenuAction: n.onItemClick.bind(n, e.key)
                        }, e.title)
                    })), this.state.ChangePasswordVisible && o.a.createElement(Z, {
                        onCancel: this.toggleChangePassword.bind(this, !0),
                        userId: this.props.userId
                    }))) : o.a.createElement("div", null)
            }
        }]) && ie(n.prototype, a), i && ie(n, i), t
    }();
    ce.propTypes = {
        dispatch: i.a.func.isRequired,
        userId: i.a.number.isRequired,
        onClose: i.a.func.isRequired,
        userDetails: i.a.object,
        getUserMenu: i.a.func,
        userMenuAction: i.a.func,
        appSettings: i.a.object,
        filter: i.a.number
    };
    var de = Object(s.connect)(function(e) {
            return {
                userDetails: e.users.userDetails
            }
        })(ce),
        pe = [{
            index: 3,
            size: 5
        }, {
            index: 5,
            size: 30
        }, {
            index: 10,
            size: 30
        }, {
            index: 15,
            size: 15
        }, {
            index: 25,
            size: 20
        }];

    function fe(e) {
        return (fe = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        })(e)
    }

    function he(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
        }
    }

    function me(e, t) {
        return !t || "object" !== fe(t) && "function" != typeof t ? function(e) {
            if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e
        }(e) : t
    }

    function ge(e) {
        return (ge = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
            return e.__proto__ || Object.getPrototypeOf(e)
        })(e)
    }

    function ye(e, t) {
        return (ye = Object.setPrototypeOf || function(e, t) {
            return e.__proto__ = t, e
        })(e, t)
    }
    var ve = function(e) {
        function t() {
            var e;
            return function(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, t), (e = me(this, ge(t).call(this))).rootElement = o.a.createRef(), e.state = {
                opened: !1,
                showMenu: !1
            }, e
        }
        var n, a, i;
        return function(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    writable: !0,
                    configurable: !0
                }
            }), t && ye(e, t)
        }(t, r["Component"]), n = t, (a = [{
            key: "componentDidMount",
            value: function() {
                this._isMounted = !0;
                var e = "" !== this.props.openId && this.props.id === this.props.openId;
                this.setState({
                    opened: e
                })
            }
        }, {
            key: "componentWillUnmount",
            value: function() {
                this._isMounted = !1
            }
        }, {
            key: "handleClick",
            value: function(e) {
                this._isMounted && "string" == typeof e.target.className && -1 === e.target.className.indexOf("do-not-close") && "confirmbtn" !== e.target.id && "cancelbtn" !== e.target.id && "add" !== this.props.openId && "" !== this.props.openId && this.props.id === this.props.openId && this.props.Collapse()
            }
        }, {
            key: "toggle",
            value: function(e) {
                "" !== this.props.openId && this.props.id === this.props.openId && this.props.currentIndex === e ? this.props.Collapse() : this.props.OpenCollapse(this.props.id, e)
            }
        }, {
            key: "toggleUserMenu",
            value: function() {
                var e = !this.state.showMenu;
                this.setState({
                    showMenu: e
                })
            }
        }, {
            key: "getUserActions",
            value: function(e, t) {
                var n = this,
                    r = [];
                r = r.concat(this.props.getUserTabsIcons && this.props.getUserTabsIcons(e) || []), te(this.props.appSettings.applicationSettings.settings) && (r = r.concat([{
                    index: 15,
                    icon: c.SvgIcons.UserIcon,
                    title: u.get("ManageProfile.title")
                }])), ne(this.props.appSettings.applicationSettings.settings) && (r = r.concat([{
                    index: 10,
                    icon: c.SvgIcons.SettingsIcon,
                    title: u.get("ManageSettings.title")
                }])), ee(this.props.appSettings.applicationSettings.settings, e) && (r = r.concat([{
                    index: 5,
                    icon: c.SvgIcons.ShieldIcon,
                    title: u.get("ManageRoles.title")
                }]));
                var a = 0,
                    i = x(r, "index", "desc").map(function(e) {
                        var r = o.a.createElement("div", {
                            key: "user_action_".concat(a),
                            title: e.title,
                            className: "extension-action " + !(t && n.props.currentIndex === a),
                            dangerouslySetInnerHTML: {
                                __html: e.icon
                            },
                            onClick: n.toggle.bind(n, a)
                        });
                        return a++, r
                    });
                return [o.a.createElement("div", {
                    key: "user_action_wrapper_".concat(e.userId),
                    style: {
                        position: "relative"
                    }
                }, o.a.createElement("div", {
                    className: "extension-action " + !this.state.showMenu,
                    dangerouslySetInnerHTML: {
                        __html: c.SvgIcons.MoreMenuIcon
                    },
                    onClick: this.toggleUserMenu.bind(this)
                }), this.state.showMenu && o.a.createElement(de, {
                    filter: this.props.filter,
                    appSettings: this.props.appSettings,
                    getUserMenu: this.props.getUserMenu && this.props.getUserMenu.bind(this),
                    userMenuAction: this.props.userMenuAction && this.props.userMenuAction.bind(this),
                    onClose: this.toggleUserMenu.bind(this),
                    userId: e.userId
                }))].concat(i)
            }
        }, {
            key: "getUserColumns",
            value: function(e, t, n) {
                var r = this.getUserActions(e, n),
                    a = this.props.getUserColumns && this.props.getUserColumns(e),
                    i = void 0 !== this.props.columnSizes ? this.props.columnSizes : pe,
                    s = [];
                if (this.props.appSettings.applicationSettings.settings.dataConsentActive) {
                    var l = "black",
                        d = c.SvgIcons.Signature,
                        p = u.get("HasAgreedToTerms.title");
                    e.requestsRemoval ? (l = "red", d = c.SvgIcons.UserSlash, p = u.get("RequestsRemoval.title")) : e.isDeleted ? (l = "grey", d = c.SvgIcons.UserSlash, p = u.get("Deleted")) : e.authorized ? e.hasAgreedToTerms || (l = "grey", p = u.get("HasNotAgreedToTerms.title")) : (l = "grey", d = c.SvgIcons.ShieldIcon, p = u.get("UnAuthorized")), s = [{
                        index: 3,
                        content: o.a.createElement(c.GridCell, {
                            key: "gc-userstatus-".concat(e.userId),
                            columnSize: i.find(function(e) {
                                return 3 === e.index
                            }).size
                        }, o.a.createElement("span", {
                            dangerouslySetInnerHTML: {
                                __html: d
                            },
                            className: "user-status " + l,
                            title: p
                        }))
                    }]
                }
                return x(s = s.concat([{
                    index: 5,
                    content: o.a.createElement(c.GridCell, {
                        key: "gc-username-".concat(e.userId),
                        columnSize: i.find(function(e) {
                            return 5 === e.index
                        }).size,
                        className: "user-names" + (e.isDeleted ? " deleted" : "")
                    }, o.a.createElement("h6", null, o.a.createElement(c.TextOverflowWrapper, {
                        className: "email-link",
                        text: e.displayName,
                        maxWidth: 125
                    })), "-" !== e.displayName && o.a.createElement("p", null, e.userName))
                }, {
                    index: 10,
                    content: o.a.createElement(c.GridCell, {
                        key: "gc-email-link-".concat(e.userId),
                        columnSize: i.find(function(e) {
                            return 10 === e.index
                        }).size,
                        className: "user-emails" + (e.isDeleted ? " deleted" : "")
                    }, o.a.createElement(c.TextOverflowWrapper, {
                        className: "email-link",
                        isAnchor: !0,
                        href: "mailto:" + e.email,
                        text: e.email,
                        maxWidth: 125
                    }))
                }, {
                    index: 15,
                    content: o.a.createElement(c.GridCell, {
                        key: "gc-createdon-".concat(e.userId),
                        columnSize: i.find(function(e) {
                            return 15 === e.index
                        }).size,
                        className: "user-joined" + (e.isDeleted ? " deleted" : "")
                    }, "-" !== e.createdOnDate && o.a.createElement("p", null, S(e.createdOnDate)), "-" === e.createdOnDate && e.createdOnDate)
                }, {
                    index: 25,
                    content: "add" !== t && o.a.createElement(c.GridCell, {
                        key: "gc-actions-".concat(e.userId),
                        columnSize: i.find(function(e) {
                            return 25 === e.index
                        }).size,
                        style: {
                            float: "right",
                            textAlign: "right",
                            paddingRight: 2
                        }
                    }, r)
                }]).concat(a || []), "index").map(function(e) {
                    return e.content
                })
            }
        }, {
            key: "render",
            value: function() {
                var e = this,
                    t = this.props,
                    n = this.props.user,
                    r = "" !== t.openId && t.id === t.openId,
                    a = "userRow-" + Math.random() + Date.now();
                void 0 === n && (n = {
                    avatar: "-",
                    displayName: "-",
                    userName: "-",
                    email: "-",
                    createdOnDate: "-",
                    authorized: "-"
                });
                var i = this.getUserColumns(n, t.id, r);
                return o.a.createElement(c.GridCell, {
                    className: "collapsible-component-users",
                    id: a,
                    ref: function(t) {
                        return e.rootElement = t
                    }
                }, o.a.createElement(c.GridCell, {
                    className: "collapsible-header-users " + !r
                }, o.a.createElement(c.GridCell, {
                    className: b.a.extensionDetailRow + " " + t.addIsOpened,
                    columnSize: 100
                }, (!t.addIsOpened || "add-opened" === t.addIsOpened) && o.a.createElement(c.GridCell, null, i), o.a.createElement(c.Collapsible, {
                    accordion: !0,
                    isOpened: r,
                    keepCollapsedContent: !0,
                    className: "user-detail-row"
                }, r && t.children))))
            }
        }]) && he(n.prototype, a), i && he(n, i), t
    }();
    ve.propTypes = {
        user: i.a.object,
        OpenCollapse: i.a.func,
        Collapse: i.a.func,
        id: i.a.string,
        openId: i.a.string,
        currentIndex: i.a.number,
        getUserTabsIcons: i.a.func,
        getUserColumns: i.a.func,
        getUserMenu: i.a.func,
        userMenuAction: i.a.func,
        appSettings: i.a.object,
        columnSizes: i.a.array,
        filter: i.a.number
    }, ve.defaultProps = {
        isEvoq: !1
    };
    var be = ve;
    n(66);

    function we(e) {
        return (we = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        })(e)
    }

    function Ee(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
        }
    }

    function Se(e, t) {
        return !t || "object" !== we(t) && "function" != typeof t ? function(e) {
            if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e
        }(e) : t
    }

    function Oe(e) {
        return (Oe = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
            return e.__proto__ || Object.getPrototypeOf(e)
        })(e)
    }

    function xe(e, t) {
        return (xe = Object.setPrototypeOf || function(e, t) {
            return e.__proto__ = t, e
        })(e, t)
    }
    var Ce = function(e) {
        function t() {
            return function(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, t), Se(this, Oe(t).call(this))
        }
        var n, o, a;
        return function(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    writable: !0,
                    configurable: !0
                }
            }), t && xe(e, t)
        }(t, r["Component"]), n = t, (o = [{
            key: "render",
            value: function() {
                var e = this.props;
                return e.renderIndex >= 0 && e.children[e.renderIndex]
            }
        }]) && Ee(n.prototype, o), a && Ee(n, a), t
    }();
    Ce.propTypes = {
        renderIndex: i.a.number,
        children: i.a.array
    }, Ce.defaultProps = {
        renderIndex: 0
    };
    var Te = Ce,
        _e = n(49),
        Re = n.n(_e),
        ke = "weak",
        De = "fair",
        Pe = "strong",
        Ue = function(e, t) {
            if (null == t) return null;
            var n = Ie(e, t);
            return e.length <= 2 ? null : n.rating < 3 ? ke : n.rating < 5 ? De : n.rating >= 5 ? Pe : void 0
        },
        Ie = function(e, t) {
            var n = 0,
                r = t.minLength,
                o = !1,
                a = !1,
                i = !1,
                s = !1,
                l = !1,
                u = !1,
                c = t.minNumberOfSpecialChars || 0,
                d = t.validationExpression || "";
            if (e.length > 0) {
                e.match(/[a-z]/) && (n++, a = !0), e.match(/[A-Z]/) && (n++, o = !0), e.match(/[0-9]/g) && (n++, s = !0);
                var p = e.match(/[!,@,#,$,%,&,*,(,),\-,_,=,+,\',\",\\,|,\,,<,.,>,;,:,\/,?,\[,{,\],}]/g);
                p && p.length >= c && (n++, i = !0), e.length >= r && (n++, l = !0), e.length >= r + 3 && n++, d && (u = new RegExp(d, "g").test(e))
            }
            return {
                rating: n,
                maxRating: 5,
                hasOneUpperCaseChar: o,
                hasOneLowerCaseChar: a,
                hasMinNumberOfSpecialChars: i,
                hasOneNumericChar: s,
                hasLengthOfNChars: l,
                matchValidationExpression: u
            }
        };
    n(69);

    function Ne(e) {
        return (Ne = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        })(e)
    }

    function je(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
        }
    }

    function Me(e, t) {
        return !t || "object" !== Ne(t) && "function" != typeof t ? function(e) {
            if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e
        }(e) : t
    }

    function Ae(e) {
        return (Ae = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
            return e.__proto__ || Object.getPrototypeOf(e)
        })(e)
    }

    function Le(e, t) {
        return (Le = Object.setPrototypeOf || function(e, t) {
            return e.__proto__ = t, e
        })(e, t)
    }
    var Ge = function(e) {
        function t(e) {
            return function(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, t), Me(this, Ae(t).call(this, e))
        }
        var n, a, i;
        return function(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    writable: !0,
                    configurable: !0
                }
            }), t && Le(e, t)
        }(t, r["Component"]), n = t, (a = [{
            key: "componentDidMount",
            value: function() {
                this.props.loadPasswordStrengthOptions()
            }
        }, {
            key: "render",
            value: function() {
                return o.a.createElement("div", {
                    className: "passwordContainer"
                }, o.a.createElement(c.SingleLineInputWithError, {
                    label: u.get("Password"),
                    error: this.props.error.password,
                    onChange: this.props.onChangePassword,
                    tooltipMessage: u.get("Password.Help"),
                    errorMessage: u.get("Password.Required"),
                    style: this.props.style,
                    inputStyle: this.props.requiresQuestionAndAnswer ? {
                        marginBottom: 0
                    } : {
                        marginBottom: 15
                    },
                    type: "password",
                    autoComplete: "off",
                    value: this.props.UserDetails.password,
                    tabIndex: 7
                }), o.a.createElement("div", {
                    id: "passwordStrengthBar",
                    className: "passwordStrength " + Ue(this.props.UserDetails.password, this.props.passwordStrengthOptions)
                }), o.a.createElement("div", {
                    id: "passwordStrengthLabel",
                    className: "passwordStrengthLabel " + Ue(this.props.UserDetails.password, this.props.passwordStrengthOptions)
                }, Ue(this.props.UserDetails.password, this.props.passwordStrengthOptions)))
            }
        }]) && je(n.prototype, a), i && je(n, i), t
    }();
    Ge.propTypes = {
        error: i.a.object,
        style: i.a.object.isRequired,
        UserDetails: i.a.object.isRequired,
        requiresQuestionAndAnswer: i.a.bool,
        onChangePassword: i.a.func.isRequired,
        passwordStrengthOptions: i.a.object,
        loadPasswordStrengthOptions: i.a.func
    };
    var Fe = Object(s.connect)(function(e) {
        return {
            passwordStrengthOptions: e.users.passwordStrengthOptions
        }
    }, function(e) {
        return {
            loadPasswordStrengthOptions: function() {
                e(B.passwordStrength())
            }
        }
    })(Ge);

    function ze(e) {
        return (ze = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        })(e)
    }

    function Ve(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
        }
    }

    function He(e, t) {
        return !t || "object" !== ze(t) && "function" != typeof t ? function(e) {
            if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e
        }(e) : t
    }

    function Be(e) {
        return (Be = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
            return e.__proto__ || Object.getPrototypeOf(e)
        })(e)
    }

    function We(e, t) {
        return (We = Object.setPrototypeOf || function(e, t) {
            return e.__proto__ = t, e
        })(e, t)
    }
    var qe = {
            width: "100%"
        },
        Qe = {
            firstName: "",
            lastName: "",
            email: "",
            userName: "",
            password: "",
            question: "",
            answer: "",
            randomPassword: !1,
            authorize: !0,
            notify: !1
        },
        Ye = function(e) {
            function t(e) {
                var n;
                return function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, t), (n = He(this, Be(t).call(this, e))).state = {
                    UserDetails: Object.assign({}, Qe),
                    confirmPassword: "",
                    errors: {
                        firstName: !1,
                        lastName: !1,
                        userName: !1,
                        email: !1,
                        password: !1,
                        confirmPassword: !1,
                        passwordsMatch: !1,
                        question: !1,
                        answer: !1
                    }
                }, n.submitted = !1, n
            }
            var n, a, i;
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        writable: !0,
                        configurable: !0
                    }
                }), t && We(e, t)
            }(t, r["Component"]), n = t, (a = [{
                key: "onChangePassword",
                value: function(e) {
                    this.setState({
                        UserDetails: Object.assign(this.state.UserDetails, {
                            password: e.target.value
                        }),
                        errors: Object.assign(this.state.errors, {
                            password: !1
                        })
                    })
                }
            }, {
                key: "onChange",
                value: function(e, t) {
                    var n = this,
                        r = this.state.UserDetails;
                    if ("randomPassword" === e || "authorize" === e || "notify" === e) r[e] = t;
                    else if ("confirmPassword" === e) {
                        var o = this.state.confirmPassword;
                        o = t.target.value, this.setState({
                            confirmPassword: o
                        })
                    } else r[e] = t.target.value;
                    this.setState({}, function() {
                        n.validateForm()
                    })
                }
            }, {
                key: "save",
                value: function() {
                    var e = this;
                    this.submitted = !0, this.validateForm() && this.props.save(B.createUser(this.state.UserDetails, this.props.filter, function() {
                        e.cancel(), l.notify(u.get("UserCreated"), 3e3)
                    }))
                }
            }, {
                key: "clearForm",
                value: function(e) {
                    var t = this.state.UserDetails;
                    t = Object.assign({}, Qe);
                    var n = this.state.errors;
                    n.firstName = !1, n.lastName = !1, n.userName = !1, n.email = !1, n.password = !1, n.confirmPassword = !1, n.passwordsMatch = !1, n.question = !1, n.answer = !1, this.submitted = !1, this.setState({
                        UserDetails: t,
                        errors: n,
                        confirmPassword: ""
                    }, function() {
                        "function" == typeof e && e()
                    })
                }
            }, {
                key: "cancel",
                value: function() {
                    var e = this;
                    this.clearForm(function() {
                        e.props.onCancel()
                    })
                }
            }, {
                key: "validateForm",
                value: function() {
                    var e = !0,
                        t = this.props.appSettings.applicationSettings.settings.requiresQuestionAndAnswer;
                    if (this.submitted) {
                        var n = this.state.UserDetails,
                            r = this.state.errors;
                        r.firstName = !1, r.lastName = !1, r.userName = !1, r.email = !1, r.password = !1, r.confirmPassword = !1, r.passwordsMatch = !1, r.question = !1, r.answer = !1, "" === n.firstName && (r.firstName = !0, e = !1), "" === n.lastName && (r.lastName = !0, e = !1), "" === n.userName && (r.userName = !0, e = !1), "" !== n.email && O(n.email) || (r.email = !0, e = !1), !1 === n.randomPassword && "" === n.password && (r.password = !0, e = !1), !1 === n.randomPassword && "" === this.state.confirmPassword ? (r.confirmPassword = !0, e = !1) : !1 === n.randomPassword && this.state.confirmPassword !== n.password && (r.passwordsMatch = !0, e = !1), t && ("" === n.question && (r.question = !0, e = !1), "" === n.answer && (r.answer = !0, e = !1)), this.setState({
                            errors: r
                        })
                    }
                    return e
                }
            }, {
                key: "render",
                value: function() {
                    var e = this.props,
                        t = this.state,
                        n = e.appSettings.applicationSettings.settings.requiresQuestionAndAnswer;
                    return o.a.createElement(c.GridCell, {
                        className: Re.a.newExtensionModal,
                        style: e.style
                    }, o.a.createElement(c.GridCell, {
                        className: "new-user-box"
                    }, o.a.createElement(c.GridSystem, {
                        className: "with-right-border top-half"
                    }, o.a.createElement("div", null, o.a.createElement(c.SingleLineInputWithError, {
                        value: t.UserDetails.firstName,
                        error: t.errors.firstName,
                        onChange: this.onChange.bind(this, "firstName"),
                        label: u.get("FirstName"),
                        tooltipMessage: u.get("FirstName.Help"),
                        errorMessage: u.get("FirstName.Required"),
                        style: qe,
                        autoComplete: "off",
                        inputStyle: {
                            marginBottom: 25
                        },
                        tabIndex: 1
                    }), o.a.createElement(c.SingleLineInputWithError, {
                        value: t.UserDetails.userName,
                        error: t.errors.userName,
                        onChange: this.onChange.bind(this, "userName"),
                        label: u.get("Username"),
                        tooltipMessage: u.get("Username.Help"),
                        errorMessage: u.get("Username.Required"),
                        style: qe,
                        autoComplete: "off",
                        inputStyle: {
                            marginBottom: 25
                        },
                        tabIndex: 3
                    }), o.a.createElement(c.Switch, {
                        value: t.UserDetails.authorize,
                        label: u.get("Approved"),
                        title: u.get("Approved.Help"),
                        onChange: this.onChange.bind(this, "authorize"),
                        tabIndex: 5,
                        onText: u.get("SwitchOn"),
                        offText: u.get("SwitchOff")
                    })), o.a.createElement("div", null, o.a.createElement(c.SingleLineInputWithError, {
                        value: t.UserDetails.lastName,
                        error: t.errors.lastName,
                        onChange: this.onChange.bind(this, "lastName"),
                        label: u.get("LastName"),
                        tooltipMessage: u.get("LastName.Help"),
                        errorMessage: u.get("LastName.Required"),
                        style: qe,
                        autoComplete: "off",
                        inputStyle: {
                            marginBottom: 25
                        },
                        tabIndex: 2
                    }), o.a.createElement(c.SingleLineInputWithError, {
                        value: t.UserDetails.email,
                        error: t.errors.email,
                        onChange: this.onChange.bind(this, "email"),
                        label: u.get("Email"),
                        tooltipMessage: u.get("Email.Help"),
                        errorMessage: u.get("Email.Required"),
                        style: qe,
                        autoComplete: "off",
                        inputStyle: {
                            marginBottom: 25
                        },
                        tabIndex: 4
                    }), o.a.createElement(c.Switch, {
                        value: t.UserDetails.randomPassword,
                        title: u.get("Random.Help"),
                        label: u.get("Random") + ":",
                        onChange: this.onChange.bind(this, "randomPassword"),
                        tabIndex: 6,
                        onText: u.get("SwitchOn"),
                        offText: u.get("SwitchOff")
                    }))), !t.UserDetails.randomPassword && o.a.createElement(c.GridCell, null, o.a.createElement("hr", null)), !t.UserDetails.randomPassword && o.a.createElement(c.GridSystem, null, o.a.createElement(Fe, {
                        error: t.errors,
                        onChangePassword: this.onChangePassword.bind(this),
                        style: qe,
                        inputStyle: n ? {
                            marginBottom: 0
                        } : {
                            marginBottom: 15
                        },
                        UserDetails: this.state.UserDetails
                    }), o.a.createElement(c.SingleLineInputWithError, {
                        label: u.get("Confirm"),
                        error: t.errors.confirmPassword || t.errors.passwordsMatch,
                        onChange: this.onChange.bind(this, "confirmPassword"),
                        tooltipMessage: u.get("Confirm.Help"),
                        errorMessage: t.errors.confirmPassword ? u.get("Confirm.Required") : u.get("ConfirmMismatch.ErrorMessage"),
                        style: qe,
                        type: "password",
                        autoComplete: "off",
                        inputStyle: n ? {
                            marginBottom: 0
                        } : {
                            marginBottom: 15
                        },
                        value: t.confirmPassword,
                        tabIndex: 8
                    })), n && o.a.createElement(c.GridSystem, null, o.a.createElement("div", null, o.a.createElement(c.SingleLineInputWithError, {
                        label: u.get("Question"),
                        error: t.errors.question,
                        onChange: this.onChange.bind(this, "question"),
                        tooltipMessage: u.get("Question.Help"),
                        errorMessage: u.get("Question.Required"),
                        style: qe,
                        inputStyle: {
                            marginBottom: 15
                        },
                        autoComplete: "off",
                        value: t.UserDetails.question,
                        tabIndex: 9
                    })), o.a.createElement("div", null, o.a.createElement(c.SingleLineInputWithError, {
                        label: u.get("Answer"),
                        error: t.errors.answer,
                        onChange: this.onChange.bind(this, "answer"),
                        tooltipMessage: u.get("Answer.Help"),
                        errorMessage: u.get("Answer.Required"),
                        style: qe,
                        autoComplete: "off",
                        inputStyle: {
                            marginBottom: 15
                        },
                        value: t.UserDetails.answer,
                        tabIndex: 10
                    }))), o.a.createElement(c.GridCell, {
                        columnSize: 100,
                        className: "email-notification-line"
                    }, o.a.createElement(c.Checkbox, {
                        value: t.UserDetails.notify,
                        label: u.get("Notify"),
                        onChange: this.onChange.bind(this, "notify"),
                        tabIndex: 9
                    })), o.a.createElement(c.GridCell, {
                        columnSize: 100,
                        className: "modal-footer"
                    }, o.a.createElement(c.Button, {
                        id: "cancelbtn",
                        type: "secondary",
                        onClick: this.cancel.bind(this),
                        tabIndex: 10
                    }, u.get("btnCancel")), o.a.createElement(c.Button, {
                        id: "confirmbtn",
                        type: "primary",
                        onClick: this.save.bind(this),
                        tabIndex: 11
                    }, u.get("btnSave")))))
                }
            }]) && Ve(n.prototype, a), i && Ve(n, i), t
        }();
    Ye.propTypes = {
        save: i.a.func.isRequired,
        onCancel: i.a.func.isRequired,
        style: i.a.object,
        filter: i.a.number,
        appSettings: i.a.object
    };
    var Je = Object(s.connect)(function() {
            return {}
        }, function(e) {
            return {
                save: function(t) {
                    e(t)
                }
            }
        })(Ye),
        Ke = n(50),
        $e = n.n(Ke);

    function Xe(e) {
        return (Xe = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        })(e)
    }

    function Ze(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
        }
    }

    function et(e, t) {
        return !t || "object" !== Xe(t) && "function" != typeof t ? function(e) {
            if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e
        }(e) : t
    }

    function tt(e) {
        return (tt = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
            return e.__proto__ || Object.getPrototypeOf(e)
        })(e)
    }

    function nt(e, t) {
        return (nt = Object.setPrototypeOf || function(e, t) {
            return e.__proto__ = t, e
        })(e, t)
    }
    var rt = {
            width: "100%"
        },
        ot = {
            userId: 0,
            displayName: "",
            userName: "",
            email: ""
        },
        at = function(e) {
            function t(e) {
                var n;
                return function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, t), (n = et(this, tt(t).call(this, e))).state = {
                    accountSettings: Object.assign(ot),
                    userDetails: e.userDetails,
                    errors: {
                        displayName: !1,
                        userName: !1,
                        loading: !1,
                        email: !1
                    },
                    ChangePasswordVisible: !1
                }, n
            }
            var n, a, i;
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        writable: !0,
                        configurable: !0
                    }
                }), t && nt(e, t)
            }(t, r["Component"]), n = t, (a = [{
                key: "componentWillMount",
                value: function() {
                    var e = this.props;
                    void 0 === e.userDetails || e.userDetails.userId !== e.userId ? this.getUserDetails(e, e.userId) : this.updateUserDetailsState(e.userDetails)
                }
            }, {
                key: "componentWillReceiveProps",
                value: function(e) {
                    void 0 === e.userDetails && e.userDetails.userId !== e.userId ? this.getUserDetails(e, e.userId) : this.updateUserDetailsState(e.userDetails)
                }
            }, {
                key: "makeBlankObj",
                value: function(e) {
                    var t = Object.assign({}, e);
                    return Object.keys(t).forEach(function(e) {
                        return t[e] = ""
                    }), t
                }
            }, {
                key: "getUserDetails",
                value: function(e, t) {
                    var n = this,
                        r = this.makeBlankObj(this.state.accountSettings),
                        o = this.makeBlankObj(this.state.userDetails);
                    this.setState({
                        accountSettings: r,
                        userDetails: o,
                        loading: !0
                    }), e.dispatch(B.getUserDetails({
                        userId: t
                    }, function(e) {
                        n.updateUserDetailsState(e)
                    }))
                }
            }, {
                key: "updateUserDetailsState",
                value: function(e) {
                    var t = Object.assign({}, e),
                        n = this.state.accountSettings;
                    n.displayName = t.displayName, n.userName = t.userName, n.email = t.email, n.userId = t.userId, this.setState({
                        accountSettings: n,
                        userDetails: t,
                        loading: !1
                    })
                }
            }, {
                key: "onChange",
                value: function(e, t) {
                    var n = this;
                    if (!this.state.loading) {
                        var r = this.state.accountSettings;
                        r[e] = t.target.value, this.setState({
                            accountSettings: r
                        }, function() {
                            n.validateForm(!0)
                        })
                    }
                }
            }, {
                key: "save",
                value: function() {
                    var e = this;
                    this.validateForm() && this.props.dispatch(B.updateUserBasicInfo(this.state.accountSettings, function() {
                        l.notify(u.get("UserUpdated"), 3e3), e.getUserDetails(e.props, e.state.accountSettings.userId), e.props.collapse()
                    }))
                }
            }, {
                key: "validateForm",
                value: function() {
                    var e = !0,
                        t = this.state.errors;
                    t.displayName = !1, t.userName = !1, t.email = !1;
                    var n = this.state.accountSettings;
                    return "" === n.displayName && (t.displayName = !0, e = !1), "" === n.userName && (t.userName = !0, e = !1), "" !== n.email && O(n.email) || (t.email = !0, e = !1), this.setState({
                        errors: t
                    }), e
                }
            }, {
                key: "onCancelPassword",
                value: function() {
                    this.setState({
                        ChangePasswordVisible: !1
                    })
                }
            }, {
                key: "onChangePassword",
                value: function() {
                    this.state.loading || this.setState({
                        ChangePasswordVisible: !0
                    })
                }
            }, {
                key: "onForcePasswordChange",
                value: function() {
                    var e = this;
                    this.state.loading || this.props.dispatch(B.forceChangePassword({
                        userId: this.props.userId
                    }, function() {
                        l.notify(u.get("UserPasswordUpdateChanged"), 3e3);
                        var t = e.state.userDetails;
                        t.needUpdatePassword = !0, e.setState({
                            userDetails: t
                        })
                    }))
                }
            }, {
                key: "onSendPasswordLink",
                value: function() {
                    this.state.loading || this.props.dispatch(B.sendPasswordResetLink({
                        userId: this.props.userId
                    }, function() {
                        l.notify(u.get("PasswordSent"), 3e3)
                    }))
                }
            }, {
                key: "stringifyBoolean",
                value: function(e) {
                    return "" === e ? "" : e ? u.get("True") : u.get("False")
                }
            }, {
                key: "render",
                value: function() {
                    var e = this.state,
                        t = this.props.appSettings.applicationSettings.settings.dataConsentActive ? o.a.createElement(c.GridSystem, null, o.a.createElement(c.GridCell, {
                            title: u.get("HasAgreedToTerms.Help")
                        }, u.get("HasAgreedToTerms"), ":"), o.a.createElement(c.GridCell, null, this.stringifyBoolean(e.userDetails.hasAgreedToTerms))) : null,
                        n = this.props.appSettings.applicationSettings.settings.dataConsentActive ? o.a.createElement(c.GridSystem, null, o.a.createElement(c.GridCell, {
                            title: u.get("LastConsented.Help")
                        }, u.get("LastConsented"), ":"), o.a.createElement(c.GridCell, null, "-" === S(e.userDetails.hasAgreedToTermsOn, !0) ? u.get("Never") : S(e.userDetails.hasAgreedToTermsOn, !0))) : null,
                        r = e.userDetails.requestsRemoval ? o.a.createElement("span", {
                            className: "importantNote"
                        }, u.get("RequestedRemoval")) : null;
                    return o.a.createElement(c.GridCell, {
                        className: $e.a.userSettings
                    }, o.a.createElement(c.GridCell, null, o.a.createElement(c.GridCell, {
                        className: "outer-box",
                        columnSize: 50
                    }, o.a.createElement(Z, {
                        visible: this.state.ChangePasswordVisible,
                        onCancel: this.onCancelPassword.bind(this),
                        userId: this.props.userId
                    }), o.a.createElement("div", {
                        className: "title"
                    }, u.get("AccountSettings")), o.a.createElement("div", {
                        className: this.state.loading ? "isloading" : ""
                    }, o.a.createElement(c.SingleLineInputWithError, {
                        value: e.accountSettings.userName,
                        error: e.errors.userName,
                        onChange: this.onChange.bind(this, "userName"),
                        label: u.get("Username"),
                        tooltipMessage: u.get("Username.Help"),
                        errorMessage: u.get("Username.Required"),
                        style: rt,
                        autoComplete: "off",
                        enabled: oe(this.props.appSettings.applicationSettings.settings),
                        inputStyle: {
                            marginBottom: 25
                        }
                    }), o.a.createElement(c.SingleLineInputWithError, {
                        value: e.accountSettings.displayName,
                        error: e.errors.displayName,
                        onChange: this.onChange.bind(this, "displayName"),
                        label: u.get("DisplayName"),
                        tooltipMessage: u.get("DisplayName.Help"),
                        errorMessage: u.get("DisplayName.Required"),
                        style: rt,
                        autoComplete: "off",
                        enabled: oe(this.props.appSettings.applicationSettings.settings),
                        inputStyle: {
                            marginBottom: 25
                        }
                    }), o.a.createElement(c.SingleLineInputWithError, {
                        value: e.accountSettings.email,
                        error: e.errors.email,
                        onChange: this.onChange.bind(this, "email"),
                        label: u.get("Email"),
                        tooltipMessage: u.get("Email.Help"),
                        errorMessage: u.get("Email.Required"),
                        style: rt,
                        autoComplete: "off",
                        enabled: oe(this.props.appSettings.applicationSettings.settings),
                        inputStyle: {
                            marginBottom: 25
                        }
                    })), re(this.props.appSettings.applicationSettings.settings, this.state.userDetails.userId) && o.a.createElement(c.GridCell, {
                        className: "no-padding"
                    }, o.a.createElement("div", {
                        className: "title"
                    }, u.get("PasswordManagement")), o.a.createElement(c.GridCell, {
                        className: "link" + (this.state.loading ? " disabled" : "")
                    }, o.a.createElement("div", {
                        onClick: this.onChangePassword.bind(this)
                    }, "[ ", u.get("ChangePassword"), " ]")), !e.userDetails.needUpdatePassword && o.a.createElement(c.GridCell, {
                        className: "link" + (this.state.loading ? " disabled" : "")
                    }, o.a.createElement("div", {
                        onClick: this.onForcePasswordChange.bind(this)
                    }, "[ ", u.get("ForceChangePassword"), " ]")), o.a.createElement(c.GridCell, {
                        className: "link" + (this.state.loading ? " disabled" : "")
                    }, o.a.createElement("div", {
                        onClick: this.onSendPasswordLink.bind(this)
                    }, "[ ", u.get("ResetPassword"), " ]")))), o.a.createElement(c.GridCell, {
                        className: "outer-box right",
                        columnSize: 50
                    }, o.a.createElement("div", {
                        className: "title"
                    }, u.get("AccountData")), o.a.createElement(c.GridSystem, {
                        className: "first"
                    }, o.a.createElement(c.GridCell, {
                        title: u.get("CreatedDate.Help")
                    }, u.get("CreatedDate")), o.a.createElement(c.GridCell, null, S(e.userDetails.createdOnDate, !0))), o.a.createElement(c.GridSystem, null, o.a.createElement(c.GridCell, {
                        title: u.get("LastLoginDate.Help")
                    }, u.get("LastLoginDate")), o.a.createElement(c.GridCell, null, S(e.userDetails.lastLogin, !0))), o.a.createElement(c.GridSystem, null, o.a.createElement(c.GridCell, {
                        title: u.get("LastActivityDate.Help")
                    }, u.get("LastActivityDate")), o.a.createElement(c.GridCell, null, S(e.userDetails.lastActivity, !0))), o.a.createElement(c.GridSystem, null, o.a.createElement(c.GridCell, {
                        title: u.get("LastPasswordChangeDate.Help")
                    }, u.get("LastPasswordChangeDate")), o.a.createElement(c.GridCell, null, S(e.userDetails.lastPasswordChange, !0))), o.a.createElement(c.GridSystem, null, o.a.createElement(c.GridCell, {
                        title: u.get("LastLockoutDate.Help")
                    }, u.get("LastLockoutDate")), o.a.createElement(c.GridCell, null, "-" === S(e.userDetails.lastLockout, !0) ? u.get("Never") : S(e.userDetails.lastLockout, !0))), o.a.createElement(c.GridSystem, null, o.a.createElement(c.GridCell, {
                        title: u.get("IsOnLine.Help")
                    }, u.get("IsOnLine")), o.a.createElement(c.GridCell, null, this.stringifyBoolean(e.userDetails.isOnline))), o.a.createElement(c.GridSystem, null, o.a.createElement(c.GridCell, {
                        title: u.get("LockedOut.Help")
                    }, u.get("LockedOut")), o.a.createElement(c.GridCell, null, this.stringifyBoolean(e.userDetails.isLocked))), o.a.createElement(c.GridSystem, null, o.a.createElement(c.GridCell, {
                        title: u.get("Approved.Help")
                    }, u.get("Approved")), o.a.createElement(c.GridCell, null, this.stringifyBoolean(e.userDetails.authorized))), t, n, o.a.createElement(c.GridSystem, null, o.a.createElement(c.GridCell, {
                        title: u.get("UpdatePassword.Help")
                    }, u.get("UpdatePassword")), o.a.createElement(c.GridCell, null, this.stringifyBoolean(e.userDetails.needUpdatePassword))), o.a.createElement(c.GridSystem, null, o.a.createElement(c.GridCell, {
                        title: u.get("IsDeleted.Help")
                    }, u.get("IsDeleted")), o.a.createElement(c.GridCell, null, this.stringifyBoolean(e.userDetails.isDeleted), " ", r)), o.a.createElement(c.GridSystem, null, o.a.createElement(c.GridCell, {
                        title: u.get("UserFolder.Help")
                    }, u.get("UserFolder")), o.a.createElement(c.GridCell, null, e.userDetails.userFolder)))), oe(this.props.appSettings.applicationSettings.settings) && o.a.createElement(c.GridCell, {
                        className: "buttons"
                    }, o.a.createElement(c.GridCell, {
                        columnSize: 50,
                        className: "leftBtn"
                    }, o.a.createElement(c.Button, {
                        id: "cancelbtn",
                        type: "secondary",
                        onClick: this.props.collapse.bind(this)
                    }, u.get("btnCancel"))), o.a.createElement(c.GridCell, {
                        columnSize: 50,
                        className: "rightBtn"
                    }, o.a.createElement(c.Button, {
                        id: "confirmbtn",
                        disabled: this.state.loading,
                        type: "primary",
                        onClick: this.save.bind(this)
                    }, u.get("btnSave")))))
                }
            }]) && Ze(n.prototype, a), i && Ze(n, i), t
        }();
    at.propTypes = {
        dispatch: i.a.func.isRequired,
        userId: i.a.number.isRequired,
        collapse: i.a.func.isRequired,
        userDetails: i.a.object,
        appSettings: i.a.object
    };
    var it = Object(s.connect)(function(e) {
        return {
            userDetails: e.users.userDetails
        }
    })(at);
    n(72);

    function st(e) {
        return (st = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        })(e)
    }

    function lt(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
        }
    }

    function ut(e, t) {
        return !t || "object" !== st(t) && "function" != typeof t ? function(e) {
            if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e
        }(e) : t
    }

    function ct(e) {
        return (ct = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
            return e.__proto__ || Object.getPrototypeOf(e)
        })(e)
    }

    function dt(e, t) {
        return (dt = Object.setPrototypeOf || function(e, t) {
            return e.__proto__ = t, e
        })(e, t)
    }
    var pt = function(e) {
        function t(e) {
            var n;
            return function(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, t), (n = ut(this, ct(t).call(this, e))).state = {
                userDetails: e.userDetails
            }, n
        }
        var n, a, i;
        return function(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    writable: !0,
                    configurable: !0
                }
            }), t && dt(e, t)
        }(t, r["Component"]), n = t, (a = [{
            key: "componentDidMount",
            value: function() {
                var e = this.props;
                void 0 !== e.userDetails && e.userDetails.userId === e.userId || this.getUserDetails(e)
            }
        }, {
            key: "componentDidUpdate",
            value: function() {
                void 0 === this.props.userDetails && this.props.userDetails.userId !== this.props.userId && this.getUserDetails(this.props)
            }
        }, {
            key: "getUserDetails",
            value: function(e) {
                var t = this;
                e.dispatch(B.getUserDetails({
                    userId: e.userId
                }, function(e) {
                    var n = Object.assign({}, e);
                    t.setState({
                        userDetails: n
                    })
                }))
            }
        }, {
            key: "render",
            value: function() {
                return o.a.createElement("iframe", {
                    className: "edit-profile",
                    seamless: !0,
                    src: void 0 !== this.state.userDetails && void 0 !== this.state.userDetails.editProfileUrl ? this.state.userDetails.editProfileUrl : ""
                })
            }
        }]) && lt(n.prototype, a), i && lt(n, i), t
    }();
    pt.propTypes = {
        userDetails: i.a.object,
        userId: i.a.number
    };
    var ft = Object(s.connect)(function(e) {
        return {
            userDetails: e.users.userDetails
        }
    })(pt);
    n(74);

    function ht(e) {
        return (ht = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        })(e)
    }

    function mt(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
        }
    }

    function gt(e, t) {
        return !t || "object" !== ht(t) && "function" != typeof t ? function(e) {
            if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e
        }(e) : t
    }

    function yt(e) {
        return (yt = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
            return e.__proto__ || Object.getPrototypeOf(e)
        })(e)
    }

    function vt(e, t) {
        return (vt = Object.setPrototypeOf || function(e, t) {
            return e.__proto__ = t, e
        })(e, t)
    }
    var bt = function(e) {
        function t() {
            var e;
            return function(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, t), (e = gt(this, yt(t).call(this))).state = {
                editIndex: -1,
                editCommand: "",
                isCalendarVisible: !1
            }, e
        }
        var n, a, i;
        return function(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    writable: !0,
                    configurable: !0
                }
            }), t && vt(e, t)
        }(t, r["Component"]), n = t, (a = [{
            key: "onStartTimeClick",
            value: function(e, t) {
                this.setState({
                    editIndex: t,
                    editCommand: "startTime",
                    isCalendarVisible: !0
                })
            }
        }, {
            key: "onExpiresTimeClick",
            value: function(e, t) {
                this.setState({
                    editIndex: t,
                    editCommand: "expiresTime",
                    isCalendarVisible: !0
                })
            }
        }, {
            key: "onDeleteClick",
            value: function(e) {
                var t = this.props;
                l.confirm(function() {
                    var e = arguments[0],
                        t = arguments;
                    return e.replace(/{(\d+)}/gi, function(e, n) {
                        var r = parseInt(n) + 1;
                        return t[r]
                    })
                }(u.get("DeleteRole.Confirm"), e.roleName, e.displayName), u.get("Delete"), u.get("Cancel"), function() {
                    t.dispatch(B.removeUserRole(e))
                })
            }
        }, {
            key: "isEmptyDate",
            value: function(e) {
                return !e || new Date(e).getFullYear() < 1970
            }
        }, {
            key: "onChange",
            value: function(e, t, n) {
                var r = this.state;
                r.editIndex = -1, r.editCommand = "";
                var o = "startTime" === t ? n : e.startTime,
                    a = "expiresTime" === t ? n : e.expiresTime;
                this.props.saveRole(e.roleId, o, a), this.setState({
                    isCalendarVisible: !1
                })
            }
        }, {
            key: "getBoundDate",
            value: function(e, t) {
                if ("startTime" === t) {
                    var n = new Date(2049, 11, 31);
                    return this.isEmptyDate(e.expiresTime) || (n = new Date((new Date).setTime(new Date(e.expiresTime).getTime() - 864e5))), n
                }
                if ("expiresTime" === t) {
                    var r = new Date(1970, 0, 1);
                    return this.isEmptyDate(e.startTime) || (r = new Date((new Date).setTime(new Date(e.startTime).getTime() + 864e5))), r
                }
            }
        }, {
            key: "getDate",
            value: function(e, t) {
                var n = new Date;
                return "startTime" === t ? this.isEmptyDate(e.startTime) || (n = new Date(e.startTime)) : "expiresTime" === t && (this.isEmptyDate(e.expiresTime) || (n = new Date(e.expiresTime))), n
            }
        }, {
            key: "createRoleActions",
            value: function() {
                var e = this.props,
                    t = this.state,
                    n = e.roleDetails.allowExpired ? o.a.createElement("span", null, o.a.createElement(c.DatePicker, {
                        date: this.getDate(e.roleDetails, "startTime"),
                        maxDate: this.getBoundDate(e.roleDetails, "startTime"),
                        updateDate: this.onChange.bind(this, e.roleDetails, "startTime"),
                        mode: "start",
                        applyButtonText: u.get("btnApply"),
                        showIcon: !0,
                        showInput: !1,
                        onIconClick: this.onStartTimeClick.bind(this, e.roleDetails, e.index)
                    })) : null,
                    r = e.roleDetails.allowExpired ? o.a.createElement("span", null, o.a.createElement(c.DatePicker, {
                        date: this.getDate(e.roleDetails, "expiresTime"),
                        minDate: this.getBoundDate(e.roleDetails, "expiresTime"),
                        updateDate: this.onChange.bind(this, e.roleDetails, "expiresTime"),
                        mode: "end",
                        applyButtonText: u.get("btnApply"),
                        showIcon: !0,
                        showInput: !1,
                        onIconClick: this.onExpiresTimeClick.bind(this, e.roleDetails, e.index)
                    })) : null,
                    a = e.roleDetails.allowDelete ? o.a.createElement("a", {
                        className: "extension-action",
                        dangerouslySetInnerHTML: {
                            __html: c.SvgIcons.XIcon
                        },
                        onClick: this.onDeleteClick.bind(this, e.roleDetails, e.index)
                    }) : null;
                return o.a.createElement("div", {
                    className: t.editIndex === e.index ? "edit-row" : null
                }, n, r, a)
            }
        }, {
            key: "render",
            value: function() {
                var e = this.props;
                return o.a.createElement("div", {
                    className: "user-role-row"
                }, o.a.createElement(c.GridCell, {
                    title: e.roleDetails.roleName,
                    columnSize: 25
                }, e.roleDetails.roleName), o.a.createElement(c.GridCell, {
                    columnSize: 20,
                    title: S(e.roleDetails.startTime)
                }, S(e.roleDetails.startTime)), o.a.createElement(c.GridCell, {
                    columnSize: 20,
                    title: S(e.roleDetails.expiresTime)
                }, S(e.roleDetails.expiresTime)), o.a.createElement(c.GridCell, {
                    columnSize: 35
                }, o.a.createElement("div", {
                    className: "actions"
                }, this.createRoleActions())))
            }
        }]) && mt(n.prototype, a), i && mt(n, i), t
    }();
    bt.propTypes = {
        dispatch: i.a.func.isRequired,
        roleDetails: i.a.object.isRequired,
        index: i.a.number,
        saveRole: i.a.func.isRequired,
        deleteRole: i.a.func.isRequired
    };
    var wt = Object(s.connect)(function() {
            return {}
        })(bt),
        Et = (n(76), n(51)),
        St = n.n(Et);

    function Ot(e) {
        return (Ot = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        })(e)
    }

    function xt(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
        }
    }

    function Ct(e, t) {
        return !t || "object" !== Ot(t) && "function" != typeof t ? function(e) {
            if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e
        }(e) : t
    }

    function Tt(e) {
        return (Tt = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
            return e.__proto__ || Object.getPrototypeOf(e)
        })(e)
    }

    function _t(e, t) {
        return (_t = Object.setPrototypeOf || function(e, t) {
            return e.__proto__ = t, e
        })(e, t)
    }
    var Rt = function(e) {
        function t(e) {
            var n;
            return function(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, t), (n = Ct(this, Tt(t).call(this, e))).state = {
                roleSelectState: {
                    userId: -1,
                    keyword: ""
                },
                currentPage: 0,
                pageSize: 10,
                roleKeyword: "",
                sendEmail: !0,
                isOwner: !1,
                allowOwner: !1
            }, n
        }
        var n, a, i;
        return function(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    writable: !0,
                    configurable: !0
                }
            }), t && _t(e, t)
        }(t, r["Component"]), n = t, (a = [{
            key: "componentDidMount",
            value: function() {
                this.getRoles()
            }
        }, {
            key: "getRoles",
            value: function() {
                var e = this.props,
                    t = this.state,
                    n = {
                        userId: e.userDetails.userId,
                        keyword: t.roleKeyword,
                        pageIndex: t.currentPage,
                        pageSize: t.pageSize
                    };
                e.dispatch(B.getUserRoles(n))
            }
        }, {
            key: "getSuggestRoles",
            value: function() {
                var e = this.props,
                    t = this.state,
                    n = t.roleSelectState.roleId >= 0 ? "" : t.roleSelectState.keyword;
                e.dispatch(B.getSuggestRoles({
                    keyword: n,
                    count: 10
                }))
            }
        }, {
            key: "debounceGetSuggestRoles",
            value: function() {
                this.getSuggestRoles()
            }
        }, {
            key: "onRoleSelectorChanged",
            value: function(e) {
                e.roleId || e.roleName || (this.setState({
                    roleSelectState: {
                        roleId: -1,
                        keyword: e
                    }
                }), this.debounceGetSuggestRoles())
            }
        }, {
            key: "onRoleSelectorSelected",
            value: function(e) {
                var t = this;
                this.onRoleSelected(e.roleId, function() {
                    t.setState({
                        roleSelectState: {
                            roleId: e.roleId,
                            keyword: e.roleName
                        }
                    }, function() {
                        t.getSuggestRoles()
                    })
                })
            }
        }, {
            key: "onRoleSelectorToggle",
            value: function() {}
        }, {
            key: "onAddRole",
            value: function() {
                var e = this.state.roleSelectState.roleId; - 1 !== e && void 0 !== e && (this.saveRole(e), this.setState({
                    roleSelectState: {
                        roleId: -1,
                        keyword: ""
                    }
                }))
            }
        }, {
            key: "saveRole",
            value: function(e, t, n) {
                var r = this.props,
                    o = {
                        roleId: e,
                        userId: r.userDetails.userId,
                        startTime: t,
                        expiresTime: n
                    };
                r.dispatch(B.saveUserRole(o, this.state.sendEmail, this.state.isOwner)), this.setState({
                    sendEmail: !0,
                    isOwner: !1,
                    allowOwner: !1
                })
            }
        }, {
            key: "onPageChanged",
            value: function(e, t) {
                var n = this.state;
                void 0 !== t && n.pageSize !== t && (n.pageSize = t), n.currentPage = e, this.setState({
                    state: n
                }), this.getRoles()
            }
        }, {
            key: "getRoleRows",
            value: function() {
                var e = this,
                    t = this.props.userRoles,
                    n = t.map(function(t, n) {
                        return o.a.createElement(wt, {
                            roleDetails: t,
                            index: n,
                            key: "role_row_".concat(n),
                            saveRole: e.saveRole.bind(e)
                        })
                    });
                return o.a.createElement("div", {
                    className: "user-role-body"
                }, t.length > 0 ? n : o.a.createElement("div", {
                    className: "no-roles-row"
                }, u.get("NoRoles")))
            }
        }, {
            key: "onRoleSelected",
            value: function(e, t) {
                if (void 0 !== this.props.matchedRoles && this.props.matchedRoles.length > 0 && this.props.matchedRoles.some(function(t) {
                        return t.roleId === e
                    })) {
                    var n = this.props.matchedRoles.filter(function(t) {
                        return t.roleId === e
                    })[0];
                    this.setState({
                        allowOwner: n.allowOwner
                    }, function() {
                        "function" == typeof t && t()
                    })
                }
            }
        }, {
            key: "onSendEmailClick",
            value: function(e) {
                this.setState({
                    sendEmail: e
                })
            }
        }, {
            key: "onIsOwnerClick",
            value: function(e) {
                this.setState({
                    isOwner: e
                })
            }
        }, {
            key: "renderHeader",
            value: function() {
                var e = [{
                    name: "Role",
                    width: 25
                }, {
                    name: "Start",
                    width: 20
                }, {
                    name: "Expires",
                    width: 20
                }, {
                    name: "",
                    width: 35
                }].map(function(e, t) {
                    return o.a.createElement(c.GridCell, {
                        key: "grid_cell_".concat(t),
                        columnSize: e.width,
                        style: {
                            fontWeight: "bolder"
                        }
                    }, "" !== e.name ? o.a.createElement("span", null, u.get(e.name + ".Header")) : o.a.createElement("div", null))
                });
                return o.a.createElement("div", {
                    className: "user-role-header-row"
                }, e)
            }
        }, {
            key: "renderPaging",
            value: function() {
                if (this.props.totalRecords > 0) return o.a.createElement(c.Pager, {
                    showStartEndButtons: !1,
                    showPageSizeOptions: !1,
                    numericCounters: 0,
                    summaryText: u.get("rolesSummaryText"),
                    pageInfoText: u.get("rolesPageInfoText"),
                    showPageInfo: !0,
                    pageSize: this.state.pageSize,
                    totalRecords: this.props.totalRecords,
                    onPageChanged: this.onPageChanged.bind(this),
                    culture: l.getCulture()
                })
            }
        }, {
            key: "render",
            value: function() {
                var e = this.state;
                return o.a.createElement("div", {
                    className: "userroles-form-form"
                }, o.a.createElement("div", {
                    className: "header"
                }, o.a.createElement("div", {
                    className: "header-title"
                }, u.get("Roles.Title")), o.a.createElement("div", {
                    className: "add-box"
                }, o.a.createElement(c.GridCell, {
                    columnSize: 30
                }, o.a.createElement("div", {
                    className: "send-email-box"
                }, o.a.createElement(c.Checkbox, {
                    value: this.state.sendEmail,
                    onChange: this.onSendEmailClick.bind(this),
                    label: u.get("SendEmail"),
                    labelPlace: "right"
                }), this.state.allowOwner && o.a.createElement(c.Checkbox, {
                    value: this.state.isOwner,
                    onChange: this.onIsOwnerClick.bind(this),
                    label: u.get("IsOwner"),
                    labelPlace: "right"
                }))), o.a.createElement(c.GridCell, {
                    columnSize: 70
                }, o.a.createElement("span", null, o.a.createElement(St.a, {
                    suggest: !1,
                    placeholder: u.get("AddRolePlaceHolder"),
                    open: this.props.matchedRoles && this.props.matchedRoles.length > 0,
                    onToggle: this.onRoleSelectorToggle.bind(this),
                    onChange: this.onRoleSelectorChanged.bind(this),
                    onSelect: this.onRoleSelectorSelected.bind(this),
                    data: this.props.matchedRoles,
                    value: e.roleSelectState.keyword,
                    valueField: "roleId",
                    textField: "roleName"
                }), o.a.createElement("div", {
                    className: "add-role-button",
                    onClick: this.onAddRole.bind(this)
                }, o.a.createElement("div", {
                    className: "extension-action",
                    title: u.get("Add"),
                    dangerouslySetInnerHTML: {
                        __html: c.SvgIcons.AddIcon
                    }
                }), u.get("Add")))))), o.a.createElement("div", {
                    className: "user-roles-list"
                }, this.renderHeader(), this.getRoleRows()), o.a.createElement("div", {
                    className: "user-roles-list-paging"
                }, this.renderPaging()))
            }
        }]) && xt(n.prototype, a), i && xt(n, i), t
    }();
    Rt.propTypes = {
        dispatch: i.a.func.isRequired,
        userDetails: i.a.object.isRequired,
        userRoles: i.a.array.isRequired,
        totalRecords: i.a.number,
        matchedRoles: i.a.array
    }, Rt.defaultProps = {
        matchedRoles: []
    };
    var kt = Object(s.connect)(function(e) {
            return {
                matchedRoles: e.users.matchedRoles,
                userRoles: e.users.userRoles,
                totalRecords: e.users.userRolesCount
            }
        })(Rt),
        Dt = n(52),
        Pt = n.n(Dt);

    function Ut(e) {
        return (Ut = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        })(e)
    }

    function It(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
        }
    }

    function Nt(e, t) {
        return !t || "object" !== Ut(t) && "function" != typeof t ? function(e) {
            if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e
        }(e) : t
    }

    function jt(e) {
        return (jt = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
            return e.__proto__ || Object.getPrototypeOf(e)
        })(e)
    }

    function Mt(e, t) {
        return (Mt = Object.setPrototypeOf || function(e, t) {
            return e.__proto__ = t, e
        })(e, t)
    }
    var At = function(e) {
        function t() {
            var e;
            return function(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, t), (e = Nt(this, jt(t).call(this))).state = {
                openId: "",
                renderIndex: -1
            }, e
        }
        var n, a, i;
        return function(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    writable: !0,
                    configurable: !0
                }
            }), t && Mt(e, t)
        }(t, r["Component"]), n = t, (a = [{
            key: "componentDidMount",
            value: function() {
                this.collapse()
            }
        }, {
            key: "unCollapse",
            value: function(e, t) {
                this.setState({
                    openId: e,
                    renderIndex: t
                })
            }
        }, {
            key: "collapse",
            value: function() {
                "" !== this.state.openId && this.setState({
                    openId: "",
                    renderIndex: -1
                })
            }
        }, {
            key: "toggle",
            value: function(e, t) {
                "" !== e ? this.unCollapse(e, t) : this.collapse()
            }
        }, {
            key: "onAddUser",
            value: function() {
                this.toggle("add" === this.state.openId ? "" : "add", 0)
            }
        }, {
            key: "getChildren",
            value: function(e) {
                var t = [];
                if (t = t.concat(this.props.getUserTabs && this.props.getUserTabs(e) || []), ne(this.props.appSettings.applicationSettings.settings)) {
                    var n = o.a.createElement(it, {
                        key: "usersettings-".concat(e.userId),
                        userId: e.userId,
                        collapse: this.collapse.bind(this),
                        appSettings: this.props.appSettings
                    });
                    t = t.concat([{
                        index: 10,
                        content: n
                    }])
                }
                return ee(this.props.appSettings.applicationSettings.settings, e) && (t = t.concat([{
                    index: 5,
                    content: o.a.createElement(kt, {
                        key: "usersroles-".concat(e.userId),
                        userDetails: e
                    })
                }])), te(this.props.appSettings.applicationSettings.settings) && (t = t.concat([{
                    index: 15,
                    content: o.a.createElement(ft, {
                        key: "editprofile-".concat(e.userId),
                        userId: e.userId
                    })
                }])), x(t, "index", "desc").map(function(e) {
                    return e.content
                })
            }
        }, {
            key: "getHeaders",
            value: function() {
                var e = void 0 !== this.props.columnSizes ? this.props.columnSizes : pe,
                    t = [];
                if (this.props.appSettings.applicationSettings.settings.dataConsentActive && (t = [{
                        index: 3,
                        size: e.find(function(e) {
                            return 3 === e.index
                        }).size,
                        header: ""
                    }]), t = t.concat([{
                        index: 5,
                        size: e.find(function(e) {
                            return 5 === e.index
                        }).size,
                        header: u.get("Name.Header")
                    }, {
                        index: 10,
                        size: e.find(function(e) {
                            return 10 === e.index
                        }).size,
                        header: u.get("Email.Header")
                    }, {
                        index: 15,
                        size: e.find(function(e) {
                            return 15 === e.index
                        }).size,
                        header: u.get("Created.Header")
                    }, {
                        index: 25,
                        size: e.find(function(e) {
                            return 25 === e.index
                        }).size,
                        header: ""
                    }]), void 0 !== this.props.getUserColumns && "function" == typeof this.props.getUserColumns) {
                    var n = this.props.getUserColumns();
                    void 0 !== n && n.length > 0 && (t = x(n.map(function(t) {
                        return {
                            index: t.index,
                            header: t.header,
                            size: e.find(function(e) {
                                return e.index === t.index
                            }).size
                        }
                    }).concat(t), "index"))
                }
                return t
            }
        }, {
            key: "render",
            value: function() {
                var e, t = this,
                    n = this.props,
                    r = 0,
                    a = "add" === this.state.openId && ((e = this.props.appSettings.applicationSettings.settings).isAdmin || e.permissions.ADD_USER),
                    i = this.getHeaders();
                return o.a.createElement(c.GridCell, {
                    className: Pt.a.usersList
                }, o.a.createElement(y, {
                    headers: i
                }), o.a.createElement(be, {
                    Collapse: this.toggle.bind(this),
                    OpenCollapse: this.toggle.bind(this),
                    currentIndex: this.state.renderIndex,
                    openId: this.state.openId,
                    key: "user-add",
                    appSettings: n.appSettings,
                    columnSizes: n.columnSizes,
                    id: "add",
                    addIsOpened: a ? "add-opened" : "closed",
                    getUserMenu: n.getUserMenu && n.getUserMenu.bind(this),
                    userMenuAction: n.userMenuAction && n.userMenuAction.bind(this),
                    filter: n.filter
                }, o.a.createElement(Te, null, [o.a.createElement(Je, {
                    key: "create-user-box-".concat(r++),
                    filter: n.filter,
                    onCancel: t.collapse.bind(t),
                    appSettings: n.appSettings
                })])), n.users && n.users.length > 0 && n.users.map(function(e, a) {
                    var i = "row-" + r++,
                        s = t.getChildren(e);
                    return o.a.createElement(be, {
                        user: e,
                        Collapse: t.collapse.bind(t),
                        OpenCollapse: t.toggle.bind(t),
                        currentIndex: t.state.renderIndex,
                        openId: t.state.openId,
                        key: "user-" + a,
                        getUserColumns: n.getUserColumns && n.getUserColumns.bind(t),
                        getUserTabsIcons: n.getUserTabsIcons && n.getUserTabsIcons.bind(t),
                        getUserMenu: n.getUserMenu && n.getUserMenu.bind(t),
                        userMenuAction: n.userMenuAction && n.userMenuAction.bind(t),
                        appSettings: n.appSettings,
                        columnSizes: n.columnSizes,
                        id: i,
                        filter: n.filter
                    }, o.a.createElement(Te, {
                        renderIndex: t.state.renderIndex
                    }, s))
                }), n.users && 0 === n.users.length && o.a.createElement(c.GridCell, {
                    className: "no-users"
                }, u.get("noUsers")))
            }
        }]) && It(n.prototype, a), i && It(n, i), t
    }();
    At.propTypes = {
        dispatch: i.a.func.isRequired,
        getUserTabs: i.a.func,
        getUserTabsIcons: i.a.func,
        getUserColumns: i.a.func,
        getUserMenu: i.a.func,
        userMenuAction: i.a.func,
        appSettings: i.a.object,
        columnSizes: i.a.array,
        filter: i.a.number
    };
    var Lt = Object(s.connect)(function(e) {
        return {
            users: e.users.users
        }
    }, null, null, {
        withRef: !0
    })(At);
    n(122);

    function Gt(e) {
        return (Gt = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        })(e)
    }

    function Ft(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
        }
    }

    function zt(e, t) {
        return !t || "object" !== Gt(t) && "function" != typeof t ? function(e) {
            if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e
        }(e) : t
    }

    function Vt(e) {
        return (Vt = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
            return e.__proto__ || Object.getPrototypeOf(e)
        })(e)
    }

    function Ht(e, t) {
        return (Ht = Object.setPrototypeOf || function(e, t) {
            return e.__proto__ = t, e
        })(e, t)
    }
    var Bt = function(e) {
        function t(e) {
            var n;
            return function(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, t), (n = zt(this, Vt(t).call(this, e))).state = {
                selectedUserFilter: {
                    label: u.get("Authorized"),
                    value: 0
                },
                searchText: ""
            }, n
        }
        var n, a, i;
        return function(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    writable: !0,
                    configurable: !0
                }
            }), t && Ht(e, t)
        }(t, r["Component"]), n = t, (a = [{
            key: "onSelect",
            value: function(e) {
                var t = this,
                    n = e.label,
                    r = e.value,
                    o = this.state.selectedUserFilter;
                r !== o.value && (o.label = n, o.value = r, 0 === o.value || 5 === o.value ? this.setState({
                    selectedUserFilter: {
                        label: "",
                        value: -1
                    },
                    searchText: ""
                }, function() {
                    t.setState({
                        selectedUserFilter: o,
                        searchText: ""
                    }, function() {
                        t.props.onChange(e, t.state.searchText)
                    })
                }) : this.setState({
                    selectedUserFilter: o,
                    searchText: ""
                }, function() {
                    t.props.onChange(e, t.state.searchText)
                }))
            }
        }, {
            key: "onKeywordChanged",
            value: function(e) {
                var t = this;
                this.setState({
                    searchText: e
                }, function() {
                    t.props.onChange(t.state.selectedUserFilter, e)
                })
            }
        }, {
            key: "BuildUserFiltersOptions",
            value: function() {
                return this.props.userFilters.map(function(e) {
                    return {
                        label: e.Key,
                        value: e.Value
                    }
                })
            }
        }, {
            key: "render",
            value: function() {
                var e = this.BuildUserFiltersOptions();
                return o.a.createElement("div", {
                    className: "users-filter-container"
                }, o.a.createElement(c.GridCell, {
                    columnSize: 35
                }, e && e.length > 0 && o.a.createElement("div", {
                    className: "user-filters-filter"
                }, o.a.createElement(c.Dropdown, {
                    style: {
                        width: "100%"
                    },
                    withBorder: !1,
                    options: e,
                    label: this.state.selectedUserFilter.label,
                    onSelect: this.onSelect.bind(this),
                    prependWith: u.get("ShowLabel")
                }), o.a.createElement("div", {
                    className: "clear"
                }))), o.a.createElement(c.GridCell, {
                    columnSize: 30
                }, o.a.createElement("div", null, "  ")), o.a.createElement(c.GridCell, {
                    columnSize: 35
                }, o.a.createElement("div", {
                    className: "search-filter"
                }, o.a.createElement(c.SearchBox, {
                    placeholder: u.get("SearchPlaceHolder"),
                    onSearch: this.onKeywordChanged.bind(this),
                    maxLength: 50,
                    iconStyle: {
                        right: 0
                    }
                }), o.a.createElement("div", {
                    className: "clear"
                }))))
            }
        }]) && Ft(n.prototype, a), i && Ft(n, i), t
    }();
    Bt.propTypes = {
        dispatch: i.a.func,
        onChange: i.a.func.isRequired,
        userFilters: i.a.array.isRequired
    };
    var Wt = Bt,
        qt = (n(124), n(9)),
        Qt = n(11);

    function Yt(e) {
        return (Yt = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        })(e)
    }

    function Jt(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
        }
    }

    function Kt(e, t) {
        return !t || "object" !== Yt(t) && "function" != typeof t ? function(e) {
            if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e
        }(e) : t
    }

    function $t(e) {
        return ($t = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
            return e.__proto__ || Object.getPrototypeOf(e)
        })(e)
    }

    function Xt(e, t) {
        return (Xt = Object.setPrototypeOf || function(e, t) {
            return e.__proto__ = t, e
        })(e, t)
    }
    var Zt = {
            searchText: "",
            filter: 0,
            pageIndex: 0,
            pageSize: 10,
            sortColumn: "",
            sortAscending: !1,
            resetIndex: !1
        },
        en = function(e) {
            function t() {
                var e;
                return function(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, t), (e = Kt(this, $t(t).call(this))).userTable = o.a.createRef(), e.state = {
                    userFilters: [],
                    searchParameters: Zt
                }, e
            }
            var n, a, i;
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        writable: !0,
                        configurable: !0
                    }
                }), t && Xt(e, t)
            }(t, r["Component"]), n = t, (a = [{
                key: "componentDidMount",
                value: function() {
                    var e = this;
                    this.props.dispatch(qt.CommonUsersActions.getUserFilters(function(t) {
                        var n = Object.assign([], JSON.parse(JSON.stringify(t)));
                        e.setState({
                            userFilters: n
                        })
                    }))
                }
            }, {
                key: "onFilterChange",
                value: function(e, t) {
                    var n = this,
                        r = this.state.searchParameters;
                    r.searchText = t, r.filter = e.value, r.pageIndex = 0, r.resetIndex = !0, this.props.dispatch(qt.CommonUsersActions.getUsers(r)), this.setState({
                        searchParameters: r
                    }, function() {
                        var e = n.state.searchParameters;
                        e.resetIndex = !1, n.setState({
                            searchParameters: e
                        })
                    })
                }
            }, {
                key: "onPageChanged",
                value: function(e, t) {
                    var n = this.state.searchParameters;
                    n.pageIndex = e, n.pageSize = t, this.props.dispatch(qt.CommonUsersActions.getUsers(n)), this.setState({
                        searchParameters: n
                    })
                }
            }, {
                key: "getWorkSpaceTray",
                value: function() {
                    return this.state.userFilters.length > 0 && o.a.createElement(c.GridCell, {
                        className: "users-workspace-tray"
                    }, o.a.createElement(Wt, {
                        onChange: this.onFilterChange.bind(this),
                        userFilters: this.state.userFilters
                    }))
                }
            }, {
                key: "onRemoveDeletedUsers",
                value: function() {
                    var e = this;
                    l.confirm(u.get("RemoveDeleted.Confirm"), u.get("Yes"), u.get("No"), function() {
                        e.props.dispatch(qt.CommonUsersActions.removeDeletedUsers(function() {
                            var t = e.state.searchParameters;
                            e.props.dispatch(qt.CommonUsersActions.getUsers(t)), l.notify(u.get("RemoveDeleted.Done"))
                        }))
                    })
                }
            }, {
                key: "toggleCreateBox",
                value: function() {
                    this.userTable.wrappedInstance.onAddUser()
                }
            }, {
                key: "canAddUser",
                value: function() {
                    return Qt.a.applicationSettings.settings.isAdmin || Qt.a.applicationSettings.settings.permissions.ADD_USER
                }
            }, {
                key: "render",
                value: function() {
                    var e = this,
                        t = this.props,
                        n = this.state,
                        r = n.createBoxVisible ? "without-margin" : "";
                    return o.a.createElement(c.GridCell, null, o.a.createElement(c.PersonaBarPageHeader, {
                        title: u.get("nav_Users")
                    }, this.canAddUser() && o.a.createElement(c.Button, {
                        type: "primary",
                        size: "large",
                        onClick: this.toggleCreateBox.bind(this),
                        title: u.get("btnCreateUser")
                    }, u.get("btnCreateUser")), Qt.a.applicationSettings.settings.isAdmin && o.a.createElement(c.Button, {
                        type: "secondary",
                        size: "large",
                        onClick: function() {
                            e.onRemoveDeletedUsers()
                        },
                        title: u.get("RemoveDeleted.Btn")
                    }, u.get("RemoveDeleted.Btn"))), o.a.createElement(c.PersonaBarPageBody, {
                        workSpaceTrayVisible: !0,
                        workSpaceTrayOutside: !0,
                        workSpaceTray: this.getWorkSpaceTray(),
                        className: r
                    }, o.a.createElement(Lt, {
                        ref: function(t) {
                            return e.userTable = t
                        },
                        appSettings: Qt.a,
                        filter: n.searchParameters.filter
                    }), o.a.createElement("div", {
                        className: "users-paging"
                    }, o.a.createElement(c.Pager, {
                        pageSizeDropDownWithoutBorder: !0,
                        showSummary: !0,
                        showPageInfo: !1,
                        pageSizeOptionText: u.get("usersPageSizeOptionText"),
                        summaryText: u.get("usersSummaryText"),
                        pageSize: this.state.searchParameters.pageSize,
                        totalRecords: t.totalUsers,
                        onPageChanged: this.onPageChanged.bind(this),
                        resetIndex: this.state.searchParameters.resetIndex,
                        culture: l.getCulture()
                    }))))
                }
            }]) && Jt(n.prototype, a), i && Jt(n, i), t
        }();
    en.propTypes = {
        dispatch: i.a.func.isRequired,
        totalUsers: i.a.number
    };
    var tn = Object(s.connect)(function(e) {
        return {
            totalUsers: e.users.totalUsers
        }
    })(en);

    function nn(e) {
        return (nn = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        })(e)
    }

    function rn(e, t) {
        for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
        }
    }

    function on(e, t) {
        return !t || "object" !== nn(t) && "function" != typeof t ? function(e) {
            if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return e
        }(e) : t
    }

    function an(e) {
        return (an = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
            return e.__proto__ || Object.getPrototypeOf(e)
        })(e)
    }

    function sn(e, t) {
        return (sn = Object.setPrototypeOf || function(e, t) {
            return e.__proto__ = t, e
        })(e, t)
    }
    var ln = function(e) {
        function t() {
            return function(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }(this, t), on(this, an(t).call(this))
        }
        var n, a, i;
        return function(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    writable: !0,
                    configurable: !0
                }
            }), t && sn(e, t)
        }(t, r["Component"]), n = t, (a = [{
            key: "componentDidMount",
            value: function() {
                this.props.dispatch(qt.CommonUsersActions.getUsers({
                    searchText: "",
                    filter: 0,
                    pageIndex: 0,
                    pageSize: 10,
                    sortColumn: "",
                    sortAscending: !1
                }))
            }
        }, {
            key: "render",
            value: function() {
                return o.a.createElement("div", {
                    className: "boilerplate-app personaBar-mainContainer"
                }, o.a.createElement(c.PersonaBarPage, {
                    isOpen: !0
                }, o.a.createElement(tn, null)))
            }
        }]) && rn(n.prototype, a), i && rn(n, i), t
    }();
    ln.propTypes = {
        dispatch: i.a.func.isRequired
    };
    var un = Object(s.connect)(function() {
        return {}
    })(ln);
    t.default = function() {
        return o.a.createElement("div", {
            className: "boilerplate-root"
        }, o.a.createElement(un, null))
    }
}, function(e, t, n) {
    "use strict";
    n.r(t);
    var r = n(0),
        o = n.n(r),
        a = n(8),
        i = n(3),
        s = n(11),
        l = {
            init: function() {
                var e = window.dnn.initUsers();
                s.a.init(e), n(53)
            },
            dispatch: function() {
                throw new Error("dispatch method needs to be overwritten from the Redux store")
            }
        },
        u = n(12),
        c = n(23),
        d = n.n(c),
        p = n(41),
        f = n.n(p),
        h = n(42),
        m = Object(u.combineReducers)({
            users: Object(h.users)()
        }),
        g = n(43),
        y = n(44),
        v = n.n(y),
        b = n(45),
        w = n.n(b),
        E = Object(g.createDevTools)(o.a.createElement(w.a, {
            toggleVisibilityKey: "ctrl-h",
            changePositionKey: "ctrl-q"
        }, o.a.createElement(v.a, null))),
        S = !0;
    var O, x = n(46),
        C = n.n(x),
        T = Object(u.createStore)(m, O, Object(u.compose)(S ? Object(u.applyMiddleware)(d.a) : Object(u.applyMiddleware)(d.a, f()()), E.instrument()));
    l.dispatch = T.dispatch;
    var _ = document.getElementById("users-container");
    if (!_) throw Error("Cannot find users container.");
    l.init(), Object(a.render)(o.a.createElement(i.Provider, {
        store: T
    }, o.a.createElement(C.a, null)), _)
}]);
//# sourceMappingURL=users-bundle.js.map