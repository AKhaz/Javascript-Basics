class Puck {
  constructor() {
    this.pos = [100, 100, 30]
    this.vel = [4, 3];
    //this.slowdownFactor = 0.1;
    this.color = "#0000ff";
    this.cap = 'round';
  }

  applyVelocity(){
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
    //this.vel *= this.slowdownFactor;
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

  draw() {
    context.fillStyle = "#000000";
    context.beginPath();
    context.arc(this.pos[0], this.pos[1], this.pos[2], 0, 2*Math.PI);
    context.fill();
    //console.log(this.pos[0], this.pos[1]);
 }
}
