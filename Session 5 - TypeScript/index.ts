let num: number = 10;
console.log(num);

let str: string = "Hello";
console.log(str);

let arr: number[] = [1, 2, 3];
console.log(arr);

let isActive: boolean = true;
console.log(isActive);

const person: { name: string; age: number } = {
  name: "Ghost",
  age: 30,
};
console.log(person);

enum DarkMode {
  DARK,
  LIGHT,
  SYSTEM,
}
let theme: DarkMode = DarkMode.DARK;
console.log(theme);

interface User {
  id: number;
  name: string;
  age?: number; //means this is optional
}

let user1: User = {
  id: 1,
  name: " Ghost",
  // age: 21,
};
console.log(user1);

type Animal = {
  name: string,
  age: number
}

type Breed = {
  breed: string
}
const Dog: Animal & Breed = {
  name: "Tommy",
  age: 4,
  breed: "German Shepherd"
}

console.log(Dog);




export {};
