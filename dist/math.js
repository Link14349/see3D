"use strict";
'bpo enable';

/** todo 为String类型添加方法 */

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
    String.prototype.last = function () {
        return this[_Op.sub(this.length, 1)];
    };
}();

/** todo 新建一个Math3D库 */
!function (See3D) {
    var lib = new See3D.Library("Math3D"); // 生成一个新的See3D库

    /** todo 一些关于精度问题的转化 */
    // 支持的最小精度
    var smallest = 1e-5;
    var smallestLen = 5;

    function probably(n) {
        return Number(n.toFixed(smallestLen));
    }

    /** todo 枚举类型 */

    var Enum = function (_See3D$LibraryDefineO) {
        _inherits(Enum, _See3D$LibraryDefineO);

        /*
        * 使用方法:
        * let colors = new Enum(["RED", "WHITE", "BLACK"])
        */
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

    /** todo 提供数学意义上的集合类 */
    // {(token) | expr}


    var MathSet = function (_See3D$LibraryDefineO2) {
        _inherits(MathSet, _See3D$LibraryDefineO2);

        function MathSet(token, expr) {
            _classCallCheck(this, MathSet);

            var _this2 = _possibleConstructorReturn(this, (MathSet.__proto__ || Object.getPrototypeOf(MathSet)).call(this, "MathSet"));

            if (_Op.equal(arguments.length, 1)) {
                // 只有一个参数
                var str = token;
                str = str.trim();
                if (_Op.lessEqual(str.length, 2) || _Op.notEqual(str[0], "{") || _Op.notEqual(str.last(), "}") // 不以'{'开头或不以'}'结尾
                ) {
                        console.error(new Error(_Op.add(_Op.add("Error 104: Illegal set string '", str), "'")));
                        return _possibleConstructorReturn(_this2);
                    }
                str = str.substring(1, _Op.sub(str.length, 1));
                token = "";

                var splitIndex = str.search(/\|/);
                if (_Op.less(splitIndex, 0)) {
                    console.error(new Error(_Op.add(_Op.add("Error 104: Illegal set string '", str), "'")));
                    return _possibleConstructorReturn(_this2);
                }

                // 获取token
                for (var i = 0; _Op.less(i, splitIndex); i++) {
                    token += str[i];
                }
                token = token.trim();

                expr = "";
                // 获取expr
                for (var _i = _Op.add(splitIndex, 1); _Op.less(_i, str.length); _i++) {
                    expr += str[_i];
                }
            }
            _this2.token = token;
            _this2.expr = expr;
            return _this2;
        }

        _createClass(MathSet, [{
            key: "have",
            value: function have(n) {
                var expr = this.expr.replace(new RegExp(_Op.add(_Op.add("([^a-zA-Z_])", this.token), "([^a-zA-Z_])"), "g"), _Op.add(_Op.add("$1", n), "$2"));
                return Boolean(eval(expr));
            }
        }]);

        return MathSet;
    }(See3D.LibraryDefineObject);

    /** todo 提供区间类 */


    var Interval = function (_MathSet) {
        _inherits(Interval, _MathSet);

        function Interval(type, s, e) {
            _classCallCheck(this, Interval);

            // super("Interval");
            var st = void 0,
                et = void 0; // 存储是开还是闭
            var token = "n"; // 变量名, {x | a < x < b}
            var expr = "";
            var firstOp = void 0,
                lastOp = void 0;
            if (_Op.equal(arguments.length, 1)) {
                // 只有一个参数
                var str = type;
                str = str.trim();
                st = str[0];
                et = str.last();

                // 检查类型
                if (_Op.notEqual(st, "[") && _Op.notEqual(st, "(")) {
                    console.error(new Error(_Op.add(_Op.add("Error 103: Illegal interval identifier '", st), "'")));
                    return _possibleConstructorReturn(_this3);
                }
                if (_Op.notEqual(et, "]") && _Op.notEqual(et, ")")) {
                    console.error(new Error(_Op.add(_Op.add("Error 103: Illegal interval identifier '", et), "'")));
                    return _possibleConstructorReturn(_this3);
                }
                str = str.substring(1, _Op.sub(str.length, 1));
                var numbers = str.split(",");
                if (_Op.less(numbers.length, 2)) str.split(/\s+/g);
                if (_Op.equal(st, "[")) firstOp = "<=";
                if (_Op.equal(st, "(")) firstOp = "<";
                if (_Op.equal(et, "]")) lastOp = "<=";
                if (_Op.equal(et, ")")) lastOp = "<";
                s = numbers[0];
                e = numbers[1];
                expr = _Op.add(_Op.add(_Op.add(_Op.add(_Op.add(_Op.add(s, firstOp), token), " && "), token), lastOp), e);
                // this.st = st;
                // this.et = et;
                // this.s = numbers[0];// 区间的第一个数
                // this.e = numbers[1];// 区间的第二个数
            } else {
                st = type[0];
                et = type[1];
                // 检查类型
                if (_Op.notEqual(st, "[") && _Op.notEqual(st, "(")) {
                    console.error(new Error(_Op.add(_Op.add("Error 103: Illegal interval identifier '", st), "'")));
                    return _possibleConstructorReturn(_this3);
                }
                if (_Op.notEqual(et, "]") && _Op.notEqual(et, ")")) {
                    console.error(new Error(_Op.add(_Op.add("Error 103: Illegal interval identifier '", et), "'")));
                    return _possibleConstructorReturn(_this3);
                }
                if (_Op.equal(st, "[")) firstOp = "<=";
                if (_Op.equal(st, "(")) firstOp = "<";
                if (_Op.equal(et, "]")) lastOp = "<=";
                if (_Op.equal(et, ")")) lastOp = "<";
                // console.log(firstOp, lastOp, s, e);
                expr = _Op.add(_Op.add(_Op.add(_Op.add(_Op.add(_Op.add(String(s), firstOp), token), " && "), token), lastOp), String(e));
            }
            return _possibleConstructorReturn(this, (Interval.__proto__ || Object.getPrototypeOf(Interval)).call(this, token, expr));
        }

        return Interval;
    }(MathSet);

    /** todo 向量类 */
    // WARNING: %代表点积, *代表叉乘


    var Vector = function (_See3D$LibraryDefineO3) {
        _inherits(Vector, _See3D$LibraryDefineO3);

        function Vector(arr) {
            _classCallCheck(this, Vector);

            var _this4 = _possibleConstructorReturn(this, (Vector.__proto__ || Object.getPrototypeOf(Vector)).call(this, "Vector"));

            _this4.array = [];
            if (arr.type && _Op.equal(arr.type, "Vector")) {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = arr.array[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var _i2 = _step.value;
                        _this4.array.push(_i2);
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
            } else {
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = arr[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var _i3 = _step2.value;
                        _this4.array.push(_i3);
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
            }return _this4;
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
                var _iteratorNormalCompletion3 = true;
                var _didIteratorError3 = false;
                var _iteratorError3 = undefined;

                try {
                    for (var _iterator3 = this.array[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                        var i = _step3.value;

                        sum += _Op.pow(i, 2);
                    }
                } catch (err) {
                    _didIteratorError3 = true;
                    _iteratorError3 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion3 && _iterator3.return) {
                            _iterator3.return();
                        }
                    } finally {
                        if (_didIteratorError3) {
                            throw _iteratorError3;
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
                        for (var _i4 in this.array) {
                            v.push(_Op.add(this.array[_i4], b.array[_i4]));
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
                        for (var _i5 in this.array) {
                            v.push(_Op.sub(this.array[_i5], b.array[_i5]));
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
                    // 叉乘
                    if (_Op.equal(b.type, "Vector")) {
                        var a = new Matrix(this.length, 1, [this.array]);
                        var arr = [];
                        for (var _i6 = 0; _Op.less(_i6, b.length); _i6++) {
                            arr.push([b.array[_i6]]);
                        }
                        b = new Matrix(1, b.length, arr);
                        // console.log(a);
                        // console.log(b);
                        return _Op.mul(a, b);
                    }
                    if (_Op.equal(b.type, "Matrix")) {
                        var selfMatrix = new Matrix(this.length, 1, [this.array]);
                        // console.log(selfMatrix, b);
                        var res = _Op.mul(selfMatrix, b);
                        return new Vector(res.array[0]);
                    }
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
            key: "proj",
            value: function proj(u) {
                // 投影
                var v = this.norm();
                var n = _Op.mul(v, _Op.mod(u, v));
                return _Op.div(n, _Op.mul(v.mod(), v.mod()));
            }
        }, {
            key: "operatorEqual",
            value: function operatorEqual(b) {
                if (_Op.notEqual(b.length, this.length)) {
                    console.error(new Error("Error 100: Vector size does not match"));
                    return null;
                }
                for (var i = 0; _Op.less(i, this.length); i++) {
                    if (_Op.notEqual(b.array[i], this.array[i])) return false;
                }
                return true;
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

            if (x.type && _Op.equal(x.type, "Vector")) {
                ;

                var _this5 = _possibleConstructorReturn(this, (Vector2.__proto__ || Object.getPrototypeOf(Vector2)).call(this, x));
            } else {
                ;

                var _this5 = _possibleConstructorReturn(this, (Vector2.__proto__ || Object.getPrototypeOf(Vector2)).call(this, [x, y]));
            }return _possibleConstructorReturn(_this5);
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
        }], [{
            key: "Zero",
            value: function Zero() {
                return new Vector2();
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

            if (x.type && _Op.equal(x.type, "Vector")) {
                ;

                var _this6 = _possibleConstructorReturn(this, (Vector3.__proto__ || Object.getPrototypeOf(Vector3)).call(this, x));
            } else {
                ;

                var _this6 = _possibleConstructorReturn(this, (Vector3.__proto__ || Object.getPrototypeOf(Vector3)).call(this, [x, y, z]));
            }return _possibleConstructorReturn(_this6);
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
        }], [{
            key: "Zero",
            value: function Zero() {
                return new Vector3();
            }
            // operatorMul(b) {
            //     console.log(b);
            //     if (typeof b === "number") {
            //         let tmp = new Vector([]);
            //         tmp.array = tmp.array.concat(this.array);
            //         for (let i in this.array) {
            //             tmp.array[i] *= b;
            //         }
            //         return tmp;
            //     } else {
            //         // 叉乘
            //         // let m = new Matrix(3, 3, [
            //         //     [new Vector3(1, 0, 0), new Vector3(0, 1, 0), new Vector3(0, 0, 1)]
            //         // ]);
            //         let a = new Matrix(this.length, 1, [this.array]);
            //         console.log(a);
            //         return null;
            //     }
            // }

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

            if (x.type && _Op.equal(x.type, "Vector")) {
                ;

                var _this7 = _possibleConstructorReturn(this, (Vector4.__proto__ || Object.getPrototypeOf(Vector4)).call(this, x));
            } else {
                ;

                var _this7 = _possibleConstructorReturn(this, (Vector4.__proto__ || Object.getPrototypeOf(Vector4)).call(this, [x, y, z, w]));
            }return _possibleConstructorReturn(_this7);
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
        }], [{
            key: "Zero",
            value: function Zero() {
                return new Vector4();
            }
        }]);

        return Vector4;
    }(Vector);

    /** todo 矩阵类 */


    var Matrix = function (_See3D$LibraryDefineO4) {
        _inherits(Matrix, _See3D$LibraryDefineO4);

        function Matrix(w, h) {
            var fill = _Op.greater(arguments.length, 2) && arguments[2] !== undefined ? arguments[2] : 0;

            _classCallCheck(this, Matrix);

            var _this8 = _possibleConstructorReturn(this, (Matrix.__proto__ || Object.getPrototypeOf(Matrix)).call(this, "Matrix"));

            _this8.array = [];
            if (w.type && _Op.equal(w.type, "Matrix")) {
                // 复制构造函数
                _this8.__w = w.w;
                _this8.__h = w.h;
                for (var i = 0; _Op.less(i, _this8.__h); i++) {
                    _this8.array.push([]);
                    for (var j = 0; _Op.less(j, _this8.__w); j++) {
                        _this8.array[i].push(w.array[i][j]);
                    }
                }
            } else {
                _this8.__w = w;
                _this8.__h = h;
                for (var _i7 = 0; _Op.less(_i7, h); _i7++) {
                    _this8.array.push([]);
                    for (var _j = 0; _Op.less(_j, w); _j++) {
                        if (typeof fill === "number") _this8.array[_i7].push(fill);else _this8.array[_i7].push(fill[_i7][_j]);
                    }
                }
            }
            return _this8;
        }

        _createClass(Matrix, [{
            key: "T",
            value: function T() {
                var matrix = new Matrix(this.__h, this.__w);
                for (var i = 0; _Op.less(i, this.__w); i++) {
                    for (var j = 0; _Op.less(j, this.__h); j++) {
                        matrix.array[i][j] = this.array[j][i];
                    }
                }
                return matrix;
            }
        }, {
            key: "size",
            value: function size() {
                return new Vector2(this.__w, this.__h);
            }
        }, {
            key: "get",
            value: function get(i, j) {
                return this.array[i][j];
            }
        }, {
            key: "set",
            value: function set(i, j, v) {
                this.array[i][j] = v;
                return this;
            }
        }, {
            key: "operatorAdd",
            value: function operatorAdd(b) {
                // console.log(this.size() == b.size());
                if (_Op.notEqual(this.size(), b.size())) {
                    console.error(new Error("Error 100: Matrix size does not match"));
                    return null;
                }
                var c = new Matrix(this.w, this.h, this.array);
                for (var i = 0; _Op.less(i, this.h); i++) {
                    for (var j = 0; _Op.less(j, this.w); j++) {
                        c.array[i][j] += b.array[i][j];
                    }
                }
                return c;
            }
        }, {
            key: "operatorSub",
            value: function operatorSub(b) {
                // console.log(this.size() == b.size());
                if (_Op.notEqual(this.size(), b.size())) {
                    console.error(new Error("Error 100: Matrix size does not match"));
                    return null;
                }
                var c = new Matrix(this.w, this.h, this.array);
                for (var i = 0; _Op.less(i, this.h); i++) {
                    for (var j = 0; _Op.less(j, this.w); j++) {
                        c.array[i][j] -= b.array[i][j];
                    }
                }
                return c;
            }
        }, {
            key: "operatorMul",
            value: function operatorMul(b) {
                // console.log(this.size() == b.size());
                if (_Op.equal(typeof b === "undefined" ? "undefined" : _typeof(b), "object")) {
                    if (_Op.equal(b.type, "Matrix")) {
                        if (_Op.notEqual(this.w, b.h)) {
                            console.error(new Error("Error 100: Matrix size does not match"));
                            return null;
                        }
                        var _n = this.w;
                        var c = new Matrix(this.h, b.w, 0);
                        for (var i = 0; _Op.less(i, this.h); i++) {
                            for (var j = 0; _Op.less(j, b.w); j++) {
                                var sum = 0;
                                for (var k = 0; _Op.less(k, _n); k++) {
                                    sum += _Op.mul(this.array[i][k], b.array[k][j]);
                                }
                                c.array[i][j] = sum;
                            }
                        }
                        return c;
                    }
                    // if (b.type == "Vector") {
                    //
                    // }
                } else {
                    var _c = new Matrix(this.w, this.h, [].concat(this.array));
                    for (var _i8 = 0; _Op.less(_i8, this.h); _i8++) {
                        for (var _j2 = 0; _Op.less(_j2, this.w); _j2++) {
                            _c.array[_i8][_j2] *= b;
                        }
                    }
                    return _c;
                }
            }
        }, {
            key: "w",
            get: function get() {
                return this.__w;
            }
        }, {
            key: "h",
            get: function get() {
                return this.__h;
            }
        }], [{
            key: "identity",
            value: function identity(s) {
                var matrix = new Matrix(s, s);
                for (var i = 0; _Op.less(i, s); i++) {
                    matrix.array[i][i] = 1;
                }
                return matrix;
            }
        }, {
            key: "Zero",
            value: function Zero(w, h) {
                return new Matrix(w, h);
            }
        }, {
            key: "TransMove",
            value: function TransMove(d) {
                return new Matrix(4, 4, [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [d.x, d.y, d.z, 0]]);
            }
        }, {
            key: "TransMoveInverse",
            value: function TransMoveInverse(d) {
                return new Matrix(4, 4, [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [-d.x, -d.y, -d.z, 0]]);
            }
        }, {
            key: "TransScale",
            value: function TransScale(s) {
                return new Matrix(4, 4, [[s.x, 0, 0, 0], [0, s.y, 0, 0], [0, 0, s.z, 0], [0, 0, 0, 1]]);
            }
        }, {
            key: "TransScaleInverse",
            value: function TransScaleInverse(s) {
                return new Matrix(4, 4, [[_Op.div(1, s.x), 0, 0, 0], [0, _Op.div(1, s.y), 0, 0], [0, 0, _Op.div(1, s.z), 0], [0, 0, 0, 1]]);
            }
        }, {
            key: "TransRotate",
            value: function TransRotate(s) {
                var Mx = new Matrix(4, 4, [[1, 0, 0, 0], [0, Math.cos(s.x), Math.sin(s.x), 0], [0, -Math.sin(s.x), Math.cos(s.x), 0], [0, 0, 0, 1]]);
                var My = new Matrix(4, 4, [[Math.cos(s.y), 0, -Math.sin(s.y), 0], [0, 1, 0, 0], [Math.sin(s.y), 0, Math.cos(s.y), 0], [0, 0, 0, 1]]);
                var Mz = new Matrix(4, 4, [[Math.cos(s.z), Math.sin(s.z), 0, 0], [-Math.sin(s.z), Math.cos(s.z), 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]]);
                return _Op.mul(_Op.mul(Mx, My), Mz);
            }
        }, {
            key: "TransRotateInverse",
            value: function TransRotateInverse(s) {
                var Mx = new Matrix(4, 4, [[1, 0, 0, 0], [0, Math.cos(s.x), -Math.sin(s.x), 0], [0, Math.sin(s.x), Math.cos(s.x), 0], [0, 0, 0, 1]]);
                var My = new Matrix(4, 4, [[Math.cos(s.y), 0, Math.sin(s.y), 0], [0, 1, 0, 0], [-Math.sin(s.y), 0, Math.cos(s.y), 0], [0, 0, 0, 1]]);
                var Mz = new Matrix(4, 4, [[Math.cos(s.z), -Math.sin(s.z), 0, 0], [Math.sin(s.z), Math.cos(s.z), 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]]);
                return _Op.mul(_Op.mul(Mx, My), Mz);
            }
        }]);

        return Matrix;
    }(See3D.LibraryDefineObject);

    var Matrix2x2 = function (_Matrix) {
        _inherits(Matrix2x2, _Matrix);

        function Matrix2x2(fill) {
            _classCallCheck(this, Matrix2x2);

            return _possibleConstructorReturn(this, (Matrix2x2.__proto__ || Object.getPrototypeOf(Matrix2x2)).call(this, 2, 2, fill));
        }

        _createClass(Matrix2x2, [{
            key: "inverse",
            value: function inverse() {
                var tmp = _Op.div(1, this.det());
                var c = new Matrix2x2([[this.array[1][1], -this.array[0][1]], [-this.array[1][0], this.array[0][0]]]);
                c = _Op.mul(c, tmp);
                return c;
            }
        }, {
            key: "det",
            value: function det() {
                return _Op.add(_Op.mul(this.array[0][0], this.array[1][1]), _Op.mul(this.array[0][1], this.array[1][0]));
            }
        }]);

        return Matrix2x2;
    }(Matrix);

    /** todo 直线类 */
    // 表示方法: 参数化直线
    // 即: 起点, 终点, 方向
    // p(x, y, z) = p0 + v_ * t
    // t ∈ [-∞, +∞]


    var Parmline2D = function (_See3D$LibraryDefineO5) {
        _inherits(Parmline2D, _See3D$LibraryDefineO5);

        function Parmline2D(v0, v1) {
            _classCallCheck(this, Parmline2D);

            var _this10 = _possibleConstructorReturn(this, (Parmline2D.__proto__ || Object.getPrototypeOf(Parmline2D)).call(this, "Parmline"));

            _this10.p0 = new Vector2(v0);
            _this10.p1 = new Vector2(v1);
            _this10.v = new Vector2(_Op.sub(v1, v0));
            _this10.v_ = _this10.v.norm();
            return _this10;
        }

        return Parmline2D;
    }(See3D.LibraryDefineObject);

    var Parmline3D = function (_See3D$LibraryDefineO6) {
        _inherits(Parmline3D, _See3D$LibraryDefineO6);

        function Parmline3D(v0, v1) {
            _classCallCheck(this, Parmline3D);

            var _this11 = _possibleConstructorReturn(this, (Parmline3D.__proto__ || Object.getPrototypeOf(Parmline3D)).call(this, "Parmline"));

            _this11.p0 = new Vector3(v0);
            _this11.p1 = new Vector3(v1);
            _this11.v = new Vector3(_Op.sub(v1, v0));
            _this11.v_ = _this11.v.norm();
            return _this11;
        }

        return Parmline3D;
    }(See3D.LibraryDefineObject);

    /** todo 平面类 */
    // 表示方法: 点-法线形式
    // a * (x - x0) + b * (y - y0) + c * (z - z0) = 0
    // 或
    // a * x + b * y + c * z + (-a * x0 - b * y0 - c * z0) = 0


    var Plane3D = function (_See3D$LibraryDefineO7) {
        _inherits(Plane3D, _See3D$LibraryDefineO7);

        function Plane3D(n, p0) {
            _classCallCheck(this, Plane3D);

            var _this12 = _possibleConstructorReturn(this, (Plane3D.__proto__ || Object.getPrototypeOf(Plane3D)).call(this, "Plane"));

            _this12.n = new Vector3(n); // 法线向量
            _this12.p0 = new Vector3(p0); // 平面上一点
            return _this12;
        }

        return Plane3D;
    }(See3D.LibraryDefineObject);

    /** todo 平面分割3D空间, 判断点位于哪个半空间中, -1为负半空间, 0为平面上, 1为正半空间 */


    function PointPositionWithPlane(point, plane) {
        var a = plane.n.x,
            b = plane.n.y,
            c = plane.n.z;
        var hs = _Op.add(_Op.add(_Op.mul(a, _Op.sub(point.x, plane.p0.x)), _Op.mul(b, _Op.sub(point.y, plane.p0.y))), _Op.mul(c, _Op.sub(point.z, plane.p0.z)));
        if (_Op.greater(hs, 0)) return 1;
        if (_Op.less(hs, 0)) return -1;
        return 0;
    }

    /** todo 计算两参数化2D线段的交点 */
    function intersParmlines2D(pl1, pl2) {
        var p0 = pl1.p0;
        var p2 = pl2.p0;
        var a = p0.x,
            b = p0.y,
            c = p2.x,
            d = p2.y;
        var p0v = pl1.v;
        var p2v = pl2.v;
        var e = p0v.x,
            f = p0v.y,
            g = p2v.x,
            h = p2v.y;
        // console.log(a, b, c, d, e, f, g, h);
        var t1 = _Op.div(_Op.sub(_Op.mul(h, _Op.sub(c, a)), _Op.mul(g, _Op.sub(d, b))), _Op.sub(_Op.mul(h, e), _Op.mul(g, f)));
        // let t2 =
        //     (-c + a + e * t1)
        //     /
        //     g
        // ;
        var x = _Op.add(a, _Op.mul(e, t1));
        var y = _Op.add(b, _Op.mul(f, t1));
        return new Vector2(x, y);
    }
    /** todo 计算两参数化3D线段的交点 */
    function intersParmlines3D(pl1, pl2) {
        var p0 = pl1.p0;
        var p2 = pl2.p0;
        var a = p0.x,
            b = p0.y,
            c = p2.x,
            d = p2.y;
        var p0v = pl1.v;
        var p2v = pl2.v;
        var e = p0v.x,
            f = p0v.y,
            g = p2v.x,
            h = p2v.y;
        // console.log(a, b, c, d, e, f, g, h);
        var t1 = _Op.div(_Op.sub(_Op.mul(h, _Op.sub(c, a)), _Op.mul(g, _Op.sub(d, b))), _Op.sub(_Op.mul(h, e), _Op.mul(g, f)));
        // let t2 =
        //     (-c + a + e * t1)
        //     /
        //     g
        // ;
        var x = _Op.add(a, _Op.mul(e, t1));
        var y = _Op.add(b, _Op.mul(f, t1));
        var z = _Op.add(p0.z, _Op.mul(p0v.z, t1));
        return new Vector3(x, y, z);
    }

    var tInterval = new Interval("[0, 1]");

    /** todo 计算参数化直线与平面的交点 */
    function intersParmlinePlane(plane, parmline) {
        // console.log(parmline);
        var _parmline$p = parmline.p0,
            x0 = _parmline$p.x,
            y0 = _parmline$p.y,
            z0 = _parmline$p.z;
        var _parmline$v = parmline.v,
            vx = _parmline$v.x,
            vy = _parmline$v.y,
            vz = _parmline$v.z;
        var _plane$n = plane.n,
            a = _plane$n.x,
            b = _plane$n.y,
            c = _plane$n.z;

        var d = _Op.sub(_Op.sub(_Op.mul(-a, x0), _Op.mul(b, y0)), _Op.mul(c, z0));
        var t = _Op.div(-_Op.add(_Op.add(_Op.add(_Op.mul(a, x0), _Op.mul(b, y0)), _Op.mul(c, z0)), d), _Op.add(_Op.add(_Op.mul(a, vx), _Op.mul(b, vy)), _Op.mul(c, vz)));
        var x = _Op.mul(_Op.mul(x0, vx), t);
        var y = _Op.mul(_Op.mul(y0, vy), t);
        var z = _Op.mul(_Op.mul(z0, vz), t);
        return new Vector3(x, y, z);
    }
    /** todo 计算参数化线段与平面的交点 */
    function intersSegmentPlane(parmline, plane) {
        var _parmline$p2 = parmline.p0,
            x0 = _parmline$p2.x,
            y0 = _parmline$p2.y,
            z0 = _parmline$p2.z;
        var _parmline$v2 = parmline.v,
            vx = _parmline$v2.x,
            vy = _parmline$v2.y,
            vz = _parmline$v2.z;
        var _plane$n2 = plane.n,
            a = _plane$n2.x,
            b = _plane$n2.y,
            c = _plane$n2.z;

        var d = _Op.sub(_Op.sub(_Op.mul(-a, x0), _Op.mul(b, y0)), _Op.mul(c, z0));
        var t = _Op.div(-_Op.add(_Op.add(_Op.add(_Op.mul(a, x0), _Op.mul(b, y0)), _Op.mul(c, z0)), d), _Op.add(_Op.add(_Op.mul(a, vx), _Op.mul(b, vy)), _Op.mul(c, vz)));
        if (!tInterval.have(t)) return null;
        var x = _Op.mul(_Op.mul(x0, vx), t);
        var y = _Op.mul(_Op.mul(y0, vy), t);
        var z = _Op.mul(_Op.mul(z0, vz), t);
        return new Vector3(x, y, z);
    }

    /** todo 提供四元数类 */

    var Quaternion = function (_See3D$LibraryDefineO8) {
        _inherits(Quaternion, _See3D$LibraryDefineO8);

        function Quaternion() {
            var q0 = _Op.greater(arguments.length, 0) && arguments[0] !== undefined ? arguments[0] : 0;
            var q1 = _Op.greater(arguments.length, 1) && arguments[1] !== undefined ? arguments[1] : 0;
            var q2 = _Op.greater(arguments.length, 2) && arguments[2] !== undefined ? arguments[2] : 0;
            var q3 = _Op.greater(arguments.length, 3) && arguments[3] !== undefined ? arguments[3] : 0;

            _classCallCheck(this, Quaternion);

            var _this13 = _possibleConstructorReturn(this, (Quaternion.__proto__ || Object.getPrototypeOf(Quaternion)).call(this, "Quaternion"));

            _this13.q0 = q0;
            if (_Op.equal(typeof q0 === "undefined" ? "undefined" : _typeof(q0), "object") && _Op.equal(arguments.length, 1)) {
                // 复制构造函数
                var q = q0;
                _this13.q0 = q.q0;
                _this13.qv = new Vector3(q.qv);
            } else if (_Op.equal(arguments.length, 2)) {
                _this13.qv = new Vector3(q1);
            } else {
                _this13.qv = new Vector3(q1, q2, q3);
            }
            return _this13;
        }

        _createClass(Quaternion, [{
            key: "operatorAdd",
            value: function operatorAdd(b) {
                return new Quaternion(_Op.add(this.q0, b.q0), _Op.add(this.qv, b.qv));
            }
        }, {
            key: "operatorSub",
            value: function operatorSub(b) {
                return new Quaternion(_Op.sub(this.q0, b.q0), _Op.sub(this.qv, b.qv));
            }
        }, {
            key: "operatorMul",
            value: function operatorMul(q) {
                var p = this;
                // let a = p.q0 * q.qv;
                // let b = q.q0 * p.qv;
                // let c = p.qv * q.qv;
                var r = new Quaternion(_Op.sub(_Op.mul(p.q0, q.q0), _Op.mod(p.qv, q.qv)), _Op.add(_Op.add(_Op.mul(q.qv, p.q0), _Op.mul(p.qv, q.q0)), _Op.mul(p.qv, q.qv)));
                // console.log((p.q0 * q.qv + q.q0 * p.qv + p.qv * q.qv));
                return r;
            }
        }, {
            key: "operatorDiv",
            value: function operatorDiv(b) {
                if (_Op.equal(typeof b === "undefined" ? "undefined" : _typeof(b), "number")) {
                    var q = new Quaternion(this);
                    q.q0 /= b;
                    q.qv = _Op.div(q.qv, b);
                    return q;
                }
                if (_Op.equal(b.type, "Quaternion")) {
                    var b_ = b.reciprocal();
                    return _Op.mul(this, b_);
                }
                if (_Op.equal(typeof b === "undefined" ? "undefined" : _typeof(b), "object")) console.log(new Error(_Op.add(_Op.add("Error 102: Do not support ", b.type), " and vector for div operations")));else console.log(new Error(_Op.add(_Op.add("Error 102: Do not support ", typeof b === "undefined" ? "undefined" : _typeof(b)), " and vector for div operations")));
                return null;
            }
        }, {
            key: "inverse",
            value: function inverse() {
                // 加法逆元素
                return new Quaternion(-this.q0, -this.qv.x, -this.qv.y, -this.qv.z);
            }
        }, {
            key: "conjugate",
            value: function conjugate() {
                // 共轭四元数
                return new Quaternion(this.q0, -this.qv.x, -this.qv.y, -this.qv.z);
            }
        }, {
            key: "mod",
            value: function mod() {
                return Math.sqrt(_Op.add(_Op.add(_Op.add(_Op.mul(this.q0, this.q0), _Op.mul(this.qv.x, this.qv.x)), _Op.mul(this.qv.y, this.qv.y)), _Op.mul(this.qv.z, this.qv.z)));
            }
        }, {
            key: "mod2",
            value: function mod2() {
                // 范数平方
                return _Op.add(_Op.add(_Op.add(_Op.mul(this.q0, this.q0), _Op.mul(this.qv.x, this.qv.x)), _Op.mul(this.qv.y, this.qv.y)), _Op.mul(this.qv.z, this.qv.z));
            }
        }, {
            key: "norm",
            value: function norm() {
                return _Op.div(this, this.mod());
            }
        }, {
            key: "reciprocal",
            value: function reciprocal() {
                // 倒数
                return _Op.div(this.conjugate(), this.mod2());
            }
        }], [{
            key: "One",
            value: function One() {
                // 乘法恒等元
                return new Quaternion(1);
            }
        }, {
            key: "Zero",
            value: function Zero() {
                // 加法恒等元
                return new Quaternion();
            }
        }, {
            key: "RotateLine",
            value: function RotateLine(v, theta, type) {
                // type为true是顺时针, 否则为逆时针
                var V = new Quaternion(0, new Vector3(v));
                var q = new Quaternion(Math.cos(_Op.div(theta, 2)), _Op.mul(Math.sin(_Op.div(theta, 2)), V.qv));
                if (type) {
                    return _Op.mul(_Op.mul(q, V.qv), q.reciprocal());
                }
                return _Op.mul(_Op.mul(q.reciprocal(), V.qv), q);
            }
        }, {
            key: "RotateQuaternion",
            value: function RotateQuaternion(r) {
                var x = this.__Q_x_theta(r.x);
                var y = this.__Q_y_theta(r.y);
                var z = this.__Q_z_theta(r.z);
                return _Op.mul(_Op.mul(z.Q_z_theta, y.Q_y_theta), x.Q_x_theta);
            }
        }, {
            key: "__Q_x_theta",
            value: function __Q_x_theta(theta) {
                var Q_x_theta = new Quaternion(Math.cos(_Op.div(theta, 2)), Math.sin(_Op.div(theta, 2)), 0, 0);
                var q_theta = Math.cos(_Op.div(theta, 2)),
                    q_v = new Vector3(Math.sin(_Op.div(theta, 2)), 0, 0);
                return { Q_x_theta: Q_x_theta, q_theta: q_theta, q_v: q_v };
            }
        }, {
            key: "__Q_y_theta",
            value: function __Q_y_theta(theta) {
                var Q_y_theta = new Quaternion(Math.cos(_Op.div(theta, 2)), 0, Math.sin(_Op.div(theta, 2)), 0);
                var q_theta = Math.cos(_Op.div(theta, 2)),
                    q_v = new Vector3(0, Math.sin(_Op.div(theta, 2)), 0);
                return { Q_y_theta: Q_y_theta, q_theta: q_theta, q_v: q_v };
            }
        }, {
            key: "__Q_z_theta",
            value: function __Q_z_theta(theta) {
                var Q_z_theta = new Quaternion(Math.cos(_Op.div(theta, 2)), 0, 0, Math.sin(_Op.div(theta, 2)));
                var q_theta = Math.cos(_Op.div(theta, 2)),
                    q_v = new Vector3(0, 0, Math.sin(_Op.div(theta, 2)));
                return { Q_z_theta: Q_z_theta, q_theta: q_theta, q_v: q_v };
            }
        }]);

        return Quaternion;
    }(See3D.LibraryDefineObject);

    /** todo 提供2D极坐标类 */
    // 2D极坐标: x 代表 r, y 代表 theta


    var Polar2D = function (_Vector4) {
        _inherits(Polar2D, _Vector4);

        function Polar2D() {
            var r = _Op.greater(arguments.length, 0) && arguments[0] !== undefined ? arguments[0] : 0;
            var theta = _Op.greater(arguments.length, 1) && arguments[1] !== undefined ? arguments[1] : 0;

            _classCallCheck(this, Polar2D);

            return _possibleConstructorReturn(this, (Polar2D.__proto__ || Object.getPrototypeOf(Polar2D)).call(this, r, theta));
        }

        _createClass(Polar2D, [{
            key: "r",
            get: function get() {
                return this.get(0);
            },
            set: function set(n) {
                this.set(0, n);
                return n;
            }
        }, {
            key: "theta",
            get: function get() {
                return this.get(1);
            },
            set: function set(n) {
                this.set(1, n);
                return n;
            }
        }]);

        return Polar2D;
    }(Vector2);

    /** todo 提供3D柱面坐标类 */
    // 3D柱面坐标: x 代表 r, y 代表 theta, z 代表 z


    var Cylindrical3D = function (_Vector5) {
        _inherits(Cylindrical3D, _Vector5);

        function Cylindrical3D() {
            var r = _Op.greater(arguments.length, 0) && arguments[0] !== undefined ? arguments[0] : 0;
            var theta = _Op.greater(arguments.length, 1) && arguments[1] !== undefined ? arguments[1] : 0;
            var z = _Op.greater(arguments.length, 2) && arguments[2] !== undefined ? arguments[2] : 0;

            _classCallCheck(this, Cylindrical3D);

            return _possibleConstructorReturn(this, (Cylindrical3D.__proto__ || Object.getPrototypeOf(Cylindrical3D)).call(this, r, theta, z));
        }

        _createClass(Cylindrical3D, [{
            key: "r",
            get: function get() {
                return this.get(0);
            },
            set: function set(n) {
                this.set(0, n);
                return n;
            }
        }, {
            key: "theta",
            get: function get() {
                return this.get(1);
            },
            set: function set(n) {
                this.set(1, n);
                return n;
            }
        }]);

        return Cylindrical3D;
    }(Vector3);
    /** todo 提供3D球面坐标类 */
    // 3D球面坐标: x 代表 rho, y 代表 phi, z 代表 theta


    var Spherical3D = function (_Vector6) {
        _inherits(Spherical3D, _Vector6);

        function Spherical3D() {
            var rho = _Op.greater(arguments.length, 0) && arguments[0] !== undefined ? arguments[0] : 0;
            var phi = _Op.greater(arguments.length, 1) && arguments[1] !== undefined ? arguments[1] : 0;
            var theta = _Op.greater(arguments.length, 2) && arguments[2] !== undefined ? arguments[2] : 0;

            _classCallCheck(this, Spherical3D);

            return _possibleConstructorReturn(this, (Spherical3D.__proto__ || Object.getPrototypeOf(Spherical3D)).call(this, rho, phi, theta));
        }

        _createClass(Spherical3D, [{
            key: "rho",
            get: function get() {
                return this.get(0);
            },
            set: function set(n) {
                this.set(0, n);
                return n;
            }
        }, {
            key: "phi",
            get: function get() {
                return this.get(1);
            },
            set: function set(n) {
                this.set(1, n);
                return n;
            }
        }, {
            key: "theta",
            get: function get() {
                return this.get(2);
            },
            set: function set(n) {
                this.set(2, n);
                return n;
            }
        }]);

        return Spherical3D;
    }(Vector3);

    // 坐标转换
    /** todo 2D极坐标转2D笛卡尔坐标 */


    function polar2DToRect2D(polar) {
        return new Vector2(_Op.mul(polar.r, Math.cos(polar.theta)), _Op.mul(polar.r, Math.sin(polar.theta)));
    }
    /** todo 2D笛卡尔坐标转2D极坐标 */
    function rect2DToPolar2D(point) {
        var d = Math.atan(_Op.div(point.y, point.x));
        return new Polar2D(Math.sqrt(_Op.add(_Op.mul(point.x, point.x), _Op.mul(point.y, point.y))), String(d) === "NaN" ? 0 : d);
    }
    /** todo 3D柱面坐标转3D笛卡尔坐标 */
    function cylindrical3DToRect3D(cylindrical) {
        return new Vector3(_Op.mul(cylindrical.r, Math.cos(cylindrical.theta)), _Op.mul(cylindrical.r, Math.sin(cylindrical.theta)), cylindrical.z);
    }
    /** todo 3D笛卡尔坐标转3D柱面坐标 */
    function rect3DToCylindrical3D(point) {
        var d = Math.atan(_Op.div(point.y, point.x));
        return new Cylindrical3D(Math.sqrt(_Op.add(_Op.mul(point.x, point.x), _Op.mul(point.y, point.y))), String(d) === "NaN" ? 0 : d, point.z);
    }
    /** todo 3D球面坐标转3D笛卡尔坐标 */
    function spherical3DToRect3D(spherical) {
        return new Vector3(_Op.mul(_Op.mul(spherical.rho, Math.sin(spherical.phi)), Math.cos(spherical.theta)), _Op.mul(_Op.mul(spherical.rho, Math.sin(spherical.phi)), Math.sin(spherical.theta)), _Op.mul(spherical.rho, Math.cos(spherical.phi)));
    }
    /** todo 3D笛卡尔坐标转3D1球面坐标 */
    function rect3DToSpherical3D(point) {
        var d1 = Math.atan(_Op.div(point.y, point.x));
        var rho = Math.sqrt(_Op.add(_Op.add(_Op.mul(point.x, point.x), _Op.mul(point.y, point.y)), _Op.mul(point.z, point.z)));
        var d2 = Math.acos(_Op.div(point.z, rho));
        return new Spherical3D(rho, String(d1) === "NaN" ? 0 : d1, String(d2) === "NaN" ? 0 : d2);
    }

    // 在库中定义所有的接口
    lib.define("smallest", smallest);
    lib.define("smallestLen", smallestLen);
    lib.define("probably", probably);

    lib.define("Enum", Enum);
    lib.define("MathSet", MathSet);
    lib.define("Interval", Interval);

    lib.define("Vector", Vector);
    lib.define("Vector2", Vector2);
    lib.define("Polar2D", Polar2D);
    lib.define("Vector3", Vector3);
    lib.define("Vector4", Vector4);

    lib.define("Matrix", Matrix);
    lib.define("Matrix2x2", Matrix2x2);

    lib.define("Parmline2D", Parmline2D);
    lib.define("Parmline3D", Parmline3D);
    lib.define("Plane3D", Plane3D);
    lib.define("PointPositionWithPlane", PointPositionWithPlane);
    lib.define("intersParmlines2D", intersParmlines2D);
    lib.define("intersParmlines3D", intersParmlines3D);
    lib.define("intersParmlinePlane", intersParmlinePlane);
    lib.define("intersSegmentPlane", intersSegmentPlane);

    lib.define("Quaternion", Quaternion);

    lib.define("Polar2D", Polar2D);
    lib.define("Cylindrical3D", Cylindrical3D);
    lib.define("Spherical3D", Spherical3D);

    lib.define("polar2DToRect2D", polar2DToRect2D);
    lib.define("rect2DToPolar2D", rect2DToPolar2D);
    lib.define("cylindrical3DToRect3D", cylindrical3DToRect3D);
    lib.define("rect3DToCylindrical3D", rect3DToCylindrical3D);
    lib.define("spherical3DToRect3D", spherical3DToRect3D);
    lib.define("rect3DToSpherical3D", rect3DToSpherical3D);

    lib.trans(); // 在库的全局添加接口
    See3D.library(lib); // 将库加载入See3D中
    See3D.load("Math3D"); // 将库加入See3D的默认加载队列
    See3D.loadGlobal("Math3D"); // 将库加入浏览器全局
    lib.global(); // 将库API加入浏览器全局
    See3D.lib("Math3D");
    lib.toSee3D();
}(See3D);
//# sourceMappingURL=math.js.map