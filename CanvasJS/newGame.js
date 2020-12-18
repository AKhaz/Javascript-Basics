// The first two coordinates are one end, the second two are the other end.
var line = [0, 0, 0, 0];
var lineChange = [1, 2, 3, 4];

//Circle Variable
var circlePos = [0, 0, 50];
var circleVel = [0, 0];
//Keep track of circle's position on previous frame to calculate velocity
var circleOldPos = [0, 0];
//Keeps track if the mouse is being moved, if not veloctiy is [0,0]
var isMoving = false;

// Count frames, track time so we can compute fps rate
var frames = 0;
var start = new Date();
var now = new Date();

var puck = new Puck();

function calculateFPS () {
  /*
    Purpose: Calculate and write to console the frame rate.
    Parameters: None
    Returns: None
  */
  frames += 1;
  if (frames % 200 == 0) {
    now = new Date();
    msecs = now.getTime() - start.getTime();
    //console.log(now.getTime());
    //console.log("fps:", (frames / msecs) * 1000);
  }
}

function Update(){
  /*
    Purpose: Updates every frame; manages updating puck, updates circleVel
    Inputs: None
    Returns: None
  */
  puck.applyVelocity();
  puck.wallBounceCheck();
  //Sets Velocity to 0, is overwritten if mouse has been moved
  if (isMoving == false){
    circleVel = [0,0];
  }
}

function drawAll(){
  /*
    Purpose: This is the main drawing loop.
    Inputs: None, but it is affected by what the other functions are doing
    Returns: None, but it calls itself to cycle to the next frame
  */

  Update();

  if (checkCollision() == true){
    puck.changeColor();
    //If the player isn't moving, we dont want the puck to stop moving too, getting stuck
    if ((circleVel[0] == 0) && (circleVel[1] == 0)){
      puck.vel[0] = -puck.vel[0];
      puck.vel[1] = -puck.vel[1];
    }
    else{
      puck.vel = circleVel;
    }
  }

  console.log(puck.vel);

  //Resets isMoving Variable
  isMoving = false;

  calculateFPS();

  // Clears canvas
  context.clearRect(0, 0, canvas.width, canvas.height);
  puck.draw();
  //console.log(puck.pos);
  //Draw Player Circle
  context.beginPath();
  context.arc(circlePos[0], circlePos[1], circlePos[2], 0, 2*Math.PI);
  context.stroke();
  //console.log(circlePos);

  // Loop the animation to the next frame.
  window.requestAnimationFrame(drawAll);
  //console.log(circleVel);
}

function checkCollision(){
  /*
    Purpose: Checks collion between two circle, the player and the puck
    Inputs: No inputs. Takes the global variables for positions and radius
    Returns: True or False for collision
  */
  //Assigning variables used later to calculate dist formula/radius circle distance
  var radiusAdded = circlePos[2] + puck.pos[2];
  var xAdded = circlePos[0] - puck.pos[0];
  var yAdded = circlePos[1] - puck.pos[1];

  //If the distance bwteen the radius of the two circle is GREATER
  //than the actual distance (using dist formula)
  if (radiusAdded > Math.sqrt((xAdded * xAdded) + (yAdded * yAdded))){
    return true;
  }
  else{
    return false;
  }
}

function calculateCircleVel(){
  /*
    Purpose: This function calculates the velocity of the player's puck.
    Inputs: The CirclePos of last frame, and the CirclePos of current frame
    Returns: The velocity calculated.
  */
  var velocityX = circlePos[0] - circleOldPos[0];
  var velocityY = circlePos[1] - circleOldPos[1];
  var velocity = [velocityX, velocityY];
  return velocity;
}

function playerMouseMove(event){
  /*
    Purpose:  Handles player mouse movement, and updates
    the player circle values accordingly.
    Inputs: Event listener for mouse movement
    Returns: None
  */
  // This function is only called when the player moves their mouse,
  // as such, it wont count a velocity of [0,0] (mouse not moving)
  isMoving = true;
  circleOldPos = [circlePos[0], circlePos[1]];
  circlePos = [event.clientX, event.clientY, circlePos[2]];
  circleVel = calculateCircleVel();
  //console.log(event.clientX, event.clientY)
}

// Get width/height of the browser window
windowWidth = window.innerWidth;
windowHeight = window.innerHeight;
//console.log("Window is %d by %d", windowWidth, windowHeight);

// Get the canvas, set the width and height from the window
canvas = document.getElementById("mainCanvas");
// I found that - 20 worked well for me, YMMV
canvas.width = windowWidth - windowWidth/10;
canvas.height = windowHeight - windowHeight/10;
canvas.style.border = "1px solid black";

// Set up the context for the animation
context = canvas.getContext("2d");

//Set Circle Position(s)
circlePos = [(canvas.width / 4), (canvas.height / 2), circlePos[2]];

//Event listener for mouse position
document.addEventListener("mousemove", playerMouseMove);

// Fire up the animation engine
window.requestAnimationFrame(drawAll);
