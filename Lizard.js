class Lizard {
    shapes = [26, 29, 20, 30, 34, 35, 32, 25, 14, 7, 6, 5, 4, 4];
    arms = new Array(4);
    armsLocation = new Array(4)
    constructor() {
        this.spine = new Chain2(this.shapes, 32);

        for (let i = 0; i < this.arms.length; i++) {
            this.arms[i] = new Chain2([10,10,10],18);
            this.armsLocation[i] = createVector(0,0)
        }
    }

    update() {
        this.spine.update();

        for (let i = 0; i < this.arms.length; i++) {
            let side = i % 2 == 0 ? 1 : -1;
            let bodyIndex = i < 2 ? 3 : 7;
            let angle = i < 2 ? PI/1 - 0.785 - 0.3925: PI/2;
            let desiredPos = createVector(this.getPosX(bodyIndex, angle * side, 20), this.getPosY(bodyIndex, angle * side, 20))
            if(p5.Vector.dist(desiredPos,this.armsLocation[i]) > 38) {
                this.armsLocation[i] = desiredPos;
            }

            // this.arms[i].fabrikUpdate(createVector(this.getPosX(bodyIndex, -PI/2 * side, -20), this.getPosY(bodyIndex, -PI/2 * side, -20)), this.armsLocation[i])
            let a = p5.Vector.lerp(this.arms[i].chain[0].pos, this.armsLocation[i], 0.4);
            this.arms[i].fabrikUpdate(createVector(this.getPosX(bodyIndex, -PI/2 * side, -20), this.getPosY(bodyIndex, -PI/2 * side, -20)),a)
        }
    }

    draw() {
        // Draw Arms
        for (let i = 0; i < this.arms.length; i++) {
            this.arms[i].draw()
        }

        stroke("#c0d8e5");
        fill("#4e7a70")
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

    getPosX(index, angleOffset, lengthOffset = 0) {
        return this.spine.chain[index].pos.x + Math.cos(this.spine.angles[index] + angleOffset) * ((this.spine.shapes[index] / 2) + lengthOffset);
    }

    getPosY(index, angleOffset, lengthOffset = 0) {
        return this.spine.chain[index].pos.y + Math.sin(this.spine.angles[index] + angleOffset) * ((this.spine.shapes[index] / 2) + lengthOffset);
    }
}