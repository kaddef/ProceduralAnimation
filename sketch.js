let snake
let fish
let lizard
let chain
let whoAlive = "chain";
function setup() {
    createCanvas(windowWidth, windowHeight);
    frameRate(60)
    noCursor()
    snake = new Snake2();
    fish = new Fish();
    lizard = new Lizard();
    chain = new Chain2([20,20,20,20,20], 50);
}
  
function draw() {
    background("#272d35");
    switch (whoAlive) {
        case "chain":
            chain.update();
            chain.draw();
            break;
        case "snake":
            snake.draw();
            break;
        case "fish":
            fish.draw();
            break;
        case "lizard":
            lizard.update();
            lizard.draw();
            break;        
        default:
            break;
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
    if (keyCode === ENTER) {
      redraw();
    }
    if (key === 'y') {
        whoAlive = "snake"
    }
    if (key === 'u') {
        whoAlive = "fish"
    }
    if (key === 'i') {
        whoAlive = "lizard"
    }
    if (key === 'o') {
        whoAlive = "chain"
    }
}