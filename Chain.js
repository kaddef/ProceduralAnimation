class Chain {
    chain = [];
    shapes = [35,40,30,29,28,27,26,25,24,23,22,21,20,19,18,17,16,15,14,13,12,11,10];
    edges = new Array(this.shapes.length*2 + 3).fill(0);
    
    constructor(count = this.shapes.length) {

        for (let i = 0; i < count; i++) {
            this.chain.push(new Circle(this.shapes[i], 25));
            if(i > 0) {
                this.chain[i-1].setTail(this.chain[i]);
            }
        }
    }

    update() {
        this.chain[0].pos.x = mouseX
        this.chain[0].pos.y = mouseY
        this.chain[0].update();

        let edgePoint = this.calculateParametric(this.chain[0], this.chain[1])
        this.edges[2] = createVector(edgePoint[2], edgePoint[3])
        this.edges[this.edges.length - 1 - 1] = createVector(edgePoint[0], edgePoint[1])

        //DENEME
        let angle = atan2(this.chain[0].pos.y - this.chain[1].pos.y, this.chain[0].pos.x - this.chain[1].pos.x);
        let radius = this.chain[0].shape / 2;
        let x1 = radius * cos(angle + 0.785398163);
        let y1 = radius * sin(angle + 0.785398163);
        let x2 = radius * cos(angle - 0.785398163);
        let y2 = radius * sin(angle - 0.785398163);
        let x3 = radius * cos(angle);
        let y3 = radius * sin(angle);

        this.edges[0] = createVector(this.chain[0].pos.x+x3,this.chain[0].pos.y+y3)
        this.edges[1] = createVector(this.chain[0].pos.x+x1,this.chain[0].pos.y+y1)
        this.edges[this.edges.length - 1] = createVector(this.chain[0].pos.x+x2,this.chain[0].pos.y+y2)
        //DENEME SON
        
        for (let i = 1; i < this.chain.length; i++) {
            this.chain[i].update();

            edgePoint = this.calculateParametric(this.chain[i], this.chain[i-1])
            this.edges[i+2] = createVector(edgePoint[0], edgePoint[1])
            this.edges[this.edges.length - 1 - i - 1] = createVector(edgePoint[2], edgePoint[3])
        }
    }

    draw() {
        this.chain[0].draw();

        strokeWeight(5)
        stroke("red")
        point(this.edges[2])
        point(this.edges[this.edges.length - 1])
        //DENEME
        strokeWeight(5)
        stroke("purple")
        point(this.chain[0].pos.x+x1,this.chain[0].pos.y+y1)
        point(this.chain[0].pos.x+x2,this.chain[0].pos.y+y2)
        point(this.chain[0].pos.x+x3,this.chain[0].pos.y+y3)
        //DENEME END

        for (let i = 1; i < this.chain.length; i++) {
            this.chain[i].draw();

            strokeWeight(5)
            stroke("red")
            point(this.edges[i+2])
            point(this.edges[this.edges.length - 1 - i - 1])
        }
    }

    calculateParametric(chain1, chain2) {
        //chain 2 is needed for the direction of the point
        let angle = atan2(chain2.pos.y - chain1.pos.y, chain2.pos.x - chain1.pos.x);
        let radius = chain1.shape / 2;
        let x1 = radius * cos(angle + HALF_PI);
        let y1 = radius * sin(angle + HALF_PI);
        let x2 = radius * cos(angle - HALF_PI);
        let y2 = radius * sin(angle - HALF_PI);
        return [chain1.pos.x+x1, chain1.pos.y+y1, chain1.pos.x+x2, chain1.pos.y+y2]
    }
    
    // add(block) {
    //     this.chain.push(block);
    // }
    
    get() {
        //console.log(this.edges)
        return this.edges;
    }
}