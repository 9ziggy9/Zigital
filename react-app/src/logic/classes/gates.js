export class Gate {
  constructor(x, y, cellSize, ctx) {
    this.x = x;
    this.y = y;
    this.width = cellSize*4.25;
    this.height = cellSize*2.5;
    this.ctx = ctx;
  }

  draw(tool='and'){
    let img = new Image();
    switch (tool) {
      case 'not':
        img.src = 'logic_gates/NOT.svg';
        break;
      case 'or':
        img.src = 'logic_gates/OR.svg';
        break;
      case 'and':
        img.src = 'logic_gates/AND.svg';
        break;
      case 'xor':
        img.src = 'logic_gates/XOR.svg';
        break;
      case 'nor':
        img.src = 'logic_gates/NOR.svg';
        break;
      case 'nand':
        img.src = 'logic_gates/NAND.svg';
        break;
      case 'xnor':
        img.src = 'logic_gates/XNOR.svg';
        break;
      default: break;
    }
    this.ctx.drawImage(img, this.x, this.y - 9.5, this.width, this.height);
  }
}
