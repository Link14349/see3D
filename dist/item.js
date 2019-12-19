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
                    this.planes[_i][this.planes[_i].length - 1] = this.planes[_i][this.planes[_i].length - 1].rotate(rotation).norm();
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
            value: function changeMaxRadius() {
                var max = 0;
                for (var i = 0; i < this.points.length; i++) {
                    var m2 = this.points[i].mod2();
                    if (m2 > max) max = m2;
                }
                this.maxRadius = Math.sqrt(max);
            }
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
                var _this2 = this;

                var ctx = this.ctx,
                    alpha = this.alpha,
                    beta = this.beta,
                    width = this.width,
                    height = this.height;

                var ta = Math.tan(alpha / 2);
                var tb = Math.tan(beta / 2);
                var maxLen = Math.max(width, height);
                var items = this.scene.items;

                var _loop = function _loop(i) {
                    var item = items[i];
                    var points = item.points;
                    var planes = item.planes;
                    var itemCamPos = _this2.transToCameraPosition(See3D.Math3D.Point3D.Zero(), item.position);
                    if (itemCamPos.z + item.maxRadius <= 0 || itemCamPos.z + item.maxRadius > 1000) return "continue"; // 近裁面和远裁面的判断
                    if (itemCamPos.z < Math.tan(Math.PI / 2 - alpha / 2) * Math.abs(itemCamPos.x + (itemCamPos.x > 0 ? -1 : 1) * item.maxRadius)) return "continue";
                    // console.log(Math.tan(Math.PI / 2 - beta / 2) * Math.abs(itemCamPos.z + item.maxRadius * 2));
                    if (itemCamPos.z < Math.tan(Math.PI / 2 - beta / 2) * Math.abs(itemCamPos.y + (itemCamPos.y > 0 ? -1 : 1) * item.maxRadius)) return "continue";
                    var transedPoints = {};
                    var transedPlanes = [];
                    if (item.type == "Point") {
                        var point3d = _this2.transToCameraPosition(points[0], item.position);
                        ctx.beginPath();
                        ctx.arc.apply(ctx, _toConsumableArray(point3d.mappingTo(ta, tb, maxLen)).concat([1, 0, 2 * Math.PI]));
                        ctx.fillStyle = "#fff";
                        ctx.fill();
                        ctx.closePath();
                        return "continue";
                    } else if (item.type == "Line") {
                        ctx.beginPath();
                        ctx.moveTo.apply(ctx, _toConsumableArray(_this2.transToCameraPosition(points[0], item.position).mappingTo(ta, tb, maxLen)));
                        ctx.lineTo.apply(ctx, _toConsumableArray(_this2.transToCameraPosition(points[1], item.position).mappingTo(ta, tb, maxLen)));
                        ctx.strokeStyle = "#fff";
                        ctx.stroke();
                        ctx.closePath();
                        return "continue";
                    }
                    // for (let j = 0; j < points.length; j++) {
                    //     transedPoints.push(this.transToCameraPosition(points[j], item.position));
                    // }
                    var getPoint = function (i) {
                        try {
                            if (transedPoints[i]) return transedPoints[i];
                            return transedPoints[i] = this.transToCameraPosition(points[i], item.position);
                        } catch (e) {
                            console.error(e);
                            debugger;
                        }
                    }.bind(_this2);
                    for (var j = 0, c = 0; j < planes.length; j++) {
                        var plane = planes[j];
                        if (plane[plane.length - 1].rotate(_this2.rotation.inverse()).mul(getPoint(plane[0]).inverse().norm()) < 0) {
                            continue;
                        }
                        transedPlanes.push([]);
                        for (var k = 0; k < plane.length - 1; k++) {
                            // console.log(transedPlanes[j], j);
                            transedPlanes[c].push(getPoint(plane[k]));
                        }
                        c++;
                    }
                    for (var _j = 0; _j < transedPlanes.length; _j++) {
                        ctx.beginPath();
                        var tmppos = transedPlanes[_j][0].mappingTo(ta, tb, maxLen);
                        ctx.moveTo.apply(ctx, _toConsumableArray(tmppos));
                        for (var _k = 1; _k < transedPlanes[_j].length; _k++) {
                            ctx.lineTo.apply(ctx, _toConsumableArray(transedPlanes[_j][_k].mappingTo(ta, tb, maxLen)));
                        }
                        ctx.lineTo.apply(ctx, _toConsumableArray(tmppos));
                        ctx.strokeStyle = "#fff";
                        // ctx.fillStyle = "#fff";
                        ctx.stroke();
                        // ctx.fill();
                        ctx.closePath();
                    }
                };

                for (var i = 0; i < items.length; i++) {
                    var _ret = _loop(i);

                    if (_ret === "continue") continue;
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

            var _this3 = _possibleConstructorReturn(this, (Point.__proto__ || Object.getPrototypeOf(Point)).call(this, position, rotation));

            _this3.type = "Point";
            _this3.points = [See3D.Math3D.Point3D.Zero()];
            _this3.maxRadius = 0;
            return _this3;
        }

        _createClass(Point, [{
            key: "changeMaxRadius",
            value: function changeMaxRadius() {}
        }]);

        return Point;
    }(Item);

    var Line = function (_Item3) {
        _inherits(Line, _Item3);

        function Line() {
            var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : See3D.Math3D.Point3D.Zero();
            var start = arguments[1];
            var end = arguments[2];

            _classCallCheck(this, Line);

            var _this4 = _possibleConstructorReturn(this, (Line.__proto__ || Object.getPrototypeOf(Line)).call(this, position, new See3D.Math3D.Point3D()));

            _this4.type = "Line";
            _this4.points = [start.copy(), end.copy()];
            _this4.maxRadius = start.sub(end).mod();
            return _this4;
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

            var _this5 = _possibleConstructorReturn(this, (Cube.__proto__ || Object.getPrototypeOf(Cube)).call(this, position, See3D.Math3D.Point3D.Zero()));

            _this5.type = "Cube";
            _this5.points = [new See3D.Math3D.Point3D(w, h, d), new See3D.Math3D.Point3D(w, h, -d), new See3D.Math3D.Point3D(w, -h, d), new See3D.Math3D.Point3D(w, -h, -d), new See3D.Math3D.Point3D(-w, h, d), new See3D.Math3D.Point3D(-w, h, -d), new See3D.Math3D.Point3D(-w, -h, d), new See3D.Math3D.Point3D(-w, -h, -d)];
            // up: 0, 1, 4, 5
            _this5.planes = [[1, 2, 3, new Point3D(1, 0, 0)], [0, 1, 2, new Point3D(1, 0, 0)], [5, 6, 7, new Point3D(-1, 0, 0)], [4, 5, 6, new Point3D(-1, 0, 0)], [3, 6, 7, new Point3D(0, -1, 0)], [2, 3, 6, new Point3D(0, -1, 0)], [1, 4, 5, new Point3D(0, 1, 0)], [0, 1, 4, new Point3D(0, 1, 0)], [2, 4, 6, new Point3D(0, 0, 1)], [0, 2, 4, new Point3D(0, 0, 1)], [3, 5, 7, new Point3D(0, 0, -1)], [1, 3, 5, new Point3D(0, 0, -1)]];
            _this5.maxRadius = Math.sqrt(Math.pow(w, 2) + Math.pow(h, 2) + Math.pow(d, 2));
            return _this5;
        }

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

            var _this6 = _possibleConstructorReturn(this, (Pyramid.__proto__ || Object.getPrototypeOf(Pyramid)).call(this, position, See3D.Math3D.Point3D.Zero()));

            _this6.type = "Pyramid";
            _this6.points = [new See3D.Math3D.Point3D(0, height / 2, 0)];
            _this6.planes = [];
            _this6.maxRadius = Math.max(radius, height);
            var delta_theta = Math.PI * 2 / pointCount;
            var plane_bottom = [];
            var i = 1,
                theta = 0;
            for (; i <= pointCount; i++, theta += delta_theta) {
                _this6.points.push(new See3D.Math3D.Point3D(radius * Math.sin(theta), -height / 2, radius * Math.cos(theta)));
                plane_bottom.push(i);
                _this6.planes.push([i === 1 ? pointCount : i - 1, i, 0, new See3D.Math3D.Point3D(Math.sin(theta - delta_theta / 2), Math.sin(Math.PI / 2 - Math.atan(radius / height)), Math.cos(theta - delta_theta / 2)).norm()]);
                // if (i > 0) this.planes.push([ i, i + 1, 0, new See3D.Math3D.Point3D(0, 0, 0) ]);
            }
            // this.planes.push([ i + 1, 1, 0, (new See3D.Math3D.Point3D(Math.sin(theta - delta_theta / 2), Math.sin(Math.PI / 2 - Math.atan(radius / height)), Math.cos(theta - delta_theta / 2))).norm() ]);
            plane_bottom.push(new See3D.Math3D.Point3D(0, -1, 0));
            _this6.planes.push(plane_bottom);
            return _this6;
        }

        return Pyramid;
    }(Item);

    var Platform = function (_Item6) {
        _inherits(Platform, _Item6);

        function Platform() {
            var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : See3D.Math3D.Point3D.Zero();

            var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
                pointCount = _ref3.pointCount,
                radius1 = _ref3.radius1,
                radius2 = _ref3.radius2,
                height = _ref3.height;

            _classCallCheck(this, Platform);

            var _this7 = _possibleConstructorReturn(this, (Platform.__proto__ || Object.getPrototypeOf(Platform)).call(this, position, See3D.Math3D.Point3D.Zero()));

            _this7.type = "Platform";
            _this7.points = [];
            _this7.planes = [];
            _this7.maxRadius = Math.max(radius1, radius2, height);
            var delta_theta = Math.PI * 2 / pointCount;
            var plane_bottom = [],
                plane_top = [];
            var i = 0,
                theta = 0;
            for (; i < pointCount; i++, theta += delta_theta) {
                _this7.points.push(new See3D.Math3D.Point3D(radius1 * Math.sin(theta), -height / 2, radius1 * Math.cos(theta)));
                plane_bottom.push(i);
            }
            for (theta = 0; i < pointCount << 1; i++, theta += delta_theta) {
                _this7.points.push(new See3D.Math3D.Point3D(radius2 * Math.sin(theta), height / 2, radius2 * Math.cos(theta)));
                plane_top.push(i);
                _this7.planes.push([i, i === pointCount ? (pointCount << 1) - 1 : i - 1, i === pointCount ? pointCount - 1 : i - pointCount - 1, i === pointCount ? 0 : i - pointCount, new See3D.Math3D.Point3D(Math.sin(theta - delta_theta / 2), Math.cos(Math.PI / 2 - Math.atan((radius1 - radius2) / height)), Math.cos(theta - delta_theta / 2)).norm()]);
            }
            plane_top.push(new See3D.Math3D.Point3D(0, 1, 0));
            plane_bottom.push(new See3D.Math3D.Point3D(0, -1, 0));
            _this7.planes.push(plane_top);
            _this7.planes.push(plane_bottom);
            return _this7;
        }

        return Platform;
    }(Item);

    var Prism = function (_Platform) {
        _inherits(Prism, _Platform);

        function Prism() {
            var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : See3D.Math3D.Point3D.Zero();

            var _ref4 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
                pointCount = _ref4.pointCount,
                radius = _ref4.radius,
                height = _ref4.height;

            _classCallCheck(this, Prism);

            var _this8 = _possibleConstructorReturn(this, (Prism.__proto__ || Object.getPrototypeOf(Prism)).call(this, position, {
                pointCount: pointCount,
                radius1: radius,
                radius2: radius,
                height: height
            }));

            _this8.type = "Prism";
            return _this8;
        }

        return Prism;
    }(Platform);

    lib.define("Scene", Scene);
    lib.define("Item", Item);
    lib.define("Camera", Camera);
    lib.define("Point", Point);
    lib.define("Line", Line);
    lib.define("Cube", Cube);
    lib.define("Pyramid", Pyramid);
    lib.define("Platform", Platform);
    lib.define("Prism", Prism);

    lib.toSee3D();
    lib.global();
}(See3D);
//# sourceMappingURL=item.js.map