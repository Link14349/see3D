

// index.js

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
                console.log("clear");
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


// math.js

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

/** todo 为String类型添加方法 */
!function () {
    String.prototype.last = function () {
        return this[this.length - 1];
    };
}();

/** todo 新建一个Math3D库 */
!function (See3D) {
    var lib = new See3D.Library("Math3D"); // 生成一个新的See3D库

    var Point2D = function () {
        function Point2D() {
            var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

            _classCallCheck(this, Point2D);

            this.__x = x;
            this.__y = y;
            this.binding = null;
        }

        _createClass(Point2D, [{
            key: "inverse",
            value: function inverse() {
                return new Point2D(-this.x, -this.y);
            }
        }, {
            key: "x",
            get: function get() {
                return this.__x;
            },
            set: function set(n) {
                if (this.binding) this.binding.rx(n);return this.__x = n;
            }
        }, {
            key: "y",
            get: function get() {
                return this.__y;
            },
            set: function set(n) {
                if (this.binding) this.binding.ry(n);return this.__y = n;
            }
        }]);

        return Point2D;
    }();

    var Point3D = function () {
        function Point3D() {
            var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
            var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

            _classCallCheck(this, Point3D);

            this.x = x;
            this.y = y;
            this.z = z;
        }

        _createClass(Point3D, [{
            key: "add",
            value: function add(p) {
                if (p === undefined) debugger;
                return new Point3D(p.x + this.x, p.y + this.y, p.z + this.z);
            }
        }, {
            key: "addTo",
            value: function addTo(p) {
                this.x += p.x;
                this.y += p.y;
                this.z += p.z;
                return this;
            }
        }, {
            key: "sub",
            value: function sub(p) {
                return new Point3D(this.x - p.x, this.y - p.y, this.z - p.z);
            }
        }, {
            key: "subTo",
            value: function subTo(p) {
                this.x -= p.x;
                this.y -= p.y;
                this.z -= p.z;
                return this;
            }
        }, {
            key: "mul",
            value: function mul(v) {
                return this.x * v.x + this.y * v.y + this.z * v.z;
            }
        }, {
            key: "mul_",
            value: function mul_(v) {
                return new Point3D(this.x * v.x, this.y * v.y, this.z * v.z);
            }
        }, {
            key: "mod",
            value: function mod() {
                return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2));
            }
        }, {
            key: "mod2",
            value: function mod2() {
                return Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2);
            }
        }, {
            key: "norm",
            value: function norm() {
                var mod = this.mod();
                return new Point3D(this.x / mod, this.y / mod, this.z / mod);
            }
        }, {
            key: "inverse",
            value: function inverse() {
                return new Point3D(-this.x, -this.y, -this.z);
            }
        }, {
            key: "inverseTo",
            value: function inverseTo() {
                this.x *= -1;
                this.y *= -1;
                this.z *= -1;
                return this;
            }
        }, {
            key: "mappingTo",
            value: function mappingTo(ta, tb, w) {
                return [w * this.x / (2 * this.z * ta), -w * this.y / (2 * this.z * tb)];
                // return [this.x * 10, this.y * 10];
            }
        }, {
            key: "copy",
            value: function copy() {
                return new Point3D(this.x, this.y, this.z);
            }
        }, {
            key: "rotate",
            value: function rotate(s) {
                var SSX = Math.sin(s.x);
                var CSX = Math.cos(s.x);
                var CSY = Math.cos(s.y);
                var SSY = Math.sin(s.y);
                var CSZ = Math.cos(s.z);
                var SSZ = Math.sin(s.z);
                return new Point3D((this.x * CSY + this.y * SSX * SSY - this.z * CSX * SSY) * CSZ + (this.y * CSX + this.z * SSX) * SSZ, (this.y * CSX + this.z * SSX) * CSZ - (this.x * CSY + this.y * SSX * SSY - this.z * CSX * SSY) * SSZ, this.x * SSY - this.y * SSX * CSY + this.z * CSX * CSY);
            }
        }], [{
            key: "Zero",
            value: function Zero() {
                return new Point3D();
            }
        }]);

        return Point3D;
    }();

    lib.define("Point2D", Point2D);
    lib.define("Point3D", Point3D);

    lib.toSee3D();
    lib.global(); // 将库API加入浏览器全局
}(See3D);
//# sourceMappingURL=math.js.map


// item.js

"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

