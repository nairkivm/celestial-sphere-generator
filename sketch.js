let angleX = 0;
let angleY = 0;
let sphereRadius = 130;
let canvas;
var phi = 30;
var buttonEquatorialCoord;
var stateEquatorialCoord = false;

function setup() {
  canvas = createCanvas(400, 400, WEBGL);
  buttonEquatorialCoord = createButton("Equatorial Coordinate");
  buttonEquatorialCoord.mousePressed(switchEquatorialCoord);
}


function switchEquatorialCoord() {
  // State of the switch
  stateEquatorialCoord = !stateEquatorialCoord;
}

function draw() {
  
  let zeta = HALF_PI/2;
  let az = 3*HALF_PI;
  
  background(220);
  rectMode(CENTER);
  // Apply rotation based on mouse dragging
  if (mouseIsPressed) {
    angleX += radians(mouseY - pmouseY);
    // angleY += radians(mouseX - pmouseX);
  }
  // Set up rotation
  rotateX(angleX);
  // rotateY(angleY);

  
  drawBasicLayOut();
  if (stateEquatorialCoord == true) {
    drawEquatorialCoord(phi);
  }

  // console.log(zeta);
  // x adalah Y
  // y adalah Z
  // z adalah X
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
  
  
//   if (mouseIsPressed) {
//     if (dist(200,200,mouseX,mouseY) <= sphereRadius) {
//       let x = (mouseX - 200);
//       let y = (mouseY - 200);
//       let z = sqrt(sphereRadius**2 - x**2 - y**2)
//       strokeWeight(5);
//       point(x,y,z);
      
//       strokeWeight(10);
//       z = 0;
//       point(x,y,z);
//     }
//   }
  
  // Draw the hollow sphere
  fill(250, 250, 250, 150); // Semi-transparent fill color
  noStroke(); // No outline
  sphere(sphereRadius);
  
  
  
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
  // Zenith
  point(-sphereRadius * cos(0 + HALF_PI),
        -sphereRadius * sin(0 + HALF_PI),
        0);
  // Nadir
  point(sphereRadius * cos(0 + HALF_PI),
        sphereRadius * sin(0 + HALF_PI),
        0);
  // East
  point(0,0,sphereRadius);
  // West
  point(0,0,-sphereRadius);
  
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