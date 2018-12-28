"use strict";

!function () {
    class Scene {
        constructor() {
            this._s3 = null;
            this._items = new See3D.Vector();
            this._cameras = new See3D.Vector();
            this._usingCamera = null;
            this._items.primary("name", function cmp(a, b) {
                return See3D.dict(a, b) == 1;
            });
        }
        bind(s3) {
            this._s3 = s3;
            return this;
        }
        s3() {
            return this._s3;
        }
        push(item) {
            this._items.push(item);
            return this;
        }
        pushCamera(camera) {
            this._cameras.push(camera);
            if (!this._usingCamera) this._usingCamera = camera;
            return this;
        }
        usingCamera(camera) {
            this._usingCamera = camera;
            return this;
        }
        render(cb, finish_cb) {
            if (!this._usingCamera) return;
            this._usingCamera.render(this._items);
            if (finish_cb) finish_cb(this);
        }
    }
    See3D.Scene = Scene;
}();