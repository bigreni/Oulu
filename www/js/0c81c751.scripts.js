function naturalSort(a, b) {
    var c, d, e = /(^-?[0-9]+(\.?[0-9]*)[df]?e?[0-9]?$|^0x[0-9a-f]+$|[0-9]+)/gi,
        f = /(^[ ]*|[ ]*$)/g,
        g = /(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[\/\-]\d{1,4}[\/\-]\d{1,4}|^\w+, \w+ \d+, \d{4})/,
        h = /^0x[0-9a-f]+$/i,
        i = /^0/,
        j = function(a) {
            return naturalSort.insensitive && ("" + a).toLowerCase() || "" + a
        },
        k = j(a).replace(f, "") || "",
        l = j(b).replace(f, "") || "",
        m = k.replace(e, "\0$1\0").replace(/\0$/, "").replace(/^\0/, "").split("\0"),
        n = l.replace(e, "\0$1\0").replace(/\0$/, "").replace(/^\0/, "").split("\0"),
        o = parseInt(k.match(h)) || 1 != m.length && k.match(g) && Date.parse(k),
        p = parseInt(l.match(h)) || o && l.match(g) && Date.parse(l) || null;
    if (p) {
        if (o < p) return -1;
        if (o > p) return 1
    }
    for (var q = 0, r = Math.max(m.length, n.length); q < r; q++) {
        if (c = !(m[q] || "").match(i) && parseFloat(m[q]) || m[q] || 0, d = !(n[q] || "").match(i) && parseFloat(n[q]) || n[q] || 0, isNaN(c) !== isNaN(d)) return isNaN(c) ? 1 : -1;
        if (typeof c != typeof d && (c += "", d += ""), c < d) return -1;
        if (c > d) return 1
    }
    return 0
}

