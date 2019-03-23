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

    /** todo 向量类 */


    var Vector = function (_See3D$LibraryDefineO2) {
        _inherits(Vector, _See3D$LibraryDefineO2);

        function Vector(arr) {
            _classCallCheck(this, Vector);

            var _this2 = _possibleConstructorReturn(this, (Vector.__proto__ || Object.getPrototypeOf(Vector)).call(this, "Vector"));

            _this2.array = [];
            if (arr.type && _Op.equal(arr.type, "Vector")) {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = arr.array[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var _i = _step.value;
                        _this2.array.push(_i);
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
                        var _i2 = _step2.value;
                        _this2.array.push(_i2);
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
            }return _this2;
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
                        for (var _i3 in this.array) {
                            v.push(_Op.add(this.array[_i3], b.array[_i3]));
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
                        for (var _i4 in this.array) {
                            v.push(_Op.sub(this.array[_i4], b.array[_i4]));
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
                    // console.error(new Error("Error 102: Do not support scalar and vector for dot div operations"));
                    var a = new Matrix(this.length, 1, [this.array]);
                    var arr = [];
                    for (var _i5 = 0; _Op.less(_i5, b.length); _i5++) {
                        arr.push([b.array[_i5]]);
                    }
                    b = new Matrix(1, b.length, arr);
                    // console.log(a);
                    // console.log(b);
                    return _Op.mul(a, b);
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

                var _this3 = _possibleConstructorReturn(this, (Vector2.__proto__ || Object.getPrototypeOf(Vector2)).call(this, x));
            } else {
                ;

                var _this3 = _possibleConstructorReturn(this, (Vector2.__proto__ || Object.getPrototypeOf(Vector2)).call(this, [x, y]));
            }return _possibleConstructorReturn(_this3);
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

                var _this4 = _possibleConstructorReturn(this, (Vector3.__proto__ || Object.getPrototypeOf(Vector3)).call(this, x));
            } else {
                ;

                var _this4 = _possibleConstructorReturn(this, (Vector3.__proto__ || Object.getPrototypeOf(Vector3)).call(this, [x, y, z]));
            }return _possibleConstructorReturn(_this4);
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

                var _this5 = _possibleConstructorReturn(this, (Vector4.__proto__ || Object.getPrototypeOf(Vector4)).call(this, x));
            } else {
                ;

                var _this5 = _possibleConstructorReturn(this, (Vector4.__proto__ || Object.getPrototypeOf(Vector4)).call(this, [x, y, z, w]));
            }return _possibleConstructorReturn(_this5);
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


    var Matrix = function (_See3D$LibraryDefineO3) {
        _inherits(Matrix, _See3D$LibraryDefineO3);

        function Matrix(w, h) {
            var fill = _Op.greater(arguments.length, 2) && arguments[2] !== undefined ? arguments[2] : 0;

            _classCallCheck(this, Matrix);

            var _this6 = _possibleConstructorReturn(this, (Matrix.__proto__ || Object.getPrototypeOf(Matrix)).call(this, "Matrix"));

            _this6.array = [];
            if (w.type && _Op.equal(w.type, "Matrix")) {
                // 复制构造函数
                _this6.__w = w.w;
                _this6.__h = w.h;
                for (var i = 0; _Op.less(i, _this6.__h); i++) {
                    _this6.array.push([]);
                    for (var j = 0; _Op.less(j, _this6.__w); j++) {
                        _this6.array[i].push(w.array[i][j]);
                    }
                }
            } else {
                _this6.__w = w;
                _this6.__h = h;
                for (var _i6 = 0; _Op.less(_i6, h); _i6++) {
                    _this6.array.push([]);
                    for (var _j = 0; _Op.less(_j, w); _j++) {
                        if (typeof fill === "number") _this6.array[_i6].push(fill);else _this6.array[_i6].push(fill[_i6][_j]);
                    }
                }
            }
            return _this6;
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
                } else {
                    var _c = new Matrix(this.w, this.h, [].concat(this.array));
                    for (var _i7 = 0; _Op.less(_i7, this.h); _i7++) {
                        for (var _j2 = 0; _Op.less(_j2, this.w); _j2++) {
                            _c.array[_i7][_j2] *= b;
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


    var Parmline2D = function (_See3D$LibraryDefineO4) {
        _inherits(Parmline2D, _See3D$LibraryDefineO4);

        function Parmline2D(v0, v1) {
            _classCallCheck(this, Parmline2D);

            var _this8 = _possibleConstructorReturn(this, (Parmline2D.__proto__ || Object.getPrototypeOf(Parmline2D)).call(this, "Parmline"));

            _this8.p0 = new Vector2(v0);
            _this8.p1 = new Vector2(v1);
            _this8.v = new Vector2(_Op.sub(v1, v0));
            _this8.v_ = _this8.v.norm();
            return _this8;
        }

        return Parmline2D;
    }(See3D.LibraryDefineObject);

    var Parmline3D = function (_See3D$LibraryDefineO5) {
        _inherits(Parmline3D, _See3D$LibraryDefineO5);

        function Parmline3D(v0, v1) {
            _classCallCheck(this, Parmline3D);

            var _this9 = _possibleConstructorReturn(this, (Parmline3D.__proto__ || Object.getPrototypeOf(Parmline3D)).call(this, "Parmline"));

            _this9.p0 = new Vector3(v0);
            _this9.p1 = new Vector3(v1);
            _this9.v = new Vector3(_Op.sub(v1, v0));
            _this9.v_ = _this9.v.norm();
            return _this9;
        }

        return Parmline3D;
    }(See3D.LibraryDefineObject);

    /** todo 平面类 */
    // 表示方法: 点-法线形式
    // a * (x - x0) + b * (y - y0) + c * (z - z0) = 0
    // 或
    // a * x + b * y + c * z + (-a * x0 - b * y0 - c * z0) = 0


    var Plane3D = function (_See3D$LibraryDefineO6) {
        _inherits(Plane3D, _See3D$LibraryDefineO6);

        function Plane3D(n, p0) {
            _classCallCheck(this, Plane3D);

            var _this10 = _possibleConstructorReturn(this, (Plane3D.__proto__ || Object.getPrototypeOf(Plane3D)).call(this, "Plane"));

            _this10.n = new Vector3(n); // 法线向量
            _this10.p0 = new Vector3(p0); // 平面上一点
            return _this10;
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
    function intersPoints2D(pl1, pl2) {
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
    function intersPoints3D(pl1, pl2) {
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

    // 在库中定义所有的接口
    lib.define("smallest", smallest);
    lib.define("smallestLen", smallestLen);
    lib.define("probably", probably);

    lib.define("Enum", Enum);

    lib.define("Vector", Vector);
    lib.define("Vector2", Vector2);
    lib.define("Vector3", Vector3);
    lib.define("Vector4", Vector4);

    lib.define("Matrix", Matrix);
    lib.define("Matrix2x2", Matrix2x2);

    lib.define("Parmline2D", Parmline2D);
    lib.define("Parmline3D", Parmline3D);
    lib.define("Plane3D", Plane3D);
    lib.define("PointPositionWithPlane", PointPositionWithPlane);
    lib.define("intersPoints2D", intersPoints2D);
    lib.define("intersPoints3D", intersPoints3D);

    lib.trans(); // 在库的全局添加接口
    See3D.library(lib); // 将库加载入See3D中
    See3D.load("Math3D"); // 将库加入See3D的默认加载队列
    if (See3D.DEBUG) See3D.loadGlobal("Math3D");
    if (See3D.DEBUG) lib.global();
    See3D.lib("Math3D");
}();
//# sourceMappingURL=math.js.map