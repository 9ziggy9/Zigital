import SWITCHOFF from '../../img/logic_gates/SWITCHOFF.svg'
import SWITCHON from '../../img/logic_gates/SWITCHON.svg'

export class Power {
  constructor(x, y, cellSize, ctx) {
    this.x = x;
    this.y = y;
    this.width = cellSize*4.25;
    this.height = cellSize*2.5;
    this.ctx = ctx;
  }

  draw(state='off'){
    let img = new Image();
    if (state === 'off') {
      img.src = SWITCHOFF;
      this.ctx.drawImage(img, this.x, this.y-1, this.width*1.25, this.height * 1.25);
    } else {
      img.src = SWITCHON;
      this.ctx.drawImage(img, this.x, this.y-1, this.width*1.25, this.height * 1.25);
    }
  }
}
