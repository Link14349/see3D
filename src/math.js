!function () {
    class BinaryTreeNode {
        constructor(key, value, cmp) {
            this._key = key;
            this._value = value;
            this._cmp = cmp;
            this._l = null;
            this._r = null;
        }
        key() {
            return this._key;
        }
        value(v) {
            if (v === undefined) {
                return this._value;
            }
            this._value = v;
            return this;
        }
        left(l) {
            if (l === undefined) {
                return this._l;
            }
            this._l = l;
            return this;
        }
        right(r) {
            if (r === undefined) {
                return this._r;
            }
            this._r = r;
            return this;
        }
        insert(node) {
            if (node.key() < this.key()) {// 说明要放到左边
                if (this.left()) {
                    this.left().insert(node);
                } else {
                    this.left(node);
                }
            } else {
                if (this.right()) {// 说明要放到右边
                    this.right().insert(node);
                } else {
                    this.right(node);
                }
            }
        }
        find(key) {
            // console.log(key);
            if (key == this.key()) return this;
            if (this.left() && key == this.left().key()) return this.left();
            if (this.right() && key == this.right().key()) return this.right();
            // console.log(key, this._l.key());
            if (this._l &&
                this._cmp(
                    this._l.key(),
                    key
                )) {// 如果左子树不为空并且这个key小于左节点的key,那么就在左子树中寻找
                return this._l.find(key);
            }
            // console.log(key, this._r.key());
            if (this._r &&
                this._cmp(
                    key,
                    this._r.key()
                )) {// 如果右子树不为空并且这个key小于右节点的key,那么就在右子树中寻找
                return this._r.find(key);
            }
            return null;
        }
        del() {
            delete this._l;
            delete this._r;
            delete this._key;
            delete this._value;
            delete this._cmp;
        }
        // 先根遍历
        PreOT(cb) {
            cb(this);
            if (this._l) this._l.PreOT(cb);
            if (this._r) this._r.PreOT(cb);
        }
        // 中根遍历
        InOT(cb) {
            if (this._l) this._l.InOT(cb);
            cb(this);
            if (this._r) this._r.InOT(cb);
        }
        // 后根遍历
        PostOT(cb) {
            if (this._l) this._l.PostOT(cb);
            if (this._r) this._r.PostOT(cb);
            cb(this);
        }
    }
    class BinaryTree {
        constructor(cmp) {
            this._root = null;
            this._cmp = cmp;
        }
        insert(key, value) {
            if (this._root) {
                this._root.insert(
                    new BinaryTreeNode(key, value, this._cmp)
                );
            } else {
                this._root = new BinaryTreeNode(key, value, this._cmp);
            }
        }
        find(key) {
            if (this._root) {
                return this._root.find(key);
            }
            return null;
        }
        del(key) {
            if (!this._root) return this;
            let node = this.find(key);
            if (node) node.del();
        }
        // 先根遍历
        PreOT(cb) {
            if (this._root) {
                this._root.PreOT(cb);
            }
        }
        // 中根遍历
        InOT(cb) {
            if (this._root) {
                this._root.InOT(cb);
            }
        }
        // 后根遍历
        PostOT(cb) {
            if (this._root) {
                this._root.PostOT(cb);
            }
        }
    }

    class Vector {
        constructor() {
            this._vector = [];
            this._primary = {
                key: null,
                cmp: function (a, b) {
                    return a > b;
                },
                use: false
            };
            for (let i in arguments) {
                this._vector.push(arguments[i]);
            }
        }
        offPrimary() {
            this._primary.use = false;
            return this;
        }
        primary(key, cmp) {
            this._primary.key = key;
            if (cmp !== undefined) this._primary.cmp = cmp;
            let values = [];
            if (this._primary.use) {
                this._vector.PreOT(function (th) {
                    values.push(th.value());
                });
            } else {
                values = this._vector;
            }
            // console.log(values);
            this._primary.use = true;
            this._vector = new See3D.BinaryTree(cmp);
            for (let i in values) {
                this._vector.insert(values[i][key], values[i]);
            }
            return this;
        }
        push(v) {
            this._vector.push(v);
            return this;
        }
        set(i, v) {
            if (this._primary.use) {
                let node = this._vector.find(i);
                if (node) {
                    node.value(v);
                }
            } else {
                this._vector[i] = v;
            }
            return this;
        }
        get(i) {
            if (this._primary.use) {
                let node = this._vector.find(i);
                return node ? node.value() : null;
            } else {
                return this._vector[i];
            }
        }
        find(cmp, cb) {
            this.each(function (item, index) {
                if (cmp(item)) {
                    cb(item, index);
                }
            });
        }
        find_bool(cmp) {
            this.each(function (item) {
                if (cmp(item)) {
                    return true;
                }
            });
            return false;
        }
        each(cb) {
            for (let i in this._vector) {
                cb(this._vector[i], i);
            }
        }
        length() {
            return this._vector.length;
        }
    }
    class Vector2 extends Vector {
        constructor(x, y) {
            super(x, y);
        }
        push() {}
        x(v) {
            if (v === undefined) {
                return this.get(0);
            }
            return this.set(0, v);
        }
        y(v) {
            if (v === undefined) {
                return this.get(1);
            }
            return this.set(1, v);
        }
    }
    class Vector3 extends Vector {
        constructor(x, y, z) {
            super(x, y, z);
        }
        push() {}
        x(v) {
            if (v === undefined) {
                return this.get(0);
            }
            return this.set(0, v);
        }
        y(v) {
            if (v === undefined) {
                return this.get(1);
            }
            return this.set(1, v);
        }
        z(v) {
            if (v === undefined) {
                return this.get(2);
            }
            return this.set(2, v);
        }
        static Zero() {
            return new Vector3(0, 0, 0);
        }
    }
    function dict(a, b) {
        if (a.length > b.length) return 1;
        if (a.length < b.length) return -1;
        for (let i = 0 ; i < a.length ; i++) {
            let tmp1 = a.charCodeAt(i);
            let tmp2 = b.charCodeAt(i);
            if (tmp1 < tmp2) {
                return -1;
            }
            if (tmp1 > tmp2) {
                return 1;
            }
        }
        return 0;
    }
    See3D.BinaryTree = BinaryTree;
    See3D.Vector = Vector;
    See3D.Vector2 = Vector2;
    See3D.Vector3 = Vector3;
    See3D.dict = dict;
}();