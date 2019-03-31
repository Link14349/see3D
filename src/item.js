'bpo enable';

!function () {
    let lib = new See3D.Library("View");

    class Item extends See3D.LibraryDefineObject {
        constructor(p = Vector3.Zero(), r = Vector3.Zero()) {
            super("Item");
            this.position = p;
            this.rotation = r;
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
            let itemPoints = [];
            let move = See3D.Matrix.TransMoveInverse(this.position);
            // console.log("update");
            for (let i = 0; i < items.length; i++) {
                let p = items[i].position;
                p.array.push(1);
                itemPoints.push(p * move);
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
        constructor(p = Vector3.Zero(), size = 10) {
            super(p, Vector3.Zero());
            this.type = "Point";
            this.r = size;
        }
    }
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