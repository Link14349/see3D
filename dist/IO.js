"use strict";
'bpo enable';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; _Op.less(i, props.length); i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError(_Op.add("Super expression must either be null or a function, not ", typeof superClass)); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

!function () {
    var lib = new See3D.Library("IO"); // 生成一个新的See3D库

    var sstream = function (_See3D$LibraryDefineO) {
        _inherits(sstream, _See3D$LibraryDefineO);

        function sstream() {
            _classCallCheck(this, sstream);

            var _this = _possibleConstructorReturn(this, (sstream.__proto__ || Object.getPrototypeOf(sstream)).call(this, "Stream"));

            _this.str = "";
            return _this;
        }

        _createClass(sstream, [{
            key: "operatorBinaryLShift",
            value: function operatorBinaryLShift(b) {
                this.str += b;
                return this;
            }
        }, {
            key: "operatorBinaryRShift",
            value: function operatorBinaryRShift(b) {
                _Op.binaryLShift(b, this.str);
                return this;
            }
        }]);

        return sstream;
    }(See3D.LibraryDefineObject);

    var sostream = function (_sstream) {
        _inherits(sostream, _sstream);

        function sostream(see3d) {
            var size = _Op.greater(arguments.length, 1) && arguments[1] !== undefined ? arguments[1] : 10;
            var font = _Op.greater(arguments.length, 2) && arguments[2] !== undefined ? arguments[2] : "sans-serif";
            var color = _Op.greater(arguments.length, 3) && arguments[3] !== undefined ? arguments[3] : "#fff";

            _classCallCheck(this, sostream);

            var _this2 = _possibleConstructorReturn(this, (sostream.__proto__ || Object.getPrototypeOf(sostream)).call(this));

            _this2.__see3d = see3d;
            _this2.__ctx = see3d.ctx;
            _this2.x = 0;
            _this2.y = 0;
            _this2.__size = size;
            _this2.__font = font;
            _this2.__color = color;
            _this2.__ctx.fillStyle = color;
            _this2.startX = 0;
            _this2.startY = 0;
            _this2.update();
            return _this2;
        }

        _createClass(sostream, [{
            key: "size",
            value: function size(n) {
                if (n === undefined) return this.__size;
                if (_Op.greater(this.__size, n)) this.y += _Op.sub(this.__size, n);
                this.__size = n;
                this.update();
                return this;
            }
        }, {
            key: "font",
            value: function font(f) {
                if (f === undefined) return this.__font;
                this.__font = f;
                this.update();
                return this.__font;
            }
        }, {
            key: "update",
            value: function update() {
                this.__ctx.font = _Op.add(_Op.add(this.size(), "px "), this.font());
            }
        }, {
            key: "reset",
            value: function reset() {
                this.x = this.startX;
                this.y = this.startY;
            }
        }, {
            key: "operatorBinaryLShift",
            value: function operatorBinaryLShift(b) {
                this.update();
                this.str += b;
                this.__ctx.textAlign = "left";
                this.__ctx.textBaseline = "top";
                this.__ctx.fillStyle = this.__color;
                // console.log(this.size(), this.__ctx);
                var words = b.split("\n");
                for (var i = 0; _Op.less(i, words.length); i++) {
                    this.__ctx.fillText(words[i], this.x, this.y);
                    if (_Op.equal(i, _Op.sub(words.length, 1))) this.x += this.__ctx.measureText(words[i]).x;else {
                        this.x = this.startX;
                        this.y += this.__ctx.measureText(words[i]).y;
                    }
                }
                return this;
            }
        }]);

        return sostream;
    }(sstream);

    lib.define("sstream", sstream);
    lib.define("sostream", sostream);

    lib.trans();
    See3D.library(lib);
    See3D.load("IO");
    if (See3D.DEBUG) See3D.loadGlobal("IO");
    if (See3D.DEBUG) lib.global();
    See3D.lib("IO");
}();
//# sourceMappingURL=IO.js.map