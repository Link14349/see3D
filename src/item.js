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
        }
        rotate(r) {
            this.rotation = new Vector3(this.rotation.get(0) + r.get(0), this.rotation.get(1) + r.get(1), this.rotation.get(2) + r.get(2));
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
            let near_d = d + 0.1;
            let far_d = 1000;
            // console.log(d);
            // console.log("update");
            for (let i = 0; i < items.length; i++) {
                if (items[i].type == "Point") {
                    let p = new See3D.Vector3(items[i].position);
                    p.array.push(1);
                    itemPoints.push(p * trans);
                } else {
                    itemPoints.push([[], []]);
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
                    ctx.fillStyle = "#fff";
                    ctx.fill();
                    ctx.closePath();
                } else {
                    let r = Camera.r(item);
                    if (item.position.z - r > far_d) continue;// 超过远裁面
                    if (item.position.z + r < near_d) continue;// 小于近裁面
                    if (
                        item.position.x - r > Math.tan(See3D.FOV_x / 2) * item.position.z
                    ) continue;// 超出视景体右边缘
                    if (
                        item.position.x + r < -Math.tan(See3D.FOV_x / 2) * item.position.z
                    ) continue;// 超出视景体左边缘
                    if (
                        item.position.y - r > Math.tan(See3D.FOV_y / 2) * item.position.z
                    ) continue;// 超出视景体上边缘
                    if (
                        item.position.y + r < -Math.tan(See3D.FOV_y / 2) * item.position.z
                    ) continue;// 超出视景体下边缘
                    // console.log(r);
                    // console.log("a");
                    // console.log(item, itemPoints[i]);
                    ctx.beginPath();
                    // for (let j = 0; j < itemPoints[i][1].length; j++) {}
                    for (let k = 0; k < itemPoints[i][0].length; k++) {
                        // console.log(itemPoints[i][0][k]);
                        let screenPos = new See3D.Vector2(
                            itemPoints[i][0][k].get(0) * d / itemPoints[i][0][k].get(2) * 100,
                            -itemPoints[i][0][k].get(1) * d / itemPoints[i][0][k].get(2) * 100,// 因为在canvas上向下y坐标增加，和数学上相反，所以需要取反操作
                        );
                        // if (item.type == "Cube") console.log(screenPos.x, screenPos.y);
                        // ctx.arc(screenPos.x, screenPos.y, 5, 0, Math.PI * 2);
                        if (k == 0) ctx.moveTo(screenPos.x, screenPos.y);
                        else ctx.lineTo(screenPos.x, screenPos.y);
                        // ctx.fillStyle = "#fff";
                        // ctx.fill();
                    }
                    ctx.strokeStyle = "#fff";
                    ctx.stroke();
                    ctx.closePath();
                    // console.log("==============");
                    // for (let i = 0; i < item.points.length; i++) {
                    //     let x = item.points[i].x + item.position.x;
                    //     let y = item.points[i].y + item.position.y;
                    //     let z = item.points[i].z + item.position.z;
                    //     let screenPos = new See3D.Vector2(
                    //         x * d / z * 100,
                    //         -y * d / z * 100,// 因为在canvas上向下y坐标增加，和数学上相反，所以需要取反操作
                    //     );
                    //     // if (item.type == "Cube") console.log(screenPos.x, screenPos.y);
                    //     ctx.beginPath();
                    //     ctx.arc(screenPos.x, screenPos.y, 2, 0, Math.PI * 2);
                    //     ctx.fillStyle = "#fff";
                    //     ctx.fill();
                    //     ctx.closePath();
                    // }
                    // ctx.beginPath();
                    // ctx.arc(0, 0, 10, 0, Math.PI * 2);
                    // ctx.fillStyle = "#fff";
                    // ctx.fill();
                    // ctx.closePath();
                }
                // console.log(screenPos);
            }
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
                    "p0": [1, 0, 0]
                },
                {
                    "n": [-1, 0, 0],
                    "p0": [-1, 0, 0]
                },
                {
                    "n": [0, 1, 0],
                    "p0": [0, 1, 0]
                },
                {
                    "n": [0, -1, 0],
                    "p0": [0, -1, 0]
                },
                {
                    "n": [0, 0, 1],
                    "p0": [0, 0, 1]
                },
                {
                    "n": [0, 0, -1],
                    "p0": [0, 0, -1]
                },
            ]
        }
    };

    class entity extends Item {
        constructor(type, p, s, withItemConfig = true) {
            super(p);
            this.type = type;
            this.planes = [];
            this.points = [];
            this.s = s;
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
                this.points.push(new See3D.Vector3(...config["Points"][i]));
            }
            for (let i = 0; i < config["Planes"].length; i++) {
                let arrN = config["Planes"][i]["n"];
                let arrP0 = config["Planes"][i]["p0"];
                arrN[0] *= this.s.get(0);
                arrN[1] *= this.s.get(1);
                arrN[2] *= this.s.get(2);
                arrP0[0] *= this.s.get(0);
                arrP0[1] *= this.s.get(1);
                arrP0[2] *= this.s.get(2);
                this.planes.push(new See3D.Plane3D(
                    new Vector3(...arrN),
                    new Vector3(...arrP0),
                ));
            }
            return this;
        }
        rotate(r) {
            // console.log(r);
            this.rotation = new Vector3(this.rotation.get(0) + r.get(0), this.rotation.get(1) + r.get(1), this.rotation.get(2) + r.get(2));
            let rotation = See3D.Matrix.TransRotate(-r.get(0), -r.get(1), -r.get(2));
            for (let i = 0; i < this.points.length; i++) {
                this.points[i] = this.points[i] * rotation;
            }
            for (let i = 0; i < this.planes.length; i++) {
                this.planes[i].n = this.planes[i].n * rotation;
                this.planes[i].p0 = this.planes[i].p0 * rotation;
            }
        }
    }

    class Point extends entity {
        constructor(p = See3D.Vector3.Zero(), size = 10) {
            super("Point", p, null, false);
            this.r = size;
        }
    }
    class Cube extends entity {
        constructor(p = See3D.Vector3.Zero(), s = new See3D.Vector3(1, 1, 1)) {
            super("Cube", p, s);
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
        See3D.loadGlobal("Math3D");// 将库加入浏览器全局
        lib.global();// 将库API加入浏览器全局
    }
    See3D.lib("View");
    lib.toSee3D();
}();