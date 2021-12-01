// we use the taxicab metric aka manhattan metric between cells as heuristic
// REFERENCE: https://en.wikipedia.org/wiki/Taxicab_geometry#Formal_definition
const taxiD = (a, b) => Math.abs(b.x - a.x) + Math.abs(b.y - a.y);

// I add an additional element to the heuristic, we want to reduce number of turns
// so I associate a cost if moving to a prospective neighbor is associated with a
// turn. Since a and b are vectors from the origin and all steps have distance 1,
// the difference b - a is equal to a +/- the unit vector in the x or y direction.
// i.e. we're interested in the vector U = [b.x - a.x, b.y - a.y].
// But we also need to know the previous unit vector associated with moving to point a
// from a visited point, v, U0 = [a.x - v.x, a.y - v.y].
// The magnitude of the cross product of these two vectors |U x U0| will tell us
// if we are continuing along a path; if it is zero, U and U0 are parallel and we should
// associate a lower cost.
function turnCost(a,b,v) {
    const U0 = {x: a.x - v.x, y: a.y - v.y};
    const U = {x: b.x - a.x, y: b.y - a.y};
    // Compute cross-product
    const X = U0.x*U.y - U0.y*U.x;
    return X === 0 ? 0 : 10;
}

function neighbors(cell, access, target = {x:0, y:0}, v={x:0,y:0}) {
    const {x, y} = cell.point;
    const neighbors = [];
    if (x + 1 < access[0].length && access[y][x+1]) {
        access[y][x+1] = 0;
        const a = {x:x, y:y};
        const b = {x: x+1, y:y};
        neighbors.push({
            point: b,
            parent: a,
            distance: taxiD(b, target) + turnCost(a,b,v)
        });
    }
    if (x - 1 >= 0 && access[y][x-1]) {
        access[y][x-1] = 0;
        const a = {x:x, y:y};
        const b = {x:x-1, y:y};
        neighbors.push({
            point: b,
            parent: a,
            distance: taxiD(b, target) + turnCost(a,b,v)
        });
    }
    if (y + 1 < access.length && access[y+1][x]) {
        access[y+1][x] = 0;
        const a = {x:x, y:y};
        const b = {x:x, y:y+1};
        neighbors.push({
            point: b,
            parent: a,
            distance: taxiD(b, target) + turnCost(a,b,v)
        });
    }
    if (y - 1 >= 0 && access[y-1][x]) {
        access[y-1][x] = 0;
        const a = {x:x, y:y};
        const b = {x:x, y:y-1};
        neighbors.push({
            point: b,
            parent: a,
            distance: taxiD(b, target) + turnCost(a,b,v)
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
  let access = occupied.map(y => y.slice());
  for (let y = 0; y < access.length; y++) {
    for (let x = 0; x < access[0].length; x++) {
      if (occupied[y][x] === 1)
        access[y][x] = 0;
      else
        access[y][x] = 1;
    }
  }
  let queue = [];
  let visited = [];
  queue.push(start);
  while (queue.length > 0) {
    let current = queue[0];
    visited.push(current);
    if (current.point.x === end.point.x && current.point.y === end.point.y) {
      const path = reconstructPath(visited);
      return path;
    }
    if (visited.length > 1)
        queue.push(...neighbors(current, access,
                                {x: end.point.x, y: end.point.y},
                                visited[visited.length - 1].parent));
    else
        queue.push(...neighbors(current, access, {x: end.point.x, y: end.point.y}));
    queue.shift();
    queue.sort((cell1, cell2) => cell1.distance - cell2.distance);
  }
}
