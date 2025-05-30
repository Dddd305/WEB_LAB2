// programming-calc-controller.js
export default class ProgrammingCalculatorController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.attachEventListeners();
        this.view.update();
    }

    _handleModelUpdate(action) {
        action();
        this.view.update();
    }

    attachEventListeners() {
        for (let i = 0; i <= 9; i++) {
            document.getElementById(`btn-digit-${i}`)?.addEventListener('click', () => {
                this._handleModelUpdate(() => this.model.inputDigit(i.toString()));
            });
        }

        ['A', 'B', 'C', 'D', 'E', 'F'].forEach(hex => {
            document.getElementById(`btn-hex-${hex}`)?.addEventListener('click', () => {
                this._handleModelUpdate(() => this.model.inputDigit(hex));
            });
        });

        document.getElementById('btn-add')?.addEventListener('click', () => { this._handleModelUpdate(() => this.model.inputOperator('+')); });
        document.getElementById('btn-subtract')?.addEventListener('click', () => { this._handleModelUpdate(() => this.model.inputOperator('-')); });
        document.getElementById('btn-multiply')?.addEventListener('click', () => { this._handleModelUpdate(() => this.model.inputOperator('*')); });
        document.getElementById('btn-divide')?.addEventListener('click', () => { this._handleModelUpdate(() => this.model.inputOperator('/')); });
        document.getElementById('btn-modulus')?.addEventListener('click', () => { this._handleModelUpdate(() => this.model.inputOperator('%')); }); // Додано для %

        document.getElementById('btn-lparen')?.addEventListener('click', () => { this._handleModelUpdate(() => this.model.inputParenthesis('(')); });
        document.getElementById('btn-rparen')?.addEventListener('click', () => { this._handleModelUpdate(() => this.model.inputParenthesis(')')); });
        document.getElementById('btn-equals')?.addEventListener('click', () => { this._handleModelUpdate(() => this.model.calculate()); });
        document.getElementById('btn-clear')?.addEventListener('click', () => { this._handleModelUpdate(() => this.model.clear()); });
        document.getElementById('btn-backspace')?.addEventListener('click', () => { this._handleModelUpdate(() => this.model.backspace()); });

        // Нові обробники для крапки та знаку
        document.getElementById('btn-decimal')?.addEventListener('click', () => { this._handleModelUpdate(() => this.model.inputDecimal()); });
        document.getElementById('btn-sign')?.addEventListener('click', () => { this._handleModelUpdate(() => this.model.toggleSign()); });


        this.view.baseRadioButtons.forEach(radio => {
            radio.addEventListener('change', (event) => {
                if (event.target.checked) {
                    const newBase = event.target.value;
                    this._handleModelUpdate(() => this.model.setBase(newBase));
                }
            });
        });

        document.getElementById('op-bitwise-and')?.addEventListener('click', (e) => {
            e.preventDefault();
            this._handleModelUpdate(() => this.model.inputOperator('AND'));
        });
        document.getElementById('op-bitwise-or')?.addEventListener('click', (e) => {
            e.preventDefault();
            this._handleModelUpdate(() => this.model.inputOperator('OR'));
        });
        document.getElementById('op-bitwise-xor')?.addEventListener('click', (e) => {
            e.preventDefault();
            this._handleModelUpdate(() => this.model.inputOperator('XOR'));
        });
        document.getElementById('op-bitwise-nand')?.addEventListener('click', (e) => {
            e.preventDefault();
            this._handleModelUpdate(() => this.model.inputOperator('NAND'));
        });
        document.getElementById('op-bitwise-nor')?.addEventListener('click', (e) => {
            e.preventDefault();
            this._handleModelUpdate(() => this.model.inputOperator('NOR'));
        });
        document.getElementById('op-bitwise-not')?.addEventListener('click', (e) => {
            e.preventDefault();
            this._handleModelUpdate(() => this.model.performBitwiseNot());
        });


        document.getElementById('btn-shift-left')?.addEventListener('click', () => { this._handleModelUpdate(() => this.model.performShift('left')); });
        document.getElementById('btn-shift-right')?.addEventListener('click', () => { this._handleModelUpdate(() => this.model.performShift('right')); });

        document.querySelectorAll('input[name="bitShift"]').forEach(radio => {
            radio.addEventListener('change', (event) => {
                if (event.target.checked) {
                    this.model.setShiftType(event.target.value);
                }
            });
        });
    }
}