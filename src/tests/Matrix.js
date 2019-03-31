'bpo enable';

console.log("=========Matrix Test=========");
console.time("Matrix");

let a = new Matrix(2, 2, [[0, 1], [2, 3]]);
let b = new Matrix(2, 2, [[0, 1], [2, 3]]);
let c =
    new Matrix2x2([
        [0, 1],
        [2, 3]
    ]);
console.log(a.T());
console.log(a + b);
console.log(a - b);
console.log(a * b);
console.log(c.inverse());
let d = new Matrix(a);
console.log(d);

let t = a;
for (let i = 0; i < 100; i++) {
    t = t * b;
}
console.log(t);

console.timeEnd("Matrix");
console.log("=======Matrix Test End=======");