export default class ProgrammingCalculatorModel {
    constructor() {
        this.currentValue = "0";
        this.expressionParts = [];
        this.currentBase = 10;
        this.selectedShiftType = 'arithmetic';

        this.displayExpression = "0";
        this.displayResult = "0";

        this.isFragile = true;
        this.hasDecimal = false;
    }

    setBase(newBaseStr) {
        const newBase = parseInt(newBaseStr, 10);
        if (this.currentBase === newBase) return;

        try {
            if (this.displayResult !== "Error" && this.displayResult !== "0") {
                const decimalValue = parseInt(this.displayResult, this.currentBase);
                if (!isNaN(decimalValue)) {
                    this.displayResult = this.formatNumberForDisplay(decimalValue, newBase);
                    this.currentValue = this.displayResult;
                } else {
                    const currentDecimal = this.parseCurrentValue(this.currentValue, this.currentBase);
                    if(!isNaN(currentDecimal)) {
                        this.displayResult = this.formatNumberForDisplay(currentDecimal, newBase);
                        this.currentValue = this.displayResult;
                    } else {
                        this.displayResult = "0";
                        this.currentValue = "0";
                    }
                }
            } else if (this.currentValue !== "0" && this.currentValue !== "") {
                 const decimalValue = this.parseCurrentValue(this.currentValue, this.currentBase);
                 if (!isNaN(decimalValue)) {
                    this.displayResult = this.formatNumberForDisplay(decimalValue, newBase);
                    this.currentValue = this.displayResult;
                 } else {
                    this.displayResult = "0";
                    this.currentValue = "0";
                 }
            } else {
                this.displayResult = "0";
                 this.currentValue = "0";
            }
        } catch (e) {
            this.displayResult = "Error";
            this.currentValue = "0";
        }
        this.currentBase = newBase;
        this.isFragile = true;
        this._updateDisplayExpression();
    }

    setShiftType(type) {
        this.selectedShiftType = type;
    }

    inputDigit(digit) {
        const upperDigit = digit.toUpperCase();
        if (this.isInvalidDigitForBase(upperDigit, this.currentBase)) return;

        if (this.currentValue === "-" && this.isFragile) { 
        }
        if (this.isFragile || (this.currentValue === "0" && upperDigit !== ".")) { 
            this.currentValue = upperDigit;
            this.isFragile = false;
        } else {
            if (this.currentValue.length < 24) {
                this.currentValue += upperDigit;
            }
        }
        this.displayResult = this.currentValue;
        this._updateDisplayExpression();
    }

     inputOperator(op) {
        if (!this.isFragile && this.currentValue !== "" && this.currentValue !== "-") {
            this.expressionParts.push(this.parseCurrentValue(this.currentValue, this.currentBase));
            this.hasDecimal = false;
        } else if (this.currentValue === "-" && this.expressionParts.length > 0 && !this.isOperator(this.expressionParts[this.expressionParts.length -1])) {
            this.displayResult = "Error";
            this._updateDisplayExpression();
            return;
        } else if (this.expressionParts.length === 0 && (this.currentValue === "0" || this.currentValue === "") && op !== '-') {
            return; 
        }


        const lastPart = this.expressionParts.length > 0 ? this.expressionParts[this.expressionParts.length - 1] : null;

        if (op === "-" && (this.expressionParts.length === 0 || this.isOperator(lastPart) || lastPart === '(') && (this.isFragile || this.currentValue === "0" || this.currentValue === "")) {
            this.currentValue = "-";
            this.isFragile = false; 
            this.displayResult = this.currentValue;
            this._updateDisplayExpression();
            return; 
        } else if (this.isOperator(lastPart) && (this.isFragile || this.currentValue === "0" || this.currentValue === "")) {
            if (!(op === '-' && (this.isOperator(lastPart) || lastPart === '('))) {
                 this.expressionParts.pop();
            }
            this.expressionParts.push(op);
        } else if (this.expressionParts.length > 0 || (!this.isFragile && this.currentValue !== "" && this.currentValue !== "0")) {
             this.expressionParts.push(op);
        } else if (this.expressionParts.length === 0 && this.currentValue === "0" && op === '-') {
            this.currentValue = "-";
            this.isFragile = false;
            this.displayResult = this.currentValue;
            this._updateDisplayExpression();
            return;
        }
         else {
            return; 
        }

        this.currentValue = "0";
        this.isFragile = true;
        this._updateDisplayExpression();
    }
    
