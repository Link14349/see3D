'bpo enable';

console.log("=========Vector Test=========");

let a = new Vector2(1, 1);
let b = new Vector2(1, 1);
console.log(a % b);
console.log(a ^ b);
console.log(a / 0.5);
console.log(a * 2);
console.log(a.proj(b));
console.log(a * b);
let c = new Vector3(1, 2, 3);
let d = new Vector3(4, 5, 6);
console.log(c * d);

console.log("=======Vector Test End=======");