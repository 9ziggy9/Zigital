export class Cell {
  constructor(x, y, cellSize, ctx, lw=2) {
    this.x = x;
    this.y = y;
    this.width = cellSize;
    this.height = cellSize;
    this.ctx = ctx;
    this.lw = lw;
  }

  draw(){
    this.ctx.strokeStyle = '#878787';
    this.ctx.lineWidth = this.lw;
    this.ctx.strokeRect(this.x, this.y, this.width, this.height);
  }
}

export function createGrid(ctx, cellSize, grid, lw) {
  for (let y = 0; y < ctx.canvas.height; y += cellSize) {
    for (let x = 0; x < ctx.canvas.width; x += cellSize) {
      grid.push(new Cell(x, y, cellSize, ctx, lw));
    }
  }
}

export function handleGrid(grid) {
  for (let i = 0; i < grid.length; i++) {
    grid[i].draw();
  }
}
