'bpo enable';

!function (See3D) {
    let lib = new See3D.Library("Physics");
    
    function crash(item1, item2) {
        if (item1.type == "Camera") {
            if (item2.type == "Camera") return (item1.position.x == item2.position.x && item1.position.y == item2.position.y && item1.position.z == item2.position.z);
            return crash(item2, item1);// 因为如果item1和item2相撞了，那么item2就也和item1相撞了
        }
        if (item1.type == "Point") {
            if (item2.type == "Point" || item2.type == "Camera") return (item1.position.x == item2.position.x && item1.position.y == item2.position.y && item1.position.z == item2.position.z);
            return false;
        }
        // console.log(item2);
        for (let i = 0; i < item1.planes.length; i++) {
            if (item2.type == "Point" || item2.type == "Camera") {
                let plane = new See3D.Plane3D(item1.planes[i]);
                plane.p0 = plane.p0 + item1.position;
                if (See3D.PointPositionWithPlane(item2.position, plane) > 0) {
                    return false;
                }
            } else {
                for (let j = 0; j < item2.points.length; j++) {
                    let point = new See3D.Vector3(item2.points[j]);
                    let plane = new See3D.Plane3D(item1.planes[i]);
                    point = point + item2.position;
                    plane.p0 = plane.p0 + item1.position;
                    // console.log(point, plane);
                    if (See3D.PointPositionWithPlane(point, plane) > 0) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    See3D.Item.method("crash", function (item) {
        return crash(this, item);
    });
    See3D.Item.method("crashAny", function () {
        let items = [];
        let sceneItems = this.scene.items;
        for (let i = 0; i < sceneItems.length; i++) {
            if (crash(this, sceneItems[i]) && this !== sceneItems[i]) items.push(sceneItems[i]);
        }
        // console.log(sceneItems);
        return items;
    });
    See3D.Item.method("noRigidBody", function (name) {
        if (this.noRigids === undefined) this.noRigids = {};
        this.noRigids[name] = true;
    });
    See3D.Item.method("RigidBody", function () {
        if (this.noRigids === undefined) this.noRigids = {};
        this.pushUpdate(function (self) {
            // let index = 0;
            let crashItem = self.crashAny()[0];
            if (!crashItem) return;
            let name = String(crashItem.name);
            if (self.noRigids[name]) return;
            // console.log(crashItem);
            let v = (new Vector3(
                self.position.x - crashItem.position.x,
                self.position.y - crashItem.position.y,
                self.position.z - crashItem.position.z,
            )).norm();
            if (isNaN(v.x) || isNaN(v.y) || isNaN(v.z)) {
                v.x = 1;
                v.y = 1;
                v.z = 1;
            }
            // console.log(v);
            // console.log(self.position.x, self.position.y, self.position.z);
            // console.log(crashItem.position.x, crashItem.position.y, crashItem.position.z);
            // console.log("=============");
            if (self.type == "Cube") console.log(self, crashItem, v);
            while (self.crash(crashItem)) {
                self.position = self.position + v;
                // console.log(self.position);
            }
            // console.log(self);
        });
    });

    lib.define("crash", crash);

    lib.trans();
    See3D.library(lib);
    See3D.load("Physics");
    if (See3D.DEBUG) {
        See3D.loadGlobal("Physics");// 将库加入浏览器全局
        lib.global();// 将库API加入浏览器全局
    }
    See3D.lib("Physics");
    lib.toSee3D();
}(See3D);