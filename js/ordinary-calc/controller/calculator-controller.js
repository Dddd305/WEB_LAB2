export default class CalculatorController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    document.getElementById("%").addEventListener("click", (ev) => {
      this.model.percentCurrent();
      this.view.update();
    });
    document.getElementById("CE").addEventListener("click", (ev) => {
      this.model.clearCurrent();
      this.view.update();
    });
    document.getElementById("C").addEventListener("click", (ev) => {
      this.model.clearAll();
      this.view.update();
    });
    document.getElementById("CL").addEventListener("click", (ev) => {
      this.model.clearLast();
      this.view.update();
    });
    document.getElementById("1/x").addEventListener("click", (ev) => {
      this.model.reverseCurrent();
      this.view.update();
    });
    document.getElementById("x^2").addEventListener("click", (ev) => {
      this.model.squareCurrent();
      this.view.update();
    });
    document.getElementById("sqrtx").addEventListener("click", (ev) => {
      this.model.sqrtCurrent();
      this.view.update();
    });
    document.getElementById("/").addEventListener("click", (ev) => {
      this.model.expendWithDivide();
      this.view.update();
    });
    document.getElementById("7").addEventListener("click", (ev) => {
      this.model.expendWithNumber("7");
      this.view.update();
    });
    document.getElementById("8").addEventListener("click", (ev) => {
      this.model.expendWithNumber("8");
      this.view.update();
    });
    document.getElementById("9").addEventListener("click", (ev) => {
      this.model.expendWithNumber("9");
      this.view.update();
    });
    document.getElementById("x").addEventListener("click", (ev) => {
      this.model.expendWithMultiply();
      this.view.update();
    });
    document.getElementById("4").addEventListener("click", (ev) => {
      this.model.expendWithNumber("4");
      this.view.update();
    });
    document.getElementById("5").addEventListener("click", (ev) => {
      this.model.expendWithNumber("5");
      this.view.update();
    });
    document.getElementById("6").addEventListener("click", (ev) => {
      this.model.expendWithNumber("6");
      this.view.update();
    });
    document.getElementById("-").addEventListener("click", (ev) => {
      this.model.expendWithMinus();
      this.view.update();
    });
    document.getElementById("1").addEventListener("click", (ev) => {
      this.model.expendWithNumber("1");
      this.view.update();
    });
    document.getElementById("2").addEventListener("click", (ev) => {
      this.model.expendWithNumber("2");
      this.view.update();
    });
    document.getElementById("3").addEventListener("click", (ev) => {
      this.model.expendWithNumber("3");
      this.view.update();
    });
    document.getElementById("+").addEventListener("click", (ev) => {
      this.model.expendWithPlus();
      this.view.update();
    });
    document.getElementById("+-").addEventListener("click", (ev) => {
      this.model.reverseSignCurrent();
      this.view.update();
    });
    document.getElementById("0").addEventListener("click", (ev) => {
      this.model.expendWithNumber("0");
      this.view.update();
    });
    document.getElementById(".").addEventListener("click", (ev) => {
      this.model.expendWithDecimalPoint();
      this.view.update();
    });
    document.getElementById("=").addEventListener("click", (ev) => {
      this.model.expendWithEqual();
      this.view.update();
    });
  }
}