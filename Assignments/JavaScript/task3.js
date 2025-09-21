class Shape {
    area() {
        return 0; 
    }
}

class Circle extends Shape {
    constructor(r) {
        super();
        this.r = r;
    }

    area() {
        return Math.PI * this.r * this.r;
    }
}

class Triangle extends Shape {
    constructor(b, h) {
        super();
        this.b = b;
        this.h = h;
    }

    area() {
        return 0.5 * this.b * this.h;
    }
}

const circle = new Circle(5);
console.log("Circle Area:", circle.area()); 

const triangle = new Triangle(10, 5);
console.log("Triangle Area:", triangle.area()); 
