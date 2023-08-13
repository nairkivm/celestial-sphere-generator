let angleX = 0;
let angleY = 0;
let sphereRadius = 130;
let canvas;
var phis = [];
var temp_phi;
var stars = [];
var buttonEquatorialCoord;
var stateEquatorialCoord = false;
var sliderPhi; 
var inputPhi;
let pg;



function setup() {
  canvas = createCanvas(400, 400, WEBGL);
  pg = createGraphics(70,50);
  pg_2 = createGraphics(25,25);
  pg_3 = createGraphics(25,25);
  buttonEquatorialCoord = createButton("Equatorial Coordinate");
  buttonEquatorialCoord.mousePressed(switchEquatorialCoord);
  sliderPhi = createSlider(-90,90,0);
  temp_phi = 0;
  phis[0] = new Phi(pg, temp_phi);
}

function switchEquatorialCoord() {
  // State of the switch
  stateEquatorialCoord = !stateEquatorialCoord;
}

function draw() {
  
  let zeta = HALF_PI/2;
  let az = 3*HALF_PI;
  
  background(220);

  ortho(-width/2, width/2, -height/2, height/2, -1.5*width, 1.5*width);
  
  // console.log(temp_phi + ' - '+ sliderPhi.value());
  // console.log(phis);

  if (temp_phi != sliderPhi.value()) {
    temp_phi = sliderPhi.value();
    phis.push(new Phi(pg, temp_phi));
    phis.splice(0,1);
  }
  phis[0].display();
  

  // Apply rotation based on mouse dragging
  if (mouseIsPressed && mouseX < 400 && mouseY < 400) {
    angleX += radians(mouseY - pmouseY);
    angleY += radians(mouseX - pmouseX);
  }

  drawBasicPoints();
  if (stateEquatorialCoord == true) {
    drawEquatorialPoints(phis[0].value);
  }
  // var aPoint = new RotateY4Points(-sphereRadius-20, 0, 0, angleY);
  // aPoint = new RotateX4Points(aPoint.x,aPoint.y,aPoint.z, angleX);
  // pg_3.clear();
  // pg_3.fill(0);
  // pg_3.stroke(0,255,0);
  // pg_3.strokeWeight(10);
  // pg_3.point(0,0,0);
  // image(pg_3, aPoint.x,aPoint.y);

  // Set up rotation
  rotateX(angleX);
  rotateY(angleY);

  
  drawBasicLayOut();
  if (stateEquatorialCoord == true) {
    drawEquatorialCoord(phis[0].value);
  }

//   strokeWeight(1);
//   drawEquator(0);
  
//   drawEquator(HALF_PI/3); // Perpendicular equator
  
//   drawEquatorX(0);
  
//   // drawEquatorNS(
//   //   createVector(
//   //     sphereRadius * sin(PI-zeta) * sin(-az-HALF_PI),
//   //     sphereRadius * cos(PI-zeta),
//   //     sphereRadius * sin(PI-zeta) * cos(-az-HALF_PI)
//   //   )
//   // );
  
//   strokeWeight(8);
//   point(sphereRadius * sin(PI-zeta) * sin(-az-HALF_PI),
//         sphereRadius * cos(PI-zeta),
//         sphereRadius * sin(PI-zeta) * cos(-az-HALF_PI));
  
//   drawCircleThroughPoints(
//     createVector(
//       sphereRadius * sin(PI-zeta) * sin(-az-HALF_PI),
//       sphereRadius * cos(PI-zeta),
//       sphereRadius * sin(PI-zeta) * cos(-az-HALF_PI)
//     ), 
//     createVector(-sphereRadius,0,0), 
//     createVector(sphereRadius,0,0))//
  
  for (i = 0; i < stars.length; i++) {
    stars[i].display();
  }

  // Draw the hollow sphere
  fill(250, 250, 250, 150); // Semi-transparent fill color
  noStroke(); // No outline
  sphere(sphereRadius);
  
  
  
}

function mousePressed() {
  if (dist(width/2, height/2, mouseX, mouseY) <= sphereRadius) {
    let x = (mouseX - width/2);
    let y = (mouseY - height/2);
    var z = sqrt(sphereRadius**2 - x**2 - y**2);
    // if (x < x * cos(angleY)) {
    //   z = z * (-1);
    // }
    stars.push(new Star(x, y, z));
  }
}

