'bpo enable';

!function () {
    let lib = new See3D.Library("Math3D");// 生成一个新的See3D库

    // 支持的最小精度
    const smallest = 1e-5;
    
    function probably(n) {
        let v = Number(n.toFixed(5));
        if (v + smallest >= n) return v;
        return n;
    }

    // 枚举类型
    class Enum extends See3D.LibraryDefineObject {
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

    // 向量类
    class Vector extends See3D.LibraryDefineObject {
        constructor(arr) {
            super("Vector");
            this.array = [];
            for (let i of arr) this.array.push(i);
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
                // console.error(new Error("Error 102: Do not support scalar and vector for dot div operations"));
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
            super([x, y]);
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
            super([x, y, z]);
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
            super([x, y, z, w]);
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

    // 矩阵类
    class Matrix extends See3D.LibraryDefineObject {
        constructor(w, h, fill = 0) {
            super("Matrix");
            this.array = [];
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

    // 直线类
    class StraightLine2D extends See3D.LibraryDefineObject {
        constructor(x0, y0, x1, y1) {
            super("StraightLine");
            this.p0 = new Vector2(x0, y0);
            this.p1 = new Vector2(x1, y1);
            this.v = new Vector2(x1 - x0, y1 - y0);
        }
    }
    class StraightLine3D extends See3D.LibraryDefineObject {
        constructor(x0, y0, z0, x1, y1, z1) {
            super("StraightLine");
            this.p0 = new Vector3(x0, y0, z0);
            this.p1 = new Vector3(x1, y1, z1);
            this.v = new Vector3(x1 - x0, y1 - y0, z1 - z0);
        }
    }

    // 在库中定义所有的接口
    lib.define("smallest", smallest);
    lib.define("probably", probably);

    lib.define("Enum", Enum);

    lib.define("Vector", Vector);
    lib.define("Vector2", Vector2);
    lib.define("Vector3", Vector3);
    lib.define("Vector4", Vector4);

    lib.define("Matrix", Matrix);
    lib.define("Matrix2x2", Matrix2x2);

    lib.define("StraightLine2D", StraightLine2D);
    lib.define("StraightLine3D", StraightLine3D);

    lib.trans();// 在库的全局添加接口
    See3D.library(lib);// 将库加载入See3D中
    See3D.load("Math3D");// 将库加入See3D的默认加载队列
    if (See3D.DEBUG) See3D.loadGlobal("Math3D");
    if (See3D.DEBUG) lib.global();
    See3D.lib("Math3D");
}();