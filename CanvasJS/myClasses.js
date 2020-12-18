class Puck {
  constructor() {
    this.pos = [100, 100, 30]
    this.vel = [4, 3];
    this.color = "#000000";
  }

  applyVelocity(){
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
  }

  wallBounceCheck(){
    if (this.pos[1] > canvas.height) {
      this.pos[1] = canvas.height;
      //Reverses y-speed
      this.vel[1] *= -1;
    }
    if (this.pos[1] < 0) {
      this.pos[1] = 0;
      //Reverses y-speed
      this.vel[1] *= -1;
    }
    if (this.pos[0] < 0) {
      this.pos[0] = 0;
      //Reverses x-speed
      this.vel[0] *= -1;
    }
    if (this.pos[0] > canvas.width) {
      this.pos[0] = canvas.width;
      //Reverses x-speed
      this.vel[0] *= -1;
    }
  }

  randomRange(min, max) {
    return Math.floor(Math.random()*(max - min + 1))+min;
  }

  changeColor(){
    var r = puck.randomRange(0, 255);
    var g = puck.randomRange(0, 255);
    var b = puck.randomRange(0, 255);
    this.color = "rgb(" + r + "," + g + "," + b + ")";
  }

  draw() {
    context.fillStyle = this.color;
    context.beginPath();
    context.arc(this.pos[0], this.pos[1], this.pos[2], 0, 2*Math.PI);
    context.fill();
 }
}