function keyPressed() {
  if (keyCode === BACKSPACE) {
    stars.splice(stars.length - 1,1);
  }
}

class Phi {
  constructor(pg, value) {
    this.value = value;
    this.pg = pg;
    this.display = function () {
      // pg.background(200,200,200);
      pg.clear();
      pg.fill(0);
      pg.text('φ : ' + value, 10, 20);
      image(pg, 150, 150);
    };
  }
}

class CardinalPoints {
  constructor(pg, label, color, x, y, z, xOffset, yOffset, zOffset, angleX, angleY) {
    this.pg = pg;
    this.display = function () {
      // pg.background(200,200,200);
      var xPosition = x + xOffset;
      var yPosition = y + yOffset;
      var zPosition = z + zOffset;
      let rotateY4Points = new RotateY4Points(xPosition, yPosition, zPosition, angleY);
      xPosition = rotateY4Points.x;
      yPosition = rotateY4Points.y;
      zPosition = rotateY4Points.z;
      let rotateX4Points = new RotateX4Points(xPosition, yPosition, zPosition, angleX);
      xPosition = rotateX4Points.x;
      yPosition = rotateX4Points.y;
      zPosition = rotateX4Points.z;
      pg.clear();
      pg.fill(color);
      pg.text(label, 0, 10);
      image(pg, xPosition, yPosition);
    };
  }
}

class RotateX4Points {
  constructor(x, y, z, theta) {
    this.x = x;
    this.y = y * cos(-theta) - z * sin(-theta);
    this.z = y * sin(-theta) + z * cos(-theta);
    this.theta = -theta;
  }
}

class RotateY4Points {
  constructor(x, y, z, theta) {
    this.x = x * cos(theta) - z * sin(theta);
    this.y = y;
    this.z = x * sin(theta) + z * cos(theta);
    this.theta = theta;
  }
}

class RotateX4Frame {
  constructor(x, y, z, theta) {
    this.x = x;
    this.y = y * cos(-theta) + z * sin(-theta);
    this.z = - y * sin(-theta) + z * cos(-theta);
    this.theta = -theta;
  }
}

class RotateY4Frame {
  constructor(x, y, z, theta) {
    this.x = x * cos(theta) + z * sin(theta);
    this.y = y;
    this.z = - x * sin(theta) + z * cos(theta);
    this.theta = theta;
  }
}

class Star {
  constructor(x, y, z, color = [random(0,255),random(0,255),random(0,255)]) {
    let rotateY4Frame = new RotateY4Frame(x, y, z, -angleY);
    x = rotateY4Frame.x;
    y = rotateY4Frame.y;
    z = rotateY4Frame.z;
    let rotateX4Frame = new RotateX4Frame(x, y, z, -angleX);
    x = rotateX4Frame.x;
    y = rotateX4Frame.y;
    z = rotateX4Frame.z;
    this.x = x;
    this.y = y;
    this.z = z;
    this.color = color;
    this.size = 7;
    this.display = function () {
      stroke(color);
      strokeWeight(this.size);
      point(x,y,z);
    }
    
    this.lineThroughSomePoints = function (point1, point2, point3) {
      let normal1 = p5.Vector.cross(point1, point2).normalize();
      let normal2 = p5.Vector.cross(point2, point3).normalize();
      
      // Calculate the axis of the circle (the intersection of the two normals)
      let axis = p5.Vector.cross(normal1, normal2).normalize();
      
      // Calculate the radius of the circle (angle between the normals)
      let radius = acos(p5.Vector.dot(normal1, normal2));
      
      // Calculate the center of the circle using the first point
      let center = p5.Vector.mult(p5.Vector.add(point1, point2), 0.5);
      
      // Draw the circle
      noFill();
      stroke(this.color); 
      push();
      translate(center.x, center.y, center.z);
      rotate(axis, radius);
      beginShape();
      let resolution = 100;
      for (let i = 0; i < resolution; i++) {
        let angle = map(i, 0, resolution, 0, TWO_PI);
        let x = sphereRadius * cos(angle);
        let y = sphereRadius * sin(angle);
        vertex(x, y, 0);
      }
      endShape(CLOSE);
      pop();
    }
  }
}

