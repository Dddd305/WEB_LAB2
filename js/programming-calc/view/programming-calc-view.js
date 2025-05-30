// programming-calc-view.js
export default class ProgrammingCalculatorView {
    constructor(model) {
        this.model = model;
        this.expressionDisplay = document.getElementById("calculator-input");
        this.resultDisplay = document.getElementById("calculator-current");

        this.digitButtons = {};
        for (let i = 0; i <= 9; i++) {
            this.digitButtons[i] = document.getElementById(`btn-digit-${i}`);
        }

        this.hexButtons = {
            'A': document.getElementById('btn-hex-A'),
            'B': document.getElementById('btn-hex-B'),
            'C': document.getElementById('btn-hex-C'),
            'D': document.getElementById('btn-hex-D'),
            'E': document.getElementById('btn-hex-E'),
            'F': document.getElementById('btn-hex-F'),
        };
        this.baseRadioButtons = document.querySelectorAll('input[name="baseSelect"]');

        // Додамо кнопки для керування їх активністю
        this.decimalButton = document.getElementById('btn-decimal');
        this.signButton = document.getElementById('btn-sign');
        this.modulusButton = document.getElementById('btn-modulus'); // Якщо потрібно керувати активністю
        // ... інші кнопки, якими треба керувати (наприклад, бітові операції)
    }

    update() {
        if (this.expressionDisplay) {
            this.expressionDisplay.textContent = this.model.displayExpression;
        }
        if (this.resultDisplay) {
            // Якщо результат "Error", але є деталі (наприклад "Error: Parentheses"), показуємо їх
            if (this.model.displayResult && this.model.displayResult.startsWith("Error:") && this.model.displayResult.length > 5) {
                 this.resultDisplay.textContent = this.model.displayResult;
            } else {
                 this.resultDisplay.textContent = this.model.formatNumberForDisplay(
                    this.model.parseCurrentValue(this.model.displayResult, this.model.currentBase === 10 && this.model.displayResult.includes('.') ? 10 : this.model.currentBase), // Парсимо з урахуванням можливої крапки в базі 10
                    this.model.currentBase
                );
                 if (this.model.displayResult === "Error") this.resultDisplay.textContent = "Error"; // Якщо просто Error
            }
        }


        const currentBase = this.model.currentBase;

        for (const btn of Object.values(this.hexButtons)) {
            if (btn) btn.disabled = (currentBase !== 16);
        }

        for (let i = 0; i <= 9; i++) {
            const btn = this.digitButtons[i];
            if (btn) {
                if (currentBase === 2) {
                    btn.disabled = (i > 1);
                } else if (currentBase === 8) {
                    btn.disabled = (i > 7);
                } else { // 10 or 16
                    btn.disabled = false;
                }
            }
        }

        // Керування активністю кнопки крапки та знаку
        if (this.decimalButton) {
            this.decimalButton.disabled = (currentBase !== 10);
        }
        if (this.signButton) {
            this.signButton.disabled = (currentBase !== 10); // Поки що знак +/- тільки для бази 10
        }
        // Можна додати керування активністю для '%' та інших операцій, якщо вони не для всіх баз
        // if (this.modulusButton) {
        //     this.modulusButton.disabled = (currentBase !== 10); // Наприклад
        // }


        this.baseRadioButtons.forEach(radio => {
            if (radio.value === currentBase.toString()) {
                radio.checked = true;
            }
        });
    }
}