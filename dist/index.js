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
        this.loadGlobal();
        this.bindLibrary("IO");
        this.bindLibrary("Math3D");
        this.sout = new See3D.IO.$sostream(this);
    }

    _createClass(See3D, [{
        key: "width",
        value: function width(w) {
            if (w === void 0) {
                return this.__dom.width;
            }
            this.__dom.width = w;
            return this;
        }
    }, {
        key: "height",
        value: function height(w) {
            if (w === void 0) {
                return this.__dom.height;
            }
            this.__dom.height = w;
            return this;
        }
    }, {
        key: "full",
        value: function full() {
            this.width(window.innerWidth).height(window.innerHeight);
            return this;
        }
        /**
         * @function loadGlobal
         * @desc 将所有全局库加载入该See3D实例
         */

    }, {
        key: "loadGlobal",
        value: function loadGlobal() {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = See3D.__loads[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var i = _step.value;

                    this.load(i);
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

            return this;
        }
    }, {
        key: "bindLibrary",
        value: function bindLibrary(name) {
            // 将该库的所有API加入该See3D实例
            var lib = this[name];
            for (var i in lib.defines) {
                this[i] = lib.defines[i];
            }
        }
        /**
         * @function load
         * @param {string} name
         * @desc 加载指定库到See3D对象中
         */

    }, {
        key: "load",
        value: function load(name) {
            this[name] = See3D.__libraries.get(name);
            return this;
        }
    }, {
        key: "dom",
        get: function get() {
            return this.__dom;
        }
    }, {
        key: "ctx",
        get: function get() {
            return this.__ctx;
        }
        /**
         * @function library
         * @param {See3D.Library} entry
         * @desc 添加See3D库
         */

    }], [{
        key: "library",
        value: function library(entry) {
            // entry
            See3D.__libraries.set(entry.name, entry);
        }
        /**
         * @function load
         * @param {String} name
         * @desc 添加应默认自带的库
         */

    }, {
        key: "load",
        value: function load(name) {
            See3D.__loads.push(name);
        }
        /**
         * @function loadGlobal
         * @param {String} name
         * @desc 将该库导入到全局环境
         */

    }, {
        key: "loadGlobal",
        value: function loadGlobal(name) {
            globalThis[name] = See3D.__libraries.get(name);
        }
    }, {
        key: "lib",
        value: function lib(name) {
            See3D[name] = See3D.__libraries.get(name);
            return See3D.__libraries.get(name);
        }
    }]);

    return See3D;
}();

!function () {
    See3D.version = "v0.0.1";
    console.log("See3D engine (" + See3D.version + ") launched");
    See3D.DEBUG = true;
    /**
     * @property
     * @private
     */
    See3D.__libraries = new Map();
    /**
     * @property
     * @private
     */
    See3D.__loads = [];

    /**
     * @class Library
     * @constructor
     * @desc Library类提供了制作See3D类的接口
     */

    var Library = function () {
        function Library(name) {
            _classCallCheck(this, Library);

            this.name = name;
            this.defines = {};
        }

        _createClass(Library, [{
            key: "define",
            value: function define(name, val) {
                this.defines[name] = val;
                return this;
            }
        }, {
            key: "get",
            value: function get(name) {
                if (this.defines[name].private) {
                    console.error(new Error("Error 201: It's a private value"));
                }
                return this.defines[name];
            }
        }, {
            key: "trans",
            value: function trans() {
                for (var i in this.defines) {
                    this["$" + i] = this.defines[i];
                }
            }
        }, {
            key: "global",
            value: function global() {
                for (var i in this.defines) {
                    globalThis[i] = this.defines[i];
                }
            }
        }]);

        return Library;
    }();
    // 所有的See3D库类接口都必须继承自该类


    var LibraryDefineObject = function () {
        function LibraryDefineObject(type) {
            _classCallCheck(this, LibraryDefineObject);

            this.type = type;
        }

        _createClass(LibraryDefineObject, [{
            key: "transType",
            value: function transType() {
                return null;
            }
        }]);

        return LibraryDefineObject;
    }();

    function checkType(obj, type) {
        return obj.type == type;
    }
    function translate(type, obj) {
        return obj.transType(type);
    }
    See3D.Library = Library;
    See3D.LibraryDefineObject = LibraryDefineObject;
    See3D.checkType = checkType;
    See3D.translate = translate;
}();
//# sourceMappingURL=index.js.map