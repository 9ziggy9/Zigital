export class Gate {
  constructor(x, y, cellSize, ctx) {
    this.x = x;
    this.y = y;
    this.width = cellSize*2;
    this.height = cellSize*2;
    this.ctx = ctx;
  }

  draw(tool='white'){
    this.ctx.fillStyle = tool;
    this.ctx.fillRect(this.x,this.y,this.width,this.height);
  }
}
