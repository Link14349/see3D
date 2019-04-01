'bpo enable';

!function () {
    let lib = new See3D.Library("View");

    class Item extends See3D.LibraryDefineObject {
        constructor(p = See3D.Vector3.Zero(), r = See3D.Vector3.Zero()) {
            super("Item");
            this.position = p;
            this.rotation = r;
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
        constructor(p, r, name, scene) {
            super(p, r);
            this.type = "Camera";
            this.scene = scene;
            this.__name = name;
        }
        render() {
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
            let near_d = 0.1;
            let far_d = 1000;
            // console.log(d);
            // console.log("update");
            for (let i = 0; i < items.length; i++) {
                let p = new See3D.Vector3(items[i].position);
                p.array.push(1);
                itemPoints.push(p * trans);
            }
            // console.log(itemPoints);
            for (let i = 0; i < itemPoints.length; i++) {
                // console.log(itemPoints[i].get(2));
                if (itemPoints[i].get(2) < near_d || itemPoints[i].get(2) > far_d) continue;// 超出远近裁面
                // console.log(itemPoints[i]);
                let screenPos = new See3D.Vector2(
                    itemPoints[i].get(0) * d / itemPoints[i].get(2) * 100,
                    -itemPoints[i].get(1) * d / itemPoints[i].get(2) * 100,// 因为在canvas上向下y坐标增加，和数学上相反，所以需要取反操作
                );
                ctx.beginPath();
                ctx.arc(screenPos.x, screenPos.y, 5, 0, Math.PI * 2);
                ctx.fillStyle = "#fff";
                ctx.fill();
                ctx.closePath();
                // console.log(screenPos);
            }
            return this;
        }
        get name() {
            return this.__name;
        }
    }

    class entity extends Item {
        constructor(p, r, planes) {
            super(p, r);
            this.planes = planes;
        }
    }

    class Point extends entity {
        constructor(p = See3D.Vector3.Zero(), size = 10) {
            super(p, See3D.Vector3.Zero());
            this.type = "Point";
            this.r = size;
        }
    }
    // class PlaneView extends Item {
    //     constructor(p = See3D.Vector3.Zero(), r = See3D.Vector3.Zero(), points = [], bind) {
    //         super(p, r);
    //         this.points = points;
    //         this.bind = bind;
    //     }
    //     trans() {
    //         let points = [];
    //         for (let i = 0; i < this.points.length; i++) {
    //             points.push(new See3D.Vector3(this.points[i].x + this.bind.x, this.points[i].y + this.bind.y, this.points[i].z + this.bind.z));
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
    //         super(p, See3D.Vector3.Zero(), [
    //             new PlaneView(new See3D.Vector3(p.x + s.x, p.y, p.z), See3D.Vector3.Zero(), [
    //                 new See3D.Vector3(p.x + s.x, p.y + s.y, p.z + s.z),
    //                 new See3D.Vector3(p.x + s.x, p.y + s.y, p.z - s.z),
    //                 new See3D.Vector3(p.x + s.x, p.y - s.y, p.z - s.z),
    //                 new See3D.Vector3(p.x + s.x, p.y - s.y, p.z + s.z),
    //                 new See3D.Vector3(p.x + s.x, p.y + s.y, p.z + s.z),
    //             ]),
    //             new PlaneView(new See3D.Vector3(p.x, p.y + s.y, p.z), See3D.Vector3.Zero(), [
    //                 new See3D.Vector3(p.x - s.x, p.y + s.y, p.z - s.z),
    //                 new See3D.Vector3(p.x - s.x, p.y + s.y, p.z + s.z),
    //                 new See3D.Vector3(p.x + s.x, p.y + s.y, p.z + s.z),
    //                 new See3D.Vector3(p.x + s.x, p.y + s.y, p.z - s.z),
    //                 new See3D.Vector3(p.x - s.x, p.y + s.y, p.z - s.z),
    //             ]),
    //             new PlaneView(new See3D.Vector3(p.x, p.y, p.z - s.z), See3D.Vector3.Zero(), [
    //                 new See3D.Vector3(p.x - s.x, p.y + s.y, p.z - s.z),
    //                 new See3D.Vector3(p.x + s.x, p.y + s.y, p.z - s.z),
    //                 new See3D.Vector3(p.x + s.x, p.y - s.y, p.z - s.z),
    //                 new See3D.Vector3(p.x - s.x, p.y - s.y, p.z - s.z),
    //                 new See3D.Vector3(p.x + s.x, p.y + s.y, p.z - s.z),
    //             ]),
    //         ]);
    //     }
    // }

    lib.define("Item", Item);// virtual

    lib.define("Scene", Scene);
    lib.define("Camera", Camera);// renderer

    lib.define("entity", entity);// virtual

    lib.define("Point", Point);

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