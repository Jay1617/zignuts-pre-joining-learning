// class Student {
//   private id: number;
//   private name: string;
//   private completedWeeks: number;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
//   constructor(id: number, name: string) {
//     this.id = id;
//     this.name = name;
//     this.completedWeeks = 0;
//   }
//   completeWeek(): void {
//     this.completedWeeks++;
//     console.log(`${this.name} has completed week ${this.completedWeeks}.`);
//   }
//   getProgressReport(): string {
//     return `Student: ${this.name}, Completed Weeks: ${this.completedWeeks}`;
//   }
// }
// const student1 = new Student(101, "S1");
// student1.completeWeek();
// student1.completeWeek();
// console.log(student1.getProgressReport());
var Person = /** @class */ (function () {
    function Person(id, name) {
        this.id = id;
        this.name = name;
    }
    Person.prototype.getDetails = function () {
        return "ID: ".concat(this.id, ", Name: ").concat(this.name);
    };
    return Person;
}());
var Student = /** @class */ (function (_super) {
    __extends(Student, _super);
    function Student(id, name) {
        var _this = _super.call(this, id, name) || this;
        _this.completedWeeks = 0;
        return _this;
    }
    Student.prototype.completeWeek = function () {
        this.completedWeeks++;
        console.log("".concat(this.name, " has completed week ").concat(this.completedWeeks, "."));
    };
    Student.prototype.getProgressReport = function () {
        return "".concat(this.getDetails(), " | Completed Weeks: ").concat(this.completedWeeks);
    };
    return Student;
}(Person));
var Instructor = /** @class */ (function (_super) {
    __extends(Instructor, _super);
    function Instructor(id, name, expertise) {
        var _this = _super.call(this, id, name) || this;
        _this.expertise = expertise;
        return _this;
    }
    Instructor.prototype.assignHomework = function () {
        console.log("".concat(this.name, " (Expert in ").concat(this.expertise, ") assigned homework."));
    };
    return Instructor;
}(Person));
var student1 = new Student(101, "S1");
student1.completeWeek();
student1.completeWeek();
console.log(student1.getProgressReport());
var instructor1 = new Instructor(201, "S2", "TypeScript");
instructor1.assignHomework();
console.log(instructor1.getDetails());
