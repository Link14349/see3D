"use strict";

!function () {
    class Item {
        constructor(point, _rotation) {
            this._point = point;
            this._rotation = _rotation;
        }
        move(point) {
            this._point = point;
            return this;
        }
        rotate(rotation) {
            this._rotation = rotation;
            return this;
        }
        point() {
            return this._point;
        }
        rotation() {
            return this._rotation;
        }
    }
    See3D.Item = Item;
}();