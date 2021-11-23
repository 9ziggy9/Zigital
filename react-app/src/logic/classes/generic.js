import {collision} from '../grid';

export class Cell {
  constructor(x, y, cellSize, ctx, lw=2) {
    this.x = x;
    this.y = y;
    this.width = cellSize;
    this.height = cellSize;
    this.ctx = ctx;
    this.lw = lw;
  }

  drawGrid(){
    this.ctx.strokeStyle = '#878787';
    this.ctx.lineWidth = this.lw;
    this.ctx.strokeRect(this.x, this.y, this.width, this.height);
  }

  draw(mouse, color='white'){
    if (collision(this, mouse)) {
      this.ctx.strokeStyle = color;
      this.ctx.lineWidth = this.lw;
      this.ctx.strokeRect(this.x, this.y, this.width*2, this.height);
    }
  }

  drawWireCell(mouse, color='white'){
    if (collision(this, mouse)) {
      this.ctx.strokeStyle = color;
      this.ctx.setLineDash([10,10]);
      this.ctx.lineWidth = this.lw;
      this.ctx.strokeRect(this.x, this.y, this.width*2, this.height*2);
    }
  }
}
