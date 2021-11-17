export class Cell {
  constructor(x, y, cellSize) {
    this.x = x;
    this.y = y;
    this.width = cellSize;
    this.height = cellSize;
  }
  draw(ctx){
    ctx.strokeStyle = 'black';
  }
}
