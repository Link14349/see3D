'bpo enable';

console.log("=======Quaternion Test=======");
console.time("Quaternion");

let a = new Quaternion(1, 2, 3, 4);
let b = new Quaternion(1, 2, 3, 4);
let c = a + b;
let d = a * b;
console.log(c);
console.log(d);
console.log(a.inverse());
console.log(a.conjugate());
console.log(a * a.conjugate());
console.log(a.mod());
console.log(a.mod2());
console.log(a.norm());
console.log(a.reciprocal());
console.log(a * a.reciprocal());

console.timeEnd("Quaternion");
console.log("=====Quaternion Test End=====");