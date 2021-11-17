export class Cell {
  constructor(x, y, cellSize) {
    this.x = x;
    this.y = y;
    this.width = cellSize;
    this.height = cellSize;
  }

  draw(ctx){
    ctx.strokeStyle = 'black';
    ctx.strokeRect(this.x, this.y, this.width, this.height);
  }
}

export function createGrid(canvas, cellSize, grid) {
  for (let y = cellSize; y < canvas.height; y += cellSize) {
    for (let x = 0; x < canvas.width; x += cellSize) {
      grid.push(new Cell(x, y, cellSize));
    }
  }
}

export function handleGrid(grid) {
  for (let i = 0; i < grid.length; i++) {
    grid[i].draw();
  }
}
