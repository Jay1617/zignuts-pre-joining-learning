class University {
    constructor(name) {
        this.name = name;
        this.departments = [];
    }

    add(dept) {
        this.departments.push(dept);
    }

    remove(dept) {
        this.departments = this.departments.filter(d => d !== dept);
    }

    display() {
        console.log(`Departments in ${this.name}:`);
        this.departments.forEach(d => console.log(d));
    }
}

const uni = new University("ABC University");
uni.add("Computer Science");
uni.add("Mathematics");
uni.add("Physics");
uni.display();

uni.remove("Mathematics");
uni.display();
