class Chain2 {
    constructor(shapes = [20, 20, 20, 20], linkLength) {
        this.shapes = shapes;
        this.angles = new Array(shapes.length).fill(0);
        this.chain = new Array(shapes.length);
        this.linkLength = linkLength;

        for (let i = 0; i < shapes.length; i++) {
            this.chain[i] = new Circle(this.shapes[i], this.linkLength);
            if(i > 0) {
                this.chain[i-1].setTail(this.chain[i]);
            }
        }
    }

    fabrikUpdate(anchor, target) {
        // Forward pass
        this.chain[0].pos = target.copy();
        for (let i = 1; i < this.chain.length; i++) {
          let prev = this.chain[i - 1];
          let curr = this.chain[i];
          let dir = p5.Vector.sub(curr.pos, prev.pos).normalize();
          curr.pos = p5.Vector.add(prev.pos, dir.mult(prev.constraint));
        }
    
        // Backward pass
        this.chain[this.chain.length - 1].pos = anchor.copy();
        for (let i = this.chain.length - 2; i >= 0; i--) {
          let next = this.chain[i + 1];
          let curr = this.chain[i];
          let dir = p5.Vector.sub(curr.pos, next.pos).normalize();
          curr.pos = p5.Vector.add(next.pos, dir.mult(curr.constraint));
        }
    }

    update() {
        // FIRST RING ACTIONS
        // this causes flickering
        // let delta = p5.Vector.sub(this.chain[0].pos, createVector(mouseX, mouseY));
        // if (delta.mag() > 0.1) {
        //     this.angles[0] = delta.heading();
        // }
        this.angles[0] = simplifyAngle(p5.Vector.sub(this.chain[1].pos, this.chain[0].pos).heading());
        this.chain[0].pos.x = mouseX
        this.chain[0].pos.y = mouseY
        this.chain[0].moveTail();
        // FIRST RING ACTIONS END
        
        for (let i = 1; i < this.chain.length; i++) {
            this.chain[i].moveTail();
            this.angles[i] = simplifyAngle(p5.Vector.sub(this.chain[i].pos, this.chain[i-1].pos).heading());
        }
    }

    draw() {
        // FIRST RING DRAWS
        this.chain[0].draw();
        // FIRST RING DRAWS END
        for (let i = 1; i < this.chain.length; i++) {
            this.chain[i].draw();
        }
    }
}