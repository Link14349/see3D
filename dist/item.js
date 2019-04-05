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

            _classCallCheck(this, Item);

            var _this = _possibleConstructorReturn(this, (Item.__proto__ || Object.getPrototypeOf(Item)).call(this, "Item"));

            _this.position = p;
            _this.rotation = See3D.Vector3.Zero();
            // console.log(r);
            // this.rotate(r);
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
                return this;
            }
        }, {
            key: "rotate",
            value: function rotate(r) {
                this.rotation = new Vector3(_Op.add(this.rotation.get(0), r.get(0)), _Op.add(this.rotation.get(1), r.get(1)), _Op.add(this.rotation.get(2), r.get(2)));
                return this;
            }
        }, {
            key: "left",
            value: function left(d) {
                var r = this.rotation;
                var rotation = See3D.Matrix.TransRotate(new Vector3(-r.get(0), -r.get(1), -r.get(2)));
                var pos = new Vector4(d, 0, 0);
                var p = _Op.mul(pos, rotation);
                this.position.x -= p.x;
                this.position.y += p.y;
                this.position.z += p.z;
                return this;
            }
        }, {
            key: "right",
            value: function right(d) {
                return this.left(-d);
            }
        }, {
            key: "forward",
            value: function forward(d) {
                var r = this.rotation;
                var rotation = See3D.Matrix.TransRotate(new Vector3(-r.get(0), -r.get(1), -r.get(2)));
                var pos = new Vector4(0, 0, d);
                var p = _Op.mul(pos, rotation);
                this.position.x -= p.x;
                this.position.y -= p.y;
                this.position.z += p.z;
                return this;
            }
        }, {
            key: "back",
            value: function back(d) {
                return this.forward(-d);
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

        function Camera(p, name, scene) {
            _classCallCheck(this, Camera);

            var _this3 = _possibleConstructorReturn(this, (Camera.__proto__ || Object.getPrototypeOf(Camera)).call(this, p));

            _this3.type = "Camera";
            _this3.scene = scene;
            _this3.__name = name;
            _this3.d = 0;
            return _this3;
        }

        _createClass(Camera, [{
            key: "render",
            value: function render() {
                // console.log("a");
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
                this.d = d;
                var near_d = 0.1;
                var far_d = 1000;
                items.sort(function (x, y) {
                    var a = x.position,
                        b = y.position;
                    var ar = _Op.add(_Op.add(_Op.mul(a.x, a.x), _Op.mul(a.y, a.y)), _Op.mul(a.z, a.z));
                    var br = _Op.add(_Op.add(_Op.mul(b.x, b.x), _Op.mul(b.y, b.y)), _Op.mul(b.z, b.z));
                    if (_Op.greater(ar, br)) return 1;
                    if (_Op.less(ar, br)) return -1;
                    return 0;
                });
                // console.log(d);
                // console.log("update");
                for (var i = 0; _Op.less(i, items.length); i++) {
                    if (_Op.equal(items[i].type, "Point")) {
                        var p = new See3D.Vector3(items[i].position);
                        p.array.push(1);
                        itemPoints.push(_Op.mul(p, trans));
                    } else {
                        itemPoints.push([[], [], _Op.mul(new See3D.Vector4(items[i].position.x, items[i].position.y, items[i].position.z, 1), trans)]);
                        // console.log(items[i].points);
                        for (var j = 0; _Op.less(j, items[i].points.length); j++) {
                            var _p = _Op.add(items[i].points[j], items[i].position);
                            _p.array.push(1);
                            itemPoints[_Op.sub(itemPoints.length, 1)][0].push(_Op.mul(_p, trans));
                        }
                        for (var _j = 0; _Op.less(_j, items[i].planes.length); _j++) {
                            var _p2 = _Op.add(items[i].planes[_j].p0, items[i].position);
                            _p2.array.push(1);
                            itemPoints[_Op.sub(itemPoints.length, 1)][1].push(new See3D.Plane3D(items[i].planes[_j].n, _Op.mul(_p2, trans)));
                        }
                        // console.log(itemPoints[itemPoints.length - 1]);
                    }
                    // if (items[i].type == "Cube")
                    //     console.log(p * trans);
                }
                // console.log(itemPoints);
                for (var _i = 0; _Op.less(_i, itemPoints.length); _i++) {
                    // console.log(itemPoints[i].get(2));
                    // console.log(itemPoints[i]);
                    var item = items[_i];
                    if (_Op.equal(item.type, "Point")) {
                        if (_Op.less(itemPoints[_i].get(2), near_d) || _Op.greater(itemPoints[_i].get(2), far_d)) continue; // 超出远近裁面
                        // console.log("a");
                        var screenPos = new See3D.Vector2(_Op.mul(_Op.div(_Op.mul(itemPoints[_i].get(0), d), itemPoints[_i].get(2)), 100), _Op.mul(_Op.div(_Op.mul(-itemPoints[_i].get(1), d), itemPoints[_i].get(2)), 100));
                        ctx.beginPath();
                        ctx.arc(screenPos.x, screenPos.y, item.r, 0, _Op.mul(Math.PI, 2));
                        ctx.fillStyle = items[_i].color;
                        ctx.fill();
                        ctx.closePath();
                    } else {
                        var r = Camera.r(item);
                        if (_Op.greater(_Op.sub(itemPoints[_i][2].z, r), far_d)) continue; // 超过远裁面
                        if (_Op.less(_Op.add(itemPoints[_i][2].z, r), near_d)) continue; // 小于近裁面
                        if (_Op.less(itemPoints[_i][2].z, 0)) continue;
                        if (_Op.greater(_Op.sub(itemPoints[_i][2].x, r), _Op.mul(Math.tan(_Op.div(See3D.FOV_x, 2)), itemPoints[_i][2].z))) continue; // 超出视景体右边缘
                        if (_Op.less(_Op.add(itemPoints[_i][2].x, r), _Op.mul(-Math.tan(_Op.div(See3D.FOV_x, 2)), itemPoints[_i][2].z))) continue; // 超出视景体左边缘
                        if (_Op.greater(_Op.sub(itemPoints[_i][2].y, r), _Op.mul(Math.tan(_Op.div(See3D.FOV_y, 2)), itemPoints[_i][2].z))) continue; // 超出视景体上边缘
                        if (_Op.less(_Op.add(itemPoints[_i][2].y, r), _Op.mul(-Math.tan(_Op.div(See3D.FOV_y, 2)), itemPoints[_i][2].z))) continue; // 超出视景体下边缘
                        for (var _j2 = 0; _Op.less(_j2, items[_i].planes.length); _j2++) {
                            // if (new See3D.Vector3(0, 1, 0) % items[i].planes[j].n <= 0) continue;
                            ctx.beginPath();
                            var sx = void 0,
                                sy = void 0;
                            for (var k = 0; _Op.less(k, items[_i].planes[_j2].points.length); k++) {
                                var point = itemPoints[_i][0][items[_i].planes[_j2].points[k]];
                                var _screenPos = new See3D.Vector2(_Op.mul(_Op.div(_Op.mul(point.get(0), d), point.get(2)), 100), _Op.mul(_Op.div(_Op.mul(-point.get(1), d), point.get(2)), 100));
                                if (_Op.equal(k, 0)) {
                                    ctx.moveTo(_screenPos.x, _screenPos.y);
                                    sx = _screenPos.x;
                                    sy = _screenPos.y;
                                } else {
                                    ctx.lineTo(_screenPos.x, _screenPos.y);
                                }
                            }
                            ctx.lineTo(sx, sy);
                            ctx.strokeStyle = items[_i].color;
                            // ctx.fillStyle = items[i].color;
                            ctx.stroke();
                            // ctx.fill();
                            ctx.closePath();
                        }
                    }
                }
                return this;
            }
        }, {
            key: "revolution",
            value: function revolution(r) {
                var rotation = See3D.Matrix.TransRotate(new Vector3(r.get(0), r.get(1), r.get(2)));
                var test = new Vector3(this.position);
                test.push(1);
                test = _Op.mul(test, rotation);
                this.position.x = test.x;
                this.position.y = test.y;
                this.position.z = test.z;
                return this;
            }
        }, {
            key: "name",
            get: function get() {
                return this.__name;
            }
        }], [{
            key: "r",
            value: function r(item) {
                var l = 0;
                for (var i = 0; _Op.less(i, item.points.length); i++) {
                    var tmp = _Op.add(_Op.add(_Op.mul(item.points[i].x, item.points[i].x), _Op.mul(item.points[i].y, item.points[i].y)), _Op.mul(item.points[i].z, item.points[i].z));
                    if (_Op.less(l, tmp)) {
                        l = tmp;
                    }
                }
                l = Math.sqrt(l);
                return l;
            }
        }]);

        return Camera;
    }(Item);

    var ITEM_CONFIG = {
        "Cube": {
            "Points": [[1, 1, 1], [1, 1, -1], [1, -1, 1], [1, -1, -1], [-1, 1, 1], [-1, 1, -1], [-1, -1, 1], [-1, -1, -1]],
            "Planes": [{
                "n": [1, 0, 0],
                "p0": [1, 0, 0],
                "points": [0, 2, 3, 1]
            }, {
                "n": [-1, 0, 0],
                "p0": [-1, 0, 0],
                "points": [4, 6, 7, 5]
            }, {
                "n": [0, 1, 0],
                "p0": [0, 1, 0],
                "points": [4, 6, 2, 0]
            }, {
                "n": [0, -1, 0],
                "p0": [0, -1, 0],
                "points": [5, 1, 3, 7]
            }, {
                "n": [0, 0, 1],
                "p0": [0, 0, 1],
                "points": [2, 0, 1, 3]
            }, {
                "n": [0, 0, -1],
                "p0": [0, 0, -1],
                "points": [4, 6, 7, 5]
            }]
        }
    };

    var entity = function (_Item2) {
        _inherits(entity, _Item2);

        function entity(type, p, s, color) {
            var withItemConfig = _Op.greater(arguments.length, 4) && arguments[4] !== undefined ? arguments[4] : true;

            _classCallCheck(this, entity);

            var _this4 = _possibleConstructorReturn(this, (entity.__proto__ || Object.getPrototypeOf(entity)).call(this, p));

            _this4.type = type;
            _this4.planes = [];
            _this4.points = [];
            _this4.s = s;
            _this4.color = color;
            if (withItemConfig) {
                _this4.load();
            }
            return _this4;
        }

        _createClass(entity, [{
            key: "load",
            value: function load() {
                var config = ITEM_CONFIG[this.type];
                if (!config) {
                    console.error(new Error(_Op.add("Error 200: Configuration of the entity was not found.\nEnity type: ", this.type)));
                    return this;
                }
                // console.log(ITEM_CONFIG, this.type);
                for (var i = 0; _Op.less(i, config["Points"].length); i++) {
                    var test = new (Function.prototype.bind.apply(See3D.Vector3, [null].concat(_toConsumableArray(config["Points"][i]))))();
                    test.x *= this.s.x;
                    test.y *= this.s.y;
                    test.z *= this.s.z;
                    this.points.push(test);
                }
                for (var _i2 = 0; _Op.less(_i2, config["Planes"].length); _i2++) {
                    var arrN = config["Planes"][_i2]["n"];
                    var arrP0 = config["Planes"][_i2]["p0"];
                    arrN[0] *= this.s.x;
                    arrN[1] *= this.s.y;
                    arrN[2] *= this.s.z;
                    arrP0[0] *= this.s.x;
                    arrP0[1] *= this.s.y;
                    arrP0[2] *= this.s.z;
                    this.planes.push(new See3D.Plane3D(new (Function.prototype.bind.apply(Vector3, [null].concat(_toConsumableArray(arrN))))(), new (Function.prototype.bind.apply(Vector3, [null].concat(_toConsumableArray(arrP0))))()));
                    this.planes[_Op.sub(this.planes.length, 1)].points = config["Planes"][_i2]["points"];
                }
                return this;
            }
        }, {
            key: "rotate",
            value: function rotate(r) {
                // console.log(r);
                this.rotation = new Vector3(_Op.add(this.rotation.get(0), r.get(0)), _Op.add(this.rotation.get(1), r.get(1)), _Op.add(this.rotation.get(2), r.get(2)));
                var rotation = See3D.Matrix.TransRotate(new Vector3(-r.get(0), -r.get(1), -r.get(2)));
                // console.log(-r.get(0), -r.get(1), -r.get(2));
                // console.log(rotation);
                for (var i = 0; _Op.less(i, this.points.length); i++) {
                    this.points[i].push(1);
                    this.points[i] = _Op.mul(this.points[i], rotation);
                    this.points[i].array.pop();
                    this.points[i] = new (Function.prototype.bind.apply(Vector3, [null].concat(_toConsumableArray(this.points[i].array))))();
                }
                for (var _i3 = 0; _Op.less(_i3, this.planes.length); _i3++) {
                    this.planes[_i3].n.push(1);
                    this.planes[_i3].n = _Op.mul(this.planes[_i3].n, rotation);
                    this.planes[_i3].n.array.pop();
                    this.planes[_i3].n = new (Function.prototype.bind.apply(Vector3, [null].concat(_toConsumableArray(this.planes[_i3].n.array))))();
                    this.planes[_i3].p0 = new Vector3(this.planes[_i3].n);
                }
                return this;
            }
        }]);

        return entity;
    }(Item);

    var Point = function (_entity) {
        _inherits(Point, _entity);

        function Point() {
            var p = _Op.greater(arguments.length, 0) && arguments[0] !== undefined ? arguments[0] : See3D.Vector3.Zero();
            var size = _Op.greater(arguments.length, 1) && arguments[1] !== undefined ? arguments[1] : 10;
            var color = _Op.greater(arguments.length, 2) && arguments[2] !== undefined ? arguments[2] : "#fff";

            _classCallCheck(this, Point);

            var _this5 = _possibleConstructorReturn(this, (Point.__proto__ || Object.getPrototypeOf(Point)).call(this, "Point", p, null, color, false));

            _this5.r = size;
            return _this5;
        }

        return Point;
    }(entity);

    var Cube = function (_entity2) {
        _inherits(Cube, _entity2);

        function Cube() {
            var p = _Op.greater(arguments.length, 0) && arguments[0] !== undefined ? arguments[0] : See3D.Vector3.Zero();
            var s = _Op.greater(arguments.length, 1) && arguments[1] !== undefined ? arguments[1] : new See3D.Vector3(1, 1, 1);
            var color = _Op.greater(arguments.length, 2) && arguments[2] !== undefined ? arguments[2] : "#fff";

            _classCallCheck(this, Cube);

            s.x = _Op.equal(s.x, 0) ? s.x : _Op.div(s.x, 2);
            s.y = _Op.equal(s.y, 0) ? s.y : _Op.div(s.y, 2);
            s.z = _Op.equal(s.z, 0) ? s.z : _Op.div(s.z, 2);
            return _possibleConstructorReturn(this, (Cube.__proto__ || Object.getPrototypeOf(Cube)).call(this, "Cube", p, s, color));
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
        See3D.loadGlobal("View"); // 将库加入浏览器全局
        lib.global(); // 将库API加入浏览器全局
    }
    See3D.lib("View");
    lib.toSee3D();
}();
//# sourceMappingURL=item.js.map