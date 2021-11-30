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
  })
  return mch;
}