    isOperator(token) {
        return ['+', '-', '*', '/', '%', 'AND', 'OR', 'XOR', 'NAND', 'NOR'].includes(token?.toString().toUpperCase());
    }

     inputParenthesis(p) {
        if (p === '(') {
            const lastPartIsNumberOrClosingParen = (!this.isFragile && this.currentValue !== "" && this.currentValue !== "-") ||
                                               (this.expressionParts.length > 0 && (typeof this.expressionParts[this.expressionParts.length - 1] === 'number' || this.expressionParts[this.expressionParts.length - 1] === ')'));

            if (lastPartIsNumberOrClosingParen) {
                if (!this.isFragile && this.currentValue !== "" && this.currentValue !== "-") {
                    this.expressionParts.push(this.parseCurrentValue(this.currentValue, this.currentBase));
                    this.hasDecimal = false;
                }
                this.expressionParts.push('*');
            }
            this.expressionParts.push('(');
            this.currentValue = "0";
            this.isFragile = true;
        } else if (p === ')') {
            if (!this.isFragile && this.currentValue !== "" && this.currentValue !== "-") {
                this.expressionParts.push(this.parseCurrentValue(this.currentValue, this.currentBase));
                this.hasDecimal = false;
            } else {
                const lastPart = this.expressionParts.length > 0 ? this.expressionParts[this.expressionParts.length - 1] : null;
                if (this.isOperator(lastPart) || lastPart === '(') {
                }
            }
            this.expressionParts.push(')');
            this.currentValue = "0"; 
            this.isFragile = true; 
        }
        this._updateDisplayExpression();
    }

    calculate() {
        if (this.currentValue !== "" && this.currentValue !== "0" || (this.currentValue === "0" && !this.isFragile) || (this.currentValue === "-" && this.expressionParts.length > 0) ) {
            if (this.currentValue === "-" && this.expressionParts.length > 0 && !this.isOperator(this.expressionParts[this.expressionParts.length -1])) {
                this.displayResult = "Error";
                this.isFragile = true;
                return;
            }
            this.expressionParts.push(this.parseCurrentValue(this.currentValue, this.currentBase));
        }

        let balance = 0;
        for (const part of this.expressionParts) {
            if (part === '(') balance++;
            else if (part === ')') balance--;
        }
        if (balance !== 0) {
            this.displayResult = "Error: Parentheses";
            this.isFragile = true;
            this.currentValue = "0";
            return;
        }
        
        if (this.expressionParts.length === 0) {
            this.displayResult = this.formatNumberForDisplay(this.parseCurrentValue(this.currentValue, this.currentBase), this.currentBase);
            this._updateDisplayExpression();
            return;
        }


        try {
            const lastPart = this.expressionParts[this.expressionParts.length - 1];
            if (this.isOperator(lastPart) && this.expressionParts.length > 1) {
                 this.displayResult = "Error: Trailing operator";
                 this.isFragile = true;
                 this.currentValue = "0";
                 return;
            }

            let resultDecimal = this.evaluateExpression([...this.expressionParts]);
            if (isNaN(resultDecimal) || !isFinite(resultDecimal)) {
                this.displayResult = "Error";
                this.currentValue = "0";
            } else {
                this.currentValue = this.formatNumberForDisplay(resultDecimal, this.currentBase);
                this.displayExpression = this.expressionParts.map(part => {
                    if (typeof part === 'number') return this.formatNumberForDisplay(part, this.currentBase);
                    return part;
                }).join(" ") + " =";
                this.displayResult = this.currentValue;
            }
            this.expressionParts = [];
            this.isFragile = true;
        } catch (e) {
            console.error("Calculation error:", e);
            this.displayResult = "Error";
            this.currentValue = "0";
            this.expressionParts = [];
            this.isFragile = true;
        }
    }

