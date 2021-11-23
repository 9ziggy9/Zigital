import {Cell} from './classes/generic';

export function createGrid(ctx, cellSize, grid, lw) {
  for (let y = 0; y < ctx.canvas.height; y += cellSize) {
    for (let x = 0; x < ctx.canvas.width; x += cellSize) {
      grid.push(new Cell(x, y, cellSize, ctx, lw));
    }
  }
}

export function handleGrid(grid) {
  for (let i = 0; i < grid.length; i++) {
    grid[i].drawGrid();
  }
}

export function collision(first, second) {
  if (
    !(first.x > second.x + second.width ||
      first.x + first.width < second.x ||
      first.y > second.y + second.height ||
      first.y + first.height < second.y)
  ) { return true; }
  return false;
}

export function handleGateHighlight(grid, mouse, color='white') {
  for (let i = 0; i < grid.length; i++) {
    grid[i].draw(mouse, color);
  }
}

export function handleWireHighlight(grid, mouse, color='white') {
  for (let i = 0; i < grid.length; i++) {
    grid[i].drawWireCell(mouse, color);
  }
}

export function handleGates(gates) {
  for(let i = 0; i < gates.length; i++) {
    gates[i].draw();
  }
}

export function quadrantSnapper(cell, mouse, size) {
  if (cell.x < 0 && cell.y < 0) {
    return {x:mouse.x - (mouse.x % size) + size/2,
            y:mouse.y - (mouse.y % size) + size/2};
  } else if (cell.x < 0 && cell.y > 0){
    return {x:mouse.x - (mouse.x % size) + size/2,
            y:mouse.y - (mouse.y % size) + size};
  } else if (cell.x > 0 && cell.y < 0) {
    return {x:mouse.x - (mouse.x % size) + size,
            y:mouse.y - (mouse.y % size) + size/2};
  } else {
    return {x:mouse.x - (mouse.x % size) + size,
            y:mouse.y - (mouse.y % size) + size};
  }

}
