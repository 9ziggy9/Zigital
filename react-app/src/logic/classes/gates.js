// I actually have to put in the svgs here for god damn
// Heroku to work. Jesus Christ.

import NOT from '../../img/logic_gates/NOT.svg'
import OR from '../../img/logic_gates/OR.svg'
import AND from '../../img/logic_gates/AND.svg'
import XOR from '../../img/logic_gates/XOR.svg'
import NOR from '../../img/logic_gates/NOR.svg'
import NAND from '../../img/logic_gates/NAND.svg'
import XNOR from '../../img/logic_gates/XNOR.svg'


export class Gate {
  constructor(x, y, cellSize, ctx, gate) {
    this.x = x;
    this.y = y;
    this.width = cellSize*4.25;
    this.height = cellSize*2.5;
    this.ctx = ctx;
    this.gate = gate;
  }

  draw(){
    let img = new Image();
    switch (this.gate) {
      case 'not':
        img.src = NOT;
        break;
      case 'or':
        img.src = OR;
        break;
      case 'and':
        img.src = AND;
        break;
      case 'xor':
        img.src = XOR;
        break;
      case 'nor':
        img.src = NOR;
        break;
      case 'nand':
        img.src = NAND;
        break;
      case 'xnor':
        img.src = XNOR;
        break;
      default: break;
    }
    this.ctx.drawImage(img, this.x, this.y - 9.5, this.width, this.height);
  }
}
