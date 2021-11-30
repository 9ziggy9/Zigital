import SWITCHOFF from '../../img/logic_gates/SWITCHOFF.svg'
import SWITCHON from '../../img/logic_gates/SWITCHON.svg'

export class Power {
  constructor(x, y, cellSize, ctx, state=0) {
    this.x = x;
    this.y = y;
    this.width = cellSize*4.25;
    this.height = cellSize*2.5;
    this.ctx = ctx;
    this.state = state;
  }

  draw(){
    let img = new Image();
    if (this.state === 0) {
      img.src = SWITCHOFF;
      this.ctx.drawImage(img, this.x, this.y-1, this.width*1.25, this.height * 1.25);
    } else {
      img.src = SWITCHON;
      this.ctx.drawImage(img, this.x, this.y-1, this.width*1.25, this.height * 1.25);
    }
  }

  switchState() {
    if(this.state === 0)
      this.state = 1;
    else
      this.state = 0;
    return;
  }
}
