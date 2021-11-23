import SWITCHOFF from '../../img/logic_gates/SWITCHOFF.svg'

export class Power {
  constructor(x, y, cellSize, ctx) {
    this.x = x;
    this.y = y;
    this.width = cellSize*4.25;
    this.height = cellSize*2.5;
    this.ctx = ctx;
  }

  draw(){
    let img = new Image();
    img.src = SWITCHOFF;
    this.ctx.drawImage(img, this.x, this.y - 9.5, this.width, this.height);
  }
}
