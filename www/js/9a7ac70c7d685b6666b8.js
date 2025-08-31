(window.webpackJsonp = window.webpackJsonp || []).push([
    [4], {
        "./app/component/MainMenu.js": function(e, a, n) {
            "use strict";
            n.r(a);
            var t = n("./node_modules/@babel/runtime/helpers/esm/extends.js"),
                r = n("./node_modules/prop-types/index.js"),
                o = n.n(r),
                i = n("./node_modules/react/index.js"),
                s = n.n(i),
                l = n("./node_modules/react-intl/lib/index.es.js"),
                c = n("./node_modules/react-router/es/index.js"),
                u = n("./node_modules/react-relay/classic.js"),
                d = n.n(u),
                m = n("./app/component/Icon.js");

            function p(e, a) {
                var n = a.config;
                return !n.disruption || n.disruption.showInfoButton ? s.a.createElement("button", {
                    className: "cursor-pointer disruption-info noborder",
                    onClick: e.toggleDisruptionInfo
                }, s.a.createElement(l.a, {
                    id: "disruptions",
                    defaultMessage: "Disruptions"
                }), e.root && e.root.alerts && e.root.alerts.length > 0 && s.a.createElement(m.a, {
                    img: "icon-icon_caution",
                    className: "disruption-info"
                })) : null
            }
            p.propTypes = {
                toggleDisruptionInfo: o.a.func.isRequired,
                root: o.a.shape({
                    alerts: o.a.array
                })
            }, p.defaultProps = {
                root: {
                    alerts: []
                }
            }, p.contextTypes = {
                config: o.a.object.isRequired
            };
            var f = d.a.createContainer(p, {
                    fragments: {
                        root: function() {
                            return {
                                children: [{
                                    calls: [{
                                        kind: "Call",
                                        metadata: {},
                                        name: "feeds",
                                        value: {
                                            kind: "CallVariable",
                                            callVariableName: "feedIds"
                                        }
                                    }],
                                    children: [{
                                        fieldName: "id",
                                        kind: "Field",
                                        metadata: {
                                            isRequisite: !0
                                        },
                                        type: "ID"
                                    }],
                                    fieldName: "alerts",
                                    kind: "Field",
                                    metadata: {
                                        canHaveSubselections: !0,
                                        inferredRootCallName: "node",
                                        inferredPrimaryKey: "id",
                                        isPlural: !0
                                    },
                                    type: "Alert"
                                }],
                                id: d.a.QL.__id(),
                                kind: "Fragment",
                                metadata: {},
                                name: "DisruptionInfoButton_RootRelayQL",
                                type: "Query"
                            }
                        }
                    },
                    initialVariables: {
                        feedIds: null
                    }
                }),
                g = n("./app/util/browser.js");

            function b(e, a) {
                var n = a.router,
                    r = a.location,
                    o = a.config.feedIds;
                if (g.c) {
                    var i = function() {
                        n.push(Object(t.a)({}, r, {
                            state: Object(t.a)({}, r.state, {
                                disruptionInfoOpen: !0
                            })
                        }))
                    };
                    return s.a.createElement(d.a.Renderer, {
                        Container: f,
                        forceFetch: !0,
                        queryConfig: {
                            name: "ViewerRoute",
                            queries: {
                                root: function(e, a) {
                                    return n = e.getFragment("root", a), {
                                        children: [].concat.apply([], [d.a.QL.__frag(n)]),
                                        fieldName: "viewer",
                                        kind: "Query",
                                        metadata: {},
                                        name: "DisruptionInfoButtonContainer",
                                        type: "Query"
                                    };
                                    var n
                                }
                            },
                            params: {
                                feedIds: o
                            }
                        },
                        environment: d.a.Store,
                        render: function(e) {
                            var a = e.renderProps,
                                n = e.props;
                            return s.a.createElement(f, Object.assign({}, a, n, {
                                toggleDisruptionInfo: i
                            }))
                        }
                    })
                }
                return s.a.createElement("div", null)
            }
            b.contextTypes = {
                router: c.routerShape.isRequired,
                location: c.locationShape.isRequired,
                config: o.a.shape({
                    feedIds: o.a.arrayOf(o.a.string.isRequired)
                }).isRequired
            };
            var v = b,
                h = n("./app/component/LangSelect.js"),
                E = n("./node_modules/fluxible-addons-react/connectToStores.js"),
                y = n.n(E),
                k = n("./app/component/ComponentUsageExample.js"),
                j = n("./app/component/FooterItem.js"),
                R = function(e) {
                    var a = e.content,
                        n = e.currentLanguage;
                    return s.a.createElement("div", {
                        id: "page-m-footer"
                    }, a.map((function(e) {
                        return function(e, a) {
                            return e.languages && e.languages.length && !e.languages.includes(a) ? null : 0 === Object.keys(e).length ? s.a.createElement("span", {
                                key: "separator"
                            }) : s.a.createElement("div", {
                                key: e.label || e.name,
                                className: "offcanvas-section"
                            }, s.a.createElement(j.a, e))
                        }(e, n)
                    })))
                };
            R.propTypes = {
                currentLanguage: o.a.string.isRequired,
                content: o.a.arrayOf(o.a.shape(j.a.propTypes))
            }, R.defaultProps = {
                content: []
            }, R.description = function() {
                return s.a.createElement("div", null, s.a.createElement("p", null, "Main menu links for mobile display"), s.a.createElement(k.a, {
                    description: ""
                }, s.a.createElement(R, {
                    currentLanguage: "en",
                    content: [{
                        name: "Feedback",
                        icon: "icon-icon_speech-bubble",
                        route: "/"
                    }, {}, {
                        name: "Print",
                        icon: "icon-icon_print",
                        route: "/"
                    }, {}, {
                        name: "Home",
                        icon: "icon-icon_place",
                        route: "/"
                    }]
                })))
            };
            var N = y()(R, ["PreferencesStore"], (function(e) {
                return {
                    currentLanguage: e.getStore("PreferencesStore").getLanguage()
                }
            }));

            function q(e, a) // ...existing code...
{
    var n = a.config,
        r = a.intl,
        o = a.router,
        i = a.location;
    return s.a.createElement("div", {
        "aria-hidden": !e.visible,
        className: "main-menu no-select"
    }, 
    s.a.createElement("button", {
        onClick: e.toggleVisibility,
        className: "close-button cursor-pointer",
        "aria-label": r.formatMessage({
            id: "main-menu-label-close",
            defaultMessage: "Close the main menu"
        })
    }, s.a.createElement(m.a, {
        img: "icon-icon_close",
        className: "medium"
    })), 
    s.a.createElement("header", {
        className: "offcanvas-section"
    }, s.a.createElement(h.b, null)), 
    s.a.createElement("div", {
        className: "offcanvas-section"
    }, s.a.createElement(c.Link, {
        id: "frontpage",
        to: e.homeUrl
    }, s.a.createElement(l.a, {
        id: "frontpage",
        defaultMessage: "Frontpage"
    }))), 
    n.mainMenu.showDisruptions && e.showDisruptionInfo && s.a.createElement("div", {
        className: "offcanvas-section"
    }, s.a.createElement(v, null)), 
    // Removed "Other transportation" button and related content here
    s.a.createElement("div", {
        className: "offcanvas-section"
    }, s.a.createElement("button", {
        className: "noborder button cursor-pointer",
        onClick: function() {
            o.push(Object(t.a)({}, i, {
                state: Object(t.a)({}, i.state, {
                    navbarLinksOpen: !0
                })
            }))
        },
        "aria-label": r.formatMessage({
            id: "links",
            defaultMessage: "Data Sources"
        })
    }, s.a.createElement(l.a, {
        id: "links",
        defaultMessage: "Data Sources"
    }))), 
    s.a.createElement(N, {
        content: ([n.appBarLink].concat(n.footer && n.footer.content) || []).filter((function(e) {
            return e.href || e.route
        }))
    }),
    // Disclaimer text at the end
    s.a.createElement("div", {
        className: "offcanvas-section disclaimer",
        style: { fontSize: "8px" } // Set your desired font size here
    }, "Disclaimer: This is not an official app. It does not represent Oulu Liikenteen.")
    )
}
// ...existing
            q.propTypes = {
                showDisruptionInfo: o.a.bool,
                toggleVisibility: o.a.func.isRequired,
                visible: o.a.bool,
                homeUrl: o.a.string.isRequired
            }, q.defaultProps = {
                visible: !0
            }, q.contextTypes = {
                getStore: o.a.func.isRequired,
                config: o.a.object.isRequired,
                intl: l.d.isRequired,
                router: c.routerShape.isRequired,
                location: c.locationShape.isRequired
            };
            a.default = q
        }
    }
]);
//# sourceMappingURL=9a7ac70c7d685b6666b8.js.map