    performBitwiseNot() {
        if (this.currentValue === "" || this.currentValue === "-") { this.displayResult = "Error"; return; }
        let originalValueForDisplay = this.currentValue; 
        let num = this.parseCurrentValue(this.currentValue, this.currentBase);

        if (isNaN(num)) { this.displayResult = "Error"; return; }

        num = ~num;

        this.currentValue = this.formatNumberForDisplay(num, this.currentBase);
        let displayOriginalValue = originalValueForDisplay;
        this.displayExpression = `NOT(${this.formatNumberForDisplay(this.parseCurrentValue(originalValueForDisplay, this.currentBase), this.currentBase)}) =`;
        this.displayResult = this.currentValue;
        this.isFragile = true; 
        this.expressionParts = []; 
    }

    performShift(direction) {
        if (this.currentValue === "" || this.currentValue === "-") { this.displayResult = "Error"; return; }
        let originalValueForDisplay = this.currentValue;
        let num = this.parseCurrentValue(this.currentValue, this.currentBase);

        if (isNaN(num)) { this.displayResult = "Error"; return; }

        const shiftAmount = 1; 

        let previousNum = num; 

        if (direction === 'left') {
            num = num << shiftAmount;
        } else {
            if (this.selectedShiftType === 'arithmetic') {
                num = num >> shiftAmount; 
            } else if (this.selectedShiftType === 'logical') {
                num = num >>> shiftAmount; 
            }
        }

        this.currentValue = this.formatNumberForDisplay(num, this.currentBase);
        this.displayExpression = `${this.formatNumberForDisplay(this.parseCurrentValue(originalValueForDisplay, this.currentBase), this.currentBase)} ${direction === 'left' ? '<<' : (this.selectedShiftType === 'logical' ? '>>>' : '>>')} ${shiftAmount} =`;
        this.displayResult = this.currentValue;
        this.isFragile = true;
        this.expressionParts = []; 
    }


    clear() {
        this.currentValue = "0";
        this.expressionParts = [];
        this.isFragile = true;
        this.displayExpression = "0";
        this.displayResult = "0";
    }

    backspace() {
        if (!this.isFragile && this.currentValue.length > 0) {
            this.currentValue = this.currentValue.slice(0, -1);
            if (this.currentValue === "" || this.currentValue === "-") {
                this.currentValue = "0";
                this.isFragile = true;
            }
        } else if (this.isFragile && this.expressionParts.length > 0) {
            const removedPart = this.expressionParts.pop();
             if (this.expressionParts.length > 0) {
                const lastPart = this.expressionParts[this.expressionParts.length -1];
                if (typeof lastPart === 'number' && !this.isOperator(lastPart) && lastPart !== '(' && lastPart !== ')') {
                    this.currentValue = this.formatNumberForDisplay(lastPart, this.currentBase);
                    this.expressionParts.pop();
                    this.isFragile = false;
                }
            } else {
                this.currentValue = "0";
                this.isFragile = true;
            }
        } else { 
             return;
        }
        this.displayResult = this.isFragile ? (this.expressionParts.length > 0 ? this.currentValue : "0") : this.currentValue;
        if (this.currentValue === "0" && this.expressionParts.length === 0) this.displayResult = "0";

        this._updateDisplayExpression();
    }