!function (See3D) {
    var lib = new See3D.Library("View");

    var Scene = function () {
        function Scene() {
            _classCallCheck(this, Scene);

            this.use = null;
            this.game = null;
            this.items = [];
        }

        _createClass(Scene, [{
            key: "camera",
            value: function camera(_camera) {
                this.use = _camera;
                _camera.scene = this;
                return this;
            }
        }, {
            key: "render",
            value: function render() {
                if (this.use) this.use.render();
                return this;
            }
        }, {
            key: "push",
            value: function push(itm) {
                this.items.push(itm);
                return this;
            }
        }, {
            key: "ctx",
            get: function get() {
                return this.game.ctx;
            }
        }, {
            key: "alpha",
            get: function get() {
                return this.game.alpha;
            }
        }, {
            key: "beta",
            get: function get() {
                return this.game.beta;
            }
        }, {
            key: "width",
            get: function get() {
                return this.game.width();
            }
        }, {
            key: "height",
            get: function get() {
                return this.game.height();
            }
        }]);

        return Scene;
    }();

    var Item = function () {
        function Item() {
            var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : See3D.Math3D.Point3D.Zero();
            var rotation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new See3D.Math3D.Point3D();

            _classCallCheck(this, Item);

            this.position = position;
            this.rotation = rotation;
            this.points = [];
            this.planes = [];
            this.maxRadius = 0;
            rotation.binding = this;
        }

        _createClass(Item, [{
            key: "rotate",
            value: function rotate(rotation) {
                this.rotation.addTo(rotation);
                rotation = rotation.inverse();
                for (var i = 0; i < this.points.length; i++) {
                    this.points[i] = this.points[i].rotate(rotation);
                }
                for (var _i = 0; _i < this.planes.length; _i++) {
                    this.planes[_i][this.planes[_i].length - 1] = this.planes[_i][this.planes[_i].length - 1].rotate(rotation);
                }
                return this;
            }
        }, {
            key: "scale",
            value: function scale(s) {
                for (var i = 0; i < this.points.length; i++) {
                    this.points[i] = this.points[i].mul_(s);
                }
                this.changeMaxRadius();
                return this;
            }
        }, {
            key: "changeMaxRadius",
            value: function changeMaxRadius() {}
        }, {
            key: "forward",
            value: function forward(step) {
                var p = new See3D.Math3D.Point3D(0, 0, step).rotate(this.rotation.inverse());
                this.position.x -= p.x;
                this.position.y -= p.y;
                this.position.z += p.z;
                return this;
            }
        }, {
            key: "left",
            value: function left(step) {
                var p = new See3D.Math3D.Point3D(step, 0, 0).rotate(this.rotation.inverse());
                this.position.x -= p.x;
                this.position.y -= p.y;
                this.position.z += p.z;
                return this;
            }
        }, {
            key: "right",
            value: function right(step) {
                return this.left(-step);
            }
        }, {
            key: "back",
            value: function back(step) {
                return this.forward(-step);
            }
        }]);

        return Item;
    }();

    var Camera = function (_Item) {
        _inherits(Camera, _Item);

        function Camera() {
            var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : See3D.Math3D.Point3D.Zero();
            var rotation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new See3D.Math3D.Point3D();

            _classCallCheck(this, Camera);

            var _this = _possibleConstructorReturn(this, (Camera.__proto__ || Object.getPrototypeOf(Camera)).call(this, position, rotation));

            _this.scene = null;
            return _this;
        }

        _createClass(Camera, [{
            key: "render",
            value: function render() {
                var ctx = this.ctx,
                    alpha = this.alpha,
                    beta = this.beta,
                    width = this.width,
                    height = this.height;

                var ta = Math.tan(alpha / 2);
                var tb = Math.tan(beta / 2);
                var maxLen = Math.max(width, height);
                var items = this.scene.items;
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    var points = item.points;
                    var planes = item.planes;
                    var itemCamPos = this.transToCameraPosition(See3D.Math3D.Point3D.Zero(), item.position);
                    if (itemCamPos.z + item.maxRadius <= 0 || itemCamPos.z + item.maxRadius > 1000) continue; // 近裁面和远裁面的判断
                    if (itemCamPos.z < Math.tan(Math.PI / 2 - alpha / 2) * Math.abs(itemCamPos.x + (itemCamPos.x > 0 ? -1 : 1) * item.maxRadius)) continue;
                    // console.log(Math.tan(Math.PI / 2 - beta / 2) * Math.abs(itemCamPos.z + item.maxRadius * 2));
                    if (itemCamPos.z < Math.tan(Math.PI / 2 - beta / 2) * Math.abs(itemCamPos.y + (itemCamPos.y > 0 ? -1 : 1) * item.maxRadius)) continue;
                    // console.log("i");
                    var transedPoints = [];
                    var transedPlanes = [];
                    if (item.type == "Point") {
                        var point3d = this.transToCameraPosition(points[0], item.position);
                        ctx.beginPath();
                        ctx.arc.apply(ctx, _toConsumableArray(point3d.mappingTo(ta, tb, maxLen)).concat([1, 0, 2 * Math.PI]));
                        ctx.fillStyle = "#fff";
                        ctx.fill();
                        ctx.closePath();
                        continue;
                    } else if (item.type == "Line") {
                        ctx.beginPath();
                        ctx.moveTo.apply(ctx, _toConsumableArray(this.transToCameraPosition(points[0], item.position).mappingTo(ta, tb, maxLen)));
                        ctx.lineTo.apply(ctx, _toConsumableArray(this.transToCameraPosition(points[1], item.position).mappingTo(ta, tb, maxLen)));
                        ctx.strokeStyle = "#fff";
                        ctx.stroke();
                        ctx.closePath();
                        continue;
                    }
                    for (var j = 0; j < points.length; j++) {
                        transedPoints.push(this.transToCameraPosition(points[j], item.position));
                    }
                    for (var _j = 0, c = 0; _j < planes.length; _j++) {
                        var plane = planes[_j];
                        if (plane[plane.length - 1].rotate(this.rotation.inverse()).mul(transedPoints[plane[0]].inverse().norm()) < 0) continue;
                        transedPlanes.push([]);
                        for (var k = 0; k < plane.length - 1; k++) {
                            // 所有的面都是基于三角形的
                            // console.log(transedPlanes[j], j);
                            transedPlanes[c].push(transedPoints[plane[k]]);
                        }
                        c++;
                    }
                    for (var _j2 = 0; _j2 < transedPlanes.length; _j2++) {
                        ctx.beginPath();
                        var tmppos = transedPlanes[_j2][0].mappingTo(ta, tb, maxLen);
                        ctx.moveTo.apply(ctx, _toConsumableArray(tmppos));
                        for (var _k = 1; _k < transedPlanes[_j2].length; _k++) {
                            ctx.lineTo.apply(ctx, _toConsumableArray(transedPlanes[_j2][_k].mappingTo(ta, tb, maxLen)));
                        }
                        ctx.lineTo.apply(ctx, _toConsumableArray(tmppos));
                        ctx.strokeStyle = "#fff";
                        // ctx.fillStyle = "#fff";
                        ctx.stroke();
                        // ctx.fill();
                        ctx.closePath();
                    }
                }
                return this;
            }
        }, {
            key: "transToCameraPosition",
            value: function transToCameraPosition(point, itemWorldPoint) {
                return point.add(itemWorldPoint).sub(this.position).rotate(this.rotation.inverse());
            }
        }, {
            key: "ctx",
            get: function get() {
                return this.scene.ctx;
            }
        }, {
            key: "alpha",
            get: function get() {
                return this.scene.alpha;
            }
        }, {
            key: "beta",
            get: function get() {
                return this.scene.beta;
            }
        }, {
            key: "width",
            get: function get() {
                return this.scene.width;
            }
        }, {
            key: "height",
            get: function get() {
                return this.scene.height;
            }
        }]);

        return Camera;
    }(Item);

    var Point = function (_Item2) {
        _inherits(Point, _Item2);

        function Point() {
            var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : See3D.Math3D.Point3D.Zero();
            var rotation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new See3D.Math3D.Point3D();

            _classCallCheck(this, Point);

            var _this2 = _possibleConstructorReturn(this, (Point.__proto__ || Object.getPrototypeOf(Point)).call(this, position, rotation));

            _this2.type = "Point";
            _this2.points = [See3D.Math3D.Point3D.Zero()];
            _this2.maxRadius = 0;
            return _this2;
        }

        return Point;
    }(Item);

    var Line = function (_Item3) {
        _inherits(Line, _Item3);

        function Line() {
            var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : See3D.Math3D.Point3D.Zero();
            var start = arguments[1];
            var end = arguments[2];

            _classCallCheck(this, Line);

            var _this3 = _possibleConstructorReturn(this, (Line.__proto__ || Object.getPrototypeOf(Line)).call(this, position, new See3D.Math3D.Point3D()));

            _this3.type = "Line";
            _this3.points = [start.copy(), end.copy()];
            _this3.maxRadius = start.sub(end).mod();
            return _this3;
        }

        _createClass(Line, [{
            key: "changeMaxRadius",
            value: function changeMaxRadius() {
                this.maxRadius = start.sub(end).mod();
            }
        }]);

        return Line;
    }(Item);

    var Cube = function (_Item4) {
        _inherits(Cube, _Item4);

        function Cube() {
            var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : See3D.Math3D.Point3D.Zero();

            var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
                _ref$w = _ref.w,
                w = _ref$w === undefined ? 5 : _ref$w,
                _ref$h = _ref.h,
                h = _ref$h === undefined ? 5 : _ref$h,
                _ref$d = _ref.d,
                d = _ref$d === undefined ? 5 : _ref$d;

            _classCallCheck(this, Cube);

            var _this4 = _possibleConstructorReturn(this, (Cube.__proto__ || Object.getPrototypeOf(Cube)).call(this, position, See3D.Math3D.Point3D.Zero()));

            _this4.type = "Cube";
            _this4.points = [new See3D.Math3D.Point3D(w, h, d), new See3D.Math3D.Point3D(w, h, -d), new See3D.Math3D.Point3D(w, -h, d), new See3D.Math3D.Point3D(w, -h, -d), new See3D.Math3D.Point3D(-w, h, d), new See3D.Math3D.Point3D(-w, h, -d), new See3D.Math3D.Point3D(-w, -h, d), new See3D.Math3D.Point3D(-w, -h, -d)];
            // up: 0, 1, 4, 5
            _this4.planes = [[1, 2, 3, new Point3D(1, 0, 0)], [0, 1, 2, new Point3D(1, 0, 0)], [5, 6, 7, new Point3D(-1, 0, 0)], [4, 5, 6, new Point3D(-1, 0, 0)], [3, 6, 7, new Point3D(0, -1, 0)], [2, 3, 6, new Point3D(0, -1, 0)], [1, 4, 5, new Point3D(0, 1, 0)], [0, 1, 4, new Point3D(0, 1, 0)], [2, 4, 6, new Point3D(0, 0, 1)], [0, 2, 4, new Point3D(0, 0, 1)], [3, 5, 7, new Point3D(0, 0, -1)], [1, 3, 5, new Point3D(0, 0, -1)]];
            _this4.maxRadius = Math.sqrt(Math.pow(w, 2) + Math.pow(h, 2) + Math.pow(d, 2));
            return _this4;
        }

        _createClass(Cube, [{
            key: "changeMaxRadius",
            value: function changeMaxRadius() {
                var max = 0;
                for (var i = 0; i < this.points.length; i++) {
                    var m2 = this.points[i].mod2();
                    if (m2 > max) max = m2;
                }
                this.maxRadius = Math.sqrt(max);
            }
        }]);

        return Cube;
    }(Item);

    var Pyramid = function (_Item5) {
        _inherits(Pyramid, _Item5);

        function Pyramid() {
            var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : See3D.Math3D.Point3D.Zero();

            var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
                pointCount = _ref2.pointCount,
                radius = _ref2.radius,
                height = _ref2.height;

            _classCallCheck(this, Pyramid);

            var _this5 = _possibleConstructorReturn(this, (Pyramid.__proto__ || Object.getPrototypeOf(Pyramid)).call(this, position, See3D.Math3D.Point3D.Zero()));

            _this5.type = "Pyramid";
            _this5.points = [new See3D.Math3D.Point3D(0, height / 2, 0)];
            _this5.planes = [];
            _this5.maxRadius = Math.max(radius, height);
            var delta_theta = Math.PI * 2 / pointCount;
            var plane_bottom = [];
            for (var i = 0, theta = 0; i < pointCount; i++, theta += delta_theta) {
                _this5.points.push(new See3D.Math3D.Point3D(radius * Math.sin(theta), -height / 2, radius * Math.cos(theta)));
                plane_bottom.push(i + 1);
                if (i > 0) _this5.planes.push([i, i + 1, 0, new See3D.Math3D.Point3D(Math.sin(theta - delta_theta / 2), Math.sin(Math.PI / 2 - Math.atan(radius / height)), Math.cos(theta - delta_theta / 2))]);
            }
            plane_bottom.push(new See3D.Math3D.Point3D(0, 1, 0));
            _this5.planes.push(plane_bottom);
            return _this5;
        }

        _createClass(Pyramid, [{
            key: "changeMaxRadius",
            value: function changeMaxRadius() {
                var max = 0;
                for (var i = 0; i < this.points.length; i++) {
                    var m2 = this.points[i].mod2();
                    if (m2 > max) max = m2;
                }
                this.maxRadius = Math.sqrt(max);
            }
        }]);

        return Pyramid;
    }(Item);

    lib.define("Scene", Scene);
    lib.define("Item", Item);
    lib.define("Camera", Camera);
    lib.define("Point", Point);
    lib.define("Line", Line);
    lib.define("Cube", Cube);
    lib.define("Pyramid", Pyramid);

    lib.toSee3D();
    lib.global();
}(See3D);
//# sourceMappingURL=item.js.map
