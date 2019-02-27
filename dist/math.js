"use strict";
'bpo enable';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; _Op.less(i, props.length); i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); _Op.less(i, arr.length); i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError(_Op.add("Super expression must either be null or a function, not ", typeof superClass)); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Op = function () {
    'bpo disable';

    return {
        add: function add(a, b) {
            if (a.operatorAdd) return a.operatorAdd(b);else return a + b;
        },
        sub: function sub(a, b) {
            if (a.operatorSub) return a.operatorSub(b);else return a - b;
        },
        mul: function mul(a, b) {
            if (a.operatorMul) return a.operatorMul(b);else return a * b;
        },
        div: function div(a, b) {
            if (a.operatorDiv) return a.operatorDiv(b);else return a / b;
        },
        mod: function mod(a, b) {
            if (a.operatorMod) return a.operatorMod(b);else return a % b;
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
    var lib = new See3D.Library("Math3D"); // 生成一个新的See3D库

    // 支持的最小精度
    var smallest = 1e-5;

    function probably(n) {
        var v = Number(n.toFixed(5));
        if (_Op.greaterEqual(_Op.add(v, smallest), n)) return v;
        return n;
    }

    // 枚举类型

    var Enum = function (_See3D$LibraryDefineO) {
        _inherits(Enum, _See3D$LibraryDefineO);

        function Enum(enums) {
            _classCallCheck(this, Enum);

            var _this = _possibleConstructorReturn(this, (Enum.__proto__ || Object.getPrototypeOf(Enum)).call(this, "Enum"));

            var n = 0;
            for (var i in enums) {
                var v = enums[i];
                if ((typeof v === "undefined" ? "undefined" : _typeof(v)) === "object") {
                    n = v[1];
                    v = v[0];
                }
                _this[v] = n;
                _this[_Op.add("$", n)] = v;
                n++;
            }
            return _this;
        }

        _createClass(Enum, [{
            key: "get",
            value: function get(n) {
                return this[_Op.add("$", n)];
            }
        }]);

        return Enum;
    }(See3D.LibraryDefineObject);

    // 向量类


    var Vector = function (_See3D$LibraryDefineO2) {
        _inherits(Vector, _See3D$LibraryDefineO2);

        function Vector(arr) {
            _classCallCheck(this, Vector);

            var _this2 = _possibleConstructorReturn(this, (Vector.__proto__ || Object.getPrototypeOf(Vector)).call(this, "Vector"));

            _this2.array = [];
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = arr[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var i = _step.value;
                    _this2.array.push(i);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return _this2;
        }

        _createClass(Vector, [{
            key: "set",
            value: function set(index, val) {
                this.array[index] = val;
                return this;
            }
        }, {
            key: "get",
            value: function get(index) {
                return this.array[index];
            }
        }, {
            key: "mod",
            value: function mod() {
                var sum = 0;
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = this.array[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var i = _step2.value;

                        sum += _Op.pow(i, 2);
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }

                return Math.sqrt(sum);
            }
        }, {
            key: "operatorMod",

            // 点积
            value: function operatorMod(b) {
                if (typeof b === "number") {
                    console.error(new Error("Error 102: Do not support scalar and vector for dot product operations"));
                    return null;
                }
                if (b.type === "Vector") {
                    if (_Op.notEqual(b.length, this.length)) {
                        console.error(new Error("Error 100: Vector size does not match"));
                        return null;
                    }
                    var sum = 0;
                    for (var i in this.array) {
                        sum += _Op.mul(this.array[i], b.array[i]);
                    }
                    return sum;
                }
            }
        }, {
            key: "operatorAdd",
            value: function operatorAdd(b) {
                if (typeof b === "number") {
                    var tmp = new Vector([]);
                    tmp.array = tmp.array.concat(this.array);
                    for (var i in this.array) {
                        tmp.array[i] += b;
                    }
                    return tmp;
                } else {
                    if (b.type === "Vector") {
                        if (_Op.notEqual(b.length, this.length)) {
                            console.error(new Error("Error 100: Vector size does not match"));
                            return null;
                        }
                        var v = [];
                        for (var _i in this.array) {
                            v.push(_Op.add(this.array[_i], b.array[_i]));
                        }
                        return new Vector(v);
                    }
                }
            }
        }, {
            key: "operatorSub",
            value: function operatorSub(b) {
                if (typeof b === "number") {
                    var tmp = new Vector([]);
                    tmp.array = tmp.array.concat(this.array);
                    for (var i in this.array) {
                        tmp.array[i] -= b;
                    }
                    return tmp;
                } else {
                    if (b.type === "Vector") {
                        if (_Op.notEqual(b.length, this.length)) {
                            console.error(new Error("Error 100: Vector size does not match"));
                            return null;
                        }
                        var v = [];
                        for (var _i2 in this.array) {
                            v.push(_Op.sub(this.array[_i2], b.array[_i2]));
                        }
                        return new Vector(v);
                    }
                }
            }
        }, {
            key: "operatorDiv",
            value: function operatorDiv(b) {
                if (typeof b === "number") {
                    var tmp = new Vector([]);
                    tmp.array = tmp.array.concat(this.array);
                    for (var i in this.array) {
                        tmp.array[i] /= b;
                    }
                    return tmp;
                } else {
                    console.error(new Error("Error 102: Do not support scalar and vector for dot div operations"));
                    return null;
                }
            }
        }, {
            key: "operatorMul",
            value: function operatorMul(b) {
                if (typeof b === "number") {
                    var tmp = new Vector([]);
                    tmp.array = tmp.array.concat(this.array);
                    for (var i in this.array) {
                        tmp.array[i] *= b;
                    }
                    return tmp;
                } else {
                    console.error(new Error("Error 102: Do not support scalar and vector for dot div operations"));
                    return null;
                }
            }
        }, {
            key: "operatorBinaryXor",
            value: function operatorBinaryXor(b) {
                if (typeof b === "number") {
                    console.error(new Error("Error 102: Do not support scalar and vector for dot product operations"));
                    return null;
                }
                if (b.type === "Vector") {
                    var res = _Op.mod(this, b);
                    res /= this.mod();
                    res /= b.mod();
                    res = Math.acos(res);
                    return probably(res);
                }
            }
        }, {
            key: "trans",
            value: function trans(type) {
                if (type.search(/vector/i)) {
                    if (_Op.equal(this.length, 2)) return new (Function.prototype.bind.apply(Vector2, [null].concat(_toConsumableArray(this.array))))();
                    if (_Op.equal(this.length, 3)) return new (Function.prototype.bind.apply(Vector3, [null].concat(_toConsumableArray(this.array))))();
                    if (_Op.equal(this.length, 4)) return new (Function.prototype.bind.apply(Vector4, [null].concat(_toConsumableArray(this.array))))();
                    return new Vector(this.array);
                }
            }
        }, {
            key: "norm",
            value: function norm() {
                return _Op.div(this, this.mod());
            }
        }, {
            key: "length",
            get: function get() {
                return this.array.length;
            }
        }]);

        return Vector;
    }(See3D.LibraryDefineObject);

    var Vector2 = function (_Vector) {
        _inherits(Vector2, _Vector);

        function Vector2() {
            var x = _Op.greater(arguments.length, 0) && arguments[0] !== undefined ? arguments[0] : 0;
            var y = _Op.greater(arguments.length, 1) && arguments[1] !== undefined ? arguments[1] : 0;

            _classCallCheck(this, Vector2);

            return _possibleConstructorReturn(this, (Vector2.__proto__ || Object.getPrototypeOf(Vector2)).call(this, [x, y]));
        }

        _createClass(Vector2, [{
            key: "x",
            get: function get() {
                return this.get(0);
            },
            set: function set(n) {
                this.set(0, n);
                return n;
            }
        }, {
            key: "y",
            get: function get() {
                return this.get(1);
            },
            set: function set(n) {
                this.set(1, n);
                return n;
            }
        }]);

        return Vector2;
    }(Vector);

    var Vector3 = function (_Vector2) {
        _inherits(Vector3, _Vector2);

        function Vector3() {
            var x = _Op.greater(arguments.length, 0) && arguments[0] !== undefined ? arguments[0] : 0;
            var y = _Op.greater(arguments.length, 1) && arguments[1] !== undefined ? arguments[1] : 0;
            var z = _Op.greater(arguments.length, 2) && arguments[2] !== undefined ? arguments[2] : 0;

            _classCallCheck(this, Vector3);

            return _possibleConstructorReturn(this, (Vector3.__proto__ || Object.getPrototypeOf(Vector3)).call(this, [x, y, z]));
        }

        _createClass(Vector3, [{
            key: "x",
            get: function get() {
                return this.get(0);
            },
            set: function set(n) {
                this.set(0, n);
                return n;
            }
        }, {
            key: "y",
            get: function get() {
                return this.get(1);
            },
            set: function set(n) {
                this.set(1, n);
                return n;
            }
        }, {
            key: "z",
            get: function get() {
                return this.get(2);
            },
            set: function set(n) {
                this.set(2, n);
                return n;
            }
        }]);

        return Vector3;
    }(Vector);

    var Vector4 = function (_Vector3) {
        _inherits(Vector4, _Vector3);

        function Vector4() {
            var x = _Op.greater(arguments.length, 0) && arguments[0] !== undefined ? arguments[0] : 0;
            var y = _Op.greater(arguments.length, 1) && arguments[1] !== undefined ? arguments[1] : 0;
            var z = _Op.greater(arguments.length, 2) && arguments[2] !== undefined ? arguments[2] : 0;
            var w = _Op.greater(arguments.length, 3) && arguments[3] !== undefined ? arguments[3] : 1;

            _classCallCheck(this, Vector4);

            return _possibleConstructorReturn(this, (Vector4.__proto__ || Object.getPrototypeOf(Vector4)).call(this, [x, y, z, w]));
        }

        _createClass(Vector4, [{
            key: "x",
            get: function get() {
                return _Op.div(this.get(0), this.w);
            },
            set: function set(n) {
                this.set(0, n);
                return n;
            }
        }, {
            key: "y",
            get: function get() {
                return _Op.div(this.get(1), this.w);
            },
            set: function set(n) {
                this.set(1, n);
                return n;
            }
        }, {
            key: "z",
            get: function get() {
                return _Op.div(this.get(2), this.w);
            },
            set: function set(n) {
                this.set(2, n);
                return n;
            }
        }, {
            key: "w",
            get: function get() {
                return this.get(3);
            },
            set: function set(n) {
                this.set(3, n);
                return n;
            }
        }]);

        return Vector4;
    }(Vector);

    // 直线类


    var StraightLine2D = function (_See3D$LibraryDefineO3) {
        _inherits(StraightLine2D, _See3D$LibraryDefineO3);

        function StraightLine2D(x0, y0, x1, y1) {
            _classCallCheck(this, StraightLine2D);

            var _this6 = _possibleConstructorReturn(this, (StraightLine2D.__proto__ || Object.getPrototypeOf(StraightLine2D)).call(this, "StraightLine"));

            _this6.p0 = new Vector2(x0, y0);
            _this6.p1 = new Vector2(x1, y1);
            _this6.v = new Vector2(_Op.sub(x1, x0), _Op.sub(y1, y0));
            return _this6;
        }

        return StraightLine2D;
    }(See3D.LibraryDefineObject);

    var StraightLine3D = function (_See3D$LibraryDefineO4) {
        _inherits(StraightLine3D, _See3D$LibraryDefineO4);

        function StraightLine3D(x0, y0, z0, x1, y1, z1) {
            _classCallCheck(this, StraightLine3D);

            var _this7 = _possibleConstructorReturn(this, (StraightLine3D.__proto__ || Object.getPrototypeOf(StraightLine3D)).call(this, "StraightLine"));

            _this7.p0 = new Vector3(x0, y0, z0);
            _this7.p1 = new Vector3(x1, y1, z1);
            _this7.v = new Vector3(_Op.sub(x1, x0), _Op.sub(y1, y0), _Op.sub(z1, z0));
            return _this7;
        }

        return StraightLine3D;
    }(See3D.LibraryDefineObject);

    // 在库中定义所有的接口


    lib.define("smallest", smallest);
    lib.define("probably", probably);

    lib.define("Enum", Enum);

    lib.define("Vector", Vector);
    lib.define("Vector2", Vector2);
    lib.define("Vector3", Vector3);
    lib.define("Vector4", Vector4);

    lib.define("StraightLine2D", StraightLine2D);
    lib.define("StraightLine3D", StraightLine3D);

    lib.trans(); // 在库的全局添加接口
    See3D.library(lib); // 将库加载入See3D中
    See3D.load("Math3D"); // 将库加入See3D的默认加载队列
    lib.global();
    var a = new Vector2(1, 1);
    var b = new Vector2(1, 1);
    console.log(_Op.mod(a, b));
    console.log(_Op.binaryXor(a, b));
    console.log(_Op.div(a, 0.5));
    console.log(_Op.mul(a, 2));
}();
//# sourceMappingURL=math.js.map