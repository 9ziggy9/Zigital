// we use the taxicab metric aka manhattan metric between cells as heuristic
// REFERENCE: https://en.wikipedia.org/wiki/Taxicab_geometry#Formal_definition
const taxiD = (a, b) => Math.abs(b.x - a.x) + Math.abs(b.y - a.y);

function neighbors(cell, access, target = {x: 0, y: 0}) {
    const {x, y} = cell.point;
    const neighbors = [];
    if (x + 1 <= access[0].length && access[y][x + 1]) {
        access[y][x + 1] = 0;
        neighbors.push({
            point: {x: x + 1, y: y},
            parent: {x: x, y: y},
            distance: taxiD({x: x + 1, y: y}, target)
        });
    }
    if (x - 1 >= 0 && access[y][x - 1]) {
        access[y][x - 1] = 0;
        neighbors.push({
            point: {x: x - 1,y: y},
            parent: {x: x,y: y},
            distance: taxiD({x: x - 1,y: y}, target)
        });
    }
    if (y + 1 <= access.length && access[y + 1][x]) {
        access[y + 1][x] = 0;
        neighbors.push({
            point: {x: x,y: y + 1},
            parent: {x: x,y: y},
            distance: taxiD({x: x, y: y + 1}, target)
        });
    }
    if (y - 1 >= 0 && access[y - 1][x]) {
        access[y - 1][x] = 0;
        neighbors.push({
            point: {x: x, y: y - 1},
            parent: {x: x,y: y},
            distance: taxiD({x: x, y: y - 1 }, target)
        });
    }
    return neighbors;
}

function reconstructPath(history) {
    const path = [];
    //grab last of visited paths
    let next = history[history.length - 1];
    const end = history[0];
    while (next !== end) {
        path.push(next.point);
        next = history.find(prev => next.parent.x === prev.point.x &&
            next.parent.y === prev.point.y);
    }
    path.push(end.point);
    return path;
}

export function aStar(occupied, start, end) {
  // I have to use a transpose because I have zero fucking forsight.
  // Hack as fuck but it won't hurt time complexity. God damnit.
  let pre_access = occupied.map(e => e.map(e => !e ? 1 : 0));
  let access = pre_access[0].map((_, colIndex) => pre_access.map(row => row[colIndex]));
  console.log(access);
  let queue = [];
  let visited = [];
  queue.push(start);
  while (queue.length > 0) {
    let current = queue[0];
    visited.push(current);
    if (current.point.x === end.point.x && current.point.y === end.point.y) {
      const path = reconstructPath(visited);
      console.log(path);
      console.log(access);
      return path;
    }
    queue.push(...neighbors(current, access, {x: end.point.x, y: end.point.y}));
    queue.shift();
    queue.sort((cell1, cell2) => cell1.distance - cell2.distance);
  }
}
