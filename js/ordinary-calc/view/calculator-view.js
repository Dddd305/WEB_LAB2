export default class CalculatorView {
  constructor(calculatorModel) {
    this.model = calculatorModel;
    this.current = document.getElementById("calculator-current");
    this.input = document.getElementById("calculator-input");
  }

  update() {
    this.current.innerHTML  = this.model.current;
    this.input.innerHTML  = this.model.input.join(' ');
  }
}