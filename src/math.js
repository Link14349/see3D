'bpo enable';

/** todo 为String类型添加方法 */
!function () {
    String.prototype.last = function () {
        return this[this.length - 1];
    };
}();

/** todo 新建一个Math3D库 */
!function () {
    let lib = new See3D.Library("Math3D");// 生成一个新的See3D库

    /** todo 一些关于精度问题的转化 */
    // 支持的最小精度
    const smallest = 1e-5;
    const smallestLen = 5;

    function probably(n) {
        return Number(n.toFixed(smallestLen));
    }

    /** todo 枚举类型 */
    class Enum extends See3D.LibraryDefineObject {
        /*
        * 使用方法:
        * let colors = new Enum(["RED", "WHITE", "BLACK"])
        */
        constructor(enums) {
            super("Enum");
            let n = 0;
            for (let i in enums) {
                let v = enums[i];
                if (typeof v === "object") {
                    n = v[1];
                    v = v[0];
                }
                this[v] = n;
                this["$" + n] = v;
                n++;
            }
        }

        get(n) {
            return this["$" + n];
        }
    }

    /** todo 提供数学意义上的集合类 */
    // {(token) | expr}
    class MathSet extends See3D.LibraryDefineObject {
        constructor(token, expr) {
            super("MathSet");
            if (arguments.length == 1) {// 只有一个参数
                let str = token;
                str = str.trim();
                if (
                    str.length <= 2 ||
                    str[0] != "{" || str.last() != "}" // 不以'{'开头或不以'}'结尾
                ) {
                    console.error(new Error("Error 104: Illegal set string '" + str + "'"));
                    return;
                }
                str = str.substring(1, str.length - 1);
                token = "";

                let splitIndex = str.search(/\|/);
                if (splitIndex < 0) {
                    console.error(new Error("Error 104: Illegal set string '" + str + "'"));
                    return;
                }

                // 获取token
                for (let i = 0; i < splitIndex; i++) {
                    token += str[i];
                }
                token = token.trim();

                expr = "";
                // 获取expr
                for (let i = splitIndex + 1; i < str.length; i++) {
                    expr += str[i];
                }
            }
            this.token = token;
            this.expr = expr;
        }
        have(n) {
            let expr = this.expr.replace(new RegExp("([^a-zA-Z_])" + this.token + "([^a-zA-Z_])", "g"), "$1" + n + "$2");
            return Boolean(eval(expr));
        }
    }

    /** todo 提供区间类 */
    class Interval extends MathSet {
        constructor(type, s, e) {
            // super("Interval");
            let st, et;// 存储是开还是闭
            const token = "n";// 变量名, {x | a < x < b}
            let expr = "";
            let firstOp, lastOp;
            if (arguments.length == 1) {// 只有一个参数
                let str = type;
                str = str.trim();
                st = str[0];
                et = str.last();

                // 检查类型
                if (st != "[" && st != "(") {
                    console.error(new Error("Error 103: Illegal interval identifier '" + st + "'"));
                    return;
                }
                if (et != "]" && et != ")") {
                    console.error(new Error("Error 103: Illegal interval identifier '" + et + "'"));
                    return;
                }
                str = str.substring(1, str.length - 1);
                let numbers = str.split(",");
                if (numbers.length < 2) str.split(/\s+/g);
                if (st == "[") firstOp = "<=";
                if (st == "(") firstOp = "<";
                if (et == "]") lastOp = "<=";
                if (et == ")") lastOp = "<";
                s = numbers[0];
                e = numbers[1];
                expr = s + firstOp + token + " && " + token + lastOp + e;
                // this.st = st;
                // this.et = et;
                // this.s = numbers[0];// 区间的第一个数
                // this.e = numbers[1];// 区间的第二个数
            } else {
                st = type[0];
                et = type[1];
                // 检查类型
                if (st != "[" && st != "(") {
                    console.error(new Error("Error 103: Illegal interval identifier '" + st + "'"));
                    return;
                }
                if (et != "]" && et != ")") {
                    console.error(new Error("Error 103: Illegal interval identifier '" + et + "'"));
                    return;
                }
                if (st == "[") firstOp = "<=";
                if (st == "(") firstOp = "<";
                if (et == "]") lastOp = "<=";
                if (et == ")") lastOp = "<";
                // console.log(firstOp, lastOp, s, e);
                expr = String(s) + firstOp + token + " && " + token + lastOp + String(e);
            }
            super(token, expr);
        }
    }

    /** todo 向量类 */
    // WARNING: %代表点积, *代表叉乘
    class Vector extends See3D.LibraryDefineObject {
        constructor(arr) {
            super("Vector");
            this.array = [];
            if (arr.type && arr.type == "Vector") for (let i of arr.array) this.array.push(i);
            else for (let i of arr) this.array.push(i);
        }
        set(index, val) {
            this.array[index] = val;
            return this;
        }
        get(index) {
            return this.array[index];
        }
        mod() {
            let sum = 0;
            for (let i of this.array) {
                sum += i ** 2;
            }
            return Math.sqrt(sum);
        }
        get length() {
            return this.array.length;
        }
        // 点积
        operatorMod(b) {
            if (typeof b === "number") {
                console.error(new Error("Error 102: Do not support scalar and vector for dot product operations"));
                return null;
            }
            if (b.type === "Vector") {
                if (b.length != this.length) {
                    console.error(new Error("Error 100: Vector size does not match"));
                    return null;
                }
                let sum = 0;
                for (let i in this.array) {
                    sum += this.array[i] * b.array[i];
                }
                return sum;
            }
        }
        operatorAdd(b) {
            if (typeof b === "number") {
                let tmp = new Vector([]);
                tmp.array = tmp.array.concat(this.array);
                for (let i in this.array) {
                    tmp.array[i] += b;
                }
                return tmp;
            } else {
                if (b.type === "Vector") {
                    if (b.length != this.length) {
                        console.error(new Error("Error 100: Vector size does not match"));
                        return null;
                    }
                    let v = [];
                    for (let i in this.array) {
                        v.push(this.array[i] + b.array[i]);
                    }
                    return new Vector(v);
                }
            }
        }
        operatorSub(b) {
            if (typeof b === "number") {
                let tmp = new Vector([]);
                tmp.array = tmp.array.concat(this.array);
                for (let i in this.array) {
                    tmp.array[i] -= b;
                }
                return tmp;
            } else {
                if (b.type === "Vector") {
                    if (b.length != this.length) {
                        console.error(new Error("Error 100: Vector size does not match"));
                        return null;
                    }
                    let v = [];
                    for (let i in this.array) {
                        v.push(this.array[i] - b.array[i]);
                    }
                    return new Vector(v);
                }
            }
        }
        operatorDiv(b) {
            if (typeof b === "number") {
                let tmp = new Vector([]);
                tmp.array = tmp.array.concat(this.array);
                for (let i in this.array) {
                    tmp.array[i] /= b;
                }
                return tmp;
            } else {
                console.error(new Error("Error 102: Do not support scalar and vector for dot div operations"));
                return null;
            }
        }
        operatorMul(b) {
            if (typeof b === "number") {
                let tmp = new Vector([]);
                tmp.array = tmp.array.concat(this.array);
                for (let i in this.array) {
                    tmp.array[i] *= b;
                }
                return tmp;
            } else {
                // 叉乘
                let a = new Matrix(this.length, 1, [this.array]);
                let arr = [];
                for (let i = 0; i < b.length; i++) {
                    arr.push([b.array[i]]);
                }
                b = new Matrix(1, b.length, arr);
                // console.log(a);
                // console.log(b);
                return a * b;
            }
        }
        operatorBinaryXor(b) {
            if (typeof b === "number") {
                console.error(new Error("Error 102: Do not support scalar and vector for dot product operations"));
                return null;
            }
            if (b.type === "Vector") {
                let res = this % b;
                res /= this.mod();
                res /= b.mod();
                res = Math.acos(res);
                return probably(res);
            }
        }
        trans(type) {
            if (type.search(/vector/i)) {
                if (this.length == 2) return new Vector2(...this.array);
                if (this.length == 3) return new Vector3(...this.array);
                if (this.length == 4) return new Vector4(...this.array);
                return new Vector(this.array);
            }
        }
        norm() {
            return this / this.mod();
        }
        proj(u) {// 投影
            let v = this.norm();
            let n = v * (u % v);
            return n / (v.mod() * v.mod());
        }
        operatorEqual(b) {
            if (b.length != this.length) {
                console.error(new Error("Error 100: Vector size does not match"));
                return null;
            }
            for (let i = 0; i < this.length; i++) {
                if (b.array[i] != this.array[i]) return false;
            }
            return true;
        }
    }
    class Vector2 extends Vector {
        constructor(x = 0, y = 0) {
            if (x.type && x.type == "Vector") super(x);
            else super([x, y]);
        }
        get x() {
            return this.get(0);
        }
        set x(n) {
            this.set(0, n);
            return n;
        }
        get y() {
            return this.get(1);
        }
        set y(n) {
            this.set(1, n);
            return n;
        }
        static Zero() {
            return new Vector2();
        }
    }
    class Vector3 extends Vector {
        constructor(x = 0, y = 0, z = 0) {
            if (x.type && x.type == "Vector") super(x);
            else super([x, y, z]);
        }
        get x() {
            return this.get(0);
        }
        set x(n) {
            this.set(0, n);
            return n;
        }
        get y() {
            return this.get(1);
        }
        set y(n) {
            this.set(1, n);
            return n;
        }
        get z() {
            return this.get(2);
        }
        set z(n) {
            this.set(2, n);
            return n;
        }
        static Zero() {
            return new Vector3();
        }
        // operatorMul(b) {
        //     console.log(b);
        //     if (typeof b === "number") {
        //         let tmp = new Vector([]);
        //         tmp.array = tmp.array.concat(this.array);
        //         for (let i in this.array) {
        //             tmp.array[i] *= b;
        //         }
        //         return tmp;
        //     } else {
        //         // 叉乘
        //         // let m = new Matrix(3, 3, [
        //         //     [new Vector3(1, 0, 0), new Vector3(0, 1, 0), new Vector3(0, 0, 1)]
        //         // ]);
        //         let a = new Matrix(this.length, 1, [this.array]);
        //         console.log(a);
        //         return null;
        //     }
        // }
    }
    class Vector4 extends Vector {
        constructor(x = 0, y = 0, z = 0, w = 1) {
            if (x.type && x.type == "Vector") super(x);
            else super([x, y, z, w]);
        }
        get x() {
            return this.get(0) / this.w;
        }
        set x(n) {
            this.set(0, n);
            return n;
        }
        get y() {
            return this.get(1) / this.w;
        }
        set y(n) {
            this.set(1, n);
            return n;
        }
        get z() {
            return this.get(2) / this.w;
        }
        set z(n) {
            this.set(2, n);
            return n;
        }
        get w() {
            return this.get(3);
        }
        set w(n) {
            this.set(3, n);
            return n;
        }
        static Zero() {
            return new Vector4();
        }
    }

    /** todo 矩阵类 */
    class Matrix extends See3D.LibraryDefineObject {
        constructor(w, h, fill = 0) {
            super("Matrix");
            this.array = [];
            if (w.type && w.type == "Matrix") {// 复制构造函数
                this.__w = w.w;
                this.__h = w.h;
                for (let i = 0; i < this.__h; i++) {
                    this.array.push([]);
                    for (let j = 0; j < this.__w; j++) {
                        this.array[i].push(w.array[i][j]);
                    }
                }
            } else {
                this.__w = w;
                this.__h = h;
                for (let i = 0 ;i < h; i++) {
                    this.array.push([]);
                    for (let j = 0; j < w; j++) {
                        if (typeof fill === "number")
                            this.array[i].push(fill);
                        else
                            this.array[i].push(fill[i][j]);
                    }
                }
            }
        }
        get w() {
            return this.__w;
        }
        get h() {
            return this.__h;
        }
        T() {
            let matrix = new Matrix(this.__h, this.__w);
            for (let i = 0 ;i < this.__w; i++) {
                for (let j = 0; j < this.__h; j++) {
                    matrix.array[i][j] = this.array[j][i];
                }
            }
            return matrix;
        }
        size() {
            return new Vector2(this.__w, this.__h);
        }
        get(i, j) {
            return this.array[i][j];
        }
        set(i, j, v) {
            this.array[i][j] = v;
            return this;
        }
        operatorAdd(b) {
            // console.log(this.size() == b.size());
            if (this.size() != b.size()) {
                console.error(new Error("Error 100: Matrix size does not match"));
                return null;
            }
            let c = new Matrix(this.w, this.h, this.array);
            for (let i = 0; i < this.h; i++) {
                for (let j = 0; j < this.w; j++) {
                    c.array[i][j] += b.array[i][j];
                }
            }
            return c;
        }
        operatorSub(b) {
            // console.log(this.size() == b.size());
            if (this.size() != b.size()) {
                console.error(new Error("Error 100: Matrix size does not match"));
                return null;
            }
            let c = new Matrix(this.w, this.h, this.array);
            for (let i = 0; i < this.h; i++) {
                for (let j = 0; j < this.w; j++) {
                    c.array[i][j] -= b.array[i][j];
                }
            }
            return c;
        }
        operatorMul(b) {
            // console.log(this.size() == b.size());
            if (typeof b == "object") {
                if (this.w != b.h) {
                    console.error(new Error("Error 100: Matrix size does not match"));
                    return null;
                }
                let n = this.w;
                let c = new Matrix(this.h, b.w, 0);
                for (let i = 0; i < this.h; i++) {
                    for (let j = 0; j < b.w; j++) {
                        let sum = 0;
                        for (let k = 0; k < n; k++) {
                            sum += this.array[i][k] * b.array[k][j];
                        }
                        c.array[i][j] = sum;
                    }
                }
                return c;
            } else {
                let c = new Matrix(this.w, this.h, [].concat(this.array));
                for (let i = 0; i < this.h; i++) {
                    for (let j = 0; j < this.w; j++) {
                        c.array[i][j] *= b;
                    }
                }
                return c;
            }
        }
        static identity(s) {
            let matrix = new Matrix(s, s);
            for (let i = 0; i < s; i++) {
                matrix.array[i][i] = 1;
            }
            return matrix;
        }
        static Zero(w, h) {
            return new Matrix(w, h);
        }
    }
    class Matrix2x2 extends Matrix {
        constructor(fill) {
            super(2, 2, fill);
        }
        inverse() {
            let tmp = 1 / this.det();
            let c = new Matrix2x2([[this.array[1][1], -this.array[0][1]], [-this.array[1][0], this.array[0][0]]]);
            c = c * tmp;
            return c;
        }
        det() {
            return this.array[0][0] * this.array[1][1] + this.array[0][1] * this.array[1][0];
        }
    }

    /** todo 直线类 */
    // 表示方法: 参数化直线
    // 即: 起点, 终点, 方向
    // p(x, y, z) = p0 + v_ * t
    // t ∈ [-∞, +∞]
    class Parmline2D extends See3D.LibraryDefineObject {
        constructor(v0, v1) {
            super("Parmline");
            this.p0 = new Vector2(v0);
            this.p1 = new Vector2(v1);
            this.v = new Vector2(v1 - v0);
            this.v_ = this.v.norm();
        }
    }
    class Parmline3D extends See3D.LibraryDefineObject {
        constructor(v0, v1) {
            super("Parmline");
            this.p0 = new Vector3(v0);
            this.p1 = new Vector3(v1);
            this.v = new Vector3(v1 - v0);
            this.v_ = this.v.norm();
        }
    }

    /** todo 平面类 */
    // 表示方法: 点-法线形式
    // a * (x - x0) + b * (y - y0) + c * (z - z0) = 0
    // 或
    // a * x + b * y + c * z + (-a * x0 - b * y0 - c * z0) = 0
    class Plane3D extends See3D.LibraryDefineObject {
        constructor(n, p0) {
            super("Plane");
            this.n = new Vector3(n);// 法线向量
            this.p0 = new Vector3(p0);// 平面上一点
        }
    }


    /** todo 平面分割3D空间, 判断点位于哪个半空间中, -1为负半空间, 0为平面上, 1为正半空间 */
    function PointPositionWithPlane(point, plane) {
        let a = plane.n.x, b = plane.n.y, c = plane.n.z;
        let hs = a * (point.x - plane.p0.x) + b * (point.y - plane.p0.y) + c * (point.z - plane.p0.z);
        if (hs > 0) return 1;
        if (hs < 0) return -1;
        return 0;
    }


    /** todo 计算两参数化2D线段的交点 */
    function intersParmlines2D(pl1, pl2) {
        let p0 = pl1.p0;
        let p2 = pl2.p0;
        let a = p0.x, b = p0.y, c = p2.x, d = p2.y;
        let p0v = pl1.v;
        let p2v = pl2.v;
        let e = p0v.x, f = p0v.y, g = p2v.x, h = p2v.y;
        // console.log(a, b, c, d, e, f, g, h);
        let t1 =
            (h * (c - a) - g * (d - b))
            /
            (h * e - g * f)
        ;
        // let t2 =
        //     (-c + a + e * t1)
        //     /
        //     g
        // ;
        let x = a + e * t1;
        let y = b + f * t1;
        return new Vector2(x, y);
    }
    /** todo 计算两参数化3D线段的交点 */
    function intersParmlines3D(pl1, pl2) {
        let p0 = pl1.p0;
        let p2 = pl2.p0;
        let a = p0.x, b = p0.y, c = p2.x, d = p2.y;
        let p0v = pl1.v;
        let p2v = pl2.v;
        let e = p0v.x, f = p0v.y, g = p2v.x, h = p2v.y;
        // console.log(a, b, c, d, e, f, g, h);
        let t1 =
            (h * (c - a) - g * (d - b))
            /
            (h * e - g * f)
        ;
        // let t2 =
        //     (-c + a + e * t1)
        //     /
        //     g
        // ;
        let x = a + e * t1;
        let y = b + f * t1;
        let z = p0.z + p0v.z * t1;
        return new Vector3(x, y, z);
    }

    const tInterval = new Interval("[0, 1]");

    /** todo 计算参数化直线与平面的交点 */
    function intersParmlinePlane(plane, parmline) {
        // console.log(parmline);
        let {x: x0, y: y0, z: z0} = parmline.p0;
        let {x: vx, y: vy, z: vz} = parmline.v;
        let {x: a, y: b, z: c} = plane.n;
        let d = -a * x0 - b * y0 - c * z0;
        let t =
            -(a * x0 + b * y0 + c * z0 + d)
            /
            (a * vx + b * vy + c * vz)
        ;
        let x = x0 * vx * t;
        let y = y0 * vy * t;
        let z = z0 * vz * t;
        return new Vector3(x, y, z);
    }
    /** todo 计算参数化线段与平面的交点 */
    function intersSegmentPlane(parmline, plane) {
        let {x: x0, y: y0, z: z0} = parmline.p0;
        let {x: vx, y: vy, z: vz} = parmline.v;
        let {x: a, y: b, z: c} = plane.n;
        let d = -a * x0 - b * y0 - c * z0;
        let t =
            -(a * x0 + b * y0 + c * z0 + d)
            /
            (a * vx + b * vy + c * vz)
        ;
        if (!tInterval.have(t)) return null;
        let x = x0 * vx * t;
        let y = y0 * vy * t;
        let z = z0 * vz * t;
        return new Vector3(x, y, z);
    }

    /** todo 提供四元数类 */
    class Quaternion extends See3D.LibraryDefineObject {
        constructor(q0 = 0, q1 = 0, q2 = 0, q3 = 0) {
            super("Quaternion");
            this.q0 = q0;
            if (typeof q0 == "object" && arguments.length == 1) {// 复制构造函数
                let q = q0;
                this.q0 = q.q0;
                this.qv = new Vector3(q.qv);
            } else if (arguments.length == 2) {
                this.qv = new Vector3(q1);
            } else {
                this.qv = new Vector3(q1, q2, q3);
            }
        }
        operatorAdd(b) {
            return new Quaternion(this.q0 + b.q0, this.qv + b.qv);
        }
        operatorSub(b) {
            return new Quaternion(this.q0 - b.q0, this.qv - b.qv);
        }
        operatorMul(q) {
            let p = this;
            // let a = p.q0 * q.qv;
            // let b = q.q0 * p.qv;
            // let c = p.qv * q.qv;
            let r = new Quaternion(
                p.q0 * q.q0 - (p.qv % q.qv),
                (q.qv * p.q0 + p.qv * q.q0 + p.qv * q.qv)
            );
            // console.log((p.q0 * q.qv + q.q0 * p.qv + p.qv * q.qv));
            return r;
        }
        operatorDiv(b) {
            if (typeof b == "number") {
                let q = new Quaternion(this);
                q.q0 /= b;
                q.qv = q.qv / b;
                return q;
            }
            if (b.type == "Quaternion") {
                let b_ = b.reciprocal();
                return this * b_;
            }
        }
        inverse() {// 加法逆元素
            return new Quaternion(-this.q0, -this.qv.x, -this.qv.y, -this.qv.z);
        }
        conjugate() {// 共轭四元数
            return new Quaternion(this.q0, -this.qv.x, -this.qv.y, -this.qv.z);
        }
        mod() {
            return Math.sqrt(
                this.q0 * this.q0 +
                this.qv.x * this.qv.x +
                this.qv.y * this.qv.y +
                this.qv.z * this.qv.z
            );
        }
        mod2() {// 范数平方
            return this.q0 * this.q0 +
                this.qv.x * this.qv.x +
                this.qv.y * this.qv.y +
                this.qv.z * this.qv.z;
        }
        norm() {
            return this / this.mod();
        }
        reciprocal() {
            return this.conjugate() / this.mod2();
        }
        static One() {// 乘法恒等元
            return new Quaternion(1);
        }
        static Zero() {// 加法恒等元
            return new Quaternion();
        }
    }

    // 在库中定义所有的接口
    lib.define("smallest", smallest);
    lib.define("smallestLen", smallestLen);
    lib.define("probably", probably);

    lib.define("Enum", Enum);
    lib.define("MathSet", MathSet);
    lib.define("Interval", Interval);

    lib.define("Vector", Vector);
    lib.define("Vector2", Vector2);
    lib.define("Vector3", Vector3);
    lib.define("Vector4", Vector4);

    lib.define("Matrix", Matrix);
    lib.define("Matrix2x2", Matrix2x2);

    lib.define("Parmline2D", Parmline2D);
    lib.define("Parmline3D", Parmline3D);
    lib.define("Plane3D", Plane3D);
    lib.define("PointPositionWithPlane", PointPositionWithPlane);
    lib.define("intersParmlines2D", intersParmlines2D);
    lib.define("intersParmlines3D", intersParmlines3D);
    lib.define("intersParmlinePlane", intersParmlinePlane);
    lib.define("intersSegmentPlane", intersSegmentPlane);

    lib.define("Quaternion", Quaternion);

    lib.trans();// 在库的全局添加接口
    See3D.library(lib);// 将库加载入See3D中
    See3D.load("Math3D");// 将库加入See3D的默认加载队列
    if (See3D.DEBUG) See3D.loadGlobal("Math3D");
    if (See3D.DEBUG) lib.global();
    See3D.lib("Math3D");
}();