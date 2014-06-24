// At the top of your script:
if (!window.console) console = {
    log: function () {}
};

var jQuery182 = jQuery.noConflict();
(function (jQuery) {
    var $ = jQuery;

    /*!
     * jQuery Tools v1.2.7 - The missing UI library for the Web
     *
     * overlay/overlay.js
     * overlay/overlay.apple.js
     * scrollable/scrollable.js
     * scrollable/scrollable.navigator.js
     * tabs/tabs.js
     * toolbox/toolbox.expose.js
     *
     * NO COPYRIGHTS OR LICENSES. DO WHAT YOU LIKE.
     *
     * http://flowplayer.org/tools/
     *
     */
    (function (a) {
        a.tools = a.tools || {
            version: "v1.2.7"
        }, a.tools.overlay = {
            addEffect: function (a, b, d) {
                c[a] = [b, d]
            },
            conf: {
                close: null,
                closeOnClick: !0,
                closeOnEsc: !0,
                closeSpeed: "fast",
                effect: "default",
                fixed: !a.browser.msie || a.browser.version > 6,
                left: "center",
                load: !1,
                mask: null,
                oneInstance: !0,
                speed: "normal",
                target: null,
                top: "10%"
            }
        };
        var b = [],
            c = {};
        a.tools.overlay.addEffect("default", function (b, c) {
            var d = this.getConf(),
                e = a(window);
            d.fixed || (b.top += e.scrollTop(), b.left += e.scrollLeft()), b.position = d.fixed ? "fixed" : "absolute", this.getOverlay().css(b).fadeIn(d.speed, c)
        }, function (a) {
            this.getOverlay().fadeOut(this.getConf().closeSpeed, a)
        });

        function d(d, e) {
            var f = this,
                g = d.add(f),
                h = a(window),
                i, j, k, l = a.tools.expose && (e.mask || e.expose),
                m = Math.random().toString().slice(10);
            l && (typeof l == "string" && (l = {
                color: l
            }), l.closeOnClick = l.closeOnEsc = !1);
            var n = e.target || d.attr("rel");
            j = n ? a(n) : null || d;
            if (!j.length) throw "Could not find Overlay: " + n;
            d && d.index(j) == -1 && d.click(function (a) {
                f.load(a);
                return a.preventDefault()
            }), a.extend(f, {
                load: function (d) {
                    if (f.isOpened()) return f;
                    var i = c[e.effect];
                    if (!i) throw "Overlay: cannot find effect : \"" + e.effect + "\"";
                    e.oneInstance && a.each(b, function () {
                        this.close(d)
                    }), d = d || a.Event(), d.type = "onBeforeLoad", g.trigger(d);
                    if (d.isDefaultPrevented()) return f;
                    k = !0, l && a(j).expose(l);
                    var n = e.top,
                        o = e.left,
                        p = j.outerWidth({
                            margin: !0
                        }),
                        q = j.outerHeight({
                            margin: !0
                        });
                    typeof n == "string" && (n = n == "center" ? Math.max((h.height() - q) / 2, 0) : parseInt(n, 10) / 100 * h.height()), o == "center" && (o = Math.max((h.width() - p) / 2, 0)), i[0].call(f, {
                        top: n,
                        left: o
                    }, function () {
                        k && (d.type = "onLoad", g.trigger(d))
                    }), l && e.closeOnClick && a.mask.getMask().one("click", f.close), e.closeOnClick && a(document).on("click." + m, function (b) {
                        a(b.target).parents(j).length || f.close(b)
                    }), e.closeOnEsc && a(document).on("keydown." + m, function (a) {
                        a.keyCode == 27 && f.close(a)
                    });
                    return f
                },
                close: function (b) {
                    if (!f.isOpened()) return f;
                    b = b || a.Event(), b.type = "onBeforeClose", g.trigger(b);
                    if (!b.isDefaultPrevented()) {
                        k = !1, c[e.effect][1].call(f, function () {
                            b.type = "onClose", g.trigger(b)
                        }), a(document).off("click." + m + " keydown." + m), l && a.mask.close();
                        return f
                    }
                },
                getOverlay: function () {
                    return j
                },
                getTrigger: function () {
                    return d
                },
                getClosers: function () {
                    return i
                },
                isOpened: function () {
                    return k
                },
                getConf: function () {
                    return e
                }
            }), a.each("onBeforeLoad,onStart,onLoad,onBeforeClose,onClose".split(","), function (b, c) {
                a.isFunction(e[c]) && a(f).on(c, e[c]), f[c] = function (b) {
                    b && a(f).on(c, b);
                    return f
                }
            }), i = j.find(e.close || ".close"), !i.length && !e.close && (i = a("<a class=\"close\"></a>"), j.prepend(i)), i.click(function (a) {
                f.close(a)
            }), e.load && f.load()
        }
        a.fn.overlay = function (c) {
            var e = this.data("overlay");
            if (e) return e;
            a.isFunction(c) && (c = {
                onBeforeLoad: c
            }), c = a.extend(!0, {}, a.tools.overlay.conf, c), this.each(function () {
                e = new d(a(this), c), b.push(e), a(this).data("overlay", e)
            });
            return c.api ? e : this
        }
    })(jQuery);
    (function (a) {
        var b = a.tools.overlay,
            c = a(window);
        a.extend(b.conf, {
            start: {
                top: null,
                left: null
            },
            fadeInSpeed: "fast",
            zIndex: 9999
        });

        function d(a) {
            var b = a.offset();
            return {
                top: b.top + a.height() / 2,
                left: b.left + a.width() / 2
            }
        }
        var e = function (b, e) {
                var f = this.getOverlay(),
                    g = this.getConf(),
                    h = this.getTrigger(),
                    i = this,
                    j = f.outerWidth({
                        margin: !0
                    }),
                    k = f.data("img"),
                    l = g.fixed ? "fixed" : "absolute";
                if (!k) {
                    var m = f.css("backgroundImage");
                    if (!m) throw "background-image CSS property not set for overlay";
                    m = m.slice(m.indexOf("(") + 1, m.indexOf(")")).replace(/\"/g, ""), f.css("backgroundImage", "none"), k = a("<img src=\"" + m + "\"/>"), k.css({
                        border: 0,
                        display: "none"
                    }).width(j), a("body").append(k), f.data("img", k)
                }
                var n = g.start.top || Math.round(c.height() / 2),
                    o = g.start.left || Math.round(c.width() / 2);
                if (h) {
                    var p = d(h);
                    n = p.top, o = p.left
                }
                g.fixed ? (n -= c.scrollTop(), o -= c.scrollLeft()) : (b.top += c.scrollTop(), b.left += c.scrollLeft()), k.css({
                    position: "absolute",
                    top: n,
                    left: o,
                    width: 0,
                    zIndex: g.zIndex
                }).show(), b.position = l, f.css(b), k.animate({
                    top: b.top,
                    left: b.left,
                    width: j
                }, g.speed, function () {
                    f.css("zIndex", g.zIndex + 1).fadeIn(g.fadeInSpeed, function () {
                        i.isOpened() && !a(this).index(f) ? e.call() : f.hide()
                    })
                }).css("position", l)
            },
            f = function (b) {
                var e = this.getOverlay().hide(),
                    f = this.getConf(),
                    g = this.getTrigger(),
                    h = e.data("img"),
                    i = {
                        top: f.start.top,
                        left: f.start.left,
                        width: 0
                    };
                g && a.extend(i, d(g)), f.fixed && h.css({
                    position: "absolute"
                }).animate({
                    top: "+=" + c.scrollTop(),
                    left: "+=" + c.scrollLeft()
                }, 0), h.animate(i, f.closeSpeed, b)
            };
        b.addEffect("apple", e, f)
    })(jQuery);
    (function (a) {
        a.tools = a.tools || {
            version: "v1.2.7"
        }, a.tools.scrollable = {
            conf: {
                activeClass: "active",
                circular: !1,
                clonedClass: "cloned",
                disabledClass: "disabled",
                easing: "swing",
                initialIndex: 0,
                item: "> *",
                items: ".items",
                keyboard: !0,
                mousewheel: !1,
                next: ".next",
                prev: ".prev",
                size: 1,
                speed: 400,
                vertical: !1,
                touch: !0,
                wheelSpeed: 0
            }
        };

        function b(a, b) {
            var c = parseInt(a.css(b), 10);
            if (c) return c;
            var d = a[0].currentStyle;
            return d && d.width && parseInt(d.width, 10)
        }

        function c(b, c) {
            var d = a(c);
            return d.length < 2 ? d : b.parent().find(c)
        }
        var d;

        function e(b, e) {
            var f = this,
                g = b.add(f),
                h = b.children(),
                i = 0,
                j = e.vertical;
            d || (d = f), h.length > 1 && (h = a(e.items, b)), e.size > 1 && (e.circular = !1), a.extend(f, {
                getConf: function () {
                    return e
                },
                getIndex: function () {
                    return i
                },
                getSize: function () {
                    return f.getItems().size()
                },
                getNaviButtons: function () {
                    return n.add(o)
                },
                getRoot: function () {
                    return b
                },
                getItemWrap: function () {
                    return h
                },
                getItems: function () {
                    return h.find(e.item).not("." + e.clonedClass)
                },
                move: function (a, b) {
                    return f.seekTo(i + a, b)
                },
                next: function (a) {
                    return f.move(e.size, a)
                },
                prev: function (a) {
                    return f.move(-e.size, a)
                },
                begin: function (a) {
                    return f.seekTo(0, a)
                },
                end: function (a) {
                    return f.seekTo(f.getSize() - 1, a)
                },
                focus: function () {
                    d = f;
                    return f
                },
                addItem: function (b) {
                    b = a(b), e.circular ? (h.children().last().before(b), h.children().first().replaceWith(b.clone().addClass(e.clonedClass))) : (h.append(b), o.removeClass("disabled")), g.trigger("onAddItem", [b]);
                    return f
                },
                seekTo: function (b, c, k) {
                    b.jquery || (b *= 1);
                    if (e.circular && b === 0 && i == -1 && c !== 0) return f;
                    if (!e.circular && b < 0 || b > f.getSize() || b < -1) return f;
                    var l = b;
                    b.jquery ? b = f.getItems().index(b) : l = f.getItems().eq(b);
                    var m = a.Event("onBeforeSeek");
                    if (!k) {
                        g.trigger(m, [b, c]);
                        if (m.isDefaultPrevented() || !l.length) return f
                    }
                    var n = j ? {
                        top: -l.position().top
                    } : {
                        left: -l.position().left
                    };
                    i = b, d = f, c === undefined && (c = e.speed), h.animate(n, c, e.easing, k || function () {
                        g.trigger("onSeek", [b])
                    });
                    return f
                }
            }), a.each(["onBeforeSeek", "onSeek", "onAddItem"], function (b, c) {
                a.isFunction(e[c]) && a(f).on(c, e[c]), f[c] = function (b) {
                    b && a(f).on(c, b);
                    return f
                }
            });
            if (e.circular) {
                var k = f.getItems().slice(-1).clone().prependTo(h),
                    l = f.getItems().eq(1).clone().appendTo(h);
                k.add(l).addClass(e.clonedClass), f.onBeforeSeek(function (a, b, c) {
                    if (!a.isDefaultPrevented()) {
                        if (b == -1) {
                            f.seekTo(k, c, function () {
                                f.end(0)
                            });
                            return a.preventDefault()
                        }
                        b == f.getSize() && f.seekTo(l, c, function () {
                            f.begin(0)
                        })
                    }
                });
                var m = b.parents().add(b).filter(function () {
                    if (a(this).css("display") === "none") return !0
                });
                m.length ? (m.show(), f.seekTo(0, 0, function () {}), m.hide()) : f.seekTo(0, 0, function () {})
            }
            var n = c(b, e.prev).click(function (a) {
                    a.stopPropagation(), f.prev()
                }),
                o = c(b, e.next).click(function (a) {
                    a.stopPropagation(), f.next()
                });
            e.circular || (f.onBeforeSeek(function (a, b) {
                setTimeout(function () {
                    a.isDefaultPrevented() || (n.toggleClass(e.disabledClass, b <= 0), o.toggleClass(e.disabledClass, b >= f.getSize() - 1))
                }, 1)
            }), e.initialIndex || n.addClass(e.disabledClass)), f.getSize() < 2 && n.add(o).addClass(e.disabledClass), e.mousewheel && a.fn.mousewheel && b.mousewheel(function (a, b) {
                if (e.mousewheel) {
                    f.move(b < 0 ? 1 : -1, e.wheelSpeed || 50);
                    return !1
                }
            });
            if (e.touch) {
                var p = {};
                h[0].ontouchstart = function (a) {
                    var b = a.touches[0];
                    p.x = b.clientX, p.y = b.clientY
                }, h[0].ontouchmove = function (a) {
                    if (a.touches.length == 1 && !h.is(":animated")) {
                        var b = a.touches[0],
                            c = p.x - b.clientX,
                            d = p.y - b.clientY;
                        f[j && d > 0 || !j && c > 0 ? "next" : "prev"](), a.preventDefault()
                    }
                }
            }
            e.keyboard && a(document).on("keydown.scrollable", function (b) {
                if (!(!e.keyboard || b.altKey || b.ctrlKey || b.metaKey || a(b.target).is(":input"))) {
                    if (e.keyboard != "static" && d != f) return;
                    var c = b.keyCode;
                    if (j && (c == 38 || c == 40)) {
                        f.move(c == 38 ? -1 : 1);
                        return b.preventDefault()
                    }
                    if (!j && (c == 37 || c == 39)) {
                        f.move(c == 37 ? -1 : 1);
                        return b.preventDefault()
                    }
                }
            }), e.initialIndex && f.seekTo(e.initialIndex, 0, function () {})
        }
        a.fn.scrollable = function (b) {
            var c = this.data("scrollable");
            if (c) return c;
            b = a.extend({}, a.tools.scrollable.conf, b), this.each(function () {
                c = new e(a(this), b), a(this).data("scrollable", c)
            });
            return b.api ? c : this
        }
    })(jQuery);
    (function (a) {
        var b = a.tools.scrollable;
        b.navigator = {
            conf: {
                navi: ".navi",
                naviItem: null,
                activeClass: "active",
                indexed: !1,
                idPrefix: null,
                history: !1
            }
        };

        function c(b, c) {
            var d = a(c);
            return d.length < 2 ? d : b.parent().find(c)
        }
        a.fn.navigator = function (d) {
            typeof d == "string" && (d = {
                navi: d
            }), d = a.extend({}, b.navigator.conf, d);
            var e;
            this.each(function () {
                var b = a(this).data("scrollable"),
                    f = d.navi.jquery ? d.navi : c(b.getRoot(), d.navi),
                    g = b.getNaviButtons(),
                    h = d.activeClass,
                    i = d.history && history.pushState,
                    j = b.getConf().size;
                b && (e = b), b.getNaviButtons = function () {
                    return g.add(f)
                }, i && (history.pushState({
                    i: 0
                }, ""), a(window).on("popstate", function (a) {
                    var c = a.originalEvent.state;
                    c && b.seekTo(c.i)
                }));

                function k(a, c, d) {
                    b.seekTo(c), d.preventDefault(), i && history.pushState({
                        i: c
                    }, "")
                }

                function l() {
                    return f.find(d.naviItem || "> *")
                }

                function m(b) {
                    var c = a("<" + (d.naviItem || "a") + "/>").click(function (c) {
                        k(a(this), b, c)
                    });
                    b === 0 && c.addClass(h), d.indexed && c.text(b + 1), d.idPrefix && c.attr("id", d.idPrefix + b);
                    return c.appendTo(f)
                }
                l().length ? l().each(function (b) {
                    a(this).click(function (c) {
                        k(a(this), b, c)
                    })
                }) : a.each(b.getItems(), function (a) {
                    a % j == 0 && m(a)
                }), b.onBeforeSeek(function (a, b) {
                    setTimeout(function () {
                        if (!a.isDefaultPrevented()) {
                            var c = b / j,
                                d = l().eq(c);
                            d.length && l().removeClass(h).eq(c).addClass(h)
                        }
                    }, 1)
                }), b.onAddItem(function (a, c) {
                    var d = b.getItems().index(c);
                    d % j == 0 && m(d)
                })
            });
            return d.api ? e : this
        }
    })(jQuery);
    (function (a) {
        a.tools = a.tools || {
            version: "v1.2.7"
        }, a.tools.tabs = {
            conf: {
                tabs: "a",
                current: "current",
                onBeforeClick: null,
                onClick: null,
                effect: "default",
                initialEffect: !1,
                initialIndex: 0,
                event: "click",
                rotate: !1,
                slideUpSpeed: 400,
                slideDownSpeed: 400,
                history: !1
            },
            addEffect: function (a, c) {
                b[a] = c
            }
        };
        var b = {
                "default": function (a, b) {
                    this.getPanes().hide().eq(a).show(), b.call()
                },
                fade: function (a, b) {
                    var c = this.getConf(),
                        d = c.fadeOutSpeed,
                        e = this.getPanes();
                    d ? e.fadeOut(d) : e.hide(), e.eq(a).fadeIn(c.fadeInSpeed, b)
                },
                slide: function (a, b) {
                    var c = this.getConf();
                    this.getPanes().slideUp(c.slideUpSpeed), this.getPanes().eq(a).slideDown(c.slideDownSpeed, b)
                },
                ajax: function (a, b) {
                    this.getPanes().eq(0).load(this.getTabs().eq(a).attr("href"), b)
                }
            },
            c, d;
        a.tools.tabs.addEffect("horizontal", function (b, e) {
            if (!c) {
                var f = this.getPanes().eq(b),
                    g = this.getCurrentPane();
                d || (d = this.getPanes().eq(0).width()), c = !0, f.show(), g.animate({
                    width: 0
                }, {
                    step: function (a) {
                        f.css("width", d - a)
                    },
                    complete: function () {
                        a(this).hide(), e.call(), c = !1
                    }
                }), g.length || (e.call(), c = !1)
            }
        });

        function e(c, d, e) {
            var f = this,
                g = c.add(this),
                h = c.find(e.tabs),
                i = d.jquery ? d : c.children(d),
                j;
            h.length || (h = c.children()), i.length || (i = c.parent().find(d)), i.length || (i = a(d)), a.extend(this, {
                click: function (d, i) {
                    var k = h.eq(d),
                        l = !c.data("tabs");
                    typeof d == "string" && d.replace("#", "") && (k = h.filter("[href*=\"" + d.replace("#", "") + "\"]"), d = Math.max(h.index(k), 0));
                    if (e.rotate) {
                        var m = h.length - 1;
                        if (d < 0) return f.click(m, i);
                        if (d > m) return f.click(0, i)
                    }
                    if (!k.length) {
                        if (j >= 0) return f;
                        d = e.initialIndex, k = h.eq(d)
                    }
                    if (d === j) return f;
                    i = i || a.Event(), i.type = "onBeforeClick", g.trigger(i, [d]);
                    if (!i.isDefaultPrevented()) {
                        var n = l ? e.initialEffect && e.effect || "default" : e.effect;
                        b[n].call(f, d, function () {
                            j = d, i.type = "onClick", g.trigger(i, [d])
                        }), h.removeClass(e.current), k.addClass(e.current);
                        return f
                    }
                },
                getConf: function () {
                    return e
                },
                getTabs: function () {
                    return h
                },
                getPanes: function () {
                    return i
                },
                getCurrentPane: function () {
                    return i.eq(j)
                },
                getCurrentTab: function () {
                    return h.eq(j)
                },
                getIndex: function () {
                    return j
                },
                next: function () {
                    return f.click(j + 1)
                },
                prev: function () {
                    return f.click(j - 1)
                },
                destroy: function () {
                    h.off(e.event).removeClass(e.current), i.find("a[href^=\"#\"]").off("click.T");
                    return f
                }
            }), a.each("onBeforeClick,onClick".split(","), function (b, c) {
                a.isFunction(e[c]) && a(f).on(c, e[c]), f[c] = function (b) {
                    b && a(f).on(c, b);
                    return f
                }
            }), e.history && a.fn.history && (a.tools.history.init(h), e.event = "history"), h.each(function (b) {
                a(this).on(e.event, function (a) {
                    f.click(b, a);
                    return a.preventDefault()
                })
            }), i.find("a[href^=\"#\"]").on("click.T", function (b) {
                f.click(a(this).attr("href"), b)
            }), location.hash && e.tabs == "a" && c.find("[href=\"" + location.hash + "\"]").length ? f.click(location.hash) : (e.initialIndex === 0 || e.initialIndex > 0) && f.click(e.initialIndex)
        }
        a.fn.tabs = function (b, c) {
            var d = this.data("tabs");
            d && (d.destroy(), this.removeData("tabs")), a.isFunction(c) && (c = {
                onBeforeClick: c
            }), c = a.extend({}, a.tools.tabs.conf, c), this.each(function () {
                d = new e(a(this), b, c), a(this).data("tabs", d)
            });
            return c.api ? d : this
        }
    })(jQuery);
    (function (a) {
        a.tools = a.tools || {
            version: "v1.2.7"
        };
        var b;
        b = a.tools.expose = {
            conf: {
                maskId: "exposeMask",
                loadSpeed: "slow",
                closeSpeed: "fast",
                closeOnClick: !0,
                closeOnEsc: !0,
                zIndex: 9998,
                opacity: .8,
                startOpacity: 0,
                color: "#fff",
                onLoad: null,
                onClose: null
            }
        };

        function c() {
            if (a.browser.msie) {
                var b = a(document).height(),
                    c = a(window).height();
                return [window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth, b - c < 20 ? c : b]
            }
            return [a(document).width(), a(document).height()]
        }

        function d(b) {
            if (b) return b.call(a.mask)
        }
        var e, f, g, h, i;
        a.mask = {
            load: function (j, k) {
                if (g) return this;
                typeof j == "string" && (j = {
                    color: j
                }), j = j || h, h = j = a.extend(a.extend({}, b.conf), j), e = a("#" + j.maskId), e.length || (e = a("<div/>").attr("id", j.maskId), a("body").append(e));
                var l = c();
                e.css({
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: l[0],
                    height: l[1],
                    display: "none",
                    opacity: j.startOpacity,
                    zIndex: j.zIndex
                }), j.color && e.css("backgroundColor", j.color);
                if (d(j.onBeforeLoad) === !1) return this;
                j.closeOnEsc && a(document).on("keydown.mask", function (b) {
                    b.keyCode == 27 && a.mask.close(b)
                }), j.closeOnClick && e.on("click.mask", function (b) {
                    a.mask.close(b)
                }), a(window).on("resize.mask", function () {
                    a.mask.fit()
                }), k && k.length && (i = k.eq(0).css("zIndex"), a.each(k, function () {
                    var b = a(this);
                    /relative|absolute|fixed/i.test(b.css("position")) || b.css("position", "relative")
                }), f = k.css({
                    zIndex: Math.max(j.zIndex + 1, i == "auto" ? 0 : i)
                })), e.css({
                    display: "block"
                }).fadeTo(j.loadSpeed, j.opacity, function () {
                    a.mask.fit(), d(j.onLoad), g = "full"
                }), g = !0;
                return this
            },
            close: function () {
                if (g) {
                    if (d(h.onBeforeClose) === !1) return this;
                    e.fadeOut(h.closeSpeed, function () {
                        d(h.onClose), f && f.css({
                            zIndex: i
                        }), g = !1
                    }), a(document).off("keydown.mask"), e.off("click.mask"), a(window).off("resize.mask")
                }
                return this
            },
            fit: function () {
                if (g) {
                    var a = c();
                    e.css({
                        width: a[0],
                        height: a[1]
                    })
                }
            },
            getMask: function () {
                return e
            },
            isLoaded: function (a) {
                return a ? g == "full" : g
            },
            getConf: function () {
                return h
            },
            getExposed: function () {
                return f
            }
        }, a.fn.mask = function (b) {
            a.mask.load(b);
            return this
        }, a.fn.expose = function (b) {
            a.mask.load(b, this);
            return this
        }
    })(jQuery);


    /*
     * ICANHAZ.js v0.10
     * http://icanhazjs.com/
     *
     */
    (function () {
        var q = function () {
            function c(a) {
                return ("" + a).replace(/&(?!\w+;)|[<>"']/g, function (a) {
                    return k[a] || a
                })
            }
            var e = Object.prototype.toString;
            Array.isArray = Array.isArray || function (a) {
                return "[object Array]" == e.call(a)
            };
            var i = String.prototype.trim,
                g;
            if (i) g = function (a) {
                return null == a ? "" : i.call(a)
            };
            else {
                var h, m;
                /\S/.test("\u00a0") ? (h = /^[\s\xA0]+/, m = /[\s\xA0]+$/) : (h = /^\s+/, m = /\s+$/);
                g = function (a) {
                    return null == a ? "" : a.toString().replace(h, "").replace(m, "")
                }
            }
            var k = {
                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;",
                    '"': "&quot;",
                    "'": "&#39;"
                },
                o = {},
                p = function () {};
            p.prototype = {
                otag: "{{",
                ctag: "}}",
                pragmas: {},
                buffer: [],
                pragmas_implemented: {
                    "IMPLICIT-ITERATOR": !0
                },
                context: {},
                render: function (a, d, b, f) {
                    if (!f) this.context = d, this.buffer = [];
                    if (this.includes("", a)) {
                        var a = this.render_pragmas(a),
                            j = this.render_section(a, d, b);
                        !1 === j && (j = this.render_tags(a, d, b, f));
                        if (f) return j;
                        this.sendLines(j)
                    } else {
                        if (f) return a;
                        this.send(a)
                    }
                },
                send: function (a) {
                    "" !== a && this.buffer.push(a)
                },
                sendLines: function (a) {
                    if (a)
                        for (var a = a.split("\n"), d = 0; d < a.length; d++) this.send(a[d])
                },
                render_pragmas: function (a) {
                    if (!this.includes("%", a)) return a;
                    var d = this,
                        b = this.getCachedRegex("render_pragmas", function (a, d) {
                            return RegExp(a + "%([\\w-]+) ?([\\w]+=[\\w]+)?" + d, "g")
                        });
                    return a.replace(b, function (a, b, e) {
                        if (!d.pragmas_implemented[b]) throw {
                            message: "This implementation of mustache doesn't understand the '" + b + "' pragma"
                        };
                        d.pragmas[b] = {};
                        e && (a = e.split("="), d.pragmas[b][a[0]] = a[1]);
                        return ""
                    })
                },
                render_partial: function (a, d, b) {
                    a = g(a);
                    if (!b || void 0 === b[a]) throw {
                        message: "unknown_partial '" + a + "'"
                    };
                    return !d || "object" != typeof d[a] ? this.render(b[a], d, b, !0) : this.render(b[a], d[a], b, !0)
                },
                render_section: function (a, d, b) {
                    if (!this.includes("#", a) && !this.includes("^", a)) return !1;
                    var f = this,
                        j = this.getCachedRegex("render_section", function (a, b) {
                            return RegExp("^([\\s\\S]*?)" + a + "(\\^|\\#)\\s*(.+)\\s*" + b + "\n*([\\s\\S]*?)" + a + "\\/\\s*\\3\\s*" + b + "\\s*([\\s\\S]*)$", "g")
                        });
                    return a.replace(j, function (a, j, e, c, g, h) {
                        var a = j ? f.render_tags(j, d, b, !0) : "",
                            h = h ? f.render(h, d, b, !0) : "",
                            n, c = f.find(c, d);
                        "^" === e ? n = !c || Array.isArray(c) &&
                            0 === c.length ? f.render(g, d, b, !0) : "" : "#" === e && (n = Array.isArray(c) ? f.map(c, function (a) {
                                return f.render(g, f.create_context(a), b, !0)
                            }).join("") : f.is_object(c) ? f.render(g, f.create_context(c), b, !0) : "function" == typeof c ? c.call(d, g, function (a) {
                                return f.render(a, d, b, !0)
                            }) : c ? f.render(g, d, b, !0) : "");
                        return a + n + h
                    })
                },
                render_tags: function (a, d, b, f) {
                    for (var j = this, e = function () {
                        return j.getCachedRegex("render_tags", function (a, b) {
                            return RegExp(a + "(=|!|>|&|\\{|%)?([^#\\^]+?)\\1?" + b + "+", "g")
                        })
                    }, g = e(), h = function (a, f, h) {
                        switch (f) {
                        case "!":
                            return "";
                        case "=":
                            return j.set_delimiters(h), g = e(), "";
                        case ">":
                            return j.render_partial(h, d, b);
                        case "{":
                        case "&":
                            return j.find(h, d);
                        default:
                            return c(j.find(h, d))
                        }
                    }, a = a.split("\n"), i = 0; i < a.length; i++) a[i] = a[i].replace(g, h, this), f || this.send(a[i]);
                    if (f) return a.join("\n")
                },
                set_delimiters: function (a) {
                    a = a.split(" ");
                    this.otag = this.escape_regex(a[0]);
                    this.ctag = this.escape_regex(a[1])
                },
                escape_regex: function (a) {
                    if (!arguments.callee.sRE) arguments.callee.sRE = RegExp("(\\/|\\.|\\*|\\+|\\?|\\||\\(|\\)|\\[|\\]|\\{|\\}|\\\\)",
                        "g");
                    return a.replace(arguments.callee.sRE, "\\$1")
                },
                find: function (a, d) {
                    function b(a) {
                        return !1 === a || 0 === a || a
                    }
                    var a = g(a),
                        f;
                    if (a.match(/([a-z_]+)\./ig)) {
                        var c = this.walk_context(a, d);
                        b(c) && (f = c)
                    } else b(d[a]) ? f = d[a] : b(this.context[a]) && (f = this.context[a]);
                    return "function" == typeof f ? f.apply(d) : void 0 !== f ? f : ""
                },
                walk_context: function (a, d) {
                    for (var b = a.split("."), f = void 0 != d[b[0]] ? d : this.context, c = f[b.shift()]; void 0 != c && 0 < b.length;) f = c, c = c[b.shift()];
                    return "function" == typeof c ? c.apply(f) : c
                },
                includes: function (a,
                    d) {
                    return -1 != d.indexOf(this.otag + a)
                },
                create_context: function (a) {
                    if (this.is_object(a)) return a;
                    var d = ".";
                    if (this.pragmas["IMPLICIT-ITERATOR"]) d = this.pragmas["IMPLICIT-ITERATOR"].iterator;
                    var b = {};
                    b[d] = a;
                    return b
                },
                is_object: function (a) {
                    return a && "object" == typeof a
                },
                map: function (a, d) {
                    if ("function" == typeof a.map) return a.map(d);
                    for (var b = [], c = a.length, e = 0; e < c; e++) b.push(d(a[e]));
                    return b
                },
                getCachedRegex: function (a, d) {
                    var b = o[this.otag];
                    b || (b = o[this.otag] = {});
                    var c = b[this.ctag];
                    c || (c = b[this.ctag] = {});
                    (b = c[a]) || (b = c[a] = d(this.otag, this.ctag));
                    return b
                }
            };
            return {
                name: "mustache.js",
                version: "0.4.0",
                to_html: function (a, c, b, f) {
                    var e = new p;
                    if (f) e.send = f;
                    e.render(a, c || {}, b);
                    if (!f) return e.buffer.join("\n")
                }
            }
        }();
        (function () {
            var c = {
                VERSION: "0.10",
                templates: {},
                $: "undefined" !== typeof window ? window.jQuery || window.Zepto || null : null,
                addTemplate: function (e, i) {
                    if ("object" === typeof e)
                        for (var g in e) this.addTemplate(g, e[g]);
                    else c[e] ? console.error("Invalid name: " + e + ".") : c.templates[e] ? console.error('Template "' + e +
                        '  " exists') : (c.templates[e] = i, c[e] = function (g, i) {
                        var g = g || {},
                            k = q.to_html(c.templates[e], g, c.templates);
                        return c.$ && !i ? c.$(k) : k
                    })
                },
                clearAll: function () {
                    for (var e in c.templates) delete c[e];
                    c.templates = {}
                },
                refresh: function () {
                    c.clearAll();
                    c.grabTemplates()
                },
                grabTemplates: function () {
                    var e, i = document.getElementsByTagName("script"),
                        g, h = [];
                    for (e = 0, l = i.length; e < l; e++)
                        if ((g = i[e]) && g.innerHTML && g.id && ("text/html" === g.type || "text/x-icanhaz" === g.type)) c.addTemplate(g.id, "".trim ? g.innerHTML.trim() : g.innerHTML.replace(/^\s+/,
                            "").replace(/\s+$/, "")), h.unshift(g);
                    for (e = 0, l = h.length; e < l; e++) h[e].parentNode.removeChild(h[e])
                }
            };
            "undefined" !== typeof require ? module.exports = c : window.ich = c;
            "undefined" !== typeof document && (c.$ ? c.$(function () {
                c.grabTemplates()
            }) : document.addEventListener("DOMContentLoaded", function () {
                c.grabTemplates()
            }, !0))
        })()
    })();

    /**
     * jQuery Roundabout - v2.4.2
     * http://fredhq.com/projects/roundabout
     *
     * Moves list-items of enabled ordered and unordered lists long
     * a chosen path. Includes the default "lazySusan" path, that
     * moves items long a spinning turntable.
     *
     * Terms of Use // jQuery Roundabout
     *
     * Open source under the BSD license
     *
     * Copyright (c) 2011-2012, Fred LeBlanc
     * All rights reserved.
     *
     * Redistribution and use in source and binary forms, with or without
     * modification, are permitted provided that the following conditions are met:
     *
     *   - Redistributions of source code must retain the above copyright
     *     notice, this list of conditions and the following disclaimer.
     *   - Redistributions in binary form must reproduce the above
     *     copyright notice, this list of conditions and the following
     *     disclaimer in the documentation and/or other materials provided
     *     with the distribution.
     *   - Neither the name of the author nor the names of its contributors
     *     may be used to endorse or promote products derived from this
     *     software without specific prior written permission.
     *
     * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
     * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
     * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
     * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
     * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
     * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
     * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
     * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
     * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
     * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
     * POSSIBILITY OF SUCH DAMAGE.
     */
    (function (a) {
        "use strict";
        var b, c, d;
        a.extend({
            roundaboutShapes: {
                def: "lazySusan",
                lazySusan: function (a, b, c) {
                    return {
                        x: Math.sin(a + b),
                        y: Math.sin(a + 3 * Math.PI / 2 + b) / 8 * c,
                        z: (Math.cos(a + b) + 1) / 2,
                        scale: Math.sin(a + Math.PI / 2 + b) / 2 + .5
                    }
                }
            }
        });
        b = {
            bearing: 0,
            tilt: 0,
            minZ: 100,
            maxZ: 280,
            minOpacity: .4,
            maxOpacity: 1,
            minScale: .4,
            maxScale: 1,
            duration: 600,
            btnNext: null,
            btnNextCallback: function () {},
            btnPrev: null,
            btnPrevCallback: function () {},
            btnToggleAutoplay: null,
            btnStartAutoplay: null,
            btnStopAutoplay: null,
            easing: "swing",
            clickToFocus: true,
            clickToFocusCallback: function () {},
            focusBearing: 0,
            shape: "lazySusan",
            debug: false,
            childSelector: "li",
            startingChild: null,
            reflect: false,
            floatComparisonThreshold: .001,
            autoplay: false,
            autoplayDuration: 1e3,
            autoplayPauseOnHover: false,
            autoplayCallback: function () {},
            autoplayInitialDelay: 0,
            enableDrag: false,
            dropDuration: 600,
            dropEasing: "swing",
            dropAnimateTo: "nearest",
            dropCallback: function () {},
            dragAxis: "x",
            dragFactor: 4,
            triggerFocusEvents: true,
            triggerBlurEvents: true,
            responsive: false
        };
        c = {
            autoplayInterval: null,
            autoplayIsRunning: false,
            autoplayStartTimeout: null,
            animating: false,
            childInFocus: -1,
            touchMoveStartPosition: null,
            stopAnimation: false,
            lastAnimationStep: false
        };
        d = {
            init: function (e, f, g) {
                var h, i = (new Date).getTime();
                e = typeof e === "object" ? e : {};
                f = a.isFunction(f) ? f : function () {};
                f = a.isFunction(e) ? e : f;
                h = a.extend({}, b, e, c);
                return this.each(function () {
                    var b = a(this),
                        c = b.children(h.childSelector).length,
                        e = 360 / c,
                        i = h.startingChild && h.startingChild > c - 1 ? c - 1 : h.startingChild,
                        j = h.startingChild === null ? h.bearing : 360 - i * e,
                        k = b.css("position") !== "static" ? b.css("position") : "relative";
                    b.css({
                        padding: 0,
                        position: k
                    }).addClass("roundabout-holder").data("roundabout", a.extend({}, h, {
                        startingChild: i,
                        bearing: j,
                        oppositeOfFocusBearing: d.normalize.apply(null, [h.focusBearing - 180]),
                        dragBearing: j,
                        period: e
                    }));
                    if (g) {
                        b.unbind(".roundabout").children(h.childSelector).unbind(".roundabout")
                    } else {
                        if (h.responsive) {
                            a(window).bind("resize", function () {
                                d.stopAutoplay.apply(b);
                                d.relayoutChildren.apply(b)
                            })
                        }
                    } if (h.clickToFocus) {
                        b.children(h.childSelector).each(function (c) {
                            a(this).bind("click.roundabout", function () {
                                var e = d.getPlacement.apply(b, [c]);
                                if (!d.isInFocus.apply(b, [e])) {
                                    d.stopAnimation.apply(a(this));
                                    if (!b.data("roundabout").animating) {
                                        d.animateBearingToFocus.apply(b, [e, b.data("roundabout").clickToFocusCallback])
                                    }
                                    return false
                                }
                            })
                        })
                    }
                    if (h.btnNext) {
                        a(h.btnNext).bind("click.roundabout", function () {
                            if (!b.data("roundabout").animating) {
                                d.animateToNextChild.apply(b, [b.data("roundabout").btnNextCallback])
                            }
                            return false
                        })
                    }
                    if (h.btnPrev) {
                        a(h.btnPrev).bind("click.roundabout", function () {
                            d.animateToPreviousChild.apply(b, [b.data("roundabout").btnPrevCallback]);
                            return false
                        })
                    }
                    if (h.btnToggleAutoplay) {
                        a(h.btnToggleAutoplay).bind("click.roundabout", function () {
                            d.toggleAutoplay.apply(b);
                            return false
                        })
                    }
                    if (h.btnStartAutoplay) {
                        a(h.btnStartAutoplay).bind("click.roundabout", function () {
                            d.startAutoplay.apply(b);
                            return false
                        })
                    }
                    if (h.btnStopAutoplay) {
                        a(h.btnStopAutoplay).bind("click.roundabout", function () {
                            d.stopAutoplay.apply(b);
                            return false
                        })
                    }
                    if (h.autoplayPauseOnHover) {
                        b.bind("mouseenter.roundabout.autoplay", function () {
                            d.stopAutoplay.apply(b, [true])
                        }).bind("mouseleave.roundabout.autoplay", function () {
                            d.startAutoplay.apply(b)
                        })
                    }
                    if (h.enableDrag) {
                        if (!a.isFunction(b.drag)) {
                            if (h.debug) {
                                alert("You do not have the drag plugin loaded.")
                            }
                        } else if (!a.isFunction(b.drop)) {
                            if (h.debug) {
                                alert("You do not have the drop plugin loaded.")
                            }
                        } else {
                            b.drag(function (a, c) {
                                var e = b.data("roundabout"),
                                    f = e.dragAxis.toLowerCase() === "x" ? "deltaX" : "deltaY";
                                d.stopAnimation.apply(b);
                                d.setBearing.apply(b, [e.dragBearing + c[f] / e.dragFactor])
                            }).drop(function (a) {
                                var c = b.data("roundabout"),
                                    e = d.getAnimateToMethod(c.dropAnimateTo);
                                d.allowAnimation.apply(b);
                                d[e].apply(b, [c.dropDuration, c.dropEasing, c.dropCallback]);
                                c.dragBearing = c.period * d.getNearestChild.apply(b)
                            })
                        }
                        b.each(function () {
                            var b = a(this).get(0),
                                c = a(this).data("roundabout"),
                                e = c.dragAxis.toLowerCase() === "x" ? "pageX" : "pageY",
                                f = d.getAnimateToMethod(c.dropAnimateTo);
                            if (b.addEventListener) {
                                b.addEventListener("touchstart", function (a) {
                                    c.touchMoveStartPosition = a.touches[0][e]
                                }, false);
                                b.addEventListener("touchmove", function (b) {
                                    var f = (b.touches[0][e] - c.touchMoveStartPosition) / c.dragFactor;
                                    b.preventDefault();
                                    d.stopAnimation.apply(a(this));
                                    d.setBearing.apply(a(this), [c.dragBearing + f])
                                }, false);
                                b.addEventListener("touchend", function (b) {
                                    b.preventDefault();
                                    d.allowAnimation.apply(a(this));
                                    f = d.getAnimateToMethod(c.dropAnimateTo);
                                    d[f].apply(a(this), [c.dropDuration, c.dropEasing, c.dropCallback]);
                                    c.dragBearing = c.period * d.getNearestChild.apply(a(this))
                                }, false)
                            }
                        })
                    }
                    d.initChildren.apply(b, [f, g])
                })
            },
            initChildren: function (b, c) {
                var e = a(this),
                    f = e.data("roundabout");
                b = b || function () {};
                e.children(f.childSelector).each(function (b) {
                    var f, g, h, i = d.getPlacement.apply(e, [b]);
                    if (c && a(this).data("roundabout")) {
                        f = a(this).data("roundabout").startWidth;
                        g = a(this).data("roundabout").startHeight;
                        h = a(this).data("roundabout").startFontSize
                    }
                    a(this).addClass("roundabout-moveable-item").css("position", "absolute");
                    a(this).data("roundabout", {
                        startWidth: f || a(this).width(),
                        startHeight: g || a(this).height(),
                        startFontSize: h || parseInt(a(this).css("font-size"), 10),
                        degrees: i,
                        backDegrees: d.normalize.apply(null, [i - 180]),
                        childNumber: b,
                        currentScale: 1,
                        parent: e
                    })
                });
                d.updateChildren.apply(e);
                if (f.autoplay) {
                    f.autoplayStartTimeout = setTimeout(function () {
                        d.startAutoplay.apply(e)
                    }, f.autoplayInitialDelay)
                }
                e.trigger("ready");
                b.apply(e);
                return e
            },
            updateChildren: function () {
                return this.each(function () {
                    var b = a(this),
                        c = b.data("roundabout"),
                        e = -1,
                        f = {
                            bearing: c.bearing,
                            tilt: c.tilt,
                            stage: {
                                width: Math.floor(a(this).width() * .9),
                                height: Math.floor(a(this).height() * .9)
                            },
                            animating: c.animating,
                            inFocus: c.childInFocus,
                            focusBearingRadian: d.degToRad.apply(null, [c.focusBearing]),
                            shape: a.roundaboutShapes[c.shape] || a.roundaboutShapes[a.roundaboutShapes.def]
                        };
                    f.midStage = {
                        width: f.stage.width / 2,
                        height: f.stage.height / 2
                    };
                    f.nudge = {
                        width: f.midStage.width + f.stage.width * .05,
                        height: f.midStage.height + f.stage.height * .05
                    };
                    f.zValues = {
                        min: c.minZ,
                        max: c.maxZ,
                        diff: c.maxZ - c.minZ
                    };
                    f.opacity = {
                        min: c.minOpacity,
                        max: c.maxOpacity,
                        diff: c.maxOpacity - c.minOpacity
                    };
                    f.scale = {
                        min: c.minScale,
                        max: c.maxScale,
                        diff: c.maxScale - c.minScale
                    };
                    b.children(c.childSelector).each(function (g) {
                        if (d.updateChild.apply(b, [a(this), f, g,
                            function () {
                                a(this).trigger("ready")
                            }
                        ]) && (!f.animating || c.lastAnimationStep)) {
                            e = g;
                            a(this).addClass("roundabout-in-focus")
                        } else {
                            a(this).removeClass("roundabout-in-focus")
                        }
                    });
                    if (e !== f.inFocus) {
                        if (c.triggerBlurEvents) {
                            b.children(c.childSelector).eq(f.inFocus).trigger("blur")
                        }
                        c.childInFocus = e;
                        if (c.triggerFocusEvents && e !== -1) {
                            b.children(c.childSelector).eq(e).trigger("focus")
                        }
                    }
                    b.trigger("childrenUpdated")
                })
            },
            updateChild: function (b, c, e, f) {
                var g, h = this,
                    i = a(b),
                    j = i.data("roundabout"),
                    k = [],
                    l = d.degToRad.apply(null, [360 - j.degrees + c.bearing]);
                f = f || function () {};
                l = d.normalizeRad.apply(null, [l]);
                g = c.shape(l, c.focusBearingRadian, c.tilt);
                g.scale = g.scale > 1 ? 1 : g.scale;
                g.adjustedScale = (c.scale.min + c.scale.diff * g.scale).toFixed(4);
                g.width = (g.adjustedScale * j.startWidth).toFixed(4);
                g.height = (g.adjustedScale * j.startHeight).toFixed(4);
                i.css({
                    left: (g.x * c.midStage.width + c.nudge.width - g.width / 2).toFixed(0) + "px",
                    top: (g.y * c.midStage.height + c.nudge.height - g.height / 2).toFixed(0) + "px",
                    width: g.width + "px",
                    height: g.height + "px",
                    opacity: (c.opacity.min + c.opacity.diff * g.scale).toFixed(2),
                    zIndex: Math.round(c.zValues.min + c.zValues.diff * g.z),
                    fontSize: (g.adjustedScale * j.startFontSize).toFixed(1) + "px"
                });
                j.currentScale = g.adjustedScale;
                if (h.data("roundabout").debug) {
                    k.push('<div style="font-weight: normal; font-size: 10px; padding: 2px; width: ' + i.css("width") + '; background-color: #ffc;">');
                    k.push('<strong style="font-size: 12px; white-space: nowrap;">Child ' + e + "</strong><br />");
                    k.push("<strong>left:</strong> " + i.css("left") + "<br />");
                    k.push("<strong>top:</strong> " + i.css("top") + "<br />");
                    k.push("<strong>width:</strong> " + i.css("width") + "<br />");
                    k.push("<strong>opacity:</strong> " + i.css("opacity") + "<br />");
                    k.push("<strong>height:</strong> " + i.css("height") + "<br />");
                    k.push("<strong>z-index:</strong> " + i.css("z-index") + "<br />");
                    k.push("<strong>font-size:</strong> " + i.css("font-size") + "<br />");
                    k.push("<strong>scale:</strong> " + i.data("roundabout").currentScale);
                    k.push("</div>");
                    i.html(k.join(""))
                }
                i.trigger("reposition");
                f.apply(h);
                return d.isInFocus.apply(h, [j.degrees])
            },
            setBearing: function (b, c) {
                c = c || function () {};
                b = d.normalize.apply(null, [b]);
                this.each(function () {
                    var c, e, f, g = a(this),
                        h = g.data("roundabout"),
                        i = h.bearing;
                    h.bearing = b;
                    g.trigger("bearingSet");
                    d.updateChildren.apply(g);
                    c = Math.abs(i - b);
                    if (!h.animating || c > 180) {
                        return
                    }
                    c = Math.abs(i - b);
                    g.children(h.childSelector).each(function (c) {
                        var e;
                        if (d.isChildBackDegreesBetween.apply(a(this), [b, i])) {
                            e = i > b ? "Clockwise" : "Counterclockwise";
                            a(this).trigger("move" + e + "ThroughBack")
                        }
                    })
                });
                c.apply(this);
                return this
            },
            adjustBearing: function (b, c) {
                c = c || function () {};
                if (b === 0) {
                    return this
                }
                this.each(function () {
                    d.setBearing.apply(a(this), [a(this).data("roundabout").bearing + b])
                });
                c.apply(this);
                return this
            },
            setTilt: function (b, c) {
                c = c || function () {};
                this.each(function () {
                    a(this).data("roundabout").tilt = b;
                    d.updateChildren.apply(a(this))
                });
                c.apply(this);
                return this
            },
            adjustTilt: function (b, c) {
                c = c || function () {};
                this.each(function () {
                    d.setTilt.apply(a(this), [a(this).data("roundabout").tilt + b])
                });
                c.apply(this);
                return this
            },
            animateToBearing: function (b, c, e, f, g) {
                var h = (new Date).getTime();
                g = g || function () {};
                if (a.isFunction(f)) {
                    g = f;
                    f = null
                } else if (a.isFunction(e)) {
                    g = e;
                    e = null
                } else if (a.isFunction(c)) {
                    g = c;
                    c = null
                }
                this.each(function () {
                    var i, j, k, l = a(this),
                        m = l.data("roundabout"),
                        n = !c ? m.duration : c,
                        o = e ? e : m.easing || "swing";
                    if (!f) {
                        f = {
                            timerStart: h,
                            start: m.bearing,
                            totalTime: n
                        }
                    }
                    i = h - f.timerStart;
                    if (m.stopAnimation) {
                        d.allowAnimation.apply(l);
                        m.animating = false;
                        return
                    }
                    if (i < n) {
                        if (!m.animating) {
                            l.trigger("animationStart")
                        }
                        m.animating = true;
                        if (typeof a.easing.def === "string") {
                            j = a.easing[o] || a.easing[a.easing.def];
                            k = j(null, i, f.start, b - f.start, f.totalTime)
                        } else {
                            k = a.easing[o](i / f.totalTime, i, f.start, b - f.start, f.totalTime)
                        } if (d.compareVersions.apply(null, [a().jquery, "1.7.2"]) >= 0 && !a.easing["easeOutBack"]) {
                            k = f.start + (b - f.start) * k
                        }
                        k = d.normalize.apply(null, [k]);
                        m.dragBearing = k;
                        d.setBearing.apply(l, [k,
                            function () {
                                setTimeout(function () {
                                    d.animateToBearing.apply(l, [b, n, o, f, g])
                                }, 0)
                            }
                        ])
                    } else {
                        m.lastAnimationStep = true;
                        b = d.normalize.apply(null, [b]);
                        d.setBearing.apply(l, [b,
                            function () {
                                l.trigger("animationEnd")
                            }
                        ]);
                        m.animating = false;
                        m.lastAnimationStep = false;
                        m.dragBearing = b;
                        g.apply(l)
                    }
                });
                return this
            },
            animateToNearbyChild: function (b, c) {
                var e = b[0],
                    f = b[1],
                    g = b[2] || function () {};
                if (a.isFunction(f)) {
                    g = f;
                    f = null
                } else if (a.isFunction(e)) {
                    g = e;
                    e = null
                }
                return this.each(function () {
                    var b, h, i = a(this),
                        j = i.data("roundabout"),
                        k = !j.reflect ? j.bearing % 360 : j.bearing,
                        l = i.children(j.childSelector).length;
                    if (!j.animating) {
                        if (j.reflect && c === "previous" || !j.reflect && c === "next") {
                            k = Math.abs(k) < j.floatComparisonThreshold ? 360 : k;
                            for (b = 0; b < l; b += 1) {
                                h = {
                                    lower: j.period * b,
                                    upper: j.period * (b + 1)
                                };
                                h.upper = b === l - 1 ? 360 : h.upper;
                                if (k <= Math.ceil(h.upper) && k >= Math.floor(h.lower)) {
                                    if (l === 2 && k === 360) {
                                        d.animateToDelta.apply(i, [-180, e, f, g])
                                    } else {
                                        d.animateBearingToFocus.apply(i, [h.lower, e, f, g])
                                    }
                                    break
                                }
                            }
                        } else {
                            k = Math.abs(k) < j.floatComparisonThreshold || 360 - Math.abs(k) < j.floatComparisonThreshold ? 0 : k;
                            for (b = l - 1; b >= 0; b -= 1) {
                                h = {
                                    lower: j.period * b,
                                    upper: j.period * (b + 1)
                                };
                                h.upper = b === l - 1 ? 360 : h.upper;
                                if (k >= Math.floor(h.lower) && k < Math.ceil(h.upper)) {
                                    if (l === 2 && k === 360) {
                                        d.animateToDelta.apply(i, [180, e, f, g])
                                    } else {
                                        d.animateBearingToFocus.apply(i, [h.upper, e, f, g])
                                    }
                                    break
                                }
                            }
                        }
                    }
                })
            },
            animateToNearestChild: function (b, c, e) {
                e = e || function () {};
                if (a.isFunction(c)) {
                    e = c;
                    c = null
                } else if (a.isFunction(b)) {
                    e = b;
                    b = null
                }
                return this.each(function () {
                    var f = d.getNearestChild.apply(a(this));
                    d.animateToChild.apply(a(this), [f, b, c, e])
                })
            },
            animateToChild: function (b, c, e, f) {
                f = f || function () {};
                if (a.isFunction(e)) {
                    f = e;
                    e = null
                } else if (a.isFunction(c)) {
                    f = c;
                    c = null
                }
                return this.each(function () {
                    var g, h = a(this),
                        i = h.data("roundabout");
                    if (i.childInFocus !== b && !i.animating) {
                        g = h.children(i.childSelector).eq(b);
                        d.animateBearingToFocus.apply(h, [g.data("roundabout").degrees, c, e, f])
                    }
                })
            },
            animateToNextChild: function (a, b, c) {
                return d.animateToNearbyChild.apply(this, [arguments, "next"])
            },
            animateToPreviousChild: function (a, b, c) {
                return d.animateToNearbyChild.apply(this, [arguments, "previous"])
            },
            animateToDelta: function (b, c, e, f) {
                f = f || function () {};
                if (a.isFunction(e)) {
                    f = e;
                    e = null
                } else if (a.isFunction(c)) {
                    f = c;
                    c = null
                }
                return this.each(function () {
                    var g = a(this).data("roundabout").bearing + b;
                    d.animateToBearing.apply(a(this), [g, c, e, f])
                })
            },
            animateBearingToFocus: function (b, c, e, f) {
                f = f || function () {};
                if (a.isFunction(e)) {
                    f = e;
                    e = null
                } else if (a.isFunction(c)) {
                    f = c;
                    c = null
                }
                return this.each(function () {
                    var g = a(this).data("roundabout").bearing - b;
                    g = Math.abs(360 - g) < Math.abs(g) ? 360 - g : -g;
                    g = g > 180 ? -(360 - g) : g;
                    if (g !== 0) {
                        d.animateToDelta.apply(a(this), [g, c, e, f])
                    }
                })
            },
            stopAnimation: function () {
                return this.each(function () {
                    a(this).data("roundabout").stopAnimation = true
                })
            },
            allowAnimation: function () {
                return this.each(function () {
                    a(this).data("roundabout").stopAnimation = false
                })
            },
            startAutoplay: function (b) {
                return this.each(function () {
                    var c = a(this),
                        e = c.data("roundabout");
                    b = b || e.autoplayCallback || function () {};
                    clearInterval(e.autoplayInterval);
                    e.autoplayInterval = setInterval(function () {
                        d.animateToNextChild.apply(c, [b])
                    }, e.autoplayDuration);
                    e.autoplayIsRunning = true;
                    c.trigger("autoplayStart")
                })
            },
            stopAutoplay: function (b) {
                return this.each(function () {
                    clearInterval(a(this).data("roundabout").autoplayInterval);
                    a(this).data("roundabout").autoplayInterval = null;
                    a(this).data("roundabout").autoplayIsRunning = false;
                    if (!b) {
                        a(this).unbind(".autoplay")
                    }
                    a(this).trigger("autoplayStop")
                })
            },
            toggleAutoplay: function (b) {
                return this.each(function () {
                    var c = a(this),
                        e = c.data("roundabout");
                    b = b || e.autoplayCallback || function () {};
                    if (!d.isAutoplaying.apply(a(this))) {
                        d.startAutoplay.apply(a(this), [b])
                    } else {
                        d.stopAutoplay.apply(a(this), [b])
                    }
                })
            },
            isAutoplaying: function () {
                return this.data("roundabout").autoplayIsRunning
            },
            changeAutoplayDuration: function (b) {
                return this.each(function () {
                    var c = a(this),
                        e = c.data("roundabout");
                    e.autoplayDuration = b;
                    if (d.isAutoplaying.apply(c)) {
                        d.stopAutoplay.apply(c);
                        setTimeout(function () {
                            d.startAutoplay.apply(c)
                        }, 10)
                    }
                })
            },
            normalize: function (a) {
                var b = a % 360;
                return b < 0 ? 360 + b : b
            },
            normalizeRad: function (a) {
                while (a < 0) {
                    a += Math.PI * 2
                }
                while (a > Math.PI * 2) {
                    a -= Math.PI * 2
                }
                return a
            },
            isChildBackDegreesBetween: function (b, c) {
                var d = a(this).data("roundabout").backDegrees;
                if (b > c) {
                    return d >= c && d < b
                } else {
                    return d < c && d >= b
                }
            },
            getAnimateToMethod: function (a) {
                a = a.toLowerCase();
                if (a === "next") {
                    return "animateToNextChild"
                } else if (a === "previous") {
                    return "animateToPreviousChild"
                }
                return "animateToNearestChild"
            },
            relayoutChildren: function () {
                return this.each(function () {
                    var b = a(this),
                        c = a.extend({}, b.data("roundabout"));
                    c.startingChild = b.data("roundabout").childInFocus;
                    d.init.apply(b, [c, null, true])
                })
            },
            getNearestChild: function () {
                var b = a(this),
                    c = b.data("roundabout"),
                    d = b.children(c.childSelector).length;
                if (!c.reflect) {
                    return (d - Math.round(c.bearing / c.period) % d) % d
                } else {
                    return Math.round(c.bearing / c.period) % d
                }
            },
            degToRad: function (a) {
                return d.normalize.apply(null, [a]) * Math.PI / 180
            },
            getPlacement: function (a) {
                var b = this.data("roundabout");
                return !b.reflect ? 360 - b.period * a : b.period * a
            },
            isInFocus: function (a) {
                var b, c = this,
                    e = c.data("roundabout"),
                    f = d.normalize.apply(null, [e.bearing]);
                a = d.normalize.apply(null, [a]);
                b = Math.abs(f - a);
                return b <= e.floatComparisonThreshold || b >= 360 - e.floatComparisonThreshold
            },
            getChildInFocus: function () {
                var b = a(this).data("roundabout");
                return b.childInFocus > -1 ? b.childInFocus : false
            },
            compareVersions: function (a, b) {
                var c, d = a.split(/\./i),
                    e = b.split(/\./i),
                    f = d.length > e.length ? d.length : e.length;
                for (c = 0; c <= f; c++) {
                    if (d[c] && !e[c] && parseInt(d[c], 10) !== 0) {
                        return 1
                    } else if (e[c] && !d[c] && parseInt(e[c], 10) !== 0) {
                        return -1
                    } else if (d[c] === e[c]) {
                        continue
                    }
                    if (d[c] && e[c]) {
                        if (parseInt(d[c], 10) > parseInt(e[c], 10)) {
                            return 1
                        } else {
                            return -1
                        }
                    }
                }
                return 0
            }
        };
        a.fn.roundabout = function (b) {
            if (d[b]) {
                return d[b].apply(this, Array.prototype.slice.call(arguments, 1))
            } else if (typeof b === "object" || a.isFunction(b) || !b) {
                return d.init.apply(this, arguments)
            } else {
                a.error("Method " + b + " does not exist for jQuery.roundabout.")
            }
        }
    })(jQuery)

    /**
     * jQuery Roundabout Shapes v2
     * http://fredhq.com/projects/roundabout-shapes/
     *
     * Provides additional paths along which items can move for the
     * jQuery Roundabout plugin (v2.0+).
     *
     * Terms of Use // jQuery Roundabout Shapes
     *
     * Open source under the BSD license
     *
     * Copyright (c) 2009-2011, Fred LeBlanc
     * All rights reserved.
     *
     * Redistribution and use in source and binary forms, with or without
     * modification, are permitted provided that the following conditions are met:
     *
     *   - Redistributions of source code must retain the above copyright
     *     notice, this list of conditions and the following disclaimer.
     *   - Redistributions in binary form must reproduce the above
     *     copyright notice, this list of conditions and the following
     *     disclaimer in the documentation and/or other materials provided
     *     with the distribution.
     *   - Neither the name of the author nor the names of its contributors
     *     may be used to endorse or promote products derived from this
     *     software without specific prior written permission.
     *
     * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
     * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
     * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
     * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
     * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
     * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
     * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
     * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
     * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
     * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
     * POSSIBILITY OF SUCH DAMAGE.
     */
    jQuery.extend(jQuery.roundaboutShapes, {
        theJuggler: function (a, b, c) {
            return {
                x: Math.sin(a + b),
                y: Math.tan(Math.exp(Math.log(a)) + b) / (c - 1),
                z: (Math.cos(a + b) + 1) / 2,
                scale: Math.sin(a + Math.PI / 2 + b) / 2 + .5
            }
        },
        figure8: function (a, b, c) {
            return {
                x: Math.sin(a * 2 + b),
                y: Math.sin(a + Math.PI / 2 + b) / 8 * c,
                z: (Math.cos(a + b) + 1) / 2,
                scale: Math.sin(a + Math.PI / 2 + b) / 2 + .5
            }
        },
        waterWheel: function (a, b, c) {
            return {
                x: Math.sin(a + Math.PI / 2 + b) / 8 * c,
                y: Math.sin(a + b) / (Math.PI / 2),
                z: (Math.cos(a + b) + 1) / 2,
                scale: Math.sin(a + Math.PI / 2 + b) / 2 + .5
            }
        },
        square: function (a, b, c) {
            var d, e, f;
            if (a <= Math.PI / 2) {
                d = 2 / Math.PI * a;
                e = -(2 / Math.PI) * a + 1;
                f = -(1 / Math.PI) * a + 1
            } else if (a > Math.PI / 2 && a <= Math.PI) {
                d = -(2 / Math.PI) * a + 2;
                e = -(2 / Math.PI) * a + 1;
                f = -(1 / Math.PI) * a + 1
            } else if (a > Math.PI && a <= 3 * Math.PI / 2) {
                d = -(2 / Math.PI) * a + 2;
                e = 2 / Math.PI * a - 3;
                f = 1 / Math.PI * a - 1
            } else {
                d = 2 / Math.PI * a - 4;
                e = 2 / Math.PI * a - 3;
                f = 1 / Math.PI * a - 1
            }
            return {
                x: d,
                y: e * c,
                z: f,
                scale: f
            }
        },
        conveyorBeltLeft: function (a, b, c) {
            return {
                x: -Math.cos(a + b),
                y: Math.cos(a + 3 * Math.PI / 2 + b) / 8 * c,
                z: (Math.sin(a + b) + 1) / 2,
                scale: Math.sin(a + Math.PI / 2 + b) / 2 + .5
            }
        },
        conveyorBeltRight: function (a, b, c) {
            return {
                x: Math.cos(a + b),
                y: Math.cos(a + 3 * Math.PI / 2 + b) / 8 * c,
                z: (Math.sin(a + b) + 1) / 2,
                scale: Math.sin(a + Math.PI / 2 + b) / 2 + .5
            }
        },
        goodbyeCruelWorld: function (a, b, c) {
            return {
                x: Math.sin(a + b),
                y: Math.tan(a + 3 * Math.PI / 2 + b) / 8 * (c + .5),
                z: (Math.sin(a + b) + 1) / 2,
                scale: Math.sin(a + Math.PI / 2 + b) / 2 + .5
            }
        },
        diagonalRingLeft: function (a, b, c) {
            return {
                x: Math.sin(a + b),
                y: -Math.cos(a + Math.tan(Math.cos(b))) / (c + 1.5),
                z: (Math.cos(a + b) + 1) / 2,
                scale: Math.sin(a + Math.PI / 2 + b) / 2 + .5
            }
        },
        diagonalRingRight: function (a, b, c) {
            return {
                x: Math.sin(a + b),
                y: Math.cos(a + Math.tan(Math.cos(b))) / (c + 1.5),
                z: (Math.cos(a + b) + 1) / 2,
                scale: Math.sin(a + Math.PI / 2 + b) / 2 + .5
            }
        },
        rollerCoaster: function (a, b, c) {
            return {
                x: Math.sin(a + b),
                y: Math.sin((2 + c) * a),
                z: (Math.cos(a + b) + 1) / 2,
                scale: Math.sin(a + Math.PI / 2 + b) / 2 + .5
            }
        },
        tearDrop: function (a, b, c) {
            return {
                x: Math.sin(a + b),
                y: -Math.sin(a / 2 + c) + .35,
                z: (Math.cos(a + b) + 1) / 2,
                scale: Math.sin(a + Math.PI / 2 + b) / 2 + .5
            }
        },
        tickingClock: function (a, b, c) {
            return {
                x: Math.cos(a + b - Math.PI / 2),
                y: Math.sin(a + b - Math.PI / 2),
                z: Math.cos(a),
                scale: Math.cos(a) + .5
            }
        },
        flurry: function (a, b, c) {
            return {
                x: Math.sin(a * 3 + b),
                y: Math.cos(a + Math.PI / 2 + b) / 2 * c,
                z: (Math.cos(a + b) + 1) / 2,
                scale: Math.sin(a + Math.PI / 2 + b) / 2 + .5
            }
        },
        nowSlide: function (a, b, c) {
            return {
                x: Math.tan(a * 2 + b) * .5,
                y: Math.cos(a * 2 + c) / 6,
                z: (Math.cos(a + b) + 1) / 2,
                scale: Math.sin(a + Math.PI / 2 + b) / 2 + .5
            }
        },
        risingEssence: function (a, b, c) {
            return {
                x: Math.sin(a + b),
                y: Math.tan((2 + c) * a),
                z: (Math.cos(a + b) + 1) / 2,
                scale: Math.sin(a + Math.PI / 2 + b) / 2 + .5
            }
        }
    });


    /*! Copyright (c) 2011 Brandon Aaron (http://brandonaaron.net)
     * Licensed under the MIT License (LICENSE.txt).
     *
     * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
     * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
     * Thanks to: Seamus Leahy for adding deltaX and deltaY
     *
     * Version: 3.0.6
     *
     * Requires: 1.2.2+
     */

    (function ($) {

        var types = ['DOMMouseScroll', 'mousewheel'];

        if ($.event.fixHooks) {
            for (var i = types.length; i;) {
                $.event.fixHooks[types[--i]] = $.event.mouseHooks;
            }
        }

        $.event.special.mousewheel = {
            setup: function () {
                if (this.addEventListener) {
                    for (var i = types.length; i;) {
                        this.addEventListener(types[--i], handler, false);
                    }
                } else {
                    this.onmousewheel = handler;
                }
            },

            teardown: function () {
                if (this.removeEventListener) {
                    for (var i = types.length; i;) {
                        this.removeEventListener(types[--i], handler, false);
                    }
                } else {
                    this.onmousewheel = null;
                }
            }
        };

        $.fn.extend({
            mousewheel: function (fn) {
                return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel");
            },

            unmousewheel: function (fn) {
                return this.unbind("mousewheel", fn);
            }
        });


        function handler(event) {
            var orgEvent = event || window.event,
                args = [].slice.call(arguments, 1),
                delta = 0,
                returnValue = true,
                deltaX = 0,
                deltaY = 0;
            event = $.event.fix(orgEvent);
            event.type = "mousewheel";

            // Old school scrollwheel delta
            if (orgEvent.wheelDelta) {
                delta = orgEvent.wheelDelta / 120;
            }
            if (orgEvent.detail) {
                delta = -orgEvent.detail / 3;
            }

            // New school multidimensional scroll (touchpads) deltas
            deltaY = delta;

            // Gecko
            if (orgEvent.axis !== undefined && orgEvent.axis === orgEvent.HORIZONTAL_AXIS) {
                deltaY = 0;
                deltaX = -1 * delta;
            }

            // Webkit
            if (orgEvent.wheelDeltaY !== undefined) {
                deltaY = orgEvent.wheelDeltaY / 120;
            }
            if (orgEvent.wheelDeltaX !== undefined) {
                deltaX = -1 * orgEvent.wheelDeltaX / 120;
            }

            // Add event and delta to the front of the arguments
            args.unshift(event, delta, deltaX, deltaY);

            return ($.event.dispatch || $.event.handle).apply(this, args);
        }

    })(jQuery);

    /**
     * @author trixta
     * @version 1.2
     */
    (function ($) {

        var mwheelI = {
                pos: [-260, -260]
            },
            minDif = 3,
            doc = document,
            root = doc.documentElement,
            body = doc.body,
            longDelay, shortDelay;

        function unsetPos() {
            if (this === mwheelI.elem) {
                mwheelI.pos = [-260, -260];
                mwheelI.elem = false;
                minDif = 3;
            }
        }

        $.event.special.mwheelIntent = {
            setup: function () {
                var jElm = $(this).bind('mousewheel', $.event.special.mwheelIntent.handler);
                if (this !== doc && this !== root && this !== body) {
                    jElm.bind('mouseleave', unsetPos);
                }
                jElm = null;
                return true;
            },
            teardown: function () {
                $(this)
                    .unbind('mousewheel', $.event.special.mwheelIntent.handler)
                    .unbind('mouseleave', unsetPos);
                return true;
            },
            handler: function (e, d) {
                var pos = [e.clientX, e.clientY];
                if (this === mwheelI.elem || Math.abs(mwheelI.pos[0] - pos[0]) > minDif || Math.abs(mwheelI.pos[1] - pos[1]) > minDif) {
                    mwheelI.elem = this;
                    mwheelI.pos = pos;
                    minDif = 250;

                    clearTimeout(shortDelay);
                    shortDelay = setTimeout(function () {
                        minDif = 10;
                    }, 200);
                    clearTimeout(longDelay);
                    longDelay = setTimeout(function () {
                        minDif = 3;
                    }, 1500);
                    e = $.extend({}, e, {
                        type: 'mwheelIntent'
                    });
                    return $.event.handle.apply(this, arguments);
                }
            }
        };
        $.fn.extend({
            mwheelIntent: function (fn) {
                return fn ? this.bind("mwheelIntent", fn) : this.trigger("mwheelIntent");
            },

            unmwheelIntent: function (fn) {
                return this.unbind("mwheelIntent", fn);
            }
        });

        $(function () {
            body = doc.body;
            //assume that document is always scrollable, doesn't hurt if not
            $(doc).bind('mwheelIntent.mwheelIntentDefault', $.noop);
        });
    })(jQuery);

    /*
     * jScrollPane - v2.0.0beta12 - 2012-09-27
     * http://jscrollpane.kelvinluck.com/
     *
     * Copyright (c) 2010 Kelvin Luck
     * Dual licensed under the MIT or GPL licenses.
     */
    (function (b, a, c) {
        b.fn.jScrollPane = function (e) {
            function d(D, O) {
                var ay, Q = this,
                    Y, aj, v, al, T, Z, y, q, az, aE, au, i, I, h, j, aa, U, ap, X, t, A, aq, af, am, G, l, at, ax, x, av, aH, f, L, ai = true,
                    P = true,
                    aG = false,
                    k = false,
                    ao = D.clone(false, false).empty(),
                    ac = b.fn.mwheelIntent ? "mwheelIntent.jsp" : "mousewheel.jsp";
                aH = D.css("paddingTop") + " " + D.css("paddingRight") + " " + D.css("paddingBottom") + " " + D.css("paddingLeft");
                f = (parseInt(D.css("paddingLeft"), 10) || 0) + (parseInt(D.css("paddingRight"), 10) || 0);

                function ar(aQ) {
                    var aL, aN, aM, aJ, aI, aP, aO = false,
                        aK = false;
                    ay = aQ;
                    if (Y === c) {
                        aI = D.scrollTop();
                        aP = D.scrollLeft();
                        D.css({
                            overflow: "hidden",
                            padding: 0
                        });
                        aj = D.innerWidth() + f;
                        v = D.innerHeight();
                        D.width(aj);
                        Y = b('<div class="jspPane" />').css("padding", aH).append(D.children());
                        al = b('<div class="jspContainer" />').css({
                            width: aj + "px",
                            height: v + "px"
                        }).append(Y).appendTo(D)
                    } else {
                        D.css("width", "");
                        aO = ay.stickToBottom && K();
                        aK = ay.stickToRight && B();
                        aJ = D.innerWidth() + f != aj || D.outerHeight() != v;
                        if (aJ) {
                            aj = D.innerWidth() + f;
                            v = D.innerHeight();
                            al.css({
                                width: aj + "px",
                                height: v + "px"
                            })
                        }
                        if (!aJ && L == T && Y.outerHeight() == Z) {
                            D.width(aj);
                            return
                        }
                        L = T;
                        Y.css("width", "");
                        D.width(aj);
                        al.find(">.jspVerticalBar,>.jspHorizontalBar").remove().end()
                    }
                    Y.css("overflow", "auto");
                    if (aQ.contentWidth) {
                        T = aQ.contentWidth
                    } else {
                        T = Y[0].scrollWidth
                    }
                    Z = Y[0].scrollHeight;
                    Y.css("overflow", "");
                    y = T / aj;
                    q = Z / v;
                    az = q > 1;
                    aE = y > 1;
                    if (!(aE || az)) {
                        D.removeClass("jspScrollable");
                        Y.css({
                            top: 0,
                            width: al.width() - f
                        });
                        n();
                        E();
                        R();
                        w()
                    } else {
                        D.addClass("jspScrollable");
                        aL = ay.maintainPosition && (I || aa);
                        if (aL) {
                            aN = aC();
                            aM = aA()
                        }
                        aF();
                        z();
                        F();
                        if (aL) {
                            N(aK ? (T - aj) : aN, false);
                            M(aO ? (Z - v) : aM, false)
                        }
                        J();
                        ag();
                        an();
                        if (ay.enableKeyboardNavigation) {
                            S()
                        }
                        if (ay.clickOnTrack) {
                            p()
                        }
                        C();
                        if (ay.hijackInternalLinks) {
                            m()
                        }
                    } if (ay.autoReinitialise && !av) {
                        av = setInterval(function () {
                            ar(ay)
                        }, ay.autoReinitialiseDelay)
                    } else {
                        if (!ay.autoReinitialise && av) {
                            clearInterval(av)
                        }
                    }
                    aI && D.scrollTop(0) && M(aI, false);
                    aP && D.scrollLeft(0) && N(aP, false);
                    D.trigger("jsp-initialised", [aE || az])
                }

                function aF() {
                    if (az) {
                        al.append(b('<div class="jspVerticalBar" />').append(b('<div class="jspCap jspCapTop" />'), b('<div class="jspTrack" />').append(b('<div class="jspDrag" />').append(b('<div class="jspDragTop" />'), b('<div class="jspDragBottom" />'))), b('<div class="jspCap jspCapBottom" />')));
                        U = al.find(">.jspVerticalBar");
                        ap = U.find(">.jspTrack");
                        au = ap.find(">.jspDrag");
                        if (ay.showArrows) {
                            aq = b('<a class="jspArrow jspArrowUp" />').bind("mousedown.jsp", aD(0, -1)).bind("click.jsp", aB);
                            af = b('<a class="jspArrow jspArrowDown" />').bind("mousedown.jsp", aD(0, 1)).bind("click.jsp", aB);
                            if (ay.arrowScrollOnHover) {
                                aq.bind("mouseover.jsp", aD(0, -1, aq));
                                af.bind("mouseover.jsp", aD(0, 1, af))
                            }
                            ak(ap, ay.verticalArrowPositions, aq, af)
                        }
                        t = v;
                        al.find(">.jspVerticalBar>.jspCap:visible,>.jspVerticalBar>.jspArrow").each(function () {
                            t -= b(this).outerHeight()
                        });
                        au.hover(function () {
                            au.addClass("jspHover")
                        }, function () {
                            au.removeClass("jspHover")
                        }).bind("mousedown.jsp", function (aI) {
                            b("html").bind("dragstart.jsp selectstart.jsp", aB);
                            au.addClass("jspActive");
                            var s = aI.pageY - au.position().top;
                            b("html").bind("mousemove.jsp", function (aJ) {
                                V(aJ.pageY - s, false)
                            }).bind("mouseup.jsp mouseleave.jsp", aw);
                            return false
                        });
                        o()
                    }
                }

                function o() {
                    ap.height(t + "px");
                    I = 0;
                    X = ay.verticalGutter + ap.outerWidth();
                    Y.width(aj - X - f);
                    try {
                        if (U.position().left === 0) {
                            Y.css("margin-left", X + "px")
                        }
                    } catch (s) {}
                }

                function z() {
                    if (aE) {
                        al.append(b('<div class="jspHorizontalBar" />').append(b('<div class="jspCap jspCapLeft" />'), b('<div class="jspTrack" />').append(b('<div class="jspDrag" />').append(b('<div class="jspDragLeft" />'), b('<div class="jspDragRight" />'))), b('<div class="jspCap jspCapRight" />')));
                        am = al.find(">.jspHorizontalBar");
                        G = am.find(">.jspTrack");
                        h = G.find(">.jspDrag");
                        if (ay.showArrows) {
                            ax = b('<a class="jspArrow jspArrowLeft" />').bind("mousedown.jsp", aD(-1, 0)).bind("click.jsp", aB);
                            x = b('<a class="jspArrow jspArrowRight" />').bind("mousedown.jsp", aD(1, 0)).bind("click.jsp", aB);
                            if (ay.arrowScrollOnHover) {
                                ax.bind("mouseover.jsp", aD(-1, 0, ax));
                                x.bind("mouseover.jsp", aD(1, 0, x))
                            }
                            ak(G, ay.horizontalArrowPositions, ax, x)
                        }
                        h.hover(function () {
                            h.addClass("jspHover")
                        }, function () {
                            h.removeClass("jspHover")
                        }).bind("mousedown.jsp", function (aI) {
                            b("html").bind("dragstart.jsp selectstart.jsp", aB);
                            h.addClass("jspActive");
                            var s = aI.pageX - h.position().left;
                            b("html").bind("mousemove.jsp", function (aJ) {
                                W(aJ.pageX - s, false)
                            }).bind("mouseup.jsp mouseleave.jsp", aw);
                            return false
                        });
                        l = al.innerWidth();
                        ah()
                    }
                }

                function ah() {
                    al.find(">.jspHorizontalBar>.jspCap:visible,>.jspHorizontalBar>.jspArrow").each(function () {
                        l -= b(this).outerWidth()
                    });
                    G.width(l + "px");
                    aa = 0
                }

                function F() {
                    if (aE && az) {
                        var aI = G.outerHeight(),
                            s = ap.outerWidth();
                        t -= aI;
                        b(am).find(">.jspCap:visible,>.jspArrow").each(function () {
                            l += b(this).outerWidth()
                        });
                        l -= s;
                        v -= s;
                        aj -= aI;
                        G.parent().append(b('<div class="jspCorner" />').css("width", aI + "px"));
                        o();
                        ah()
                    }
                    if (aE) {
                        Y.width((al.outerWidth() - f) + "px")
                    }
                    Z = Y.outerHeight();
                    q = Z / v;
                    if (aE) {
                        at = Math.ceil(1 / y * l);
                        if (at > ay.horizontalDragMaxWidth) {
                            at = ay.horizontalDragMaxWidth
                        } else {
                            if (at < ay.horizontalDragMinWidth) {
                                at = ay.horizontalDragMinWidth
                            }
                        }
                        h.width(at + "px");
                        j = l - at;
                        ae(aa)
                    }
                    if (az) {
                        A = Math.ceil(1 / q * t);
                        if (A > ay.verticalDragMaxHeight) {
                            A = ay.verticalDragMaxHeight
                        } else {
                            if (A < ay.verticalDragMinHeight) {
                                A = ay.verticalDragMinHeight
                            }
                        }
                        au.height(A + "px");
                        i = t - A;
                        ad(I)
                    }
                }

                function ak(aJ, aL, aI, s) {
                    var aN = "before",
                        aK = "after",
                        aM;
                    if (aL == "os") {
                        aL = /Mac/.test(navigator.platform) ? "after" : "split"
                    }
                    if (aL == aN) {
                        aK = aL
                    } else {
                        if (aL == aK) {
                            aN = aL;
                            aM = aI;
                            aI = s;
                            s = aM
                        }
                    }
                    aJ[aN](aI)[aK](s)
                }

                function aD(aI, s, aJ) {
                    return function () {
                        H(aI, s, this, aJ);
                        this.blur();
                        return false
                    }
                }

                function H(aL, aK, aO, aN) {
                    aO = b(aO).addClass("jspActive");
                    var aM, aJ, aI = true,
                        s = function () {
                            if (aL !== 0) {
                                Q.scrollByX(aL * ay.arrowButtonSpeed)
                            }
                            if (aK !== 0) {
                                Q.scrollByY(aK * ay.arrowButtonSpeed)
                            }
                            aJ = setTimeout(s, aI ? ay.initialDelay : ay.arrowRepeatFreq);
                            aI = false
                        };
                    s();
                    aM = aN ? "mouseout.jsp" : "mouseup.jsp";
                    aN = aN || b("html");
                    aN.bind(aM, function () {
                        aO.removeClass("jspActive");
                        aJ && clearTimeout(aJ);
                        aJ = null;
                        aN.unbind(aM)
                    })
                }

                function p() {
                    w();
                    if (az) {
                        ap.bind("mousedown.jsp", function (aN) {
                            if (aN.originalTarget === c || aN.originalTarget == aN.currentTarget) {
                                var aL = b(this),
                                    aO = aL.offset(),
                                    aM = aN.pageY - aO.top - I,
                                    aJ, aI = true,
                                    s = function () {
                                        var aR = aL.offset(),
                                            aS = aN.pageY - aR.top - A / 2,
                                            aP = v * ay.scrollPagePercent,
                                            aQ = i * aP / (Z - v);
                                        if (aM < 0) {
                                            if (I - aQ > aS) {
                                                Q.scrollByY(-aP)
                                            } else {
                                                V(aS)
                                            }
                                        } else {
                                            if (aM > 0) {
                                                if (I + aQ < aS) {
                                                    Q.scrollByY(aP)
                                                } else {
                                                    V(aS)
                                                }
                                            } else {
                                                aK();
                                                return
                                            }
                                        }
                                        aJ = setTimeout(s, aI ? ay.initialDelay : ay.trackClickRepeatFreq);
                                        aI = false
                                    },
                                    aK = function () {
                                        aJ && clearTimeout(aJ);
                                        aJ = null;
                                        b(document).unbind("mouseup.jsp", aK)
                                    };
                                s();
                                b(document).bind("mouseup.jsp", aK);
                                return false
                            }
                        })
                    }
                    if (aE) {
                        G.bind("mousedown.jsp", function (aN) {
                            if (aN.originalTarget === c || aN.originalTarget == aN.currentTarget) {
                                var aL = b(this),
                                    aO = aL.offset(),
                                    aM = aN.pageX - aO.left - aa,
                                    aJ, aI = true,
                                    s = function () {
                                        var aR = aL.offset(),
                                            aS = aN.pageX - aR.left - at / 2,
                                            aP = aj * ay.scrollPagePercent,
                                            aQ = j * aP / (T - aj);
                                        if (aM < 0) {
                                            if (aa - aQ > aS) {
                                                Q.scrollByX(-aP)
                                            } else {
                                                W(aS)
                                            }
                                        } else {
                                            if (aM > 0) {
                                                if (aa + aQ < aS) {
                                                    Q.scrollByX(aP)
                                                } else {
                                                    W(aS)
                                                }
                                            } else {
                                                aK();
                                                return
                                            }
                                        }
                                        aJ = setTimeout(s, aI ? ay.initialDelay : ay.trackClickRepeatFreq);
                                        aI = false
                                    },
                                    aK = function () {
                                        aJ && clearTimeout(aJ);
                                        aJ = null;
                                        b(document).unbind("mouseup.jsp", aK)
                                    };
                                s();
                                b(document).bind("mouseup.jsp", aK);
                                return false
                            }
                        })
                    }
                }

                function w() {
                    if (G) {
                        G.unbind("mousedown.jsp")
                    }
                    if (ap) {
                        ap.unbind("mousedown.jsp")
                    }
                }

                function aw() {
                    b("html").unbind("dragstart.jsp selectstart.jsp mousemove.jsp mouseup.jsp mouseleave.jsp");
                    if (au) {
                        au.removeClass("jspActive")
                    }
                    if (h) {
                        h.removeClass("jspActive")
                    }
                }

                function V(s, aI) {
                    if (!az) {
                        return
                    }
                    if (s < 0) {
                        s = 0
                    } else {
                        if (s > i) {
                            s = i
                        }
                    } if (aI === c) {
                        aI = ay.animateScroll
                    }
                    if (aI) {
                        Q.animate(au, "top", s, ad)
                    } else {
                        au.css("top", s);
                        ad(s)
                    }
                }

                function ad(aI) {
                    if (aI === c) {
                        aI = au.position().top
                    }
                    al.scrollTop(0);
                    I = aI;
                    var aL = I === 0,
                        aJ = I == i,
                        aK = aI / i,
                        s = -aK * (Z - v);
                    if (ai != aL || aG != aJ) {
                        ai = aL;
                        aG = aJ;
                        D.trigger("jsp-arrow-change", [ai, aG, P, k])
                    }
                    u(aL, aJ);
                    Y.css("top", s);
                    D.trigger("jsp-scroll-y", [-s, aL, aJ]).trigger("scroll")
                }

                function W(aI, s) {
                    if (!aE) {
                        return
                    }
                    if (aI < 0) {
                        aI = 0
                    } else {
                        if (aI > j) {
                            aI = j
                        }
                    } if (s === c) {
                        s = ay.animateScroll
                    }
                    if (s) {
                        Q.animate(h, "left", aI, ae)
                    } else {
                        h.css("left", aI);
                        ae(aI)
                    }
                }

                function ae(aI) {
                    if (aI === c) {
                        aI = h.position().left
                    }
                    al.scrollTop(0);
                    aa = aI;
                    var aL = aa === 0,
                        aK = aa == j,
                        aJ = aI / j,
                        s = -aJ * (T - aj);
                    if (P != aL || k != aK) {
                        P = aL;
                        k = aK;
                        D.trigger("jsp-arrow-change", [ai, aG, P, k])
                    }
                    r(aL, aK);
                    Y.css("left", s);
                    D.trigger("jsp-scroll-x", [-s, aL, aK]).trigger("scroll")
                }

                function u(aI, s) {
                    if (ay.showArrows) {
                        aq[aI ? "addClass" : "removeClass"]("jspDisabled");
                        af[s ? "addClass" : "removeClass"]("jspDisabled")
                    }
                }

                function r(aI, s) {
                    if (ay.showArrows) {
                        ax[aI ? "addClass" : "removeClass"]("jspDisabled");
                        x[s ? "addClass" : "removeClass"]("jspDisabled")
                    }
                }

                function M(s, aI) {
                    var aJ = s / (Z - v);
                    V(aJ * i, aI)
                }

                function N(aI, s) {
                    var aJ = aI / (T - aj);
                    W(aJ * j, s)
                }

                function ab(aV, aQ, aJ) {
                    var aN, aK, aL, s = 0,
                        aU = 0,
                        aI, aP, aO, aS, aR, aT;
                    try {
                        aN = b(aV)
                    } catch (aM) {
                        return
                    }
                    aK = aN.outerHeight();
                    aL = aN.outerWidth();
                    al.scrollTop(0);
                    al.scrollLeft(0);
                    while (!aN.is(".jspPane")) {
                        s += aN.position().top;
                        aU += aN.position().left;
                        aN = aN.offsetParent();
                        if (/^body|html$/i.test(aN[0].nodeName)) {
                            return
                        }
                    }
                    aI = aA();
                    aO = aI + v;
                    if (s < aI || aQ) {
                        aR = s - ay.verticalGutter
                    } else {
                        if (s + aK > aO) {
                            aR = s - v + aK + ay.verticalGutter
                        }
                    } if (aR) {
                        M(aR, aJ)
                    }
                    aP = aC();
                    aS = aP + aj;
                    if (aU < aP || aQ) {
                        aT = aU - ay.horizontalGutter
                    } else {
                        if (aU + aL > aS) {
                            aT = aU - aj + aL + ay.horizontalGutter
                        }
                    } if (aT) {
                        N(aT, aJ)
                    }
                }

                function aC() {
                    return -Y.position().left
                }

                function aA() {
                    return -Y.position().top
                }

                function K() {
                    var s = Z - v;
                    return (s > 20) && (s - aA() < 10)
                }

                function B() {
                    var s = T - aj;
                    return (s > 20) && (s - aC() < 10)
                }

                function ag() {
                    al.unbind(ac).bind(ac, function (aL, aM, aK, aI) {
                        var aJ = aa,
                            s = I;
                        Q.scrollBy(aK * ay.mouseWheelSpeed, -aI * ay.mouseWheelSpeed, false);
                        return aJ == aa && s == I
                    })
                }

                function n() {
                    al.unbind(ac)
                }

                function aB() {
                    return false
                }

                function J() {
                    Y.find(":input,a").unbind("focus.jsp").bind("focus.jsp", function (s) {
                        ab(s.target, false)
                    })
                }

                function E() {
                    Y.find(":input,a").unbind("focus.jsp")
                }

                function S() {
                    var s, aI, aK = [];
                    aE && aK.push(am[0]);
                    az && aK.push(U[0]);
                    Y.focus(function () {
                        D.focus()
                    });
                    D.attr("tabindex", 0).unbind("keydown.jsp keypress.jsp").bind("keydown.jsp", function (aN) {
                        if (aN.target !== this && !(aK.length && b(aN.target).closest(aK).length)) {
                            return
                        }
                        var aM = aa,
                            aL = I;
                        switch (aN.keyCode) {
                        case 40:
                        case 38:
                        case 34:
                        case 32:
                        case 33:
                        case 39:
                        case 37:
                            s = aN.keyCode;
                            aJ();
                            break;
                        case 35:
                            M(Z - v);
                            s = null;
                            break;
                        case 36:
                            M(0);
                            s = null;
                            break
                        }
                        aI = aN.keyCode == s && aM != aa || aL != I;
                        return !aI
                    }).bind("keypress.jsp", function (aL) {
                        if (aL.keyCode == s) {
                            aJ()
                        }
                        return !aI
                    });
                    if (ay.hideFocus) {
                        D.css("outline", "none");
                        if ("hideFocus" in al[0]) {
                            D.attr("hideFocus", true)
                        }
                    } else {
                        D.css("outline", "");
                        if ("hideFocus" in al[0]) {
                            D.attr("hideFocus", false)
                        }
                    }

                    function aJ() {
                        var aM = aa,
                            aL = I;
                        switch (s) {
                        case 40:
                            Q.scrollByY(ay.keyboardSpeed, false);
                            break;
                        case 38:
                            Q.scrollByY(-ay.keyboardSpeed, false);
                            break;
                        case 34:
                        case 32:
                            Q.scrollByY(v * ay.scrollPagePercent, false);
                            break;
                        case 33:
                            Q.scrollByY(-v * ay.scrollPagePercent, false);
                            break;
                        case 39:
                            Q.scrollByX(ay.keyboardSpeed, false);
                            break;
                        case 37:
                            Q.scrollByX(-ay.keyboardSpeed, false);
                            break
                        }
                        aI = aM != aa || aL != I;
                        return aI
                    }
                }

                function R() {
                    D.attr("tabindex", "-1").removeAttr("tabindex").unbind("keydown.jsp keypress.jsp")
                }

                function C() {
                    if (location.hash && location.hash.length > 1) {
                        var aK, aI, aJ = escape(location.hash.substr(1));
                        try {
                            aK = b("#" + aJ + ', a[name="' + aJ + '"]')
                        } catch (s) {
                            return
                        }
                        if (aK.length && Y.find(aJ)) {
                            if (al.scrollTop() === 0) {
                                aI = setInterval(function () {
                                    if (al.scrollTop() > 0) {
                                        ab(aK, true);
                                        b(document).scrollTop(al.position().top);
                                        clearInterval(aI)
                                    }
                                }, 50)
                            } else {
                                ab(aK, true);
                                b(document).scrollTop(al.position().top)
                            }
                        }
                    }
                }

                function m() {
                    if (b(document.body).data("jspHijack")) {
                        return
                    }
                    b(document.body).data("jspHijack", true);
                    b(document.body).delegate("a[href*=#]", "click", function (s) {
                        var aI = this.href.substr(0, this.href.indexOf("#")),
                            aK = location.href,
                            aO, aP, aJ, aM, aL, aN;
                        if (location.href.indexOf("#") !== -1) {
                            aK = location.href.substr(0, location.href.indexOf("#"))
                        }
                        if (aI !== aK) {
                            return
                        }
                        aO = escape(this.href.substr(this.href.indexOf("#") + 1));
                        aP;
                        try {
                            aP = b("#" + aO + ', a[name="' + aO + '"]')
                        } catch (aQ) {
                            return
                        }
                        if (!aP.length) {
                            return
                        }
                        aJ = aP.closest(".jspScrollable");
                        aM = aJ.data("jsp");
                        aM.scrollToElement(aP, true);
                        if (aJ[0].scrollIntoView) {
                            aL = b(a).scrollTop();
                            aN = aP.offset().top;
                            if (aN < aL || aN > aL + b(a).height()) {
                                aJ[0].scrollIntoView()
                            }
                        }
                        s.preventDefault()
                    })
                }

                function an() {
                    var aJ, aI, aL, aK, aM, s = false;
                    al.unbind("touchstart.jsp touchmove.jsp touchend.jsp click.jsp-touchclick").bind("touchstart.jsp", function (aN) {
                        var aO = aN.originalEvent.touches[0];
                        aJ = aC();
                        aI = aA();
                        aL = aO.pageX;
                        aK = aO.pageY;
                        aM = false;
                        s = true
                    }).bind("touchmove.jsp", function (aQ) {
                        if (!s) {
                            return
                        }
                        var aP = aQ.originalEvent.touches[0],
                            aO = aa,
                            aN = I;
                        Q.scrollTo(aJ + aL - aP.pageX, aI + aK - aP.pageY);
                        aM = aM || Math.abs(aL - aP.pageX) > 5 || Math.abs(aK - aP.pageY) > 5;
                        return aO == aa && aN == I
                    }).bind("touchend.jsp", function (aN) {
                        s = false
                    }).bind("click.jsp-touchclick", function (aN) {
                        if (aM) {
                            aM = false;
                            return false
                        }
                    })
                }

                function g() {
                    var s = aA(),
                        aI = aC();
                    D.removeClass("jspScrollable").unbind(".jsp");
                    D.replaceWith(ao.append(Y.children()));
                    ao.scrollTop(s);
                    ao.scrollLeft(aI);
                    if (av) {
                        clearInterval(av)
                    }
                }
                b.extend(Q, {
                    reinitialise: function (aI) {
                        aI = b.extend({}, ay, aI);
                        ar(aI)
                    },
                    scrollToElement: function (aJ, aI, s) {
                        ab(aJ, aI, s)
                    },
                    scrollTo: function (aJ, s, aI) {
                        N(aJ, aI);
                        M(s, aI)
                    },
                    scrollToX: function (aI, s) {
                        N(aI, s)
                    },
                    scrollToY: function (s, aI) {
                        M(s, aI)
                    },
                    scrollToPercentX: function (aI, s) {
                        N(aI * (T - aj), s)
                    },
                    scrollToPercentY: function (aI, s) {
                        M(aI * (Z - v), s)
                    },
                    scrollBy: function (aI, s, aJ) {
                        Q.scrollByX(aI, aJ);
                        Q.scrollByY(s, aJ)
                    },
                    scrollByX: function (s, aJ) {
                        var aI = aC() + Math[s < 0 ? "floor" : "ceil"](s),
                            aK = aI / (T - aj);
                        W(aK * j, aJ)
                    },
                    scrollByY: function (s, aJ) {
                        var aI = aA() + Math[s < 0 ? "floor" : "ceil"](s),
                            aK = aI / (Z - v);
                        V(aK * i, aJ)
                    },
                    positionDragX: function (s, aI) {
                        W(s, aI)
                    },
                    positionDragY: function (aI, s) {
                        V(aI, s)
                    },
                    animate: function (aI, aL, s, aK) {
                        var aJ = {};
                        aJ[aL] = s;
                        aI.animate(aJ, {
                            duration: ay.animateDuration,
                            easing: ay.animateEase,
                            queue: false,
                            step: aK
                        })
                    },
                    getContentPositionX: function () {
                        return aC()
                    },
                    getContentPositionY: function () {
                        return aA()
                    },
                    getContentWidth: function () {
                        return T
                    },
                    getContentHeight: function () {
                        return Z
                    },
                    getPercentScrolledX: function () {
                        return aC() / (T - aj)
                    },
                    getPercentScrolledY: function () {
                        return aA() / (Z - v)
                    },
                    getIsScrollableH: function () {
                        return aE
                    },
                    getIsScrollableV: function () {
                        return az
                    },
                    getContentPane: function () {
                        return Y
                    },
                    scrollToBottom: function (s) {
                        V(i, s)
                    },
                    hijackInternalLinks: b.noop,
                    destroy: function () {
                        g()
                    }
                });
                ar(O)
            }
            e = b.extend({}, b.fn.jScrollPane.defaults, e);
            b.each(["mouseWheelSpeed", "arrowButtonSpeed", "trackClickSpeed", "keyboardSpeed"], function () {
                e[this] = e[this] || e.speed
            });
            return this.each(function () {
                var f = b(this),
                    g = f.data("jsp");
                if (g) {
                    g.reinitialise(e)
                } else {
                    b("script", f).filter('[type="text/javascript"],:not([type])').remove();
                    g = new d(f, e);
                    f.data("jsp", g)
                }
            })
        };
        b.fn.jScrollPane.defaults = {
            showArrows: false,
            maintainPosition: true,
            stickToBottom: false,
            stickToRight: false,
            clickOnTrack: true,
            autoReinitialise: false,
            autoReinitialiseDelay: 500,
            verticalDragMinHeight: 0,
            verticalDragMaxHeight: 99999,
            horizontalDragMinWidth: 0,
            horizontalDragMaxWidth: 99999,
            contentWidth: c,
            animateScroll: false,
            animateDuration: 300,
            animateEase: "linear",
            hijackInternalLinks: false,
            verticalGutter: 4,
            horizontalGutter: 4,
            mouseWheelSpeed: 0,
            arrowButtonSpeed: 0,
            arrowRepeatFreq: 50,
            arrowScrollOnHover: false,
            trackClickSpeed: 0,
            trackClickRepeatFreq: 70,
            verticalArrowPositions: "split",
            horizontalArrowPositions: "split",
            enableKeyboardNavigation: true,
            hideFocus: false,
            keyboardSpeed: 0,
            initialDelay: 300,
            speed: 30,
            scrollPagePercent: 0.8
        }
    })(jQuery, this);

    /* jQuery SelectBox - https://github.com/claviska/jquery-selectBox */
    if (jQuery)(function ($) {
        $.extend($.fn, {
            selectBox: function (method, data) {
                var typeTimer, typeSearch = '',
                    isMac = navigator.platform.match(/mac/i);
                var init = function (select, data) {
                    var options;
                    if (navigator.userAgent.match(/iPad|iPhone|Android|IEMobile|BlackBerry/i)) return false;
                    if (select.tagName.toLowerCase() !== 'select') return false;
                    select = $(select);
                    if (select.data('selectBox-control')) return false;
                    var control = $('<a class="selectBox" />'),
                        inline = select.attr('multiple') || parseInt(select.attr('size')) > 1;
                    var settings = data || {};
                    control.width(select.outerWidth()).addClass(select.attr('class')).attr('title', select.attr('title') || '').attr('tabindex', parseInt(select.attr('tabindex'))).css('display', 'inline-block').bind('focus.selectBox', function () {
                        if (this !== document.activeElement && document.body !== document.activeElement) $(document.activeElement).blur();
                        if (control.hasClass('selectBox-active')) return;
                        control.addClass('selectBox-active');
                        select.trigger('focus')
                    }).bind('blur.selectBox', function () {
                        if (!control.hasClass('selectBox-active')) return;
                        control.removeClass('selectBox-active');
                        select.trigger('blur')
                    });
                    if (!$(window).data('selectBox-bindings')) {
                        $(window).data('selectBox-bindings', true).bind('scroll.selectBox', hideMenus).bind('resize.selectBox', hideMenus)
                    }
                    if (select.attr('disabled')) control.addClass('selectBox-disabled');
                    select.bind('click.selectBox', function (event) {
                        control.focus();
                        event.preventDefault()
                    });
                    if (inline) {
                        options = getOptions(select, 'inline');
                        control.append(options).data('selectBox-options', options).addClass('selectBox-inline selectBox-menuShowing').bind('keydown.selectBox', function (event) {
                            handleKeyDown(select, event)
                        }).bind('keypress.selectBox', function (event) {
                            handleKeyPress(select, event)
                        }).bind('mousedown.selectBox', function (event) {
                            if ($(event.target).is('A.selectBox-inline')) event.preventDefault();
                            if (!control.hasClass('selectBox-focus')) control.focus()
                        }).insertAfter(select);
                        if (!select[0].style.height) {
                            var size = select.attr('size') ? parseInt(select.attr('size')) : 5;
                            var tmp = control.clone().removeAttr('id').css({
                                position: 'absolute',
                                top: '-9999em'
                            }).show().appendTo('body');
                            tmp.find('.selectBox-options').html('<li><a>\u00A0</a></li>');
                            var optionHeight = parseInt(tmp.find('.selectBox-options A:first').html('&nbsp;').outerHeight());
                            tmp.remove();
                            control.height(optionHeight * size)
                        }
                        disableSelection(control)
                    } else {
                        var label = $('<span class="selectBox-label" />'),
                            arrow = $('<span class="selectBox-arrow" />');
                        label.attr('class', getLabelClass(select)).text(getLabelText(select));
                        options = getOptions(select, 'dropdown');
                        options.appendTo('BODY');
                        control.data('selectBox-options', options).addClass('selectBox-dropdown').append(label).append(arrow).bind('mousedown.selectBox', function (event) {
                            if (control.hasClass('selectBox-menuShowing')) {
                                hideMenus()
                            } else {
                                event.stopPropagation();
                                options.data('selectBox-down-at-x', event.screenX).data('selectBox-down-at-y', event.screenY);
                                showMenu(select)
                            }
                        }).bind('keydown.selectBox', function (event) {
                            handleKeyDown(select, event)
                        }).bind('keypress.selectBox', function (event) {
                            handleKeyPress(select, event)
                        }).bind('open.selectBox', function (event, triggerData) {
                            if (triggerData && triggerData._selectBox === true) return;
                            showMenu(select)
                        }).bind('close.selectBox', function (event, triggerData) {
                            if (triggerData && triggerData._selectBox === true) return;
                            hideMenus()
                        }).insertAfter(select);
                        var labelWidth = control.width() - arrow.outerWidth() - parseInt(label.css('paddingLeft')) - parseInt(label.css('paddingLeft'));
                        label.width(labelWidth);
                        disableSelection(control)
                    }
                    select.addClass('selectBox').data('selectBox-control', control).data('selectBox-settings', settings).hide()
                };
                var getOptions = function (select, type) {
                    var options;
                    var _getOptions = function (select, options) {
                        select.children('OPTION, OPTGROUP').each(function () {
                            if ($(this).is('OPTION')) {
                                if ($(this).length > 0) {
                                    generateOptions($(this), options)
                                } else {
                                    options.append('<li>\u00A0</li>')
                                }
                            } else {
                                var optgroup = $('<li class="selectBox-optgroup" />');
                                optgroup.text($(this).attr('label'));
                                options.append(optgroup);
                                options = _getOptions($(this), options)
                            }
                        });
                        return options
                    };
                    switch (type) {
                    case 'inline':
                        options = $('<ul class="selectBox-options" />');
                        options = _getOptions(select, options);
                        options.find('A').bind('mouseover.selectBox', function (event) {
                            addHover(select, $(this).parent())
                        }).bind('mouseout.selectBox', function (event) {
                            removeHover(select, $(this).parent())
                        }).bind('mousedown.selectBox', function (event) {
                            event.preventDefault();
                            if (!select.selectBox('control').hasClass('selectBox-active')) select.selectBox('control').focus()
                        }).bind('mouseup.selectBox', function (event) {
                            hideMenus();
                            selectOption(select, $(this).parent(), event)
                        });
                        disableSelection(options);
                        return options;
                    case 'dropdown':
                        options = $('<ul class="selectBox-dropdown-menu selectBox-options" />');
                        options = _getOptions(select, options);
                        options.data('selectBox-select', select).css('display', 'none').appendTo('BODY').find('A').bind('mousedown.selectBox', function (event) {
                            event.preventDefault();
                            if (event.screenX === options.data('selectBox-down-at-x') && event.screenY === options.data('selectBox-down-at-y')) {
                                options.removeData('selectBox-down-at-x').removeData('selectBox-down-at-y');
                                hideMenus()
                            }
                        }).bind('mouseup.selectBox', function (event) {
                            if (event.screenX === options.data('selectBox-down-at-x') && event.screenY === options.data('selectBox-down-at-y')) {
                                return
                            } else {
                                options.removeData('selectBox-down-at-x').removeData('selectBox-down-at-y')
                            }
                            selectOption(select, $(this).parent());
                            hideMenus()
                        }).bind('mouseover.selectBox', function (event) {
                            addHover(select, $(this).parent())
                        }).bind('mouseout.selectBox', function (event) {
                            removeHover(select, $(this).parent())
                        });
                        var classes = select.attr('class') || '';
                        if (classes !== '') {
                            classes = classes.split(' ');
                            for (var i in classes) options.addClass(classes[i] + '-selectBox-dropdown-menu')
                        }
                        disableSelection(options);
                        return options
                    }
                };
                var getLabelClass = function (select) {
                    var selected = $(select).find('OPTION:selected');
                    return ('selectBox-label ' + (selected.attr('class') || '')).replace(/\s+$/, '')
                };
                var getLabelText = function (select) {
                    var selected = $(select).find('OPTION:selected');
                    return selected.text() || '\u00A0'
                };
                var setLabel = function (select) {
                    select = $(select);
                    var control = select.data('selectBox-control');
                    if (!control) return;
                    control.find('.selectBox-label').attr('class', getLabelClass(select)).text(getLabelText(select))
                };
                var destroy = function (select) {
                    select = $(select);
                    var control = select.data('selectBox-control');
                    if (!control) return;
                    var options = control.data('selectBox-options');
                    options.remove();
                    control.remove();
                    select.removeClass('selectBox').removeData('selectBox-control').data('selectBox-control', null).removeData('selectBox-settings').data('selectBox-settings', null).show()
                };
                var refresh = function (select) {
                    select = $(select);
                    select.selectBox('options', select.html())
                };
                var showMenu = function (select) {
                    select = $(select);
                    var control = select.data('selectBox-control'),
                        settings = select.data('selectBox-settings'),
                        options = control.data('selectBox-options');
                    if (control.hasClass('selectBox-disabled')) return false;
                    hideMenus();
                    var borderBottomWidth = isNaN(control.css('borderBottomWidth')) ? 0 : parseInt(control.css('borderBottomWidth'));
                    options.width(control.innerWidth()).css({
                        top: control.offset().top + control.outerHeight() - borderBottomWidth,
                        left: control.offset().left
                    });
                    if (select.triggerHandler('beforeopen')) return false;
                    var dispatchOpenEvent = function () {
                        select.triggerHandler('open', {
                            _selectBox: true
                        })
                    };
                    switch (settings.menuTransition) {
                    case 'fade':
                        options.fadeIn(settings.menuSpeed, dispatchOpenEvent);
                        break;
                    case 'slide':
                        options.slideDown(settings.menuSpeed, dispatchOpenEvent);
                        break;
                    default:
                        options.show(settings.menuSpeed, dispatchOpenEvent);
                        break
                    }
                    if (!settings.menuSpeed) dispatchOpenEvent();
                    var li = options.find('.selectBox-selected:first');
                    keepOptionInView(select, li, true);
                    addHover(select, li);
                    control.addClass('selectBox-menuShowing');
                    $(document).bind('mousedown.selectBox', function (event) {
                        if ($(event.target).parents().andSelf().hasClass('selectBox-options')) return;
                        hideMenus()
                    })
                };
                var hideMenus = function () {
                    if ($(".selectBox-dropdown-menu:visible").length === 0) return;
                    $(document).unbind('mousedown.selectBox');
                    $(".selectBox-dropdown-menu").each(function () {
                        var options = $(this),
                            select = options.data('selectBox-select'),
                            control = select.data('selectBox-control'),
                            settings = select.data('selectBox-settings');
                        if (select.triggerHandler('beforeclose')) return false;
                        var dispatchCloseEvent = function () {
                            select.triggerHandler('close', {
                                _selectBox: true
                            })
                        };
                        if (settings) {
                            switch (settings.menuTransition) {
                            case 'fade':
                                options.fadeOut(settings.menuSpeed, dispatchCloseEvent);
                                break;
                            case 'slide':
                                options.slideUp(settings.menuSpeed, dispatchCloseEvent);
                                break;
                            default:
                                options.hide(settings.menuSpeed, dispatchCloseEvent);
                                break
                            }
                            if (!settings.menuSpeed) dispatchCloseEvent();
                            control.removeClass('selectBox-menuShowing')
                        } else {
                            $(this).hide();
                            $(this).triggerHandler('close', {
                                _selectBox: true
                            });
                            $(this).removeClass('selectBox-menuShowing')
                        }
                    })
                };
                var selectOption = function (select, li, event) {
                    select = $(select);
                    li = $(li);
                    var control = select.data('selectBox-control'),
                        settings = select.data('selectBox-settings');
                    if (control.hasClass('selectBox-disabled')) return false;
                    if (li.length === 0 || li.hasClass('selectBox-disabled')) return false;
                    if (select.attr('multiple')) {
                        if (event.shiftKey && control.data('selectBox-last-selected')) {
                            li.toggleClass('selectBox-selected');
                            var affectedOptions;
                            if (li.index() > control.data('selectBox-last-selected').index()) {
                                affectedOptions = li.siblings().slice(control.data('selectBox-last-selected').index(), li.index())
                            } else {
                                affectedOptions = li.siblings().slice(li.index(), control.data('selectBox-last-selected').index())
                            }
                            affectedOptions = affectedOptions.not('.selectBox-optgroup, .selectBox-disabled');
                            if (li.hasClass('selectBox-selected')) {
                                affectedOptions.addClass('selectBox-selected')
                            } else {
                                affectedOptions.removeClass('selectBox-selected')
                            }
                        } else if ((isMac && event.metaKey) || (!isMac && event.ctrlKey)) {
                            li.toggleClass('selectBox-selected')
                        } else {
                            li.siblings().removeClass('selectBox-selected');
                            li.addClass('selectBox-selected')
                        }
                    } else {
                        li.siblings().removeClass('selectBox-selected');
                        li.addClass('selectBox-selected')
                    } if (control.hasClass('selectBox-dropdown')) {
                        control.find('.selectBox-label').text(li.text())
                    }
                    var i = 0,
                        selection = [];
                    if (select.attr('multiple')) {
                        control.find('.selectBox-selected A').each(function () {
                            selection[i++] = $(this).attr('rel')
                        })
                    } else {
                        selection = li.find('A').attr('rel')
                    }
                    control.data('selectBox-last-selected', li);
                    if (select.val() !== selection) {
                        select.val(selection);
                        setLabel(select);
                        select.trigger('change')
                    }
                    return true
                };
                var addHover = function (select, li) {
                    select = $(select);
                    li = $(li);
                    var control = select.data('selectBox-control'),
                        options = control.data('selectBox-options');
                    options.find('.selectBox-hover').removeClass('selectBox-hover');
                    li.addClass('selectBox-hover')
                };
                var removeHover = function (select, li) {
                    select = $(select);
                    li = $(li);
                    var control = select.data('selectBox-control'),
                        options = control.data('selectBox-options');
                    options.find('.selectBox-hover').removeClass('selectBox-hover')
                };
                var keepOptionInView = function (select, li, center) {
                    if (!li || li.length === 0) return;
                    select = $(select);
                    var control = select.data('selectBox-control'),
                        options = control.data('selectBox-options'),
                        scrollBox = control.hasClass('selectBox-dropdown') ? options : options.parent(),
                        top = parseInt(li.offset().top - scrollBox.position().top),
                        bottom = parseInt(top + li.outerHeight());
                    if (center) {
                        scrollBox.scrollTop(li.offset().top - scrollBox.offset().top + scrollBox.scrollTop() - (scrollBox.height() / 2))
                    } else {
                        if (top < 0) {
                            scrollBox.scrollTop(li.offset().top - scrollBox.offset().top + scrollBox.scrollTop())
                        }
                        if (bottom > scrollBox.height()) {
                            scrollBox.scrollTop((li.offset().top + li.outerHeight()) - scrollBox.offset().top + scrollBox.scrollTop() - scrollBox.height())
                        }
                    }
                };
                var handleKeyDown = function (select, event) {
                    select = $(select);
                    var control = select.data('selectBox-control'),
                        options = control.data('selectBox-options'),
                        settings = select.data('selectBox-settings'),
                        totalOptions = 0,
                        i = 0;
                    if (control.hasClass('selectBox-disabled')) return;
                    switch (event.keyCode) {
                    case 8:
                        event.preventDefault();
                        typeSearch = '';
                        break;
                    case 9:
                    case 27:
                        hideMenus();
                        removeHover(select);
                        break;
                    case 13:
                        if (control.hasClass('selectBox-menuShowing')) {
                            selectOption(select, options.find('LI.selectBox-hover:first'), event);
                            if (control.hasClass('selectBox-dropdown')) hideMenus()
                        } else {
                            showMenu(select)
                        }
                        break;
                    case 38:
                    case 37:
                        event.preventDefault();
                        if (control.hasClass('selectBox-menuShowing')) {
                            var prev = options.find('.selectBox-hover').prev('LI');
                            totalOptions = options.find('LI:not(.selectBox-optgroup)').length;
                            i = 0;
                            while (prev.length === 0 || prev.hasClass('selectBox-disabled') || prev.hasClass('selectBox-optgroup')) {
                                prev = prev.prev('LI');
                                if (prev.length === 0) {
                                    if (settings.loopOptions) {
                                        prev = options.find('LI:last')
                                    } else {
                                        prev = options.find('LI:first')
                                    }
                                }
                                if (++i >= totalOptions) break
                            }
                            addHover(select, prev);
                            selectOption(select, prev, event);
                            keepOptionInView(select, prev)
                        } else {
                            showMenu(select)
                        }
                        break;
                    case 40:
                    case 39:
                        event.preventDefault();
                        if (control.hasClass('selectBox-menuShowing')) {
                            var next = options.find('.selectBox-hover').next('LI');
                            totalOptions = options.find('LI:not(.selectBox-optgroup)').length;
                            i = 0;
                            while (next.length === 0 || next.hasClass('selectBox-disabled') || next.hasClass('selectBox-optgroup')) {
                                next = next.next('LI');
                                if (next.length === 0) {
                                    if (settings.loopOptions) {
                                        next = options.find('LI:first')
                                    } else {
                                        next = options.find('LI:last')
                                    }
                                }
                                if (++i >= totalOptions) break
                            }
                            addHover(select, next);
                            selectOption(select, next, event);
                            keepOptionInView(select, next)
                        } else {
                            showMenu(select)
                        }
                        break
                    }
                };
                var handleKeyPress = function (select, event) {
                    select = $(select);
                    var control = select.data('selectBox-control'),
                        options = control.data('selectBox-options');
                    if (control.hasClass('selectBox-disabled')) return;
                    switch (event.keyCode) {
                    case 9:
                    case 27:
                    case 13:
                    case 38:
                    case 37:
                    case 40:
                    case 39:
                        break;
                    default:
                        if (!control.hasClass('selectBox-menuShowing')) showMenu(select);
                        event.preventDefault();
                        clearTimeout(typeTimer);
                        typeSearch += String.fromCharCode(event.charCode || event.keyCode);
                        options.find('A').each(function () {
                            if ($(this).text().substr(0, typeSearch.length).toLowerCase() === typeSearch.toLowerCase()) {
                                addHover(select, $(this).parent());
                                keepOptionInView(select, $(this).parent());
                                return false
                            }
                        });
                        typeTimer = setTimeout(function () {
                            typeSearch = ''
                        }, 1000);
                        break
                    }
                };
                var enable = function (select) {
                    select = $(select);
                    select.attr('disabled', false);
                    var control = select.data('selectBox-control');
                    if (!control) return;
                    control.removeClass('selectBox-disabled')
                };
                var disable = function (select) {
                    select = $(select);
                    select.attr('disabled', true);
                    var control = select.data('selectBox-control');
                    if (!control) return;
                    control.addClass('selectBox-disabled')
                };
                var setValue = function (select, value) {
                    select = $(select);
                    select.val(value);
                    value = select.val();
                    if (value === null) {
                        value = select.children().first().val();
                        select.val(value)
                    }
                    var control = select.data('selectBox-control');
                    if (!control) return;
                    var settings = select.data('selectBox-settings'),
                        options = control.data('selectBox-options');
                    setLabel(select);
                    options.find('.selectBox-selected').removeClass('selectBox-selected');
                    options.find('A').each(function () {
                        if (typeof (value) === 'object') {
                            for (var i = 0; i < value.length; i++) {
                                if ($(this).attr('rel') == value[i]) {
                                    $(this).parent().addClass('selectBox-selected')
                                }
                            }
                        } else {
                            if ($(this).attr('rel') == value) {
                                $(this).parent().addClass('selectBox-selected')
                            }
                        }
                    });
                    if (settings.change) settings.change.call(select)
                };
                var setOptions = function (select, options) {
                    select = $(select);
                    var control = select.data('selectBox-control'),
                        settings = select.data('selectBox-settings');
                    switch (typeof (data)) {
                    case 'string':
                        select.html(data);
                        break;
                    case 'object':
                        select.html('');
                        for (var i in data) {
                            if (data[i] === null) continue;
                            if (typeof (data[i]) === 'object') {
                                var optgroup = $('<optgroup label="' + i + '" />');
                                for (var j in data[i]) {
                                    optgroup.append('<option value="' + j + '">' + data[i][j] + '</option>')
                                }
                                select.append(optgroup)
                            } else {
                                var option = $('<option value="' + i + '">' + data[i] + '</option>');
                                select.append(option)
                            }
                        }
                        break
                    }
                    if (!control) return;
                    control.data('selectBox-options').remove();
                    var type = control.hasClass('selectBox-dropdown') ? 'dropdown' : 'inline';
                    options = getOptions(select, type);
                    control.data('selectBox-options', options);
                    switch (type) {
                    case 'inline':
                        control.append(options);
                        break;
                    case 'dropdown':
                        setLabel(select);
                        $("BODY").append(options);
                        break
                    }
                };
                var disableSelection = function (selector) {
                    $(selector).css('MozUserSelect', 'none').bind('selectstart', function (event) {
                        event.preventDefault()
                    })
                };
                var generateOptions = function (self, options) {
                    var li = $('<li />'),
                        a = $('<a />');
                    li.addClass(self.attr('class'));
                    li.data(self.data());
                    a.attr('rel', self.val()).text(self.text());
                    li.append(a);
                    if (self.attr('disabled')) li.addClass('selectBox-disabled');
                    if (self.attr('selected')) li.addClass('selectBox-selected');
                    options.append(li)
                };
                switch (method) {
                case 'control':
                    return $(this).data('selectBox-control');
                case 'settings':
                    if (!data) return $(this).data('selectBox-settings');
                    $(this).each(function () {
                        $(this).data('selectBox-settings', $.extend(true, $(this).data('selectBox-settings'), data))
                    });
                    break;
                case 'options':
                    if (data === undefined) return $(this).data('selectBox-control').data('selectBox-options');
                    $(this).each(function () {
                        setOptions(this, data)
                    });
                    break;
                case 'value':
                    if (data === undefined) return $(this).val();
                    $(this).each(function () {
                        setValue(this, data)
                    });
                    break;
                case 'refresh':
                    $(this).each(function () {
                        refresh(this)
                    });
                    break;
                case 'enable':
                    $(this).each(function () {
                        enable(this)
                    });
                    break;
                case 'disable':
                    $(this).each(function () {
                        disable(this)
                    });
                    break;
                case 'destroy':
                    $(this).each(function () {
                        destroy(this)
                    });
                    break;
                default:
                    $(this).each(function () {
                        init(this, method)
                    });
                    break
                }
                return $(this)
            }
        })
    })(jQuery);

    /*! jQuery Validation Plugin - v1.10.0 - 9/7/2012
     * https://github.com/jzaefferer/jquery-validation
     * Copyright (c) 2012 Jörn Zaefferer; Licensed MIT, GPL */
    (function (a) {
        a.extend(a.fn, {
            validate: function (b) {
                if (!this.length) {
                    b && b.debug && window.console && console.warn("nothing selected, can't validate, returning nothing");
                    return
                }
                var c = a.data(this[0], "validator");
                return c ? c : (this.attr("novalidate", "novalidate"), c = new a.validator(b, this[0]), a.data(this[0], "validator", c), c.settings.onsubmit && (this.validateDelegate(":submit", "click", function (b) {
                    c.settings.submitHandler && (c.submitButton = b.target), a(b.target).hasClass("cancel") && (c.cancelSubmit = !0)
                }), this.submit(function (b) {
                    function d() {
                        var d;
                        return c.settings.submitHandler ? (c.submitButton && (d = a("<input type='hidden'/>").attr("name", c.submitButton.name).val(c.submitButton.value).appendTo(c.currentForm)), c.settings.submitHandler.call(c, c.currentForm, b), c.submitButton && d.remove(), !1) : !0
                    }
                    return c.settings.debug && b.preventDefault(), c.cancelSubmit ? (c.cancelSubmit = !1, d()) : c.form() ? c.pendingRequest ? (c.formSubmitted = !0, !1) : d() : (c.focusInvalid(), !1)
                })), c)
            },
            valid: function () {
                if (a(this[0]).is("form")) return this.validate().form();
                var b = !0,
                    c = a(this[0].form).validate();
                return this.each(function () {
                    b &= c.element(this)
                }), b
            },
            removeAttrs: function (b) {
                var c = {},
                    d = this;
                return a.each(b.split(/\s/), function (a, b) {
                    c[b] = d.attr(b), d.removeAttr(b)
                }), c
            },
            rules: function (b, c) {
                var d = this[0];
                if (b) {
                    var e = a.data(d.form, "validator").settings,
                        f = e.rules,
                        g = a.validator.staticRules(d);
                    switch (b) {
                    case "add":
                        a.extend(g, a.validator.normalizeRule(c)), f[d.name] = g, c.messages && (e.messages[d.name] = a.extend(e.messages[d.name], c.messages));
                        break;
                    case "remove":
                        if (!c) return delete f[d.name], g;
                        var h = {};
                        return a.each(c.split(/\s/), function (a, b) {
                            h[b] = g[b], delete g[b]
                        }), h
                    }
                }
                var i = a.validator.normalizeRules(a.extend({}, a.validator.metadataRules(d), a.validator.classRules(d), a.validator.attributeRules(d), a.validator.staticRules(d)), d);
                if (i.required) {
                    var j = i.required;
                    delete i.required, i = a.extend({
                        required: j
                    }, i)
                }
                return i
            }
        }), a.extend(a.expr[":"], {
            blank: function (b) {
                return !a.trim("" + b.value)
            },
            filled: function (b) {
                return !!a.trim("" + b.value)
            },
            unchecked: function (a) {
                return !a.checked
            }
        }), a.validator = function (b, c) {
            this.settings = a.extend(!0, {}, a.validator.defaults, b), this.currentForm = c, this.init()
        }, a.validator.format = function (b, c) {
            return arguments.length === 1 ? function () {
                var c = a.makeArray(arguments);
                return c.unshift(b), a.validator.format.apply(this, c)
            } : (arguments.length > 2 && c.constructor !== Array && (c = a.makeArray(arguments).slice(1)), c.constructor !== Array && (c = [c]), a.each(c, function (a, c) {
                b = b.replace(new RegExp("\\{" + a + "\\}", "g"), c)
            }), b)
        }, a.extend(a.validator, {
            defaults: {
                messages: {},
                groups: {},
                rules: {},
                errorClass: "error",
                validClass: "valid",
                errorElement: "label",
                focusInvalid: !0,
                errorContainer: a([]),
                errorLabelContainer: a([]),
                onsubmit: !0,
                ignore: ":hidden",
                ignoreTitle: !1,
                onfocusin: function (a, b) {
                    this.lastActive = a, this.settings.focusCleanup && !this.blockFocusCleanup && (this.settings.unhighlight && this.settings.unhighlight.call(this, a, this.settings.errorClass, this.settings.validClass), this.addWrapper(this.errorsFor(a)).hide())
                },
                onfocusout: function (a, b) {
                    !this.checkable(a) && (a.name in this.submitted || !this.optional(a)) && this.element(a)
                },
                onkeyup: function (a, b) {
                    if (b.which === 9 && this.elementValue(a) === "") return;
                    (a.name in this.submitted || a === this.lastActive) && this.element(a)
                },
                onclick: function (a, b) {
                    a.name in this.submitted ? this.element(a) : a.parentNode.name in this.submitted && this.element(a.parentNode)
                },
                highlight: function (b, c, d) {
                    b.type === "radio" ? this.findByName(b.name).addClass(c).removeClass(d) : a(b).addClass(c).removeClass(d)
                },
                unhighlight: function (b, c, d) {
                    b.type === "radio" ? this.findByName(b.name).removeClass(c).addClass(d) : a(b).removeClass(c).addClass(d)
                }
            },
            setDefaults: function (b) {
                a.extend(a.validator.defaults, b)
            },
            messages: {
                required: "This field is required.",
                remote: "Please fix this field.",
                email: "Please enter a valid email address.",
                url: "Please enter a valid URL.",
                date: "Please enter a valid date.",
                dateISO: "Please enter a valid date (ISO).",
                number: "Please enter a valid number.",
                digits: "Please enter only digits.",
                creditcard: "Please enter a valid credit card number.",
                equalTo: "Please enter the same value again.",
                maxlength: a.validator.format("Please enter no more than {0} characters."),
                minlength: a.validator.format("Please enter at least {0} characters."),
                rangelength: a.validator.format("Please enter a value between {0} and {1} characters long."),
                range: a.validator.format("Please enter a value between {0} and {1}."),
                max: a.validator.format("Please enter a value less than or equal to {0}."),
                min: a.validator.format("Please enter a value greater than or equal to {0}.")
            },
            autoCreateRanges: !1,
            prototype: {
                init: function () {
                    function d(b) {
                        var c = a.data(this[0].form, "validator"),
                            d = "on" + b.type.replace(/^validate/, "");
                        c.settings[d] && c.settings[d].call(c, this[0], b)
                    }
                    this.labelContainer = a(this.settings.errorLabelContainer), this.errorContext = this.labelContainer.length && this.labelContainer || a(this.currentForm), this.containers = a(this.settings.errorContainer).add(this.settings.errorLabelContainer), this.submitted = {}, this.valueCache = {}, this.pendingRequest = 0, this.pending = {}, this.invalid = {}, this.reset();
                    var b = this.groups = {};
                    a.each(this.settings.groups, function (c, d) {
                        a.each(d.split(/\s/), function (a, d) {
                            b[d] = c
                        })
                    });
                    var c = this.settings.rules;
                    a.each(c, function (b, d) {
                        c[b] = a.validator.normalizeRule(d)
                    }), a(this.currentForm).validateDelegate(":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'] ", "focusin focusout keyup", d).validateDelegate("[type='radio'], [type='checkbox'], select, option", "click", d), this.settings.invalidHandler && a(this.currentForm).bind("invalid-form.validate", this.settings.invalidHandler)
                },
                form: function () {
                    return this.checkForm(), a.extend(this.submitted, this.errorMap), this.invalid = a.extend({}, this.errorMap), this.valid() || a(this.currentForm).triggerHandler("invalid-form", [this]), this.showErrors(), this.valid()
                },
                checkForm: function () {
                    this.prepareForm();
                    for (var a = 0, b = this.currentElements = this.elements(); b[a]; a++) this.check(b[a]);
                    return this.valid()
                },
                element: function (b) {
                    b = this.validationTargetFor(this.clean(b)), this.lastElement = b, this.prepareElement(b), this.currentElements = a(b);
                    var c = this.check(b) !== !1;
                    return c ? delete this.invalid[b.name] : this.invalid[b.name] = !0, this.numberOfInvalids() || (this.toHide = this.toHide.add(this.containers)), this.showErrors(), c
                },
                showErrors: function (b) {
                    if (b) {
                        a.extend(this.errorMap, b), this.errorList = [];
                        for (var c in b) this.errorList.push({
                            message: b[c],
                            element: this.findByName(c)[0]
                        });
                        this.successList = a.grep(this.successList, function (a) {
                            return !(a.name in b)
                        })
                    }
                    this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors()
                },
                resetForm: function () {
                    a.fn.resetForm && a(this.currentForm).resetForm(), this.submitted = {}, this.lastElement = null, this.prepareForm(), this.hideErrors(), this.elements().removeClass(this.settings.errorClass).removeData("previousValue")
                },
                numberOfInvalids: function () {
                    return this.objectLength(this.invalid)
                },
                objectLength: function (a) {
                    var b = 0;
                    for (var c in a) b++;
                    return b
                },
                hideErrors: function () {
                    this.addWrapper(this.toHide).hide()
                },
                valid: function () {
                    return this.size() === 0
                },
                size: function () {
                    return this.errorList.length
                },
                focusInvalid: function () {
                    if (this.settings.focusInvalid) try {
                        a(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin")
                    } catch (b) {}
                },
                findLastActive: function () {
                    var b = this.lastActive;
                    return b && a.grep(this.errorList, function (a) {
                        return a.element.name === b.name
                    }).length === 1 && b
                },
                elements: function () {
                    var b = this,
                        c = {};
                    return a(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function () {
                        return !this.name && b.settings.debug && window.console && console.error("%o has no name assigned", this), this.name in c || !b.objectLength(a(this).rules()) ? !1 : (c[this.name] = !0, !0)
                    })
                },
                clean: function (b) {
                    return a(b)[0]
                },
                errors: function () {
                    var b = this.settings.errorClass.replace(" ", ".");
                    return a(this.settings.errorElement + "." + b, this.errorContext)
                },
                reset: function () {
                    this.successList = [], this.errorList = [], this.errorMap = {}, this.toShow = a([]), this.toHide = a([]), this.currentElements = a([])
                },
                prepareForm: function () {
                    this.reset(), this.toHide = this.errors().add(this.containers)
                },
                prepareElement: function (a) {
                    this.reset(), this.toHide = this.errorsFor(a)
                },
                elementValue: function (b) {
                    var c = a(b).attr("type"),
                        d = a(b).val();
                    return c === "radio" || c === "checkbox" ? a('input[name="' + a(b).attr("name") + '"]:checked').val() : typeof d == "string" ? d.replace(/\r/g, "") : d
                },
                check: function (b) {
                    b = this.validationTargetFor(this.clean(b));
                    var c = a(b).rules(),
                        d = !1,
                        e = this.elementValue(b),
                        f;
                    for (var g in c) {
                        var h = {
                            method: g,
                            parameters: c[g]
                        };
                        try {
                            f = a.validator.methods[g].call(this, e, b, h.parameters);
                            if (f === "dependency-mismatch") {
                                d = !0;
                                continue
                            }
                            d = !1;
                            if (f === "pending") {
                                this.toHide = this.toHide.not(this.errorsFor(b));
                                return
                            }
                            if (!f) return this.formatAndAdd(b, h), !1
                        } catch (i) {
                            throw this.settings.debug && window.console && console.log("exception occured when checking element " + b.id + ", check the '" + h.method + "' method", i), i
                        }
                    }
                    if (d) return;
                    return this.objectLength(c) && this.successList.push(b), !0
                },
                customMetaMessage: function (b, c) {
                    if (!a.metadata) return;
                    var d = this.settings.meta ? a(b).metadata()[this.settings.meta] : a(b).metadata();
                    return d && d.messages && d.messages[c]
                },
                customDataMessage: function (b, c) {
                    return a(b).data("msg-" + c.toLowerCase()) || b.attributes && a(b).attr("data-msg-" + c.toLowerCase())
                },
                customMessage: function (a, b) {
                    var c = this.settings.messages[a];
                    return c && (c.constructor === String ? c : c[b])
                },
                findDefined: function () {
                    for (var a = 0; a < arguments.length; a++)
                        if (arguments[a] !== undefined) return arguments[a];
                    return undefined
                },
                defaultMessage: function (b, c) {
                    return this.findDefined(this.customMessage(b.name, c), this.customDataMessage(b, c), this.customMetaMessage(b, c), !this.settings.ignoreTitle && b.title || undefined, a.validator.messages[c], "<strong>Warning: No message defined for " + b.name + "</strong>")
                },
                formatAndAdd: function (b, c) {
                    var d = this.defaultMessage(b, c.method),
                        e = /\$?\{(\d+)\}/g;
                    typeof d == "function" ? d = d.call(this, c.parameters, b) : e.test(d) && (d = a.validator.format(d.replace(e, "{$1}"), c.parameters)), this.errorList.push({
                        message: d,
                        element: b
                    }), this.errorMap[b.name] = d, this.submitted[b.name] = d
                },
                addWrapper: function (a) {
                    return this.settings.wrapper && (a = a.add(a.parent(this.settings.wrapper))), a
                },
                defaultShowErrors: function () {
                    var a, b;
                    for (a = 0; this.errorList[a]; a++) {
                        var c = this.errorList[a];
                        this.settings.highlight && this.settings.highlight.call(this, c.element, this.settings.errorClass, this.settings.validClass), this.showLabel(c.element, c.message)
                    }
                    this.errorList.length && (this.toShow = this.toShow.add(this.containers));
                    if (this.settings.success)
                        for (a = 0; this.successList[a]; a++) this.showLabel(this.successList[a]);
                    if (this.settings.unhighlight)
                        for (a = 0, b = this.validElements(); b[a]; a++) this.settings.unhighlight.call(this, b[a], this.settings.errorClass, this.settings.validClass);
                    this.toHide = this.toHide.not(this.toShow), this.hideErrors(), this.addWrapper(this.toShow).show()
                },
                validElements: function () {
                    return this.currentElements.not(this.invalidElements())
                },
                invalidElements: function () {
                    return a(this.errorList).map(function () {
                        return this.element
                    })
                },
                showLabel: function (b, c) {
                    var d = this.errorsFor(b);
                    d.length ? (d.removeClass(this.settings.validClass).addClass(this.settings.errorClass), d.attr("generated") && d.html(c)) : (d = a("<" + this.settings.errorElement + "/>").attr({
                        "for": this.idOrName(b),
                        generated: !0
                    }).addClass(this.settings.errorClass).html(c || ""), this.settings.wrapper && (d = d.hide().show().wrap("<" + this.settings.wrapper + "/>").parent()), this.labelContainer.append(d).length || (this.settings.errorPlacement ? this.settings.errorPlacement(d, a(b)) : d.insertAfter(b))), !c && this.settings.success && (d.text(""), typeof this.settings.success == "string" ? d.addClass(this.settings.success) : this.settings.success(d, b)), this.toShow = this.toShow.add(d)
                },
                errorsFor: function (b) {
                    var c = this.idOrName(b);
                    return this.errors().filter(function () {
                        return a(this).attr("for") === c
                    })
                },
                idOrName: function (a) {
                    return this.groups[a.name] || (this.checkable(a) ? a.name : a.id || a.name)
                },
                validationTargetFor: function (a) {
                    return this.checkable(a) && (a = this.findByName(a.name).not(this.settings.ignore)[0]), a
                },
                checkable: function (a) {
                    return /radio|checkbox/i.test(a.type)
                },
                findByName: function (b) {
                    return a(this.currentForm).find('[name="' + b + '"]')
                },
                getLength: function (b, c) {
                    switch (c.nodeName.toLowerCase()) {
                    case "select":
                        return a("option:selected", c).length;
                    case "input":
                        if (this.checkable(c)) return this.findByName(c.name).filter(":checked").length
                    }
                    return b.length
                },
                depend: function (a, b) {
                    return this.dependTypes[typeof a] ? this.dependTypes[typeof a](a, b) : !0
                },
                dependTypes: {
                    "boolean": function (a, b) {
                        return a
                    },
                    string: function (b, c) {
                        return !!a(b, c.form).length
                    },
                    "function": function (a, b) {
                        return a(b)
                    }
                },
                optional: function (b) {
                    var c = this.elementValue(b);
                    return !a.validator.methods.required.call(this, c, b) && "dependency-mismatch"
                },
                startRequest: function (a) {
                    this.pending[a.name] || (this.pendingRequest++, this.pending[a.name] = !0)
                },
                stopRequest: function (b, c) {
                    this.pendingRequest--, this.pendingRequest < 0 && (this.pendingRequest = 0), delete this.pending[b.name], c && this.pendingRequest === 0 && this.formSubmitted && this.form() ? (a(this.currentForm).submit(), this.formSubmitted = !1) : !c && this.pendingRequest === 0 && this.formSubmitted && (a(this.currentForm).triggerHandler("invalid-form", [this]), this.formSubmitted = !1)
                },
                previousValue: function (b) {
                    return a.data(b, "previousValue") || a.data(b, "previousValue", {
                        old: null,
                        valid: !0,
                        message: this.defaultMessage(b, "remote")
                    })
                }
            },
            classRuleSettings: {
                required: {
                    required: !0
                },
                email: {
                    email: !0
                },
                url: {
                    url: !0
                },
                date: {
                    date: !0
                },
                dateISO: {
                    dateISO: !0
                },
                number: {
                    number: !0
                },
                digits: {
                    digits: !0
                },
                creditcard: {
                    creditcard: !0
                }
            },
            addClassRules: function (b, c) {
                b.constructor === String ? this.classRuleSettings[b] = c : a.extend(this.classRuleSettings, b)
            },
            classRules: function (b) {
                var c = {},
                    d = a(b).attr("class");
                return d && a.each(d.split(" "), function () {
                    this in a.validator.classRuleSettings && a.extend(c, a.validator.classRuleSettings[this])
                }), c
            },
            attributeRules: function (b) {
                var c = {},
                    d = a(b);
                for (var e in a.validator.methods) {
                    var f;
                    e === "required" ? (f = d.get(0).getAttribute(e), f === "" && (f = !0), f = !!f) : f = d.attr(e), f ? c[e] = f : d[0].getAttribute("type") === e && (c[e] = !0)
                }
                return c.maxlength && /-1|2147483647|524288/.test(c.maxlength) && delete c.maxlength, c
            },
            metadataRules: function (b) {
                if (!a.metadata) return {};
                var c = a.data(b.form, "validator").settings.meta;
                return c ? a(b).metadata()[c] : a(b).metadata()
            },
            staticRules: function (b) {
                var c = {},
                    d = a.data(b.form, "validator");
                return d.settings.rules && (c = a.validator.normalizeRule(d.settings.rules[b.name]) || {}), c
            },
            normalizeRules: function (b, c) {
                return a.each(b, function (d, e) {
                    if (e === !1) {
                        delete b[d];
                        return
                    }
                    if (e.param || e.depends) {
                        var f = !0;
                        switch (typeof e.depends) {
                        case "string":
                            f = !!a(e.depends, c.form).length;
                            break;
                        case "function":
                            f = e.depends.call(c, c)
                        }
                        f ? b[d] = e.param !== undefined ? e.param : !0 : delete b[d]
                    }
                }), a.each(b, function (d, e) {
                    b[d] = a.isFunction(e) ? e(c) : e
                }), a.each(["minlength", "maxlength", "min", "max"], function () {
                    b[this] && (b[this] = Number(b[this]))
                }), a.each(["rangelength", "range"], function () {
                    b[this] && (b[this] = [Number(b[this][0]), Number(b[this][1])])
                }), a.validator.autoCreateRanges && (b.min && b.max && (b.range = [b.min, b.max], delete b.min, delete b.max), b.minlength && b.maxlength && (b.rangelength = [b.minlength, b.maxlength], delete b.minlength, delete b.maxlength)), b.messages && delete b.messages, b
            },
            normalizeRule: function (b) {
                if (typeof b == "string") {
                    var c = {};
                    a.each(b.split(/\s/), function () {
                        c[this] = !0
                    }), b = c
                }
                return b
            },
            addMethod: function (b, c, d) {
                a.validator.methods[b] = c, a.validator.messages[b] = d !== undefined ? d : a.validator.messages[b], c.length < 3 && a.validator.addClassRules(b, a.validator.normalizeRule(b))
            },
            methods: {
                required: function (b, c, d) {
                    if (!this.depend(d, c)) return "dependency-mismatch";
                    if (c.nodeName.toLowerCase() === "select") {
                        var e = a(c).val();
                        return e && e.length > 0
                    }
                    return this.checkable(c) ? this.getLength(b, c) > 0 : a.trim(b).length > 0
                },
                remote: function (b, c, d) {
                    if (this.optional(c)) return "dependency-mismatch";
                    var e = this.previousValue(c);
                    this.settings.messages[c.name] || (this.settings.messages[c.name] = {}), e.originalMessage = this.settings.messages[c.name].remote, this.settings.messages[c.name].remote = e.message, d = typeof d == "string" && {
                        url: d
                    } || d;
                    if (this.pending[c.name]) return "pending";
                    if (e.old === b) return e.valid;
                    e.old = b;
                    var f = this;
                    this.startRequest(c);
                    var g = {};
                    return g[c.name] = b, a.ajax(a.extend(!0, {
                        url: d,
                        mode: "abort",
                        port: "validate" + c.name,
                        dataType: "json",
                        data: g,
                        success: function (d) {
                            f.settings.messages[c.name].remote = e.originalMessage;
                            var g = d === !0 || d === "true";
                            if (g) {
                                var h = f.formSubmitted;
                                f.prepareElement(c), f.formSubmitted = h, f.successList.push(c), delete f.invalid[c.name], f.showErrors()
                            } else {
                                var i = {},
                                    j = d || f.defaultMessage(c, "remote");
                                i[c.name] = e.message = a.isFunction(j) ? j(b) : j, f.invalid[c.name] = !0, f.showErrors(i)
                            }
                            e.valid = g, f.stopRequest(c, g)
                        }
                    }, d)), "pending"
                },
                minlength: function (b, c, d) {
                    var e = a.isArray(b) ? b.length : this.getLength(a.trim(b), c);
                    return this.optional(c) || e >= d
                },
                maxlength: function (b, c, d) {
                    var e = a.isArray(b) ? b.length : this.getLength(a.trim(b), c);
                    return this.optional(c) || e <= d
                },
                rangelength: function (b, c, d) {
                    var e = a.isArray(b) ? b.length : this.getLength(a.trim(b), c);
                    return this.optional(c) || e >= d[0] && e <= d[1]
                },
                min: function (a, b, c) {
                    return this.optional(b) || a >= c
                },
                max: function (a, b, c) {
                    return this.optional(b) || a <= c
                },
                range: function (a, b, c) {
                    return this.optional(b) || a >= c[0] && a <= c[1]
                },
                email: function (a, b) {
                    return this.optional(b) || /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(a)
                },
                url: function (a, b) {
                    return this.optional(b) || /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(a)
                },
                date: function (a, b) {
                    return this.optional(b) || !/Invalid|NaN/.test(new Date(a))
                },
                dateISO: function (a, b) {
                    return this.optional(b) || /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test(a)
                },
                number: function (a, b) {
                    return this.optional(b) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(a)
                },
                digits: function (a, b) {
                    return this.optional(b) || /^\d+$/.test(a)
                },
                creditcard: function (a, b) {
                    if (this.optional(b)) return "dependency-mismatch";
                    if (/[^0-9 \-]+/.test(a)) return !1;
                    var c = 0,
                        d = 0,
                        e = !1;
                    a = a.replace(/\D/g, "");
                    for (var f = a.length - 1; f >= 0; f--) {
                        var g = a.charAt(f);
                        d = parseInt(g, 10), e && (d *= 2) > 9 && (d -= 9), c += d, e = !e
                    }
                    return c % 10 === 0
                },
                equalTo: function (b, c, d) {
                    var e = a(d);
                    return this.settings.onfocusout && e.unbind(".validate-equalTo").bind("blur.validate-equalTo", function () {
                        a(c).valid()
                    }), b === e.val()
                }
            }
        }), a.format = a.validator.format
    })(jQuery),
    function (a) {
        var b = {};
        if (a.ajaxPrefilter) a.ajaxPrefilter(function (a, c, d) {
            var e = a.port;
            a.mode === "abort" && (b[e] && b[e].abort(), b[e] = d)
        });
        else {
            var c = a.ajax;
            a.ajax = function (d) {
                var e = ("mode" in d ? d : a.ajaxSettings).mode,
                    f = ("port" in d ? d : a.ajaxSettings).port;
                return e === "abort" ? (b[f] && b[f].abort(), b[f] = c.apply(this, arguments)) : c.apply(this, arguments)
            }
        }
    }(jQuery),
    function (a) {
        !jQuery.event.special.focusin && !jQuery.event.special.focusout && document.addEventListener && a.each({
            focus: "focusin",
            blur: "focusout"
        }, function (b, c) {
            function d(b) {
                return b = a.event.fix(b), b.type = c, a.event.handle.call(this, b)
            }
            a.event.special[c] = {
                setup: function () {
                    this.addEventListener(b, d, !0)
                },
                teardown: function () {
                    this.removeEventListener(b, d, !0)
                },
                handler: function (b) {
                    var d = arguments;
                    return d[0] = a.event.fix(b), d[0].type = c, a.event.handle.apply(this, d)
                }
            }
        }), a.extend(a.fn, {
            validateDelegate: function (b, c, d) {
                return this.bind(c, function (c) {
                    var e = a(c.target);
                    if (e.is(b)) return d.apply(e, arguments)
                })
            }
        })
    }(jQuery)

    // wizardData holds the all the content that was called up by an AJAX call to the web service
    var wizardData;

    // contains user choices / solution sets. Commented out is boilerplate of how the object is structured. 
    var MyRecOffice = {

        "Organization": {
            uid: "guid" /* , Type : {Name : ""}*/
        },
        "CurSolutionSet": {
            /*
                     "FunctionalNeed" : {uid : "guid"},
                     "BusinessNeed" : {uid : "guid"},
                     "Product" : [{uid : "guid"}, {uid : "guid"}, {uid : "guid"}]
                */
        }, // For Front End Use

        "SolutionSets": [
            /*{
                     "FunctionalNeed" : {uid : "guid"},
                     "BusinessNeed" : {uid : "guid"},
                      "Product" : [{uid : "guid"}, {uid : "guid"}, {uid : "guid"}]
                },
                {
                     "FunctionalNeed" : {uid : "guid"},
                     "BusinessNeed" : {uid : "guid"},
                      "Product" : [{uid : "guid"}, {uid : "guid"}, {uid : "guid"}]
                }*/
        ],
        "Contact": {
            "First": "",
            "Last": "",
            "Email": "",
            "Phone": "",
            "Company Name": "",
            "Company Type": "",
            "Role": "",
            "Number of Employees": "",
            "State": "",
            "Comment": "",
            "Newsletter": ""
        }


    }

    function stripDataForPost(MyRecOffice) {
        var newRecOffice = {};

        return newRecOffie;
    }

    var RecOfficeConfig = {
        scrollableApi: {},
        solutionTabApi: {},
        paneReady: {
            "Home": false,
            "BusinessNeed": false,
            "FunctionalNeed": false,
            "SolutionSet": false,
            "EmailShare": false,
            "MyRecOffice": false,
            "ViewProducts": false,
            "ContactVertafore": false
        },
        // this happens before the pane is shown
        buildAndSeekPane: {
            "Home": function () {
                var organizations = {
                    orgList: []
                };
                var agencies = {
                    alist: [],
                    description: wizardData.d.AgencyDescription
                };
                var agencylist = [];
                var organizationList = [];

                $.each(wizardData.d.orgList, function (index, value) {
                    if (value.IsAgency) {
                        agencylist.push(value);
                    } else {
                        organizationList.push(value);
                    }
                });

                agencies.alist = agencylist;
                organizations.orgList = organizationList;

                var orgs = ich.OrgRoundItem(organizations);
                var agency = ich.AgencyRoundItem(agencies);
                $("#organizations").html(orgs);
                $("#organizations").append(agency);

                $('#step_1 .roundabout-wrap').roundabout({
                    shape: 'tearDrop',
                    minScale: 0.7
                });

                /* roundabout controls*/
                $("#step_1 .roundabout-rotate-left").click(function () {
                    $('.roundabout-wrap').roundabout("animateToNextChild");
                    return false;
                });
                $("#step_1 .roundabout-rotate-right").click(function () {
                    $('.roundabout-wrap').roundabout("animateToPreviousChild");
                    return false;
                });
                /* Agency roundabout tile (select agency type and company size) */
                $("#step_1 #roundtileAgency a.selectbtn").click(function (e) {
                    e.preventDefault();
                    if ($("#roundtileAgency").hasClass("roundabout-in-focus")) {
                        // slide up the submenu from bottom
                        $("#roundtileAgency .roundabout-agencysize").slideDown();
                    }
                });

                $("#roundtileAgency .roundabout-agencysize .gradient-list li").click(function (e) {
                    e.preventDefault();
                    if ($("#roundtileAgency").hasClass("roundabout-in-focus")) {
                        var submenuToOpen = $(this).attr("class").replace("agency-submenu roundabout-content roundabout-", "");


                        var divToOpen = $("#roundtileAgency .roundabout-" + submenuToOpen);
                        if (submenuToOpen != "back") {
                            divToOpen.show().animate({
                                left: "0px"
                            });
                            $("#roundtileAgency .roundabout-agencysize").animate({
                                left: "-305px"
                            });

                        } else {
                            $("#roundtileAgency .roundabout-agencysize").slideUp();
                        }
                    }
                });
                /*last section on agency tile */
                /* back button clicked */
                $("#roundtileAgency .backlink").click(function (e) {
                    e.preventDefault();

                    if ($("#roundtileAgency").hasClass("roundabout-in-focus")) {
                        $(this).parent().animate({
                            left: "305px"
                        }, function () {
                            $(this).hide();
                        });
                        $("#roundtileAgency .roundabout-agencysize").animate({
                            left: "0px"
                        });
                    }
                });

                // check boxes and "All" check box functionality

                $(".recommend-checkitem input.all").change(function () {
                    if ($(this).attr("checked") == "checked") {
                        $(this).parentsUntil(".agency-submenu").find(".recommend-checkitem input").attr("checked", "checked");
                    } else {
                        $(this).parentsUntil(".agency-submenu").find(".recommend-checkitem input").removeAttr("checked");
                    }

                });

                $(".recommend-checkitem input").change(function () {
                    if ($(this).attr("checked") != "checked") {
                        $(this).parentsUntil(".agency-submenu").find(".recommend-checkitem input.all").removeAttr("checked");
                    }
                });

                seekToPage(0);
                SetSelectedMenuItem(0);

            },
            "BusinessNeed": function () {
                var content = ich.BusinessNeeds(MyRecOffice["Organization"]);
                buildNextPage(content, function () {
                    nextPage();
                });

            },
            "FunctionalNeed": function () {
                var content = ich.FunctionalNeeds(MyRecOffice["CurSolutionSet"]["BusinessNeed"]);
                buildNextPage(content, function () {
                    nextPage();
                });
            },
            "SolutionSet": function () {

                var prodCount = MyRecOffice["CurSolutionSet"]["FunctionalNeed"]["Products"].length;

                MyRecOffice["CurSolutionSet"]["FunctionalNeed"]["prodCount"] = prodCount;
                MyRecOffice["CurSolutionSet"]["FunctionalNeed"]["OrgName"] = MyRecOffice["Organization"]["BreadcrumbName"];

                if (MyRecOffice["Organization"]["Type"]) {
                    MyRecOffice["CurSolutionSet"]["FunctionalNeed"]["Type"] = MyRecOffice["Organization"]["Type"];
                }

                var content = ich.SolutionSet(MyRecOffice["CurSolutionSet"]["FunctionalNeed"]);
                buildNextPage(content, function () {
                    RecOfficeConfig.buildAndSeekPane["EmailShare"]();
                    RecOfficeConfig.buildAndSeekPane["MyRecOffice"]();
                    RecOfficeConfig.buildAndSeekPane["ViewProducts"]();
                    RecOfficeConfig.buildAndSeekPane["ContactVertafore"]();

                    nextPage();
                });

                updateSavedSolList($(".ro-solution-set .ro-myrecoffice-list ul"), "SavedSolutions");

            },
            "EmailShare": function () {

                updateSavedSolList($(".ro-emailpane .ro-myrecoffice-list ul"), "SavedSolutions2");

            },
            "MyRecOffice": function () {
                var content = ich.MyRecOffice(MyRecOffice["CurSolutionSet"]["FunctionalNeed"]);
                $("#RecommendedOfficeOverlay .ro-sol-tabpane.ro-myrecofficepane").html(content);
                updateSavedSolList($(".ro-myrecofficepane .ro-myrecoffice-list ul"), "SavedSolutions3");

            },
            "ViewProducts": function () {
                // build 3d table

                /* TEST DATA */
                var bnCols = [ /*["Improve Operational Efficiency", "Improve Sales and Revenue", "Manage Operating Costs", "Reduce Risk"], ["Make Magic"]*/ ];
                var prodRows = [ /*"AM360", "Sigitta", "WorkSmart", "RL Ranking", "Benefit Point", "Efficient Contract Solution", "ClientConnect", "CMS G2", "Compliance Express", "Goose", "Ice Man", "Maverick"*/ ];
                var prodHrefs = [];

                var undef; // undefined

                var prod3dTable = [
                    /*
				[
					[1, 1, undef, 1],
					[1, 1, undef, undef],
					[undef, undef, undef, 1],
					[1, 1, 1, undef],
					[1, undef, undef, undef],
					[1, undef, undef, 1],
					[undef, 1, 1, 1],
					[undef, undef, 1, 1],
					[1, undef, 1, 1],
					[1, 1, undef, 1],
					[1, 1, 1, undef],
					[undef, 1, 1, 1],
				],
				[
					[1],
					[undef],
					[1],
					[undef],
					[1],
					[1],
					[undef],
					[1],
					[undef],
					[1],
					[1],
					[undef],
				]*/
                ];

                /* END TEST DATA */

                // BUILD PROD TABLE DATA
                var paneInd = 0;
                var colInd = 0;

                bnCols[paneInd] = [];
                bnCols[paneInd].length = 4;

                prod3dTable[paneInd] = [];
                prod3dTable[paneInd][0] = []

                // get ready for the nested each loops
                $.each(MyRecOffice["Organization"]["BusinessNeeds"], function (index, bNeed) {
                    // figure out what pane we're on
                    // if this is the fourth column, start a new table
                    if ((colInd > 0) && ((colInd % 4) == 0)) {
                        paneInd += 1;
                        colInd = 0;
                        bnCols[paneInd] = [];
                        bnCols[paneInd].length = 4;
                        prod3dTable[paneInd] = [];
                        prod3dTable[paneInd][0] = [];
                        prod3dTable[paneInd][0].length = 4;
                    }

                    // for each business need, add title to bnCols header list
                    bnCols[paneInd][colInd] = bNeed["Title"];

                    // for each functional need
                    $.each(bNeed["FunctionalNeeds"], function (index, fNeed) {
                        // for each product
                        $.each(fNeed["Products"], function (index, prod) {
                            // is this product already in the list?
                            var pInd = $.inArray(prod["Title"], prodRows);

                            if (pInd == -1) {
                                // add title to prod rows
                                prodRows.push(prod["Title"]);

                                // we use 2 objects, one for titles and one for links. Cuz' that's how it works.
                                prodHrefs.push(prod["ProdLink"]);
                                pInd = prodRows.length - 1;
                                prod3dTable[paneInd][pInd] = [];

                                // make sure we have 4 columns in each row
                                prod3dTable[paneInd][pInd].length = 4;
                            }

                            // if this is the second table, sometimes all rows aren't created.
                            if (typeof prod3dTable[paneInd][pInd] == "undefined") {
                                prod3dTable[paneInd][pInd] = [];
                                prod3dTable[paneInd][pInd].length = 4;
                            }
                            prod3dTable[paneInd][pInd][colInd] = 1;

                        });
                    });

                    colInd += 1;
                });


                var prodTableContent = buildProdTable(bnCols, prod3dTable);
                var prodRowContent = buildProdRows(prodRows, prodHrefs);

                // append to pane
                $("#ROSolutionTabs .ro-sol-tabpanes .ro-viewprodpane .ro-prodtable-rowlabels").append(prodRowContent);
                $("#ROSolutionTabs .ro-sol-tabpanes .ro-viewprodpane .ro-prodtable-scrollable").append(prodTableContent);

            },
            "ContactVertafore": function () {

                updateSavedSolList($(".ro-contactpane .ro-myrecoffice-list ul"), "SavedSolutions2");
            }
        },
        // this happens after the page is shown
        initPane: {
            "Home": function () {

                RecOfficeConfig.paneReady["Home"] = true;
            },
            "BusinessNeed": function () {

                RecOfficeConfig.paneReady["BusinessNeed"] = true;
                $("#step_2 .ro-3grid").jScrollPane();
            },
            "FunctionalNeed": function () {
                RecOfficeConfig.paneReady["FunctionalNeed"] = true;
                $("#step_3 .ro-3grid").jScrollPane();
            },
            "SolutionSet": function () {
                // hover over on products
                $("#step_4 .ro-solution-set .ro-solutionitem-wrap").hover(
                    function () {
                        $(this).find(".ro-solution-desc").stop().slideDown(150);
                    },
                    function () {
                        $(this).find(".ro-solution-desc").stop().slideUp(150);
                    });

                $("#step_4 .ro-solution-set .ro-3grid").jScrollPane();
                $("#step_4 .ro-solution-set .ro-myrecoffice-list").jScrollPane({
                    autoReinitialise: true
                });

                RecOfficeConfig.paneReady["SolutionSet"] = true;
                ConfigTabs();

                $(".ro-myrecoffice-summarylink").click(function () {
                    //make sure there is more than one solution set
                    if (MyRecOffice.SolutionSets.length > 0) {
                        RecOfficeConfig.solutionTabApi.click(2);
                    } else {
                        // show an alert box that there are no solution sets
                        ROAlert("<p>No solutions saved!</p>", "Ok");
                    }

                });

                // activate fancybox
                $("a.egroup").unbind();
                $("a.egroup").fancybox({
                    'overlayShow': true,
                    'frameWidth': 655,
                    'frameAutoSizeIFrame': true,
                    'frameHeight': 480,
                    'type': 'iframe',
                    'externalLink': true
                });

                // reinitialize sharethis
                stButtons.locateElements();
            },
            "EmailShare": function () {
                RecOfficeConfig.paneReady["EmailShare"] = true;

                $("#step_4 .ro-emailpane .ro-myrecoffice-list").jScrollPane({
                    autoReinitialise: true
                });
            },
            "MyRecOffice": function () {
                RecOfficeConfig.paneReady["MyRecOffice"] = true;
                $("#step_4 .ro-myrecofficepane .ro-solutionitem-wrap").hover(
                    function () {
                        $(this).find(".ro-solution-desc").slideDown(150);
                    },
                    function () {
                        $(this).find(".ro-solution-desc").slideUp(150);
                    });

                $("#step_4 .ro-myrecofficepane .ro-3grid").jScrollPane();
                $("#step_4 .ro-myrecofficepane .ro-myrecoffice-list").jScrollPane({
                    autoReinitialise: true
                });
            },
            "ViewProducts": function () {
                RecOfficeConfig.paneReady["ViewProducts"] = true;

                $(".ro-viewprodpane .ro-prodtable-scrollpane").jScrollPane();

                $(".ro-viewprodpane .ro-prodtable-scrollpane").bind(
                    'jsp-scroll-y',
                    function (event, scrollPositionY, isAtTop, isAtBottom) {

                        $(".ro-prodtable-rowlabels").css({
                            "top": -scrollPositionY
                        });

                    }
                );

                $(".ro-viewprodpane .ro-prodtable-scrollable").scrollable({
                    next: ".ro-prodtable-ctrl.next",
                    prev: ".ro-prodtable-ctrl.prev"
                });
            },
            "ContactVertafore": function () {
                RecOfficeConfig.paneReady["ContactVertafore"] = true;

                $("#step_4 .ro-contactpane .ro-myrecoffice-list").jScrollPane({
                    autoReinitialise: true
                });
                $(".ro-contactpane .ro-formitem select").selectBox();
            }
        },
        // these functions are in userSel.js
        setupUserSel: {},
        paneIndex: [
            "Home",
            "BusinessNeed",
            "FunctionalNeed",
            "SolutionSet",
            "EmailShare",
            "MyRecOffice",
            "ViewProducts",
            "ContactVertafore"
        ]
    }

    $(document).ready(function () {
        $.ajax({
            type: "POST",
            url: "/layouts/VertaforWizard/ajaxHandler.aspx/GetData",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                    wizardData = data;

                    ich.grabTemplates();

                    RecOfficeConfig.buildAndSeekPane["Home"]();
                    AutoNavigate();
                } //,
                //		error : function(XMLHttpRequest, textStatus, errorThrown) {
                //			alert("Fail: " + errorThrown);
                //		}
        });

        $('.selectbtn').click(function (e) {
            SetSelectedMenuItem(3);

            var isDuplicate = false;
            $.each(MyRecOffice.SolutionSets, function (index, value) {
                if ((MyRecOffice.CurSolutionSet.BusinessNeed.Name == value.BusinessNeed.Name) && (MyRecOffice.CurSolutionSet.FunctionalNeed.Name == value.FunctionalNeed.Name)) {
                    // if both are true this is a duplicate solution set
                    isDuplicate = true;

                }
            });

            if (isDuplicate) {
                $(".ro-saveset .ro-saveconfirm").show();
                $(".ro-saveset a.selectbtn.greenbtn").hide();
                $(".ro-saveset .ro-saveconfirm").html('<h3 style="color:#333;">Solution Set Saved!</h3>');
            }
        });

        $('.ro-navitem').click(function (e) {
            e.preventDefault();
            var selectNavItem = $(this).attr('rel');

            switch (selectNavItem) {
            case "0":
                seekToPage(0);
                SetSelectedMenuItem(0);
                break;
            case "1":
                if (RecOfficeConfig.paneReady["BusinessNeed"]) {
                    seekToPage(1);
                    SetSelectedMenuItem(1);
                }
                break;
            case "2":
                if (RecOfficeConfig.paneReady["FunctionalNeed"]) {
                    seekToPage(2);
                    SetSelectedMenuItem(2);
                }
                break;

            case "3":
                if (RecOfficeConfig.paneReady["SolutionSet"]) {
                    RecOfficeConfig.solutionTabApi.click(0);
                    SetSelectedMenuItem(3);

                    var isDuplicate = false;
                    $.each(MyRecOffice.SolutionSets, function (index, value) {
                        if ((MyRecOffice.CurSolutionSet.BusinessNeed.Name == value.BusinessNeed.Name) && (MyRecOffice.CurSolutionSet.FunctionalNeed.Name == value.FunctionalNeed.Name)) {
                            // if both are true this is a duplicate solution set
                            isDuplicate = true;
                        }
                    });

                    if (isDuplicate) {
                        $(".ro-saveset .ro-saveconfirm").show();
                        $(".ro-saveset a.selectbtn.greenbtn").hide();
                        $(".ro-saveset .ro-saveconfirm").html('<h3 style="color:#333;">Solution Set Saved!</h3>');
                    }
                }
                break;
            case "4":
                if (RecOfficeConfig.paneReady["SolutionSet"]) {
                    RecOfficeConfig.solutionTabApi.click(2);
                    SetSelectedMenuItem(4);
                }
                break;
            case "5":
                if (RecOfficeConfig.paneReady["SolutionSet"]) {
                    RecOfficeConfig.solutionTabApi.click(4)
                    SetSelectedMenuItem(5);
                }
                break;
            }


        });

        /* Page setup */
        /*$("a[rel].open-widget").overlay({
		oneInstance: false,
		mask : '#000',
		top : 0,
		closeOnClick : false,
		fixed : false
	});*/


        $("#RecommendedOfficeOverlay").overlay({
            oneInstance: false,
            mask: '#000',
            top: 0,
            closeOnClick: false,
            fixed: false
        });

        $('a.open-widget').click(function (e) {
            $("#RecommendedOfficeOverlay").overlay().load();
        });

        ConfigureScrollable();

        appendUserSel();


        $.validator.addMethod("notEqual", function (value, element, param) {
            return this.optional(element) || value != param;
        }, "This field is required.");

    });

    var prevIndex = 0;
    // Configure the scrollable that runs the whole widget
    function ConfigureScrollable() {
        $(".slide-pane-scrollable").scrollable({
            touch: false,
            onAddItem: function (e, newItem) {

            },
            onBeforeSeek: function (e, index) {
                prevIndex = RecOfficeConfig.scrollableApi.getIndex();

                $(".ro-save-confirm").hide();
                $(".ro-save-cur-sol").hide();

                var tabName;
                var title;

                // hide back button
                $(".ro-solution-back").hide();

                $(".ro-bottom-icon").fadeOut();

                switch (index) {
                case 0:

                    tabName = "Home";
                    title = "Your Organization";

                    // readys
                    RecOfficeConfig.paneReady["BusinessNeed"] = false;
                    MyRecOffice["CurSolutionSet"] = {}

                    // reset the agency stuff
                    $("#RecommendedOfficeOverlay .agency-submenu").removeAttr("style");

                    break;
                case 1:
                    // Get title 
                    tabName = "Buisness Need";

                    title = "Your Business Challenges";

                    RecOfficeConfig.paneReady["FunctionalNeed"] = false;

                    break;
                case 2:
                    tabName = "Functional Need";
                    title = "We Can Help You...";

                    RecOfficeConfig.paneReady["SolutionSet"] = false;
                    RecOfficeConfig.paneReady["EmailShare"] = false;
                    RecOfficeConfig.paneReady["MyRecOffice"] = false;
                    RecOfficeConfig.paneReady["ViewProducts"] = false;
                    RecOfficeConfig.paneReady["ContactVertafore"] = false;

                    break;
                case 3:
                    tabName = "Recommended Solution Set";
                    title = "Your Recommended Solution Set";

                    var count = MyRecOffice.SolutionSets.length;

                    if (count > 0) {
                        $(".ro-sol-tab a").eq(2).html("<span>(" + count + ")</span> My Recommended Office");
                    } else {
                        $(".ro-sol-tab a").eq(2).html("My Recommended Office");
                    }

                    break;
                }



                // set title
                changeTitle(title);

                if ((index != prevIndex) && (prevIndex == 3)) {
                    RecOfficeConfig.solutionTabApi.destroy();
                }

                return true;
            },
            onSeek: function (e, index) {
                if (index < prevIndex) {
                    removeToPage(index);
                }

                // set up nav item and other stuff
                paneId = RecOfficeConfig.paneIndex[index];
                if (RecOfficeConfig.paneReady[paneId] != true) {
                    RecOfficeConfig.initPane[paneId]();
                    RecOfficeConfig.setupUserSel[paneId]();
                }

                switch (index) {
                case 1:

                    $(".ro-bottom-icon").html('<img src="/Wizard/img/bottom-icon-01.png" alt="" />');
                    $(".ro-bottom-icon").fadeIn();
                    break;
                case 2:
                    $(".ro-bottom-icon").html('<img src="/Wizard/img/bottom-icon-02.png" alt="" />');
                    $(".ro-bottom-icon").fadeIn()
                    break;
                }


            }

        }).navigator({});

        RecOfficeConfig.scrollableApi = $(".slide-pane-scrollable").data("scrollable");

    }

    // Configure the bottom tabs on the solution set overview page
    function ConfigTabs() {
        // solution set tabs 
        $("#step_4 .ro-sol-tabs").tabs("#ROSolutionTabs .ro-sol-tabpanes .ro-sol-tabpane", {
            initialIndex: 0,
            onBeforeClick: function (e, index) {
                var title;
                // hide breadcrumb
                $(".ro-breadcrumb").show();
                // show back button
                $(".ro-solution-back").hide();
                //$(".ro-recproducts").hide();
                switch (index) {

                case 0:
                    RecOfficeConfig.paneReady[0] = false;
                    $('.ro-solution-set .ro-saveconfirm').html('<p><strong>This Solution Set has been Saved!</strong> Would you like to go back to Step 2 to choose an additional Business Need?&nbsp;&nbsp;&nbsp;<a class="selectbtn" href="#go2Yes" style=""><span>Yes</span></a><a class="selectbtn" href="#go2No" style=""><span>No</span></a></p>');
                    $('.ro-solution-set .selectbtn.graybtn').css({
                        'opacity': '1'
                    })
                    $('.ro-solution-set .ro-saveconfirm').hide();
                    title = "Your Recommended Solution Set";


                    updateSavedSolList($(".ro-solution-set .ro-myrecoffice-list ul"), "SavedSolutions");

                    break;
                case 1:
                    // show breadcrumb
                    $(".ro-breadcrumb").hide();
                    // hide back button
                    $(".ro-solution-back").show();

                    title = "Email Your Recommended Office";

                    updateSavedSolList($(".ro-emailpane .ro-myrecoffice-list ul"), "SavedSolutions2");
                    break;
                case 2:
                    SetSelectedMenuItem(4);
                    title = "My Recommended Office";
                    if (MyRecOffice.SolutionSets.length > 0) {
                        RecOfficeConfig.buildAndSeekPane["MyRecOffice"]();
                        RecOfficeConfig.paneReady["MyRecOffice"] = false;
                        updateSavedSolList($(".ro-myrecofficepane .ro-myrecoffice-list ul"), "SavedSolutions3");

                    } else {
                        $("#step_4 .ro-myrecofficepane .ro-myrecoffice").html("<h2>No Solution Sets Saved!</h2>");
                    }
                    break;
                case 3:
                    // show breadcrumb
                    $(".ro-breadcrumb").hide();
                    // hide back button
                    $(".ro-solution-back").show();
                    title = "Potential Products";
                    break;
                case 4:
                    SetSelectedMenuItem(5);
                    title = "Submit Your Recommended Office to a Vertafore Sales Consultant";
                    updateSavedSolList($(".ro-contactpane .ro-myrecoffice-list ul"), "SavedSolutions2");

                    break;
                }

                $(".ro-save-confirm").hide();
                $(".ro-save-cur-sol").hide();
                $(".ro-solution-set .selectbtn").show();

                changeTitle(title);
                return true;
            },
            onClick: function (e, index) {
                ROCloseDialog();

                var paneId;
                switch (index) {
                    // hide breadcrumb
                    // show back button
                case 0:
                    // show breadcrumb
                    // hide back button
                    paneId = "SolutionSet";

                    break;
                case 1:
                    paneId = "EmailShare";
                    break;
                case 2:
                    paneId = "MyRecOffice";

                    break;
                case 3:
                    paneId = "ViewProducts";
                    break;
                case 4:
                    paneId = "ContactVertafore"
                    break;
                }

                if (RecOfficeConfig.paneReady[paneId] != true) {
                    RecOfficeConfig.initPane[paneId]();
                    RecOfficeConfig.setupUserSel[paneId]();
                }
            }
        });

        RecOfficeConfig.solutionTabApi = $("#step_4 .ro-sol-tabs").data('tabs');

        $(".ro-solution-back").click(function (e) {
            e.preventDefault();
            RecOfficeConfig.solutionTabApi.click(0);

        });
    }

    // add new pane to scrollable
    function buildNextPage(nextPane, callback) {
            // get the title of the new item from the configuration object
            RecOfficeConfig.scrollableApi.addItem(nextPane);

            if (typeof callback == "function")
                callback();
        }
        // delete all panes after this page

    function removeToPage(i) {
        RecOfficeConfig.scrollableApi.getItems().each(function (index, value) {
            if (index > i) {
                $(this).remove();

            }

        });

        if (i < 3) {
            RecOfficeConfig.paneReady["SolutionSet"] = false;

            RecOfficeConfig.paneReady["EmailShare"] = false;
            RecOfficeConfig.paneReady["MyRecOffice"] = false;
            RecOfficeConfig.paneReady["ViewProducts"] = false;
            RecOfficeConfig.paneReady["ContactVertafore"] = false;
        }
    }

    function seekToPage(i) {
            RecOfficeConfig.scrollableApi.seekTo(i);
        }
        // animate panes to the left

    function nextPage() {
            RecOfficeConfig.scrollableApi.next();
        }
        // animate panes to the right

    function prevPage() {
        RecOfficeConfig.scrollableApi.prev();
    }

    function lastPage() {
        RecOfficeConfig.scrollableApi.end();
    }

    function changeTitle(title) {
        $(".overlay-title").html(title);
    }

    function addSolutionSet() {
        MyRecOffice.CurSolutionSet
        var isntDuplicate = true;
        $.each(MyRecOffice.SolutionSets, function (index, value) {

            if ((MyRecOffice.CurSolutionSet.BusinessNeed.Name == value.BusinessNeed.Name) && (MyRecOffice.CurSolutionSet.FunctionalNeed.Name == value.FunctionalNeed.Name)) {
                // if both are true this is a duplicate solution set
                isntDuplicate = false;
                return;
            }
        });

        if (isntDuplicate) {
            // deep copy object
            var newSolSet = $.extend(true, {}, MyRecOffice.CurSolutionSet);
            MyRecOffice.SolutionSets.push(newSolSet);
        }

        var count = MyRecOffice.SolutionSets.length;

        // throw the overlay every third item
        if (count % 3 == 0) {

            ROConfirm("<p>Looks like you have multiple needs. Ready to set up a meeting to understand more?</p>", "Yes", function () {
                // yes was clicked, go to contact tab 
                RecOfficeConfig.solutionTabApi.click(4);
            }, "No");
        }

        $(".ro-sol-tab a").eq(2).html("<span>(" + count + ")</span> My Recommended Office");

        var content = ich.MyRecOffice(MyRecOffice["CurSolutionSet"]["FunctionalNeed"]);
        $("#RecommendedOfficeOverlay .ro-sol-tabpane.ro-myrecofficepane").html(content);

    }

    function removeSolutionSet(index) {
        MyRecOffice.SolutionSets.splice(index, 1);


        $(".ro-myrecoffice-list ul.ro-sol-list > li").eq(index).slideUp(500, function () {
            $(this).remove();
            var count = MyRecOffice.SolutionSets.length;
            if (count == 0) {
                $("#step_4 .ro-myrecofficepane .ro-myrecoffice").html("<h2>No Solution Sets Saved!</h2>");
                $(".ro-sol-tab a").eq(2).html("My Recommended Office");
            } else {
                $(".ro-sol-tab a").eq(2).html("<span>(" + count + ")</span> My Recommended Office");
            }
        });


    }

    function updateSavedSolList(El, templateId) {
        // El is a jquery element

        var content = ich[templateId](MyRecOffice);
        El.html(content);
        /*
	var api = El.jScrollPane().data('jsp');
	if (api) {
		api.reinitialise();
	}*/
    }

    function getHash() {
        var hash = window.location.hash;
        return hash.substring(1); // remove #
    }

    function getLinkTarget(link) {
        return link.href.substring(link.href.indexOf('#') + 1);
    }


    /* VIEW ALL POTENTIAL PRODUCTS PANE */
    function buildProdRows(prodRows, prodHrefs) {
        var prodRowTab = $('<table width="25%" border="0" cellspacing="0" cellpadding="0"></table>');

        var prodRowBody = $('<tbody></tbody>');

        $.each(prodRows, function (index, pTitle) {
            var pTr = $("<tr></tr>");

            if ((index % 2) == 0) {
                pTr.addClass("ro-tr-alt");
            } else {
                pTr.addClass("ro-tr");
            }

            var pTd = $('<td class="ro-span-5"></td>');
            var prodLink = $('<a href="' + prodHrefs[index] + '" target="_new">' + pTitle + '</a>');
            $(pTd).append(prodLink);

            // build row/ cell
            $(pTr).append(pTd);

            // add row to table
            $(prodRowBody).append(pTr);
        });

        $(prodRowTab).append(prodRowBody);
        return prodRowTab;
    }

    function buildProdTable(bnCols, prod3dTable) {
        var tablePanes = $('<div class="ro-prodtable-panes"></div>');


        $.each(prod3dTable, function (index, subTable) {
            // this is also a table
            var tablePane = $('<div class="ro-prodtable-pane"></div>');

            // CREATE BUSINESS NEED HEADER TABLE	
            var busNeedTab = $('<table width="100%" border="0" cellspacing="0" cellpadding="0" class="ro-tablepane-header"><thead></thead></table>');
            var busNeedTr = $('<tr></tr>');

            bnCols[index].length = 4;

            // each busness need in prod table header, make a cell
            $.each(bnCols[index], function (index, busNeed) {
                var busNeedTd = $('<th class="ro-span-5"></th>');

                // alternating colors
                if ((index % 2) == 0) {
                    $(busNeedTd).addClass("ro-td");
                } else {
                    $(busNeedTd).addClass("ro-td-alt");
                }

                // set text value
                $(busNeedTd).text(busNeed);
                // add cell to row
                $(busNeedTr).append(busNeedTd);

            });

            $(busNeedTab).find('thead').append(busNeedTr);

            // APPEND TABLE HEADER
            $(tablePane).append(busNeedTab);

            // BUILD PROD TABLE BODY AND SCROLLPANE
            $(tablePane).append($('<div class="ro-prodtable-scrollpane"><table width="100%" border="0" cellspacing="0" cellpadding="0"></table></div>'));

            var tableBody = $('<tbody></tbody>');

            // each row in each subtable, build row
            $.each(subTable, function (indexx, row) {
                var trow = $('<tr></tr>');

                // alternating colors
                if ((indexx % 2) == 0) {
                    trow.addClass("ro-tr");
                } else {
                    trow.addClass("ro-tr-alt");
                }

                if (typeof row == "undefined") {
                    row = [];
                }

                row.length = 4;
                $.each(row, function (indexxx, value) {
                    var tcell = $('<td class="ro-span-5"></td>');
                    if ((indexxx % 2) == 0) {
                        // alternating colors
                        tcell.addClass("ro-td");
                    } else {
                        tcell.addClass("ro-td-alt");
                    }

                    if (value == 1) {
                        $(tcell).append('<span class="ro-prod-checked">&nbsp;</span>');
                    } else {
                        $(tcell).append('&nbsp;');
                    }

                    $(trow).append(tcell);
                });

                // append row
                $(tableBody).append(trow);
            });

            $(tablePane).find('.ro-prodtable-scrollpane table').append(tableBody);
            $(tablePanes).append(tablePane);

        });

        return tablePanes;
    }

    /* USER SELECTION FOR VERTAFORE CUSTOM HOME TOOL */

    var setupUserSel = {
        "Home": function () {
            /* navigate to next page */
            SetSelectedMenuItem(0);
            $("#step_1 .roundabout-wrap a.selectbtn").click(function (e) {
                // if this tile is in focus
                var inFocus = $(this).parentsUntil("#organizations").hasClass("roundabout-in-focus")

                if (inFocus) {
                    if (getLinkTarget(this) == "step2") {

                        var nextPaneId = $(this).attr("rel");
                        var organization;

                        $.each(wizardData.d.orgList, function (index, value) {

                            if (value.OrganizationId == nextPaneId) {

                                organization = value;
                                return;
                            }
                        });

                        MyRecOffice.Organization = organization;
                        // build next pane
                        RecOfficeConfig.buildAndSeekPane["BusinessNeed"]();


                        if ($(this).hasClass("ro-agency-next")) {
                            var checked;
                            var checkedCount = 0;

                            MyRecOffice.Organization["Types"] = [];
                            $(this).parent().find("input").each(function () {
                                if (($(this).attr("checked") == "checked")) {
                                    checked = $(this).val();
                                    checkedCount += 1;

                                    MyRecOffice.Organization["Types"].push({
                                        "Name": checked
                                    });

                                }
                            });

                            if (checkedCount == 1) {
                                MyRecOffice.Organization["Type"] = {
                                    "Name": checked
                                };
                            } else if (checkedCount = 4) {
                                MyRecOffice.Organization["Type"] = {
                                    "Name": "All"
                                };
                            }

                        }
                        document.location.href = "#p=" + organization.OrganizationId;
                        return false;
                    }
                }

            });

        },
        "BusinessNeed": function () {
            SetSelectedMenuItem(1);
            $("#step_2 a.selectbtn").click(function (e) {
                e.preventDefault();
                var nextPaneId = $(this).attr("rel");
                var Businessneed;

                $.each(MyRecOffice["Organization"]["BusinessNeeds"], function (index, value) {
                    if (value.Name == nextPaneId) {

                        Businessneed = value;
                        return;
                    }
                });

                MyRecOffice["CurSolutionSet"]["BusinessNeed"] = Businessneed;
                // build next pane
                RecOfficeConfig.buildAndSeekPane["FunctionalNeed"]();
                //document.location.href = document.location.href +"&" + Businessneed.Name;
                document.location.href = "#p=" + MyRecOffice.Organization.OrganizationId + "&" + Businessneed.Name;
                return false;
            });
        },
        "FunctionalNeed": function () {
            SetSelectedMenuItem(2);
            $("#step_3 a.selectbtn").click(function (e) {
                e.preventDefault();
                var nextPaneId = $(this).attr("rel");
                var Functionalneed;

                $.each(MyRecOffice["CurSolutionSet"]["BusinessNeed"]["FunctionalNeeds"], function (index, value) {

                    if (value.Name == nextPaneId) {

                        Functionalneed = value;
                        return;
                    }
                })

                MyRecOffice["CurSolutionSet"]["FunctionalNeed"] = Functionalneed;
                // build next pane
                RecOfficeConfig.buildAndSeekPane["SolutionSet"]();
                //document.location.href = document.location.href +"&" + Functionalneed.Name;
                document.location.href = "#p=" + MyRecOffice.Organization.OrganizationId + "&" + MyRecOffice.CurSolutionSet.BusinessNeed.Name + "&" + Functionalneed.Name;;
                return false;
            });
        },
        "SolutionSet": function () {
            SetSelectedMenuItem(3);
            //$(".ro-solution-set .selectbtn").unbind();
            var isDuplicate = false;
            $.each(MyRecOffice.SolutionSets, function (index, value) {
                if ((MyRecOffice.CurSolutionSet.BusinessNeed.Name == value.BusinessNeed.Name) && (MyRecOffice.CurSolutionSet.FunctionalNeed.Name == value.FunctionalNeed.Name)) {
                    // if both are true this is a duplicate solution set
                    isDuplicate = true;

                }
            });

            if (isDuplicate) {
                $(".ro-saveset .ro-saveconfirm").show();
                $(".ro-saveset a.selectbtn.greenbtn").hide();
                $(".ro-saveset .ro-saveconfirm").html('<h3 style="color:#333;">Solution Set Saved!</h3>');
            }

            var curSolution = MyRecOffice["CurSolutionSet"];
            _gaq.push(['_trackEvent', MyRecOffice.Organization.Name, MyRecOffice.CurSolutionSet.BusinessNeed.BreadcrumbName, MyRecOffice.CurSolutionSet.FunctionalNeed.BreadcrumbName]);
            $(".ro-start-over a").unbind();
            $(".ro-start-over a").click(function (e) {
                e.preventDefault();
                MyRecOffice["SolutionSets"] = [];
                MyRecOffice["CurSolutionSet"] = [];
                seekToPage(0);
                SetSelectedMenuItem(0);
            });

            $(".ro-saveset a.selectbtn.greenbtn").click(function (e) {
                e.preventDefault();
                RecOfficeConfig.paneReady[0] = false;

                // add solution set to recommended office
                addSolutionSet();
                $(".ro-saveset a.selectbtn").hide();
                $(".ro-saveset .ro-saveconfirm").show();
                $(".ro-saveset .ro-saveconfirm a.selectbtn").show();

                $(".ro-saveset .ro-saveconfirm a.selectbtn").click(function (e) {
                    e.preventDefault();
                    $(".ro-saveset .ro-saveconfirm").html('<h3 style="color:#333;">Solution Set Saved!</h3>')
                    if (getLinkTarget(this) == "go2Yes") {
                        // start countdown then go to pane 1
                        setTimeout(function () {
                            seekToPage(1);
                            SetSelectedMenuItem(1);
                        }, 1500);
                    }

                });

            });

            $(".ro-myrecoffice-add .ro-formbutton").unbind();
            $(".ro-myrecoffice-add .ro-formbutton").click(function (e) {
                e.preventDefault();
                RecOfficeConfig.paneReady[0] = false;
                if (getLinkTarget(this) == "addNo") {
                    $(".ro-myrecoffice-add a.ro-addlink").show();
                    $(".ro-myrecoffice-add").removeClass("tall");
                    $(".ro-myrecoffice-add .ro-addconfirm").hide();

                } else {
                    // return to step 2
                    seekToPage(1);
                    SetSelectedMenuItem(1);
                }

            });

            $(".ro-recprod-collapse").unbind();
            $(".ro-recprod-collapse").click(function (e) {
                e.preventDefault();

                $(".ro-recproducts").slideUp();
            });

            $(".ro-solution-set .ro-viewproducts .selectbtn").unbind();
            $('.ro-solution-set .ro-viewproducts .selectbtn').click(function (e) {

                if (getLinkTarget(this) == "viewProds") {
                    $(".ro-recproducts").slideDown();
                }
            });

            $(".ro-solution-set .ro-rightpane a.selectbtn").unbind();


            $(".ro-solution-set .ro-rightpane a.selectbtn").click(function (e) {
                e.preventDefault();

                var isntDuplicate = true;
                $.each(MyRecOffice.SolutionSets, function (index, value) {
                    if ((MyRecOffice.CurSolutionSet.BusinessNeed.Name == value.BusinessNeed.Name) && (MyRecOffice.CurSolutionSet.FunctionalNeed.Name == value.FunctionalNeed.Name)) {
                        // if both are true this is a duplicate solution set
                        isntDuplicate = false;

                    }
                });
                if (isntDuplicate == false) {
                    $(".ro-save-cur-sol").show();
                    $(".ro-solution-set .ro-rightpane a.selectbtn").eq(0).css({
                        'opacity': '0'
                    });

                    if (getLinkTarget(this) == "review") {
                        $(".ro-save-confirm").show();
                        $(".ro-save-confirm p").html("You're now being taken to Step 2 to choose an additional Business Need.");
                        setTimeout(function () {
                            seekToPage(1);
                            SetSelectedMenuItem(1);
                        }, 1500);
                    } else if (getLinkTarget(this) == "contact") {
                        $(".ro-save-confirm").show();
                        $(".ro-save-confirm p").html("You're now being taken to Step 6 to Contact a Vertafore Representative");
                        setTimeout(function () {
                            RecOfficeConfig.solutionTabApi.click(4);
                        }, 1500);
                    } else if (getLinkTarget(this) == "myrecOffice") {
                        $(".ro-save-confirm").show();
                        $(".ro-save-confirm p").html("You're now being taken to view your Recommended Office.");
                        setTimeout(function () {
                            RecOfficeConfig.solutionTabApi.click(2);
                        }, 1500);
                    }
                    //seekToPage(1);SetSelectedMenuItem(1);
                } else {
                    $(".ro-save-cur-sol").show();
                    if (getLinkTarget(this) == "review") {
                        // REVIEW
                        RecOfficeConfig.paneReady[0] = false;

                        $(".ro-save-cur-sol a.ro-formbutton").unbind();
                        $(".ro-save-cur-sol a.ro-formbutton").click(function (e) {
                            e.preventDefault();
                            RecOfficeConfig.paneReady[0] = false;
                            $(".ro-save-confirm").show();
                            $(".ro-save-confirm p").html("");
                            $(".ro-save-cur-sol").hide();

                            if (getLinkTarget(this) == "saveYes") {
                                addSolutionSet();
                                // set confirm text	
                                $(".ro-save-confirm p").html("<strong>Solution Set has been saved</strong> You're now being taken to Step 2 to choose an additional Business Need.");

                            } else if (getLinkTarget(this) == "saveNo") {
                                // set confirm text

                            }

                            // start countdown then go to pane 1
                            setTimeout(function () {
                                seekToPage(1);
                                SetSelectedMenuItem(1);
                            }, 1500);
                        });
                    } else if (getLinkTarget(this) == "myrecOffice") {
                        // MYRECOFFICE
                        RecOfficeConfig.paneReady[0] = false;

                        $(".ro-save-cur-sol a.ro-formbutton").unbind();
                        $(".ro-save-cur-sol a.ro-formbutton").click(function (e) {
                            e.preventDefault();
                            RecOfficeConfig.paneReady[0] = false;
                            $(".ro-save-confirm").show();
                            $(".ro-save-confirm p").html("");
                            $(".ro-save-cur-sol").hide();

                            if (getLinkTarget(this) == "saveYes") {
                                addSolutionSet();
                                // set confirm text	
                                $(".ro-save-confirm p").html("<strong>Solution Set has been saved</strong> You're now being taken to view your Recommended Office.");

                            } else if (getLinkTarget(this) == "saveNo") {
                                // set confirm text
                                $(".ro-save-confirm p").html("You're now being taken to view your Recommended Office.");
                            }

                            // start countdown then go to tab 2
                            setTimeout(function () {
                                RecOfficeConfig.solutionTabApi.click(2);
                            }, 1500);
                        });

                    } else if (getLinkTarget(this) == "contact") {
                        // CONTACT
                        RecOfficeConfig.paneReady[0] = false;

                        $(".ro-save-cur-sol a.ro-formbutton").unbind();
                        $(".ro-save-cur-sol a.ro-formbutton").click(function (e) {
                            e.preventDefault();
                            RecOfficeConfig.paneReady[0] = false;
                            $(".ro-save-confirm").show();
                            $(".ro-save-confirm p").html("");
                            $(".ro-save-cur-sol").hide();

                            if (getLinkTarget(this) == "saveYes") {
                                addSolutionSet();
                                // set confirm text	
                                $(".ro-save-confirm p").html("<strong>Solution Set has been saved</strong> You're now being taken to Step 6 to Contact a Vertafore Representative");

                            } else if (getLinkTarget(this) == "saveNo") {
                                // set confirm text
                                $(".ro-save-confirm p").html("You're now being taken to Step 6 to Contact a Vertafore Representative");
                            }

                            // start countdown then go to tab 4
                            setTimeout(function () {
                                RecOfficeConfig.solutionTabApi.click(4);
                            }, 1500);
                        });

                        //ROConfirm("<p>Do you want to save the current Solution Set?</p>", "Yes", function() {addSolutionSet(); RecOfficeConfig.solutionTabApi.click(4);}, "No", function() {RecOfficeConfig.solutionTabApi.click(4);});		
                    }
                }

            });



            // validation
            $("#mainform").validate({
                ignore: ".ignore",
                rules: {
                    RoEmailFrom: {
                        required: true
                    },

                    RoEmailTo: {
                        email: true,
                        required: true
                    },

                    RoEmailMessage: {
                        required: true
                    },

                    RoContactFirst: {
                        required: true
                    },

                    RoContactLast: {
                        required: true
                    },

                    RoContactEmail: {
                        email: true,
                        required: true
                    },
                    RoContactPhone: {
                        number: true,
                        required: true,
                        min: 3
                    },
                    RoContactPhone01: {
                        number: true,
                        required: true,
                        min: 3
                    },
                    RoContactPhone02: {
                        number: true,
                        required: true,
                        min: 4
                    },
                    RoContactCompany: {
                        required: true
                    },
                    RoContactCoType: {
                        required: true
                    },
                    RoContactRole: {
                        required: true
                    },
                    RoContactNumEmployees: {
                        required: true
                    },
                    RoContactState: {
                        required: true
                    }
                },
                groups: {
                    NameGroup: "RoContactFirst RoContactLast",
                    PhoneGroup: "RoContactPhone RoContactPhone01 RoContactPhone02"

                },
                errorPlacement: function (error, element) {
                    if (element.attr("name") == "RoContactFirst" || element.attr("name") == "RoContactLast") {
                        error.insertAfter("#RoContactLast");

                    } else if (element.attr("name") == "RoContactPhone" || element.attr("name") == "RoContactPhone01" || element.attr("name") == "RoContactPhone02") {
                        error.insertAfter("#RoContactPhone02");

                    } else {
                        error.insertAfter(element);
                    }
                }
            });
        },
        "EmailShare": function () {
            $(".ro-emailpane a.ro-formbutton").click(function (e) {
                e.preventDefault();

                if (getLinkTarget(this) == "submitEmail") {

                    $(".ro-contactpane input, .ro-contactpane select, .ro-contactpane textarea").addClass("ignore");
                    $(".ro-emailpane input, .ro-emailpane select, .ro-emailpane textarea").removeClass("ignore");

                    if ($("#mainform").valid()) {

                        $(".ro-emailpane .ro-form-wrap").hide();
                        $(".ro-emailpane .ro-form-thanks").show();
                    }

                    // SEND EMAIL
                    var message = {};
                    message.from = $('#RoEmailFrom').val();
                    message.to = $('#RoEmailTo').val();
                    message.text = $('#RoEmailMessage').val();
                    message.link = document.location.href;
                    message.solutionSets = MyRecOffice.SolutionSets;


                    $.ajax({
                        type: "POST",
                        url: "/layouts/VertaforWizard/ajaxHandler.aspx/SendEmail",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        data: JSON.stringify(message),
                        success: function (data) {
                            console.log("Success");
                        },
                        error: function (XMLHttpRequest, textStatus, errorThrown) {
                            console.log("Error: " + errorThrown);
                        }
                    });

                    // Submit to vertafore
                } else if (getLinkTarget(this) == "cancelEmail") {
                    RecOfficeConfig.solutionTabApi.click(0);
                    SetSelectedMenuItem(3);

                    var isDuplicate = false;
                    $.each(MyRecOffice.SolutionSets, function (index, value) {
                        if ((MyRecOffice.CurSolutionSet.BusinessNeed.Name == value.BusinessNeed.Name) && (MyRecOffice.CurSolutionSet.FunctionalNeed.Name == value.FunctionalNeed.Name)) {
                            // if both are true this is a duplicate solution set
                            isDuplicate = true;

                        }
                    });

                    if (isDuplicate) {
                        $(".ro-saveset .ro-saveconfirm").show();
                        $(".ro-saveset a.selectbtn.greenbtn").hide();
                        $(".ro-saveset .ro-saveconfirm").html('<h3 style="color:#333;">Solution Set Saved!</h3>');
                    }
                }
            });


        },
        "MyRecOffice": function () {

            $(".ro-remove-solset").unbind();
            $(".ro-remove-solset").click(function (e) {
                e.preventDefault();

                var setIndex = $(this).parent().index();
                ROConfirm("<p>Do you want to remove this Solution Set?", "Yes", function () {
                    removeSolutionSet(setIndex);
                }, "No");

            });

            $(".ro-myrecofficepane .ro-rightpane a.selectbtn").unbind();
            $(".ro-myrecofficepane .ro-rightpane a.selectbtn").click(function (e) {
                e.preventDefault();


                if (getLinkTarget(this) == "email") {
                    RecOfficeConfig.solutionTabApi.click(1);
                } else if (getLinkTarget(this) == "meeting") {
                    RecOfficeConfig.solutionTabApi.click(4);

                } else if (getLinkTarget(this) == "print") {
                    var myData = {};
                    myData.solutionSets = MyRecOffice.SolutionSets;

                    $.ajax({
                        type: "POST",
                        url: "/layouts/VertaforWizard/ajaxHandler.aspx/SaveTempFile",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        data: JSON.stringify(myData),
                        success: function (data) {
                            fileId = data.d;
                            window.open("layouts/VertaforWizard/Handler.ashx?id=" + fileId, 'open_window');
                        },
                        error: function (XMLHttpRequest, textStatus, errorThrown) {
                            console.log("Error: " + errorThrown);
                        }


                    });
                } else if (getLinkTarget(this) == "solutionSet") {
                    RecOfficeConfig.solutionTabApi.click(0);
                    SetSelectedMenuItem(3);

                    var isDuplicate = false;
                    $.each(MyRecOffice.SolutionSets, function (index, value) {
                        if ((MyRecOffice.CurSolutionSet.BusinessNeed.Name == value.BusinessNeed.Name) && (MyRecOffice.CurSolutionSet.FunctionalNeed.Name == value.FunctionalNeed.Name)) {
                            // if both are true this is a duplicate solution set
                            isDuplicate = true;
                        }
                    });

                    if (isDuplicate) {
                        $(".ro-saveset .ro-saveconfirm").show();
                        $(".ro-saveset a.selectbtn.greenbtn").hide();
                        $(".ro-saveset .ro-saveconfirm").html('<h3 style="color:#333;">Solution Set Saved!</h3>');
                    }
                }

            });
        },
        "ViewProducts": function () {},
        "ContactVertafore": function () {

            $(".ro-contactpane a.ro-formbutton").click(function (e) {
                e.preventDefault();

                $(".ro-contactpane input, .ro-contactpane select, .ro-contactpane textarea").removeClass("ignore");
                $(".ro-emailpane input, .ro-emailpane select, .ro-emailpane textarea").addClass("ignore");


                if (getLinkTarget(this) == "submitEmail") {
                    if ($("#mainform").valid()) {
                        $(".ro-contactpane .ro-form-wrap").hide();
                        $(".ro-contactpane .ro-form-thanks").show();

                        // POST DATA
                        var txtSolutionSets = "";

                        $.each(MyRecOffice.SolutionSets, function (index, value) {
                            txtSolutionSets += MyRecOffice.SolutionSets[index].BusinessNeed.Title + "->" + MyRecOffice.SolutionSets[index].FunctionalNeed.Title + ";";

                        });


                        $('#BNTSolutionSet').val(txtSolutionSets);
                        //$('#contactVertaforeForm').jspost({ 'action': 'http://s1083.t.eloqua.com/e/f2', 'method': 'POST' });

                        /*var jsonSubmission = { };
					jsonSubmission.elqFormName = "BusinessNeedsTool";
					jsonSubmission.elqCustomerGUID = "";
					jsonSubmission.elqSiteID = 1083;
					jsonSubmission.C_FirstName = $('#RoContactFirst').val();
					jsonSubmission.C_LastName = $('#RoContactLast').val();
					jsonSubmission.C_EmailAddress = $('#RoContactEmail').val();
					jsonSubmission.C_BusPhone = $('#RoContactPhone').val() + "-" + $('#RoContactPhone01').val() + "-" + $('#RoContactPhone02').val();
					jsonSubmission.C_Company = $('#RoContactCompany').val();
					jsonSubmission.C_How_Would_You_Classify_Yourself1 = $('#RoContactCoType').val();
					jsonSubmission.C_Number_of_Employees1 = $('#RoContactNumEmployees').val();
					jsonSubmission.C_State_Prov = $('#RoContactState').val();
					jsonSubmission.BNTSolutionSet = txtSolutionSets;
					jsonSubmission.submit = "submit";*/

                        var jsonSubmission = {};
                        jsonSubmission.firstName = $('#RoContactFirst').val();
                        jsonSubmission.lastName = $('#RoContactLast').val();
                        jsonSubmission.emailAddress = $('#RoContactEmail').val();
                        jsonSubmission.busPhone = $('#RoContactPhone').val() + "-" + $('#RoContactPhone01').val() + "-" + $('#RoContactPhone02').val();
                        jsonSubmission.company = $('#RoContactCompany').val();
                        jsonSubmission.organization = $('#RoContactCoType').val();
                        jsonSubmission.employeNum = $('#RoContactNumEmployees').val();
                        jsonSubmission.state = $('#RoContactState').val();
                        jsonSubmission.solutionSet = txtSolutionSets;

                        $.ajax({
                            type: "POST",
                            url: "/layouts/VertaforWizard/ajaxHandler.aspx/SubmitToEloqua",
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            data: JSON.stringify(jsonSubmission),
                            success: function (data) {
                                console.log(data);
                            },
                            error: function (XMLHttpRequest, textStatus, errorThrown) {
                                console.log("Error: " + errorThrown);
                            }


                        });

                        /*var result = "";
					
					$.post('http://s1083.t.eloqua.com/e/f2', JSON.stringify(jsonSubmission), function (data) { 
						console.log('here');
						//result = data;
					});*/
                    }

                } else if (getLinkTarget(this) == "cancelEmail") {
                    RecOfficeConfig.solutionTabApi.click(0);
                    SetSelectedMenuItem(3);

                    var isDuplicate = false;
                    $.each(MyRecOffice.SolutionSets, function (index, value) {
                        if ((MyRecOffice.CurSolutionSet.BusinessNeed.Name == value.BusinessNeed.Name) && (MyRecOffice.CurSolutionSet.FunctionalNeed.Name == value.FunctionalNeed.Name)) {
                            // if both are true this is a duplicate solution set
                            isDuplicate = true;
                        }
                    });

                    if (isDuplicate) {
                        $(".ro-saveset .ro-saveconfirm").show();
                        $(".ro-saveset a.selectbtn.greenbtn").hide();
                        $(".ro-saveset .ro-saveconfirm").html('<h3 style="color:#333;">Solution Set Saved!</h3>');
                    }
                }
            });

            $(".ro-contactpane .ro-rightpane a.selectbtn").unbind();
            $(".ro-contactpane .ro-rightpane a.selectbtn").click(function (e) {
                e.preventDefault();
                RecOfficeConfig.solutionTabApi.click(0);
                SetSelectedMenuItem(3);

                var isDuplicate = false;
                $.each(MyRecOffice.SolutionSets, function (index, value) {
                    if ((MyRecOffice.CurSolutionSet.BusinessNeed.Name == value.BusinessNeed.Name) && (MyRecOffice.CurSolutionSet.FunctionalNeed.Name == value.FunctionalNeed.Name)) {
                        // if both are true this is a duplicate solution set
                        isDuplicate = true;
                    }
                });

                if (isDuplicate) {
                    $(".ro-saveset .ro-saveconfirm").show();
                    $(".ro-saveset a.selectbtn.greenbtn").hide();
                    $(".ro-saveset .ro-saveconfirm").html('<h3 style="color:#333;">Solution Set Saved!</h3>');
                }
            });
        }
    }

    // add the config obj to the widget
    function appendUserSel() {
        RecOfficeConfig.setupUserSel = setupUserSel;
    }

    function ROConfirm(htmlMessage, confirmBtnText, confirmCallback, rejectBtnText, rejectCallback) {
        $(".ro-dialog-wrap a.ro-formbutton").unbind();
        $(".ro-dialog-wrap .ro-alert").hide();
        $(".ro-dialog-wrap .ro-confirm").show();

        // replace content 
        $(".ro-dialog-wrap .ro-confirm .ro-dialog-content").html(htmlMessage);

        $(".ro-dialog-wrap .ro-confirm .ro-formbutton").text(rejectBtnText);
        $(".ro-dialog-wrap .ro-confirm .ro-formbutton.ro-submitbtn").text(confirmBtnText);

        $(".ro-dialog-wrap").fadeIn();

        $(".ro-dialog-wrap .ro-confirm a.ro-formbutton").click(function (e) {
            e.preventDefault();

            if (getLinkTarget(this) == "Confirm") {
                if (typeof confirmCallback == "function") {
                    confirmCallback();
                }

            } else if (getLinkTarget(this) == "Reject") {
                if (typeof rejectCallback == "function") {
                    rejectCallback();
                }
            }

            ROCloseDialog();
        });
    }

    function ROAlert(htmlMessage, closeBtnText, closeButtonCallback) {
        $(".ro-dialog-wrap a.ro-formbutton").unbind();
        $(".ro-dialog-wrap .ro-alert").show();
        $(".ro-dialog-wrap .ro-confirm").hide();

        // replace content 
        $(".ro-dialog-wrap .ro-alert .ro-dialog-content").html(htmlMessage);
        $(".ro-dialog-wrap .ro-alert .ro-formbutton.ro-submitbtn").text(closeBtnText);

        $(".ro-dialog-wrap").fadeIn();

        $(".ro-dialog-wrap .ro-alert a.ro-formbutton").click(function (e) {
            e.preventDefault();

            if (getLinkTarget(this) == "Close") {
                if (typeof confirmCallback == "function") {
                    closeButtonCallback();
                }

            }

            ROCloseDialog();
        });
    }

    function SetSelectedMenuItem(selectedItem) {
        $('.ro-navitem').removeClass('active');

        $('.ro-navitem').each(function (index) {
            if (index == selectedItem) {
                $(this).addClass('active');
            }
        });
    }

    function ROCloseDialog() {
        $(".ro-dialog-wrap").fadeOut();
    }

    function insertQueryParam(key, value) {
        key = escape(key);
        value = escape(value);

        var kvp = document.location.search.substr(1).split('&');

        var i = kvp.length;
        var x;
        while (i--) {
            x = kvp[i].split('=');

            if (x[0] == key) {
                x[1] = value;
                kvp[i] = x.join('=');
                break;
            }
        }

        if (i < 0) {
            kvp[kvp.length] = [key, value].join('=');
        }

        document.location.href = window.location.href + kvp.join('&');
        //window.location.href = window.location.href + '#abc=123';
    }

    function AutoNavigate() {
        var qString = document.location.href.substring(document.location.href.indexOf('#') + 3).split('&');

        switch (qString.length) {
        case 1: // Organization
            var organization;
            $.each(wizardData.d.orgList, function (index, value) {

                if (value.OrganizationId == qString[0]) {

                    organization = value;
                    return;
                }
            });

            if (organization != null) {
                $("#RecommendedOfficeOverlay").overlay().load();
                MyRecOffice.Organization = organization;
                // build next pane
                RecOfficeConfig.buildAndSeekPane["BusinessNeed"]();

            }

            break;
        case 2: // Organization + business Need
            var organization;
            $.each(wizardData.d.orgList, function (index, value) {
                if (value.OrganizationId == qString[0]) {
                    organization = value;
                    return;
                }
            });

            if (organization != null) {
                $("#RecommendedOfficeOverlay").overlay().load();
                MyRecOffice.Organization = organization;
                // build next pane
                //RecOfficeConfig.buildAndSeekPane["BusinessNeed"]();

                var Businessneed;
                $.each(organization.BusinessNeeds, function (index, value) {
                    if (value.Name == qString[1]) {
                        Businessneed = value;
                        return;
                    }
                });

                if (Businessneed != null) {
                    MyRecOffice["CurSolutionSet"]["BusinessNeed"] = Businessneed;

                    var content1 = ich.BusinessNeeds(MyRecOffice["Organization"]);
                    buildNextPage(content1, function () {
                        var content2 = ich.FunctionalNeeds(MyRecOffice["CurSolutionSet"]["BusinessNeed"]);
                        buildNextPage(content2, function () {
                            seekToPage(2);
                        });
                    });

                }
            }

            break;
        case 3: //	Organization + business Need + functional need
            var organization;
            $.each(wizardData.d.orgList, function (index, value) {
                if (value.OrganizationId == qString[0]) {
                    organization = value;
                    return;
                }
            });

            if (organization != null) {
                $("#RecommendedOfficeOverlay").overlay().load();
                MyRecOffice.Organization = organization;

                var Businessneed;
                $.each(organization.BusinessNeeds, function (index, value) {
                    if (value.Name == qString[1]) {
                        Businessneed = value;
                        return;
                    }
                });

                if (Businessneed != null) {
                    MyRecOffice["CurSolutionSet"]["BusinessNeed"] = Businessneed;

                    var Functionalneed;
                    $.each(MyRecOffice["CurSolutionSet"]["BusinessNeed"]["FunctionalNeeds"], function (index, value) {
                        if (value.Name == qString[2]) {
                            Functionalneed = value;
                            return;
                        }
                    });

                    if (Functionalneed != null) {
                        MyRecOffice["CurSolutionSet"]["FunctionalNeed"] = Functionalneed;
                        var content1 = ich.BusinessNeeds(MyRecOffice["Organization"]);
                        buildNextPage(content1, function () {
                            var content2 = ich.FunctionalNeeds(MyRecOffice["CurSolutionSet"]["BusinessNeed"]);
                            buildNextPage(content2, function () {
                                var prodCount = MyRecOffice["CurSolutionSet"]["FunctionalNeed"]["Products"].length;
                                MyRecOffice["CurSolutionSet"]["FunctionalNeed"]["prodCount"] = prodCount;
                                MyRecOffice["CurSolutionSet"]["FunctionalNeed"]["OrgName"] = MyRecOffice["Organization"]["BreadcrumbName"];

                                if (MyRecOffice["Organization"]["Type"]) {
                                    MyRecOffice["CurSolutionSet"]["FunctionalNeed"]["Type"] = MyRecOffice["Organization"]["Type"];
                                }

                                var content3 = ich.SolutionSet(MyRecOffice["CurSolutionSet"]["FunctionalNeed"]);
                                buildNextPage(content3, function () {
                                    RecOfficeConfig.buildAndSeekPane["EmailShare"]();
                                    RecOfficeConfig.buildAndSeekPane["MyRecOffice"]();
                                    RecOfficeConfig.buildAndSeekPane["ViewProducts"]();
                                    RecOfficeConfig.buildAndSeekPane["ContactVertafore"]();

                                    seekToPage(3);
                                });
                            });
                        });
                        RecOfficeConfig.initPane.BusinessNeed();
                        RecOfficeConfig.initPane.FunctionalNeed();
                        RecOfficeConfig.setupUserSel.BusinessNeed();
                        RecOfficeConfig.setupUserSel.FunctionalNeed();
                        RecOfficeConfig.paneReady.BusinessNeed = true
                        RecOfficeConfig.paneReady.FunctionalNeed = true
                    }
                }
            }

            break;
        default: // error, clear query string
            document.location.href = "";
            break
        }

    }

})(jQuery182);