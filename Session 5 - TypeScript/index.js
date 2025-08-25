"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var num = 10;
console.log(num);
var str = "Hello";
console.log(str);
var arr = [1, 2, 3];
console.log(arr);
var isActive = true;
console.log(isActive);
var person = {
    name: "Ghost",
    age: 30,
};
console.log(person);
var DarkMode;
(function (DarkMode) {
    DarkMode[DarkMode["DARK"] = 0] = "DARK";
    DarkMode[DarkMode["LIGHT"] = 1] = "LIGHT";
    DarkMode[DarkMode["SYSTEM"] = 2] = "SYSTEM";
})(DarkMode || (DarkMode = {}));
var theme = DarkMode.DARK;
console.log(theme);
var user1 = {
    id: 1,
    name: " Ghost",
    // age: 21,
};
console.log(user1);
var Dog = {
    name: "Tommy",
    age: 4,
    breed: "German Shepherd"
};
console.log(Dog);
