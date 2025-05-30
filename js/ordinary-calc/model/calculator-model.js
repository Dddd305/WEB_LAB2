export default class CalculatorModel {
  constructor() {
    this.input = new Array();
    this.current = "";
    this.currentHasDecimalPoint = false;
    this.base = 10;
    this.instant = true;
    this.fragile = true;
  }
  expendWithNumber(num) {
    if (this.fragile) {
      this.current = num;
      this.fragile = false;
      this.currentHasDecimalPoint = false;
    } else {
      this.current += num;
      this.current = Number(this.current).toString();
    }
  }
  expendWithDecimalPoint() {
    if (this.fragile) {
      this.current = ".";
      this.fragile = false;
      this.currentHasDecimalPoint = true;
    }
    if (this.currentHasDecimalPoint) {
      return;
    }
    this.currentHasDecimalPoint = true;
    this.current += ".";
  }
  is2Operation(s) {
    if (s == "+" || s == "-" || s == "*" || s == "/") {
      return true;
    } else {
      return false;
    }
  }
  calculateCurrentValue() {
    if (this.input.length == 0 && this.current.length == 0) return;
    this.current = Function(
      '"use strict";return (' + this.input.join(" ") + " " + this.current + ")"
    )();
  }
  expendWithEqual() {
    this.calculateCurrentValue();
    this.input = [];
    this.shadowClearCurrent();
    this.fragile = true;
  }
  expendInput() {
    this.calculateCurrentValue();
    this.input = [];
    this.input.push(this.current);
    this.shadowClearCurrent();
    this.fragile = true;
  }
  expendWith2Operation() {
    if (this.input.length == 0 && this.current.length == 0) {
      this.input.push("0");
    }
    if (
      this.is2Operation(this.input[this.input.length - 1]) &&
      (this.current.length == 0 || this.fragile)
    ) {
      this.input.pop();
    } else if (this.instant == true) {
      this.expendInput();
    } else {
      this.input.push(this.current);
      this.shadowClearCurrent();
    }
  }
  expendWithPlus() {
    this.expendWith2Operation();
    this.input.push("+");
  }
  expendWithMinus() {
    this.expendWith2Operation();
    this.input.push("-");
  }
  expendWithMultiply() {
    this.expendWith2Operation();
    this.input.push("*");
  }
  expendWithDivide() {
    this.expendWith2Operation();
    this.input.push("/");
  }
  reverseCurrent() {
    this.current = (1 / this.current).toString();
  }
  reverseSignCurrent() {
    this.current = (this.current * -1).toString();
  }
  squareCurrent() {
    this.current = (this.current * this.current).toString();
  }
  sqrtCurrent() {
    this.current = Math.sqrt(this.current).toString();
  }
  percentCurrent() {
    if (this.input.length > 1) {
      if (this.input[1] == "+" || this.input[1] == "-") {
        this.current = ((this.input[0] * this.current) / 100).toString();
      } else {
        this.current = (this.current / 100).toString();
      }
      this.currentHasDecimalPoint = this.current % 1 != 0;
    } else {
      this.clearCurrent();
    }
  }
  shadowClearCurrent() {
    this.fragile = true;
  }
  clearCurrent() {
    this.currentHasDecimalPoint = false;
    this.current = "0";
    this.fragile = true;
  }
  clearAll() {
    this.input = [];
    this.clearCurrent();
  }
  clearLast() {
    if (this.current.length == 0) return;
    if (this.current[this.current.length - 1] == ".") {
      this.currentHasDecimalPoint = false;
    }
    if (this.fragile != true) {
      this.current = this.current.toString().slice(0, -1);
    } else {
      this.current = "0";
    }
  }
}