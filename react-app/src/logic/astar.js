// we use the taxicab metric aka manhattan metric between cells as heuristic
// REFERENCE: https://en.wikipedia.org/wiki/Taxicab_geometry#Formal_definition
const taxiD = (a, b) => Math.abs(b.x - a.x) + Math.abs(b.y - a.y);

function reconstructPath() {}

function neighbors(cell, access, target = {x: 0, y: 0}) {
    const {x, y} = cell.point;
    const neighbors = [];
    if (x + 1 < access.length && access[y][x + 1]) {
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
    if (y + 1 < access[0].length && access[y + 1][x]) {
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

export function aStar(occupied, start, end) {
  let access = occupied.map(e => e.map(e => true));
  let queue = [];
  let visited = [];
  queue.push(start);
  while (queue.length > 0) {
    let current = queue[0];
    visited.push(current);
    if (current.point.x === end.point.x && current.point.y === end.point.y) {
      //TODO: implement reconstruct Path
      // const path = reconstructPath(visited);
      // return path;
      console.log('\n','target acquired', current.point.x, current.point.y, '\n');
    }
    //TODO: implement neighbors
    queue.push(...neighbors(current, access, {x: end.point.x, y: end.point.y}));
    queue.shift();
    queue.sort((cell1, cell2) => cell1.distance - cell2.distance);
  }
}
