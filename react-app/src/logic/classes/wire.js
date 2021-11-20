export class Wire {
  constructor(x0,y0,cellSize,ctx,tool) {
    this.x0 = x0;
    this.y0 = y0;
    this.cellSize = cellSize;
    this.ctx = ctx;
    this.tool = tool;
  }

  //Manhattan distance
  d = (a, b) => Math.abs(b.x - a.x) + Math.abs(b.y - a.y)

  AStar(start, end, access) {
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

  reconstructPath(history) {
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

  neighbors(cell, access, target = {x: 0, y: 0}) {
    const {x, y} = cell.point;
    const neighbors = [];
    // console.log(`{${x}, ${y}}`);
    if (x + 1 <= this.width && access[y][x + 1]) {
      access[y][x + 1] = false;
      neighbors.push({
        point: {x: x + 1, y: y},
        parent: {x: x, y: y},
        distance: this.d({x: x + 1, y: y}, target)
      });
    }
    if (x - 1 >= 0 && access[y][x - 1]) {
      access[y][x - 1] = false;
      neighbors.push({
        point: {x: x - 1,y: y},
        parent: {x: x,y: y},
        distance: this.d({x: x - 1,y: y}, target)
      });
    }
    if (y + 1 <= this.height && access[y + 1][x]) {
      access[y + 1][x] = false;
      neighbors.push({
        point: {x: x,y: y + 1},
        parent: {x: x,y: y},
        distance: this.d({x: x, y: y + 1}, target)
      });
    }
    if (y - 1 >= 0 && access[y - 1][x]) {
      access[y - 1][x] = false;
      neighbors.push({
        point: {x: x, y: y - 1},
        parent: {x: x,y: y},
        distance: this.d({x: x, y: y - 1 }, target)
      });
    }
    return neighbors;
  }
}
