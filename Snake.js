class Snake {
    constructor() {
        this.chain = new Chain();
    }

    draw(){
        this.chain.update();
        let edges = this.chain.get();
        stroke("#f6dee1");
        fill("#a83930")
        strokeWeight(3);
        beginShape();
        for (let i = 0; i < edges.length; i++) {
            point(edges[i].x, edges[i].y);
            curveVertex(edges[i].x, edges[i].y);
        }
        endShape(CLOSE);
        
        stroke("#f6dee1");
        strokeWeight(8);
        point(edges[2].x, edges[2].y);
        point(edges[edges.length-2].x, edges[edges.length-2].y);
        //this.chain.draw()
    }
}