/*!

 * See3D 3D Rendering Engine Library

 * yhzheng - v0.0.1 (Wed Feb 27 2019 22:22:36 GMT+0800)

 * https://github.com/qianduanXIAOHAOZI/see3D/tree/master | Released under MIT license

 */
/**
 * @file index.js
 * @overview 提供整体接口
 */

// const DEBUG = true;

/**
 * @class See3D
 * @constructor
 * @desc See3D类是可以将一个canvas变为See3D画布的类，一切操作都依靠它 \n
 * 也是所有See3D API的容器，相当于一个module
 */
class See3D {
    constructor(dom = document.createElement("canvas")) {
        this.__dom = dom;
        this.__ctx = dom.getContext("2d");
        this.use = null;
        this.__fps = 0;
        this.end = true;
        this.alpha = See3D.FOV_x;
        this.beta = See3D.FOV_y;
        // this.alpha = this.beta = Math.max(this.alpha * this.height() / this.width(), this.alpha);
        // this.__time = 0;
        this.__BGC = See3D.defaultBGC;
        this.showFPS = false;
        this.clear = true;
    }
    get ctx() { return this.__ctx; }
    get dom() { return this.__dom; }
    width(w) {
        if (w === void(0)) {
            return this.__dom.width;
        }
        this.__dom.width = w;
        // this.alpha = this.beta = Math.max(this.alpha * this.height() / this.width(), this.alpha);
        return this;
    }
    height(w) {
        if (w === void(0)) {
            return this.__dom.height;
        }
        this.__dom.height = w;
        // this.alpha = this.beta = Math.max(this.alpha * this.height() / this.width(), this.alpha);
        return this;
    }
    full() {
        this
            .width(window.innerWidth)
            .height(window.innerHeight)
        ;
        return this;
    }
    resize() {
        this
            .width(window.innerWidth)
            .height(window.innerHeight)
        ;
    }
    scene(s) {
        this.use = s;
        s.game = this;
        return this;
    }
    render() {
        if (this.clear) {
            // console.log("clear");
            this.ctx.beginPath();
            this.ctx.fillStyle = this.__BGC;
            this.ctx.fillRect(0, 0, this.dom.width, this.dom.height);
            this.ctx.closePath();
        }
        this.ctx.save();
        this.ctx.translate(this.dom.width / 2, this.dom.height / 2);
        if (this.use) {
            this.use.render();
            this.ctx.restore();
        } else {
            this.ctx.restore();
            this.noView();
        }
        return this;
    }
    whileRender(up1, up2) {
        let preFPS = 60;
        this.__fps = 60;
        let startTS = (new Date()).getTime(), endTS;
        let updatePreFPS = startTS;
        window.requestAnimationFrame(function cb() {
            if (up1) up1();
            this.render();
            if (up2) up2();
            endTS = (new Date()).getTime();
            this.__fps = parseInt(1000 / (endTS - startTS));
            if (endTS - updatePreFPS >= 100) {
                preFPS = this.fps;
                updatePreFPS = endTS;
            }
            this.ctx.fillStyle = "#fff";
            this.ctx.font = "20px monospace";
            this.ctx.textBaseline = "top";
            this.ctx.fillText("FPS: " + preFPS, this.dom.width - 100, 0);
            startTS = endTS;
            window.requestAnimationFrame(cb.bind(this));
        }.bind(this));
    }
    noView() {
        let ctx = this.ctx;
        let {width, height} = this.dom;
        ctx.beginPath();
        ctx.fillStyle = this.__BGC;
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = "#fff";
        ctx.textAlign = "center";
        ctx.font = "50px Georgia";
        ctx.fillText("No View", width / 2, height / 2);
        ctx.closePath();
        return this;
    }
    static sendAjax(href, cb) {
        let xml = null;
        if (window.XMLHttpRequest) xml = new XMLHttpRequest();
        else xml = new ActiveXObject('Microsoft.XMLHTTP');
        xml.open("get", href, true);
        xml.send();
        xml.onreadystatechange = function() {
            if (xml.readyState == 4 && xml.status == 200) {
                cb(xml.responseText);
            }
        }
    }
    static loadModel(type, source) {
        this.sendAjax(source, (content) => {
            let lines = content.split("\n");
            let modelInfoLine = lines[0];
            let modelInfoLineSplits = modelInfoLine.split(" ");
            let name = modelInfoLineSplits[0], vertexCount = Number(modelInfoLineSplits[1]), planeCount = Number(modelInfoLineSplits[2]);
            let points = [];
            let planes = [];
            lines.forEach(((value, index, array) => {
            }));
        });
    }
    get fps() { return this.__fps; }
}

!function (See3D) {
    See3D.version = "v0.0.1";
    console.log("See3D engine (%s) launched", See3D.version);
    See3D.DEBUG = true;

    /**
     * @class Library
     * @constructor
     * @desc Library类提供了制作See3D类的接口
     */
    class Library {
        constructor(name) {
            this.name = name;
        }
        define(name, val) {
            this[name] = val;
            return this;
        }
        toSee3D() {
            See3D[this.name] = this;
        }
        global() {
            for (let i in this) {
                globalThis[i] = this[i];
            }
        }
    }
    See3D.Library = Library;

    // 设置See3D视野角度
    See3D.FOV_x = Math.PI / 180 * 120;
    See3D.FOV_y = Math.PI / 180 * 120;

    // 设置See3D默认背景颜色
    See3D.defaultBGC = "#33334a";
}(See3D);