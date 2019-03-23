"use strict";
'bpo enable';

var _Op = function () {
  'bpo disable';

  return {
    add: function add(a, b) {
      if (a.operatorAdd) return a.operatorAdd(b);else return a + b;
    },
    selfAdd: function selfAdd(a, b) {
      if (a.operatorSelfAdd) return a.operatorSelfAdd(b);else return a += b;
    },
    sub: function sub(a, b) {
      if (a.operatorSub) return a.operatorSub(b);else return a - b;
    },
    selfSub: function selfSub(a, b) {
      if (a.operatorSelfSub) return a.operatorSelfSub(b);else return a -= b;
    },
    mul: function mul(a, b) {
      if (a.operatorMul) return a.operatorMul(b);else return a * b;
    },
    selfMul: function selfMul(a, b) {
      if (a.operatorSelfMul) return a.operatorSelfMul(b);else return a *= b;
    },
    div: function div(a, b) {
      if (a.operatorDiv) return a.operatorDiv(b);else return a / b;
    },
    selfDiv: function selfDiv(a, b) {
      if (a.operatorSelfDiv) return a.operatorSelfDiv(b);else return a /= b;
    },
    mod: function mod(a, b) {
      if (a.operatorMod) return a.operatorMod(b);else return a % b;
    },
    selfMod: function selfMod(a, b) {
      if (a.operatorSelfMod) return a.operatorSelfMod(b);else return a %= b;
    },
    pow: function pow(a, b) {
      if (a.operatorPow) return a.operatorPow(b);else return Math.pow(a, b);
    },
    binaryAnd: function binaryAnd(a, b) {
      if (a.operatorBinaryAnd) return a.operatorBinaryAnd(b);else return a & b;
    },
    binaryOr: function binaryOr(a, b) {
      if (a.operatorBinaryOr) return a.operatorBinaryOr(b);else return a | b;
    },
    binaryXor: function binaryXor(a, b) {
      if (a.operatorBinaryXor) return a.operatorBinaryXor(b);else return a ^ b;
    },
    binaryLShift: function binaryLShift(a, b) {
      if (a.operatorBinaryLShift) return a.operatorBinaryLShift(b);else return a << b;
    },
    binaryRShift: function binaryRShift(a, b) {
      if (a.operatorBinaryRShift) return a.operatorBinaryRShift(b);else return a >> b;
    },
    less: function less(a, b) {
      if (a.operatorLess) return a.operatorLess(b);else if (b.operatorGreater) return b.operatorGreater(a);else if (a.operatorGreaterEqual) return !a.operatorGreaterEqual(b);else return a < b;
    },
    greater: function greater(a, b) {
      if (a.operatorGreater) return a.operatorGreater(b);else if (b.operatorLess) return b.operatorLess(a);else if (a.operatorLessEqual) return !a.operatorLessEqual(b);else return a > b;
    },
    lessEqual: function lessEqual(a, b) {
      if (a.operatorLessEqual) return a.operatorLessEqual(b);else if (b.operatorGreaterEqual) return b.operatorGreaterEqual(a);else if (a.operatorGreater) return !a.operatorGreater(b);else return a <= b;
    },
    greaterEqual: function greaterEqual(a, b) {
      if (a.operatorGreaterEqual) return a.operatorGreaterEqual(b);else if (b.operatorLessEqual) return b.operatorLessEqual(a);else if (a.operatorLess) return !a.operatorLess(b);else return a >= b;
    },
    equal: function equal(a, b) {
      if (a.operatorEqual) return a.operatorEqual(b);else if (a.operatorNotEqual) return !a.operatorNotEqual(b);else if (b.operatorEqual) return b.operatorEqual(a);else if (b.operatorNotEqual) return !b.operatorNotEqual(a);else return a == b;
    },
    notEqual: function notEqual(a, b) {
      if (a.operatorNotEqual) return a.operatorNotEqual(b);else if (a.operatorEqual) return !a.operatorEqual(b);else if (b.operatorNotEqual) return b.operatorNotEqual(a);else if (b.operatorEqual) return !b.operatorEqual(a);else return a != b;
    }
  };
}();

console.log("=======Quaternion Test=======");
console.time("Quaternion");

var a = new Quaternion(1, 2, 3, 4);
var b = new Quaternion(1, 2, 3, 4);
var c = _Op.add(a, b);
var d = _Op.mul(a, b);
console.log(c);
console.log(d);
console.log(a.inverse());
console.log(a.conjugate());
console.log(_Op.mul(a, a.conjugate()));
console.log(a.mod());
console.log(a.mod2());
console.log(a.norm());
console.log(a.reciprocal());
console.log(_Op.mul(a, a.reciprocal()));

console.timeEnd("Quaternion");
console.log("=====Quaternion Test End=====");
//# sourceMappingURL=Quaternion.js.map