let n = 6;
let w, h;
let circlesX = [];
let circlesY = [];
let angle = 0;
let curves = [];

function setup() {
    createCanvas(600, 600, P2D);
    restart();
}

function restart(){
    circlesY = [];
    circlesX = [];
    curves = [];
    angle = 0;
    background(33);
    n = int(document.getElementById("numCircles").value);
    w = width / (n+1);
    stroke(255);
    noFill();
    for (let i = 1; i < n+1; i ++){
        circlesX.push(new Circle(w*(i+1) - w/2, w/2, w*0.85, true, i));
        circlesY.push(new Circle(w/2, w*(i+1) - w/2, w*0.85, false, i));
    }
    for(var i=0; i<n; i++) {
        curves[i] = [];
        for(var j=0; j<n; j++) {
            curves[i][j] = new Curve(i, j);
        }
    }
}

function buttonPressed() {
    restart();
}

function draw() {
    background(33);
    for (let i = 0; i < circlesX.length; i++) {
        circlesX[i].angle = angle * (i+1);
        circlesX[i].show();
        circlesY[i].angle = angle * (i+1);
        circlesY[i].show();
    }
    for (let i = 0; i < circlesX.length; i++) {
        for (let j = 0; j < circlesY.length; j++) {
            if (frameCount % 2 == 0) {
                curves[i][j].addPoint(circlesX[i].pointPos.x, circlesY[j].pointPos.y);
            }
            curves[i][j].show();
        }
    }

    if (angle > TWO_PI) {
        angle = 0;
        for (let i = 0; i < circlesX.length; i++) {
            for (let j = 0; j < circlesY.length; j++) {
                curves[i][j].clear();
            }
        }
    }
    angle += 0.01;
}

function Circle(x, y, d, isX, color) {
    this.circlePos = createVector(x, y);
    this.pointPos = createVector(x, y);
    this.diameter = d;
    this.angle = 0;
    this.isX = isX;
    this.r = floor(color/n * 255);
    this.g = floor(color/n * 255);
    this.b = 150;


    this.show = function() {
        stroke(255);
        noFill();
        stroke(this.r, this.g, this.b);
        ellipse(this.circlePos.x, this.circlePos.y, this.diameter, this.diameter);
        noStroke();
        fill(255, 255, 255, 25);
        if (this.isX == true){
            rect(this.pointPos.x - 1, this.pointPos.y, 2, height);
        }else{
            rect(this.pointPos.x - 1, this.pointPos.y, width, 2);
        }
        fill(this.r, this.g, this.b);
        this.pointPos.x = this.circlePos.x + this.diameter/2 * cos(this.angle);
        this.pointPos.y = this.circlePos.y + this.diameter/2 * sin(this.angle);
        ellipse(this.pointPos.x, this.pointPos.y, this.diameter/10, this.diameter/10);
    };
}

function Curve(r, g) {
    this.points = [];
    this.r = floor(r/n * 255);
    this.g = floor(g/n * 255);
    this.b = 150;


    this.addPoint = function (x, y){
        this.points.push(createVector(x, y));
    }

    this.show = function() {
        stroke(255);
        noFill();
        strokeWeight(1);

        beginShape();
        stroke(this.r, this.g, this.b);
        for (let p of this.points) {
            //            stroke(random(255),random(255),random(255));
            vertex(p.x, p.y);
        }
        endShape();
    }

    this.clear = function () {
        this.points = [];
    }
}
