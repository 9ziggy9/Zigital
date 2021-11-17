import React from 'react';
import "./ComponentsTree.css"

const ComponentsTree = ({setTool}) => {

  const selectGate = (id) => {
    const gateLabels = ['not', 'or', 'and',
                        'xor', 'nor', 'nand',
                        'xnor']
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
      default: break;
    }
    const buttonNode = document.getElementById(id);
    if (!buttonNode.classList.contains("g-highlight")) {
      buttonNode.classList.add('g-highlight');
    }
    else {
      buttonNode.classList.remove('g-highlight');
    }
    gateLabels.forEach(label => {
      const gateNode = document.getElementById(label);
      if(label !== id)
        gateNode.classList.remove('g-highlight')
    });
  }

  return (
    <>
      <div className='btn-list'>
        <button id="not" onClick={() => selectGate('not')}>
          <img src="logic_gates/NOT.svg" alt=""/>
          <p>NOT</p>
        </button>
        <button id="or" onClick={() => selectGate('or')}>
          <img src="logic_gates/OR.svg" alt=""/>
          <p>OR</p>
        </button>
        <button id="and" onClick={() => selectGate('and')}>
          <img src="logic_gates/AND.svg" alt=""/>
          <p>AND</p>
        </button>
        <button id="xor" onClick={() => selectGate('xor')}>
          <img src="logic_gates/XOR.svg" alt=""/>
          <p>XOR</p>
        </button>
        <button id="nor" onClick={() => selectGate('nor')}>
          <img src="logic_gates/NOR.svg" alt=""/>
          <p>NOR</p>
        </button>
        <button id="nand" onClick={() => selectGate('nand')}>
          <img src="logic_gates/NAND.svg" alt=""/>
          <p>NAND</p>
        </button>
        <button id="xnor" onClick={() => selectGate('xnor')}>
          <img src="logic_gates/XNOR.svg" alt=""/>
          <p>XNOR</p>
        </button>
      </div>
    </>
  )
}

export default ComponentsTree;
