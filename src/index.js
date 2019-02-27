class See3D {
    constructor(dom = document.createElement("canvas")) {
        this.__dom = dom;
        this.__ctx = dom.getContext("2d");
        this.loadGlobal();
    }
    loadGlobal() {
        for (let i of See3D.__loads) {
            this.load(i);
        }
    }
    load(name) {
        this[name] = See3D.__libraries.get(name);
    }
    get dom() {
        return this.__dom;
    }
    get ctx() {
        return this.__ctx;
    }
    static library(entry) {
        // entry
        See3D.__libraries.set(entry.name, entry);
    }
    static load(name) {
        See3D.__loads.push(name);
    }
    static loadGlobal(name) {
        globalThis[name] = See3D.__libraries.get(name);
    }
}

!function () {
    See3D.__libraries = new Map();
    See3D.__loads = [];
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
    }
    function checkType(obj, type) {
        return obj.type == type;
    }
    function translate(type, obj) {
        return obj.transType(type);
    }
    See3D.Library = Library;
    See3D.LibraryDefineObject = LibraryDefineObject;
    See3D.Console = LibraryDefineObject;
    See3D.checkType = checkType;
    See3D.translate = translate;
}();