import CalculatorModel from './model/calculator-model.js';
import CalculatorView from './view/calculator-view.js';
import CalculatorController from './controller/calculator-controller.js';

let model = new CalculatorModel();
let view = new CalculatorView(model);
let controller = new CalculatorController(model, view);