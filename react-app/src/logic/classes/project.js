export class Project {
  constructor(gates, bulbs, power, wires, occupied) {
    this.gates = gates;
    this.bulbs = bulbs;
    this.power = power;
    this.wires = wires;
    this.occupied = occupied;
  }

  pack() {
    return JSON.stringify({
      gates: this.gates,
      bulbs: this.bulbs,
      power: this.power,
      wires: this.wires,
      occupied: this.occupied,
    });
  }

  static unpack(project) {
    return JSON.parse(project);
  }
}
