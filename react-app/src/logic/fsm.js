export const mHash = (fs, property) => fs.reduce((output, item) => {
  output[item[property]] = item;
  return output;
}, {});

const not = a => ~a & 1;
const and = (a,b) => a && b;
const nand = (a,b) => not(a && b);
const or = (a,b) => a || b;
const nor = (a,b) => not(a || b);
const xor = (a,b) => a ^ b;
const xnor = (a,b) => not(a ^ b);

export function fsm_eval(mch, map) {
  const OP = (logic, component) => {
    const out1 = map[component.input[0]];
    const out2 = map[component.input[2]];
    component.state = (out1 === 'F' || out2 === 'F')
    ? 'F'
    : logic(out1.state, out2.state);
    return;
  }
  mch.forEach(component => {
    if (component.type === 'power') return;
    if (component.type === 'and') return OP(and, component);
    if (component.type === 'nor') return OP(nor, component);
    if (component.type === 'xor') return OP(xor, component);
    if (component.type === 'nand') return OP(nand, component);
    if (component.type === 'xnor') return OP(xnor, component);
    if (component.type === 'or') return OP(or, component);
    if (component.type === 'not') {
      const out = map[component.input[0]];
      component.state = out === 'F' ? 'F' : not(out.state);
      return;
    }
    if (component.type === 'bulb')  {
      const out = map[component.input[0]];
      component.state = out === 'F' ? 'F' : out.state;
      return;
    }
  })
  return mch;
}

export function determine_component(x,y,occ) {
  switch (occ[y][x]) {
    case 2: break;
    case 3:
      return {type:'or',id:`${x-4}`+`${y-2}`};
    case 4:
      return {type:'and',id:`${x-4}`+`${y-2}`};
    case 5:
      return {type:'xor',id:`${x-4}`+`${y-2}`};
    case 6:
      return {type:'nor',id:`${x-4}`+`${y-2}`};
    case 7:
      return {type:'nand',id:`${x-4}`+`${y-2}`};
    case 8:
      return {type:'xnor',id:`${x-4}`+`${y-2}`};
    case -3:
      if (occ[y-2][x] === -3)
        return {type:'or', id:`${x}`+`${y-3}`}
      return {type:'or',id:`${x}`+`${y-1}`};
    case -4:
      if (occ[y-2][x] === -4)
        return {type:'and', id:`${x}`+`${y-3}`}
      return {type:'and',id:`${x}`+`${y-1}`};
    case -5:
      if (occ[y-2][x] === -5)
        return {type:'xor', id:`${x}`+`${y-3}`}
      return {type:'xor',id:`${x}`+`${y-1}`};
    case -6:
      if (occ[y-2][x] === -6)
        return {type:'nor', id:`${x}`+`${y-3}`}
      return {type:'nor',id:`${x}`+`${y-1}`};
    case -7:
      if (occ[y-2][x] === -7)
        return {type:'nand', id:`${x}`+`${y-3}`}
      return {type:'nand',id:`${x}`+`${y-1}`};
    case -8:
      if (occ[y-2][x] === -8)
        return {type:'xnor', id:`${x}`+`${y-3}`}
      return {type:'xnor',id:`${x}`+`${y-1}`};
    // POWER
    case 9:
      return {type:'power', id:`${x-4}`+`${y-1}`}
    case -9:
      return {type:'bulb', id:`${x}`+`${y-1}`}
    default: break;
  }
}

export function fsm_push(mch) {}
