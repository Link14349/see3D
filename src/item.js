'bpo enable';

!function () {
    let lib = new See3D.Library("View");

    class Item extends See3D.LibraryDefineObject {
        constructor(p = See3D.Vector3.Zero()) {
            super("Item");
            this.position = p;
            this.rotation = See3D.Vector3.Zero();
            // console.log(r);
            // this.rotate(r);
        }
        move(d) {
            let tmp = new Vector(this.position);
            tmp.push(1);
            let res = tmp * See3D.Matrix.TransMove(d);
            this.position = new Vector3(res.get(0), res.get(1), res.get(2));
            // console.log(this.position);
            return this;
        }
        rotate(r) {
            this.rotation = new Vector3(this.rotation.get(0) + r.get(0), this.rotation.get(1) + r.get(1), this.rotation.get(2) + r.get(2));
            return this;
        }
        left(d) {
            let r = this.rotation;
            let rotation = See3D.Matrix.TransRotate(new Vector3(-r.get(0), -r.get(1), -r.get(2)));
            let pos = new Vector4(d, 0, 0);
            let p = pos * rotation;
            this.position.x -= p.x;
            this.position.y += p.y;
            this.position.z += p.z;
            return this;
        }
        right(d) {
            return this.left(-d);
        }
        forward(d) {
            let r = this.rotation;
            let rotation = See3D.Matrix.TransRotate(new Vector3(-r.get(0), -r.get(1), -r.get(2)));
            let pos = new Vector4(0, 0, d);
            let p = pos * rotation;
            this.position.x -= p.x;
            this.position.y -= p.y;
            this.position.z += p.z;
            return this;
        }
        back(d) {
            return this.forward(-d);
        }
    }
    class Scene extends See3D.LibraryDefineObject {
        constructor(name, game) {
            super("Scene");
            this.game = game;
            this.items = [];
            this.cameras = {};
            this.use = null;
            this.__name = name;
        }
        get name() {
            return this.__name;
        }
        push(item) {
            if (item.type == "Camera") {
                let c = item;
                this.cameras[c.name] = c;
                if (!this.use) this.use = c;
            } else {
                this.items.push(item);
            }
            return this;
        }
        get ctx() {
            return this.game.ctx;
        }
        get dom() {
            return this.game.dom;
        }
        camera(cn) {
            this.use = this.cameras[cn];
            return this;
        }
        render() {
            if (this.use) {
                this.use.render();
            } else {
                this.noView();
            }
            return this;
        }
        noView() {
            this.game.noView();
            return this;
        }
    }
    class Camera extends Item {
        constructor(p, name, scene) {
            super(p);
            this.type = "Camera";
            this.scene = scene;
            this.__name = name;
            this.d = 0;
        }
        render() {
            // console.log("a");
            let items = this.scene.items;
            let ctx = this.scene.ctx;
            let {width: sw, height: sh} = this.scene.dom;
            let {FOV_x, FOV_y} = See3D;
            let itemPoints = [];
            let move = See3D.Matrix.TransMoveInverse(this.position);
            let rotate = See3D.Matrix.TransRotate(new See3D.Vector3(
                -this.rotation.x, -this.rotation.y, -this.rotation.z
            ));
            let trans = move * rotate;
            let d = Math.max(
                sw / 100 / (2 * Math.tan(FOV_x / 2)),
                sh / 100 / (2 * Math.tan(FOV_y / 2))
            );
            this.d = d;
            let near_d = 0.1;
            let far_d = 1000;
            items.sort(function (x, y) {
                let a = x.position, b = y.position;
                let ar = a.x * a.x + a.y * a.y + a.z * a.z;
                let br = b.x * b.x + b.y * b.y + b.z * b.z;
                if (ar > br) return 1;
                if (ar < br) return -1;
                return 0;
            });
            // console.log(d);
            // console.log("update");
            for (let i = 0; i < items.length; i++) {
                if (items[i].type == "Point") {
                    let p = new See3D.Vector3(items[i].position);
                    p.array.push(1);
                    itemPoints.push(p * trans);
                } else {
                    itemPoints.push([[], [],
                        (new See3D.Vector4(items[i].position.x, items[i].position.y, items[i].position.z, 1) * trans)
                    ]);
                    // console.log(items[i].points);
                    for (let j = 0; j < items[i].points.length; j++) {
                        let p = items[i].points[j] + items[i].position;
                        p.array.push(1);
                        itemPoints[itemPoints.length - 1][0].push(p * trans);
                    }
                    for (let j = 0; j < items[i].planes.length; j++) {
                        let p = items[i].planes[j].p0 + items[i].position;
                        p.array.push(1);
                        itemPoints[itemPoints.length - 1][1].push(new See3D.Plane3D(
                            items[i].planes[j].n, p * trans
                        ));
                    }
                    // console.log(itemPoints[itemPoints.length - 1]);
                }
                // if (items[i].type == "Cube")
                //     console.log(p * trans);
            }
            // console.log(itemPoints);
            for (let i = 0; i < itemPoints.length; i++) {
                // console.log(itemPoints[i].get(2));
                // console.log(itemPoints[i]);
                let item = items[i];
                if (item.type == "Point") {
                    if (itemPoints[i].get(2) < near_d || itemPoints[i].get(2) > far_d) continue;// 超出远近裁面
                    // console.log("a");
                    let screenPos = new See3D.Vector2(
                        itemPoints[i].get(0) * d / itemPoints[i].get(2) * 100,
                        -itemPoints[i].get(1) * d / itemPoints[i].get(2) * 100,// 因为在canvas上向下y坐标增加，和数学上相反，所以需要取反操作
                    );
                    ctx.beginPath();
                    ctx.arc(screenPos.x, screenPos.y, item.r, 0, Math.PI * 2);
                    ctx.fillStyle = items[i].color;
                    ctx.fill();
                    ctx.closePath();
                } else {
                    let r = Camera.r(item);
                    if (itemPoints[i][2].z - r > far_d) continue;// 超过远裁面
                    if (itemPoints[i][2].z + r < near_d) continue;// 小于近裁面
                    if (itemPoints[i][2].z < 0) continue;
                    if (
                        itemPoints[i][2].x - r > Math.tan(See3D.FOV_x / 2) * itemPoints[i][2].z
                    ) continue;// 超出视景体右边缘
                    if (
                        itemPoints[i][2].x + r < -Math.tan(See3D.FOV_x / 2) * itemPoints[i][2].z
                    ) continue;// 超出视景体左边缘
                    if (
                        itemPoints[i][2].y - r > Math.tan(See3D.FOV_y / 2) * itemPoints[i][2].z
                    ) continue;// 超出视景体上边缘
                    if (
                        itemPoints[i][2].y + r < -Math.tan(See3D.FOV_y / 2) * itemPoints[i][2].z
                    ) continue;// 超出视景体下边缘
                    for (let j = 0; j < items[i].planes.length; j++) {
                        // if (new See3D.Vector3(0, 1, 0) % items[i].planes[j].n <= 0) continue;
                        ctx.beginPath();
                        let sx, sy;
                        for (let k = 0; k < items[i].planes[j].points.length; k++) {
                            let point = itemPoints[i][0][items[i].planes[j].points[k]];
                            let screenPos = new See3D.Vector2(
                                point.get(0) * d / point.get(2) * 100,
                                -point.get(1) * d / point.get(2) * 100,// 因为在canvas上向下y坐标增加，和数学上相反，所以需要取反操作
                            );
                            if (k == 0) {
                                ctx.moveTo(screenPos.x, screenPos.y);
                                sx = screenPos.x;
                                sy = screenPos.y;
                            } else {
                                ctx.lineTo(screenPos.x, screenPos.y);
                            }
                        }
                        ctx.lineTo(sx, sy);
                        ctx.strokeStyle = items[i].color;
                        // ctx.fillStyle = items[i].color;
                        ctx.stroke();
                        // ctx.fill();
                        ctx.closePath();
                    }
                }
            }
            return this;
        }
        revolution(r) {
            let rotation = See3D.Matrix.TransRotate(new Vector3(r.get(0), r.get(1), r.get(2)));
            let test = new Vector3(this.position);
            test.push(1);
            test = test * rotation;
            this.position.x = test.x;
            this.position.y = test.y;
            this.position.z = test.z;
            return this;
        }
        static r(item) {
            let l = 0;
            for (let i = 0; i < item.points.length; i++) {
                let tmp = (item.points[i].x * item.points[i].x + item.points[i].y * item.points[i].y + item.points[i].z * item.points[i].z);
                if (l < tmp) {
                    l = tmp;
                }
            }
            l = Math.sqrt(l);
            return l;
        }
        get name() {
            return this.__name;
        }
    }

    let ITEM_CONFIG = {
        "Cube": {
            "Points": [
                [1, 1, 1],
                [1, 1, -1],
                [1, -1, 1],
                [1, -1, -1],
                [-1, 1, 1],
                [-1, 1, -1],
                [-1, -1, 1],
                [-1, -1, -1],
            ],
            "Planes": [
                {
                    "n": [1, 0, 0],
                    "p0": [1, 0, 0],
                    "points": [0, 2, 3, 1]
                },
                {
                    "n": [-1, 0, 0],
                    "p0": [-1, 0, 0],
                    "points": [4, 6, 7, 5]
                },
                {
                    "n": [0, 1, 0],
                    "p0": [0, 1, 0],
                    "points": [4, 6, 2, 0]
                },
                {
                    "n": [0, -1, 0],
                    "p0": [0, -1, 0],
                    "points": [5, 1, 3, 7]
                },
                {
                    "n": [0, 0, 1],
                    "p0": [0, 0, 1],
                    "points": [2, 0, 1, 3]
                },
                {
                    "n": [0, 0, -1],
                    "p0": [0, 0, -1],
                    "points": [4, 6, 7, 5]
                },
            ]
        }
    };

    class entity extends Item {
        constructor(type, p, s, color, withItemConfig = true) {
            super(p);
            this.type = type;
            this.planes = [];
            this.points = [];
            this.s = s;
            this.color = color;
            if (withItemConfig) {
                this.load();
            }
        }
        load() {
            let config = ITEM_CONFIG[this.type];
            if (!config) {
                console.error(new Error("Error 200: Configuration of the entity was not found.\nEnity type: " + this.type));
                return this;
            }
            // console.log(ITEM_CONFIG, this.type);
            for (let i = 0; i < config["Points"].length; i++) {
                let test = new See3D.Vector3(...config["Points"][i]);
                test.x *= this.s.x;
                test.y *= this.s.y;
                test.z *= this.s.z;
                this.points.push(test);
            }
            for (let i = 0; i < config["Planes"].length; i++) {
                let arrN = config["Planes"][i]["n"];
                let arrP0 = config["Planes"][i]["p0"];
                arrN[0] *= this.s.x;
                arrN[1] *= this.s.y;
                arrN[2] *= this.s.z;
                arrP0[0] *= this.s.x;
                arrP0[1] *= this.s.y;
                arrP0[2] *= this.s.z;
                this.planes.push(new See3D.Plane3D(
                    new Vector3(...arrN),
                    new Vector3(...arrP0),
                ));
                this.planes[this.planes.length - 1].points = config["Planes"][i]["points"];
            }
            return this;
        }
        rotate(r) {
            // console.log(r);
            this.rotation = new Vector3(this.rotation.get(0) + r.get(0), this.rotation.get(1) + r.get(1), this.rotation.get(2) + r.get(2));
            let rotation = See3D.Matrix.TransRotate(new Vector3(-r.get(0), -r.get(1), -r.get(2)));
            // console.log(-r.get(0), -r.get(1), -r.get(2));
            // console.log(rotation);
            for (let i = 0; i < this.points.length; i++) {
                this.points[i].push(1);
                this.points[i] = this.points[i] * rotation;
                this.points[i].array.pop();
                this.points[i] = new Vector3(...this.points[i].array);
            }
            for (let i = 0; i < this.planes.length; i++) {
                this.planes[i].n.push(1);
                this.planes[i].n = this.planes[i].n * rotation;
                this.planes[i].n.array.pop();
                this.planes[i].n = new Vector3(...this.planes[i].n.array);
                this.planes[i].p0 = new Vector3(this.planes[i].n);
            }
            return this;
        }
    }

    class Point extends entity {
        constructor(p = See3D.Vector3.Zero(), size = 10, color = "#fff") {
            super("Point", p, null, color, false);
            this.r = size;
        }
    }
    class Cube extends entity {
        constructor(p = See3D.Vector3.Zero(), s = new See3D.Vector3(1, 1, 1), color = "#fff") {
            s.x = (s.x == 0 ? s.x : s.x / 2);
            s.y = (s.y == 0 ? s.y : s.y / 2);
            s.z = (s.z == 0 ? s.z : s.z / 2);
            super("Cube", p, s, color);
        }
    }

    lib.define("Item", Item);// virtual

    lib.define("Scene", Scene);
    lib.define("Camera", Camera);// renderer

    lib.define("entity", entity);// virtual

    lib.define("ITEM_CONFIG", ITEM_CONFIG);
    lib.define("Point", Point);
    lib.define("Cube", Cube);

    lib.trans();
    See3D.library(lib);
    See3D.load("View");
    if (See3D.DEBUG) {
        See3D.loadGlobal("View");// 将库加入浏览器全局
        lib.global();// 将库API加入浏览器全局
    }
    See3D.lib("View");
    lib.toSee3D();
}();