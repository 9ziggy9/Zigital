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
//Manhattan distance
export const d = (a, b) => Math.abs(b.x - a.x) + Math.abs(b.y - a.y)

export function AStar(start, end, access) {
  let queue = [];
  let visited = [];
  queue.push(start);
  while (queue.length > 0) {
    let current = queue[0];
    visited.push(current);
    if (current.point.x === end.point.x && current.point.y === end.point.y) {
      const path = this.reconstructPath(visited);
      return path;
    }
    queue.push(...this.neighbors(current, access, {
      x: end.point.x,
      y: end.point.y
    }));
    queue.shift();
    queue.sort((cell1, cell2) => cell1.distance - cell2.distance);
  }
}

export function reconstructPath(history) {
  const path = [];
  let next = history[history.length - 1];
  const end = history[0];
  while (next !== end) {
    path.push(next.point);
    next = history.find(
      prev => next.parent.x === prev.point.x &&
              next.parent.y === prev.point.y
    );
  }
  path.push(end.point);
  return path;
}

export function neighbors(cell, access, target = {x: 0, y: 0}) {
  const {x, y} = cell.point;
  const neighbors = [];
  // console.log(`{${x}, ${y}}`);
  if (x + 1 <= this.width && access[y][x + 1]) {
    access[y][x + 1] = 0;
    neighbors.push({
      point: {x: x + 1, y: y},
      parent: {x: x, y: y},
      distance: d({x: x + 1, y: y}, target)
    });
  }
  if (x - 1 >= 0 && access[y][x - 1]) {
    access[y][x - 1] = 0;
    neighbors.push({
      point: {x: x - 1,y: y},
      parent: {x: x,y: y},
      distance: d({x: x - 1,y: y}, target)
    });
  }
  if (y + 1 <= this.height && access[y + 1][x]) {
    access[y + 1][x] = 0;
    neighbors.push({
      point: {x: x,y: y + 1},
      parent: {x: x,y: y},
      distance: d({x: x, y: y + 1}, target)
    });
  }
  if (y - 1 >= 0 && access[y - 1][x]) {
    access[y - 1][x] = 0;
    neighbors.push({
      point: {x: x, y: y - 1},
      parent: {x: x,y: y},
      distance: d({x: x, y: y - 1 }, target)
    });
  }
  return neighbors;
}
