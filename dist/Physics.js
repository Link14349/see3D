"use strict";
'bpo enable';

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
    var lib = new See3D.Library("Physics");

    function crash(item1, item2) {
        if (_Op.equal(item1.type, "Camera")) {
            if (_Op.equal(item2.type, "Camera")) return _Op.equal(item1.position.x, item2.position.x) && _Op.equal(item1.position.y, item2.position.y) && _Op.equal(item1.position.z, item2.position.z);
            return crash(item2, item1); // 因为如果item1和item2相撞了，那么item2就也和item1相撞了
        }
        if (_Op.equal(item1.type, "Point")) {
            if (_Op.equal(item2.type, "Point") || _Op.equal(item2.type, "Camera")) return _Op.equal(item1.position.x, item2.position.x) && _Op.equal(item1.position.y, item2.position.y) && _Op.equal(item1.position.z, item2.position.z);
            return false;
        }
        for (var i = 0; _Op.less(i, item1.planes.length); i++) {
            if (_Op.equal(item2.type, "Point") || _Op.equal(item2.type, "Camera")) {
                var plane = new See3D.Plane3D(item1.planes[i]);
                plane.p0 = _Op.add(plane.p0, item1.position);
                if (_Op.greater(See3D.PointPositionWithPlane(item2.position, plane), 0)) {
                    return false;
                }
            } else {
                for (var j = 0; _Op.less(j, item2.points.length); j++) {
                    var point = new See3D.Vector3(item2.points[j]);
                    var _plane = new See3D.Plane3D(item1.planes[i]);
                    point = _Op.add(point, item2.position);
                    _plane.p0 = _Op.add(_plane.p0, item1.position);
                    // console.log(point, plane);
                    if (_Op.greater(See3D.PointPositionWithPlane(point, _plane), 0)) {
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
        var items = [];
        var sceneItems = this.scene.items;
        for (var i = 0; _Op.less(i, sceneItems.length); i++) {
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
            var crashItem = self.crashAny()[0];
            if (!crashItem) return;
            var name = String(crashItem.name);
            if (self.noRigids[name]) return;
            // console.log(crashItem);
            var v = new Vector3(_Op.sub(self.position.x, crashItem.position.x), _Op.sub(self.position.y, crashItem.position.y), _Op.sub(self.position.z, crashItem.position.z)).norm();
            if (isNaN(v.x) || isNaN(v.y) || isNaN(v.z)) {
                v.x = 1;
                v.y = 1;
                v.z = 1;
            }
            // console.log(v);
            // console.log(self.position.x, self.position.y, self.position.z);
            // console.log(crashItem.position.x, crashItem.position.y, crashItem.position.z);
            // console.log("=============");
            if (_Op.equal(self.type, "Cube")) console.log(self, crashItem, v);
            while (self.crash(crashItem)) {
                self.position = _Op.add(self.position, v);
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
        See3D.loadGlobal("Physics"); // 将库加入浏览器全局
        lib.global(); // 将库API加入浏览器全局
    }
    See3D.lib("Physics");
    lib.toSee3D();
}(See3D);
//# sourceMappingURL=Physics.js.map