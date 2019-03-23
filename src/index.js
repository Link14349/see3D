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
        this.loadGlobal();
        this.bindLibrary("IO");
        this.bindLibrary("Math3D");
        this.sout = new See3D.IO.$sostream(this);
    }
    width(w) {
        if (w === void(0)) {
            return this.__dom.width;
        }
        this.__dom.width = w;
        return this;
    }
    height(w) {
        if (w === void(0)) {
            return this.__dom.height;
        }
        this.__dom.height = w;
        return this;
    }
    full() {
        this
            .width(window.innerWidth)
            .height(window.innerHeight)
        ;
        return this;
    }
    /**
     * @function loadGlobal
     * @desc 将所有全局库加载入该See3D实例
     */
    loadGlobal() {
        for (let i of See3D.__loads) {
            this.load(i);
        }
        return this;
    }
    bindLibrary(name) {// 将该库的所有API加入该See3D实例
        let lib = this[name];
        for (let i in lib.defines) {
            this[i] = lib.defines[i];
        }
    }
    /**
     * @function load
     * @param {string} name
     * @desc 加载指定库到See3D对象中
     */
    load(name) {
        this[name] = See3D.__libraries.get(name);
        return this;
    }
    get dom() {
        return this.__dom;
    }
    get ctx() {
        return this.__ctx;
    }
    /**
     * @function library
     * @param {See3D.Library} entry
     * @desc 添加See3D库
     */
    static library(entry) {
        // entry
        console.log("%cSee3D library %s loaded.", "color:#FF1493", entry.name);
        See3D.__libraries.set(entry.name, entry);
    }
    /**
     * @function load
     * @param {String} name
     * @desc 添加应默认自带的库
     */
    static load(name) {
        console.log("%cSee3D library %s added to See3D global.", "color:#C71585", name);
        See3D.__loads.push(name);
    }
    /**
     * @function loadGlobal
     * @param {String} name
     * @desc 将该库导入到全局环境
     */
    static loadGlobal(name) {
        globalThis[name] = See3D.__libraries.get(name);
    }
    static lib(name) {
        See3D[name] = See3D.__libraries.get(name);
        return See3D.__libraries.get(name);
    }
}

!function () {
    See3D.version = "v0.0.1";
    console.log("See3D engine (%s) launched", See3D.version);
    See3D.DEBUG = true;
    /**
     * @property
     * @private
     */
    See3D.__libraries = new Map();
    /**
     * @property
     * @private
     */
    See3D.__loads = [];

    /**
     * @class Library
     * @constructor
     * @desc Library类提供了制作See3D类的接口
     */
    class Library {
        constructor(name) {
            this.name = name;
            this.defines = {};
        }
        define(name, val) {
            this.defines[name] = val;
            return this;
        }
        get(name) {
            if (this.defines[name].private) {
                console.error(new Error("Error 201: It's a private value"));
            }
            return this.defines[name];
        }
        trans() {
            for (let i in this.defines) {
                this["$" + i] = this.defines[i];
            }
        }
        global() {
            for (let i in this.defines) {
                globalThis[i] = this.defines[i];
            }
        }
    }
    // 所有的See3D库类接口都必须继承自该类
    class LibraryDefineObject {
        constructor(type) {
            this.type = type;
        }
        transType() {
            return null;
        }
    }
    function checkType(obj, type) {
        return obj.type == type;
    }
    function translate(type, obj) {
        return obj.transType(type);
    }
    See3D.Library = Library;
    See3D.LibraryDefineObject = LibraryDefineObject;
    See3D.checkType = checkType;
    See3D.translate = translate;
}();