function $buo_f() {
    var a = document.createElement("script");
    a.src = "//browser-update.org/update.js", document.body.appendChild(a)
}! function() {
    "use strict";
    angular.module("jakdojadeWebApp", ["concat-html", "services.config", "ngCookies", "ngResource", "ngAnimate", "ngSanitize", "ngRoute", "ngTouchstart", "ui.bootstrap", "leaflet-directive", "scheduleModule", "mapModule", "pascalprecht.translate", "pasvaz.bindonce", "snap"]).config(["$routeProvider", "$httpProvider", "$translateProvider", "snapRemoteProvider", "$animateProvider", "RegisteredLanguagesProvider", function(a, b, c, d, e, f) {
        e.classNameFilter(/angular-animate/), b.defaults.useXDomain = !0, delete b.defaults.headers.common["X-Requested-With"], c.useStaticFilesLoader({
            prefix: "https://jl.oulunliikenne.fi/scripts/translations/translation-",
            suffix: ".json"
        }).registerAvailableLanguageKeys(["en", "pl", "fi", "sv", "no", "es"], {
            en_US: "en",
            en_UK: "en",
            "pl-PL": "pl",
            pl_PL: "pl",
            fi: "fi",
            sv: "sv",
            "sv-fi": "sv",
            "sv-se": "sv",
            nb: "no",
            "nb-no": "no",
            "nn-no": "no",
            nn: "no",
            no: "no",
            es: "es",
            es_ES: "es",
            es_es: "es"
        }).determinePreferredLanguage(function() {
            var a, b;
            return a = void 0 === window.navigator.language ? window.navigator.browserLanguage : window.navigator.language, b = "pl" === a.substring(0, 2) ? "pl" : "en" == a.substring(0, 2) ? "en" : "fi" == a.substring(0, 2) ? "fi" : "sv" == a.substring(0, 2) ? "sv" : "no" == a.substring(0, 2) ? "no" : "nb" == a.substring(0, 2) ? "no" : "nn" == a.substring(0, 2) ? "no" : "nb-no" == a.substring(0, 2) ? "no" : "nn-no" == a.substring(0, 2) ? "no" : "es" == a.substring(0, 2) ? "es" : "en"
        });
        var g = ["pl", "pl_PL", "fi", "en", "sv", "sv-fi", "sv-se", "nb", "nb-no", "nn-no", "nn", "no", "es"];
        f.registerLanguages(g), a.when("/", {
            redirectTo: "/schedules/home"
        }).when("/schedules/:value", {
            templateUrl: "components/main.html",
            controller: "RouteCtrl",
            reloadOnSearch: !1
        }).otherwise({
            redirectTo: "/"
        }), d.globalOptions = {
            disable: "left",
            maxPosition: 372,
            minPosition: -372,
            touchToDrag: !0
        }
    }]).run(["$http", "$route", "$rootScope", "$location", function(a, b, c, d) {
        var e = d.path;
        d.path = function(a, f) {
            if (f === !1) var g = b.current,
                h = c.$on("$locationChangeSuccess", function() {
                    b.current = g, h()
                });
            return e.apply(d, [a])
        }
    }])
}(), angular.module("scheduleModule", []),
    function() {
        angular.module("jakdojadeWebApp").directive("windowFocus", ["$timeout", function(a) {
            return function(b) {
                var c, d;
                ifvisible.on("blur", function() {
                    c = a(function() {
                        d = !0, b.$broadcast("windowInactive")
                    }, 1e4)
                }), ifvisible.on("focus", function() {
                    a.cancel(c), d === !0 && (d = !1, b.$broadcast("windowActive"))
                })
            }
        }])
    }(),
    function() {
        "use strict";
        angular.module("angular-loading-bar", ["cfp.loadingBarInterceptor"]), angular.module("chieffancypants.loadingBar", ["cfp.loadingBarInterceptor"]), angular.module("cfp.loadingBarInterceptor", ["cfp.loadingBar"]).config(["$httpProvider", function(a) {
            var b = ["$q", "$cacheFactory", "$timeout", "$rootScope", "cfpLoadingBar", function(b, c, d, e, f) {
                function g() {
                    d.cancel(i), f.complete(), k = 0, j = 0
                }

                function h(b) {
                    var d, e = c.get("$http"),
                        f = a.defaults;
                    !b.cache && !f.cache || b.cache === !1 || "GET" !== b.method && "JSONP" !== b.method || (d = angular.isObject(b.cache) ? b.cache : angular.isObject(f.cache) ? f.cache : e);
                    var g = void 0 !== d && void 0 !== d.get(b.url);
                    return void 0 !== b.cached && g !== b.cached ? b.cached : (b.cached = g, g)
                }
                var i, j = 0,
                    k = 0,
                    l = f.latencyThreshold;
                return {
                    request: function(a) {
                        return a.ignoreLoadingBar || h(a) || (e.$broadcast("cfpLoadingBar:loading", {
                            url: a.url
                        }), 0 === j && (i = d(function() {
                            f.start()
                        }, l)), j++, f.set(k / j)), a
                    },
                    response: function(a) {
                        return a.config.ignoreLoadingBar || h(a.config) || (k++, e.$broadcast("cfpLoadingBar:loaded", {
                            url: a.config.url
                        }), k >= j ? g() : f.set(k / j)), a
                    },
                    responseError: function(a) {
                        return a.config.ignoreLoadingBar || h(a.config) || (k++, e.$broadcast("cfpLoadingBar:loaded", {
                            url: a.config.url
                        }), k >= j ? g() : f.set(k / j)), b.reject(a)
                    }
                }
            }];
            a.interceptors.push(b)
        }]), angular.module("cfp.loadingBar", []).provider("cfpLoadingBar", function() {
            this.includeSpinner = !0, this.includeBar = !0, this.latencyThreshold = 100, this.startSize = .02, this.parentSelector = "body", this.spinnerTemplate = '<div id="loading-bar-spinner"><div class="spinner-icon"></div></div>', this.loadingBarTemplate = '<div id="loading-bar"><div class="bar"><div class="peg"></div></div></div>', this.$get = ["$injector", "$document", "$timeout", "$rootScope", function(a, b, c, d) {
                function e() {
                    k || (k = a.get("$animate"));
                    var e = b.find(n).eq(0);
                    c.cancel(m), r || (d.$broadcast("cfpLoadingBar:started"), r = !0, u && k.enter(o, e), t && k.enter(q, e), f(v))
                }

                function f(a) {
                    if (r) {
                        var b = 100 * a + "%";
                        p.css("width", b), s = a, c.cancel(l), l = c(function() {
                            g()
                        }, 250)
                    }
                }

                function g() {
                    if (!(h() >= 1)) {
                        var a = 0,
                            b = h();
                        a = b >= 0 && b < .25 ? (3 * Math.random() + 3) / 100 : b >= .25 && b < .65 ? 3 * Math.random() / 100 : b >= .65 && b < .9 ? 2 * Math.random() / 100 : b >= .9 && b < .99 ? .005 : 0;
                        var c = h() + a;
                        f(c)
                    }
                }

                function h() {
                    return s
                }

                function i() {
                    s = 0, r = !1
                }

                function j() {
                    k || (k = a.get("$animate")), d.$broadcast("cfpLoadingBar:completed"), f(1), c.cancel(m), m = c(function() {
                        var a = k.leave(o, i);
                        a && a.then && a.then(i), k.leave(q)
                    }, 500)
                }
                var k, l, m, n = this.parentSelector,
                    o = angular.element(this.loadingBarTemplate),
                    p = o.find("div").eq(0),
                    q = angular.element(this.spinnerTemplate),
                    r = !1,
                    s = 0,
                    t = this.includeSpinner,
                    u = this.includeBar,
                    v = this.startSize;
                return {
                    start: e,
                    set: f,
                    status: h,
                    inc: g,
                    complete: j,
                    includeSpinner: this.includeSpinner,
                    latencyThreshold: this.latencyThreshold,
                    parentSelector: this.parentSelector,
                    startSize: this.startSize
                }
            }]
        })
    }(), angular.module("ngTouchstart", []).directive("ngTouchstart", function() {
        return {
            controller: ["$scope", "$element", "$attrs", function($scope, $element, $attrs) {
                function onTouchStart(event) {
                    var method = "$scope." + $element.attr("ng-touchstart");
                    $scope.$apply(function() {
                        eval(method)
                    })
                }
                $element.bind("touchstart", onTouchStart)
            }]
        }
    }), angular.module("services.config", []).constant("configuration", {
        city: '{"citySymbol":"OULU","cityName":"Oulu","apiURL":"https://jl.oulunliikenne.fi/api/web/v1/","mapLink":{"name":"Oulunliikenne.fi","link":"http://Oulunliikenne.fi/","infoLink":""},"schedules":{"linesStopsLocalStorage":"linesOrStops_v1.0-oulu"},"departures":{"stopIcon":{"options":{"className":"departures-stop-marker","iconSize":"null","iconAnchor":[7,7],"zIndexOffset":1000}},"vehicleIcon":{"options":{"iconUrl":"https://jl.oulunliikenne.fi/images/fara_departures_icons/realtime_marker_icon_BUS.png","iconSize":"null","iconAnchor":[34,60],"zIndexOffset":9999},"markerType":"animatedMarker"},"vehicleReverseIcon":{"options":{"iconUrl":"images/fara_departures_icons/realtime_marker_icon_BUS.png","iconSize":"null","iconAnchor":[34,60],"zIndexOffset":9999},"popupOptions":{"offset":[0,-40]}},"waterTramIcon":{"options":{"iconUrl":"images/fara_departures_icons/realtime_marker_icon_WATER_TRAM.png","iconSize":"null","iconAnchor":[34,60],"zIndexOffset":9999},"markerType":"animatedMarker"},"vehiclePopupIcon":{"options":{"className":"departures-vehicle-popup-marker-fara","iconAnchor":[-26,46],"zIndexOffset":9999}}},"stopLayers":{"grouped":false}}'
    }), angular.module("concat-html", ["components/change-city/change-city.html", "components/cookies-popup/cookies-popup.html", "components/main.html", "components/map/map.html", "components/schedule/back-button/back-button.html", "components/schedule/departures/departures-table/departures-table.html", "components/schedule/departures/direction-selection/stop-directions.html", "components/schedule/departures/line-selection/departures-line-selection.html", "components/schedule/departures/main-view/main-departures-view.html", "components/schedule/departures/stop-name/departures-stop-name.html", "components/schedule/departures/timetable/timetable.html", "components/schedule/hint-panel/city-lines/city-lines.html", "components/schedule/hint-panel/hint-panel-header/hint-panel-header.html", "components/schedule/hint-panel/main-view/hint-panel.html", "components/schedule/hint-panel/search-results/search-results.html", "components/schedule/selected-line/line-graph/line-graph.html", "components/schedule/selected-line/main-view/selected-line-panel.html", "components/schedule/selected-line/toggle-line-direction/toggle-line-direction.html", "components/schedule/shared/time-selection/time-selection.html", "components/schedule/sidebar/sidebar.html", "components/schedule/special-messages/special-messages.html"]), angular.module("components/change-city/change-city.html", []).run(["$templateCache", function(a) {
        a.put("components/change-city/change-city.html", '<div class="dropdown">\n    <a class="change-city-btn arrows dropdown-toggle" on-toggle="toggled(open)" title="ZmieÅ„ miasto">\n        <span >{{dropdownSelectedCity | translate}}</span>\n        <span class="icon"></span>\n    </a>\n\n    <ul class="dropdown-menu city-list" role="menu">\n        <li class="item" ng-repeat="city in cities">\n            <a ng-click="changeSelectedCity(city.cityName)">\n                {{city.cityName | translate}}\n            </a>\n        </li>\n    </ul>\n\n    <select id="select-city" class="change-city-select"\n            ng-model="selectBoxCity.name"\n            ng-options="city.cityName as (city.cityName | translate) for city in cities"\n            ng-change="changeSelectedCity(selectBoxCity.name)">\n    </select>\n</div>')
    }]), angular.module("components/cookies-popup/cookies-popup.html", []).run(["$templateCache", function(a) {
        a.put("components/cookies-popup/cookies-popup.html", '')
    }]), angular.module("components/main.html", []).run(["$templateCache", function(a) {
        a.put("components/main.html", '<div ng-controller="ModuleCommunicatorCtrl" window-focus>\n  <div id="main" class="change-city" ng-controller="ChangeCityCtrl" ng-include src="\'components/change-city/change-city.html\'" style="display: none;"></div>\n\n  <section id="container" class="fw" resize ng-style="container()">\n    <sidebar></sidebar>\n    <leaflet-map></leaflet-map>\n    <cookies-popup is-cookies-popup-visible="views.isCookiesPopupVisible"></cookies-popup>\n  </section>\n</div>\n')
    }]), angular.module("components/map/map.html", []).run(["$templateCache", function(a) {
        a.put("components/map/map.html", '<div class="map-wrapper" ng-controller="MapCtrl" map-buttons-position>\n\n    \n\n    <div id="map-stop-button" ng-class="{\'stops-button\': stopsButtonActive == false, \'stops-button-click\': stopsButtonActive == true, \'hidden-content\': views.hideInteractiveElements}" ng-click="showStops()">\n        <span translate>{{\'map.stops\'}}</span>\n    </div>\n    <div id="map-location-button" ng-class="{\'location-button\': locationButtonActive == false, \'location-button-selected\': locationButtonActive == true, \'hidden-content\': views.hideInteractiveElements}"\n         ng-click="showLocationOnly()"></div>\n    <div id="info-button" ng-class="{\'info-button\': true, \'hidden-content\': views.hideInteractiveElements}">\n      <a class="info-link" href="{{ customerMapLink.infoLink }}" target="_blank"></a>\n    </div>\n\n    <leaflet id="#map" bounds="bounds" layers="layers" defaults="defaults" width="100%" height="100%"\n             center="center" paths="paths" markers="markers" event-broadcast="events" draw-line-route="" draw-stops-on-line-route=""\n             draw-stops="" user-location="" draw-departures="">\n    </leaflet>\n</div>\n\n\n')
    }]), angular.module("components/schedule/back-button/back-button.html", []).run(["$templateCache", function(a) {
        a.put("components/schedule/back-button/back-button.html", '<div class="get-back">\n  <a ng-click="onBackButton()">\n      <span class="arrow-back sprite"></span>\n      <span translate>{{\'global.backButton\'}}</span>\n  </a>\n</div>\n')
    }]), angular.module("components/schedule/departures/departures-table/departures-table.html", []).run(["$templateCache", function(a) {
        a.put("components/schedule/departures/departures-table/departures-table.html", '<table class="departures-table">\n  <tr class="row" ng-repeat="stop in departures | limitTo:20 track by stop.trackingValue" ng-hide="stop.isStopPassed === true">\n    <td class="arrival-time">\n      <div class="arrival-container">\n\n        <div class="arrival-cancelled-container" ng-if="stop.cancelled === true"></div>\n\n        <div ng-class="{\'arrival-wrapper\': true, \'arrival-cancelled\': stop.cancelled === true}">\n          <div class="time-minute-live-container" ng-hide="stop.staysAtStop === true && stop.minutesToArrival === \'00\' ">\n            <span class="time">{{stop.minutesToArrival}}</span>\n\n            <div class="live-minute-container" ng-if="stop.isToday !== false">\n              <span ng-show="stop.isRealtimeEnabled" class="live">LIVE</span>\n              <span class="minutes-hours" ng-show="stop.minutesOrHours == \'minutes\'"\n                  translate="selectedStop.arrivalMinute"></span>\n              <span class="minutes-hours" ng-show="stop.minutesOrHours == \'hours\'"\n                  translate="selectedStop.arrivalHour"></span>\n            </div>\n          </div>\n\n          <div class="close-to-arrival" ng-show="stop.staysAtStop === true && stop.minutesToArrival === \'00\'"></div>\n        </div>\n      </div>\n    </td>\n    <td class="transport-info">\n      <div class="transport-info-container">\n        <table class="line-arrow-direction">\n          <tr>\n            <td class="line" valign="middle">{{stop.lineName}}</td>\n            <td><span class="sprite arrow"></span></td>\n            <td class="direction">{{(stop.lineDirectionName === stop.headingTextOverride) ? stop.lineDirectionName : stop.headingTextOverride }}</td>\n          </tr>\n        </table>\n        <div class="boarding-restriction no_entry" ng-if="stop.boardingRestriction === \'ONLY_OUT\'"><img src="https://jl.oulunliikenne.fi/images/no_entry.png" width="25" /></div>\n        <div class="boarding-restriction no_exit" ng-if="stop.boardingRestriction === \'ONLY_IN\'"><img src="https://jl.oulunliikenne.fi/images/no_exit.png" width="25" /></div>\n\n        <div class="time-and-delay old-realtime-version">\n            <div class="time-delay" ng-if="stop.isRealtimeEnabled">\n               <span ng-show="stop.predictedDelay == 0"\n                     class="delay"> + {{stop.predictedDelay}} min</span>\n               <span ng-show="stop.predictedDelay > 0"\n                     class="no-delay"> - {{stop.predictedDelay}} min</span>\n               <span ng-show="stop.predictedDelay < 0" class="delay"> + {{stop.predictedDelay.toString().substring(1,3)}} min</span>\n            </div>\n            <span class="time">{{stop.departure}}</span>\n        </div>\n\n        <div class="time-and-delay new-realtime-version">\n          <div class="time new-realtime-version" ng-if="!stop.isRealtimeEnabled">\n            <span style="line-height: 14px; padding-left: 10px;">{{stop.departure}}</span>\n          </div>\n          <div class="time" ng-if="stop.isRealtimeEnabled">\n            <div class="real-time__icon"></div>\n            <span style="line-height: 14px; padding-left: 12px;">{{stop.departureRealtime}}</span>\n          </div>\n        </div>\n\n      </div>\n      <br/>\n\n      <table class="journey-message" ng-show="stop.journeyMessage || stop.cancelled === true">\n        <td class="line-journey-message">\n          <span ng-show="stop.journeyMessage && stop.cancelled === false" ng-bind-html="stop.journeyMessage"></span>\n          <span ng-show="stop.cancelled === true" translate="selectedStop.cancelled"></span>\n        </td>\n        <td><span class="line-journey-bell sprite"></span></td>\n      </table>\n    </td>\n  </tr>\n</table>\n')
    }]), angular.module("components/schedule/departures/direction-selection/stop-directions.html", []).run(["$templateCache", function(a) {
        a.put("components/schedule/departures/direction-selection/stop-directions.html", '<div class="stop-choice">\n  <div ng-click="toggleStopsDirectionsView()" style="cursor: pointer">\n    <span translate>{{"selectedStop.stopSelection"}}</span>\n    <a><span class="down-arrow sprite"></span></a>\n  </div>\n  <div ng-show="isStopDirectionsPanelVisible">\n    <form name="stops-group" class="stops-directions">\n      <div ng-repeat="stops in directions | limitTo: stopsDirectionLimit">\n        <input type="radio" id="stops.stopCode{{$index}}" ng-click="selectStop($event, stops)"\n               name="selected-stop-directions" radio-select-active-city stop-code="{{stops.stopCode}}"/>\n        <label for="stops.stopCode{{$index}}" title="{{\'selectedStop.changeDirection\' | translate}}">\n          <span class="direction">{{stops.nextStopName}}</span>\n        </label>\n      </div>\n    </form>\n    <span class="direction-more-button" ng-show="isMoreDirectionsButtonVisible" ng-click="showMoreDirections()"\n          translate>{{\'selectedStop.showMoreDirections\'}}</span>\n    <span class="direction-more-button" ng-show="isHideDirectionButtonVisible" ng-click="hideMoreDirections()"\n          translate>{{\'selectedStop.hideAdditionalDirections\'}}</span>\n  </div>\n</div>\n')
    }]), angular.module("components/schedule/departures/line-selection/departures-line-selection.html", []).run(["$templateCache", function(a) {
        a.put("components/schedule/departures/line-selection/departures-line-selection.html", '<div class="line-choice">\n  <span translate>{{"selectedStop.lineSelection"}}</span>\n  <div class="departures-lines">\n    <span style="display: inline;" ng-repeat="line in lines | limitTo:linesLimit track by $index" class="angular-animate-repeat-animation">\n       <span ng-class="{selected:line.isLineSelected == true}" class="departure-line">\n          <a ng-click="selectLine(line)">{{line.lineName}}</a>\n        </span>\n      <span class="departure-line more-lines" style="cursor:pointer" ng-show="lines.length > 9 && $last" ng-click="showMoreLinesButton()">\n        ...\n      </span>\n    </span>\n  </div>\n</div>\n\n')
    }]), angular.module("components/schedule/departures/main-view/main-departures-view.html", []).run(["$templateCache", function(a) {
        a.put("components/schedule/departures/main-view/main-departures-view.html", '<div class="selected-stop-panel angular-animate-if" id="departures-view">\n\n  <div class="top-selected-stop-wrapper">\n    <back-button ng-class="{\'hidden-content\': views.hideInteractiveElements}"></back-button>\n    <departures-stop-name name="selectedStop.stopName"></departures-stop-name>\n  </div>\n\n  <special-messages messages="selectedStop.stopsAlerts"></special-messages>\n\n  <div ng-class="{\'stop-line-choice\':true, \'hidden-content\': views.hideInteractiveElements}">\n    <!--<stop-directions directions="selectedStop.stopsGroup"  service="SelectedStopService" ng-show="selectedStop.stopsGroup.length > 1"></stop-directions>-->\n    <departures-line-selection lines="selectedStop.stopLines" service="SelectedStopService"></departures-line-selection>\n  </div>\n\n  <hr />\n  <time-selection-panel ng-show="showTimeSelectionPanel"></time-selection-panel>\n\n  <special-messages messages="selectedStop.linesAlerts"></special-messages>\n\n  <div animate-tables>\n    <draw-departures-table departures="selectedStop.departures" ng-show="selectedStop.isDeparturesTableVisible"></draw-departures-table>\n    <draw-timetable timetable="selectedStop.timetable" ng-show="selectedStop.isTimetableVisible"></draw-timetable>\n  </div>\n\n</div>\n')
    }]), angular.module("components/schedule/departures/stop-name/departures-stop-name.html", []).run(["$templateCache", function(a) {
        a.put("components/schedule/departures/stop-name/departures-stop-name.html", '<div class="stop-name-wrapper">\n  <span class="stop-icon sprite"></span>\n\n  <div class="stop-name"><p>{{name}}</p></div>\n</div>\n')
    }]), angular.module("components/schedule/departures/timetable/timetable.html", []).run(["$templateCache", function(a) {
        a.put("components/schedule/departures/timetable/timetable.html", '<div class="timetable">\n  <table ng-bind-html="timetable"></table>\n</div>\n')
    }]), angular.module("components/schedule/hint-panel/city-lines/city-lines.html", []).run(["$templateCache", function(a) {
        a.put("components/schedule/hint-panel/city-lines/city-lines.html", '<div class="transport-line">\n  <div bindonce ng-repeat="vehicle in vehicleTypes"\n       bo-class="vehicle.name + \' schedule-line\'">\n    <header>\n      <span bo-class="\'sprite \' + vehicle.name"></span>\n\n      <h3 ng-bind="vehicle.translatedName" translate></h3>\n    </header>\n\n    <div class="line-list" ng-controller="ScheduleLineListSizeCtrl">\n      <span bindonce ng-repeat="line in cityLines | filter: {vehicleType: vehicle.name} | removeDuplicates | limitTo: linesLimit" class="angular-animate-repeat-animation">\n         <span class="line">\n           <a ng-click="selectLine(line)" bo-text="line.lineName" title="{{\'hintPanel.showLineDetails\' | translate}}"></a>\n         </span>\n          <span class="line" ng-show="!isMoreButtonVisible(vehicle.name) && $last">\n            <a class="more" ng-click="toggleMoreLines()">\n              ...\n            </a>\n          </span>\n      </span>\n    </div>\n  </div>\n</div>\n')
    }]), angular.module("components/schedule/hint-panel/hint-panel-header/hint-panel-header.html", []).run(["$templateCache", function(a) {
        a.put("components/schedule/hint-panel/hint-panel-header/hint-panel-header.html", '<header class="sidebar-header" ng-click="headerClick($event)">\n  <h1 translate="hintPanel.schedule"></h1>\n\n  <div class="input-wrapper">\n    <form>\n      <input id="schedule-input" type="search" class="" translate-input-values placeholder="{{inputPlaceholder}}"\n             ng-click="inputClick($event)"\n             ng-change="inputChange()"\n             ng-focus="inputFocus($event)"\n             map-nearest-stop\n             ng-model="inputValue"\n        />\n\n      <a class="location" ng-click="locationClick()" title="{{inputShowLocation}}">\n        <span class="sprite"></span>\n      </a>\n    </form>\n  </div>\n</header>\n')
    }]), angular.module("components/schedule/hint-panel/main-view/hint-panel.html", []).run(["$templateCache", function(a) {
        a.put("components/schedule/hint-panel/main-view/hint-panel.html", '<div id="hint-panel" tabindex="0" keys-up-down scroll-element=".container" list-object="{{hintResult}}" class="angular-animate-show">\n\n        <hint-panel-header\n          header-click="blur"\n          input-value="inputValue"\n          input-click="showSearchHistory"\n          input-change="inputValueChange"\n          input-focus="focus"\n          location-click="establishLocationOnMap"\n          views="views">\n        </hint-panel-header>\n\n        <div ng-controller="ScheduleLinesCtrl" ng-show="views.showTransportLine">\n            <special-messages messages="globalMessages"></special-messages>\n\n            <city-lines vehicle-types="vehicleTypes" city-lines="cityLines" select-line="selectLine"></city-lines>\n        </div>\n\n        <div class="loading-panel" ng-show="loadingIcon">\n            <img src="../../../../images/loading-icon.gif" alt="loading-icon" />\n        </div>\n\n        <search-results ng-if="views.showSearch" hint-result="hintResult" select-line="selectLine" select-stop="selectStop"></search-results>\n\n        <div class="no-hint-result" ng-if="mapNoStopsFound" translate>{{\'hintPanel.noStopsFound\'}}</div>\n\n</div>\n')
    }]), angular.module("components/schedule/hint-panel/search-results/search-results.html", []).run(["$templateCache", function(a) {
        a.put("components/schedule/hint-panel/search-results/search-results.html", '<div ng-repeat="hint in hintResult track by $index">\n  <ul class="search-list">\n    <div class="line-search" ng-if="hint.lineOrStop == \'line\'">\n      <li>\n        <a ng-click="selectLine(hint)" ng-mouseenter="mouseEnter($index)"\n           title="{{\'hintPanel.showLineDetails\' | translate}}"\n           class="input-result"\n           click="selectLine">\n          <span class="{{hint.lineVehicleType || hint.vehicleType}} sprite"></span>\n          <span class="line">{{hint.lineName}}</span>\n          <span class="search-arrow sprite" ng-if="hint.lineDirection"></span>\n          <span class="last-station">{{hint.lineDirection}}</span>\n        </a>\n      </li>\n    </div>\n    <div class="stop-search" ng-if="hint.lineOrStop == \'stop\'">\n      <li>\n        <a ng-click="selectStop(hint)" title="{{\'hintPanel.showStopDetails\' | translate}}" class="input-result" click="selectStop"\n           ng-mouseenter="mouseEnter($index)">\n          <span class="station-bus-icon sprite"></span>\n                            <span class="station-name" ng-hide="hint.toNotMatchText" highlight-stop name="{{hint.stopName}}"\n                                  matched-text="{{hint.stopNameMatchedText}}">{{hint.stopName}}</span>\n          <span class="station-name" ng-if="hint.toNotMatchText">{{hint.stopName}}</span>\n          <span class="station-address">{{hint.stopStreetName}}</span>\n          <br/>\n          <span class="station-info" translate>{{\'hintPanel.lines\'}}</span>\n          <span class="station-info" ng-repeat="lines in hint.stopLines | stopLines">{{lines}}</span>\n          <span class="station-info" ng-if="showMoreLinesText"> {{\'hintPanel.moreLines\' | translate}} </span>\n        </a>\n      </li>\n    </div>\n    <!--<div class="no-hint-result" ng-if="resultCount == 0" translate>-->\n    <!--{{\'hintPanel.noMatchingResults\'}}-->\n    <!--</div>-->\n  </ul>\n</div>\n')
    }]), angular.module("components/schedule/selected-line/line-graph/line-graph.html", []).run(["$templateCache", function(a) {
        a.put("components/schedule/selected-line/line-graph/line-graph.html", '<div class="line-graph-panel">\n  <div ng-repeat="graph in graphs track by $index" class="line-graph" ng-click="listeners.clickStop(graph)" ng-mouseover="listeners.mouseOverStop(graph)"\n       ng-mouseleave="listeners.mouseLeaveStop(graph[0].index)" title="{{\'selectedLine.showStop\' | translate}}">\n    <a ng-class="{\'row-priority\': graph[0].stop.stopName || graph[1].stop.stopName}">\n                  <span ng-class="graph[0].stopIconType">\n                    <img ng-if="graph[0].stopIconType" ng-src="images/line-graphs/{{graph[0].stopIconType}}.png" class="img_{{graph[0].stopIconType}}"/>\n                    <span ng-if="graph[0].stop.stopName" class="stop_name" ng-bind="graph[0].stop.stopName"></span>\n                  </span>\n\n                  <span ng-class="graph[1].stopIconType">\n                    <img ng-if="graph[1].stopIconType" ng-src="https://jl.oulunliikenne.fi/images/line-graphs/{{graph[1].stopIconType}}.png" class="img_{{graph[1].stopIconType}}"/>\n                    <span ng-if="graph[1].stop.stopName" class="stop_name" ng-bind="graph[1].stop.stopName"></span>\n                  </span>\n    </a>\n  </div>\n</div>\n')
    }]), angular.module("components/schedule/selected-line/main-view/selected-line-panel.html", []).run(["$templateCache", function(a) {
        a.put("components/schedule/selected-line/main-view/selected-line-panel.html", '<div>\n    <div class="selected-line-upper-panel">\n        <back-button></back-button>\n\n        <div class="line-name-direction">\n            <span class="{{selectedLine.vehicleType}} sprite"></span>\n            <span class="line-number" line-directions-size>{{selectedLine.lineNumber}}</span>\n            <toggle-line-direction first-direction="selectedLine.startAndEndDirection[0]" last-direction="selectedLine.startAndEndDirection[1]"\n              button="selectedLine.showToggleButton" toggle-direction="toggleDirection"></toggle-line-direction>\n        </div>\n    </div>\n\n    <time-selection-panel></time-selection-panel>\n    <line-graph ng-show="views.showLineGraph" ng-controller="LineGraphCtrl" graphs="selectedLine.graphs" listeners="selectedLine.lineGraph.listeners"></line-graph>\n</div>\n')
    }]), angular.module("components/schedule/selected-line/toggle-line-direction/toggle-line-direction.html", []).run(["$templateCache", function(a) {
        a.put("components/schedule/selected-line/toggle-line-direction/toggle-line-direction.html", '<a ng-click="toggleDirection()" title="{{\'selectedLine.toggleDirection\' | translate}}" ng-show="button">\n  <span class="change-direction-button">\n    <span class="down-up-arrow sprite"></span>\n  </span>\n</a>\n<span class="direction">\n  <span class="start-direction">{{firstDirection}}</span><br>\n  <span class="end-direction">\n    <img src="https://jl.oulunliikenne.fi/images/sprites/search-arrow.png">\n    <span>{{lastDirection}}</span>\n  </span>\n</span>\n')
    }]), angular.module("components/schedule/shared/time-selection/time-selection.html", []).run(["$templateCache", function(a) {
        a.put("components/schedule/shared/time-selection/time-selection.html", '<div class="time-selection-panel">\n  <div ng-repeat="day in days">\n    <a ng-click="changeActiveDaysClass($index, day)" title="{{\'selectedLine.changeDay\' | translate}}">\n                   <span class="days" ng-show="{{$index < 3}}" ng-class="{active: $index == activeDaysClass, \'dates-center\': day.fullDate == undefined}">\n                       <span ng-if="day.fullDate" ng-bind="day.day" translate></span>\n                       <span ng-hide="day.fullDate">\n                         <span ng-bind="day.dayOfWeek" class="day-of-the-week" translate></span><br>\n                         <span ng-bind="day.day" translate></span>{{day.month}}\n                       </span>\n                   </span>\n    </a>\n  </div>\n\n  <a ng-click="arrowButtonEvent(\'left-button\')">\n                <span class="arrow-button left-button sprite {{leftArrow + \'_target\'}}">\n                  <span class="{{leftArrow}} sprite"></span>\n                </span>\n  </a>\n  <a ng-click="arrowButtonEvent(\'right-button\')">\n               <span class="arrow-button right-button sprite {{rightArrow + \'_target\'}}">\n                  <span class="{{rightArrow}} sprite"></span>\n               </span>\n  </a>\n</div>\n\n')
    }]), angular.module("components/schedule/sidebar/sidebar.html", []).run(["$templateCache", function(a) {
        a.put("components/schedule/sidebar/sidebar.html", '<span id="snap-content" snap-content toggle-sliding resize ng-style="sidebar()">\n    <aside id="cn-sidebar" resize ng-controller="SidebarCtrl"\n           ng-class="{true: \'open-panel\', false: \'close-panel\'}[views.sidebarIsVisible]">\n\n        <a ng-class="{\'handler-btn\': true, \'hidden-content\': views.hideInteractiveElements}" toggle-sidebar ios-change>\n            <span class="sprite icon-sidebar-handler"></span>\n        </a>\n\n        <div class="cn-container" resize ng-style="sidebar()">\n          <hint-panel ng-show="views.mainView"></hint-panel>\n\n          <departures-view ng-if="views.selectedStop"\n                           departures-location\n                           selected-stop-open-snap-content></departures-view>\n\n          <selected-line-view ng-if="views.selectedLine" class="angular-animate-if" line-stops-location>></selected-line-view>\n        </div>\n    </aside>\n</span>\n');
    }]), angular.module("components/schedule/special-messages/special-messages.html", []).run(["$templateCache", function(a) {
        a.put("components/schedule/special-messages/special-messages.html", '<table ng-class="{\'special-message\': true, \'special-message-line\': messages[0].alertType === \'linesAlerts\'}">\n    <tr ng-repeat="message in messages" title="{{message.messageTitle}}">\n        <td ng-class="{\'no-top-border\': $last && message.alertType === \'linesAlerts\'}">\n            <table>\n                <tr>\n                    <td ng-show="message.alertType === \'linesAlerts\'" class="message-line">\n                        {{message.lineName}}\n                        <span class="sprite arrow"></span>\n                    </td>\n                    <td class="message-text">\n                        <span ng-bind-html="message.messageHtml"></span> <br />\n                        <a ng-show="message.detailsUrl" href="{{message.detailsUrl}}" title="{{message.detailsUrl}}" target="_blank" translate>\n                            {{\'specialMessages.websiteLink\'}}\n                        </a>\n                    </td>\n                    <td>\n                        <div class="message-bell">\n                            <span class="sprite"></span>\n                        </div>\n                    </td>\n                </tr>\n            </table>\n        </td>\n    </tr>\n</table>\n\n')
    }]),
    function() {
        angular.module("jakdojadeWebApp").service("ObjectManager", ["configuration", function(a) {
            this.city = {
                citySymbol: JSON.parse(a.city).citySymbol,
                cityName: JSON.parse(a.city).cityName
            }, this.lines = [], this.selectedLine = {}, this.selectedLine.url = "", this.lineGraph = {}, this.lineGraphResponse = {}, this.selectedStop = {}, this.lineDirection = {}, this.lineShapes = {}, this.stopsCoordinates = {}, this.setCitySymbol = function(a) {}, this.setCityName = function(a) {}, this.setCityCoordinates = function(a) {
                void 0 !== a && (this.city.cityCoordinates = a)
            }, this.setLines = function(a) {
                void 0 !== a && (this.lines = a)
            }, this.setSelectedLine = function(a) {
                void 0 !== a && (this.selectedLine = a)
            }, this.setLineGraphResponse = function(a) {
                void 0 !== a && (this.lineGraphResponse = a)
            }, this.setSelectedLineUrl = function(a) {
                void 0 !== a && (this.selectedLine.url = a)
            }, this.setSelectedStop = function(a) {
                void 0 !== a && void 0 != a.coordinate && (a.stopCoordinate = a.coordinate), this.selectedStop = a
            }, this.setLineShapes = function(a) {
                void 0 !== a && (this.lineShapes = a)
            }, this.setSelectedLineStopsCoordinates = function(a) {
                void 0 !== a && (this.selectedLine.stopsCoordinates = a)
            }
        }])
    }(),
    function() {
        angular.module("jakdojadeWebApp").factory("SnapService", function() {
            return {
                getSnapper: function(a, b) {
                    var c, d, e = new Snap({
                        element: a
                    });
                    return b > 768 ? (c = 372, d = -372) : (c = 284, d = -284), e.settings({
                        disable: "left",
                        maxPosition: c,
                        minPosition: d,
                        touchToDrag: !0
                    }), e
                }
            }
        })
    }(),
    function() {
        angular.module("jakdojadeWebApp").factory("DetectMobileDevice", function() {
            return {
                isMobile: function() {
                    var a = {
                        Android: function() {
                            return navigator.userAgent.match(/Android/i)
                        },
                        BlackBerry: function() {
                            return navigator.userAgent.match(/BlackBerry/i)
                        },
                        iOS: function() {
                            return navigator.userAgent.match(/iPhone|iPad|iPod/i)
                        },
                        Opera: function() {
                            return navigator.userAgent.match(/Opera Mini/i)
                        },
                        Windows: function() {
                            return navigator.userAgent.match(/IEMobile/i)
                        },
                        any: function() {
                            return a.Android() || a.BlackBerry() || a.iOS() || a.Opera() || a.Windows()
                        }
                    };
                    return a.any()
                },
                isTouchScreen: function() {
                    try {
                        return document.createEvent("TouchEvent"), !0
                    } catch (a) {
                        return !1
                    }
                },
                isIos: function() {
                    if ("iPad" === navigator.platform || "iPhone" === navigator.platform) return !0
                }
            }
        })
    }(),
    function() {
        angular.module("jakdojadeWebApp").service("RealtimeManager", ["TimeSelectorService", "LocationService", function(a, b) {
            this.realtimeIds = [], this.realtimeIdsByStopPassed = [], this.vehicles = [], this.vehicleGroupedArray = [], this.setObservedLinesRealtimeIds = function(a) {
                this.realtimeIds = a
            }, this.setVehicles = function(b) {
                var c = new Date,
                    d = c.getSeconds();
                b.timeToNextUpdate = a.getUpdatedTime(c, d, b.secondsToNextUpdate), this.vehicles.push(b), this.vehicleGroupedArray.push(b)
            }, this.getRealtimeIdsByTimeToUpdate = function() {
                for (var b = [], c = a.getCurrentTime(), d = 0; d < this.vehicleGroupedArray.length; d++) void 0 !== this.vehicleGroupedArray[d] && this.vehicleGroupedArray[d].timeToNextUpdate - c <= 0 && (b.push(this.vehicleGroupedArray[d].realtimeId), delete this.vehicleGroupedArray[d]);
                return b
            }, this.getQueryPostObject = function(a, c, d) {
                for (var e = [], f = 0, g = a.length; f < g; f++) void 0 !== c[a[f]] ? e.push({
                    realtimeId: a[f],
                    lastLocationId: c[a[f]].lastLocationId,
                    bufferedSeconds: parseInt(c[a[f]].bufferedSeconds / 1e3),
                    predictionForStopCode: b.getURLValue("stopCode")
                }) : e.push({
                    realtimeId: a[f],
                    bufferedSeconds: 0,
                    predictionForStopCode: b.getURLValue("stopCode")
                });
                return {
                    citySymbol: d,
                    vehicles: e
                }
            }
        }])
    }(),
    function() {
        angular.module("jakdojadeWebApp").service("RealtimeBufferService", function() {
            var a = {},
                b = {};
            this.getVehiclesBuffer = function() {
                return a
            }, this.emptyVehiclesBuffer = function() {
                a = {}, b = {}
            }, this.removeFirstCoordinate = function(b) {
                a[b].splice(0, 1)
            }, this.removeVehicle = function(b) {
                delete a[b]
            }, this.setInfoForPostQuery = function(d) {
                b[d] = {}, b[d].lastLocationId = a[d][a[d].length - 1].locationId.toString(), b[d].bufferedSeconds = c(d)
            };
            var c = function(b) {
                for (var c = 0, d = 0, e = a[b].length; d < e; d++) c += a[b][d].delayMillis;
                return c
            };
            this.getBufferInfoForPostQuery = function() {
                return b
            }, this.updateBufferedSecondsForPostQuery = function(a, c) {
                void 0 !== b[a] && (b[a].bufferedSeconds >= c ? b[a].bufferedSeconds = b[a].bufferedSeconds - c : b[a].bufferedSeconds = 0)
            }, this.setVehiclesInfo = function(a) {
                d(a)
            };
            var d = function(a) {
                    for (var b = 0, c = a.length; b < c; b++) {
                        var d = a[b];
                        if (d.path)
                            for (var f = 0, g = d.path.length; f < g; f++) d.path[f].lineName = d.line.lineName, d.path[f].lineId = d.line.lineId, d.path[f].realtimeId = d.realtimeId, d.path[f].onPreviousCourse = void 0 !== d.onPreviousCourse && d.onPreviousCourse, d.path[f].vehicleType = d.line.vehicleType, void 0 !== d.stopPrediction ? d.path[f].stopPassed = d.stopPrediction.stopPassed : d.path[f].stopPassed = !1, e(d.realtimeId, d.path[f])
                    }
                },
                e = function(b, c) {
                    void 0 === a[b] && (a[b] = []), a[b].push(c)
                }
        })
    }(),
    function() {
        angular.module("jakdojadeWebApp").provider("RegisteredLanguages", function() {
            var a = [];
            return {
                registerLanguages: function(b) {
                    a = b
                },
                $get: function() {
                    return {
                        getAvailableLanguage: function(b) {
                            for (var c = "en", d = 0, e = a.length; d < e; d++) b === a[d] && (c = a[d]);
                            return c
                        }
                    }
                }
            }
        })
    }(),
    function() {
        angular.module("jakdojadeWebApp").controller("RouteCtrl", ["$scope", "$rootScope", "$route", "$timeout", "$translate", "RegisteredLanguages", "BackButtonService", "LocationService", "ObjectManager", function(a, b, c, d, e, f, g, h, i) {
            a.views = {}, a.views.hideInteractiveElements = !1, a.views.sidebarIsVisible = !0, a.views.isCookiesPopupVisible = !1, a.views.mainView = !0, a.views.selectedStop = !1, a.views.selectedLine = !1, a.views.showTransportLine = !0, a.views.showSearch = !1, a.views.selectedLine.showTimetable = !1, a.views.selectedLine.startAndEndDirection = [], a.views.showToggleButton = !0, a.hideAllViews = function() {
                a.views.mainView = !1, a.views.selectedStop = !1, a.views.selectedLine = !1, a.views.showTransportLine = !1, a.views.showSearch = !1
            };
            var j = i.city.citySymbol,
                k = h.getURLValue("lang"),
                l = h.getURLValue("lang"),
                m = h.getURLValue("zoom"),
                n = h.getURLValue("coordinates"),
                o = h.getURLValue("stopsLayer"),
                p = h.getURLValue("autoLocalization"),
                q = h.getURLValue("radar"),
                r = function() {
                    "true" === h.getURLValue("monitorPerspective") ? a.views.hideInteractiveElements = !0 : "false" === h.getURLValue("monitorPerspective") && (a.views.hideInteractiveElements = !1), h.setOptionalURL(h.getURLValue("monitorPerspective"), "monitorPerspective"), l = h.getURLValue("monitorPerspective")
                },
                s = function() {
                    var a = f.getAvailableLanguage(h.getURLValue("lang"));
                    h.setOptionalURL(h.getURLValue("lang"), "lang"), e.use(a), k = a
                },
                t = function(b) {
                    h.setOptionalURL(h.getURLValue("zoom"), "zoom"), m = h.getURLValue("zoom"), d(function() {
                        a.$broadcast("map.setZoom", h.getURLValue("zoom"))
                    }, b)
                },
                u = function(b) {
                    h.setOptionalURL(h.getURLValue("coordinates"), "coordinates"), n = h.getURLValue("coordinates"), d(function() {
                        a.$broadcast("map.setCoordinates", n)
                    }, b)
                },
                v = function(b) {
                    d(function() {
                        a.$broadcast("map.setLocation", h.getURLValue("autoLocalization")), p = h.getURLValue("autoLocalization")
                    }, b)
                },
                w = function(b) {
                    d(function() {
                        a.$broadcast("map.setLocation", h.getURLValue("radar")), q = h.getURLValue("radar")
                    }, b)
                },
                x = function(b) {
                    d(function() {
                        a.$broadcast("map.setStopsLayer", h.getURLValue("stopsLayer")), o = h.getURLValue("stopsLayer")
                    }, b)
                };
            a.$on("$routeChangeSuccess", function() {
                void 0 !== h.getURLValue("monitorPerspective") && r(), void 0 !== h.getURLValue("lang") && s(), void 0 !== h.getURLValue("zoom") && t(3e3), void 0 !== h.getURLValue("coordinates") && u(3e3), void 0 !== h.getURLValue("zoom") && t(2e3), "true" === h.getURLValue("autoLocalization") && v(1500), "true" === h.getURLValue("stopsLayer") && x(1e3), "true" === h.getURLValue("radar") && w(1500), "/schedules/lineStops" === h.getLocationPath() && (a.hideAllViews(), a.views.selectedLine = !0, a.views.showLineGraph = !0), "/schedules/timetable" === h.getLocationPath() && (a.hideAllViews(), a.views.selectedLine = !0, a.views.showLineGraph = !1, a.views.showTimetable = !0), "/schedules/departures" === h.getLocationPath() && (a.hideAllViews(), a.views.selectedStop = !0)
            }), a.$on("$locationChangeStart", function() {
                h.setLocationPath(h.getLocationPath()), b.actualLocation = h.getLocationPath()
            }), b.$watch(function() {
                return h.getLocationPath()
            }, function(a) {
                b.actualLocation === a && g.removeLastView()
            }), a.$on("$locationChangeSuccess", function(c) {
                if (h.getURLValue("zoom") !== m && (h.setOptionalURL(h.getURLValue("zoom"), "zoom"), m = h.getURLValue("zoom"), a.$broadcast("map.setZoom", h.getURLValue("zoom"))), h.getURLValue("coordinates") !== n && (h.setOptionalURL(h.getURLValue("coordinates"), "coordinates"), n = h.getURLValue("coordinates"), a.$broadcast("map.setCoordinates", n)), h.getURLValue("monitorPerspective") !== l && void 0 !== h.getURLValue("monitorPerspective") && ("true" === h.getURLValue("monitorPerspective") ? (a.views.hideInteractiveElements = !0, a.$broadcast("routeChange.hideZoomButtons")) : "false" === h.getURLValue("monitorPerspective") && (a.$broadcast("routeChange.showZoomButtons"), a.views.hideInteractiveElements = !1), h.setOptionalURL(h.getURLValue("monitorPerspective"), "monitorPerspective"), l = h.getURLValue("monitorPerspective")), h.getURLValue("monitorPerspective") !== l && void 0 === h.getURLValue("monitorPerspective") && h.removeValueFromOptionalURL("monitorPerspective"), h.getURLValue("lang") !== k && void 0 !== h.getURLValue("lang")) {
                    var d = f.getAvailableLanguage(h.getURLValue("lang"));
                    e.use(d), h.setOptionalURL(h.getURLValue("lang"), "lang"), k = d
                }
                h.getURLValue("lang") !== k && void 0 === h.getURLValue("lang") && h.removeValueFromOptionalURL("lang"), h.getURLValue("stopsLayer") !== o && (a.$broadcast("map.setStopsLayer", h.getURLValue("stopsLayer")), o = h.getURLValue("stopsLayer")), h.getURLValue("autoLocalization") !== p && (a.$broadcast("map.setLocation", h.getURLValue("autoLocalization")), p = h.getURLValue("autoLocalization")), h.getURLValue("radar") !== q && (a.$broadcast("map.setLocation", h.getURLValue("radar")), q = h.getURLValue("radar")), i.city.citySymbol !== j && (b.$broadcast("city-change", i.city.citySymbol), j = i.city.citySymbol), "/schedules/home" === h.getLocationPath() && (a.hideAllViews(), a.views.mainView = !0, a.views.showTransportLine = !0), "/schedules/lineStops" === h.getLocationPath() && (a.hideAllViews(), a.views.selectedLine = !0, a.views.showLineGraph = !0, a.views.showTimetable = !1), "/schedules/timetable" === h.getLocationPath() && (a.hideAllViews(), a.views.selectedLine = !0, a.views.showTimetable = !0, a.views.showLineGraph = !1), "/schedules/departures" === h.getLocationPath() && (a.hideAllViews(), a.views.selectedStop = !0)
            })
        }])
    }(),
    function() {
        "use strict";
        angular.module("jakdojadeWebApp").controller("ChangeCityCtrl", ["$scope", "$rootScope", "$translate", "$timeout", "CitiesService", "LocationService", "ObjectManager", function(a, b, c, d, e, f, g) {
            a.citiesService = e, a.currentCity = g.city.cityName, a.$watch("citiesService.cityList", function() {
                a.cities = e.getTranslatedCityList(e.cityList);
                var b = g.city.cityName;
                if (b)
                    for (var c in a.cities) "cities." + b == a.cities[c].cityName && e.setCitySymbol(c);
                a.$emit("map.changeCity"), a.changeSelectedCity = function(a) {
                    d(function() {
                        var a = f.getOptionalURL();
                        a.length && a.length > 0 ? f.setEntireURL("/schedules/home?" + f.getOptionalURL()) : f.setEntireURL("/schedules/home")
                    }, 100)
                }
            }), b.$on("city-change", function(b, c) {
                for (var d in a.cities) "cities." + c == a.cities[d].cityName && (a.dropdownSelectedCity = "cities." + c, document.getElementById("select-city").selectedIndex = d, e.setCitySymbol(d), a.$emit("map.changeCity"))
            })
        }])
    }(),
    function() {
        "use strict";
        angular.module("jakdojadeWebApp").controller("SidebarCtrl", ["$scope", function(a) {
            a.toggle = function() {
                a.views.sidebarIsVisible = !a.views.sidebarIsVisible
            }
        }])
    }(),
    function() {
        angular.module("scheduleModule").controller("ScheduleLinesCtrl", ["$scope", "$timeout", "LinesService", "SpecialMessagesService", "CitiesService", "ObjectManager", function(a, b, c, d, e, f) {
            a.citiesService = e, a.$watchCollection("citiesService", function(e) {
                b(function() {
                    void 0 !== e.citySymbol && void 0 !== c.lineListQuery() && c.lineListQuery().query(function(b) {
                        var e = c.getLinesTypes(b);
                        a.vehicleTypes = e.vehicleTypes, a.cityLines = e.linesArray, f.setLines(a.cityLines), a.globalMessages = d.getSpecialMessages(b, "globalAlerts")
                    })
                }, 0)
            })
        }])
    }(),
    function() {
        angular.module("scheduleModule").controller("ScheduleLineListSizeCtrl", ["$scope", function(a) {
            a.linesLimit = 9, a.moreLinesButtonTitle = "hintPanel.showMoreLines", a.isMoreButtonVisible = function(b) {
                var c = [];
                for (var d in a.cityLines) a.cityLines[d].vehicleType === b && c.push(d);
                if (c.length < 10) return !0
            }, a.toggleMoreLines = function() {
                9 === a.linesLimit ? (a.linesLimit = 1 / 0, a.moreLinesButtonTitle = "hintPanel.hideAdditionalLines") : (a.linesLimit = 9, a.moreLinesButtonTitle = "hintPanel.showMoreLines")
            }
        }])
    }(),
    function() {
        "use strict";
        angular.module("scheduleModule").controller("ScheduleHintPanelCtrl", ["$scope", "HintPanelService", "SearchHistoryService", "$translate", "$timeout", "LocationService", function(a, b, c, d, e, f) {
            a.mapNoStopsFound = !1;
            var g = !0;
            a.selectLine = function(a) {
                b.setSelectedLineURL(a)
            }, a.selectStop = function(a) {
                f.setOptionalURL(!0, "stopGroupDepartures"), b.setDepartureURL(a), c.setStoredLinesOrStops(a, "linesOrStops")
            }, a.$on("$locationChangeSuccess", function() {
                a.mapNoStopsFound = !1
            }), a.blur = function(b) {
                "schedule-input" !== b.target.id && (a.views.showSearch = !1, a.views.showTransportLine = !0, a.inputValue = "", a.mapNoStopsFound = !1)
            }, a.showSearchHistory = function(b) {
                a.views.showSearch = !0, a.views.showTransportLine = !1, a.mapNoStopsFound = !1, "" === b.target.value && (a.hintResult = c.getStoredLinesOrStops("linesOrStops")), g = !1
            };
            var h, i = function() {
                a.mapNoStopsFound = !1, "" !== a.inputValue ? b.getTypedValue(a.inputValue).query(function(c) {
                    a.hintResult = [], a.views.showSearch = !0, a.mapNoStopsFound = !1;
                    var d = b.extractLines(c),
                        e = b.extractStops(c).stops;
                    a.hintResult = d.concat(e), a.resultCount = b.extractStops(c).resultCount, a.loadingIcon = !1
                }) : (a.loadingIcon = !1, a.views.showTransportLine = !0, a.mapNoStopsFound = !1)
            };
            a.inputValueChange = function() {
                g || (a.loadingIcon = !0, a.mapNoStopsFound = !1, a.views.showSearch = !1, a.views.showTransportLine = !1, h && e.cancel(h), h = e(i, 400)), g = !1
            }, a.establishLocationOnMap = function() {
                var b = !0;
                a.$emit("map.location", b), b = null
            }
        }])
    }(),
    function() {
        "use strict";
        angular.module("scheduleModule").controller("ScheduleSelectedStopCtrl", ["$scope", "$timeout", "$interval", "SelectedStopService", "LocationService", "BackButtonService", "RealtimeManager", "RealtimeBufferService", "ObjectManager", function(a, b, c, d, e, f, g, h, i) {
            var j, k, l = null;
            a.selectedStop = {}, f.setView("departures");
            var m = function() {
                d.departureQuery().query(function(b) {
                    d.setStopHistory(), a.selectedStop.stopName = d.getStopName(b), a.selectedStop.stopLines = d.getListOfLines(b), d.selectLinesByURL(a.selectedStop.stopLines), a.selectedStop.stopsGroup = d.getStopVariants(b), d.setObjectManagerSelectedStopIfNotPresent(a.selectedStop.stopsGroup), a.$emit("map.centerMapOnStop"), w(b, !1), a.selectedStop.stopsAlerts = d.getDepartureSpecialMessages(b, "stopsAlerts"), a.selectedStop.linesAlerts = d.getDepartureSpecialMessages(b, "linesAlerts"), a.showTimeSelectionPanel = !0, q()
                })
            };
            b(function() {
                void 0 == e.getURLValue("stopCode") ? d.extractStopCodesIfNotAvailable() : m()
            }, 200), a.$on("windowInactive", function() {
                a.$apply(function() {
                    b.cancel(n), c.cancel(j), c.cancel(k), l = null, g.vehicleGroupedArray.length = 0, a.$emit("map.removeAllVehicles")
                })
            }), a.$on("windowActive", function() {
                b(function() {
                    p(), o()
                }, 0)
            });
            var n, o = function() {
                n = b(function() {
                    p(), j = c(function() {
                        c.cancel(k), p()
                    }, 6e4)
                }, d.getSecondsToFullMinute())
            };
            o();
            var p = function() {
                    d.departureQuery().query(function(a) {
                        w(a, !1), q()
                    })
                },
                q = function() {
                    c.cancel(k);
                    var b = g.realtimeIds;
                    a.$emit("map.removeMissingVehicles", b);
                    var d = i.city.citySymbol;
                    if (0 != b.length) {
                        var e = h.getBufferInfoForPostQuery(),
                            f = g.getQueryPostObject(b, e, d);
                        g.vehicleGroupedArray.length = 0, r(f), k = c(function() {
                            var a = g.getRealtimeIdsByTimeToUpdate();
                            if (0 != a.length) {
                                var b = h.getBufferInfoForPostQuery(),
                                    c = g.getQueryPostObject(a, b, d);
                                r(c)
                            }
                        }, 1e3)
                    }
                },
                r = function(b) {
                    var c = function(b) {
                        h.setVehiclesInfo(b.vehicles);
                        var c = angular.copy(a.selectedStop.departures),
                            e = d.convertRealtimeDepartures(c, b);
                        angular.copy(e, a.selectedStop.departures)
                    };
                    d.realtimeQuery().query({}, new Blob([JSON.stringify(b)]), function(b) {
                        c(b), l = b, a.$emit("map.drawVehicles")
                    }, function() {
                        null !== l && c(l)
                    })
                };
            a.$on("stopName-change", function() {
                a.$emit("map.removeDepartures"), i.selectedStop = {}, h.emptyVehiclesBuffer(), g.vehicleGroupedArray.length = 0, void 0 == e.getURLValue("stopCode") ? d.extractStopCodesIfNotAvailable() : m(), a.$emit("map.removeLineRoute")
            }), a.$on("map.removeVehicleOnStopPassed", function(b, c) {
                for (var d = angular.copy(a.selectedStop.departures), e = 0; e < d.length; e++)
                    if (d[e].realtimeId === c) {
                        d[e].isStopPassed = !0;
                        break
                    } a.selectedStop.departures = d
            }), a.$on("lineId-change", function() {
                a.$emit("map.removeVehicles"), g.vehicleGroupedArray.length = 0, s(), a.$emit("map.removeLineRoute")
            });
            var s = function() {
                d.departureQuery().query(function(b) {
                    d.setStopHistory(), d.selectLinesByURL(a.selectedStop.stopLines), w(b, !1), a.selectedStop.linesAlerts = d.getDepartureSpecialMessages(b, "linesAlerts"), q()
                })
            };
            a.$on("stopCode-change", function() {
                a.$emit("map.removeDepartures"), h.emptyVehiclesBuffer(), g.vehicleGroupedArray.length = 0, i.selectedStop = {}, t(), a.$emit("map.removeLineRoute")
            });
            var t = function() {
                d.departureQuery().query(function(b) {
                    d.setStopHistory(), w(b, !1), a.selectedStop.stopLines = d.getFilteredListOfLines(b), d.selectLinesByURL(a.selectedStop.stopLines), d.setObjectManagerSelectedStopIfNotPresent(a.selectedStop.stopsGroup), a.selectedStop.stopsAlerts = d.getDepartureSpecialMessages(b, "stopsAlerts"), a.selectedStop.linesAlerts = d.getDepartureSpecialMessages(b, "linesAlerts"), a.$emit("map.centerMapOnStop"), q()
                })
            };
            a.$on("dateTime-change", function() {
                a.$emit("map.removeVehicles"), u()
            });
            var u = function() {
                d.departureQuery().query(function(b) {
                    d.setStopHistory(), a.selectedStop.departures = d.convertDeparturesTable(b), d.setObjectManagerSelectedStopIfNotPresent(a.selectedStop.stopsGroup), a.selectedStop.stopsAlerts = d.getDepartureSpecialMessages(b, "stopsAlerts"), a.selectedStop.linesAlerts = d.getDepartureSpecialMessages(b, "linesAlerts"), q()
                })
            };
            a.$on("date-change", function() {
                a.$emit("map.removeVehicles"), v()
            });
            var v = function() {
                    d.departureQuery().query(function(b) {
                        w(b, !0), a.selectedStop.stopsAlerts = d.getDepartureSpecialMessages(b, "stopsAlerts"), a.selectedStop.linesAlerts = d.getDepartureSpecialMessages(b, "linesAlerts"), q()
                    })
                },
                w = function(b, c) {
                    var f, g = void 0 === e.getURLValue("d") || "now" === e.getURLValue("d");
                    if (g) a.selectedStop.departures = d.convertDeparturesTable(b), f = "Departures", a.selectedStop.isDeparturesTableVisible = !0, a.selectedStop.isTimetableVisible = !1;
                    else {
                        var h = d.getTimetableModel(b);
                        a.selectedStop.timetable = h.timetable, a.selectedStop.departures = h.departures, f = "Timetable", a.selectedStop.isTimetableVisible = !0, a.selectedStop.isDeparturesTableVisible = !1
                    }
                    c && a.$broadcast("animate-tables", f), a.selectedStop.stopsAlerts = d.getDepartureSpecialMessages(b, "stopsAlerts"), a.selectedStop.linesAlerts = d.getDepartureSpecialMessages(b, "linesAlerts")
                };
            a.$on("$destroy", function() {
                a.$emit("map.removeDepartures"), a.$emit("map.removeLineRoute"), a.$$listeners = null, b.cancel(n), c.cancel(j), c.cancel(k), l = null, i.selectedStop = {}, g.vehicleGroupedArray.length = 0, h.emptyVehiclesBuffer(), m = null, q = null, s = null, t = null, p = null, a.selectedStop = null, a.linesLimit = null, j = null, k = null, a = null
            })
        }])
    }(),
    function() {
        "use strict";
        angular.module("scheduleModule").controller("ScheduleSelectedLineCtrl", ["$scope", "$rootScope", "$timeout", "LocationService", "SelectedLineService", "LineGraphService", "TimeSelectorService", "BackButtonService", "ObjectManager", function(a, b, c, d, e, f, g, h, i) {
            a.selectedLine = {};
            var j = function() {
                    g.setSelectedLineTimeToNow();
                    var b = d.getURLValue("lineId") === i.selectedLine.lineId,
                        j = void 0 === d.getURLValue("lineDirection") || d.getURLValue("lineDirection") === i.selectedLine.lineDirection;
                    b && j ? (c(function() {
                        a.selectedLine.graphs = i.lineGraph
                    }, 0), a.selectedLine.vehicleType = i.selectedLine.vehicleType || i.selectedLine.lineVehicleType, a.selectedLine.lineNumber = i.selectedLine.lineName, a.selectedLine.startAndEndDirection = e.selectedLine.startAndEndDirection, a.selectedLine.showToggleButton = f.isToggleButtonVisible(e.selectedLine.lineGraphResponse), d.setEntireURL(i.selectedLine.url), h.setView("lineStops")) : e.firstTimeLoad(k)
                },
                k = function() {
                    a.$broadcast("line-graph"), a.selectedLine.vehicleType = i.selectedLine.vehicleType || i.selectedLine.lineVehicleType, a.selectedLine.lineNumber = i.selectedLine.lineName
                };
            a.$on("selectedLine-lineId-change", function() {
                j()
            }), b.removeLineRouteOnExit = !0, a.$on("$destroy", function() {
                a.$emit("map.removeLineRoute"), j = null, k = null, i.selectedStop = {}, a.selectedLine.graphs = null, a.selectedLine.startAndEndDirection = null, a.selectedLine.lineNumber = null, a.selectedLine.stopIconType = null, a.toggleDirection = null, a.$$listeners = null, a = null
            }), a.toggleDirection = function() {
                e.setLineDirectionOnToggleDirectionButton()
            }, a.$on("selectedLine-direction-change", function(b, c) {
                c && (e.changeLineDirectionByURL(), a.selectedLine.graphs = e.selectedLine.graphs, a.selectedLine.startAndEndDirection = e.selectedLine.startAndEndDirection, h.setView("lineStops"), i.setSelectedLineUrl(d.getEntireURL()))
            }), c(function() {
                j()
            }, 300)
        }])
    }(), angular.module("scheduleModule").controller("LineGraphCtrl", ["$scope", "$rootScope", "DetectMobileDevice", "LineGraphService", "SelectedLineService", "BackButtonService", "LocationService", "TimeSelectorService", "SearchHistoryService", "ObjectManager", function(a, b, c, d, e, f, g, h, i, j) {
        a.$on("line-graph", function() {
            d.getLineGraph().query(function(b) {
                e.selectedLine.lineGraphResponse = b;
                for (var c = 0; c < b.directions.length; c++) {
                    var h, k;
                    h = void 0 !== b.directions[c].directionStartName ? b.directions[c].directionStartName : "Start direction", k = void 0 !== b.directions[c].directionEndName ? b.directions[c].directionEndName : b.directions[c].directionName, e.selectedLine.lineGraphResponse.directions[c].startDirectionName = h, e.selectedLine.lineGraphResponse.directions[c].endDirectionName = k
                }
                a.selectedLine.showToggleButton = d.isToggleButtonVisible(b), j.setLineGraphResponse(b), e.setLineDirectionIndexByURL(b), g.getURLValue("lineDirection") ? e.changeLineDirectionByURL() : e.setLineDirectionURL(b), a.selectedLine.graphs = e.selectedLine.graphs, a.selectedLine.startAndEndDirection = e.selectedLine.startAndEndDirection, j.selectedLine.lineDirection = a.selectedLine.startAndEndDirection[1], i.setStoredLinesOrStops(j.selectedLine, "linesOrStops"), f.setView("lineStops"), j.setSelectedLineUrl(g.getEntireURL())
            })
        }), a.showTimetableOrDepartures = function(a) {
            var e = a[0].stop || a[1].stop;
            b.removeLineRouteOnExit = !1, c.isMobile() || l(a[0].index), d.showDeparturesOrTimetable(e)
        };
        a.$watch("selectedLine.graphs", function(b, c) {
            b !== c && a.$emit("map.drawLineGraph")
        });
        a.mouseOverStop = function(b) {
            a && (a.$emit("map.mouseOverLineGraphStop", b[0].index), c.isMobile() ? a.showTimetableOrDepartures(b) : k(b[0].index))
        }, a.mouseLeaveStop = function(b) {
            a && (l(b), a.$emit("map.mouseLeaveLineGraphStop", b))
        }, a.$on("map.mouseOverMapStop", function(b, c) {
            a.$apply(function() {
                k(c)
            })
        }), a.$on("map.mouseLeaveMapStop", function(b, c) {
            a.$apply(function() {
                l(c)
            })
        });
        var k = function(b) {
                "stop_main" == a.selectedLine.graphs[b][0].stopIconType ? a.selectedLine.graphs[b][0].stopIconType = "stop_main_hover" : void 0 !== a.selectedLine.graphs[b][1] && "stop" == a.selectedLine.graphs[b][1].stopIconType && (a.selectedLine.graphs[b][1].stopIconType = "stop_hover")
            },
            l = function(b) {
                "stop_main_hover" == a.selectedLine.graphs[b][0].stopIconType ? a.selectedLine.graphs[b][0].stopIconType = "stop_main" : void 0 !== a.selectedLine.graphs[b][1] && "stop_hover" == a.selectedLine.graphs[b][1].stopIconType && (a.selectedLine.graphs[b][1].stopIconType = "stop")
            };
        a.selectedLine.lineGraph = {}, a.selectedLine.lineGraph.listeners = {}, a.selectedLine.lineGraph.listeners.mouseOverStop = a.mouseOverStop, a.selectedLine.lineGraph.listeners.mouseLeaveStop = a.mouseLeaveStop, a.selectedLine.lineGraph.listeners.clickStop = a.showTimetableOrDepartures, a.$on("zoom-on-line", function() {
            a.$emit("map.zoomOnLineRoute")
        }), a.$on("$destroy", function() {
            k = null, l = null, a.selectedLine.graphs = null, a.showTimetableOrDepartures = null, a.selectedLine.startAndEndDirection = null, a.$$listeners = null, a = null
        })
    }]),
    function() {
        angular.module("mapModule", []).factory("MapService", ["ObjectManager", function(a) {
            return {
                getLocalHistoryLongitude: function() {
                    if (localStorage.getItem("cityCoordinates")) {
                        var a = JSON.parse(localStorage.getItem("cityCoordinates"));
                        return a.x_lon
                    }
                    return null
                },
                getLocalHistoryLatitude: function() {
                    if (localStorage.getItem("cityCoordinates")) {
                        var a = JSON.parse(localStorage.getItem("cityCoordinates"));
                        return a.y_lat
                    }
                    return null
                },
                getLinePath: function() {
                    for (var b, c, d = {}, e = a.lineShapes, f = [], g = 0, h = e.shapesList.length; g < h; g++) {
                        b = "linePath" + g, c = e.shapesList[g].mainShape ? "rgba(46, 177, 209, 0.8)" : "rgba(161, 160, 159, 0.8)";
                        var i = e.shapesList[g].shapeCoordinates;
                        f = [];
                        for (var j = 0, k = i.length; j < k; j++) f.push({
                            lat: i[j].y_lat,
                            lng: i[j].x_lon
                        });
                        d[b] = {
                            color: c,
                            weight: 8,
                            latlngs: f
                        }
                    }
                    return d
                }
            }
        }])
    }(),
    function() {
        angular.module("mapModule").factory("MapDrawDeparturesService", ["LocationService", function(a) {
            return {
                removeVehicles: function(b, c, d) {
                    var e = a.getURLValue("lineId");
                    for (var f in b)
                        if (b.hasOwnProperty(f))
                            if ("object" == typeof e) {
                                for (var g = !0, h = 0, i = e.length; h < i; h++) b[f].lineId === e[h] && (g = !1);
                                g === !0 && (d.removeLayer(b[f]), d.removeLayer(c[f]), delete b[f], delete c[f])
                            } else a.getURLValue("lineId") !== b[f].lineId && void 0 !== a.getURLValue("lineId") && (d.removeLayer(b[f]), d.removeLayer(c[f]), delete b[f], delete c[f])
                }
            }
        }])
    }(),
    function() {
        angular.module("scheduleModule").factory("SpecialMessagesService", function() {
            return {
                getSpecialMessages: function(a, b) {
                    var c = [],
                        d = a[b];
                    if (d)
                        for (var e in d) d[e].alertType = b, c.push(d[e]);
                    return c
                }
            }
        })
    }(),
    function() {
        angular.module("mapModule").factory("MapLineStopsService", function() {
            var a = L.divIcon({
                    className: "stop-marker",
                    iconSize: null,
                    iconAnchor: [10, 10],
                    html: '<div class="transparent-halo" style="right: 8px; bottom: 9px;"></div>'
                }),
                b = L.divIcon({
                    className: "stop-marker-filled",
                    iconSize: null,
                    iconAnchor: [10, 10],
                    html: '<div class="transparent-halo" style="right: 8px; bottom: 9px;"></div>'
                }),
                c = L.divIcon({
                    className: "marker-middle",
                    iconSize: null,
                    iconAnchor: [5, 5],
                    html: '<div class="transparent-halo" style="right: 11px; bottom: 11px;"></div>'
                }),
                d = L.divIcon({
                    className: "marker-middle-filled",
                    iconSize: null,
                    iconAnchor: [5, 5],
                    html: '<div class="transparent-halo" style="right: 11px; bottom: 11px;"></div>'
                }),
                e = L.divIcon({
                    className: "stop-marker-gray",
                    iconSize: null,
                    iconAnchor: [10, 10],
                    html: '<div class="transparent-halo" style="right: 8px; bottom: 9px;"></div>'
                }),
                f = L.divIcon({
                    className: "stop-marker-gray-filled",
                    iconSize: null,
                    iconAnchor: [10, 10],
                    html: '<div class="transparent-halo" style="right: 8px; bottom: 9px;"></div>'
                }),
                g = L.divIcon({
                    className: "marker-middle-gray",
                    iconSize: null,
                    iconAnchor: [5, 5],
                    html: '<div class="transparent-halo" style="right: 11px; bottom: 11px;"></div>'
                }),
                h = L.divIcon({
                    className: "marker-middle-gray-filled",
                    iconSize: null,
                    iconAnchor: [5, 5],
                    html: '<div class="transparent-halo" style="right: 11px; bottom: 11px;"></div>'
                }),
                i = L.divIcon({
                    className: "empty-marker",
                    iconSize: null,
                    iconAnchor: [0, 0]
                });
            return {
                setIcons: function(b, d, f) {
                    b._animateToZoom <= 13 ? f.mainType ? d.setIcon(c) : d.setIcon(g) : f.mainType ? d.setIcon(a) : d.setIcon(e), b._animateToZoom <= 11 && d.setIcon(i)
                },
                setIconsOnSidebarMouseOverStop: function(a, c) {
                    var e = a.options.icon.options.className;
                    a.index == c && ("stop-marker" === e ? a.setIcon(b) : "marker-middle" === e && a.setIcon(d), "stop-marker-gray" === e ? a.setIcon(f) : "marker-middle-gray" === e && a.setIcon(h))
                },
                setIconsOnSidebarMouseLeaveStop: function(b, d) {
                    var f = b.options.icon.options.className;
                    b.index == d && ("stop-marker-filled" === f ? b.setIcon(a) : "marker-middle-filled" === f && b.setIcon(c), "stop-marker-gray-filled" === f ? b.setIcon(e) : "marker-middle-gray-filled" === f && b.setIcon(g))
                },
                setIconsOnMouseOverStop: function(a) {
                    var c = a.target.options.icon.options.className;
                    "stop-marker" === c ? a.target.setIcon(b) : "marker-middle" === c && a.target.setIcon(d), "stop-marker-gray" === c ? a.target.setIcon(f) : "marker-middle-gray" === c && a.target.setIcon(h)
                },
                setIconsOnMouseLeaveStop: function(b) {
                    var d = b.target.options.icon.options.className;
                    "stop-marker-filled" === d ? b.target.setIcon(a) : "marker-middle-filled" === d && b.target.setIcon(c), "stop-marker-gray-filled" === d ? b.target.setIcon(e) : "marker-middle-gray-filled" === d && b.target.setIcon(g)
                },
                setIconsOnZoom: function(b, d) {
                    b.target._animateToZoom <= 13 ? d.mainType ? d.setIcon(c) : d.setIcon(g) : d.mainType ? d.setIcon(a) : d.setIcon(e), b.target._animateToZoom <= 11 && d.setIcon(i)
                }
            }
        })
    }(),
    function() {
        angular.module("scheduleModule").service("StopLayersService", ["$resource", "configuration", "LocationService", "ObjectManager", function(a, b, c, d) {
            this.layerGroup = [], this.markers = null, this.stopsQuery = function(e, f, g) {
                return JSON.parse(b.city).stopLayers.grouped === !1 && (g = !1), a(c.getApiURL() + "stops?citySymbol=:citySymbol&topLeft=:topLeft&bottomRight=:bottomRight&grouped=:grouped", {}, {
                    query: {
                        method: "GET",
                        params: {
                            citySymbol: d.city.citySymbol,
                            topLeft: e,
                            bottomRight: f,
                            grouped: g
                        }
                    }
                })
            };
            var e = function() {
                var a = "";
                return void 0 !== c.getURLValue("d") && (a = "&d=" + c.getURLValue("d")), a
            };
            this.setDepartureOnSchedulesPanel = function(a) {
                c.setEntireURL(c.getDynamicPath("departures") + "?stopName=" + a.stopName + "&stopCode=" + a.stopCode + e() + c.getOptionalURL())
            }
        }])
    }(),
    function() {
        angular.module("scheduleModule").service("CitiesService", ["$resource", "LocationService", "ObjectManager", "configuration", function(a, b, c, d) {
            var e = this,
                f = c.city.citySymbol;
            this.citySymbol = c.city.citySymbol, this.cityName = c.city.cityName, this.vehicleTypes = localStorage.getItem("vehicleTypes"), this.resource = a(b.getApiURL() + "regionDetails?citySymbol=" + f, {}, {
                query: {
                    method: "GET",
                    ignoreLoadingBar: !0
                }
            }), this.resource.query(function(a) {
                e.cityList = a.region.cities, e.operatorsList = a.operators
            }), this.getTranslatedCityList = function(a) {
                if (a)
                    for (var b = 0; b < a.length; b++) "cities." != a[b].cityName.substring(0, 7) && (a[b].cityName = "cities." + a[b].cityName);
                return a
            }, this.setCitySymbol = function(a) {
                var b = c.city.citySymbol;
                e.citySymbol = b, localStorage.setItem("citySymbol", e.citySymbol), c.setCitySymbol(e.citySymbol), g(a)
            };
            var g = function(a) {
                    e.cityName = e.cityList[a].cityName, localStorage.setItem("cityName", e.cityName), c.setCityName(e.cityName.substring(7, 20)), h(a)
                },
                h = function(a) {
                    e.vehicleTypes = e.operatorsList[a].vehicleTypes, localStorage.setItem("vehicleTypes", e.vehicleTypes), i(a)
                },
                i = function(a) {
                    var b = e.cityList[a].geoData.centerCoordinate;
                    c.setCityCoordinates(b), localStorage.setItem("cityCoordinates", JSON.stringify(b))
                }
        }])
    }(),
    function() {
        angular.module("scheduleModule").factory("LinesService", ["$resource", "LocationService", "ObjectManager", function(a, b, c) {
            return {
                lineListQuery: function() {
                    var d;
                    return c.city.citySymbol && (d = a(b.getApiURL() + "schedule/lines?citySymbol=:citySymbol", {}, {
                        query: {
                            method: "GET",
                            ignoreLoadingBar: !0,
                            params: {
                                citySymbol: c.city.citySymbol
                            }
                        }
                    })), d
                },
                getLinesTypes: function(a) {
                    var b = [],
                        d = {};
                    for (var e in a.operators) {
                        for (var f = 0, g = a.operators[e].availableVehicleTypes.length; f < g; f++) {
                            var h = a.operators[e].availableVehicleTypes[f];
                            d[h] = {
                                name: h,
                                translatedName: "vehicles." + h
                            }
                        }
                        var i = a.operators[e].lines;
                        for (var j in i) i[j].lineOrStop = "line", i[j].operatorSymbol = a.operators[e].operatorSymbol, i[j].cityName = c.city.cityName, b.push(i[j])
                    }
                    b.sort(function(a, b) {
                        return naturalSort(a.lineName, b.lineName)
                    });
                    var k = Object.keys(d).map(function(a) {
                        return d[a]
                    });
                    return {
                        linesArray: b,
                        vehicleTypes: k
                    }
                }
            }
        }])
    }(),
    function() {
        angular.module("scheduleModule").factory("HintPanelService", ["LocationService", "$resource", "LocalStorageService", "ObjectManager", function(a, b, c, d) {
            return {
                getTypedValue: function(c) {
                    var e = b(a.getApiURL() + "schedule/suggestions?citySymbol=:citySymbol&query=:query", {}, {
                        query: {
                            method: "GET",
                            params: {
                                citySymbol: d.city.citySymbol,
                                query: c
                            }
                        }
                    });
                    return e
                },
                extractStops: function(a) {
                    var b = [];
                    if (a.stops && a.stops.length > 0)
                        for (var c = 0; c < a.stops.length; c++) a.stops[c].lineOrStop = "stop", b.push(a.stops[c]);
                    return {
                        stops: b,
                        resultCount: a.resultCount
                    }
                },
                extractLines: function(a) {
                    var b = [];
                    if (a.operatorsWithLines && a.operatorsWithLines.length > 0)
                        for (var c = a.operatorsWithLines[0].lines, d = 0; d < c.length; d++) c[d].lineOrStop = "line", c[d].operatorSymbol = a.operatorsWithLines[0].operatorSymbol, c[d].operatorName = a.operatorsWithLines[0].operatorName, b.push(a.operatorsWithLines[0].lines[d]);
                    return b
                },
                setSelectedLineURL: function(b) {
                    var c = function() {
                        return void 0 !== b.lineDirection ? "&lineDirection=" + b.lineDirection : ""
                    };
                    a.setEntireURL(a.getDynamicPath("lineStops") + "?lineId=" + b.lineId + c() + a.getOptionalURL())
                },
                setDepartureURL: function(b) {
                    var d = function() {
                            var a = "";
                            if (angular.isArray(b.stopsCodes)) {
                                var c = b.stopsCodes[b.stopsCodes[0].search("_END") !== -1 ? 1 : 0];
                                a = a + "&stopCode=" + c
                            } else a = "&stopCode=" + b.stopCode;
                            return a
                        },
                        e = c.getDepartures(b);
                    void 0 != e ? a.setEntireURL(a.getDynamicPath("departures") + e) : a.setEntireURL(a.getDynamicPath("departures") + "?stopName=" + b.stopName + d() + a.getOptionalURL())
                }
            }
        }])
    }(),
    function() {
        angular.module("scheduleModule").service("SearchHistoryService", ["CitiesService", "configuration", function(a, b) {
            var c = JSON.parse(b.city).schedules.linesStopsLocalStorage;
            this.getStoredLinesOrStops = function() {
                var b = JSON.parse(localStorage.getItem(c));
                if (!b) return null;
                for (var d = 0; d < b.length; d++)
                    if (a.citySymbol == b[d].id) return b[d].values
            }, this.setStoredLinesOrStops = function(a) {
                a.toNotMatchText = !0, a.stopGroupDepartures = !0;
                var b = JSON.parse(localStorage.getItem(c));
                b ? d(a, b) : g(a)
            };
            var d = function(b, d) {
                    for (var g = 0; g < d.length; g++)
                        if (a.citySymbol == d[g].id) {
                            var h = d[g].values;
                            e(h, b), h.unshift(b), f(h), localStorage.setItem(c, JSON.stringify(d))
                        }
                },
                e = function(a, b) {
                    for (var c = 0; c < a.length; c++) void 0 != a[c].lineName && a[c].lineName == b.lineName ? a.splice(c, 1) : void 0 != a[c].stopName && a[c].stopName == b.stopName && a.splice(c, 1)
                },
                f = function(a) {
                    a.length > 6 && a.splice(6, 1)
                },
                g = function(b) {
                    for (var d = [], e = 0; e < a.cityList.length; e++) d.push({
                        id: a.cityList[e].citySymbol,
                        values: []
                    });
                    for (var f = 0; f < d.length; f++) d[f].id == a.citySymbol && d[f].values.push(b);
                    localStorage.setItem(c, JSON.stringify(d))
                }
        }])
    }(),
    function() {
        angular.module("scheduleModule").factory("TimeSelectorService", ["CurrentDatesService", "LocationService", function(a, b) {
            return {
                selectDate: function(b, c) {
                    var d;
                    if ("now" === c) b.activeDaysClass = 0;
                    else {
                        for (var e = 0; e < 3; e++) {
                            if ("daysOfTheWeek.today" == b.days[e].day && c == a.getDayFromToday(0)) {
                                b.activeDaysClass = e, d = e;
                                break
                            }
                            if ("daysOfTheWeek.tomorrow" == b.days[e].day && c == a.getDayFromToday(1)) {
                                b.activeDaysClass = e, d = e;
                                break
                            }
                            var f = b.days[e].day + b.days[e].month + b.days[e].year;
                            f == c && (b.activeDaysClass = e, d = e)
                        }
                        void 0 == d && (b.activeDaysClass = -1)
                    }
                },
                setSelectedLineTimeToNow: function() {
                    b.getURLValue("d") || b.setURLValue(["d", "now"])
                },
                isSelectedDateToday: function() {
                    return a.getDayFromToday(0) == b.getURLValue("d")
                },
                getCurrentTime: function() {
                    var a = new Date,
                        b = a.getHours(),
                        c = a.getMinutes(),
                        d = a.getSeconds();
                    return c < 10 && (c = "0" + c), d < 10 && (d = "0" + d), b.toString() + c.toString() + d.toString()
                },
                getUpdatedTime: function(a, b, c) {
                    a.setSeconds(b + c);
                    var d = a.getMinutes();
                    d < 10 && (d = "0" + d);
                    var e = a.getSeconds();
                    return e < 10 && (e = "0" + e), a.getHours().toString() + d.toString() + e.toString()
                }
            }
        }])
    }(),
    function() {
        angular.module("scheduleModule").factory("CurrentDatesService", function() {
            function a() {
                var a = new Date,
                    b = a.getMonth(),
                    c = a.getFullYear();
                return /8|3|5|10/.test(b.toString()) ? 30 : 1 != b ? 31 : c % 4 == 0 && c % 100 != 0 || c % 400 == 0 ? 29 : 28
            }
            return {
                getDayFromToday: function(a) {
                    var b = new Date,
                        c = b.getMonth() + 1;
                    c = c < 10 ? ".0" + c + "." : "." + c + ".";
                    var d;
                    return d = b.getDate() + a < 10 ? "0" + (b.getDate() + a) : b.getDate() + a, "32" == d && 11 === b.getMonth() ? "01.01." + (b.getFullYear() + 1) : d + c + b.getFullYear()
                },
                getCurrentDates: function() {
                    for (var b = [], c = new Date, d = ["daysOfTheWeek.now", "daysOfTheWeek.today", "daysOfTheWeek.tomorrow"], e = 0; e < d.length; e++) 0 === e ? b.push({
                        day: d[e],
                        month: void 0,
                        year: void 0,
                        fullDate: "now"
                    }) : 1 === e ? b.push({
                        day: d[e],
                        month: void 0,
                        year: void 0,
                        fullDate: this.getDayFromToday(0)
                    }) : b.push({
                        day: d[e],
                        month: void 0,
                        year: void 0,
                        fullDate: this.getDayFromToday(1)
                    });
                    c.setDate(c.getDate() + 2);
                    for (var e = 0; e < 11; e++) {
                        var f, g, h, i;
                        f = 0 == e ? c.getDate() : c.getDate() + 1, g = "." + (c.getMonth() + 1), parseInt(g.substring(1, 20)) < 10 && (g = ".0" + (c.getMonth() + 1)), h = "." + c.getFullYear(), i ? (c.setDate(1), f = "0" + c.getDate(), i = !1) : (c.setDate(f), f = c.getDate() < 10 ? "0" + c.getDate() : c.getDate());
                        var j = "daysOfTheWeek." + c.getDay();
                        b.push({
                            day: f,
                            month: g,
                            year: h,
                            dayOfWeek: j
                        }), f == a() && (c.setMonth(c.getMonth() + 1, 1), i = !0)
                    }
                    return b
                }
            }
        })
    }(),
    function() {
        angular.module("jakdojadeWebApp").factory("LocationService", ["$location", "configuration", "ObjectManager", function(a, b, c) {
            var d = {};
            return d.optionalURL = {}, {
                getApiURL: function() {
                    var a = JSON.parse(b.city).apiURL;
                    return a
                },
                setURLValue: function() {
                    for (var b = 0; b < arguments.length; b++) void 0 != arguments[b][0] && void 0 != arguments[b][1] && a.search(arguments[b][0], arguments[b][1])
                },
                setEntireURL: function(b) {
                    a.url(b)
                },
                getEntireURL: function() {
                    return a.url()
                },
                setLocationPath: function(b) {
                    a.path(b, !1)
                },
                getLocationPath: function() {
                    return a.path()
                },
                getURLValue: function(b) {
                    if (a.search().hasOwnProperty(b)) return a.search()[b]
                },
                setSelectedLineBackButtonURLChangeState: function(a) {
                    d.lineStopsBlocker = a
                },
                getSelectedLineBackButtonURLChangeState: function() {
                    return d.lineStopsBlocker
                },
                storePreviousURL: function(a) {
                    d.previousURL = a
                },
                getStoredPreviousURL: function() {
                    return d.previousURL
                },
                storeURLPath: function(a) {
                    d.path = a
                },
                getStoredURLPath: function() {
                    return d.path
                },
                getDynamicPath: function(b) {
                    return "/test" === a.path().substring(0, 5) ? "/test/" + b : "/schedules/" + b
                },
                setOptionalURL: function(a, b) {
                    d.optionalURL[b] = a
                },
                getOptionalURL: function() {
                    var a = "";
                    for (var b in d.optionalURL) a = a + "&" + [b] + "=" + d.optionalURL[b];
                    return a
                },
                removeValueFromOptionalURL: function(a) {
                    delete d.optionalURL[a]
                },
                returnToHomeView: function() {
                    this.removeValueFromOptionalURL("stopGroupDepartures"), this.setEntireURL(this.getDynamicPath("home") + this.getOptionalURL())
                }
            }
        }])
    }(),
    function() {
        angular.module("scheduleModule").factory("LocalStorageService", ["SearchHistoryService", "SelectedStopHistoryService", function(a, b) {
            return {
                getStoredLinesOrStops: function() {
                    a.getStoredLinesOrStops()
                },
                setStoredLinesOrStops: function(b) {
                    a.setStoredLinesOrStops(b)
                },
                setDepartures: function() {
                    b.putDeparturesToLocalStorage()
                },
                getDepartures: function(a) {
                    return b.getDeparturesFromLocalStorage(a)
                }
            }
        }])
    }(),
    function() {
        angular.module("scheduleModule").directive("sidebar", function() {
            return {
                restrict: "E",
                replace: !0,
                templateUrl: "components/schedule/sidebar/sidebar.html"
            }
        })
    }(),
    function() {
        angular.module("scheduleModule").directive("hintPanel", function() {
            return {
                restrict: "E",
                replace: !0,
                templateUrl: "components/schedule/hint-panel/main-view/hint-panel.html",
                controller: "ScheduleHintPanelCtrl"
            }
        })
    }(),
    function() {
        angular.module("scheduleModule").directive("hintPanelHeader", function() {
            return {
                restrict: "E",
                scope: {
                    headerClick: "=",
                    inputValue: "=",
                    inputClick: "=",
                    inputChange: "=",
                    inputFocus: "=",
                    locationClick: "=",
                    views: "="
                },
                replace: !0,
                templateUrl: "components/schedule/hint-panel/hint-panel-header/hint-panel-header.html"
            }
        })
    }(),
    function() {
        angular.module("scheduleModule").directive("cityLines", function() {
            return {
                restrict: "E",
                scope: {
                    vehicleTypes: "=",
                    cityLines: "=",
                    selectLine: "="
                },
                replace: !0,
                templateUrl: "components/schedule/hint-panel/city-lines/city-lines.html"
            }
        })
    }(),
    function() {
        angular.module("scheduleModule").directive("searchResults", function() {
            return {
                restrict: "E",
                scope: {
                    hintResult: "=",
                    selectLine: "=",
                    selectStop: "="
                },
                replace: !0,
                templateUrl: "components/schedule/hint-panel/search-results/search-results.html"
            }
        })
    }(),
    function() {
        angular.module("scheduleModule").service("SelectedLineService", ["LocationService", "ObjectManager", "CurrentDatesService", "LineGraphService", "$interval", function(a, b, c, d, e) {
            this.selectedLine = {}, this.firstTimeLoad = function(c) {
                var d = e(function() {
                    if (0 != b.lines.length) {
                        e.cancel(d);
                        for (var f = 0, g = b.lines.length; f < g; f++)
                            if (b.lines[f].lineId == a.getURLValue("lineId")) {
                                b.setSelectedLine(b.lines[f]);
                                break
                            } c()
                    }
                }, 100)
            }, this.setLineDirectionIndexByURL = function(b) {
                this.selectedLine.directions = b.directions;
                for (var c = 0, d = this.selectedLine.directions.length; c < d; c++) {
                    if (a.getURLValue("lineDirection") == this.selectedLine.directions[c].endDirectionName) {
                        this.selectedLine.directionIndex = c;
                        break
                    }
                    this.selectedLine.directionIndex = 0;
                    break
                }
            }, this.changeLineDirectionByURL = function() {
                var c = this.selectedLine.lineGraphResponse;
                if (!this.isLineDirectionURLDefined)
                    for (var e = 0, f = c.directions.length; e < f; e++)
                        if (c.directions[e].endDirectionName == a.getURLValue("lineDirection")) {
                            this.selectedLine.graphs = d.convertLineGraph(c, e), b.lineGraph = this.selectedLine.graphs, this.selectedLine.startAndEndDirection = [c.directions[e].startDirectionName, c.directions[e].endDirectionName], this.selectedLine.directionIndex = e;
                            break
                        } this.isLineDirectionURLDefined = !1
            }, this.setLineDirectionURL = function(c) {
                this.isLineDirectionURLDefined = !0;
                var e = d.convertLineGraph(c, this.selectedLine.directionIndex);
                this.selectedLine.graphs = e, b.lineGraph = this.selectedLine.graphs;
                var f = e[0][0].startDirectionName,
                    g = e[0][0].endDirectionName;
                this.selectedLine.startAndEndDirection = [f, g], a.setEntireURL(a.getDynamicPath("lineStops") + "?lineId=" + a.getURLValue("lineId") + "&lineDirection=" + g + "&d=" + a.getURLValue("d") + a.getOptionalURL())
            }, this.setLineDirectionOnToggleDirectionButton = function() {
                this.selectedLine.directionIndex >= 0 && (this.selectedLine.directionIndex == this.selectedLine.directions.length - 1 ? this.selectedLine.directionIndex = 0 : this.selectedLine.directionIndex++);
                var c = b.lineGraphResponse.directions[this.selectedLine.directionIndex].endDirectionName;
                a.setURLValue(["lineDirection", c])
            }
        }])
    }(),
    function() {
        angular.module("scheduleModule").factory("LineGraphConverterService", ["ObjectManager", function(a) {
            return {
                getConvertedLineGraph: function(b, c) {
                    var d = b.directions,
                        e = [],
                        f = d[c].lineDirectionGraph.rowsCells,
                        g = d[c].startDirectionName,
                        h = d[c].endDirectionName,
                        i = d[c].directionCode,
                        j = d[c].lineDirectionShapes;
                    a.setLineShapes(j);
                    for (var k = d[c].stops, l = f.length, m = 0; m < l; m++) {
                        for (var n = f[m].length, o = 0; o < n; o++) f[m][o].index = m, f[m][o].startDirectionName = g, f[m][o].endDirectionName = h, f[m][o].directionCode = i, f[m][o].stop = d[c].stops[f[m][o].stopPresentationIndex], void 0 !== f[m][o].stop ? f[m][o].stopName = f[m][o].stop.stopName : f[m][o].stopName = "", f[m][o].lineType = a.selectedLine.vehicleType || a.selectedLine.lineVehicleType, "STOP" == f[m][o].connectionType && (k[f[m][o].stopPresentationIndex].directionCode = i, k[f[m][o].stopPresentationIndex].index = m, 1 == f[m][o].mainCell ? (f[m][o].stopIconType = "stop_main", k[f[m][o].stopPresentationIndex].mainType = !0) : (f[m][o].stopIconType = "stop", k[f[m][o].stopPresentationIndex].mainType = !1)), "CONNECTION" == f[m][o].connectionType && (1 == f[m][o].mainCell ? f[m][o].stopIconType = "connection_main" : f[m][o].stopIconType = "connection"), "EMPTY" == f[m][o].connectionType && (f[m][o].stopIconType = "empty"), "CROSSROADS" == f[m][o].connectionType && (f[m][o].stopIconType = "crossroads"), "INBOUND_CORNER" != f[m][o].connectionType && "LEFT_CORNER" != f[m][o].connectionType || (f[m][o].stopIconType = "inbound_corner"), "OUTBOUND_CORNER" != f[m][o].connectionType && "RIGHT_CORNER" != f[m][o].connectionType || (f[m][o].stopIconType = "outbound_corner"), 1 === o && ("connection" === f[m][0].stopIconType.substring(0, 10) && "stop" === f[m][1].stopIconType.substring(0, 4) && (f[m][0].stopIconType = "connection_main_long"), "stop" === f[m][0].stopIconType.substring(0, 4) && "connection" === f[m][1].stopIconType.substring(0, 10) && (f[m][1].stopIconType = "connection_long"));
                        e.push(f[m])
                    }
                    return a.setSelectedLineStopsCoordinates(k), e
                }
            }
        }])
    }(),
    function() {
        angular.module("scheduleModule").service("LineGraphService", ["$resource", "LineGraphConverterService", "CurrentDatesService", "LocationService", "TimeSelectorService", "ObjectManager", function(a, b, c, d, e, f) {
            this.getLineGraph = function() {
                var b = d.getURLValue("lineId") || f.selectedLine.lineId,
                    c = a(d.getApiURL() + "schedule/line/directions?citySymbol=:citySymbol&lineId=:lineId", {}, {
                        query: {
                            method: "GET",
                            params: {
                                citySymbol: f.city.citySymbol,
                                lineId: b
                            }
                        }
                    });
                return c
            }, this.convertLineGraph = function(a, c) {
                return b.getConvertedLineGraph(a, c)
            }, this.showDeparturesOrTimetable = function(a) {
                var b = a.stopCode,
                    c = a.stopName;
                f.setSelectedStop(a), d.setEntireURL(d.getDynamicPath("departures") + "?stopName=" + c + "&stopCode=" + b + "&lineId=" + d.getURLValue("lineId") + "&d=" + d.getURLValue("d") + d.getOptionalURL())
            }, this.isToggleButtonVisible = function(a) {
                return 1 != a.directions.length
            }
        }])
    }(),
    function() {
        angular.module("scheduleModule").factory("AnimateDeparturesTablesService", ["LocationService", function(a) {
            return {
                getSelectedDate: function() {
                    var b, c, d;
                    if (void 0 === a.getURLValue("d") || "now" === a.getURLValue("d")) {
                        var e = new Date;
                        b = e.getDay(), c = e.getMonth(), d = e.getFullYear(), b < 10 && (b = "0" + b), c < 10 && (c = "0" + c)
                    } else b = a.getURLValue("d").substring(0, 2), c = a.getURLValue("d").substring(3, 5), d = a.getURLValue("d").substring(6, 10);
                    return parseInt(d + c + b, 10)
                }
            }
        }])
    }(),
    function() {
        angular.module("scheduleModule").factory("TimetableService", ["RealtimeManager", "ConverterPropertiesService", "LocationService", function(a, b, c) {
            return {
                getTimetable: function(d) {
                    var e = [],
                        f = {},
                        g = {},
                        h = 0;
                    a.setObservedLinesRealtimeIds([]), g.realtimeIds = [];
                    for (var i = 0, j = d.stops.length; i < j; i++)
                        for (var k = d.stops[i].lines, l = 0, m = k.length; l < m; l++) {
                            var n = k[l].departures,
                                o = k[l].lineName;
                            if (void 0 !== n) {
                                h++;
                                for (var p = 0, q = n.length; p < q; p++) {
                                    var r;
                                    r = n[p].departureRealtime ? n[p].departureRealtime.replace(/[^a-zA-Z0-9! ]+/g, "") : n[p].departureSchedule.replace(/[^a-zA-Z0-9! ]+/g, "");
                                    var s = r.substring(6, 8),
                                        t = r.substring(9, 13),
                                        u = parseInt(t.substring(0, 2), 10),
                                        v = t.substring(2, 4);
                                    r = parseInt(r.replace("T", "").substring(0, 10), 10), b.setDeparturesRealtimeIfAvailable(g, k, l, p), void 0 === f[r] && (f[r] = {}), void 0 === f[r][v] && (f[r][v] = {}, f[r][v].minute = v), void 0 === f[r][v].lines && (f[r][v].lines = ""), f[r][v].lines = f[r][v].lines + "<span class='line-number'>" + o + "</span>", void 0 === f[r][v].hour && (f[r][v].hour = u), void 0 === f[r][v].day && (f[r][v].day = s), void 0 === f[r][v].sortingValue && (f[r][v].sortingValue = r), e.push({
                                        realtimeId: g.realtimeId,
                                        isRealtimeEnabled: g.isRealtimeEnabled
                                    })
                                }
                            }
                        }
                    f = Object.keys(f).map(function(a) {
                            return f[a]
                        }),
                        function() {
                            for (var a in f) f[a] = Object.keys(f[a]).map(function(b) {
                                return f[a][b]
                            }), f[a].sort(function(a, b) {
                                return a.minute - b.minute
                            })
                        }(), f.sort(function(a, b) {
                            return a[0].sortingValue - b[0].sortingValue
                        }),
                        function() {
                            for (var a = 0, b = 0; b < f.length; b++) {
                                var d = parseInt(c.getURLValue("d").substring(0, 2), 10),
                                    e = d + 1;
                                if (b > 0) {
                                    var g = f[b - 1][0].hour,
                                        h = f[b][0].hour,
                                        i = f[b - 1][0].day,
                                        j = f[b][0].day;
                                    h - g > 1 && (i !== e ? f.splice(b, 0, [{
                                        hour: g + 1,
                                        day: i
                                    }]) : f.splice(b, 0, [{
                                        hour: g + 1,
                                        day: e
                                    }])), i !== j && void 0 !== i && (g < 23 && i !== e ? f.splice(b, 0, [{
                                        hour: g + 1,
                                        day: i
                                    }]) : 0 === a && 0 !== h && (f.splice(b, 0, [{
                                        hour: a,
                                        day: e
                                    }]), a++))
                                }
                            }
                        }(),
                        function() {
                            var a = new Date,
                                b = a.getDate(),
                                d = a.getMinutes(),
                                e = a.getHours(),
                                g = parseInt(c.getURLValue("d").substring(0, 2), 10),
                                h = !1;
                            if (g === b)
                                for (var i = 0, j = f.length; i < j; i++)
                                    for (var k = 0, l = f[i].length; k < l; k++) void 0 !== f[i][k] && f[i][k].lines && (parseInt(f[i][k].day, 10) === b ? parseInt(f[i][k].hour, 10) < e ? f[i][k].className = "passed-arrival" : parseInt(f[i][k].hour, 10) === e ? parseInt(f[i][k].minute, 10) < d ? f[i][k].className = "passed-arrival" : parseInt(f[i][k].minute, 10) >= d && h === !1 && (h = !0, f[i][k].className = "nearest-arrival") : parseInt(f[i][k].hour, 10) > e && h === !1 && (h = !0, f[i][k].className = "nearest-arrival") : h === !1 && (h = !0, f[i][k].className = "nearest-arrival"))
                        }();
                    var w = "";
                    return function() {
                        var a = c.getURLValue("d").split("."),
                            b = new Date(a[2], a[1] - 1, a[0]),
                            d = (a[0], b),
                            e = !1;
                        d.setDate(b.getDate() + 1);
                        for (var g = 0, i = f.length; g < i; g++) {
                            for (var j = "", k = 0, l = f[g].length; k < l; k++)
                                if (f[g][k].minute) {
                                    var m = void 0 !== f[g][k].className ? f[g][k].className : "",
                                        n = 1 === h ? "hide-lines" : "display-lines";
                                    j = j + "<span class='minutes'><span class='minute " + m + "'>" + f[g][k].minute + "</span><span class='lines " + n + " lines-" + m + "'>" + f[g][k].lines + "</span></span>"
                                }
                            "" == j && (j = "<span class='minutes'><span class='minute'></span><span class='lines lines-'></span></span>"), e === !1 && f[g][0].day == d.getDate() && (w = w + "<tr><th scope='col' class='cn-timetable__hour-header'> </th><td class='cn-timetable__hour-header'>" + d.getDate() + "." + ("0" + (d.getMonth() + 1)).slice(-2) + "." + d.getFullYear() + "</td></tr>", e = !0), w = w + "<tr><th scope='col'>" + f[g][0].hour + "</th><td>" + j + "</td></tr>"
                        }
                    }(), {
                        timetable: w,
                        departures: e
                    }
                }
            }
        }])
    }(),
    function() {
        angular.module("scheduleModule").factory("SelectedStopService", ["SelectedStopConverterService", "TimetableService", "SelectedStopListOfLinesService", "SelectedStopDirectionService", "SelectedStopAPIQueryService", "DeparturesRealtimeConverter", "SpecialMessagesService", "LocationService", "LocalStorageService", "TimeSelectorService", "ObjectManager", "RealtimeManager", function(a, b, c, d, e, f, g, h, i, j, k, l) {
            return {
                departureQuery: function() {
                    return e.query()
                },
                extractStopCodesIfNotAvailable: function() {
                    e.extractStopCodes()
                },
                setObjectManagerSelectedStopIfNotPresent: function(a) {
                    if (0 === Object.getOwnPropertyNames(k.selectedStop).length)
                        for (var b = 0, c = a.length; b < c; b++) a[b].stopCode == h.getURLValue("stopCode") && k.setSelectedStop(a[b])
                },
                realtimeQuery: function(a) {
                    return e.realtimeQuery(a)
                },
                convertRealtimeDepartures: function(a, b) {
                    return f.convertRealtimeDepartures(a, b)
                },
                convertDeparturesTable: function(b) {
                    if ("string" == typeof h.getURLValue("stopCode")) return a.convertDeparturesTable(b)
                },
                getTimetableModel: function(a) {
                    return b.getTimetable(a)
                },
                setStopHistory: function() {
                    i.setDepartures()
                },
                getStopName: function(a) {
                    return a.stopsGroupName
                },
                selectLine: function(a) {
                    c.selectLine(a)
                },
                selectStop: function(a) {
                    d.selectStop(a)
                },
                removeStop: function(a) {
                    d.removeStop(a)
                },
                getStopVariants: function(a) {
                    return d.getStopVariants(a)
                },
                getListOfLines: function(a) {
                    return c.getListOfLines(a)
                },
                getFilteredListOfLines: function(a) {
                    return c.getFilteredListOfLines(a)
                },
                selectLinesByURL: function(a) {
                    c.selectLinesByURL(a)
                },
                getRealtimeIds: function() {
                    return l.realtimeIds
                },
                isShowTimetableButtonVisible: function() {
                    return "string" == typeof h.getURLValue("lineId")
                },
                goToTimetableView: function(a) {
                    for (var b = 0, c = a.length; b < c; b++)
                        if (a[b].lineId == h.getURLValue("lineId")) {
                            h.storePreviousURL(h.getEntireURL()), h.setEntireURL(h.getDynamicPath("timetable") + "?lineId=" + a[b].lineId + "&directionCode=" + a[b].directionCode + "&stopCode=" + a[b].stopCode + h.getOptionalURL());
                            break
                        }
                },
                getSecondsToFullMinute: function() {
                    var a = new Date;
                    return parseInt(60 - a.getSeconds() + 3 + "000", 10)
                },
                getCurrentTime: function() {
                    return j.getCurrentTime()
                },
                getDepartureSpecialMessages: function(a, b) {
                    return g.getSpecialMessages(a, b)
                },
                isLineVisible: function(a) {
                    return c.isLineVisible(a)
                }
            }
        }])
    }(),
    function() {
        angular.module("scheduleModule").factory("SelectedStopAPIQueryService", ["$resource", "$location", "LocationService", "HintPanelService", "ObjectManager", function(a, b, c, d, e) {
            var f = function(a, b) {
                if (void 0 != a) {
                    var c = "";
                    if ("string" == typeof a) c = "&" + b + "=" + a;
                    else
                        for (var d = 0, e = a.length; d < e; d++) c = c + "&" + b + "=" + a[d];
                    return c
                }
                return ""
            };
            return {
                query: function() {
                    var b = e.city.citySymbol,
                        d = function() {
                            return void 0 !== c.getURLValue("d") && "now" !== c.getURLValue("d")
                        },
                        g = function() {
                            var a = "";
                            if (c.getURLValue("dateTime")) a = "&dateTime=" + c.getURLValue("dateTime");
                            else if (d() === !0) {
                                var b = c.getURLValue("d");
                                a = "&dateTime=" + b.substring(0, 5) + "." + b.substring(8, 10) + " 00:00"
                            }
                            return a
                        },
                        h = function() {
                            return void 0 !== c.getURLValue("stopGroupDepartures") && c.getURLValue("stopGroupDepartures")
                        },
                        i = a(c.getApiURL() + "schedule/departures?citySymbol=:citySymbol&fullSchedule=:fullSchedule&stopGroupDepartures=:stopGroupDepartures" + f(c.getURLValue("stopCode"), "stopCode") + f(c.getURLValue("lineId"), "lineId") + g(), {}, {
                            query: {
                                method: "GET",
                                params: {
                                    citySymbol: b,
                                    fullSchedule: d(),
                                    stopGroupDepartures: h()
                                }
                            }
                        });
                    return i
                },
                extractStopCodes: function() {
                    void 0 == c.getURLValue("stopCode") && d.getTypedValue(c.getURLValue("stopName")).query(function(a) {
                        var b = d.extractStops(a);
                        e.setSelectedStop(b[1]);
                        var g = function(a) {
                            for (var b = "", c = 0; c < a.stopsCodes.length; c++) b = b + "&stopCode=" + a.stopsCodes[c];
                            return b
                        };
                        c.setEntireURL(c.getLocationPath() + "?stopName=" + c.getURLValue("stopName") + g(b[1]) + f(c.getURLValue("lineId"), "lineId") + c.getOptionalURL())
                    })
                },
                realtimeQuery: function() {
                    return a(c.getApiURL() + "realtime", {}, {
                        query: {
                            method: "POST",
                            ignoreLoadingBar: !0,
                            headers: {
                                "Content-Type": "application/json"
                            }
                        }
                    })
                }
            }
        }])
    }(),
    function() {
        angular.module("scheduleModule").service("SelectedStopConverterService", ["ConverterPropertiesService", "LocationService", "RealtimeManager", function(a, b, c) {
            return {
                convertDeparturesTable: function(d) {
                    var e = [],
                        f = {};
                    c.setObservedLinesRealtimeIds([]), f.realtimeIds = [];
                    var g = !0,
                        h = new Date;
                    if (void 0 !== b.getURLValue("dateTime")) {
                        var i = h.getDate().toString(),
                            j = b.getURLValue("dateTime").substring(0, 2),
                            k = h.getMonth() + 1,
                            l = parseInt(b.getURLValue("dateTime").substring(3, 5));
                        g = i == j && k == l
                    }
                    for (var m = 0; m < d.stops.length; m++) {
                        f.lines = d.stops[m].lines;
                        for (var n = d.stops[m].lines, o = 0, p = n.length; o < p; o++)
                            if (f.lineName = n[o].lineName, f.lineId = n[o].lineId, f.lineDirectionName = n[o].lineDirectionName, f.vehicleType = n[o].vehicleType, n[o].departures)
                                for (var q = 0; q < n[o].departures.length; q++) {
                                    var r;
                                    r = n[o].departures[q].departureRealtime ? n[o].departures[q].departureRealtime : n[o].departures[q].departureSchedule, f.departure = r.substring(11, 16), f.timeZone = r.substring(23, 28);
                                    var s = r.substring(0, 4),
                                        t = r.substring(5, 7),
                                        u = r.substring(8, 10);
                                    a.setMinutesToSubtract(f), n[o].departures[q].journeyAlerts ? f.journeyMessage = n[o].departures[q].journeyAlerts[0].messageHtml : f.journeyMessage = "", n[o].departures[q].cancelled ? f.cancelled = n[o].departures[q].cancelled : f.cancelled = !1, f.cleanedDeparture = f.departure.replace(/[^a-zA-Z0-9! ]+/g, ""),
                                        function() {
                                            var a = new Date;
                                            a.setHours(a.getUTCHours() + parseInt(f.timeZone.substring(2, 3), 10)), a.getDate() < parseInt(u, 10) && (f.cleanedDeparture = parseInt(f.cleanedDeparture.substring(0, 2), 10) + 24 + f.cleanedDeparture.substring(2, 4))
                                        }(), f.minutesToArrival = a.convertMinutesToArrival(f.cleanedDeparture, f.minutesToSubtract), f.minutesOrHours = "minutes";
                                    for (var v = f.minutesToArrival >= 0, w = 0; w < c.realtimeIdsByStopPassed.length; w++)
                                        if (f.realtimeId !== !1 && c.realtimeIdsByStopPassed[w].realtimeId === f.realtimeId) {
                                            0 == c.realtimeIdsByStopPassed[w].stopPassed && (v = !0);
                                            break
                                        } if (v && f.minutesToArrival <= 420 || void 0 !== b.getURLValue("dateTime")) {
                                        a.setDeparturesRealtimeIfAvailable(f, n, o, q), f.minutesToArrival >= 60 && a.convertMinutesToHours(f);
                                        var x = s + t + u,
                                            y = parseFloat(x + f.cleanedDeparture.toString() + "." + m + o.toString() + q.toString());
                                        g === !1 && (f.isToday = !1, f.minutesToArrival = n[o].departures[q].departureSchedule.substring(8, 10) + "." + n[o].departures[q].departureSchedule.substring(5, 7)), f.minutesToArrival < 0 && (f.minutesToArrival = "00");
                                        var z = n[o].departures[q].departureSchedule.substring(11, 16),
                                            A = n[o].departures[q].departureRealtime ? n[o].departures[q].departureRealtime.substring(11, 16) : void 0,
                                            B = n[o].departures[q].boardingRestriction;
                                        if (void 0 === n[o].departures[q].headingTextOverride) var C = n[o].lineDirectionName;
                                        else var C = n[o].departures[q].headingTextOverride;
                                        e.push({
                                            cancelled: f.cancelled,
                                            departure: z,
                                            departureRealtime: A,
                                            boardingRestriction: B,
                                            headingTextOverride: C,
                                            lineName: f.lineName,
                                            lineId: f.lineId,
                                            lineDirectionName: f.lineDirectionName,
                                            vehicleType: f.vehicleType,
                                            sortingValue: y,
                                            minutesToArrival: f.minutesToArrival,
                                            minutesOrHours: f.minutesOrHours,
                                            realtimeId: f.realtimeId,
                                            isRealtimeEnabled: f.isRealtimeEnabled,
                                            predictedDelay: f.realtimePredictedDelay,
                                            journeyMessage: f.journeyMessage,
                                            isToday: f.isToday,
                                            trackingValue: f.cleanedDeparture + f.lineName + f.lineDirectionName + y
                                        })
                                    }
                                }
                    }
                    return c.realtimeIdsByStopPassed = [], e.sort(function(a, b) {
                        return a.sortingValue - b.sortingValue
                    }), e
                }
            }
        }])
    }(),
    function() {
        angular.module("scheduleModule").service("SelectedStopListOfLinesService", ["LocationService", function(a) {
            this.selectLine = function(c) {
                var d = a.getURLValue("lineId"),
                    e = [];
                void 0 === d ? e.push(!1) : "string" == typeof d ? e.push(d) : e = d, b(c, e)
            };
            var b = function(b, c) {
                for (var d = !1, e = !1, f = a.getEntireURL(), g = "", h = f.replace(/&lineId=.*/, ""), i = 0, j = c.length; i < j; i++) c[i] === !1 ? g = g + "&lineId=" + b : c[i] !== b ? (g = g + "&lineId=" + c[i], d = !0) : e = !0;
                d === !0 && e !== !0 && (g = g + "&lineId=" + b), h = h.replace(new RegExp(a.getOptionalURL()), ""), h = h.replace("&stopCode=" + a.getURLValue("stopCode"), ""), h = h + "&stopCode=" + a.getURLValue("stopCode"), void 0 !== a.getURLValue("d") && (h = h.replace("&d=" + a.getURLValue("d")), h = h + "&d=" + a.getURLValue("d")), h = h.replace("undefined", ""), a.setEntireURL(h + g + a.getOptionalURL())
            };
            this.getListOfLines = function(a) {
                for (var b = [], e = a.stops, f = 0, g = e.length; f < g; f++)
                    for (var h = e[f].lines.length, i = 0; i < h; i++) {
                        var j = e[f].lines[i].lineName,
                            k = e[f].lines[i].directionCode,
                            l = e[f].lines[i].vehicleType,
                            m = e[f].lines[i].lineId,
                            n = e[f].stopCode;
                        b.push({
                            lineName: j,
                            stopCode: n,
                            lineId: m,
                            vehicleType: l,
                            directionCode: k
                        })
                    }
                return b = c(b), b = d(b)
            }, this.getFilteredListOfLines = function(b) {
                for (var e, f, g, h, i, j = [], k = b.stops, l = 0, m = k.length; l < m; l++) {
                    var n = k[l].lines.length;
                    if ("string" == typeof a.getURLValue("stopCode")) {
                        if (a.getURLValue("stopCode") == k[l].stopCode)
                            for (var o = 0; o < n; o++) e = k[l].lines[o].lineName, f = k[l].lines[o].directionCode, g = k[l].lines[o].vehicleType, h = k[l].lines[o].lineId, i = k[l].stopCode, j.push({
                                lineName: e,
                                stopCode: i,
                                lineId: h,
                                vehicleType: g,
                                directionCode: f
                            })
                    } else
                        for (var p = a.getURLValue("stopCode"), q = 0; q < p.length; q++)
                            if (p[q] == k[l].stopCode)
                                for (var o = 0; o < n; o++) e = k[l].lines[o].lineName, f = k[l].lines[o].directionCode, g = k[l].lines[o].vehicleType, h = k[l].lines[o].lineId, i = k[l].stopCode, j.push({
                                    lineName: e,
                                    stopCode: i,
                                    lineId: h,
                                    vehicleType: g,
                                    directionCode: f
                                })
                }
                return j = c(j), j = d(j)
            };
            var c = function(a) {
                    return a.sort(function(a, b) {
                        return naturalSort(a.lineName, b.lineName)
                    }), a
                },
                d = function(a) {
                    var b = [],
                        c = {};
                    return a.forEach(function(a) {
                        c[a.lineName] || (b.push(a), c[a.lineName] = a)
                    }), a = b
                };
            this.selectLinesByURL = function(b) {
                for (var c = 0, d = b.length; c < d; c++)
                    if (b[c].isLineSelected = !1, "string" == typeof a.getURLValue("lineId")) a.getURLValue("lineId") == b[c].lineId && (b[c].isLineSelected = !0);
                    else if (a.getURLValue("lineId"))
                    for (var e = 0; e < a.getURLValue("lineId").length; e++) a.getURLValue("lineId")[e] == b[c].lineId && (b[c].isLineSelected = !0)
            }, this.isLineVisible = function(b) {
                for (var c = !1, d = 0, e = b.length; d < e; d++)
                    if ("string" == typeof a.getURLValue("lineId")) {
                        if (b[d].lineId === a.getURLValue("lineId") && d >= 9) {
                            c = !0;
                            break
                        }
                    } else if (void 0 !== a.getURLValue("lineId"))
                    for (var f = a.getURLValue("lineId"), g = 0, h = f.length; g < h; g++)
                        if (f[g] === b[d].lineId && d >= 9) {
                            c = !0;
                            break
                        } return c
            }
        }])
    }(),
    function() {
        angular.module("scheduleModule").service("SelectedStopDirectionService", ["LocationService", "ObjectManager", function(a, b) {
            this.getStopVariants = function(a) {
                for (var b = a.stops, c = [], d = 0, e = b.length; d < e; d++) {
                    c.push({
                        stopCode: b[d].stopCode,
                        nextStopName: b[d].nextStopName,
                        stopName: a.stopsGroupName,
                        stopCoordinate: b[d].stopCoordinate,
                        lines: []
                    });
                    for (var f = 0; f < b[d].lines.length; f++) c[d].lines.push({
                        lineName: b[d].lines[f].lineName,
                        lineId: b[d].lines[f].lineId
                    })
                }
                return c
            }, this.selectStop = function(d) {
                b.setSelectedStop(d), void 0 != a.getURLValue("lineId") ? c(d) : a.setURLValue(["stopCode", d.stopCode])
            };
            var c = function(b) {
                var c = [];
                "string" == typeof a.getURLValue("lineId") ? c.push(a.getURLValue("lineId")) : c = a.getURLValue("lineId");
                for (var d = [], e = 0, f = b.lines.length; e < f; e++)
                    for (var g = 0, h = c.length; g < h; g++) b.lines[e].lineId === c[g] && d.push(b.lines[e].lineId);
                var i = function(a) {
                        for (var b = "", c = 0, d = a.length; c < d; c++) b = b + "&lineId=" + a[c];
                        return b
                    },
                    j = function() {
                        var b = "";
                        return void 0 !== a.getURLValue("d") && (b = "&d=" + a.getURLValue("d")), b
                    };
                a.setEntireURL(a.getDynamicPath("departures") + "?stopName=" + a.getURLValue("stopName") + i(d) + "&stopCode=" + b.stopCode + j() + a.getOptionalURL())
            }
        }])
    }(),
    function() {
        angular.module("scheduleModule").factory("SelectedStopHistoryService", ["$location", "LocationService", "ObjectManager", function(a, b, c) {
            return {
                putDeparturesToLocalStorage: function() {
                    var d = c.city.citySymbol + "." + b.getURLValue("stopName"),
                        e = a.url().replace(a.path(), "").replace("&d=" + b.getURLValue("d"), "");
                    if (localStorage.getItem("departures")) {
                        var f = JSON.parse(localStorage.getItem("departures")),
                            g = function(a) {
                                for (var b = 0; b < a.length; b++)
                                    if (a[b].stopDetails == d) return b
                            },
                            h = g(f);
                        void 0 != h ? f[h].stopURL = e : f.push({
                            stopDetails: d,
                            stopURL: e
                        }), localStorage.setItem("departures", JSON.stringify(f))
                    } else {
                        var i = [{
                            stopDetails: d,
                            stopURL: e
                        }];
                        localStorage.setItem("departures", JSON.stringify(i))
                    }
                },
                getDeparturesFromLocalStorage: function(a) {
                    function b(a) {
                        return a.indexOf("stopGroupDepartures=false") !== -1 ? a.slice(0, a.indexOf("stopGroupDepartures") + 20) + "true" + a.slice(a.indexOf("stopGroupDepartures") + 25) : a.indexOf("stopGroupDepartures=undefined") !== -1 ? a.slice(0, a.indexOf("stopGroupDepartures") + 20) + "true" + a.slice(a.indexOf("stopGroupDepartures") + 29) : a.indexOf("stopGroupDepartures=true") !== -1 ? a : a.indexOf("stopGroupDepartures") === -1 ? a + "&stopGroupDepartures=true" : void 0
                    }
                    if (localStorage.getItem("departures"))
                        for (var d = JSON.parse(localStorage.getItem("departures")), e = c.city.citySymbol + "." + a.stopName, f = 0; f < d.length; f++)
                            if (d[f].stopDetails == e) return b(d[f].stopURL)
                }
            }
        }])
    }(),
    function() {
        angular.module("scheduleModule").service("ConverterPropertiesService", ["RealtimeManager", function(a) {
            this.setDeparturesRealtimeIfAvailable = function(b, c, d, e) {
                if (c[d].departures[e].departureRealtime) {
                    b.isRealtimeEnabled = !0;
                    var f = new Date(new moment(c[d].departures[e].departureRealtime).format()),
                        g = new Date(new moment(c[d].departures[e].departureSchedule).format()),
                        h = Math.floor(f.getTime() / 1e3 / 60),
                        i = Math.floor(g.getTime() / 1e3 / 60);
                    b.realtimePredictedDelay = i - h, b.realtimeId = c[d].departures[e].realtimeId, b.realtimeIds.push(b.realtimeId), a.setObservedLinesRealtimeIds(b.realtimeIds)
                } else b.isRealtimeEnabled = !1, b.realtimePredictedDelay = !1, b.realtimeId = !1
            }, this.setMinutesToSubtract = function(a) {
                var b = new Date,
                    c = parseInt(a.timeZone.substring(2, 3)),
                    d = b.getUTCHours() + c;
                d >= 24 && (d -= 24), d < 10 && (d = "0" + d.toString());
                var e = b.getMinutes();
                e < 10 && (e = "0" + e.toString()), a.minutesToSubtract = d.toString() + e.toString()
            }, this.convertMinutesToArrival = function(a, b) {
                var c = parseInt(a.toString().substring(0, 2)),
                    d = parseInt(a.toString().substring(2, 4)),
                    e = parseInt(b.toString().substring(0, 2)),
                    f = parseInt(b.toString().substring(2, 4));
                d < f && (c -= 1, d += 60);
                var g = 60 * (c - e),
                    h = d - f,
                    i = g + h;
                return i < 10 && i > -1 && (i = "0" + i), i
            }, this.convertMinutesToHours = function(a) {
                a.minutesOrHours = "hours";
                var b = parseInt(a.minutesToArrival, 10) / 60,
                    c = (Math.floor(2 * b) / 2).toString();
                c = 1 == c.length ? "0" + c : parseFloat(c).toLocaleString(), a.minutesToArrival = c, 4 === a.minutesToArrival.length && (a.minutesToArrival = a.minutesToArrival.substring(0, 3));
                var d = a.minutesToArrival.toString().length,
                    e = a.minutesToArrival.toString().charAt(d - 1);
                "," !== e && "." !== e || (a.minutesToArrival = a.minutesToArrival.toString().substring(0, d - 1))
            }
        }])
    }(),
    function() {
        angular.module("scheduleModule").factory("DeparturesRealtimeConverter", ["ConverterPropertiesService", "RealtimeManager", function(a, b) {
            return {
                convertRealtimeDepartures: function(a, c) {
                    var d = {};
                    if (b.vehicles.length = 0, c.vehicles)
                        for (var e = 0, f = c.vehicles.length; e < f; e++)
                            if (b.setVehicles(c.vehicles[e]), void 0 != c.vehicles[e].stopPrediction)
                                for (var g = 0; g < a.length; g++)
                                    if (c.vehicles[e].realtimeId == a[g].realtimeId) {
                                        d.realtimeMinutes = c.vehicles[e].stopPrediction.realtimeDeparture.substring(11, 16).replace(/[^a-zA-Z0-9! ]+/g, ""), d.departureMinutes = c.vehicles[e].stopPrediction.scheduleDeparture.substring(11, 16).replace(/[^a-zA-Z0-9! ]+/g, ""), d.realtimeSeconds = c.vehicles[e].stopPrediction.precisePredictionDeparture.substring(17, 19);
                                        for (var h = parseFloat(a[g].sortingValue.toString().substring(0, 12) + "." + d.realtimeSeconds + "0" + g), i = 0; i < b.realtimeIdsByStopPassed.length; i++) a[g].realtimeId === b.realtimeIdsByStopPassed[i].realtimeId && b.realtimeIdsByStopPassed.splice(i, 1);
                                        b.realtimeIdsByStopPassed.push({
                                            realtimeId: a[g].realtimeId,
                                            stopPassed: c.vehicles[e].stopPrediction.stopPassed
                                        }), a[g].sortingValue = h, a[g].trackingValue = a[g].sortingValue + a[g].lineName + a[g].lineDirectionName + Math.random(), a[g].secondsToArrival = c.vehicles[e].stopPrediction.secondsToArrival, a[g].stopPassed = c.vehicles[e].stopPrediction.stopPassed, a[g].staysAtStop = c.vehicles[e].stopPrediction.staysAtStop;
                                        break
                                    } return a.sort(function(a, b) {
                        return a.sortingValue - b.sortingValue
                    }), a
                }
            }
        }])
    }(),
    function() {
        angular.module("scheduleModule").factory("BackButtonService", ["SelectedLineService", "LocationService", function(a, b) {
            var c = {};
            return {
                setView: function(a) {
                    c[a] = b.getEntireURL().replace(b.getOptionalURL(), "");
                },
                returnToLastView: function() {
                    var a, d = -1;
                    for (var e in c) d++, Object.keys(c).length - 1 === d ? delete c[e] : a = c[e];
                    void 0 === a ? b.returnToHomeView() : b.setEntireURL(a + b.getOptionalURL())
                },
                removeLastView: function() {
                    var a = -1;
                    for (var b in c) a++, Object.keys(c).length - 1 === a && delete c[b]
                },
                removeAllValues: function() {
                    c = {}
                }
            }
        }])
    }(),
    function() {
        angular.module("jakdojadeWebApp").controller("ModuleCommunicatorCtrl", ["$scope", "$rootScope", function(a, b) {
            a.$on("map.removeMissingVehicles", function(b, c) {
                a.$broadcast("selectedStop.removeMissingVehicles", c)
            }), a.$on("selectedStop.removeVehicleOnStopPassed", function(b, c) {
                a.$broadcast("map.removeVehicleOnStopPassed", c)
            }), a.$on("map.toggledSidebar", function(b, c) {
                a.$broadcast("sidebar.toggledSidebar", c)
            }), a.$on("map.openSidebar", function() {
                a.$broadcast("selectedStop.openSidebar")
            }), a.$on("map.changeCity", function() {
                a.$broadcast("cityChange")
            }), a.$on("map.zoomOnLineRoute", function() {
                a.$broadcast("lineGraph.zoomOnLineRoute")
            }), a.$on("map.removeLineRoute", function() {
                a.$broadcast("selectedLine.removeLineRoute"), b.removeLineRouteOnExit = !0
            }), a.$on("map.centerMapOnStop", function() {
                a.$broadcast("selectedStop.centerMapOnStop"), a.$broadcast("selectedStop.drawDepartures")
            }), a.$on("map.removeDepartures", function() {
                a.$broadcast("selectedStop.removeDepartures")
            }), a.$on("map.drawLineGraph", function() {
                a.$broadcast("lineGraph.drawLinePath")
            }), a.$on("map.mouseOverLineGraphStop", function(b, c) {
                a.$broadcast("lineGraph.mouseOverStop", c)
            }), a.$on("map.mouseLeaveLineGraphStop", function(b, c) {
                a.$broadcast("lineGraph.mouseLeaveStop", c)
            }), a.$on("lineGraph.mouseOverLineGraphStop", function(b, c) {
                a.$broadcast("map.mouseOverMapStop", c)
            }), a.$on("lineGraph.mouseLeaveLineGraphStop", function(b, c) {
                a.$broadcast("map.mouseLeaveMapStop", c)
            }), a.$on("map.location", function(b, c) {
                a.$broadcast("hintPanel.location", c)
            }), a.$on("sidebarForm.setNearestStop", function(b, c) {
                a.$broadcast("map.setNearestStop", c)
            }), a.$on("sidebarHintPanel.noStopsFound", function() {
                a.$broadcast("map.noStopsFound")
            }), a.$on("map.drawVehicles", function() {
                a.$broadcast("selectedStop.drawVehicles")
            }), a.$on("map.updateVehiclesPosition", function() {
                a.$broadcast("selectedStop.updateVehiclesPosition")
            }), a.$on("map.removeVehicles", function() {
                a.$broadcast("selectedStop.removeVehicles")
            }), a.$on("map.removeAllVehicles", function() {
                a.$broadcast("selectedStop.removeAllVehicles")
            })
        }])
    }(),
    function() {
        "use strict";
        var a = angular.module("mapModule");
        a.controller("MapCtrl", ["$scope", "$rootScope", "$timeout", "MapService", "LocationService", "ObjectManager", "leafletEvents", "leafletData", "configuration", function(a, b, c, d, e, f, g, h, i) {
            angular.extend(a, {
                center: {
                    lat: d.getLocalHistoryLatitude(),
                    lng: d.getLocalHistoryLongitude(),
                    zoom: 14
                },
                paths: {},
                layers: {
                    baselayers: {
                        osm: {
                            name: "OpenStreetMap",
                            url: "https://maps.jakdojade.pl/osm/{z}/{x}/{y}.png",
                            type: "xyz"
                        }
                    }
                },
                events: {
                    map: {
                        disable: g.getAvailableMapEvents()
                    },
                    markers: {
                        disable: g.getAvailableMarkerEvents()
                    }
                },
                defaults: {
                    scrollWheelZoom: !0
                }
            }), setTimeout(function() {
                h.getMap().then(function(a) {
                    return a.attributionControl.setPrefix('<a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a> | &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors')
                })
            }, 0), a.customerMapLink = JSON.parse(i.city).mapLink, a.$on("cityChange", function() {
                void 0 !== f.city.cityCoordinates && (a.center.lat = f.city.cityCoordinates.y_lat, a.center.lng = f.city.cityCoordinates.x_lon, a.center.zoom = 14, a.bounds = {}, a.paths = {})
            }), a.$on("selectedLine.removeLineRoute", function() {
                b.removeLineRouteOnExit && (a.bounds = {}, a.paths = {})
            }), a.$on("selectedStop.centerMapOnStop", function() {
                a.center.zoom = 15, a.center.lat = f.selectedStop.stopCoordinate.y_lat, a.center.lng = f.selectedStop.stopCoordinate.x_lon
            });
            var j = !0;
            a.$on("map.setStopsLayer", function(b, c) {
                j === !0 ? "true" === c ? (a.stopsButtonActive = !0, a.$broadcast("showMapStopsLayer")) : (a.stopsButtonActive = !1, a.$broadcast("hideMapStopsLayer")) : j = !0
            }), a.stopsButtonActive = !1, a.showStops = function() {
                a.stopsButtonActive = !a.stopsButtonActive, a.stopsButtonActive ? a.$broadcast("showMapStopsLayer") : a.$broadcast("hideMapStopsLayer"), void 0 !== e.getURLValue("stopsLayer") && (e.setURLValue(["stopsLayer", a.stopsButtonActive.toString()]), j = !1)
            };
            var k = !0;
            a.$on("map.setLocation", function(b, c) {
                if (k === !0)
                    if ("true" === c) {
                        a.locationButtonActive = !0;
                        var d;
                        d = void 0 === e.getURLValue("autoLocalization"), a.$broadcast("hintPanel.location", d)
                    } else a.locationButtonActive = !1, a.$broadcast("mapHideUserLocation");
                else k = !0
            }), a.locationButtonActive = !1, a.showLocationOnly = function() {
                if (a.locationButtonActive = !a.locationButtonActive, a.locationButtonActive) {
                    var b = !1;
                    a.$broadcast("hintPanel.location", b)
                } else a.$broadcast("mapHideUserLocation");
                void 0 !== e.getURLValue("autoLocalization") && (e.setURLValue(["autoLocalization", a.locationButtonActive.toString()]), k = !1), void 0 !== e.getURLValue("radar") && (e.setURLValue(["radar", a.locationButtonActive.toString()]), k = !1)
            }, a.$on("map.removeStopsLayer", function() {
                a.stopsButtonActive && (a.stopsButtonActive = !1, a.$broadcast("hideMapStopsLayer")), a.locationButtonActive && (a.locationButtonActive = !1, a.$broadcast("mapHideUserLocation"))
            }), a.$on("map.setZoom", function(b, c) {
                a.center.zoom = parseInt(c)
            }), a.$on("map.setCoordinates", function(b, c) {
                if (void 0 !== c) {
                    var d = parseInt(c.indexOf(":"));
                    a.center.lat = parseFloat(c.substring(0, d)), a.center.lng = parseFloat(c.substring(d + 1, c.length))
                }
            })
        }])
    }(),
    function() {
        angular.module("jakdojadeWebApp").directive("keysUpDown", ["$timeout", "DetectMobileDevice", function(a, b) {
            return function(c, d, e) {
                var f = -1,
                    g = 0,
                    h = function(a) {
                        var b = angular.element("#sidebar").height(),
                            c = angular.element(".search-list").find(angular.element(".search-list li")[a]).offset().top;
                        return {
                            scrollUp: c < angular.element(".search-list").find(angular.element(".search-list li")).height(),
                            scrollDown: b < c
                        }
                    };
                d.keydown(function(a) {
                    var b = 2 * angular.element(".search-list").find(angular.element(".search-list li")).height();
                    if (38 == a.keyCode) a.preventDefault(), f > 0 ? (f--, angular.element(".search-list").find(angular.element(".search-list li")[f]).addClass("keyboard-selection"), angular.element(".search-list").find(angular.element(".search-list li")[f + 1]).removeClass("keyboard-selection"), h(f).scrollUp && (g -= b, angular.element(e.scrollElement).animate({
                        scrollTop: g
                    }, 100))) : (g = 0, angular.element(e.scrollElement).animate({
                        scrollTop: g
                    }, 150));
                    else if (40 == a.keyCode) a.preventDefault(), f < angular.element(".search-list li").length - 1 && (f++, angular.element(".search-list").find(angular.element(".search-list li")[f]).addClass("keyboard-selection"), angular.element(".search-list").find(angular.element(".search-list li")[f - 1]).removeClass("keyboard-selection"), h(f).scrollDown && (g += b, angular.element(e.scrollElement).animate({
                        scrollTop: g
                    }, 100)));
                    else if (13 == a.keyCode) {
                        if (f !== -1) {
                            var i = document.getElementsByClassName("input-result")[f].getAttribute("click"),
                                k = JSON.parse(e.listObject);
                            c.$apply(function() {
                                c[i](k[f])
                            }), f = -1, i = null, k = null
                        }
                    } else d.find("input").focus();
                    j()
                });
                var i = function(g) {
                    f = g, angular.element(".search-list li").removeClass("keyboard-selection"), angular.element(".search-list").find(angular.element(".search-list li")[f]).addClass("keyboard-selection"), a(function() {
                        if (d[0].focus(), b.isMobile()) {
                            var a = document.getElementsByClassName("input-result")[f].getAttribute("click"),
                                g = JSON.parse(e.listObject);
                            c[a](g[f])
                        }
                    }, 0)
                };
                c.mouseEnter = i;
                var j = function() {
                    c.mouseEnter = null, a(function() {
                        c.mouseEnter = i
                    }, 400)
                };
                d.blur(function() {
                    f = -1, angular.element(".search-list li").removeClass("keyboard-selection")
                }), c.$watch("inputValue", function() {
                    f = -1
                }), c.$on("$locationChangeSuccess", function() {
                    c.inputValue = ""
                })
            }
        }])
    }(),
    function() {
        angular.module("scheduleModule").directive("backButton", ["BackButtonService", function(a) {
            return {
                restrict: "E",
                scope: {},
                templateUrl: "components/schedule/back-button/back-button.html",
                link: function(b) {
                    b.onBackButton = function() {
                        a.returnToLastView()
                    }
                }
            }
        }])
    }(),
    function() {
        angular.module("scheduleModule").directive("specialMessages", function() {
            return {
                restrict: "E",
                scope: {
                    messages: "="
                },
                templateUrl: "components/schedule/special-messages/special-messages.html",
                link: function(a) {
                    a.$on("$destroy", function() {
                        a = null
                    })
                }
            }
        })
    }(),
    function() {
        "use strict";
        angular.module("jakdojadeWebApp").directive("resize", ["$window", "LocationService", "SnapService", function(a, b, c) {
            return function(b) {
                var d = angular.element(a),
                    e = angular.element("#main"),
                    f = angular.element("#query-panel"),
                    g = angular.element("#main-footer"),
                    h = angular.element("#snap-content");
                b.getWindowDimensions = function() {
                    return {
                        wH: d.height(),
                        wW: d.width(),
                        hH: e.outerHeight(),
                        qH: f.outerHeight(),
                        fH: g.outerHeight()
                    }
                }, b.$watch(b.getWindowDimensions, function(a) {
                    c.getSnapper(h, a.wW), a.hH = 0, b.$broadcast("resize.mapButtons"), b.container = function() {
                        return {
                            height: a.wH - a.hH - a.qH + "px"
                        }
                    }, b.sidebar = function() {
                        return a.wW > 768 ? {
                            height: a.wH - a.hH - a.qH - a.fH + "px"
                        } : {
                            height: a.wH - a.hH + "px"
                        }
                    }
                }, !0), d.bind("resize", function() {
                    b.$apply()
                })
            }
        }])
    }(),
    function() {
        angular.module("mapModule").directive("mapButtonsPosition", ["$timeout", "$window", "DetectMobileDevice", "SnapService", "LocationService", function(a, b, c, d, e) {
            return {
                restrict: "A",
                link: function(f) {
                    a(function() {
                        var g = document.getElementById("snap-content"),
                            h = angular.element(b).width(),
                            i = d.getSnapper(g, h),
                            j = angular.element("#cn-sidebar").width(),
                            k = angular.element("#map-stop-button"),
                            l = angular.element("#map-location-button"),
                            m = angular.element("#info-button"),
                            n = angular.element(".leaflet-control-zoom"),
                            o = angular.element(".handler-btn"),
                            p = function() {
                                k.hide(), n.hide(), l.hide(), m.hide()
                            },
                            q = function() {
                                k.show(), n.show(), l.show(), m.show()
                            };
                        "true" === e.getURLValue("monitorPerspective") && n.hide(), h < 398 && p(), f.$on("routeChange.hideZoomButtons", function() {
                            n.hide()
                        }), f.$on("routeChange.showZoomButtons", function() {
                            n.show()
                        }), f.$on("sidebar.toggledSidebar", function(b, c) {
                            a(function() {
                                r(c, "closed")
                            }, 200)
                        }), f.$on("selectedStop.openSidebar", function() {
                            r("closed", "right")
                        }), angular.element(b).bind("resize", function() {
                            r(i.state().state, "right")
                        }), i.on("animated", function() {
                            r(i.state().state, "right")
                        });
                        var r = function(a, c) {
                                h = angular.element(b).width(), j = angular.element("#cn-sidebar").width(), a === c ? (q(), k.css({
                                    left: "12px"
                                }), n.css({
                                    left: "2px"
                                }), l.css({
                                    left: "12px"
                                }), m.css({
                                    left: "12px"
                                }), s(!0)) : (h < 380 ? p() : q(), k.css({
                                    left: j + 12 + "px"
                                }), n.css({
                                    left: j + 2 + "px"
                                }), l.css({
                                    left: j + 12 + "px"
                                }), m.css({
                                    left: j + 12 + "px"
                                }), s(!1))
                            },
                            s = function(a) {
                                c.isIos() && (a ? o.addClass("handler-btn-ios") : o.removeClass("handler-btn-ios"))
                            }
                    }, 0)
                }
            }
        }])
    }(),
    function() {
        angular.module("scheduleModule").directive("toggleSliding", ["DetectMobileDevice", function(a) {
            return function() {
                var b = document.getElementById("snap-content");
                null === a.isMobile() && b.setAttribute("data-snap-ignore", "true")
            }
        }])
    }(), angular.module("jakdojadeWebApp").directive("toggleSidebar", ["SnapService", "$window", function(a, b) {
        return {
            restrict: "A",
            link: function(c, d, e) {
                d.bind("click", function() {
                    var d = document.getElementById("snap-content"),
                        e = angular.element(b).width(),
                        f = a.getSnapper(d, e);
                    "right" == f.state().state ? f.close() : f.open("right"), c.$emit("map.toggledSidebar", f.state().state)
                })
            }
        }
    }]),
    function() {
        angular.module("scheduleModule").directive("lineDirectionsSize", ["$window", function(a) {
            return function(b) {
                var c = function() {
                    var a = angular.element("direction .start-direction"),
                        b = angular.element("direction .end-direction"),
                        c = angular.element(".line-number"),
                        d = angular.element("#sidebar").width(),
                        e = d - 137 - c.width() + "px";
                    a.css({
                        width: e
                    }), b.css({
                        width: e
                    }), a = null, b = null, c = null, e = null
                };
                b.$watch("selectedLine.lineNumber", function(a, b) {
                    a != b && c()
                }), angular.element(a).bind("resize", function() {
                    c()
                })
            }
        }])
    }(),
    function() {
        angular.module("scheduleModule").directive("translateInputValues", ["$translate", "$timeout", "LocationService", function(a, b, c) {
            return function(d) {
                var e = c.getURLValue("lang");
                d.$on("$locationChangeSuccess", function() {
                    c.getURLValue("lang") !== e && (f(), e = c.getURLValue("lang"))
                });
                var f = function() {
                    b(function() {
                        a("hintPanel.nameOfLineOrStop").then(function(a) {
                            d.inputPlaceholder = a
                        }), a("hintPanel.showUserLocation").then(function(a) {
                            d.inputShowLocation = a
                        })
                    }, 200)
                };
                f()
            }
        }])
    }(),
    function() {
        angular.module("scheduleModule").directive("mapNearestStop", ["$timeout", function(a) {
            return {
                restrict: "A",
                link: function(b, c, d) {
                    b.$on("map.setNearestStop", function(c, d) {
                        a(function() {
                            angular.element("#schedule-input").trigger("focus"), angular.element("#schedule-input").trigger("click"), b.inputValue = d, b.inputChange()
                        }, 0)
                    }), b.$on("map.noStopsFound", function() {
                        a(function() {
                            b.mapNoStopsFound = !0, b.views.showTransportLine = !1, angular.element("#schedule-input").trigger("focus")
                        }, 0)
                    })
                }
            }
        }])
    }(),
    function() {
        "use strict";
        angular.module("jakdojadeWebApp").directive("leafletMap", function() {
            return {
                restrict: "E",
                templateUrl: "components/map/map.html"
            }
        })
    }(),
    function() {
        ! function() {
            "use strict";
            angular.module("mapModule").directive("drawLineRoute", ["$window", "leafletData", "MapService", function(a, b, c) {
                return {
                    restrict: "A",
                    controller: ["$scope", function(d) {
                        var e, f, g, h = function() {
                            g.fitBounds(e, {
                                paddingTopLeft: [f, 30],
                                paddingBottomRight: [40, 50]
                            })
                        };
                        d.$on("lineGraph.drawLinePath", function() {
                            f = angular.element(a).width() > 768 ? angular.element("#sidebar").width() : 0, d.paths = c.getLinePath();
                            var i = d.paths.linePath0.latlngs;
                            e = [];
                            for (var j = 0, k = i.length; j < k; j++) e.push([i[j].lat, i[j].lng]);
                            b.getMap().then(function(a) {
                                g = a, h()
                            })
                        }), d.$on("lineGraph.zoomOnLineRoute", function() {
                            h()
                        })
                    }]
                }
            }])
        }()
    }(),
    function() {
        angular.module("mapModule").directive("drawStops", ["$timeout", "leafletData", "SearchHistoryService", "StopLayersService", "ObjectManager", function(a, b, c, d, e) {
            return {
                restrict: "A",
                link: function(a) {
                    var f, g, h, i, j, k, l = {},
                        m = {},
                        n = L.divIcon({
                            className: "stops-marker",
                            iconSize: null,
                            iconAnchor: [7, 7],
                            zIndexOffset: 0,
                            html: '<div class="transparent-halo" style="height: 20px; width: 20px; bottom: 6px; right: 6px;"></div>'
                        }),
                        o = L.divIcon({
                            className: "stops-marker-small",
                            iconSize: null,
                            iconAnchor: [4, 4],
                            zIndexOffset: 0,
                            html: '<div class="transparent-halo" style=" height: 12px; width: 12px; bottom: 4px; right: 4px;"></div>'
                        }),
                        p = function() {
                            var b, i = f.getBounds()._southWest.lng.toString().substring(0, 8) + ":" + f.getBounds()._northEast.lat.toString().substring(0, 8),
                                j = f.getBounds()._northEast.lng.toString().substring(0, 8) + ":" + f.getBounds()._southWest.lat.toString().substring(0, 8);
                            b = !(f._zoom >= 17), void 0 != h && void 0 != d.markers && h != b && (d.markers.clearLayers(), d.markers = void 0, d.layerGroup.length = 0), h = b, d.stopsQuery(i, j, b).query(function(b) {
                                if (void 0 != b.stops) {
                                    for (var h = 0, i = b.stops.length; h < i; h++) {
                                        var j = !0,
                                            k = b.stops[h].coordinate.y_lat,
                                            p = b.stops[h].coordinate.x_lon;
                                        void 0 != d.markers && null != d.markers && ! function(a, b) {
                                            d.markers.eachLayer(function(c) {
                                                c._latlng.lat == a && c._latlng.lng == b && (j = !1)
                                            })
                                        }(k, p), j === !0 && (g = f._zoom >= 17 ? L.marker([k, p], {
                                            icon: n
                                        }) : b.stops[h].group === !0 ? L.marker([k, p], {
                                            icon: n
                                        }) : L.marker([k, p], {
                                            icon: o
                                        }), g.stopName = b.stops[h].stopName, g.group = b.stops[h].group, l[h] = document.createElement("DIV"), l[h].style.color = "#514f70", l[h].style.fontFamily = "'OpenSansBold', sans-serif", l[h].style.fontSize = "14px", l[h].style.padding = "10px", l[h].style.backgroundImage = "url('https://jl.oulunliikenne.fi/images/sprites/date-right-arrow.png')", l[h].style.backgroundRepeat = "no-repeat", l[h].style.backgroundPosition = "right center", l[h].innerHTML = b.stops[h].stopName + "&nbsp", l[h].stop = b.stops[h], m[h] = function(b) {
                                            a.$apply(function() {
                                                b.target.stop.lineOrStop = "stop", e.setSelectedStop(b.target.stop), c.setStoredLinesOrStops(b.target.stop, "linesOrStops"), d.setDepartureOnSchedulesPanel(b.target.stop), f.closePopup()
                                            })
                                        }, g.on("mouseover", function() {
                                            this.openPopup()
                                        }), l[h].addEventListener("click", m[h], !1), g.bindPopup(l[h]), d.layerGroup.push(g))
                                    }
                                    d.markers = L.layerGroup(d.layerGroup).addTo(f)
                                }
                            })
                        };
                    a.$on("showMapStopsLayer", function() {
                        b.getMap().then(function(a) {
                            f = a, f._zoom < 15 ? f.setZoom(15) : p(), i = function() {
                                f._zoom >= 14 && p()
                            }, j = function() {
                                f._zoom >= 14 ? p() : void 0 != d.markers && (d.markers.clearLayers(), d.markers = void 0, d.layerGroup.length = 0)
                            }, k = function() {
                                this.closePopup()
                            }, f.on("zoomend", j), f.on("dragend", i), f.on("mousedown", k)
                        })
                    }), a.$on("hideMapStopsLayer", function() {
                        f.off("zoomend", j), f.off("dragend", i), f.off("mousedown", k), void 0 != d.markers && (d.markers.clearLayers(), d.markers = void 0, d.layerGroup.length = 0), d.markers = null, h = null, d.layerGroup.length = 0;
                        for (var a in m) void 0 != l[a] && (l[a].removeEventListener("click", m[a]), l[a] = null, m[a] = null, delete l[a], delete m[a]);
                        l = {}
                    })
                }
            }
        }])
    }(),
    function() {
        angular.module("mapModule").directive("drawStopsOnLineRoute", ["$rootScope", "leafletData", "LineGraphService", "MapLineStopsService", "ObjectManager", function(a, b, c, d, e) {
            return {
                restrict: "A",
                link: function(f) {
                    var g, h, i, j = {},
                        k = {};
                    f.$on("lineGraph.drawLinePath", function() {
                        b.getMap().then(function(b) {
                            i = b, "object" == typeof g && g.clearLayers();
                            for (var l = [], m = 0, n = e.selectedLine.stopsCoordinates.length; m < n; m++) {
                                var o = e.selectedLine.stopsCoordinates[m].stopCoordinate.y_lat,
                                    p = e.selectedLine.stopsCoordinates[m].stopCoordinate.x_lon,
                                    q = L.marker([o, p], {
                                        icon: null,
                                        zIndexOffset: -2e3
                                    });
                                d.setIcons(b, q, e.selectedLine.stopsCoordinates[m]), q.stopName = e.selectedLine.stopsCoordinates[m].stopName, q.index = e.selectedLine.stopsCoordinates[m].index, q.mainType = e.selectedLine.stopsCoordinates[m].mainType, q.on("mouseover", function(a) {
                                    d.setIconsOnMouseOverStop(a), f.$emit("lineGraph.mouseOverLineGraphStop", a.target.index)
                                }), q.on("mouseout", function(a) {
                                    d.setIconsOnMouseLeaveStop(a), f.$emit("lineGraph.mouseLeaveLineGraphStop", a.target.index)
                                }), j[m] = document.createElement("DIV"), j[m].style.color = "#514f70", j[m].style.fontFamily = "'OpenSansBold', sans-serif", j[m].style.fontSize = "14px", j[m].style.padding = "10px", j[m].style.backgroundImage = "url('https://jl.oulunliikenne.fi/images/sprites/date-right-arrow.png')", j[m].style.backgroundRepeat = "no-repeat", j[m].style.backgroundPosition = "right center", j[m].innerHTML = e.selectedLine.stopsCoordinates[m].stopName + "&nbsp", j[m].stop = e.selectedLine.stopsCoordinates[m], k[m] = function(b) {
                                    f.$apply(function() {
                                        a.removeLineRouteOnExit = !1, c.showDeparturesOrTimetable(b.target.stop), angular.element(".leaflet-popup-close-button")[0].click()
                                    })
                                }, j[m].addEventListener("click", k[m], !1), q.bindPopup(j[m]), l.push(q)
                            }
                            g = L.layerGroup(l).addTo(i), h = function(a) {
                                g.eachLayer(function(b) {
                                    d.setIconsOnZoom(a, b)
                                })
                            }, i.on("zoomend", h)
                        })
                    }), f.$on("lineGraph.mouseOverStop", function(a, b) {
                        g.eachLayer(function(a) {
                            d.setIconsOnSidebarMouseOverStop(a, b)
                        })
                    }), f.$on("lineGraph.mouseLeaveStop", function(a, b) {
                        g.eachLayer(function(a) {
                            d.setIconsOnSidebarMouseLeaveStop(a, b)
                        })
                    }), f.$on("selectedLine.removeLineRoute", function() {
                        if (void 0 != g && a.removeLineRouteOnExit) {
                            for (var b in k) j[b].removeEventListener("click", k[b]), j[b] = null;
                            j = {}, k = {}, i.off("zoomend", h), g.clearLayers()
                        }
                    })
                }
            }
        }])
    }(),
    function() {
        angular.module("mapModule").directive("userLocation", ["leafletData", "StopLayersService", function(a, b) {
            return {
                controller: ["$scope", function(c) {
                    var d, e, f, g, h, i = L.divIcon({
                        className: "location-marker",
                        iconSize: null,
                        iconAnchor: [13, 13]
                    });
                    c.$on("hintPanel.location", function(b, c) {
                        a.getMap().then(function(a) {
                            h = !0, d = a, d.stopLocate(), d.locate({
                                setView: !0,
                                maxZoom: 17,
                                watch: !0,
                                enableHighAccuracy: !0,
                                timeout: 1e3
                            }), d.off("locationfound", j), d.on("locationfound", j), g = c
                        })
                    });
                    var j = function(a) {
                            void 0 !== e && (d.removeLayer(f), d.removeLayer(e), e = void 0, f = void 0), void 0 === e && (e = L.marker([a.latlng.lat, a.latlng.lng], {
                                icon: i
                            }).addTo(d), f = L.circle([a.latlng.lat, a.latlng.lng], a.accuracy / 2, {
                                stroke: !1,
                                fillColor: "#007aff",
                                fillOpacity: .4
                            }).addTo(d)), g && k(a.latlng)
                        },
                        k = function(a) {
                            c.stopsButtonActive === !1 && (c.stopsButtonActive = !0, c.$broadcast("showMapStopsLayer")), c.locationButtonActive = !0, h === !0 && l(a)
                        },
                        l = function(a) {
                            setTimeout(function() {
                                if (b.layerGroup.length > 0) {
                                    var d = [];
                                    b.markers.eachLayer(function(b) {
                                        d.push({
                                            leafletId: b._leaflet_id,
                                            distance: L.latLng(a.lat, a.lng).distanceTo([b._latlng.lat, b._latlng.lng])
                                        })
                                    }), d.sort(function(a, b) {
                                        return a.distance - b.distance
                                    }), b.markers._layers[d[0].leafletId].openPopup(), c.$emit("sidebarForm.setNearestStop", b.markers._layers[d[0].leafletId].stopName), d.length = 0
                                } else c.$emit("sidebarHintPanel.noStopsFound");
                                h = !1
                            }, 500)
                        };
                    c.$on("mapHideUserLocation", function() {
                        void 0 !== e && (d.off("locationfound", j), d.stopLocate(), d.removeLayer(f), d.removeLayer(e), e = void 0, f = void 0)
                    })
                }]
            }
        }])
    }(),
    function() {
        angular.module("mapModule").directive("drawDepartures", ["$rootScope", "configuration", "$translate", "MapDrawDeparturesService", "leafletData", "RealtimeManager", "RealtimeBufferService", "LocationService", "ObjectManager", function(a, b, c, d, e, f, g, h, i) {
            return {
                restrict: "A",
                link: function(h) {
                    var j, k, l, m = {},
                        n = {},
                        o = {},
                        p = JSON.parse(b.city),
                        q = L.divIcon(p.departures.stopIcon.options),
                        r = L.icon(p.departures.vehicleIcon.options),
                        s = L.icon(p.departures.waterTramIcon.options),
                        t = L.icon(p.departures.vehicleReverseIcon.options),
                        u = function(a) {
                            var b = function() {
                                a.closePopup()
                            };
                            a.onPreviousCourse === !0 ? (a.off("click", b), a.bindPopup(h.onPreviousCoursePopupContent, p.departures.vehicleReverseIcon.popupOptions)) : a.on("click", b)
                        },
                        v = function(a) {
                            return "VEHICLE_TYPE_WATER_TRAM" === a.vehicleType ? s : a.onPreviousCourse === !0 ? t : r
                        },
                        w = function(a, b) {
                            if ((null === m[b] || void 0 === m[b]) && a[0].stopPassed !== !0) {
                                var c = a[0].coordinate.y_lat,
                                    d = a[0].coordinate.x_lon,
                                    e = a[0].pathAngleNDeg,
                                    f = L.polyline([
                                        [c, d],
                                        [c, d]
                                    ]);
                                m[b] = L[p.departures.vehicleIcon.markerType](f.getLatLngs(), {
                                    icon: v(a[0]),
                                    zIndexOffset: 9999,
                                    angle: e,
                                    autoStart: !1,
                                    interval: 0
                                }), m[b].realtimeId = a[0].realtimeId, m[b].lineId = a[0].lineId, m[b].onPreviousCourse = a[0].onPreviousCourse, u(m[b]);
                                var g = L.divIcon({
                                        className: p.departures.vehiclePopupIcon.options.className,
                                        iconSize: null,
                                        iconAnchor: p.departures.vehiclePopupIcon.options.iconAnchor,
                                        html: "<span class='line-name'>" + a[0].lineName + "</span><span class='departures-vehicle-popup-marker-bottom-triangle'></span>"
                                    }),
                                    h = L.polyline([
                                        [c + 1e-5, d + 1e-5],
                                        [c, d]
                                    ]);
                                n[b] = L.animatedMarker(h.getLatLngs(), {
                                    icon: g,
                                    autoStart: !1,
                                    zIndexOffset: 9999
                                }), n[b].realtimeId = a[0].realtimeId, n[b].lineId = a[0].lineId, m[b].addTo(j), n[b].addTo(j)
                            }
                        },
                        x = function(a) {
                            var b = g.getVehiclesBuffer();
                            if (void 0 !== b[a] && b[a].length > 0)
                                if (b[a][0].stopPassed === !0) void 0 !== m[a] && (h.$emit("selectedStop.removeVehicleOnStopPassed", a), j.removeLayer(m[a]), j.removeLayer(n[a]), g.removeVehicle(a), delete m[a], delete n[a], delete o[a]);
                                else if (void 0 !== m[a]) {
                                o[a] = !0;
                                var c = b[a][0].coordinate.y_lat,
                                    d = b[a][0].coordinate.x_lon,
                                    e = b[a][0].pathAngleNDeg,
                                    f = m[a]._latlng.lat,
                                    i = m[a]._latlng.lng;
                                m[a]._latlngs[0].lat = f, m[a]._latlngs[0].lng = i, m[a]._latlngs[1].lat = c, m[a]._latlngs[1].lng = d, void 0 === m[a].previousCoordinates && (m[a].previousCoordinates = []);
                                for (var k = !0, l = 0; l < m[a].previousCoordinates.length; l++) c !== m[a].previousCoordinates[l].lat && d !== m[a].previousCoordinates[l].lng || (k = !1);
                                if (m[a].previousCoordinates.push({
                                        lat: c,
                                        lng: d
                                    }), m[a].options.previousAngle = m[a].options.angle, m[a].options.angle = e, m[a].options.interval = b[a][0].delayMillis, m[a].options.realtimeId = a, m[a].options.lastLocationId = b[a][b[a].length - 1].locationId, m[a].onPreviousCourse !== b[a][0].onPreviousCourse) {
                                    var p = v(b[a][0]);
                                    m[a].setIcon(p), m[a].onPreviousCourse = b[a][0].onPreviousCourse, u(m[a]), p = null
                                }
                                if (m[a].options.onEnd = function() {
                                        x(a)
                                    }, g.setInfoForPostQuery(a), g.removeFirstCoordinate(a), k === !0) {
                                    var q = n[a];
                                    m[a].animate(g, q, h)
                                } else x(a)
                            } else delete o[a];
                            else delete o[a]
                        };
                    h.$on("selectedStop.drawDepartures", function() {
                        e.getMap().then(function(a) {
                            j = a;
                            var b = i.selectedStop.stopCoordinate.y_lat,
                                c = i.selectedStop.stopCoordinate.x_lon;
                            l = document.createElement("DIV"), l.style.color = "#514f70", l.style.fontFamily = "'OpenSansBold', sans-serif", l.style.fontSize = "14px", l.style.padding = "10px", l.style.backgroundImage = "url('https://jl.oulunliikenne.fi/images/sprites/date-right-arrow.png')", l.style.backgroundRepeat = "no-repeat", l.style.backgroundPosition = "right center", l.innerHTML = i.selectedStop.stopName + "&nbsp", k = L.marker([b, c], {
                                icon: q
                            }), k.bindPopup(l), k.setZIndexOffset(1e3), k.addTo(j), j.on("zoomstart", function() {
                                if (null !== m || void 0 !== m)
                                    for (var a in m) {
                                        var b = n[m[a].realtimeId];
                                        m[a].stop(j, b)
                                    }
                            }), j.on("zoomend", function() {
                                if (null !== m || void 0 !== m)
                                    for (var a in m) m[a].resume()
                            })
                        })
                    }), h.$on("selectedStop.drawVehicles", function() {
                        for (var a = g.getVehiclesBuffer(), b = f.realtimeIds, c = 0, d = b.length; c < d; c++) void 0 !== a[b[c]] && (w(a[b[c]], b[c]), o[b[c]] !== !0 && x(b[c]))
                    }), h.$on("selectedStop.removeMissingVehicles", function(a, b) {
                        for (var c in m)
                            if (m.hasOwnProperty(c)) {
                                for (var d = !0, e = 0, f = b.length; e < f; e++)
                                    if (c === b[e]) {
                                        d = !1;
                                        break
                                    } void 0 !== m[c] && d === !0 && (j.removeLayer(m[c]), j.removeLayer(n[c]), delete m[c], delete n[c], g.removeVehicle(c))
                            }
                    }), h.$on("selectedStop.removeVehicles", function() {
                        d.removeVehicles(m, n, j)
                    }), h.$on("selectedStop.removeAllVehicles", function() {
                        for (var a in m) j.removeLayer(m[a]), j.removeLayer(n[a]), delete m[a], delete n[a]
                    }), h.$on("selectedStop.removeDepartures", function() {
                        void 0 !== k && null !== k && j.removeLayer(k);
                        for (var a in m) j.removeLayer(m[a]), j.removeLayer(n[a]);
                        k = null, l = null, m = {}, n = {}
                    }), c("map.onPreviousCourse").then(function(a) {
                        h.onPreviousCoursePopupContent = a
                    }), a.$on("$translateChangeSuccess", function() {
                        c("map.onPreviousCourse").then(function(a) {
                            h.onPreviousCoursePopupContent = a;
                            for (var b in m) m[b].closePopup(), u(m[b])
                        })
                    })
                }
            }
        }])
    }(),
    function() {
        angular.module("scheduleModule").directive("highlightStop", function() {
            return {
                restrict: "A",
                link: function(a, b, c) {
                    if ("" !== c.matchedText) {
                        var d = JSON.parse(c.matchedText),
                            e = d[0].from;
                        if (d.length > 1)
                            for (var f in d) var g = d[f].to;
                        else var g = d[0].to;
                        var h = c.name.substring(e, g),
                            i = h.bold(),
                            j = c.name.replace(h, i);
                        b.html(j)
                    }
                }
            }
        })
    }(),
    function() {
        angular.module("scheduleModule").directive("selectedLineView", function() {
            return {
                restrict: "E",
                replace: !0,
                templateUrl: "components/schedule/selected-line/main-view/selected-line-panel.html",
                controller: "ScheduleSelectedLineCtrl"
            }
        })
    }(),
    function() {
        angular.module("jakdojadeWebApp").directive("lineStopsLocation", ["LocationService", function(a) {
            return function(b) {
                var c = a.getURLValue("lineId"),
                    d = a.getURLValue("d"),
                    e = a.getURLValue("lineDirection"),
                    f = a.getLocationPath();
                b.$on("$locationChangeSuccess", function() {
                    f != a.getLocationPath() && (f = a.getLocationPath(), "/schedules/lineStops" === a.getLocationPath() && b.$broadcast("zoom-on-line")), "/schedules/lineStops" == a.getLocationPath() && (a.getURLValue("lineId") != c && (b.$broadcast("selectedLine-lineId-change", a.getURLValue("lineId")), c = a.getURLValue("lineId")), a.getURLValue("d") != d && (b.$broadcast("date-change", a.getURLValue("d")), d = a.getURLValue("d")), a.getURLValue("lineDirection") != e && (b.$broadcast("selectedLine-direction-change", a.getURLValue("lineDirection")), e = a.getURLValue("lineDirection", a.getURLValue("lineDirection"))))
                })
            }
        }])
    }(),
    function() {
        angular.module("scheduleModule").directive("toggleLineDirection", function() {
            return {
                restrict: "E",
                scope: {
                    firstDirection: "=",
                    lastDirection: "=",
                    button: "=",
                    toggleDirection: "="
                },
                templateUrl: "components/schedule/selected-line/toggle-line-direction/toggle-line-direction.html"
            }
        })
    }(),
    function() {
        angular.module("scheduleModule").directive("timeSelectionPanel", ["TimeSelectorService", "CurrentDatesService", "LocationService", function(a, b, c) {
            return {
                restrict: "E",
                scope: {},
                replace: !0,
                templateUrl: "components/schedule/shared/time-selection/time-selection.html",
                controller: ["$scope", function(d) {
                    d.days = b.getCurrentDates();
                    var e = !0;
                    c.getURLValue("d") ? a.selectDate(d, c.getURLValue("d")) : a.selectDate(d, "now"), d.changeActiveDaysClass = function(b, f) {
                        f.fullDate ? c.setURLValue(["d", f.fullDate]) : c.setURLValue(["d", f.day + f.month + f.year]), a.selectDate(d, c.getURLValue("d")), e = !1
                    };
                    var f = 0;
                    d.leftArrow = "left-disabled", d.rightArrow = "right", d.arrowButtonEvent = function(e) {
                        "left-button" == e ? (d.rightArrow = "right", 0 != f && (--f, d.leftArrow = "left"), 0 === f && (d.leftArrow = "left-disabled")) : "right-button" == e && (d.leftArrow = "left", 10 != f && ++f, 10 === f && (d.rightArrow = "right-disabled")), d.days[0] = b.getCurrentDates()[f], d.days[1] = b.getCurrentDates()[f + 1], d.days[2] = b.getCurrentDates()[f + 2];
                        var g = c.getURLValue("d");
                        a.selectDate(d, g), g = null
                    }, d.$on("date-change", function(b, c) {
                        e && a.selectDate(d, c), e = !0
                    }), d.$on("$destroy", function() {
                        f = null, d.days = null, d.changeActiveDaysClass = null, d.arrowButtonEvent = null, d.$$listeners = null, d = null
                    })
                }]
            }
        }])
    }(),
    function() {
        angular.module("scheduleModule").directive("lineGraph", function() {
            return {
                restrict: "E",
                scope: {
                    graphs: "=",
                    listeners: "="
                },
                replace: !0,
                templateUrl: "components/schedule/selected-line/line-graph/line-graph.html"
            }
        })
    }(),
    function() {
        angular.module("scheduleModule").directive("drawTimetable", function() {
            return {
                restrict: "E",
                scope: {
                    timetable: "="
                },
                templateUrl: "components/schedule/departures/timetable/timetable.html",
                replace: !0
            }
        })
    }(),
    function() {
        angular.module("scheduleModule").directive("departuresView", function() {
            return {
                restrict: "E",
                replace: !0,
                templateUrl: "components/schedule/departures/main-view/main-departures-view.html",
                controller: "ScheduleSelectedStopCtrl"
            }
        })
    }(),
    function() {
        angular.module("scheduleModule").directive("departuresLocation", ["LocationService", function(a) {
            return function(b) {
                var c = a.getURLValue("stopName"),
                    d = a.getURLValue("lineId"),
                    e = a.getURLValue("stopCode"),
                    f = a.getURLValue("dateTime"),
                    g = a.getURLValue("d"),
                    h = a.getURLValue("stopGroupDepartures");
                b.$on("$locationChangeSuccess", function() {
                    if ("/schedules/departures" == a.getLocationPath()) {
                        var i = function(a, b) {
                            return "string" == typeof a ? a != b : "string" == typeof b ? JSON.stringify(a) != b : JSON.stringify(a) != JSON.stringify(b)
                        };
                        a.getURLValue("stopName") !== c ? (b.$broadcast("stopName-change"), c = a.getURLValue("stopName"), e = a.getURLValue("stopCode")) : i(a.getURLValue("lineId"), d) ? a.getURLValue("stopCode") !== e ? (b.$broadcast("stopCode-change"), e = a.getURLValue("stopCode")) : (b.$broadcast("lineId-change"), d = a.getURLValue("lineId")) : a.getURLValue("stopCode") !== e ? (b.$broadcast("stopCode-change"), e = a.getURLValue("stopCode")) : a.getURLValue("dateTime") !== f ? (b.$broadcast("dateTime-change"), f = a.getURLValue("dateTime")) : a.getURLValue("d") !== g ? (b.$broadcast("date-change"), g = a.getURLValue("d")) : a.getURLValue("stopGroupDepartures") !== h && (b.$broadcast("stopGroupDepartures-change"), h = a.getURLValue("stopGroupDepartures"))
                    }
                })
            }
        }])
    }(), angular.module("scheduleModule").directive("selectedStopOpenSnapContent", ["SnapService", "$window", function(a, b) {
        return {
            restrict: "A",
            link: function(c, d, e) {
                var f = document.getElementById("snap-content"),
                    g = angular.element(b).width(),
                    h = a.getSnapper(f, g);
                "right" == h.state().state && (h.close(), c.$emit("map.openSidebar")), c.$on("stopName-change", function() {
                    "right" == h.state().state && (h.close(), c.$emit("map.openSidebar"))
                }), c.$on("$destroy", function() {
                    f = null, g = null, h = null
                })
            }
        }
    }]),
    function() {
        angular.module("scheduleModule").directive("departuresStopName", function() {
            return {
                restrict: "E",
                scope: {
                    name: "="
                },
                replace: !0,
                templateUrl: "components/schedule/departures/stop-name/departures-stop-name.html"
            }
        })
    }(),
    function() {
        angular.module("scheduleModule").directive("radioSelectActiveCity", ["LocationService", function(a) {
            return {
                restrict: "A",
                link: function(b, c, d) {
                    var e = function() {
                        var b = a.getURLValue("stopCode");
                        b == d.stopCode && $(c).attr({
                            checked: "checked"
                        })
                    };
                    e(), b.$on("stopCode-change", function() {
                        e()
                    })
                }
            }
        }])
    }(),
    function() {
        angular.module("scheduleModule").directive("drawDeparturesTable", function() {
            return {
                restrict: "E",
                scope: {
                    departures: "="
                },
                replace: !0,
                templateUrl: "components/schedule/departures/departures-table/departures-table.html"
            }
        })
    }(),
    function() {
        angular.module("scheduleModule").directive("stopDirections", function() {
            return {
                restrict: "E",
                scope: {
                    directions: "="
                },
                replace: !0,
                templateUrl: "components/schedule/departures/direction-selection/stop-directions.html",
                controller: ["$scope", "$element", "$attrs", "$injector", function(a, b, c, d) {
                    a.isStopDirectionsPanelVisible = !1, a.stopsDirectionLimit = 3, a.$watch("directions", function(b) {
                        a.isMoreDirectionsButtonVisible = !1, void 0 != b && (b.length > 3 && (4 == b.length ? (a.isMoreDirectionsButtonVisible = !1, a.stopsDirectionLimit = 4) : a.isMoreDirectionsButtonVisible = !0, a.showMoreDirections = function() {
                            a.isMoreDirectionsButtonVisible = !1, a.isHideDirectionButtonVisible = !0, a.stopsDirectionLimit = 1 / 0
                        }, a.hideMoreDirections = function() {
                            a.isMoreDirectionsButtonVisible = !0, a.isHideDirectionButtonVisible = !1, a.stopsDirectionLimit = 3
                        }), a.stopsDirectionLimit > 3 && (a.isMoreDirectionsButtonVisible = !1))
                    });
                    var e = d.get(c.service);
                    a.toggleStopsDirectionsView = function() {
                        a.isStopDirectionsPanelVisible = !a.isStopDirectionsPanelVisible
                    }, a.selectStop = function(b, c) {
                        e.selectStop(c), a.isStopDirectionsPanelVisible = !a.isStopDirectionsPanelVisible
                    }
                }]
            }
        })
    }(),
    function() {
        angular.module("scheduleModule").directive("departuresLineSelection", function() {
            return {
                restrict: "E",
                scope: {
                    lines: "="
                },
                replace: !0,
                templateUrl: "components/schedule/departures/line-selection/departures-line-selection.html",
                controller: ["$scope", "$attrs", "$injector", function(a, b, c) {
                    var d = c.get(b.service);
                    a.$watch("lines", function(b, c) {
                        if (b !== c) {
                            var e = d.isLineVisible(b);
                            a.linesLimit = e === !1 ? 9 : 1 / 0
                        }
                    }), a.selectLine = function(a) {
                        d.selectLine(a.lineId)
                    }, a.showMoreLinesButton = function() {
                        9 === a.linesLimit ? a.linesLimit = 1 / 0 : a.linesLimit = 9
                    }
                }]
            }
        })
    }(),
    function() {
        angular.module("scheduleModule").directive("animateTables", ["$animate", "AnimateDeparturesTablesService", function(a, b) {
            return function(c) {
                var d, e = b.getSelectedDate();
                c.$on("animate-tables", function(a, c) {
                    var g = "Departures" === c ? ".departures-table" : ".timetable",
                        h = b.getSelectedDate();
                    e < h ? f(g, "left") : e > h && f(g, "right"), e = h, d = g
                });
                var f = function(b, c) {
                    var d = angular.element(b);
                    a.addClass(d, "angular-animate-departures-tables-" + c).then(function() {
                        a.removeClass(d, "angular-animate-departures-tables-" + c)
                    })
                }
            }
        }])
    }(),
    function() {
        angular.module("scheduleModule").filter("translateVehicleTypes", function() {
            return function(a) {
                switch (a) {
                    case "bus":
                        return "Autobusy";
                    case "tram":
                        return "Tramwaje";
                    case "train":
                        return "PociÄ…gi";
                    case "subway":
                        return "Metro";
                    case "trolleybus":
                        return "Trolejbusy";
                    case "waterTram":
                        return "Tramwaje wodne"
                }
            }
        })
    }(),
    function() {
        angular.module("scheduleModule").filter("regularLines", function() {
            return function(a) {
                var b = [];
                for (var c in a) {
                    var d = !isNaN(a[c].lineName);
                    d && b.push(a[c])
                }
                return b
            }
        })
    }(),
    function() {
        angular.module("scheduleModule").filter("sortLineList", function() {
            return function(a) {
                return a.sort(function(a, b) {
                    return isNaN(a.lineName) || isNaN(b.lineName) ? a.lineName < b.lineName ? -1 : 1 : a.lineName - b.lineName
                }), a
            }
        })
    }(),
    function() {
        angular.module("scheduleModule").filter("removeDuplicates", function() {
            return function(a) {
                var b = [];
                for (var c in a) {
                    var d = void 0;
                    for (var e in b)
                        if (a[c].lineName === b[e].lineName) {
                            d = !0;
                            break
                        } d || b.push(a[c])
                }
                return b
            }
        })
    }(),
    function() {
        angular.module("scheduleModule").filter("stopLines", ["$rootScope", function(a) {
            return function(b) {
                var c = [];
                if (b && b.length > 0) {
                    a.showMoreLinesText = !1;
                    for (var d = 0; d < b.length; d++) d < 6 && c.push(b[d] + ", ");
                    var e = c[c.length - 1];
                    if (c[c.length - 1] = e.replace(/,/g, ""), b.length > 7) {
                        var f = b.length - 6;
                        c.push("... " + f), a.showMoreLinesText = !0
                    }
                }
                return c
            }
        }])
    }(),
    function() {
        angular.module("jakdojadeWebApp").directive("cookiesPopup", ["$timeout", "LocationService", function(a, b) {
            return {
                restrict: "E",
                scope: {
                    isCookiesPopupVisible: "="
                },
                templateUrl: "components/cookies-popup/cookies-popup.html",
                link: function(c) {
                    c.moreInfoVisibility = !1, c.showMoreInfo = function() {
                        c.moreInfoVisibility = !c.moreInfoVisibility
                    };
                    var d = b.getURLValue("no_gdpr");
                    a(function() {
                        void 0 !== localStorage && "true" !== d && (c.isCookiesPopupVisible = null === localStorage.getItem("cnCookie"))
                    }, 2e3), c.acceptCookie = function() {
                        localStorage.setItem("cnCookie", !0), c.isCookiesPopupVisible = !1
                    }
                }
            }
        }])
    }(), L.AnimatedMarker = L.Marker.extend({
        options: {
            distance: 500,
            interval: 1e3,
            autoStart: !0,
            onEnd: function() {},
            clickable: !0
        },
        stopAnimating: !1,
        stopInterval: !1,
        isAnimating: !1,
        initialize: function(a, b) {
            this.setLine(a), L.Marker.prototype.initialize.call(this, a[0], b)
        },
        onAdd: function(a) {
            L.Marker.prototype.onAdd.call(this, a), this.options.autoStart && this.start()
        },
        animate: function(a, b, c) {
            var d = this,
                e = this.options.interval,
                f = this._latlngs[1].lat,
                g = this._latlngs[1].lng,
                h = this._latlngs[0].lat,
                i = this._latlngs[0].lng,
                j = this.getAmountOfIterations(e),
                k = e / j,
                l = h - f,
                m = i - g,
                n = l / j,
                o = m / j,
                p = h,
                q = i,
                r = 0,
                s = setInterval(function() {
                    r++, c.$apply(function() {
                        a.updateBufferedSecondsForPostQuery(d.options.realtimeId, k)
                    }), r === j ? (t(f, g), clearInterval(s), setTimeout(function() {
                        d.options.onEnd.apply(d, Array.prototype.slice.call(arguments))
                    }, k)) : (p -= n, q -= o, t(p, q))
                }, k),
                t = function(a, c) {
                    d.stopAnimating === !1 && (d.setLatLng([a, c]), d._icon && (d._icon.style[L.DomUtil.TRANSITION] = "all " + k + "ms linear"), d._shadow && (d._shadow.style[L.DomUtil.TRANSITION] = "all " + k + "ms linear"), b && (b.setLatLng([a, c]), b._icon && (b._icon.style[L.DomUtil.TRANSITION] = "all " + k + "ms linear"), b._shadow && (b._shadow.style[L.DomUtil.TRANSITION] = "all " + k + "ms linear")))
                }
        },
        stop: function(a, b) {
            this.stopAnimating = !0, a.removeLayer(this), a.removeLayer(b), this.addTo(a), b.addTo(a)
        },
        resume: function() {
            this.stopAnimating = !1
        },
        getAmountOfIterations: function(a) {
            return a = a > 250 ? parseInt(a / 250) : 1
        },
        start: function() {
            this.animate()
        },
        setLine: function(a) {
            this._latlngs = a
        }
    }), L.animatedMarker = function(a, b) {
        return new L.AnimatedMarker(a, b)
    }, L.RotatedMarker = L.AnimatedMarker.extend({
        options: {
            angle: 0
        },
        _setPos: function(a) {
            if (L.AnimatedMarker.prototype._setPos.call(this, a), L.DomUtil.TRANSFORM) this._icon.style[L.DomUtil.TRANSFORM] += " rotate(" + this.options.angle + "deg)";
            else if (L.Browser.ie) {
                var b = this.options.angle * (Math.PI / 180),
                    c = Math.cos(b),
                    d = Math.sin(b);
                this._icon.style.filter += " progid:DXImageTransform.Microsoft.Matrix(sizingMethod='auto expand', M11=" + c + ", M12=" + -d + ", M21=" + d + ", M22=" + c + ")"
            }
        }
    }), L.rotatedMarker = function(a, b) {
        return new L.RotatedMarker(a, b)
    };
var $buoop = {
    c: 2
};
try {
    document.addEventListener("DOMContentLoaded", $buo_f, !1)
} catch (e) {
    window.attachEvent("onload", $buo_f)
}