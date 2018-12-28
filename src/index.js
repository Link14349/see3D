/*!

 * See3D 开源的3D渲染引擎

 * yhzheng - v0.0.1 (Fri, 28 Dec 2018 10:53:42 GMT)

 * https://github.com/qianduanXIAOHAOZI/see3D | Released under MIT license

 * Copyright (c) 2018 yhzheng

*/

"use strict";

class See3D
{
    static VERSION() {
        return "v0.0.1";
    }
    constructor(dom, width, height) {
        this._dom = dom;
        this._ctx = dom.getContext("2d");
        this._width = dom.width;
        this._height = dom.height;
        this._scenes = new See3D.Vector();
        if (width !== undefined) {
            this._width = width;
            dom.width = width;
        }
        if (height !== undefined) {
            this._height = height;
            dom.height = height;
        }
    }
    width(w) {
        if (w === undefined) {
            return this._width;
        }
        this._width = w;
        this._dom.width = this._width;
        return this;
    }
    height(h) {
        if (h === undefined) {
            return this._height;
        }
        this._height = h;
        this._dom.height = this._height;
        return this;
    }
    size(w, h) {
        if (w === undefined || h === undefined) return [this._width, this._height];
        return this.width(w).height(h);
    }
    full() {
        this.size(window.innerWidth, window.innerHeight);
        this._dom.style.width = "100%";
        this._dom.style.height = "100%";
        this._dom.style.display = "block";
        let th = this;
        window.onresize = function () {
            th.size(window.innerWidth, window.innerHeight);
        };
        return this;
    }
    rebind(d) {
        if (d === undefined) return this._dom;
        this._dom = d;
        this._ctx = d.getContext("2d");
        this._width = d.width;
        this._height = d.height;
        return this;
    }
    ctx() {
        return this._ctx;
    }
    push(scene) {
        this._scenes.push(scene);
        return this;
    }
}