function drawBasicPoints() {
  let north = new CardinalPoints(pg_2, 'N', [255,0,0], -sphereRadius, 0, 0, -10, 0, 0, angleX, angleY);
  let south = new CardinalPoints(pg_2, 'S', [255,0,0], sphereRadius, 0, 0, 10, 0, 0, angleX, angleY);
  let east  = new CardinalPoints(pg_2, 'E', [255,0,0], 0, 0, sphereRadius, 0, 0, 10, angleX, angleY);
  let west  = new CardinalPoints(pg_2, 'W', [255,0,0], 0, 0, -sphereRadius, 0, 0, -10, angleX, angleY);
  let zenith= new CardinalPoints(pg_2, 'Z', [255,0,0], -sphereRadius * cos(HALF_PI), -sphereRadius * sin(HALF_PI), 0,
                                 -20 * cos(HALF_PI), -20 * sin(HALF_PI), 0, angleX, angleY);
  north.display();
  south.display();
  east.display();
  west.display();
  zenith.display();
}

function drawEquatorialPoints(thetaOffset) {
  thetaOffset = radians(thetaOffset);
  let northCelestial = new CardinalPoints(pg_2, 'NCP', [0,0,255], 
                                          -sphereRadius * cos(thetaOffset), -sphereRadius * sin(thetaOffset), 0,
                                          -20 * cos(thetaOffset), -20 * sin(thetaOffset), 0, angleX, angleY);
  let southCelestial = new CardinalPoints(pg_2, 'SCP', [0,0,255], 
                                          sphereRadius * cos(thetaOffset), sphereRadius * sin(thetaOffset), 0,
                                          20 * cos(thetaOffset), 20 * sin(thetaOffset), 0, angleX, angleY);
                                          
  northCelestial.display();
  southCelestial.display();
}

function drawBasicLayOut() {
  // Draw Cardinal points
  stroke(0,0,0);
  strokeWeight(7);
  // North
  point(-sphereRadius * cos(0),
        -sphereRadius * sin(0),
       0);
  // South
  point(sphereRadius * cos(0),
        sphereRadius * sin(0),
        0);
  // East
  point(0,0,sphereRadius);
  // West
  point(0,0,-sphereRadius);
  // Zenith
  point(-sphereRadius * cos(0 + HALF_PI),
        -sphereRadius * sin(0 + HALF_PI),
        0);
  // Nadir
  point(sphereRadius * cos(0 + HALF_PI),
        sphereRadius * sin(0 + HALF_PI),
        0);
  
  
  // Draw the great circle
  let points = 100;
  beginShape();
  fill(255, 0, 0, 10); // Customize the horizon great circle
  stroke(255,0,0); // Customize outline
  strokeWeight(2);
  // Draw the great circle
  for (let i = 0; i <= points; i++) {
    let lat = map(i, 0, points, 0, TWO_PI);
    let x = sphereRadius * cos(lat) * cos(0);
    let y = sphereRadius * cos(lat) * sin(0);
    let z = sphereRadius * sin(lat);
    vertex(x, y, z);
  }
  endShape(CLOSE);
  
  // Draw some lines
  stroke(255,0,0,90);
  strokeWeight(2);
  // Draw North-South line
  line(-sphereRadius * cos(0),
       -sphereRadius * sin(0),
       0,
       sphereRadius * cos(0),
       sphereRadius * sin(0),
       0);
  // Draw Zenith-Nadir line
  line(-sphereRadius * cos(0 + HALF_PI),
       -sphereRadius * sin(0 + HALF_PI),
       0,
       sphereRadius * cos(0 + HALF_PI),
       sphereRadius * sin(0 + HALF_PI),
       0);
  // Draw East-West Line
  line(0,0,sphereRadius,0,0,-sphereRadius);
  
}


function drawEquatorX(thetaOffset) {
  let points = 100;
  beginShape();
  fill(0, 0, 255, 10); // Semi-transparent red color for the equator
  stroke(0,255,0); // No outline
  for (let i = 0; i <= points; i++) {
    let lat = map(i, 0, points, 0, TWO_PI);
    let x = sphereRadius * cos(lat) * cos(thetaOffset);
    let y = sphereRadius * cos(lat) * sin(thetaOffset);
    let z = sphereRadius * sin(lat);
    let rotation = HALF_PI / 2;
    let x2, y2, z2;
    x2 = x;
    y2 = y * cos(rotation) - z * sin(rotation);
    z2 = y * sin(rotation) + z * cos(rotation);
    
    vertex(x2, y2, z2);
    
  }
  endShape(CLOSE);
}


