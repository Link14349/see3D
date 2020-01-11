!function (See3D) {
    let lib = new See3D.Library("View");

    class Scene {
        constructor() {
            this.use = null;
            this.game = null;
            this.items = [ ];
        }
        camera(camera) {
            this.use = camera;
            camera.scene = this;
            return this;
        }
        render() {
            if (this.use) this.use.render();
            return this;
        }
        push(itm) {
            this.items.push(itm);
            return this;
        }
        get ctx() { return this.game.ctx; }
        get alpha() { return this.game.alpha; }
        get beta() { return this.game.beta; }
        get width() { return this.game.width(); }
        get height() { return this.game.height(); }
    }
    class Item {
        constructor(position = See3D.Math3D.Point3D.Zero(), rotation = new See3D.Math3D.Point3D()) {
            this.position = position;
            this.rotation = rotation;
            this.points = [ ];
            this.planes = [];
            this.maxRadius = 0;
            rotation.binding = this;
        }
        rotate(rotation) {
            this.rotation.addTo(rotation);
            rotation = rotation.inverse();
            for (let i = 0; i < this.points.length; i++) {
                this.points[i] = this.points[i].rotate(rotation);
            }
            for (let i = 0; i < this.planes.length; i++) {
                this.planes[i][this.planes[i].length - 1] = this.planes[i][this.planes[i].length - 1].rotate(rotation).norm();
            }
            return this;
        }
        scale(s) {
            for (let i = 0; i < this.points.length; i++) {
                this.points[i] = this.points[i].mul_(s);
            }
            this.changeMaxRadius();
            return this;
        }
        changeMaxRadius() {
            let max = 0;
            for (let i = 0; i < this.points.length; i++) {
                let m2 = this.points[i].mod2();
                if (m2 > max) max = m2;
            }
            this.maxRadius = Math.sqrt(max);
        }
        moveOrigin(s) {
            for (let i = 0; i < this.points.length; i++) {
                this.points[i].subTo(s);
            }
            return this;
        }
        forward(step) {
            let p = (new See3D.Math3D.Point3D(0, 0, step)).rotate(this.rotation.inverse());
            this.position.x -= p.x;
            this.position.y -= p.y;
            this.position.z += p.z;
            return this;
        }
        left(step) {
            let p = (new See3D.Math3D.Point3D(step, 0, 0)).rotate(this.rotation.inverse());
            this.position.x -= p.x;
            this.position.y -= p.y;
            this.position.z += p.z;
            return this;
        }
        up(step) {
            let p = (new See3D.Math3D.Point3D(0, step, 0)).rotate(this.rotation.inverse());
            this.position.x -= p.x;
            this.position.y -= p.y;
            this.position.z += p.z;
            return this;
        }
        right(step) {
            return this.left(-step);
        }
        back(step) {
            return this.forward(-step);
        }
        down(step) {
            return this.up(-step);
        }
    }
    class Camera extends Item {
        constructor(position, rotation) {
            super(position, rotation);
            this.type = "Camera";
            this.scene = null;
        }
        static getColor(y) {
            if (y <= 0) return "#003472";
            if (y <= 1) return "#065279";
            if (y <= 2) return "#1685a9";
            if (y <= 3) return "#70f3ff";
            if (y <= 4) return "#7fecad";
            if (y <= 5) return "#00e079";
            if (y <= 6) return "#9ed900";
            if (y <= 7) return "#a3d900";
            if (y <= 8) return "#eaff56";
            if (y <= 9) return "#faff72";
            if (y <= 10) return "#fff143";
            if (y <= 11) return "#ffa400";
            return "#ff7500";
        }
        render() {
            let { ctx, alpha, beta, width, height } = this;
            let ta = Math.tan(alpha / 2);
            let tb = Math.tan(beta / 2);
            let maxLen = Math.max(width, height);
            const NEAR_Z = 0.1, FAR_Z = 1000;
            let screenPlane = new See3D.Math3D.Plane3D(new See3D.Math3D.Point3D(0, 0, 1), new See3D.Math3D.Point3D(0, 0, NEAR_Z));
            // console.log(NEAR_Z);
            let items = this.scene.items;
            for (let i = 0; i < items.length; i++) {
                let item = items[i];
                let points = item.points;
                let planes = item.planes;
                let itemCamPos = this.transToCameraPosition(See3D.Math3D.Point3D.Zero(), item.position);
                if (itemCamPos.z + item.maxRadius <= NEAR_Z || itemCamPos.z + item.maxRadius > FAR_Z) continue;// 近裁面和远裁面的判断
                if (Math.abs(itemCamPos.x) - item.maxRadius > itemCamPos.z / Math.tan(Math.PI / 2 - beta / 2))
                    continue;
                // console.log(Math.tan(Math.PI / 2 - beta / 2) * Math.abs(itemCamPos.z + item.maxRadius * 2));
                if (Math.abs(itemCamPos.y) - item.maxRadius > itemCamPos.z / Math.tan(Math.PI / 2 - beta / 2))
                    continue;
                let transedPoints = { };
                let transedPlanes = [ ];
                if (item.type == "Point") {
                    let point3d = this.transToCameraPosition(points[0], item.position);
                    ctx.beginPath();
                    ctx.arc(...point3d.mappingTo(ta, tb, maxLen), 1, 0, 2 * Math.PI);
                    ctx.fillStyle = "#fff";
                    ctx.fill();
                    ctx.closePath();
                    continue;
                } else if (item.type == "Line") {
                    ctx.beginPath();
                    ctx.moveTo(...this.transToCameraPosition(points[0], item.position).mappingTo(ta, tb, maxLen));
                    ctx.lineTo(...this.transToCameraPosition(points[1], item.position).mappingTo(ta, tb, maxLen));
                    ctx.strokeStyle = "#fff";
                    ctx.stroke();
                    ctx.closePath();
                    continue;
                }
                // for (let j = 0; j < points.length; j++) {
                //     transedPoints.push(this.transToCameraPosition(points[j], item.position));
                // }
                let getPoint = function (i) {
                    try {
                        if (transedPoints[i]) return transedPoints[i];
                        return transedPoints[i] = this.transToCameraPosition(points[i], item.position);
                    } catch (e) {
                        console.error(e);
                        debugger;
                    }
                }.bind(this);
                for (let j = 0, c = 0; j < planes.length; j++) {
                    let plane = planes[j];
                    if (plane[plane.length - 1].rotate(this.rotation.inverse()).mul(getPoint(plane[0]).inverse().norm()) < 0) {
                        continue;
                    }
                    transedPlanes.push([]);
                    for (let k = 0; k < plane.length - 1; k++) {
                        // console.log(transedPlanes[j], j);
                        transedPlanes[c].push(getPoint(plane[k]));
                    }
                    c++;
                }
                // let colorIndex = 0;
                // let colors = ["#fff", "#f00", "#0f0", "#00f", "#ff0", "#0ff", "#f0f"];
                for (let j = 0; j < transedPlanes.length; j++) {
                    ctx.beginPath();
                    let prePoint = transedPlanes[j][0];
                    let needRenderAgain = false;
                    let start = 1;
                    if (prePoint.z < NEAR_Z) {
                        needRenderAgain = true;
                        prePoint = transedPlanes[j][1];
                        start = 2;
                        while (prePoint && prePoint.z < NEAR_Z)
                            prePoint = transedPlanes[j][start++];
                        if (!prePoint) continue;
                    }
                    let tmppos = prePoint.mappingTo(ta, tb, maxLen);
                    let count = transedPlanes[j].length;
                    ctx.moveTo(...tmppos);
                    for (let k = start; k < count || (needRenderAgain && !(k = 0) && !(needRenderAgain = false) && (count = start)); k++) {
                        // if (k == transedPlanes[j].length) {
                        //     count = start;
                        //     k = 0;
                        // }
                        let cpoint = transedPlanes[j][k];
                        let raw = cpoint;
                        if (prePoint.z < NEAR_Z) {
                            if (cpoint.z < NEAR_Z) {
                                prePoint = cpoint;
                                continue;
                            }
                            let parmline = new See3D.Math3D.Parmline3D(prePoint, cpoint);
                            prePoint = See3D.Math3D.intersParmlinePlane(parmline, screenPlane);
                            ctx.moveTo(...prePoint.mappingTo(ta, tb, maxLen));
                        }
                        if (cpoint.z < NEAR_Z) {
                            let parmline = new See3D.Math3D.Parmline3D(prePoint, cpoint);
                            cpoint = See3D.Math3D.intersParmlinePlane(parmline, screenPlane);
                        }
                        ctx.lineTo(...cpoint.mappingTo(ta, tb, maxLen));
                        prePoint = raw;
                    }
                    ctx.lineTo(...tmppos);
                    ctx.strokeStyle = "#fff";
                    ctx.fillStyle = Camera.getColor(points[planes[j][0]].y);
                    ctx.stroke();
                    ctx.fill();
                    ctx.closePath();
                }
            }
            return this;
        }
        transToCameraPosition(point, itemWorldPoint) {
            return point.add(itemWorldPoint).sub(this.position).rotate(this.rotation.inverse());
        }
        get ctx() { return this.scene.ctx; }
        get alpha() { return this.scene.alpha; }
        get beta() { return this.scene.beta; }
        get width() { return this.scene.width; }
        get height() { return this.scene.height; }
    }
    class BaseCamera extends Camera {
        constructor(position = See3D.Math3D.Point3D.Zero(), rotation = new See3D.Math3D.Point3D()) {
            super(position, rotation);
        }
    }
    class FreeCamera extends BaseCamera {
        constructor(position = See3D.Math3D.Point3D.Zero(), rotation = new See3D.Math3D.Point2D()) {
            super(position);
            this.$rotation = rotation;
        }
        updateRotation() {
            this.rotation.y = this.$rotation.x;
            this.rotation.x = Math.PI / 2 - this.$rotation.y;
            this.rotation.z = this.$rotation.y;
        }
    }
    class Point extends Item {
        constructor(position = See3D.Math3D.Point3D.Zero(), rotation = new See3D.Math3D.Point3D()) {
            super(position, rotation);
            this.type = "Point";
            this.points = [
                See3D.Math3D.Point3D.Zero()
            ];
            this.maxRadius = 0;
        }
        changeMaxRadius() { }
    }
    class Line extends Item {
        constructor(position = See3D.Math3D.Point3D.Zero(), start, end) {
            super(position, new See3D.Math3D.Point3D());
            this.type = "Line";
            this.points = [
                start.copy(), end.copy()
            ];
            this.maxRadius = start.sub(end).mod();
        }
        changeMaxRadius() {
            this.maxRadius = start.sub(end).mod();
        }
    }
    class Cube extends Item {
        constructor(position = See3D.Math3D.Point3D.Zero(), {
            w = 5, h = 5, d = 5
        } = { }) {
            super(position, See3D.Math3D.Point3D.Zero());
            this.type = "Cube";
            this.points = [
                new See3D.Math3D.Point3D(w, h, d),
                new See3D.Math3D.Point3D(w, h, -d),
                new See3D.Math3D.Point3D(w, -h, d),
                new See3D.Math3D.Point3D(w, -h, -d),
                new See3D.Math3D.Point3D(-w, h, d),
                new See3D.Math3D.Point3D(-w, h, -d),
                new See3D.Math3D.Point3D(-w, -h, d),
                new See3D.Math3D.Point3D(-w, -h, -d),
            ];
            // up: 0, 1, 4, 5
            this.planes = [
                [ 1, 2, 3, new Point3D(1, 0, 0) ],
                [ 0, 1, 2, new Point3D(1, 0, 0) ],
                [ 5, 6, 7, new Point3D(-1, 0, 0) ],
                [ 4, 5, 6, new Point3D(-1, 0, 0) ],
                [ 3, 6, 7, new Point3D(0, -1, 0) ],
                [ 2, 3, 6, new Point3D(0, -1, 0) ],
                [ 1, 4, 5, new Point3D(0, 1, 0) ],
                [ 0, 1, 4, new Point3D(0, 1, 0) ],
                [ 2, 4, 6, new Point3D(0, 0, 1) ],
                [ 0, 2, 4, new Point3D(0, 0, 1) ],
                [ 3, 5, 7, new Point3D(0, 0, -1) ],
                [ 1, 3, 5, new Point3D(0, 0, -1) ],
            ];
            this.maxRadius = Math.sqrt(w ** 2 + h ** 2 + d ** 2);
        }
    }
    class Pyramid extends Item {
        constructor(position = See3D.Math3D.Point3D.Zero(), {
            pointCount, radius, height
        } = { }) {
            super(position, See3D.Math3D.Point3D.Zero());
            this.type = "Pyramid";
            this.points = [ new See3D.Math3D.Point3D(0, height / 2, 0) ];
            this.planes = [];
            this.maxRadius = Math.max(radius, height);
            let delta_theta = Math.PI * 2 / pointCount;
            let plane_bottom = [];
            let i = 1, theta = 0;
            for (; i <= pointCount; i++, theta += delta_theta) {
                this.points.push(new See3D.Math3D.Point3D(radius * Math.sin(theta), -height / 2, radius * Math.cos(theta)));
                plane_bottom.push(i);
                this.planes.push([ i === 1 ? pointCount : i - 1, i, 0, (new See3D.Math3D.Point3D(Math.sin(theta - delta_theta / 2), Math.sin(Math.PI / 2 - Math.atan(radius / height)), Math.cos(theta - delta_theta / 2))).norm() ]);
                // if (i > 0) this.planes.push([ i, i + 1, 0, new See3D.Math3D.Point3D(0, 0, 0) ]);
            }
            // this.planes.push([ i + 1, 1, 0, (new See3D.Math3D.Point3D(Math.sin(theta - delta_theta / 2), Math.sin(Math.PI / 2 - Math.atan(radius / height)), Math.cos(theta - delta_theta / 2))).norm() ]);
            plane_bottom.push(new See3D.Math3D.Point3D(0, -1, 0));
            this.planes.push(plane_bottom);
        }
    }
    class Platform extends Item {
        constructor(position = See3D.Math3D.Point3D.Zero(), {
            pointCount, radius1, radius2, height
        } = { }) {
            super(position, See3D.Math3D.Point3D.Zero());
            this.type = "Platform";
            this.points = [  ];
            this.planes = [ ];
            this.maxRadius = Math.max(radius1, radius2, height);
            let delta_theta = Math.PI * 2 / pointCount;
            let plane_bottom = [], plane_top = [];
            let i = 0, theta = 0;
            for (; i < pointCount; i++, theta += delta_theta) {
                this.points.push(new See3D.Math3D.Point3D(radius1 * Math.sin(theta), -height / 2, radius1 * Math.cos(theta)));
                plane_bottom.push(i);
            }
            for (theta = 0; i < pointCount << 1; i++, theta += delta_theta) {
                this.points.push(new See3D.Math3D.Point3D(radius2 * Math.sin(theta), height / 2, radius2 * Math.cos(theta)));
                plane_top.push(i);
                this.planes.push([ i, i === pointCount ? (pointCount << 1) - 1 : i - 1, i === pointCount ? pointCount - 1 : i - pointCount - 1, i === pointCount ? 0 : i - pointCount, (new See3D.Math3D.Point3D(Math.sin(theta - delta_theta / 2), Math.cos(Math.PI / 2 - Math.atan((radius1 - radius2) / height)), Math.cos(theta - delta_theta / 2))).norm() ]);
            }
            plane_top.push(new See3D.Math3D.Point3D(0, 1, 0));
            plane_bottom.push(new See3D.Math3D.Point3D(0, -1, 0));
            this.planes.push(plane_top);
            this.planes.push(plane_bottom);
        }
    }
    class Prism extends Platform {
        constructor(position = See3D.Math3D.Point3D.Zero(), {
            pointCount, radius, height
        } = { }) {
            super(position, {
                pointCount: pointCount,
                radius1: radius,
                radius2: radius,
                height: height
            });
            this.type = "Prism";
        }
    }
    class Cloth extends Item {
        constructor(position = See3D.Math3D.Point3D.Zero(), {
            w, h, acc = 1
        } = { }) {
            super(position, See3D.Math3D.Point3D.Zero());
            this.type = "Cloth";
            this.points = [ ];
            this.planes = [ ];
            this.w = w;
            this.h = h;
            this.acc = acc;
            this.acc = acc;
            this.indexs = [];
            let wC = w / acc, hC = h / acc;
            for (let i = 0; i < wC; i++) {
                for (let j = 0; j < hC; j++) {
                    this.points.push(new Point3D(i * acc - w / 2, 0, j * acc - h / 2));
                    this.indexs.push([ ]);
                }
            }
            let quadrants = [
                [1, 1], [1, -1], [-1, 1], [-1, -1]
            ];
            for (let i = 1; i < wC - 1; i++) {
                for (let j = 1; j < hC - 1; j++) {
                    for (let k = 0; k < 4; k++) {
                        this.planes.push([ this.getIndex(i, j), this.getIndex(i + quadrants[k][0], j + quadrants[k][1]), this.getIndex(i + quadrants[k][0], j), new See3D.Math3D.Point3D(0, 1, 0) ]);
                        this.planes.push([ this.getIndex(i, j), this.getIndex(i + quadrants[k][0], j + quadrants[k][1]), this.getIndex(i, j + quadrants[k][1]), new See3D.Math3D.Point3D(0, 1, 0) ]);
                        this.indexs[this.getIndex(i, j)].push(this.planes.length - 1, this.planes.length - 2);
                        this.indexs[this.getIndex(i + quadrants[k][0], j + quadrants[k][1])].push(this.planes.length - 1, this.planes.length - 2);
                        this.indexs[this.getIndex(i + quadrants[k][0], j)].push(this.planes.length - 1, this.planes.length - 2);
                        this.indexs[this.getIndex(i, j + quadrants[k][1])].push(this.planes.length - 1, this.planes.length - 2);
                    }
                }
            }
            this.maxRadius = Math.sqrt(w ** 2 + h ** 2);
        }
        getIndex(x, y) {
            return x * parseInt(this.h / this.acc) + y;
        }
        select(x, y, cb) {
            let index;
            if (arguments.length === 3) index = this.getIndex(x, y);
            else {
                index = x;
                cb = y;
            }
            cb.call(this, this.points[index]);
            this.changeMaxRadius();
            // let planes = this.indexs[index];
            for (let i = 0; i < planes.length; i++) {
                let plane = this.planes[planes[i]];
                let {0: a, 1: b, 2: c} = plane;
                a = this.points[a];
                b = this.points[b];
                c = this.points[c];
                // plane[3] = new See3D.Math3D.Point3D((c.y - a.y)*(c.z - a.z) - (b.z -a.z)*(c.y - a.y));
                plane[3] = new See3D.Math3D.Point3D(0, 0, 0);
            }
            return this;
        }
        load(src, k = 1, d = 0) {
            let map = new See3D.Pix.ImagePix("map.jpeg", this.height / this.acc, this.width / this.acc);
            map.load().then(() => {
                for (let i = 0; i < map.px.data.length; i += 4) {
                    this.points[i / 4].y = map.px.data[i] * k + d;
                }
                this.changeMaxRadius();
                let planes = this.planes;
                for (let i = 0; i < planes.length; i++) {
                    let plane = planes[i];
                    let {0: a, 1: b, 2: c} = plane;
                    a = this.points[a];
                    b = this.points[b];
                    c = this.points[c];
                    plane[3] = new See3D.Math3D.Point3D((c.y - a.y)*(c.z - a.z) - (b.z -a.z)*(c.y - a.y));
                }
            });
        }
        get width() { return parseInt(this.w / this.acc); }
        get height() { return parseInt(this.h / this.acc); }
    }

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