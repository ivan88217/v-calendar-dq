import { hasInjectionContext as Nt, inject as Wt, getCurrentInstance as Tt, ref as C, watch as Yt, reactive as Ct, markRaw as Q, effectScope as Vt, isRef as B, isReactive as it, toRef as tt, toRaw as Ft, nextTick as dt, computed as x, getCurrentScope as jt, onScopeDispose as qt, toRefs as ft, defineComponent as Ht, watchEffect as lt, resolveComponent as Rt, openBlock as Lt, createBlock as At } from "vue";
var It = !1;
function U(t, e, n) {
  return Array.isArray(t) ? (t.length = Math.max(t.length, e), t.splice(e, 1, n), n) : (t[e] = n, n);
}
function et(t, e) {
  if (Array.isArray(t)) {
    t.splice(e, 1);
    return;
  }
  delete t[e];
}
/*!
 * pinia v2.1.7
 * (c) 2023 Eduardo San Martin Morote
 * @license MIT
 */
let X;
const z = (t) => X = t, Qt = process.env.NODE_ENV !== "production" ? Symbol("pinia") : (
  /* istanbul ignore next */
  Symbol()
);
function V(t) {
  return t && typeof t == "object" && Object.prototype.toString.call(t) === "[object Object]" && typeof t.toJSON != "function";
}
var $;
(function(t) {
  t.direct = "direct", t.patchObject = "patch object", t.patchFunction = "patch function";
})($ || ($ = {}));
const ct = typeof window < "u", nt = (process.env.NODE_ENV !== "production" || !1) && process.env.NODE_ENV !== "test" && ct;
function Pt(t, e) {
  for (const n in e) {
    const r = e[n];
    if (!(n in t))
      continue;
    const a = t[n];
    V(a) && V(r) && !B(r) && !it(r) ? t[n] = Pt(a, r) : t[n] = r;
  }
  return t;
}
const Et = () => {
};
function ht(t, e, n, r = Et) {
  t.push(e);
  const a = () => {
    const o = t.indexOf(e);
    o > -1 && (t.splice(o, 1), r());
  };
  return !n && jt() && qt(a), a;
}
function q(t, ...e) {
  t.slice().forEach((n) => {
    n(...e);
  });
}
const Xt = (t) => t();
function ot(t, e) {
  t instanceof Map && e instanceof Map && e.forEach((n, r) => t.set(r, n)), t instanceof Set && e instanceof Set && e.forEach(t.add, t);
  for (const n in e) {
    if (!e.hasOwnProperty(n))
      continue;
    const r = e[n], a = t[n];
    V(a) && V(r) && t.hasOwnProperty(n) && !B(r) && !it(r) ? t[n] = ot(a, r) : t[n] = r;
  }
  return t;
}
const $t = process.env.NODE_ENV !== "production" ? Symbol("pinia:skipHydration") : (
  /* istanbul ignore next */
  Symbol()
);
function Bt(t) {
  return !V(t) || !t.hasOwnProperty($t);
}
const { assign: M } = Object;
function mt(t) {
  return !!(B(t) && t.effect);
}
function gt(t, e, n, r) {
  const { state: a, actions: o, getters: c } = e, u = n.state.value[t];
  let m;
  function i() {
    !u && (process.env.NODE_ENV === "production" || !r) && (n.state.value[t] = a ? a() : {});
    const f = process.env.NODE_ENV !== "production" && r ? (
      // use ref() to unwrap refs inside state TODO: check if this is still necessary
      ft(C(a ? a() : {}).value)
    ) : ft(n.state.value[t]);
    return M(f, o, Object.keys(c || {}).reduce((l, g) => (process.env.NODE_ENV !== "production" && g in f && console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${g}" in store "${t}".`), l[g] = Q(x(() => {
      z(n);
      const y = n._s.get(t);
      return c[g].call(y, y);
    })), l), {}));
  }
  return m = st(t, i, e, n, r, !0), m;
}
function st(t, e, n = {}, r, a, o) {
  let c;
  const u = M({ actions: {} }, n);
  if (process.env.NODE_ENV !== "production" && !r._e.active)
    throw new Error("Pinia destroyed");
  const m = {
    deep: !0
    // flush: 'post',
  };
  process.env.NODE_ENV !== "production" && !It && (m.onTrigger = (d) => {
    i ? y = d : i == !1 && !h._hotUpdating && (Array.isArray(y) ? y.push(d) : console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug."));
  });
  let i, f, l = [], g = [], y;
  const b = r.state.value[t];
  !o && !b && (process.env.NODE_ENV === "production" || !a) && (r.state.value[t] = {});
  const _ = C({});
  let N;
  function W(d) {
    let s;
    i = f = !1, process.env.NODE_ENV !== "production" && (y = []), typeof d == "function" ? (d(r.state.value[t]), s = {
      type: $.patchFunction,
      storeId: t,
      events: y
    }) : (ot(r.state.value[t], d), s = {
      type: $.patchObject,
      payload: d,
      storeId: t,
      events: y
    });
    const v = N = Symbol();
    dt().then(() => {
      N === v && (i = !0);
    }), f = !0, q(l, s, r.state.value[t]);
  }
  const O = o ? function() {
    const { state: s } = n, v = s ? s() : {};
    this.$patch((E) => {
      M(E, v);
    });
  } : (
    /* istanbul ignore next */
    process.env.NODE_ENV !== "production" ? () => {
      throw new Error(`🍍: Store "${t}" is built using the setup syntax and does not implement $reset().`);
    } : Et
  );
  function p() {
    c.stop(), l = [], g = [], r._s.delete(t);
  }
  function j(d, s) {
    return function() {
      z(r);
      const v = Array.from(arguments), E = [], R = [];
      function St(D) {
        E.push(D);
      }
      function xt(D) {
        R.push(D);
      }
      q(g, {
        args: v,
        name: d,
        store: h,
        after: St,
        onError: xt
      });
      let L;
      try {
        L = s.apply(this && this.$id === t ? this : h, v);
      } catch (D) {
        throw q(R, D), D;
      }
      return L instanceof Promise ? L.then((D) => (q(E, D), D)).catch((D) => (q(R, D), Promise.reject(D))) : (q(E, L), L);
    };
  }
  const J = /* @__PURE__ */ Q({
    actions: {},
    getters: {},
    state: [],
    hotState: _
  }), ut = {
    _p: r,
    // _s: scope,
    $id: t,
    $onAction: ht.bind(null, g),
    $patch: W,
    $reset: O,
    $subscribe(d, s = {}) {
      const v = ht(l, d, s.detached, () => E()), E = c.run(() => Yt(() => r.state.value[t], (R) => {
        (s.flush === "sync" ? f : i) && d({
          storeId: t,
          type: $.direct,
          events: y
        }, R);
      }, M({}, m, s)));
      return v;
    },
    $dispose: p
  }, h = Ct(process.env.NODE_ENV !== "production" || nt ? M(
    {
      _hmrPayload: J,
      _customProperties: Q(/* @__PURE__ */ new Set())
      // devtools custom properties
    },
    ut
    // must be added later
    // setupStore
  ) : ut);
  r._s.set(t, h);
  const k = (r._a && r._a.runWithContext || Xt)(() => r._e.run(() => (c = Vt()).run(e)));
  for (const d in k) {
    const s = k[d];
    if (B(s) && !mt(s) || it(s))
      process.env.NODE_ENV !== "production" && a ? U(_.value, d, tt(k, d)) : o || (b && Bt(s) && (B(s) ? s.value = b[d] : ot(s, b[d])), r.state.value[t][d] = s), process.env.NODE_ENV !== "production" && J.state.push(d);
    else if (typeof s == "function") {
      const v = process.env.NODE_ENV !== "production" && a ? s : j(d, s);
      k[d] = v, process.env.NODE_ENV !== "production" && (J.actions[d] = s), u.actions[d] = s;
    } else
      process.env.NODE_ENV !== "production" && mt(s) && (J.getters[d] = o ? (
        // @ts-expect-error
        n.getters[d]
      ) : s, ct && (k._getters || // @ts-expect-error: same
      (k._getters = Q([]))).push(d));
  }
  if (M(h, k), M(Ft(h), k), Object.defineProperty(h, "$state", {
    get: () => process.env.NODE_ENV !== "production" && a ? _.value : r.state.value[t],
    set: (d) => {
      if (process.env.NODE_ENV !== "production" && a)
        throw new Error("cannot set hotState");
      W((s) => {
        M(s, d);
      });
    }
  }), process.env.NODE_ENV !== "production" && (h._hotUpdate = Q((d) => {
    h._hotUpdating = !0, d._hmrPayload.state.forEach((s) => {
      if (s in h.$state) {
        const v = d.$state[s], E = h.$state[s];
        typeof v == "object" && V(v) && V(E) ? Pt(v, E) : d.$state[s] = E;
      }
      U(h, s, tt(d.$state, s));
    }), Object.keys(h.$state).forEach((s) => {
      s in d.$state || et(h, s);
    }), i = !1, f = !1, r.state.value[t] = tt(d._hmrPayload, "hotState"), f = !0, dt().then(() => {
      i = !0;
    });
    for (const s in d._hmrPayload.actions) {
      const v = d[s];
      U(h, s, j(s, v));
    }
    for (const s in d._hmrPayload.getters) {
      const v = d._hmrPayload.getters[s], E = o ? (
        // special handling of options api
        x(() => (z(r), v.call(h, h)))
      ) : v;
      U(h, s, E);
    }
    Object.keys(h._hmrPayload.getters).forEach((s) => {
      s in d._hmrPayload.getters || et(h, s);
    }), Object.keys(h._hmrPayload.actions).forEach((s) => {
      s in d._hmrPayload.actions || et(h, s);
    }), h._hmrPayload = d._hmrPayload, h._getters = d._getters, h._hotUpdating = !1;
  })), nt) {
    const d = {
      writable: !0,
      configurable: !0,
      // avoid warning on devtools trying to display this property
      enumerable: !1
    };
    ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach((s) => {
      Object.defineProperty(h, s, M({ value: h[s] }, d));
    });
  }
  return r._p.forEach((d) => {
    if (nt) {
      const s = c.run(() => d({
        store: h,
        app: r._a,
        pinia: r,
        options: u
      }));
      Object.keys(s || {}).forEach((v) => h._customProperties.add(v)), M(h, s);
    } else
      M(h, c.run(() => d({
        store: h,
        app: r._a,
        pinia: r,
        options: u
      })));
  }), process.env.NODE_ENV !== "production" && h.$state && typeof h.$state == "object" && typeof h.$state.constructor == "function" && !h.$state.constructor.toString().includes("[native code]") && console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${h.$id}".`), b && o && n.hydrate && n.hydrate(h.$state, b), i = !0, f = !0, h;
}
function Gt(t, e, n) {
  let r, a;
  const o = typeof e == "function";
  if (typeof t == "string")
    r = t, a = o ? n : e;
  else if (a = t, r = t.id, process.env.NODE_ENV !== "production" && typeof r != "string")
    throw new Error('[🍍]: "defineStore()" must be passed a store id as its first argument.');
  function c(u, m) {
    const i = Nt();
    if (u = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    (process.env.NODE_ENV === "test" && X && X._testing ? null : u) || (i ? Wt(Qt, null) : null), u && z(u), process.env.NODE_ENV !== "production" && !X)
      throw new Error(`[🍍]: "getActivePinia()" was called but there was no active Pinia. Are you trying to use a store before calling "app.use(pinia)"?
See https://pinia.vuejs.org/core-concepts/outside-component-usage.html for help.
This will fail in production.`);
    u = X, u._s.has(r) || (o ? st(r, e, a, u) : gt(r, a, u), process.env.NODE_ENV !== "production" && (c._pinia = u));
    const f = u._s.get(r);
    if (process.env.NODE_ENV !== "production" && m) {
      const l = "__hot:" + r, g = o ? st(l, e, a, u, !0) : gt(l, M({}, a), u, !0);
      m._hotUpdate(g), delete u.state.value[l], u._s.delete(l);
    }
    if (process.env.NODE_ENV !== "production" && ct) {
      const l = Tt();
      if (l && l.proxy && // avoid adding stores that are just built for hot module replacement
      !m) {
        const g = l.proxy, y = "_pStores" in g ? g._pStores : g._pStores = {};
        y[r] = f;
      }
    }
    return f;
  }
  return c.$id = r, c;
}
function P(t) {
  const e = Object.prototype.toString.call(t);
  return t instanceof Date || typeof t == "object" && e === "[object Date]" ? new t.constructor(+t) : typeof t == "number" || e === "[object Number]" || typeof t == "string" || e === "[object String]" ? new Date(t) : /* @__PURE__ */ new Date(NaN);
}
function F(t, e) {
  return t instanceof Date ? new t.constructor(e) : new Date(e);
}
const Dt = 6048e5, Jt = 864e5;
let Ut = {};
function K() {
  return Ut;
}
function G(t, e) {
  var u, m, i, f;
  const n = K(), r = (e == null ? void 0 : e.weekStartsOn) ?? ((m = (u = e == null ? void 0 : e.locale) == null ? void 0 : u.options) == null ? void 0 : m.weekStartsOn) ?? n.weekStartsOn ?? ((f = (i = n.locale) == null ? void 0 : i.options) == null ? void 0 : f.weekStartsOn) ?? 0, a = P(t), o = a.getDay(), c = (o < r ? 7 : 0) + o - r;
  return a.setDate(a.getDate() - c), a.setHours(0, 0, 0, 0), a;
}
function Z(t) {
  return G(t, { weekStartsOn: 1 });
}
function Mt(t) {
  const e = P(t), n = e.getFullYear(), r = F(t, 0);
  r.setFullYear(n + 1, 0, 4), r.setHours(0, 0, 0, 0);
  const a = Z(r), o = F(t, 0);
  o.setFullYear(n, 0, 4), o.setHours(0, 0, 0, 0);
  const c = Z(o);
  return e.getTime() >= a.getTime() ? n + 1 : e.getTime() >= c.getTime() ? n : n - 1;
}
function yt(t) {
  const e = P(t);
  return e.setHours(0, 0, 0, 0), e;
}
function wt(t) {
  const e = P(t), n = new Date(
    Date.UTC(
      e.getFullYear(),
      e.getMonth(),
      e.getDate(),
      e.getHours(),
      e.getMinutes(),
      e.getSeconds(),
      e.getMilliseconds()
    )
  );
  return n.setUTCFullYear(e.getFullYear()), +t - +n;
}
function zt(t, e) {
  const n = yt(t), r = yt(e), a = +n - wt(n), o = +r - wt(r);
  return Math.round((a - o) / Jt);
}
function Zt(t) {
  const e = Mt(t), n = F(t, 0);
  return n.setFullYear(e, 0, 4), n.setHours(0, 0, 0, 0), Z(n);
}
function Kt(t) {
  return t instanceof Date || typeof t == "object" && Object.prototype.toString.call(t) === "[object Date]";
}
function te(t) {
  if (!Kt(t) && typeof t != "number")
    return !1;
  const e = P(t);
  return !isNaN(Number(e));
}
function rt(t, e) {
  const n = P(t.start), r = P(t.end);
  let a = +n > +r;
  const o = a ? +n : +r, c = a ? r : n;
  c.setHours(0, 0, 0, 0);
  let u = (e == null ? void 0 : e.step) ?? 1;
  if (!u)
    return [];
  u < 0 && (u = -u, a = !a);
  const m = [];
  for (; +c <= o; )
    m.push(P(c)), c.setDate(c.getDate() + u), c.setHours(0, 0, 0, 0);
  return a ? m.reverse() : m;
}
function ee(t) {
  const e = P(t), n = F(t, 0);
  return n.setFullYear(e.getFullYear(), 0, 1), n.setHours(0, 0, 0, 0), n;
}
const ne = {
  lessThanXSeconds: {
    one: "less than a second",
    other: "less than {{count}} seconds"
  },
  xSeconds: {
    one: "1 second",
    other: "{{count}} seconds"
  },
  halfAMinute: "half a minute",
  lessThanXMinutes: {
    one: "less than a minute",
    other: "less than {{count}} minutes"
  },
  xMinutes: {
    one: "1 minute",
    other: "{{count}} minutes"
  },
  aboutXHours: {
    one: "about 1 hour",
    other: "about {{count}} hours"
  },
  xHours: {
    one: "1 hour",
    other: "{{count}} hours"
  },
  xDays: {
    one: "1 day",
    other: "{{count}} days"
  },
  aboutXWeeks: {
    one: "about 1 week",
    other: "about {{count}} weeks"
  },
  xWeeks: {
    one: "1 week",
    other: "{{count}} weeks"
  },
  aboutXMonths: {
    one: "about 1 month",
    other: "about {{count}} months"
  },
  xMonths: {
    one: "1 month",
    other: "{{count}} months"
  },
  aboutXYears: {
    one: "about 1 year",
    other: "about {{count}} years"
  },
  xYears: {
    one: "1 year",
    other: "{{count}} years"
  },
  overXYears: {
    one: "over 1 year",
    other: "over {{count}} years"
  },
  almostXYears: {
    one: "almost 1 year",
    other: "almost {{count}} years"
  }
}, re = (t, e, n) => {
  let r;
  const a = ne[t];
  return typeof a == "string" ? r = a : e === 1 ? r = a.one : r = a.other.replace("{{count}}", e.toString()), n != null && n.addSuffix ? n.comparison && n.comparison > 0 ? "in " + r : r + " ago" : r;
};
function at(t) {
  return (e = {}) => {
    const n = e.width ? String(e.width) : t.defaultWidth;
    return t.formats[n] || t.formats[t.defaultWidth];
  };
}
const ae = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
}, oe = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
}, se = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
}, ie = {
  date: at({
    formats: ae,
    defaultWidth: "full"
  }),
  time: at({
    formats: oe,
    defaultWidth: "full"
  }),
  dateTime: at({
    formats: se,
    defaultWidth: "full"
  })
}, ce = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
}, ue = (t, e, n, r) => ce[t];
function A(t) {
  return (e, n) => {
    const r = n != null && n.context ? String(n.context) : "standalone";
    let a;
    if (r === "formatting" && t.formattingValues) {
      const c = t.defaultFormattingWidth || t.defaultWidth, u = n != null && n.width ? String(n.width) : c;
      a = t.formattingValues[u] || t.formattingValues[c];
    } else {
      const c = t.defaultWidth, u = n != null && n.width ? String(n.width) : t.defaultWidth;
      a = t.values[u] || t.values[c];
    }
    const o = t.argumentCallback ? t.argumentCallback(e) : e;
    return a[o];
  };
}
const de = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
}, fe = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
}, le = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ],
  wide: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]
}, he = {
  narrow: ["S", "M", "T", "W", "T", "F", "S"],
  short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  wide: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ]
}, me = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  }
}, ge = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  }
}, ye = (t, e) => {
  const n = Number(t), r = n % 100;
  if (r > 20 || r < 10)
    switch (r % 10) {
      case 1:
        return n + "st";
      case 2:
        return n + "nd";
      case 3:
        return n + "rd";
    }
  return n + "th";
}, we = {
  ordinalNumber: ye,
  era: A({
    values: de,
    defaultWidth: "wide"
  }),
  quarter: A({
    values: fe,
    defaultWidth: "wide",
    argumentCallback: (t) => t - 1
  }),
  month: A({
    values: le,
    defaultWidth: "wide"
  }),
  day: A({
    values: he,
    defaultWidth: "wide"
  }),
  dayPeriod: A({
    values: me,
    defaultWidth: "wide",
    formattingValues: ge,
    defaultFormattingWidth: "wide"
  })
};
function I(t) {
  return (e, n = {}) => {
    const r = n.width, a = r && t.matchPatterns[r] || t.matchPatterns[t.defaultMatchWidth], o = e.match(a);
    if (!o)
      return null;
    const c = o[0], u = r && t.parsePatterns[r] || t.parsePatterns[t.defaultParseWidth], m = Array.isArray(u) ? ve(u, (l) => l.test(c)) : (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- I challange you to fix the type
      be(u, (l) => l.test(c))
    );
    let i;
    i = t.valueCallback ? t.valueCallback(m) : m, i = n.valueCallback ? (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- I challange you to fix the type
      n.valueCallback(i)
    ) : i;
    const f = e.slice(c.length);
    return { value: i, rest: f };
  };
}
function be(t, e) {
  for (const n in t)
    if (Object.prototype.hasOwnProperty.call(t, n) && e(t[n]))
      return n;
}
function ve(t, e) {
  for (let n = 0; n < t.length; n++)
    if (e(t[n]))
      return n;
}
function pe(t) {
  return (e, n = {}) => {
    const r = e.match(t.matchPattern);
    if (!r)
      return null;
    const a = r[0], o = e.match(t.parsePattern);
    if (!o)
      return null;
    let c = t.valueCallback ? t.valueCallback(o[0]) : o[0];
    c = n.valueCallback ? n.valueCallback(c) : c;
    const u = e.slice(a.length);
    return { value: c, rest: u };
  };
}
const Oe = /^(\d+)(th|st|nd|rd)?/i, Pe = /\d+/i, Ee = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
}, De = {
  any: [/^b/i, /^(a|c)/i]
}, Me = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
}, _e = {
  any: [/1/i, /2/i, /3/i, /4/i]
}, ke = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
}, Se = {
  narrow: [
    /^j/i,
    /^f/i,
    /^m/i,
    /^a/i,
    /^m/i,
    /^j/i,
    /^j/i,
    /^a/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ],
  any: [
    /^ja/i,
    /^f/i,
    /^mar/i,
    /^ap/i,
    /^may/i,
    /^jun/i,
    /^jul/i,
    /^au/i,
    /^s/i,
    /^o/i,
    /^n/i,
    /^d/i
  ]
}, xe = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
}, Ne = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
}, We = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
}, Te = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mi/i,
    noon: /^no/i,
    morning: /morning/i,
    afternoon: /afternoon/i,
    evening: /evening/i,
    night: /night/i
  }
}, Ye = {
  ordinalNumber: pe({
    matchPattern: Oe,
    parsePattern: Pe,
    valueCallback: (t) => parseInt(t, 10)
  }),
  era: I({
    matchPatterns: Ee,
    defaultMatchWidth: "wide",
    parsePatterns: De,
    defaultParseWidth: "any"
  }),
  quarter: I({
    matchPatterns: Me,
    defaultMatchWidth: "wide",
    parsePatterns: _e,
    defaultParseWidth: "any",
    valueCallback: (t) => t + 1
  }),
  month: I({
    matchPatterns: ke,
    defaultMatchWidth: "wide",
    parsePatterns: Se,
    defaultParseWidth: "any"
  }),
  day: I({
    matchPatterns: xe,
    defaultMatchWidth: "wide",
    parsePatterns: Ne,
    defaultParseWidth: "any"
  }),
  dayPeriod: I({
    matchPatterns: We,
    defaultMatchWidth: "any",
    parsePatterns: Te,
    defaultParseWidth: "any"
  })
}, Ce = {
  code: "en-US",
  formatDistance: re,
  formatLong: ie,
  formatRelative: ue,
  localize: we,
  match: Ye,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
function Ve(t) {
  const e = P(t);
  return zt(e, ee(e)) + 1;
}
function Fe(t) {
  const e = P(t), n = +Z(e) - +Zt(e);
  return Math.round(n / Dt) + 1;
}
function _t(t, e) {
  var f, l, g, y;
  const n = P(t), r = n.getFullYear(), a = K(), o = (e == null ? void 0 : e.firstWeekContainsDate) ?? ((l = (f = e == null ? void 0 : e.locale) == null ? void 0 : f.options) == null ? void 0 : l.firstWeekContainsDate) ?? a.firstWeekContainsDate ?? ((y = (g = a.locale) == null ? void 0 : g.options) == null ? void 0 : y.firstWeekContainsDate) ?? 1, c = F(t, 0);
  c.setFullYear(r + 1, 0, o), c.setHours(0, 0, 0, 0);
  const u = G(c, e), m = F(t, 0);
  m.setFullYear(r, 0, o), m.setHours(0, 0, 0, 0);
  const i = G(m, e);
  return n.getTime() >= u.getTime() ? r + 1 : n.getTime() >= i.getTime() ? r : r - 1;
}
function je(t, e) {
  var u, m, i, f;
  const n = K(), r = (e == null ? void 0 : e.firstWeekContainsDate) ?? ((m = (u = e == null ? void 0 : e.locale) == null ? void 0 : u.options) == null ? void 0 : m.firstWeekContainsDate) ?? n.firstWeekContainsDate ?? ((f = (i = n.locale) == null ? void 0 : i.options) == null ? void 0 : f.firstWeekContainsDate) ?? 1, a = _t(t, e), o = F(t, 0);
  return o.setFullYear(a, 0, r), o.setHours(0, 0, 0, 0), G(o, e);
}
function qe(t, e) {
  const n = P(t), r = +G(n, e) - +je(n, e);
  return Math.round(r / Dt) + 1;
}
function w(t, e) {
  const n = t < 0 ? "-" : "", r = Math.abs(t).toString().padStart(e, "0");
  return n + r;
}
const S = {
  // Year
  y(t, e) {
    const n = t.getFullYear(), r = n > 0 ? n : 1 - n;
    return w(e === "yy" ? r % 100 : r, e.length);
  },
  // Month
  M(t, e) {
    const n = t.getMonth();
    return e === "M" ? String(n + 1) : w(n + 1, 2);
  },
  // Day of the month
  d(t, e) {
    return w(t.getDate(), e.length);
  },
  // AM or PM
  a(t, e) {
    const n = t.getHours() / 12 >= 1 ? "pm" : "am";
    switch (e) {
      case "a":
      case "aa":
        return n.toUpperCase();
      case "aaa":
        return n;
      case "aaaaa":
        return n[0];
      case "aaaa":
      default:
        return n === "am" ? "a.m." : "p.m.";
    }
  },
  // Hour [1-12]
  h(t, e) {
    return w(t.getHours() % 12 || 12, e.length);
  },
  // Hour [0-23]
  H(t, e) {
    return w(t.getHours(), e.length);
  },
  // Minute
  m(t, e) {
    return w(t.getMinutes(), e.length);
  },
  // Second
  s(t, e) {
    return w(t.getSeconds(), e.length);
  },
  // Fraction of second
  S(t, e) {
    const n = e.length, r = t.getMilliseconds(), a = Math.trunc(
      r * Math.pow(10, n - 3)
    );
    return w(a, e.length);
  }
}, H = {
  am: "am",
  pm: "pm",
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
}, bt = {
  // Era
  G: function(t, e, n) {
    const r = t.getFullYear() > 0 ? 1 : 0;
    switch (e) {
      case "G":
      case "GG":
      case "GGG":
        return n.era(r, { width: "abbreviated" });
      case "GGGGG":
        return n.era(r, { width: "narrow" });
      case "GGGG":
      default:
        return n.era(r, { width: "wide" });
    }
  },
  // Year
  y: function(t, e, n) {
    if (e === "yo") {
      const r = t.getFullYear(), a = r > 0 ? r : 1 - r;
      return n.ordinalNumber(a, { unit: "year" });
    }
    return S.y(t, e);
  },
  // Local week-numbering year
  Y: function(t, e, n, r) {
    const a = _t(t, r), o = a > 0 ? a : 1 - a;
    if (e === "YY") {
      const c = o % 100;
      return w(c, 2);
    }
    return e === "Yo" ? n.ordinalNumber(o, { unit: "year" }) : w(o, e.length);
  },
  // ISO week-numbering year
  R: function(t, e) {
    const n = Mt(t);
    return w(n, e.length);
  },
  // Extended year. This is a single number designating the year of this calendar system.
  // The main difference between `y` and `u` localizers are B.C. years:
  // | Year | `y` | `u` |
  // |------|-----|-----|
  // | AC 1 |   1 |   1 |
  // | BC 1 |   1 |   0 |
  // | BC 2 |   2 |  -1 |
  // Also `yy` always returns the last two digits of a year,
  // while `uu` pads single digit years to 2 characters and returns other years unchanged.
  u: function(t, e) {
    const n = t.getFullYear();
    return w(n, e.length);
  },
  // Quarter
  Q: function(t, e, n) {
    const r = Math.ceil((t.getMonth() + 1) / 3);
    switch (e) {
      case "Q":
        return String(r);
      case "QQ":
        return w(r, 2);
      case "Qo":
        return n.ordinalNumber(r, { unit: "quarter" });
      case "QQQ":
        return n.quarter(r, {
          width: "abbreviated",
          context: "formatting"
        });
      case "QQQQQ":
        return n.quarter(r, {
          width: "narrow",
          context: "formatting"
        });
      case "QQQQ":
      default:
        return n.quarter(r, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone quarter
  q: function(t, e, n) {
    const r = Math.ceil((t.getMonth() + 1) / 3);
    switch (e) {
      case "q":
        return String(r);
      case "qq":
        return w(r, 2);
      case "qo":
        return n.ordinalNumber(r, { unit: "quarter" });
      case "qqq":
        return n.quarter(r, {
          width: "abbreviated",
          context: "standalone"
        });
      case "qqqqq":
        return n.quarter(r, {
          width: "narrow",
          context: "standalone"
        });
      case "qqqq":
      default:
        return n.quarter(r, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // Month
  M: function(t, e, n) {
    const r = t.getMonth();
    switch (e) {
      case "M":
      case "MM":
        return S.M(t, e);
      case "Mo":
        return n.ordinalNumber(r + 1, { unit: "month" });
      case "MMM":
        return n.month(r, {
          width: "abbreviated",
          context: "formatting"
        });
      case "MMMMM":
        return n.month(r, {
          width: "narrow",
          context: "formatting"
        });
      case "MMMM":
      default:
        return n.month(r, { width: "wide", context: "formatting" });
    }
  },
  // Stand-alone month
  L: function(t, e, n) {
    const r = t.getMonth();
    switch (e) {
      case "L":
        return String(r + 1);
      case "LL":
        return w(r + 1, 2);
      case "Lo":
        return n.ordinalNumber(r + 1, { unit: "month" });
      case "LLL":
        return n.month(r, {
          width: "abbreviated",
          context: "standalone"
        });
      case "LLLLL":
        return n.month(r, {
          width: "narrow",
          context: "standalone"
        });
      case "LLLL":
      default:
        return n.month(r, { width: "wide", context: "standalone" });
    }
  },
  // Local week of year
  w: function(t, e, n, r) {
    const a = qe(t, r);
    return e === "wo" ? n.ordinalNumber(a, { unit: "week" }) : w(a, e.length);
  },
  // ISO week of year
  I: function(t, e, n) {
    const r = Fe(t);
    return e === "Io" ? n.ordinalNumber(r, { unit: "week" }) : w(r, e.length);
  },
  // Day of the month
  d: function(t, e, n) {
    return e === "do" ? n.ordinalNumber(t.getDate(), { unit: "date" }) : S.d(t, e);
  },
  // Day of year
  D: function(t, e, n) {
    const r = Ve(t);
    return e === "Do" ? n.ordinalNumber(r, { unit: "dayOfYear" }) : w(r, e.length);
  },
  // Day of week
  E: function(t, e, n) {
    const r = t.getDay();
    switch (e) {
      case "E":
      case "EE":
      case "EEE":
        return n.day(r, {
          width: "abbreviated",
          context: "formatting"
        });
      case "EEEEE":
        return n.day(r, {
          width: "narrow",
          context: "formatting"
        });
      case "EEEEEE":
        return n.day(r, {
          width: "short",
          context: "formatting"
        });
      case "EEEE":
      default:
        return n.day(r, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Local day of week
  e: function(t, e, n, r) {
    const a = t.getDay(), o = (a - r.weekStartsOn + 8) % 7 || 7;
    switch (e) {
      case "e":
        return String(o);
      case "ee":
        return w(o, 2);
      case "eo":
        return n.ordinalNumber(o, { unit: "day" });
      case "eee":
        return n.day(a, {
          width: "abbreviated",
          context: "formatting"
        });
      case "eeeee":
        return n.day(a, {
          width: "narrow",
          context: "formatting"
        });
      case "eeeeee":
        return n.day(a, {
          width: "short",
          context: "formatting"
        });
      case "eeee":
      default:
        return n.day(a, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone local day of week
  c: function(t, e, n, r) {
    const a = t.getDay(), o = (a - r.weekStartsOn + 8) % 7 || 7;
    switch (e) {
      case "c":
        return String(o);
      case "cc":
        return w(o, e.length);
      case "co":
        return n.ordinalNumber(o, { unit: "day" });
      case "ccc":
        return n.day(a, {
          width: "abbreviated",
          context: "standalone"
        });
      case "ccccc":
        return n.day(a, {
          width: "narrow",
          context: "standalone"
        });
      case "cccccc":
        return n.day(a, {
          width: "short",
          context: "standalone"
        });
      case "cccc":
      default:
        return n.day(a, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // ISO day of week
  i: function(t, e, n) {
    const r = t.getDay(), a = r === 0 ? 7 : r;
    switch (e) {
      case "i":
        return String(a);
      case "ii":
        return w(a, e.length);
      case "io":
        return n.ordinalNumber(a, { unit: "day" });
      case "iii":
        return n.day(r, {
          width: "abbreviated",
          context: "formatting"
        });
      case "iiiii":
        return n.day(r, {
          width: "narrow",
          context: "formatting"
        });
      case "iiiiii":
        return n.day(r, {
          width: "short",
          context: "formatting"
        });
      case "iiii":
      default:
        return n.day(r, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM or PM
  a: function(t, e, n) {
    const a = t.getHours() / 12 >= 1 ? "pm" : "am";
    switch (e) {
      case "a":
      case "aa":
        return n.dayPeriod(a, {
          width: "abbreviated",
          context: "formatting"
        });
      case "aaa":
        return n.dayPeriod(a, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "aaaaa":
        return n.dayPeriod(a, {
          width: "narrow",
          context: "formatting"
        });
      case "aaaa":
      default:
        return n.dayPeriod(a, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM, PM, midnight, noon
  b: function(t, e, n) {
    const r = t.getHours();
    let a;
    switch (r === 12 ? a = H.noon : r === 0 ? a = H.midnight : a = r / 12 >= 1 ? "pm" : "am", e) {
      case "b":
      case "bb":
        return n.dayPeriod(a, {
          width: "abbreviated",
          context: "formatting"
        });
      case "bbb":
        return n.dayPeriod(a, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "bbbbb":
        return n.dayPeriod(a, {
          width: "narrow",
          context: "formatting"
        });
      case "bbbb":
      default:
        return n.dayPeriod(a, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // in the morning, in the afternoon, in the evening, at night
  B: function(t, e, n) {
    const r = t.getHours();
    let a;
    switch (r >= 17 ? a = H.evening : r >= 12 ? a = H.afternoon : r >= 4 ? a = H.morning : a = H.night, e) {
      case "B":
      case "BB":
      case "BBB":
        return n.dayPeriod(a, {
          width: "abbreviated",
          context: "formatting"
        });
      case "BBBBB":
        return n.dayPeriod(a, {
          width: "narrow",
          context: "formatting"
        });
      case "BBBB":
      default:
        return n.dayPeriod(a, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Hour [1-12]
  h: function(t, e, n) {
    if (e === "ho") {
      let r = t.getHours() % 12;
      return r === 0 && (r = 12), n.ordinalNumber(r, { unit: "hour" });
    }
    return S.h(t, e);
  },
  // Hour [0-23]
  H: function(t, e, n) {
    return e === "Ho" ? n.ordinalNumber(t.getHours(), { unit: "hour" }) : S.H(t, e);
  },
  // Hour [0-11]
  K: function(t, e, n) {
    const r = t.getHours() % 12;
    return e === "Ko" ? n.ordinalNumber(r, { unit: "hour" }) : w(r, e.length);
  },
  // Hour [1-24]
  k: function(t, e, n) {
    let r = t.getHours();
    return r === 0 && (r = 24), e === "ko" ? n.ordinalNumber(r, { unit: "hour" }) : w(r, e.length);
  },
  // Minute
  m: function(t, e, n) {
    return e === "mo" ? n.ordinalNumber(t.getMinutes(), { unit: "minute" }) : S.m(t, e);
  },
  // Second
  s: function(t, e, n) {
    return e === "so" ? n.ordinalNumber(t.getSeconds(), { unit: "second" }) : S.s(t, e);
  },
  // Fraction of second
  S: function(t, e) {
    return S.S(t, e);
  },
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function(t, e, n) {
    const r = t.getTimezoneOffset();
    if (r === 0)
      return "Z";
    switch (e) {
      case "X":
        return pt(r);
      case "XXXX":
      case "XX":
        return Y(r);
      case "XXXXX":
      case "XXX":
      default:
        return Y(r, ":");
    }
  },
  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function(t, e, n) {
    const r = t.getTimezoneOffset();
    switch (e) {
      case "x":
        return pt(r);
      case "xxxx":
      case "xx":
        return Y(r);
      case "xxxxx":
      case "xxx":
      default:
        return Y(r, ":");
    }
  },
  // Timezone (GMT)
  O: function(t, e, n) {
    const r = t.getTimezoneOffset();
    switch (e) {
      case "O":
      case "OO":
      case "OOO":
        return "GMT" + vt(r, ":");
      case "OOOO":
      default:
        return "GMT" + Y(r, ":");
    }
  },
  // Timezone (specific non-location)
  z: function(t, e, n) {
    const r = t.getTimezoneOffset();
    switch (e) {
      case "z":
      case "zz":
      case "zzz":
        return "GMT" + vt(r, ":");
      case "zzzz":
      default:
        return "GMT" + Y(r, ":");
    }
  },
  // Seconds timestamp
  t: function(t, e, n) {
    const r = Math.trunc(t.getTime() / 1e3);
    return w(r, e.length);
  },
  // Milliseconds timestamp
  T: function(t, e, n) {
    const r = t.getTime();
    return w(r, e.length);
  }
};
function vt(t, e = "") {
  const n = t > 0 ? "-" : "+", r = Math.abs(t), a = Math.trunc(r / 60), o = r % 60;
  return o === 0 ? n + String(a) : n + String(a) + e + w(o, 2);
}
function pt(t, e) {
  return t % 60 === 0 ? (t > 0 ? "-" : "+") + w(Math.abs(t) / 60, 2) : Y(t, e);
}
function Y(t, e = "") {
  const n = t > 0 ? "-" : "+", r = Math.abs(t), a = w(Math.trunc(r / 60), 2), o = w(r % 60, 2);
  return n + a + e + o;
}
const Ot = (t, e) => {
  switch (t) {
    case "P":
      return e.date({ width: "short" });
    case "PP":
      return e.date({ width: "medium" });
    case "PPP":
      return e.date({ width: "long" });
    case "PPPP":
    default:
      return e.date({ width: "full" });
  }
}, kt = (t, e) => {
  switch (t) {
    case "p":
      return e.time({ width: "short" });
    case "pp":
      return e.time({ width: "medium" });
    case "ppp":
      return e.time({ width: "long" });
    case "pppp":
    default:
      return e.time({ width: "full" });
  }
}, He = (t, e) => {
  const n = t.match(/(P+)(p+)?/) || [], r = n[1], a = n[2];
  if (!a)
    return Ot(t, e);
  let o;
  switch (r) {
    case "P":
      o = e.dateTime({ width: "short" });
      break;
    case "PP":
      o = e.dateTime({ width: "medium" });
      break;
    case "PPP":
      o = e.dateTime({ width: "long" });
      break;
    case "PPPP":
    default:
      o = e.dateTime({ width: "full" });
      break;
  }
  return o.replace("{{date}}", Ot(r, e)).replace("{{time}}", kt(a, e));
}, Re = {
  p: kt,
  P: He
}, Le = /^D+$/, Ae = /^Y+$/, Ie = ["D", "DD", "YY", "YYYY"];
function Qe(t) {
  return Le.test(t);
}
function Xe(t) {
  return Ae.test(t);
}
function $e(t, e, n) {
  const r = Be(t, e, n);
  if (console.warn(r), Ie.includes(t))
    throw new RangeError(r);
}
function Be(t, e, n) {
  const r = t[0] === "Y" ? "years" : "days of the month";
  return `Use \`${t.toLowerCase()}\` instead of \`${t}\` (in \`${e}\`) for formatting ${r} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
}
const Ge = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, Je = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, Ue = /^'([^]*?)'?$/, ze = /''/g, Ze = /[a-zA-Z]/;
function T(t, e, n) {
  var f, l, g, y, b, _, N, W;
  const r = K(), a = (n == null ? void 0 : n.locale) ?? r.locale ?? Ce, o = (n == null ? void 0 : n.firstWeekContainsDate) ?? ((l = (f = n == null ? void 0 : n.locale) == null ? void 0 : f.options) == null ? void 0 : l.firstWeekContainsDate) ?? r.firstWeekContainsDate ?? ((y = (g = r.locale) == null ? void 0 : g.options) == null ? void 0 : y.firstWeekContainsDate) ?? 1, c = (n == null ? void 0 : n.weekStartsOn) ?? ((_ = (b = n == null ? void 0 : n.locale) == null ? void 0 : b.options) == null ? void 0 : _.weekStartsOn) ?? r.weekStartsOn ?? ((W = (N = r.locale) == null ? void 0 : N.options) == null ? void 0 : W.weekStartsOn) ?? 0, u = P(t);
  if (!te(u))
    throw new RangeError("Invalid time value");
  let m = e.match(Je).map((O) => {
    const p = O[0];
    if (p === "p" || p === "P") {
      const j = Re[p];
      return j(O, a.formatLong);
    }
    return O;
  }).join("").match(Ge).map((O) => {
    if (O === "''")
      return { isToken: !1, value: "'" };
    const p = O[0];
    if (p === "'")
      return { isToken: !1, value: Ke(O) };
    if (bt[p])
      return { isToken: !0, value: O };
    if (p.match(Ze))
      throw new RangeError(
        "Format string contains an unescaped latin alphabet character `" + p + "`"
      );
    return { isToken: !1, value: O };
  });
  a.localize.preprocessor && (m = a.localize.preprocessor(u, m));
  const i = {
    firstWeekContainsDate: o,
    weekStartsOn: c,
    locale: a
  };
  return m.map((O) => {
    if (!O.isToken)
      return O.value;
    const p = O.value;
    (!(n != null && n.useAdditionalWeekYearTokens) && Xe(p) || !(n != null && n.useAdditionalDayOfYearTokens) && Qe(p)) && $e(p, e, String(t));
    const j = bt[p[0]];
    return j(u, p, a.localize, i);
  }).join("");
}
function Ke(t) {
  const e = t.match(Ue);
  return e ? e[1].replace(ze, "'") : t;
}
const tn = (t = []) => Gt("dates", () => {
  const e = C(t), n = C("add");
  function r(i) {
    const f = typeof i == "string" ? i : T(i, "yyyy-MM-dd");
    e.value.includes(f) || e.value.push(f);
  }
  function a(i, f) {
    const l = typeof i == "string" ? new Date(i) : i, g = typeof f == "string" ? new Date(f) : f, y = rt({ start: l, end: g }).map((b) => T(b, "yyyy-MM-dd"));
    e.value = Array.from(/* @__PURE__ */ new Set([...e.value, ...y]));
  }
  function o(i) {
    const f = typeof i == "string" ? i : T(i, "yyyy-MM-dd");
    e.value = e.value.filter((l) => l !== f);
  }
  function c(i, f) {
    const l = typeof i == "string" ? new Date(i) : i, g = typeof f == "string" ? new Date(f) : f, y = rt({ start: l, end: g }).map((b) => T(b, "yyyy-MM-dd"));
    e.value = e.value.filter((b) => !y.includes(b));
  }
  function u(i, f) {
    const l = typeof i == "string" ? new Date(i) : i, g = typeof f == "string" ? new Date(f) : f, y = rt({ start: l, end: g }).map((b) => T(b, "yyyy-MM-dd"));
    e.value = e.value.filter((b) => !y.includes(b)).concat(y.filter((b) => !e.value.includes(b)));
  }
  function m(i, f) {
    const l = typeof i == "string" ? new Date(i) : i, g = typeof f == "string" ? new Date(f) : f, y = e.value.includes(T(l, "yyyy-MM-dd")), b = e.value.includes(T(g, "yyyy-MM-dd"));
    y && b ? (n.value = "remove", c(l, g)) : (n.value = "add", a(l, g));
  }
  return { dates: e, action: n, addDate: r, addDates: a, removeDate: o, removeDates: c, xorDates: u, selectDates: m };
})(), rn = /* @__PURE__ */ Ht({
  __name: "Calendar",
  props: {
    modelValue: {
      type: Array,
      default: () => [],
      required: !0
    },
    minDate: {
      type: Date,
      default: void 0,
      required: !1
    },
    maxDate: {
      type: Date,
      default: void 0,
      required: !1
    }
  },
  emits: ["update:modelValue"],
  setup(t, { emit: e }) {
    const n = t, r = x(() => n.minDate), a = x(() => n.maxDate), o = tn(n.modelValue), c = x(() => o.dates), u = x(() => o.action), m = C([
      {
        key: "today",
        highlight: "green",
        dates: c
      }
    ]), i = x(() => ({
      highlight: u.value === "remove" ? {
        style: {
          backgroundColor: "transparent"
        },
        contentStyle: {
          backgroundColor: "transparent",
          color: "black"
        }
      } : {
        style: {
          backgroundColor: "transparent",
          color: "black"
        }
      }
    })), f = x(() => ({
      highlight: {
        style: {
          backgroundColor: "#5fc385",
          color: "white"
        },
        contentStyle: {
          color: "white"
        }
      }
    })), l = C(), g = C("Asia/Taipei");
    lt(() => {
      if (!l.value)
        return;
      const b = l.value.start, _ = l.value.end;
      o.selectDates(b, _);
    });
    const y = e;
    return lt(() => {
      y("update:modelValue", c.value);
    }), (b, _) => {
      const N = Rt("VDatePicker");
      return Lt(), At(N, {
        class: "my-calendar",
        columns: 2,
        attributes: m.value,
        modelValue: l.value,
        "onUpdate:modelValue": _[0] || (_[0] = (W) => l.value = W),
        modelModifiers: { range: !0 },
        "select-attribute": i.value,
        "drag-attribute": f.value,
        timezone: g.value,
        "min-date": r.value,
        "max-date": a.value
      }, null, 8, ["attributes", "modelValue", "select-attribute", "drag-attribute", "timezone", "min-date", "max-date"]);
    };
  }
});
export {
  rn as default
};
