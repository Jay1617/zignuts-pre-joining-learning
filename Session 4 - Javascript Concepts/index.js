// let obj = {
//     1: "Ghost",
//     "nd": "ds",
//     "ndskn": "sdcs",
//     2: 18,
//     3: 2
// };

// // let obj2 = Object.create(obj);
// // // obj.__proto__ = 5; // assign a number
// // console.log(obj2.__proto__);

// let arr = [1, 2, 3, 4];

// for(o in obj) console.log(o);

// let user1 = "msg1"
// let user2 = user1

// user2 = "msg2"

// console.log(user1);
// console.log(user2);

// let user1 = {
//     name: "Ghost",
//     "age of person":20
// };

// let user2 = user1;

// user2["age of person"] = 21;
// console.log(user1);
// console.log(user2);

// user has a reference to the object
// let user = {
//   name: "John"
// };

// let admin = user;

// admin = null;
// console.log(user);
// console.log(admin);

// let arr = [10, 20, 30, 40];

// for (a of arr) {
//   console.log(a);
// }

// for (a in arr) {
//   console.log(a);
// }

// function a(){
//   b();
//   function b(){
//     console.log(c);
    
//   }
// }
// a();
// var c = 20;

function x(){
  for(let i=1; i<=5; i++){
    setTimeout(function (){
      console.log(i);
    }, i*1000);
  }
  console.log("Hey");
}

x();