'bpo enable';

console.log("=======Math Graph Test=======");
console.time("MathGraph");

let parmline2d = new Parmline2D(Vector2.Zero(), new Vector2(1, 1));
let parmline3d = new Parmline3D(Vector3.Zero(), new Vector3(1, 1, 1));
let plane3d = new Plane3D(new Vector3(0, 1, 0), Vector3.Zero());
let point = new Vector3(1, -1, 1);
console.log(parmline2d);
console.log(parmline3d);
console.log(plane3d);
console.log(PointPositionWithPlane(point, plane3d));

let p012d = new Parmline2D(new Vector2(1, 1), new Vector2(8, 5));
let p232d = new Parmline2D(new Vector2(3, 6), new Vector2(8, 3));
console.log(intersParmlines2D(p012d, p232d));

let p013d = new Parmline3D(new Vector3(1, 1), new Vector3(8, 5));
let p233d = new Parmline2D(new Vector3(3, 6), new Vector3(8, 3));
console.log(intersParmlines3D(p013d, p233d));

let plane = new Plane3D(new Vector3(0, 1, 0), Vector3.Zero());
let parmline = new Parmline3D(new Vector3(0, -1, 0), new Vector3(0, 1, 0));
console.log(intersParmlinePlane(plane, parmline));

console.timeEnd("MathGraph");
console.log("=====Math Graph Test End=====");