"use strict";
'bpo enable';

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
    var lib = new See3D.Library("View");

    var Item = function (_See3D$LibraryDefineO) {
        _inherits(Item, _See3D$LibraryDefineO);

        function Item() {
            var p = _Op.greater(arguments.length, 0) && arguments[0] !== undefined ? arguments[0] : See3D.Vector3.Zero();
            var r = _Op.greater(arguments.length, 1) && arguments[1] !== undefined ? arguments[1] : See3D.Vector3.Zero();

            _classCallCheck(this, Item);

            var _this = _possibleConstructorReturn(this, (Item.__proto__ || Object.getPrototypeOf(Item)).call(this, "Item"));

            _this.position = p;
            _this.rotation = r;
            return _this;
        }

        _createClass(Item, [{
            key: "move",
            value: function move(d) {
                var tmp = new Vector(this.position);
                tmp.push(1);
                var res = _Op.mul(tmp, See3D.Matrix.TransMove(d));
                this.position = new Vector3(res.get(0), res.get(1), res.get(2));
                // console.log(this.position);
            }
        }, {
            key: "rotate",
            value: function rotate(r) {
                this.rotation = new Vector3(_Op.add(this.rotation.get(0), r.get(0)), _Op.add(this.rotation.get(1), r.get(1)), _Op.add(this.rotation.get(2), r.get(2)));
            }
        }]);

        return Item;
    }(See3D.LibraryDefineObject);

    var Scene = function (_See3D$LibraryDefineO2) {
        _inherits(Scene, _See3D$LibraryDefineO2);

        function Scene(name, game) {
            _classCallCheck(this, Scene);

            var _this2 = _possibleConstructorReturn(this, (Scene.__proto__ || Object.getPrototypeOf(Scene)).call(this, "Scene"));

            _this2.game = game;
            _this2.items = [];
            _this2.cameras = {};
            _this2.use = null;
            _this2.__name = name;
            return _this2;
        }

        _createClass(Scene, [{
            key: "push",
            value: function push(item) {
                if (_Op.equal(item.type, "Camera")) {
                    var c = item;
                    this.cameras[c.name] = c;
                    if (!this.use) this.use = c;
                } else {
                    this.items.push(item);
                }
                return this;
            }
        }, {
            key: "camera",
            value: function camera(cn) {
                this.use = this.cameras[cn];
                return this;
            }
        }, {
            key: "render",
            value: function render() {
                if (this.use) {
                    this.use.render();
                } else {
                    this.noView();
                }
                return this;
            }
        }, {
            key: "noView",
            value: function noView() {
                this.game.noView();
                return this;
            }
        }, {
            key: "name",
            get: function get() {
                return this.__name;
            }
        }, {
            key: "ctx",
            get: function get() {
                return this.game.ctx;
            }
        }, {
            key: "dom",
            get: function get() {
                return this.game.dom;
            }
        }]);

        return Scene;
    }(See3D.LibraryDefineObject);

    var Camera = function (_Item) {
        _inherits(Camera, _Item);

        function Camera(p, r, name, scene) {
            _classCallCheck(this, Camera);

            var _this3 = _possibleConstructorReturn(this, (Camera.__proto__ || Object.getPrototypeOf(Camera)).call(this, p, r));

            _this3.type = "Camera";
            _this3.scene = scene;
            _this3.__name = name;
            return _this3;
        }

        _createClass(Camera, [{
            key: "render",
            value: function render() {
                var items = this.scene.items;
                var ctx = this.scene.ctx;
                var _scene$dom = this.scene.dom,
                    sw = _scene$dom.width,
                    sh = _scene$dom.height;
                var _See3D = See3D,
                    FOV_x = _See3D.FOV_x,
                    FOV_y = _See3D.FOV_y;

                var itemPoints = [];
                var move = See3D.Matrix.TransMoveInverse(this.position);
                var rotate = See3D.Matrix.TransRotate(new See3D.Vector3(-this.rotation.x, -this.rotation.y, -this.rotation.z));
                var trans = _Op.mul(move, rotate);
                var d = Math.max(_Op.div(_Op.div(sw, 100), _Op.mul(2, Math.tan(_Op.div(FOV_x, 2)))), _Op.div(_Op.div(sh, 100), _Op.mul(2, Math.tan(_Op.div(FOV_y, 2)))));
                var near_d = 0.1;
                var far_d = 1000;
                // console.log(d);
                // console.log("update");
                for (var i = 0; _Op.less(i, items.length); i++) {
                    var p = new See3D.Vector3(items[i].position);
                    p.array.push(1);
                    itemPoints.push(_Op.mul(p, trans));
                }
                // console.log(itemPoints);
                for (var _i = 0; _Op.less(_i, itemPoints.length); _i++) {
                    // console.log(itemPoints[i].get(2));
                    if (_Op.less(itemPoints[_i].get(2), near_d) || _Op.greater(itemPoints[_i].get(2), far_d)) continue; // 超出远近裁面
                    // console.log(itemPoints[i]);
                    if (_Op.equal(items[_i].type, "Point")) {
                        var screenPos = new See3D.Vector2(_Op.mul(_Op.div(_Op.mul(itemPoints[_i].get(0), d), itemPoints[_i].get(2)), 100), _Op.mul(_Op.div(_Op.mul(-itemPoints[_i].get(1), d), itemPoints[_i].get(2)), 100));
                        ctx.beginPath();
                        ctx.arc(screenPos.x, screenPos.y, items[_i].r, 0, _Op.mul(Math.PI, 2));
                        ctx.fillStyle = "#fff";
                        ctx.fill();
                        ctx.closePath();
                    }
                    // console.log(screenPos);
                }
                return this;
            }
        }, {
            key: "name",
            get: function get() {
                return this.__name;
            }
        }]);

        return Camera;
    }(Item);

    var ITEM_CONFIG = {
        "Cube": {
            "Points": [[1, 1, 1], [1, 1, -1], [1, -1, 1], [1, -1, -1], [-1, 1, 1], [-1, 1, -1], [-1, -1, 1], [-1, -1, -1]],
            "Planes": [{
                "n": [1, 0, 0],
                "p0": [1, 0, 0]
            }, {
                "n": [-1, 0, 0],
                "p0": [-1, 0, 0]
            }, {
                "n": [0, 1, 0],
                "p0": [0, 1, 0]
            }, {
                "n": [0, -1, 0],
                "p0": [0, -1, 0]
            }, {
                "n": [0, 0, 1],
                "p0": [0, 0, 1]
            }, {
                "n": [0, 0, -1],
                "p0": [0, 0, -1]
            }]
        }
    };

    var entity = function (_Item2) {
        _inherits(entity, _Item2);

        function entity(type, p, r, s) {
            var withItemConfig = _Op.greater(arguments.length, 4) && arguments[4] !== undefined ? arguments[4] : true;

            _classCallCheck(this, entity);

            var _this4 = _possibleConstructorReturn(this, (entity.__proto__ || Object.getPrototypeOf(entity)).call(this, p, r));

            _this4.type = type;
            _this4.planes = [];
            _this4.points = [];
            _this4.s = s;
            if (withItemConfig) {
                _this4.load();
            }
            return _this4;
        }

        _createClass(entity, [{
            key: "load",
            value: function load() {
                var config = ITEM_CONFIG[this.type];
                for (var i = 0; _Op.less(i, config["Points"].length); i++) {
                    this.points.push(new (Function.prototype.bind.apply(See3D.Vector3, [null].concat(_toConsumableArray(config["Points"][i]))))());
                }
                for (var _i2 = 0; _Op.less(_i2, config["Planes"].length); _i2++) {
                    var arrN = config["Planes"][_i2]["n"];
                    var arrP0 = config["Planes"][_i2]["p0"];
                    arrN[0] *= this.s.get(0);
                    arrN[1] *= this.s.get(1);
                    arrN[2] *= this.s.get(2);
                    arrP0[0] *= this.s.get(0);
                    arrP0[1] *= this.s.get(1);
                    arrP0[2] *= this.s.get(2);
                    this.planes.push(new See3D.Plane3D(new (Function.prototype.bind.apply(Vector3, [null].concat(_toConsumableArray(arrN))))(), new (Function.prototype.bind.apply(Vector3, [null].concat(_toConsumableArray(arrP0))))()));
                }
            }
        }]);

        return entity;
    }(Item);

    var Point = function (_entity) {
        _inherits(Point, _entity);

        function Point() {
            var p = _Op.greater(arguments.length, 0) && arguments[0] !== undefined ? arguments[0] : See3D.Vector3.Zero();
            var size = _Op.greater(arguments.length, 1) && arguments[1] !== undefined ? arguments[1] : 10;

            _classCallCheck(this, Point);

            var _this5 = _possibleConstructorReturn(this, (Point.__proto__ || Object.getPrototypeOf(Point)).call(this, "Point", p, null, See3D.Vector3.Zero(), false));

            _this5.r = size;
            return _this5;
        }

        return Point;
    }(entity);

    var Cube = function (_entity2) {
        _inherits(Cube, _entity2);

        function Cube() {
            var p = _Op.greater(arguments.length, 0) && arguments[0] !== undefined ? arguments[0] : See3D.Vector3.Zero();
            var r = _Op.greater(arguments.length, 1) && arguments[1] !== undefined ? arguments[1] : See3D.Vector3.Zero();
            var s = _Op.greater(arguments.length, 2) && arguments[2] !== undefined ? arguments[2] : new See3D.Vector3(1, 1, 1);

            _classCallCheck(this, Cube);

            return _possibleConstructorReturn(this, (Cube.__proto__ || Object.getPrototypeOf(Cube)).call(this, "Cube", p, r, s));
        }

        return Cube;
    }(entity);

    lib.define("Item", Item); // virtual

    lib.define("Scene", Scene);
    lib.define("Camera", Camera); // renderer

    lib.define("entity", entity); // virtual

    lib.define("ITEM_CONFIG", ITEM_CONFIG);
    lib.define("Point", Point);
    lib.define("Cube", Cube);

    lib.trans();
    See3D.library(lib);
    See3D.load("View");
    if (See3D.DEBUG) {
        See3D.loadGlobal("Math3D"); // 将库加入浏览器全局
        lib.global(); // 将库API加入浏览器全局
    }
    See3D.lib("View");
    lib.toSee3D();
}();
//# sourceMappingURL=item.js.map