class Snake2 {
    shapes = [35,40,30,29,28,27,26,25,24,23,22,21,20,19,18,17,16,15,14,13,12,11,10];
    
    constructor() {
        this.spine = new Chain2(this.shapes, 25);
    }

    draw() {
        this.spine.update();
        
        stroke("#f6dee1");
        fill("#a83930")
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
    }

    debugDisplay() {
        this.spine.draw();

        stroke("black");
        strokeWeight(6);
        // Extra points for head
        point(this.getPosX(0, PI+PI/4), this.getPosY(0, PI+PI/4));//RIGHT
        point(this.getPosX(0, PI), this.getPosY(0, PI));//CENTER
        point(this.getPosX(0, PI-PI/4), this.getPosY(0, PI-PI/4));//LEFT

        // Draw left side
        for (let i = 0; i < this.spine.chain.length; i++) {
            point(this.getPosX(i, PI/2), this.getPosY(i, PI/2));
        }

        // Extra point for tail
        point(this.getPosX(this.shapes.length-1, 2*PI), this.getPosY(this.shapes.length-1, 2*PI));//CENTER
        
        // Draw right side
        for (let i = this.spine.chain.length-1; i >= 0; i--) {
            point(this.getPosX(i, -PI/2), this.getPosY(i, -PI/2));
        }
    }

    // THESE ARE FOR PARAMETRIC EQUATION
    getPosX(index, angleOffset, lengthOffset = 0) {
        return this.spine.chain[index].pos.x + Math.cos(this.spine.angles[index] + angleOffset) * ((this.spine.shapes[index] / 2) + lengthOffset);
    }

    getPosY(index, angleOffset, lengthOffset = 0) {
        return this.spine.chain[index].pos.y + Math.sin(this.spine.angles[index] + angleOffset) * ((this.spine.shapes[index] / 2) + lengthOffset);
    }
}