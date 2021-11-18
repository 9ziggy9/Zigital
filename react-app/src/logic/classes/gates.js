export class Gate {
  constructor(x, y, cellSize, ctx) {
    this.x = x;
    this.y = y;
    this.width = cellSize*4.25;
    this.height = cellSize*2.5;
    this.ctx = ctx;
  }

  draw(tool='white'){
    let img = new Image();
    img.src = 'logic_gates/AND.svg';
    this.ctx.drawImage(img, this.x, this.y - 9.5, this.width, this.height);
  }
}
