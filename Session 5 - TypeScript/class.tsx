// class Student {
//   private id: number;
//   private name: string;
//   private completedWeeks: number;

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



class Person {
  protected id: number;
  protected name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  getDetails(): string {
    return `ID: ${this.id}, Name: ${this.name}`;
  }
}

class Student extends Person {
  private completedWeeks: number;

  constructor(id: number, name: string) {
    super(id, name); 
    this.completedWeeks = 0;
  }

  completeWeek(): void {
    this.completedWeeks++;
    console.log(`${this.name} has completed week ${this.completedWeeks}.`);
  }

  getProgressReport(): string {
    return `${this.getDetails()} | Completed Weeks: ${this.completedWeeks}`;
  }
}

class Instructor extends Person {
  private expertise: string;

  constructor(id: number, name: string, expertise: string) {
    super(id, name);
    this.expertise = expertise;
  }

  assignHomework(): void {
    console.log(`${this.name} (Expert in ${this.expertise}) assigned homework.`);
  }
}

const student1 = new Student(101, "S1");
student1.completeWeek();
student1.completeWeek();
console.log(student1.getProgressReport());

const instructor1 = new Instructor(201, "S2", "TypeScript");
instructor1.assignHomework();
console.log(instructor1.getDetails());
