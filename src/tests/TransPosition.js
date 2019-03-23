'bpo enable';

console.log("=======Quaternion Test=======");
console.log("=====TransPosition  Test=====");
console.time("TransPosition");

console.log(rect3DToSpherical3D(new Vector3(0, 0, 0)));
console.log(spherical3DToRect3D(new Spherical3D(0, 0, 0)));
console.log(cylindrical3DToRect3D(new Cylindrical3D(0, 0, 0)));
console.log(rect2DToPolar2D(new Vector2(0, 0)));
console.log(polar2DToRect2D(new Polar2D(0, 0)));
console.log(polar2DToRect2D(new Polar2D(10, Math.PI)));
console.log(spherical3DToRect3D(new Spherical3D(10, Math.PI, Math.PI)));

console.timeEnd("TransPosition");
console.log("===TransPosition  Test End===");