"use strict";

!function () {
    class Camera extends See3D.Item {
        constructor(point, rotation) {
            super(point, rotation);
        }
    }
    See3D.Camera = Camera;
}();