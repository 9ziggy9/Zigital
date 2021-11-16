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
          <p>NOT</p>
        </button>
        <button id="or-btn">
          <p>OR</p>
        </button>
        <button id="and-btn">
          <p>AND</p>
        </button>
        <button id="xor-btn">
          <p>XOR</p>
        </button>
        <button id="xor-btn">
          <p>NOR</p>
        </button>
        <button id="nand-btn">
          <p>NAND</p>
        </button>
        <button id="xnor-btn">
          <p>XNOR</p>
        </button>
      </div>
    </>
  )
}

export default ComponentsTree;
