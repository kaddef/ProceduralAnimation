class Fish {
    shapes = [34, 40, 42, 41, 38, 32, 25, 19, 16, 10];

    constructor() {
        this.spine = new Chain2(this.shapes, 32);
    }

    draw() {
        this.spine.update();

        // Draw Front Fins
        fill("#7cbcce");
        stroke("#c0d8e5");
        push();
        translate(this.getPosX(3, PI/2), this.getPosY(3, PI/2));
        rotate(this.spine.angles[2] - PI/4);
        ellipse(0,0, 20, 40)
        pop();
        push();
        translate(this.getPosX(3, -PI/2), this.getPosY(3, -PI/2));
        rotate(this.spine.angles[2] + PI/4);
        ellipse(0,0, 20, 40)
        pop();
        // Draw Back Fins
        push();
        translate(this.getPosX(7, PI/2), this.getPosY(7, PI/2));
        rotate(this.spine.angles[6] - PI/4);
        ellipse(0,0, 10, 20)
        pop();
        push();
        translate(this.getPosX(7, -PI/2), this.getPosY(7, -PI/2));
        rotate(this.spine.angles[6] + PI/4);
        ellipse(0,0, 10, 20)
        pop();
        
        stroke("#c0d8e5");
        fill("#367da6")
        strokeWeight(3);
        beginShape();
        // Extra points for head
        curveVertex(this.getPosX(0, PI+PI/4), this.getPosY(0, PI+PI/4));//RIGHT
        curveVertex(this.getPosX(0, PI), this.getPosY(0, PI));//CENTER
        curveVertex(this.getPosX(0, PI-PI/4), this.getPosY(0, PI-PI/4));//LEFT

        // Draw left side
        for (let i = 0; i < this.spine.chain.length; i++) {
            curveVertex(this.getPosX(i, PI/2), this.getPosY(i, PI/2));
        }

        // Extra point for tail
        curveVertex(this.getPosX(this.shapes.length-1, 2*PI), this.getPosY(this.shapes.length-1, 2*PI));//CENTER
        
        // Draw right side
        for (let i = this.spine.chain.length-1; i >= 0; i--) {
            curveVertex(this.getPosX(i, -PI/2), this.getPosY(i, -PI/2));
        }
        
        // Some overlapping
        curveVertex(this.getPosX(0, -PI/2), this.getPosY(0, -PI/2));
        curveVertex(this.getPosX(0, PI+PI/4), this.getPosY(0, PI+PI/4));
        curveVertex(this.getPosX(0, PI), this.getPosY(0, PI));

        endShape(CLOSE);

        // Draw Eyes
        stroke("white");
        strokeWeight(8);
        point(this.getPosX(0, PI/2, -8), this.getPosY(0, PI/2, -8));
        point(this.getPosX(0, -PI/2, -8), this.getPosY(0, -PI/2, -8));
        stroke("black");
        strokeWeight(3);
        point(this.getPosX(0, PI/2, -8), this.getPosY(0, PI/2, -8));
        point(this.getPosX(0, -PI/2, -8), this.getPosY(0, -PI/2, -8));

        // Draw Dorsal Fin
        // Draw Caudal Fin
    }

    // THESE ARE FOR PARAMETRIC EQUATION
    getPosX(index, angleOffset, lengthOffset = 0) {
        return this.spine.chain[index].pos.x + Math.cos(this.spine.angles[index] + angleOffset) * ((this.spine.shapes[index] / 2) + lengthOffset);
    }

    getPosY(index, angleOffset, lengthOffset = 0) {
        return this.spine.chain[index].pos.y + Math.sin(this.spine.angles[index] + angleOffset) * ((this.spine.shapes[index] / 2) + lengthOffset);
    }
}