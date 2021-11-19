import React from 'react';
import "./ComponentsTree.css"

const ComponentsTree = ({setTool}) => {

  const selectTool = (id) => {
    const toolLabels = ['not', 'or', 'and',
                        'xor', 'nor', 'nand',
                        'xnor', 'wire']
    switch(id) {
      case 'not':
        console.log('GATE: not selected');
        setTool('red');
        break;
      case 'or':
        console.log('GATE: or selected');
        setTool('green');
        break;
      case 'and':
        console.log('GATE: and selected');
        setTool('blue');
        break;
      case 'xor':
        console.log('GATE: xor selected');
        setTool('yellow');
        break;
      case 'nor':
        console.log('GATE: nor selected');
        setTool('purple')
        break;
      case 'nand':
        console.log('GATE: nand selected');
        setTool('black')
        break;
      case 'xnor':
        console.log('GATE: xnor selected');
        setTool('white')
        break;
      case 'wire':
        console.log('OTHER: wire selected');
        setTool('wire');
        break;
      default: break;
    }
    const buttonNode = document.getElementById(id);
    if (!buttonNode.classList.contains("g-highlight")) {
      buttonNode.classList.add('g-highlight');
    }
    else {
      buttonNode.classList.remove('g-highlight');
    }
    toolLabels.forEach(label => {
      const gateNode = document.getElementById(label);
      if(label !== id)
        gateNode.classList.remove('g-highlight')
    });
  }

  return (
    <>
      <div className='btn-list'>
        <button id="not" onClick={() => selectTool('not')}>
          <img src="logic_gates/NOT.svg" alt=""/>
          <p>NOT</p>
        </button>
        <button id="or" onClick={() => selectTool('or')}>
          <img src="logic_gates/OR.svg" alt=""/>
          <p>OR</p>
        </button>
        <button id="and" onClick={() => selectTool('and')}>
          <img src="logic_gates/AND.svg" alt=""/>
          <p>AND</p>
        </button>
        <button id="xor" onClick={() => selectTool('xor')}>
          <img src="logic_gates/XOR.svg" alt=""/>
          <p>XOR</p>
        </button>
        <button id="nor" onClick={() => selectTool('nor')}>
          <img src="logic_gates/NOR.svg" alt=""/>
          <p>NOR</p>
        </button>
        <button id="nand" onClick={() => selectTool('nand')}>
          <img src="logic_gates/NAND.svg" alt=""/>
          <p>NAND</p>
        </button>
        <button id="xnor" onClick={() => selectTool('xnor')}>
          <img src="logic_gates/XNOR.svg" alt=""/>
          <p>XNOR</p>
        </button>
        <button id="wire" onClick={() => selectTool('wire')}>
          <img src="logic_gates/WIRE.svg" alt=""/>
          <p>WIRE</p>
        </button>
      </div>
    </>
  )
}

export default ComponentsTree;
