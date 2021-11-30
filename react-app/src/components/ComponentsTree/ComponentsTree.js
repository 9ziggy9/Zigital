import React from 'react';
import "./ComponentsTree.css";
import XOR from '../../img/logic_gates/XOR.svg';
import AND from '../../img/logic_gates/AND.svg';
import OR from '../../img/logic_gates/OR.svg';
import NAND from '../../img/logic_gates/NAND.svg';
import XNOR from '../../img/logic_gates/XNOR.svg';
import NOT from '../../img/logic_gates/NOT.svg';
import NOR from '../../img/logic_gates/NOR.svg';
import WIRE from '../../img/logic_gates/WIRE.svg';
import BULBOFF from '../../img/logic_gates/BULBOFF.svg';
import SWITCHOFF from '../../img/logic_gates/SWITCHOFF.svg';
import DELETE from '../../img/logic_gates/DELETE.svg';
import CLICK from '../../img/logic_gates/CLICK.svg';

export const gateLabels = new Set(['not', 'or', 'and',
                                  'xor', 'nor', 'nand',
                                  'xnor']);
export const toolLabels = new Set(['wire', 'delete', 'power',
                                   'bulb', 'click']);

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
      case 'bulb':
        console.log('OTHER: bulb selected');
        setTool('bulb');
        break;
      case 'click':
        console.log('OTHER: click selected');
        setTool('click');
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
          <img src={NOT} alt=""/>
          <p>NOT</p>
        </button>
        <button id="or" onClick={() => selectTool('or')}>
          <img src={OR} alt=""/>
          <p>OR</p>
        </button>
        <button id="and" onClick={() => selectTool('and')}>
          <img src={AND} alt=""/>
          <p>AND</p>
        </button>
        <button id="xor" onClick={() => selectTool('xor')}>
          <img src={XOR} alt=""/>
          <p>XOR</p>
        </button>
        <button id="nor" onClick={() => selectTool('nor')}>
          <img src={NOR} alt=""/>
          <p>NOR</p>
        </button>
        <button id="nand" onClick={() => selectTool('nand')}>
          <img src={NAND} alt=""/>
          <p>NAND</p>
        </button>
        <button id="xnor" onClick={() => selectTool('xnor')}>
          <img src={XNOR} alt=""/>
          <p>XNOR</p>
        </button>
        <button id="wire" onClick={() => selectTool('wire')}>
          <img src={WIRE} alt=""/>
          <p>WIRE</p>
        </button>
        <button id="power" onClick={() => selectTool('power')}>
          <img src={SWITCHOFF} alt=""/>
          <p>POWER</p>
        </button>
        <button id="bulb" onClick={() => selectTool('bulb')}>
          <img src={BULBOFF} alt=""/>
          <p>BULB</p>
        </button>
        <button id="click" onClick={() => selectTool('click')}>
          <img src={CLICK} alt=""/>
          <p>CLICK</p>
        </button>
        <button id="delete" onClick={() => selectTool('delete')}>
          <img src={DELETE} alt=""/>
          <p>DELETE</p>
        </button>
      </div>
    </>
  )
}

export default ComponentsTree;