function drawEquatorialCoord(thetaOffset) {
  thetaOffset = radians(thetaOffset);
  // Draw points
  stroke(0,0,0);
  strokeWeight(7);
  // Northern Celestial Pole
  point(-sphereRadius * cos(thetaOffset),
        -sphereRadius * sin(thetaOffset),
      0);
  // Southern Celestial Pole
  point(sphereRadius * cos(thetaOffset),
        sphereRadius * sin(thetaOffset),
        0);
  // E
  point(-sphereRadius * cos(thetaOffset + HALF_PI),
        -sphereRadius * sin(thetaOffset + HALF_PI),
        0);
  // K
  point(sphereRadius * cos(thetaOffset + HALF_PI),
        sphereRadius * sin(thetaOffset + HALF_PI),
        0);

  // Draw the great circle
  let points = 100;
  beginShape();
  fill(0, 0, 255, 10); 
  stroke(0, 0, 255); 
  strokeWeight(2);
  for (let i = 0; i <= points; i++) {
    let lat = map(i, 0, points, 0, TWO_PI);
    let x = sphereRadius * cos(lat) * cos(thetaOffset + HALF_PI);
    let y = sphereRadius * cos(lat) * sin(thetaOffset + HALF_PI);
    let z = sphereRadius * sin(lat);
    vertex(x, y, z);
  }
  endShape(CLOSE);
  
  // Draw some lines
  stroke(0,0,255,90);
  strokeWeight(2);
  // Draw Earth's rotation axis
  line(-sphereRadius * cos(thetaOffset),
      -sphereRadius * sin(thetaOffset),
      0,
      sphereRadius * cos(thetaOffset),
      sphereRadius * sin(thetaOffset),
      0);
  line(-sphereRadius * cos(thetaOffset + HALF_PI),
      -sphereRadius * sin(thetaOffset + HALF_PI),
      0,
      sphereRadius * cos(thetaOffset + HALF_PI),
      sphereRadius * sin(thetaOffset + HALF_PI),
      0);
}


function drawEquatorNS(aPoint) {
  let v1 = createVector(-sphereRadius, 0, 0); // North pole
  let v2 = createVector(sphereRadius, 0, 0);  // South pole
  let equatorPoint = createVector(aPoint.x, aPoint.y, aPoint.z).normalize().mult(sphereRadius);
  
  // Calculate normal vector to the plane formed by the three points
  let normal = p5.Vector.cross(v1.copy().sub(equatorPoint), v2.copy().sub(equatorPoint)).normalize();
  
  point(sphereRadius * normal.x, sphereRadius * normal.y, sphereRadius * normal.z);
  // Calculate rotation angle between the normal vector and X-axis
  let angle = -atan2(normal.z, normal.y);
  
  let points = 100;
  beginShape();
  fill(0, 0, 255, 10); // Semi-transparent red color for the equator
  stroke(0,0,255); // No outline
  for (let i = 0; i <= points; i++) {
    let lat = map(i, 0, points, 0, TWO_PI);
    let x = sphereRadius * sin(lat);
    let y = sphereRadius * cos(lat) * cos(angle);
    let z = sphereRadius * cos(lat) * sin(angle);
    vertex(x, y, z);
  }
  endShape(CLOSE);
}

function drawCircleThroughPoints(point1, point2, point3) {
  let normal1 = p5.Vector.cross(point1, point2).normalize();
  let normal2 = p5.Vector.cross(point2, point3).normalize();
  
  // Calculate the axis of the circle (the intersection of the two normals)
  let axis = p5.Vector.cross(normal1, normal2).normalize();
  
  // Calculate the radius of the circle (angle between the normals)
  let radius = acos(p5.Vector.dot(normal1, normal2));
  
  // Calculate the center of the circle using the first point
  let center = p5.Vector.mult(p5.Vector.add(point1, point2), 0.5);
  
  // Draw the circle
  noFill();
  stroke(0, 0, 255, 150); // Blue color for the circle
  push();
  translate(center.x, center.y, center.z);
  rotate(axis, radius);
  beginShape();
  let resolution = 100;
  for (let i = 0; i < resolution; i++) {
    let angle = map(i, 0, resolution, 0, TWO_PI);
    let x = sphereRadius * cos(angle);
    let y = sphereRadius * sin(angle);
    vertex(x, y, 0);
  }
  endShape(CLOSE);
  pop();
}