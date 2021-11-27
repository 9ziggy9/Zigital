import {Cell} from './classes/generic';
import {Gate} from './classes/gates';
import {Bulb} from './classes/bulb';
import {Power} from './classes/power';

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

export function handleWireHighlight(grid, mouse, occupied, size) {
  for (let i = 0; i < grid.length; i++) {
    grid[i].drawWireCell(mouse, occupied, size);
  }
}

export function handleGates(gates) {
  for(let i = 0; i < gates.length; i++) {
    gates[i].draw();
  }
}

export function handleBulbs(bulbs) {
  for(let i = 0; i < bulbs.length; i++) {
    bulbs[i].draw();
  }
}

export function handlePower(power) {
  for(let i = 0; i < power.length; i++) {
    power[i].draw();
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

export function generateComponent(layer, occupied, mouse,
                                  size, ctx, tool) {
  const gateLabels = new Set(['not', 'or', 'and',
                              'xor', 'nor', 'nand', 'xnor']);
  const gridPositionX = mouse.x - (mouse.x % (size * 2));
  const gridPositionY = mouse.y - (mouse.y % (size * 2));
  if (gateLabels.has(tool)) {
    layer.push(new Gate(gridPositionX, gridPositionY, size, ctx, tool));
    // INPUT JUNCTIONS
    occupied[gridPositionY/size][gridPositionX/size] = 2;
    occupied[(gridPositionY/size) + 1][gridPositionX/size] = 2;
    // GATE ITSELF (expanded to deter path finding along edges)
    // Primary cells
    occupied[gridPositionY/size][(gridPositionX/size) + 1] = 1;
    occupied[gridPositionY/size][(gridPositionX/size) + 2] = 1;
    occupied[(gridPositionY/size)+1][(gridPositionX/size) + 1] = 1;
    occupied[(gridPositionY/size)+1][(gridPositionX/size) + 2] = 1;
    // OUTPUT JUNCTIONS
    occupied[gridPositionY/size][(gridPositionX/size)+3] = 3;
    occupied[(gridPositionY/size) + 1][(gridPositionX/size)+3] = 3;
  } else if (tool === 'bulb') {
    layer.push(new Bulb(gridPositionX, gridPositionY, size, ctx));
    occupied[gridPositionY/size][gridPositionX/size] = 2;
    occupied[gridPositionY/size][(gridPositionX/size) + 1] = 1;
    occupied[gridPositionY/size][(gridPositionX/size) + 2] = 1;
    occupied[(gridPositionY/size)+1][(gridPositionX/size) + 1] = 1;
    occupied[(gridPositionY/size)+1][(gridPositionX/size) + 2] = 1;
    occupied[gridPositionY/size][(gridPositionX/size)+3] = 3;
  } else if (tool === 'power') {
    layer.push(new Power(gridPositionX, gridPositionY, size, ctx));
    occupied[gridPositionY/size][(gridPositionX/size) + 1] = 1;
    occupied[gridPositionY/size][(gridPositionX/size) + 2] = 1;
    occupied[(gridPositionY/size)+1][(gridPositionX/size) + 1] = 1;
    occupied[(gridPositionY/size)+1][(gridPositionX/size) + 2] = 1;
    occupied[gridPositionY/size][(gridPositionX/size)+3] = 3;
  }
}

export function openWireRoute(occupied, ctx, size, io) {
  for (let y = 0; y < occupied.length; y++) {
    for (let x = 0; x < occupied[0].length; x++) {
      if (occupied[y][x] === 1) {
        ctx.fillStyle = '#af0000';
        ctx.fillRect(x*size, y*size, size, size);
      }
      if (occupied[y][x] === 2) {
        ctx.fillStyle = '#008700';
        ctx.fillRect(x*size, y*size, size, size);
      }
      if (occupied[y][x] === 3) {
        ctx.fillStyle = '#008700';
        ctx.fillRect(x*size, y*size, size, size);
      }
    }
  }
}

export const occupiedSpace = (x,y,size) => ({x: Math.floor(x / size),
                                             y: Math.floor(y / size)});

export function routeInput() {}
export function routeOutput() {}
