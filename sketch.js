/* VECTOR CLASS WITH SOME PROPERTIES SUCH AS ADDING, SUBTRACTING ETC.. 
   p5.js already has a vector class but this is for learning purposes */
   class Vector {
    constructor (xvar, yvar) {
        this.x = xvar;
        this.y = yvar;
    }
	// adds two vectors
    add(a) {
        this.x += a.x;
        this.y += a.y;
    }
	// subtracts two vectors
    sub(a) {
        this.x -= a.x;
        this.y -= a.y;
    }
	// scales up a vector
    mul(a) {
        this.x *= a;
        this.y *= a;
    }
	// scales down a vector
    div(a) {
        this.x /= a;
        this.y /= a;
    }
	// calculates the magnitude of a vector
    mag() {
        return sqrt(this.x*this.x + this.y*this.y);
    }
	// scales the magnitude of a vector to unit length
    normalize() {
        var m = this.mag()
        if (m != 0) {
            this.div(this.mag());
        }
    }
}

/* THIS CLASS DEFINES THE BALLS THAT FOLLOW THE MOUSE 
  THE MOVEMENTS ARE DEFINED USING SOME BASIC PHYSICS */
class Mover {
    constructor(a,b,c,d) {
        this.locations = new Vector(a,b); // stores the location of ball
        this.speed = new Vector(c,d);     // stores the speed vector
        this.topspeed = 25;               // defines the top speed that can be reached
    }

    update () { 
        this.mouse = new Vector(mouseX, mouseY); //stores current mose
        this.dir = this.mouse;
        this.dir.sub(this.locations)
        this.dir.normalize();
        this.dir.mul(2.5);

        this.speed.add(this.dir);
        this.speed.y = constrain(this.speed.y, -this.topspeed, this.topspeed);
        this.speed.x = constrain(this.speed.x, -this.topspeed, this.topspeed);
        this.locations.add(this.speed);
    }

    display() {
        ellipse(this.locations.x, this.locations.y, 5);
    }

    checkEdges() {
        if (this.locations.x > windowWidth) {
            this.locations.x = windowWidth;
        }
        else if (this.locations.x < 0) {
            this.locations.x = 0;
        }
        else if (this.locations.y > windowHeight) {
            this.locations.y = windowHeight;
        }
        else if (this.locations.y < 0) {
            this.locations.y = 0;
        }
    }
}


var ball = new Array(2000);

function setup() {
    createCanvas(windowWidth, windowHeight);    
    noStroke();
    for (var i=0; i < ball.length; i++) {
        ball[i] = new Mover(random(windowWidth),random(windowHeight),0,0);
    }
    
}

function draw() {  
    background(0);
    for (var i=0; i < ball.length; i++) {
        fill(random(10,55), random(100,255), random(220,255), random(255));
        ball[i].update();
        ball[i].display();
    }
}