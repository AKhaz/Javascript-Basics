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

function calculateFPS () {
  /*
    Parameters: None
    Returns: None
    Purpose: Calculate and write to console the frame rate.
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

  //Resets isMoving Variable
  isMoving = false;

  calculateFPS();

  // Clears canvas
  context.clearRect(0, 0, canvas.width, canvas.height);
  //Draw Player Circle
  context.beginPath();
  context.arc(circlePos[0], circlePos[1], circlePos[2], 0, 2*Math.PI);
  context.stroke();
  //console.log(circlePos);

  // Loop the animation to the next frame.
  window.requestAnimationFrame(drawAll);
  console.log(circleVel);
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
  // This function is only called when the player moves their mouse,
  // as such, it wont count a velocity of [0,0] (mouse not moving)
  isMoving = true;
  circleOldPos = [circlePos[0], circlePos[1]];
  circlePos = [event.clientX, event.clientY, circlePos[2]];
  circleVel = calculateCircleVel();
}

// Get width/height of the browser window
windowWidth = window.innerWidth;
windowHeight = window.innerHeight;
//console.log("Window is %d by %d", windowWidth, windowHeight);

// Get the canvas, set the width and height from the window
canvas = document.getElementById("mainCanvas");
// I found that - 20 worked well for me, YMMV
canvas.width = windowWidth;
canvas.height = windowHeight;
canvas.style.border = "1px solid black";

// Set up the context for the animation
context = canvas.getContext("2d");

//Set Circle Position(s)
circlePos = [(canvas.width / 4), (canvas.height / 2), circlePos[2]];

//Event listener for mouse position
document.addEventListener("mousemove", playerMouseMove);

// Fire up the animation engine
window.requestAnimationFrame(drawAll);
