
/** todo 新建一个Math3D库 */
!function (See3D) {
    let lib = new See3D.Library("Pix");// 生成一个新的See3D库
    class ImagePix {
        constructor(src, dw, dh) {
            this.src = src;
            this.img = null;
            this.width = this.height = 0;
            this.dw = dw;
            this.dh = dh;
            this.px = null;
        }
        load() {
            return new Promise(function (resolve, reject) {
                this.img = new Image();
                this.img.src = this.src;
                this.img.onload = () => {
                    let canvas = document.createElement("canvas");
                    let ctx = canvas.getContext("2d");
                    this.width = canvas.width = this.img.width;
                    this.height = canvas.height = this.img.height;
                    if (this.dw) canvas.width = this.dw;
                    if (this.dh) canvas.height = this.dh;
                    ctx.drawImage(this.img, 0, 0, this.dw ? this.dw : this.width, this.dh ? this.dh : this.height);
                    this.px = ctx.getImageData(0, 0, canvas.width, canvas.height);
                    resolve(true);
                };
                this.img.onerror = (e) => {
                    resolve(e);
                };
            }.bind(this));
        }
    }

    lib.define("ImagePix", ImagePix);

    lib.toSee3D();
    lib.global();// 将库API加入浏览器全局
}(See3D);