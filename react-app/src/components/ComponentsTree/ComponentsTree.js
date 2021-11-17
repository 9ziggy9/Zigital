import React from 'react';
import "./ComponentsTree.css"

const ComponentsTree = () => {

  const selectGate = (id) => {
    switch(id) {
      case 'not':
        console.log('GATE: not selected');
        break;
      case 'or':
        console.log('GATE: or selected');
        break;
      case 'and':
        console.log('GATE: and selected');
        break;
      case 'xor':
        console.log('GATE: xor selected');
        break;
      case 'nor':
        console.log('GATE: nor selected');
        break;
      case 'nand':
        console.log('GATE: nand selected');
        break;
      case 'xnor':
        console.log('GATE: xnor selected');
        break;
    }
  }
  // const toggleMenu = (id, menu) => {
  //   const menuNode = document.getElementById(menu);
  //   const buttonNode = document.getElementById(id);
  //   if (!menuNode.classList.contains("hidden")) {
  //     menuNode.classList.add("hidden");
  //     buttonNode.classList.remove('highlight');
  //     buttonNode.classList.add('unhighlight');
  //   }
  //   else {
  //     menuNode.classList.remove("hidden");
  //     buttonNode.classList.add('highlight');
  //     buttonNode.classList.remove('unhighlight');
  //   }
  // }
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
