//let chain;
let snake;
function setup() {
    createCanvas(512, 512);
    frameRate(60)
    noCursor()
    // noLoop();
    //chain = new Chain();
    snake = new Snake();
}
  
function draw() {
    background("#272d35");
    //chain.update();
    //chain.draw();
    snake.draw();
}

function keyPressed() {
    if (keyCode === ENTER) {
      redraw();
    }
    // if (key === 'c') {
    //     let a = chain.get();
    //     console.log(a)
    //     stroke("purple");
    //     strokeWeight(3);
    //     beginShape();
    //     for (let i = 0; i < a.length; i++) {
    //         vertex(a[i].x, a[i].y);
    //     }
    //     endShape();
    // }
}