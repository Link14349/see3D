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