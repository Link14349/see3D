'bpo enable';

console.log("======MathSet Test======");
console.time("MathSet");

let R1 = new MathSet("{ n | -Infinity <= n && n <= +Infinity }");
let R2 = new MathSet("n", "-Infinity <= n && n <= +Infinity");
let R3 = new Interval("[]", -Infinity, +Infinity);
console.log(R1, R2, R3);
console.log(R1.have(0), R1.have(-100), R1.have(100), R1.have(-Infinity), R1.have(+Infinity));
console.log(R2.have(0), R2.have(-100), R2.have(100), R2.have(-Infinity), R2.have(+Infinity));
console.log(R3.have(0), R3.have(-100), R3.have(100), R3.have(-Infinity), R3.have(+Infinity));

console.timeEnd("MathSet");
console.log("====MathSet Test End====");