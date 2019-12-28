"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
            key: "moveOrigin",
            value: function moveOrigin(s) {
                for (var i = 0; i < this.points.length; i++) {
                    this.points[i].subTo(s);
                }
                return this;
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
            key: "up",
            value: function up(step) {
                var p = new See3D.Math3D.Point3D(0, step, 0).rotate(this.rotation.inverse());
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
        }, {
            key: "down",
            value: function down(step) {
                return this.up(-step);
            }
        }]);

        return Item;
    }();

    var Camera = function (_Item) {
        _inherits(Camera, _Item);

        function Camera(position, rotation) {
            _classCallCheck(this, Camera);

            var _this = _possibleConstructorReturn(this, (Camera.__proto__ || Object.getPrototypeOf(Camera)).call(this, position, rotation));

            _this.type = "Camera";
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
                var NEAR_Z = 0.1,
                    FAR_Z = 1000;
                var screenPlane = new See3D.Math3D.Plane3D(new See3D.Math3D.Point3D(0, 0, 1), new See3D.Math3D.Point3D(0, 0, NEAR_Z));
                // console.log(NEAR_Z);
                var items = this.scene.items;

                var _loop = function _loop(i) {
                    var item = items[i];
                    var points = item.points;
                    var planes = item.planes;
                    var itemCamPos = _this2.transToCameraPosition(See3D.Math3D.Point3D.Zero(), item.position);
                    if (itemCamPos.z + item.maxRadius <= NEAR_Z || itemCamPos.z + item.maxRadius > FAR_Z) return "continue"; // 近裁面和远裁面的判断
                    if (Math.abs(itemCamPos.x) - item.maxRadius > itemCamPos.z / Math.tan(Math.PI / 2 - beta / 2)) return "continue";
                    // console.log(Math.tan(Math.PI / 2 - beta / 2) * Math.abs(itemCamPos.z + item.maxRadius * 2));
                    if (Math.abs(itemCamPos.y) - item.maxRadius > itemCamPos.z / Math.tan(Math.PI / 2 - beta / 2)) return "continue";
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
                    // let colorIndex = 0;
                    // let colors = ["#fff", "#f00", "#0f0", "#00f", "#ff0", "#0ff", "#f0f"];
                    for (var _j = 0; _j < transedPlanes.length; _j++) {
                        ctx.beginPath();
                        var prePoint = transedPlanes[_j][0];
                        var needRenderAgain = false;
                        var _start = 1;
                        if (prePoint.z < NEAR_Z) {
                            needRenderAgain = true;
                            prePoint = transedPlanes[_j][1];
                            _start = 2;
                            while (prePoint && prePoint.z < NEAR_Z) {
                                prePoint = transedPlanes[_j][_start++];
                            }if (!prePoint) continue;
                        }
                        var tmppos = prePoint.mappingTo(ta, tb, maxLen);
                        var count = transedPlanes[_j].length;
                        ctx.moveTo.apply(ctx, _toConsumableArray(tmppos));
                        for (var _k = _start; _k < count || needRenderAgain && !(_k = 0) && !(needRenderAgain = false) && (count = _start); _k++) {
                            // if (k == transedPlanes[j].length) {
                            //     count = start;
                            //     k = 0;
                            // }
                            var cpoint = transedPlanes[_j][_k];
                            var raw = cpoint;
                            if (prePoint.z < NEAR_Z) {
                                if (cpoint.z < NEAR_Z) {
                                    prePoint = cpoint;
                                    continue;
                                }
                                var parmline = new See3D.Math3D.Parmline3D(prePoint, cpoint);
                                prePoint = See3D.Math3D.intersParmlinePlane(parmline, screenPlane);
                                ctx.moveTo.apply(ctx, _toConsumableArray(prePoint.mappingTo(ta, tb, maxLen)));
                            }
                            if (cpoint.z < NEAR_Z) {
                                var _parmline = new See3D.Math3D.Parmline3D(prePoint, cpoint);
                                cpoint = See3D.Math3D.intersParmlinePlane(_parmline, screenPlane);
                            }
                            ctx.lineTo.apply(ctx, _toConsumableArray(cpoint.mappingTo(ta, tb, maxLen)));
                            prePoint = raw;
                        }
                        ctx.lineTo.apply(ctx, _toConsumableArray(tmppos));
                        ctx.strokeStyle = "#fff";
                        // ctx.fillStyle = colors[(colorIndex >= colors.length && (colorIndex = 0)) || colorIndex++];
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

    var BaseCamera = function (_Camera) {
        _inherits(BaseCamera, _Camera);

        function BaseCamera() {
            var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : See3D.Math3D.Point3D.Zero();
            var rotation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new See3D.Math3D.Point3D();

            _classCallCheck(this, BaseCamera);

            return _possibleConstructorReturn(this, (BaseCamera.__proto__ || Object.getPrototypeOf(BaseCamera)).call(this, position, rotation));
        }

        return BaseCamera;
    }(Camera);

    var FreeCamera = function (_BaseCamera) {
        _inherits(FreeCamera, _BaseCamera);

        function FreeCamera() {
            var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : See3D.Math3D.Point3D.Zero();
            var rotation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new See3D.Math3D.Point2D();

            _classCallCheck(this, FreeCamera);

            var _this4 = _possibleConstructorReturn(this, (FreeCamera.__proto__ || Object.getPrototypeOf(FreeCamera)).call(this, position));

            _this4.$rotation = rotation;
            return _this4;
        }

        _createClass(FreeCamera, [{
            key: "updateRotation",
            value: function updateRotation() {
                this.rotation.y = this.$rotation.x;
                this.rotation.x = Math.PI / 2 - this.$rotation.y;
                this.rotation.z = this.$rotation.y;
            }
        }]);

        return FreeCamera;
    }(BaseCamera);

    var Point = function (_Item2) {
        _inherits(Point, _Item2);

        function Point() {
            var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : See3D.Math3D.Point3D.Zero();
            var rotation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new See3D.Math3D.Point3D();

            _classCallCheck(this, Point);

            var _this5 = _possibleConstructorReturn(this, (Point.__proto__ || Object.getPrototypeOf(Point)).call(this, position, rotation));

            _this5.type = "Point";
            _this5.points = [See3D.Math3D.Point3D.Zero()];
            _this5.maxRadius = 0;
            return _this5;
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

            var _this6 = _possibleConstructorReturn(this, (Line.__proto__ || Object.getPrototypeOf(Line)).call(this, position, new See3D.Math3D.Point3D()));

            _this6.type = "Line";
            _this6.points = [start.copy(), end.copy()];
            _this6.maxRadius = start.sub(end).mod();
            return _this6;
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

            var _this7 = _possibleConstructorReturn(this, (Cube.__proto__ || Object.getPrototypeOf(Cube)).call(this, position, See3D.Math3D.Point3D.Zero()));

            _this7.type = "Cube";
            _this7.points = [new See3D.Math3D.Point3D(w, h, d), new See3D.Math3D.Point3D(w, h, -d), new See3D.Math3D.Point3D(w, -h, d), new See3D.Math3D.Point3D(w, -h, -d), new See3D.Math3D.Point3D(-w, h, d), new See3D.Math3D.Point3D(-w, h, -d), new See3D.Math3D.Point3D(-w, -h, d), new See3D.Math3D.Point3D(-w, -h, -d)];
            // up: 0, 1, 4, 5
            _this7.planes = [[1, 2, 3, new Point3D(1, 0, 0)], [0, 1, 2, new Point3D(1, 0, 0)], [5, 6, 7, new Point3D(-1, 0, 0)], [4, 5, 6, new Point3D(-1, 0, 0)], [3, 6, 7, new Point3D(0, -1, 0)], [2, 3, 6, new Point3D(0, -1, 0)], [1, 4, 5, new Point3D(0, 1, 0)], [0, 1, 4, new Point3D(0, 1, 0)], [2, 4, 6, new Point3D(0, 0, 1)], [0, 2, 4, new Point3D(0, 0, 1)], [3, 5, 7, new Point3D(0, 0, -1)], [1, 3, 5, new Point3D(0, 0, -1)]];
            _this7.maxRadius = Math.sqrt(Math.pow(w, 2) + Math.pow(h, 2) + Math.pow(d, 2));
            return _this7;
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

            var _this8 = _possibleConstructorReturn(this, (Pyramid.__proto__ || Object.getPrototypeOf(Pyramid)).call(this, position, See3D.Math3D.Point3D.Zero()));

            _this8.type = "Pyramid";
            _this8.points = [new See3D.Math3D.Point3D(0, height / 2, 0)];
            _this8.planes = [];
            _this8.maxRadius = Math.max(radius, height);
            var delta_theta = Math.PI * 2 / pointCount;
            var plane_bottom = [];
            var i = 1,
                theta = 0;
            for (; i <= pointCount; i++, theta += delta_theta) {
                _this8.points.push(new See3D.Math3D.Point3D(radius * Math.sin(theta), -height / 2, radius * Math.cos(theta)));
                plane_bottom.push(i);
                _this8.planes.push([i === 1 ? pointCount : i - 1, i, 0, new See3D.Math3D.Point3D(Math.sin(theta - delta_theta / 2), Math.sin(Math.PI / 2 - Math.atan(radius / height)), Math.cos(theta - delta_theta / 2)).norm()]);
                // if (i > 0) this.planes.push([ i, i + 1, 0, new See3D.Math3D.Point3D(0, 0, 0) ]);
            }
            // this.planes.push([ i + 1, 1, 0, (new See3D.Math3D.Point3D(Math.sin(theta - delta_theta / 2), Math.sin(Math.PI / 2 - Math.atan(radius / height)), Math.cos(theta - delta_theta / 2))).norm() ]);
            plane_bottom.push(new See3D.Math3D.Point3D(0, -1, 0));
            _this8.planes.push(plane_bottom);
            return _this8;
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

            var _this9 = _possibleConstructorReturn(this, (Platform.__proto__ || Object.getPrototypeOf(Platform)).call(this, position, See3D.Math3D.Point3D.Zero()));

            _this9.type = "Platform";
            _this9.points = [];
            _this9.planes = [];
            _this9.maxRadius = Math.max(radius1, radius2, height);
            var delta_theta = Math.PI * 2 / pointCount;
            var plane_bottom = [],
                plane_top = [];
            var i = 0,
                theta = 0;
            for (; i < pointCount; i++, theta += delta_theta) {
                _this9.points.push(new See3D.Math3D.Point3D(radius1 * Math.sin(theta), -height / 2, radius1 * Math.cos(theta)));
                plane_bottom.push(i);
            }
            for (theta = 0; i < pointCount << 1; i++, theta += delta_theta) {
                _this9.points.push(new See3D.Math3D.Point3D(radius2 * Math.sin(theta), height / 2, radius2 * Math.cos(theta)));
                plane_top.push(i);
                _this9.planes.push([i, i === pointCount ? (pointCount << 1) - 1 : i - 1, i === pointCount ? pointCount - 1 : i - pointCount - 1, i === pointCount ? 0 : i - pointCount, new See3D.Math3D.Point3D(Math.sin(theta - delta_theta / 2), Math.cos(Math.PI / 2 - Math.atan((radius1 - radius2) / height)), Math.cos(theta - delta_theta / 2)).norm()]);
            }
            plane_top.push(new See3D.Math3D.Point3D(0, 1, 0));
            plane_bottom.push(new See3D.Math3D.Point3D(0, -1, 0));
            _this9.planes.push(plane_top);
            _this9.planes.push(plane_bottom);
            return _this9;
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

            var _this10 = _possibleConstructorReturn(this, (Prism.__proto__ || Object.getPrototypeOf(Prism)).call(this, position, {
                pointCount: pointCount,
                radius1: radius,
                radius2: radius,
                height: height
            }));

            _this10.type = "Prism";
            return _this10;
        }

        return Prism;
    }(Platform);

    var Cloth = function (_Item7) {
        _inherits(Cloth, _Item7);

        function Cloth() {
            var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : See3D.Math3D.Point3D.Zero();

            var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
                w = _ref5.w,
                h = _ref5.h,
                _ref5$acc = _ref5.acc,
                acc = _ref5$acc === undefined ? 1 : _ref5$acc;

            _classCallCheck(this, Cloth);

            var _this11 = _possibleConstructorReturn(this, (Cloth.__proto__ || Object.getPrototypeOf(Cloth)).call(this, position, See3D.Math3D.Point3D.Zero()));

            _this11.type = "Cloth";
            _this11.points = [];
            _this11.planes = [];
            _this11.w = w;
            _this11.h = h;
            _this11.acc = acc;
            _this11.acc = acc;
            var wC = w / acc,
                hC = h / acc;
            for (var _i2 = 0; _i2 < wC; _i2++) {
                for (var j = 0; j < hC; j++) {
                    _this11.points.push(new Point3D(_i2 * acc - w / 2, 0, j * acc - h / 2));
                }
            }
            for (var _i3 = 0; _i3 < wC - 1; _i3++) {
                for (var _j2 = 0; _j2 < hC - 1; _j2++) {
                    _this11.planes.push([_this11.getIndex(_i3, _j2), _this11.getIndex(_i3 + 1, _j2), _this11.getIndex(_i3 + 1, _j2 + 1), new See3D.Math3D.Point3D(0, 0, 0)]);
                    _this11.planes.push([_this11.getIndex(_i3, _j2), _this11.getIndex(_i3 + 1, _j2 + 1), _this11.getIndex(_i3, _j2 + 1), new See3D.Math3D.Point3D(0, 0, 0)]);
                }
            }
            _this11.maxRadius = Math.sqrt(Math.pow(w, 2) + Math.pow(h, 2));
            return _this11;
        }

        _createClass(Cloth, [{
            key: "getIndex",
            value: function getIndex(x, y) {
                return x * (this.h / this.acc) + y;
            }
        }, {
            key: "select",
            value: function select(x, y, cb) {
                cb.call(this, this.points[this.getIndex(x, y)]);
                this.changeMaxRadius();
                return this;
            }
        }]);

        return Cloth;
    }(Item);

    lib.define("Scene", Scene);
    lib.define("Item", Item);
    lib.define("BaseCamera", BaseCamera);
    lib.define("FreeCamera", FreeCamera);
    lib.define("Point", Point);
    lib.define("Line", Line);
    lib.define("Cube", Cube);
    lib.define("Pyramid", Pyramid);
    lib.define("Platform", Platform);
    lib.define("Prism", Prism);
    lib.define("Cloth", Cloth);

    lib.toSee3D();
    lib.global();
}(See3D);
//# sourceMappingURL=item.js.map