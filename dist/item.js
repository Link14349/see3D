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
    var lib = new See3D.Library("View");

    var Item = function (_See3D$LibraryDefineO) {
        _inherits(Item, _See3D$LibraryDefineO);

        function Item() {
            var p = _Op.greater(arguments.length, 0) && arguments[0] !== undefined ? arguments[0] : Vector3.Zero();
            var r = _Op.greater(arguments.length, 1) && arguments[1] !== undefined ? arguments[1] : Vector3.Zero();

            _classCallCheck(this, Item);

            var _this = _possibleConstructorReturn(this, (Item.__proto__ || Object.getPrototypeOf(Item)).call(this, "Item"));

            _this.position = p;
            _this.rotation = r;
            return _this;
        }

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
                var itemPoints = [];
                var move = See3D.Matrix.TransMoveInverse(this.position);
                // console.log("update");
                for (var i = 0; _Op.less(i, items.length); i++) {
                    var p = items[i].position;
                    p.array.push(1);
                    itemPoints.push(_Op.mul(p, move));
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

    var entity = function (_Item2) {
        _inherits(entity, _Item2);

        function entity(p, r, planes) {
            _classCallCheck(this, entity);

            var _this4 = _possibleConstructorReturn(this, (entity.__proto__ || Object.getPrototypeOf(entity)).call(this, p, r));

            _this4.planes = planes;
            return _this4;
        }

        return entity;
    }(Item);

    var Point = function (_entity) {
        _inherits(Point, _entity);

        function Point() {
            var p = _Op.greater(arguments.length, 0) && arguments[0] !== undefined ? arguments[0] : Vector3.Zero();
            var size = _Op.greater(arguments.length, 1) && arguments[1] !== undefined ? arguments[1] : 10;

            _classCallCheck(this, Point);

            var _this5 = _possibleConstructorReturn(this, (Point.__proto__ || Object.getPrototypeOf(Point)).call(this, p, Vector3.Zero()));

            _this5.type = "Point";
            _this5.r = size;
            return _this5;
        }

        return Point;
    }(entity);
    // class PlaneView extends Item {
    //     constructor(p = Vector3.Zero(), r = Vector3.Zero(), points = [], bind) {
    //         super(p, r);
    //         this.points = points;
    //         this.bind = bind;
    //     }
    //     trans() {
    //         let points = [];
    //         for (let i = 0; i < this.points.length; i++) {
    //             points.push(new Vector3(this.points[i].x + this.bind.x, this.points[i].y + this.bind.y, this.points[i].z + this.bind.z));
    //         }
    //         return points;
    //     }
    // }
    //
    // let ITEM_CONFIG = {
    //     "classes": {
    //         "Cube": {
    //             planes: [
    //             ]
    //         }
    //     }
    // };
    //
    // class Cube extends entity {
    //     constructor(p, s) {
    //         let planes = [];
    //         super(p, Vector3.Zero(), [
    //             new PlaneView(new Vector3(p.x + s.x, p.y, p.z), Vector3.Zero(), [
    //                 new Vector3(p.x + s.x, p.y + s.y, p.z + s.z),
    //                 new Vector3(p.x + s.x, p.y + s.y, p.z - s.z),
    //                 new Vector3(p.x + s.x, p.y - s.y, p.z - s.z),
    //                 new Vector3(p.x + s.x, p.y - s.y, p.z + s.z),
    //                 new Vector3(p.x + s.x, p.y + s.y, p.z + s.z),
    //             ]),
    //             new PlaneView(new Vector3(p.x, p.y + s.y, p.z), Vector3.Zero(), [
    //                 new Vector3(p.x - s.x, p.y + s.y, p.z - s.z),
    //                 new Vector3(p.x - s.x, p.y + s.y, p.z + s.z),
    //                 new Vector3(p.x + s.x, p.y + s.y, p.z + s.z),
    //                 new Vector3(p.x + s.x, p.y + s.y, p.z - s.z),
    //                 new Vector3(p.x - s.x, p.y + s.y, p.z - s.z),
    //             ]),
    //             new PlaneView(new Vector3(p.x, p.y, p.z - s.z), Vector3.Zero(), [
    //                 new Vector3(p.x - s.x, p.y + s.y, p.z - s.z),
    //                 new Vector3(p.x + s.x, p.y + s.y, p.z - s.z),
    //                 new Vector3(p.x + s.x, p.y - s.y, p.z - s.z),
    //                 new Vector3(p.x - s.x, p.y - s.y, p.z - s.z),
    //                 new Vector3(p.x + s.x, p.y + s.y, p.z - s.z),
    //             ]),
    //         ]);
    //     }
    // }

    lib.define("Item", Item); // virtual

    lib.define("Scene", Scene);
    lib.define("Camera", Camera); // renderer

    lib.define("entity", entity); // virtual

    lib.define("Point", Point);

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