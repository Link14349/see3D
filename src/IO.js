'bpo enable';

!function () {
    let lib = new See3D.Library("IO");// 生成一个新的See3D库

    class sstream extends See3D.LibraryDefineObject {
        constructor() {
            super("Stream");
            this.str = "";
        }
        operatorBinaryLShift(b) {
            this.str += b;
            return this;
        }
        operatorBinaryRShift(b) {
            b << this.str;
            return this;
        }
    }

    class sostream extends sstream {
        constructor(see3d, size = 10, font = "sans-serif", color = "#fff") {
            super();
            this.__see3d = see3d;
            this.__ctx = see3d.ctx;
            this.x = 0;
            this.y = 0;
            this.__size = size;
            this.__font = font;
            this.__color = color;
            this.__ctx.fillStyle = color;
            this.startX = 0;
            this.startY = 0;
            this.update();
        }
        size(n) {
            if (n === undefined) return this.__size;
            if (this.__size > n)
                this.y += this.__size - n;
            this.__size = n;
            this.update();
            return this;
        }
        font(f) {
            if (f === undefined) return this.__font;
            this.__font = f;
            this.update();
            return this.__font;
        }
        update() {
            this.__ctx.font = `${this.size()}px ${this.font()}`;
        }
        reset() {
            this.x = this.startX;
            this.y = this.startY;
        }
        operatorBinaryLShift(b) {
            this.update();
            this.str += b;
            this.__ctx.textAlign = "left";
            this.__ctx.textBaseline = "top";
            this.__ctx.fillStyle = this.__color;
            // console.log(this.size(), this.__ctx);
            let words = b.split("\n");
            for (let i = 0; i < words.length; i++) {
                this.__ctx.fillText(words[i], this.x, this.y);
                if (i == words.length - 1)
                    this.x += this.__ctx.measureText(words[i]).x;
                else {
                    this.x = this.startX;
                    this.y += this.__ctx.measureText(words[i]).y;
                }
            }
            return this;
        }
    }

    lib.define("sstream", sstream);
    lib.define("sostream", sostream);

    lib.trans();
    See3D.library(lib);
    See3D.load("IO");
    if (See3D.DEBUG) See3D.loadGlobal("IO");
    if (See3D.DEBUG) lib.global();
    See3D.lib("IO");
}();