    _updateDisplayExpression() {
        let exprDisplayArray = this.expressionParts.map(part => {
            if (typeof part === 'number') {
                if (this.currentBase === 10 && !Number.isInteger(part) && part.toString().includes('.')) {
                    return part.toString();
                }
                return this.formatNumberForDisplay(part, this.currentBase);
            }
            return part;
        });

        let currentExpressionString = exprDisplayArray.join(" ");

        if (!this.isFragile && this.currentValue !== "") {
            const addSpace = currentExpressionString !== "" && currentExpressionString !== "0" && !this.isOperatorOrParenthesis(currentExpressionString.slice(-1));
            if (currentExpressionString === "0" && this.currentValue !== "0" && this.currentValue !== ".") { // Щоб не було "0 5", а просто "5"
                 currentExpressionString = "";
            } else if (addSpace) {
                 currentExpressionString += " ";
            }
            currentExpressionString += this.currentValue;
        }

        this.displayExpression = currentExpressionString.trim() || "0";

        if (this.displayResult !== "Error") {
            if (!this.isFragile) {
                this.displayResult = this.currentValue;
            } else {
                if (this.expressionParts.length === 0 && this.currentValue === "0") {
                    this.displayResult = "0";
                }
            }
        }
        if (this.displayResult === "" && !(this.displayExpression.includes("="))) {
            this.displayResult = "0";
        }
         if (this.displayExpression === "" && this.currentValue === "0" && this.isFragile) {
             this.displayExpression = "0";
         }
    }

inputDecimal() {
        if (this.currentBase !== 10) return;

        if (this.isFragile) {
            this.currentValue = "0.";
            this.isFragile = false;
            this.hasDecimal = true;
        } else if (!this.hasDecimal && !this.currentValue.includes('.')) {
            this.currentValue += ".";
            this.hasDecimal = true;
        }
        this.displayResult = this.currentValue;
        this._updateDisplayExpression();
    }

    toggleSign() {
        if (this.currentValue === "Error" || this.isFragile) return;

        if (this.currentBase === 10) {
            if (this.currentValue === "0" || this.currentValue === "0.") return; 

            if (this.currentValue.startsWith("-")) {
                this.currentValue = this.currentValue.substring(1);
            } else {
                this.currentValue = "-" + this.currentValue;
            }
        } else {
            return; 
        }
        this.displayResult = this.currentValue;
        this._updateDisplayExpression();
    }

    parseCurrentValue(valueStr, base) {
        if (valueStr === "Error" || valueStr === null || typeof valueStr === 'undefined') return NaN;
        if (valueStr === "" && base !==10) return 0;
        if (valueStr === "" && base === 10) return NaN;
        if (valueStr === "-") return NaN;
        if (base === 10 && valueStr.includes('.')) {
            const parsed = parseFloat(valueStr);
            return parsed;
        }
        return parseInt(valueStr, base);
    }

    formatNumberForDisplay(decimalValue, targetBase) {
        if (isNaN(decimalValue) || decimalValue === null) return "Error";
        if (targetBase < 2 || targetBase > 36) return "Error: Invalid base";
        if (targetBase === 10 && !Number.isInteger(decimalValue) && decimalValue.toString().includes('.')) {
            let s = decimalValue.toString();
            if (s.includes('.')) {
                const parts = s.split('.');
                 return s;
            }
            return s;
        }
        return Math.trunc(decimalValue).toString(targetBase).toUpperCase();
    }

    isInvalidDigitForBase(digit, base) {
        const validDigits = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".slice(0, base);
        if (digit === "-" && base === 10) return false;
        return !validDigits.includes(digit.toUpperCase());
    }

