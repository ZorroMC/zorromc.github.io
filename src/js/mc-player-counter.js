/*!
 * https://github.com/leonardosnt/mc-player-counter
 *
 * Copyright (C) 2017 leonardosnt
 * Licensed under the MIT License. See LICENSE file in the project root for full license information.
 */
!(function () {
    "use strict";
    function e(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
    }
    var t = (function () {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    (r.enumerable = r.enumerable || !1), (r.configurable = !0), "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
                }
            }
            return function (t, n, r) {
                return n && e(t.prototype, n), r && e(t, r), t;
            };
        })(),
        n = (function () {
            function n(t) {
                var r = t.ip,
                    i = t.element,
                    o = t.format,
                    a = t.refreshRate;
                if ((e(this, n), (o = o || "{online}"), (a = a || 6e4), !r)) throw TypeError("ip cannot be null or undefined");
                if (!i) throw TypeError("element cannot be null or undefined");
                var u = r.split(":");
                (this.ip = u[0]), (this.port = u[1] || "25565"), (this.format = o), (this.element = "string" == typeof i ? document.querySelector(i) : i), this.runQuery(), (this.timerId = setInterval(this.runQuery.bind(this), a));
            }
            return (
                t(n, [
                    {
                        key: "runQuery",
                        value: function () {
                            var e = this,
                                t = new XMLHttpRequest();
                            (t.onreadystatechange = function () {
                                if (4 === t.readyState && 200 === t.status) {
                                    var n = JSON.parse(t.responseText);
                                    if (null !== e.element.getAttribute("data-playercounter-status")) return void (e.element.innerText = n.online ? "online" : "offline");
                                    n.online &&
                                        (e.element.innerHTML = e.format.replace(/{\b(online|max)\b}/gi, function (e, t) {
                                            return n.players["online" === t ? "now" : t];
                                        }));
                                }
                            }),
                                t.open("GET", "https://mcapi.us/server/status?ip=" + this.ip + "&port=" + this.port),
                                t.send();
                        },
                    },
                ]),
                n
            );
        })(),
        r = function () {
            for (var e = document.querySelectorAll("[data-playercounter-ip]"), t = 0; t < e.length; t++) {
                var r = e[t];
                new n({ element: r, ip: r.getAttribute("data-playercounter-ip"), format: r.getAttribute("data-playercounter-format"), refreshRate: r.getAttribute("data-playercounter-refreshRate") });
            }
        };
    "complete" === document.readyState ? r() : (window.onload = r), (window.PlayerCounter = n);
})();
