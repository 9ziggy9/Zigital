import {collision} from '../grid';

export class Gate {
  constructor(x, y, cellSize, ctx) {
    this.x = x;
    this.y = y;
    this.width = cellSize*2;
    this.height = cellSize*2;
    this.ctx = ctx;
  }

  drawGrid(){
    this.ctx.strokeStyle = '#878787';
    this.ctx.lineWidth = this.lw;
    this.ctx.strokeRect(this.x, this.y, this.width, this.height);
  }

  draw(mouse, tool='white'){
    if (collision(this, mouse)) {
      this.ctx.strokeStyle = tool;
      this.ctx.lineWidth = this.lw;
      this.ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
  }
}
