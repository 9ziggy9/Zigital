export class Gate {
  constructor(x, y, cellSize, ctx) {
    this.x = x;
    this.y = y;
    this.width = cellSize*2;
    this.height = cellSize*2;
    this.ctx = ctx;
  }

  draw(tool='white'){
    let img = new Image();
    img.src = 'logic_gates/AND.svg';
    this.ctx.drawImage(img, this.x, this.y, this.width, this.height);
  }
}
