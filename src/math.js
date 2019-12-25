/** todo 为String类型添加方法 */
!function () {
    String.prototype.last = function () {
        return this[this.length - 1];
    };
}();

/** todo 新建一个Math3D库 */
!function (See3D) {
    let lib = new See3D.Library("Math3D");// 生成一个新的See3D库

    class Point2D {
        constructor(x = 0, y = 0) {
            this.__x = x;
            this.__y = y;
            this.binding = null;
        }
        inverse() {
            return new Point2D(-this.x, -this.y);
        }
        get x() { return this.__x; }
        get y() { return this.__y; }
        set x(n) { if (this.binding) this.binding.rx(n); return this.__x = n; }
        set y(n) { if (this.binding) this.binding.ry(n); return this.__y = n; }
    }

    class Point3D {
        constructor(x = 0, y = 0, z = 0) {
            this.x = x;
            this.y = y;
            this.z = z;
        }
        add(p) {
            if (p === undefined) debugger;
            return new Point3D(p.x + this.x, p.y + this.y, p.z + this.z);
        }
        addTo(p) {
            this.x += p.x;
            this.y += p.y;
            this.z += p.z;
            return this;
        }
        sub(p) {
            return new Point3D(this.x - p.x, this.y - p.y, this.z - p.z);
        }
        subTo(p) {
            this.x -= p.x;
            this.y -= p.y;
            this.z -= p.z;
            return this;
        }
        mul(v) {
            return this.x * v.x + this.y * v.y + this.z * v.z;
        }
        mul_(v) {
            return new Point3D(this.x * v.x, this.y * v.y, this.z * v.z);
        }
        mul_Real(v) {
            return new Point3D(this.x * v, this.y * v, this.z * v);
        }
        mod() {
            return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2);
        }
        mod2() {
            return this.x ** 2 + this.y ** 2 + this.z ** 2;
        }
        norm() {
            let mod = this.mod();
            return new Point3D(
                this.x / mod,
                this.y / mod,
                this.z / mod,
            );
        }
        inverse() {
            return new Point3D(-this.x, -this.y, -this.z);
        }
        inverseTo() {
            this.x *= -1;
            this.y *= -1;
            this.z *= -1;
            return this;
        }
        mappingTo(ta, tb, w) {
            return [w * this.x / (2 * this.z * ta), -w * this.y / (2 * this.z * tb)];
            // return [this.x * 10, this.y * 10];
        }
        eq(a) {
            return this.x == a.x && this.y == a.y && this.z == a.z;
        }
        copy() { return new Point3D(this.x, this.y, this.z); }
        rotate(s) {
            const SSX = Math.sin(s.x);
            const CSX = Math.cos(s.x);
            const CSY = Math.cos(s.y);
            const SSY = Math.sin(s.y);
            const CSZ = Math.cos(s.z);
            const SSZ = Math.sin(s.z);
            return new Point3D(
                (this.x * CSY + this.y * SSX * SSY - this.z * CSX * SSY) * CSZ + (this.y * CSX + this.z * SSX) * SSZ,
                (this.y * CSX + this.z * SSX) * CSZ - (this.x * CSY + this.y * SSX * SSY - this.z * CSX * SSY) * SSZ,
                this.x * SSY - this.y * SSX * CSY + this.z * CSX * CSY
            );
        }
        static Zero() {
            return new Point3D();
        }
    }
    class Parmline3D {
        constructor(v0, v1) {
            this.p0 = v0.copy();
            this.p1 = v1.copy();
            this.v = v1.sub(v0);
            this.v_ = this.v.norm();
        }
    }

    /** todo 平面类 */
    class Plane3D {
        constructor(n, d) {
            this.n = n.copy();// 法线向量
            this.p = d;
        }
    }
    function intersParmlinePlane(parmline, plane) {
        // console.log(parmline);
        let { p0, v_ } = parmline;
        let { p, n }  = plane;
        let d = p.sub(p0).mul(n) / v_.mul(n);
        return v_.mul_Real(d).add(p0);
    }


    lib.define("Point2D", Point2D);
    lib.define("Point3D", Point3D);
    lib.define("Plane3D", Plane3D);
    lib.define("Parmline3D", Parmline3D);
    lib.define("intersParmlinePlane", intersParmlinePlane);

    lib.toSee3D();
    lib.global();// 将库API加入浏览器全局
}(See3D);