import ProgrammingCalculatorModel from './model/programming-calc-model.js';
import ProgrammingCalculatorView from './view/programming-calc-view.js';
import ProgrammingCalculatorController from './controller/programming-calc-controller.js';

const model = new ProgrammingCalculatorModel();
const view = new ProgrammingCalculatorView(model);
const controller = new ProgrammingCalculatorController(model, view);