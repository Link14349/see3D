"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _Op = function () {
    'bpo disable';

    return {
        add: function add(a, b) {
            if (a.operatorAdd) return a.operatorAdd(b);else return a + b;
        },
        selfAdd: function selfAdd(a, b) {
            if (a.operatorSelfAdd) return a.operatorSelfAdd(b);else return a += b;
        },
        sub: function sub(a, b) {
            if (a.operatorSub) return a.operatorSub(b);else return a - b;
        },
        selfSub: function selfSub(a, b) {
            if (a.operatorSelfSub) return a.operatorSelfSub(b);else return a -= b;
        },
        mul: function mul(a, b) {
            if (a.operatorMul) return a.operatorMul(b);else return a * b;
        },
        selfMul: function selfMul(a, b) {
            if (a.operatorSelfMul) return a.operatorSelfMul(b);else return a *= b;
        },
        div: function div(a, b) {
            if (a.operatorDiv) return a.operatorDiv(b);else return a / b;
        },
        selfDiv: function selfDiv(a, b) {
            if (a.operatorSelfDiv) return a.operatorSelfDiv(b);else return a /= b;
        },
        mod: function mod(a, b) {
            if (a.operatorMod) return a.operatorMod(b);else return a % b;
        },
        selfMod: function selfMod(a, b) {
            if (a.operatorSelfMod) return a.operatorSelfMod(b);else return a %= b;
        },
        pow: function pow(a, b) {
            if (a.operatorPow) return a.operatorPow(b);else return Math.pow(a, b);
        },
        binaryAnd: function binaryAnd(a, b) {
            if (a.operatorBinaryAnd) return a.operatorBinaryAnd(b);else return a & b;
        },
        binaryOr: function binaryOr(a, b) {
            if (a.operatorBinaryOr) return a.operatorBinaryOr(b);else return a | b;
        },
        binaryXor: function binaryXor(a, b) {
            if (a.operatorBinaryXor) return a.operatorBinaryXor(b);else return a ^ b;
        },
        binaryLShift: function binaryLShift(a, b) {
            if (a.operatorBinaryLShift) return a.operatorBinaryLShift(b);else return a << b;
        },
        binaryRShift: function binaryRShift(a, b) {
            if (a.operatorBinaryRShift) return a.operatorBinaryRShift(b);else return a >> b;
        },
        less: function less(a, b) {
            if (a.operatorLess) return a.operatorLess(b);else if (b.operatorGreater) return b.operatorGreater(a);else if (a.operatorGreaterEqual) return !a.operatorGreaterEqual(b);else return a < b;
        },
        greater: function greater(a, b) {
            if (a.operatorGreater) return a.operatorGreater(b);else if (b.operatorLess) return b.operatorLess(a);else if (a.operatorLessEqual) return !a.operatorLessEqual(b);else return a > b;
        },
        lessEqual: function lessEqual(a, b) {
            if (a.operatorLessEqual) return a.operatorLessEqual(b);else if (b.operatorGreaterEqual) return b.operatorGreaterEqual(a);else if (a.operatorGreater) return !a.operatorGreater(b);else return a <= b;
        },
        greaterEqual: function greaterEqual(a, b) {
            if (a.operatorGreaterEqual) return a.operatorGreaterEqual(b);else if (b.operatorLessEqual) return b.operatorLessEqual(a);else if (a.operatorLess) return !a.operatorLess(b);else return a >= b;
        },
        equal: function equal(a, b) {
            if (a.operatorEqual) return a.operatorEqual(b);else if (a.operatorNotEqual) return !a.operatorNotEqual(b);else if (b.operatorEqual) return b.operatorEqual(a);else if (b.operatorNotEqual) return !b.operatorNotEqual(a);else return a == b;
        },
        notEqual: function notEqual(a, b) {
            if (a.operatorNotEqual) return a.operatorNotEqual(b);else if (a.operatorEqual) return !a.operatorEqual(b);else if (b.operatorNotEqual) return b.operatorNotEqual(a);else if (b.operatorEqual) return !b.operatorEqual(a);else return a != b;
        }
    };
}();

/*!

 * See3D 3D Rendering Engine Library

 * yhzheng - v0.0.1 (Wed Feb 27 2019 22:22:36 GMT+0800)

 * https://github.com/qianduanXIAOHAOZI/see3D/tree/master | Released under MIT license

 */
/**
 * @file index.js
 * @overview 提供整体接口
 */

// const DEBUG = true;

/**
 * @class See3D
 * @constructor
 * @desc See3D类是可以将一个canvas变为See3D画布的类，一切操作都依靠它 \n
 * 也是所有See3D API的容器，相当于一个module
 */
