'bpo enable';

console.log("=========Matrix Test=========");

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

console.log("=======Matrix Test End=======");