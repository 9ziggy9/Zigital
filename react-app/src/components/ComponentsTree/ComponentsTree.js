import React from 'react';
import "./ComponentsTree.css"


export const gateLabels = new Set(['not', 'or', 'and',
                                  'xor', 'nor', 'nand',
                                  'xnor']);
export const toolLabels = new Set(['wire', 'delete', 'power']);

const ComponentsTree = ({setTool}) => {
  const selectTool = (id) => {
    switch(id) {
      case 'not':
        console.log('GATE: not selected');
        setTool('not');
        break;
      case 'or':
        console.log('GATE: or selected');
        setTool('or');
        break;
      case 'and':
        console.log('GATE: and selected');
        setTool('and');
        break;
      case 'xor':
        console.log('GATE: xor selected');
        setTool('xor');
        break;
      case 'nor':
        console.log('GATE: nor selected');
        setTool('nor')
        break;
      case 'nand':
        console.log('GATE: nand selected');
        setTool('nand')
        break;
      case 'xnor':
        console.log('GATE: xnor selected');
        setTool('xnor')
        break;
      case 'wire':
        console.log('OTHER: wire selected');
        setTool('wire');
        break;
      case 'delete':
        console.log('OTHER: delete selected');
        setTool('delete');
        break;
      case 'power':
        console.log('OTHER: power selected');
        setTool('power');
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
    [...gateLabels, ...toolLabels].forEach(label => {
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
        <button id="power" onClick={() => selectTool('power')}>
          <img src="logic_gates/SWITCHOFF.svg" alt=""/>
          <p>POWER</p>
        </button>
        <button id="delete" onClick={() => selectTool('delete')}>
          <img src="logic_gates/DELETE.svg" alt=""/>
          <p>DELETE</p>
        </button>
      </div>
    </>
  )
}

export default ComponentsTree;
