import BULBOFF from '../../img/logic_gates/BULBOFF.svg';
import BULBON from '../../img/logic_gates/BULBON.svg';
import {collision} from '../grid';

export class Bulb {
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
      img.src = BULBOFF;
      this.ctx.drawImage(img, this.x, this.y-1, this.width*1.25, this.height * 1.25);
    } else {
      img.src = BULBON;
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

  drawHighlight(mouse, color){
    if (collision(this, mouse)) {
      this.ctx.strokeStyle = color;
      this.ctx.lineWidth = this.lw;
      this.ctx.strokeRect(this.x, this.y, this.width*2.5, this.height*1.5);
    }
  }
}
