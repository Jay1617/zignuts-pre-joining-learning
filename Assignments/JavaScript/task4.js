class University {
    constructor(name) {
        this.name = name;
        this.departments = [];
    }

    addDepartment(dept) {
        this.departments.push(dept);
    }

    removeDepartment(dept) {
        this.departments = this.departments.filter(d => d !== dept);
    }

    displayDepartments() {
        console.log(`Departments in ${this.name}:`);
        this.departments.forEach(d => console.log(d));
    }
}

const uni = new University("ABC University");
uni.addDepartment("Computer Science");
uni.addDepartment("Mathematics");
uni.addDepartment("Physics");
uni.displayDepartments();

uni.removeDepartment("Mathematics");
uni.displayDepartments();
