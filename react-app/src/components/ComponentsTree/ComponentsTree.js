import React from 'react';
import "./ComponentsTree.css"

const ComponentsTree = () => {
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
        <button id="not-btn">
          <img src="logic_gates/NOT.svg" alt=""/>
          <p>NOT</p>
        </button>
        <button id="or-btn">
          <img src="logic_gates/OR.svg" alt=""/>
          <p>OR</p>
        </button>
        <button id="and-btn">
          <img src="logic_gates/AND.svg" alt=""/>
          <p>AND</p>
        </button>
        <button id="xor-btn">
          <img src="logic_gates/XOR.svg" alt=""/>
          <p>XOR</p>
        </button>
        <button id="nor-btn">
          <img src="logic_gates/NOR.svg" alt=""/>
          <p>NOR</p>
        </button>
        <button id="nand-btn">
          <img src="logic_gates/NAND.svg" alt=""/>
          <p>NAND</p>
        </button>
        <button id="xnor-btn">
          <img src="logic_gates/XNOR.svg" alt=""/>
          <p>XNOR</p>
        </button>
      </div>
    </>
  )
}

export default ComponentsTree;
