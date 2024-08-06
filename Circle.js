class Point {
    constructor(pos = createVector(Math.random()*width, Math.random()*height), stroke = 16, color = "black") {
        this.pos = pos
        this.stroke = stroke;
    }
    
    draw(x = this.pos.x, y = this.pos.y) {
        stroke("black");
        strokeWeight(this.stroke);
        point(x, y);
    }
}

class Circle extends Point {
    constructor(shape, constraint = 20, tail = null) {
        super(createVector(Math.random()*width, Math.random()*height), 8);
        this.shape = shape;
        this.constraint = constraint;
        this.tail = tail;
    }

    setTail(tail) {
        if(!this.tail) {
            this.tail = tail;
        } else {
            console.log("Tail already set");
        }
    }

    moveTail() { //OR AKA UPDATE
        if(this.tail) {
            let dx = this.pos.x - this.tail.pos.x;
            let dy = this.pos.y - this.tail.pos.y;
            let currentDistance = sqrt(dx * dx + dy * dy);
            if (currentDistance !== this.constraint) {
                let angle = atan2(dy, dx);
                this.tail.pos.x = this.pos.x - cos(angle) * this.constraint/2;
                this.tail.pos.y = this.pos.y - sin(angle) * this.constraint/2;
            }
        } else {
            return;
        }
    }

    update() {
        this.moveTail()
    }

    draw(x = this.pos.x, y = this.pos.y) {
        //super.draw(x, y); // FOR DIPLAYING CENTER POINTS
        //this.update()
        stroke("black");
        strokeWeight(2);
        fill(0,0,0,0)
        ellipse(x, y, this.shape, this.shape);
        if(this.tail) {
            line(x, y, this.tail.pos.x, this.tail.pos.y);
        }
    }
}