var See3D = function () {
    function See3D() {
        var dom = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.createElement("canvas");

        _classCallCheck(this, See3D);

        this.__dom = dom;
        this.__ctx = dom.getContext("2d");
        this.use = null;
        this.__fps = 0;
        this.end = true;
        this.alpha = See3D.FOV_x;
        this.beta = See3D.FOV_y;
        // this.alpha = this.beta = Math.max(this.alpha * this.height() / this.width(), this.alpha);
        // this.__time = 0;
        this.__BGC = See3D.defaultBGC;
        this.showFPS = false;
        this.clear = true;
    }

    _createClass(See3D, [{
        key: "width",
        value: function width(w) {
            if (w === void 0) {
                return this.__dom.width;
            }
            this.__dom.width = w;
            // this.alpha = this.beta = Math.max(this.alpha * this.height() / this.width(), this.alpha);
            return this;
        }
    }, {
        key: "height",
        value: function height(w) {
            if (w === void 0) {
                return this.__dom.height;
            }
            this.__dom.height = w;
            // this.alpha = this.beta = Math.max(this.alpha * this.height() / this.width(), this.alpha);
            return this;
        }
    }, {
        key: "full",
        value: function full() {
            this.width(window.innerWidth).height(window.innerHeight);
            return this;
        }
    }, {
        key: "resize",
        value: function resize() {
            this.width(window.innerWidth).height(window.innerHeight);
        }
    }, {
        key: "scene",
        value: function scene(s) {
            this.use = s;
            s.game = this;
            return this;
        }
    }, {
        key: "render",
        value: function render() {
            if (this.clear) {
                // console.log("clear");
                this.ctx.beginPath();
                this.ctx.fillStyle = this.__BGC;
                this.ctx.fillRect(0, 0, this.dom.width, this.dom.height);
                this.ctx.closePath();
            }
            this.ctx.save();
            this.ctx.translate(this.dom.width / 2, this.dom.height / 2);
            if (this.use) {
                this.use.render();
                this.ctx.restore();
            } else {
                this.ctx.restore();
                this.noView();
            }
            return this;
        }
    }, {
        key: "whileRender",
        value: function whileRender(up1, up2) {
            var preFPS = 60;
            this.__fps = 60;
            var startTS = new Date().getTime(),
                endTS = void 0;
            var updatePreFPS = startTS;
            window.requestAnimationFrame(function cb() {
                if (up1) up1();
                this.render();
                if (up2) up2();
                endTS = new Date().getTime();
                this.__fps = parseInt(1000 / (endTS - startTS));
                if (endTS - updatePreFPS >= 100) {
                    preFPS = this.fps;
                    updatePreFPS = endTS;
                }
                this.ctx.fillStyle = "#fff";
                this.ctx.font = "20px monospace";
                this.ctx.textBaseline = "top";
                this.ctx.fillText("FPS: " + preFPS, this.dom.width - 100, 0);
                startTS = endTS;
                window.requestAnimationFrame(cb.bind(this));
            }.bind(this));
        }
    }, {
        key: "noView",
        value: function noView() {
            var ctx = this.ctx;
            var _dom = this.dom,
                width = _dom.width,
                height = _dom.height;

            ctx.beginPath();
            ctx.fillStyle = this.__BGC;
            ctx.fillRect(0, 0, width, height);
            ctx.fillStyle = "#fff";
            ctx.textAlign = "center";
            ctx.font = "50px Georgia";
            ctx.fillText("No View", width / 2, height / 2);
            ctx.closePath();
            return this;
        }
    }, {
        key: "ctx",
        get: function get() {
            return this.__ctx;
        }
    }, {
        key: "dom",
        get: function get() {
            return this.__dom;
        }
    }, {
        key: "fps",
        get: function get() {
            return this.__fps;
        }
    }], [{
        key: "sendAjax",
        value: function sendAjax(href, cb) {
            var xml = null;
            if (window.XMLHttpRequest) xml = new XMLHttpRequest();else xml = new ActiveXObject('Microsoft.XMLHTTP');
            xml.open("get", href, true);
            xml.send();
            xml.onreadystatechange = function () {
                if (xml.readyState == 4 && xml.status == 200) {
                    cb(xml.responseText);
                }
            };
        }
    }, {
        key: "loadModel",
        value: function loadModel(type, source) {
            this.sendAjax(source, function (content) {
                var lines = content.split("\n");
                var modelInfoLine = lines[0];
                var modelInfoLineSplits = modelInfoLine.split(" ");
                var name = modelInfoLineSplits[0],
                    vertexCount = Number(modelInfoLineSplits[1]),
                    planeCount = Number(modelInfoLineSplits[2]);
                var points = [];
                var planes = [];
                lines.forEach(function (value, index, array) {});
            });
        }
    }]);

    return See3D;
}();

!function (See3D) {
    See3D.version = "v0.0.1";
    console.log("See3D engine (%s) launched", See3D.version);
    See3D.DEBUG = true;

    /**
     * @class Library
     * @constructor
     * @desc Library类提供了制作See3D类的接口
     */

    var Library = function () {
        function Library(name) {
            _classCallCheck(this, Library);

            this.name = name;
        }

        _createClass(Library, [{
            key: "define",
            value: function define(name, val) {
                this[name] = val;
                return this;
            }
        }, {
            key: "toSee3D",
            value: function toSee3D() {
                See3D[this.name] = this;
            }
        }, {
            key: "global",
            value: function global() {
                for (var i in this) {
                    globalThis[i] = this[i];
                }
            }
        }]);

        return Library;
    }();

    See3D.Library = Library;

    // 设置See3D视野角度
    See3D.FOV_x = Math.PI / 180 * 120;
    See3D.FOV_y = Math.PI / 180 * 120;

    // 设置See3D默认背景颜色
    See3D.defaultBGC = "#33334a";
}(See3D);
//# sourceMappingURL=index.js.map