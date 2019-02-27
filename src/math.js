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
                console.error(new Error("Error 102: Do not support scalar and vector for dot div operations"));
                return null;
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

    lib.define("StraightLine2D", StraightLine2D);
    lib.define("StraightLine3D", StraightLine3D);

    lib.trans();// 在库的全局添加接口
    See3D.library(lib);// 将库加载入See3D中
    See3D.load("Math3D");// 将库加入See3D的默认加载队列
    lib.global();
    let a = new Vector2(1, 1);
    let b = new Vector2(1, 1);
    console.log(a % b);
    console.log(a ^ b);
    console.log(a / 0.5);
    console.log(a * 2);
}();