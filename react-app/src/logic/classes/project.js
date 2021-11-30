export class Project {
  constructor(gates, bulbs, power,
              wires, occupied, fsm, map) {
    this.gates = gates;
    this.bulbs = bulbs;
    this.power = power;
    this.wires = wires;
    this.occupied = occupied;
    this.fsm = fsm;
    this.map = map;
  }

  pack() {
    return JSON.stringify({
      gates: this.gates,
      bulbs: this.bulbs,
      power: this.power,
      wires: this.wires,
      occupied: this.occupied,
      fsm: this.fsm,
      map: this.map
    });
  }

  static unpack(project) {
    return JSON.parse(project);
  }
}