    evaluateExpression(parts) {
        const shuntingYard = (tokens) => {
            const outputQueue = [];
            const operatorStack = [];
            const precedence = {
                'OR': 1, 'XOR': 1, 'NAND': 1, 'NOR': 1, 
                'AND': 2,
                '+': 3, '-': 3,
                '*': 4, '/': 4, '%': 4,
            };
            const associativity = {
                '+': 'L', '-': 'L', '*': 'L', '/': 'L', '%': 'L',
                'AND': 'L', 'OR': 'L', 'XOR': 'L', 'NAND': 'L', 'NOR': 'L'
            };

            tokens.forEach(token => {
                if (typeof token === 'number') {
                    outputQueue.push(token);
                } else if (this.isOperator(token)) {
                    const op1 = token.toUpperCase();
                    while (operatorStack.length > 0) {
                        const op2 = operatorStack[operatorStack.length - 1].toUpperCase();
                        if (this.isOperator(op2) &&
                            ((associativity[op1] === 'L' && precedence[op1] <= precedence[op2]) ||
                             (associativity[op1] === 'R' && precedence[op1] < precedence[op2]))) {
                            outputQueue.push(operatorStack.pop());
                        } else {
                            break;
                        }
                    }
                    operatorStack.push(token);
                } else if (token === '(') {
                    operatorStack.push(token);
                } else if (token === ')') {
                    while (operatorStack.length > 0 && operatorStack[operatorStack.length - 1] !== '(') {
                        outputQueue.push(operatorStack.pop());
                    }
                    if (operatorStack.length > 0 && operatorStack[operatorStack.length - 1] === '(') {
                        operatorStack.pop();
                    } else {
                        throw new Error("Mismatched parentheses in Shunting Yard");
                    }
                }
            });

            while (operatorStack.length > 0) {
                const op = operatorStack.pop();
                if (op === '(') throw new Error("Mismatched parentheses after Shunting Yard");
                outputQueue.push(op);
            }
            return outputQueue;
        };
        
        const calculateRPN = (rpnTokens) => {
            const stack = [];
            rpnTokens.forEach(token => {
                if (typeof token === 'number') {
                    stack.push(token);
                } else if (this.isOperator(token)) {
                    if (stack.length < 2 && !['NOT'].includes(token.toUpperCase())) { 
                         throw new Error("Invalid RPN expression: not enough operands for " + token);
                    }
                    const b = stack.pop();
                    const a = stack.pop();
                    
                    let result;
                    switch (token.toUpperCase()) {
                        case '+': result = a + b; break;
                        case '-': result = a - b; break;
                        case '*': result = a * b; break;
                        case '/': 
                            if (b === 0) throw new Error("Division by zero");
                            result = Math.trunc(a / b);
                            break;
                        case '%': 
                            if (b === 0) throw new Error("Modulo by zero");
                            result = a % b; 
                            break;
                        case 'AND': result = a & b; break;
                        case 'OR':  result = a | b; break;
                        case 'XOR': result = a ^ b; break;
                        case 'NAND':result = ~(a & b); break;
                        case 'NOR': result = ~(a | b); break;
                        default: throw new Error("Unknown operator in RPN: " + token);
                    }
                    stack.push(result);
                } else {
                    throw new Error("Unknown token in RPN: " + token);
                }
            });
            if (stack.length !== 1) throw new Error("Invalid RPN expression: stack final size is " + stack.length);
            return stack[0];
        };

        try {
            const processedParts = [];
            for(let i=0; i < parts.length; i++) {
                if(parts[i] === '-' && (i === 0 || parts[i-1] === '(' || this.isOperator(parts[i-1]))) {
                    if (i + 1 < parts.length && typeof parts[i+1] === 'number') {
                        processedParts.push(parts[i+1] * -1);
                        i++;
                    } else {
                         processedParts.push(0);
                         processedParts.push('-');
                    }
                } else {
                    processedParts.push(parts[i]);
                }
            }

            const rpnExpression = shuntingYard(processedParts);
            return calculateRPN(rpnExpression);
        } catch (e) {
            console.error("Evaluation error: ", e.message, parts);
            this.displayResult = "Error"; 
            throw e; 
        }
    }

    isOperatorOrParenthesis(token) { 
        return this.isOperator(token) || token === '(' || token === ')';
    }

    isBitwiseKeyword(token) { 
        return ['AND', 'OR', 'XOR', 'NAND', 'NOR', 'NOT'].includes(token?.toString().toUpperCase());
    }
}