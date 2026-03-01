import { calc } from './Calculator.js';
import { handleButtonClick } from './buttonHandler.js';
function getStandardButtons() {
    return [
        { label: '%', action: 'percent', cls: 'btn-func btn-fade' },
        { label: 'CE', action: 'ce', cls: 'btn-clear btn-fade' },
        { label: 'C', action: 'clear', cls: 'btn-clear btn-fade' },
        { label: '⌫', action: 'backspace', cls: 'btn-clear btn-fade' },
        { label: '¹⁄ₓ', action: 'reciprocal', cls: 'btn-func btn-fade' },
        { label: 'x²', action: 'square', cls: 'btn-func btn-fade' },
        { label: '²√x', action: 'sqrt', cls: 'btn-func btn-fade' },
        { label: '÷', action: 'divide', cls: 'btn-operator btn-fade' },
        { label: '7', action: '7', cls: 'btn-base' },
        { label: '8', action: '8', cls: 'btn-base' },
        { label: '9', action: '9', cls: 'btn-base' },
        { label: '×', action: 'multiply', cls: 'btn-operator btn-fade' },
        { label: '4', action: '4', cls: 'btn-base' },
        { label: '5', action: '5', cls: 'btn-base' },
        { label: '6', action: '6', cls: 'btn-base' },
        { label: '−', action: 'subtract', cls: 'btn-operator btn-fade' },
        { label: '1', action: '1', cls: 'btn-base' },
        { label: '2', action: '2', cls: 'btn-base' },
        { label: '3', action: '3', cls: 'btn-base' },
        { label: '+', action: 'add', cls: 'btn-operator btn-fade' },
        { label: '+/−', action: 'negate', cls: 'btn-base' },
        { label: '0', action: '0', cls: 'btn-base' },
        { label: '.', action: 'decimal', cls: 'btn-base' },
        { label: '=', action: 'equals', cls: 'btn-equals btn-fade' }
    ];
}
function getScientificButtons() {
    return [
        { label: '2ⁿᵈ', action: 'second', cls: 'btn-func', id: 'btn2nd' },
        { label: 'π', action: 'pi', cls: 'btn-func' },
        { label: 'e', action: 'euler', cls: 'btn-func' },
        { label: 'C', action: 'clear', cls: 'btn-clear' },
        { label: '⌫', action: 'backspace', cls: 'btn-clear' },
        { label: 'x²', action: 'square', cls: 'btn-func', id: 'btnSq', altLabel: 'x³', altAction: 'cube' },
        { label: '¹⁄ₓ', action: 'reciprocal', cls: 'btn-func' },
        { label: '|x|', action: 'abs', cls: 'btn-func' },
        { label: 'exp', action: 'exp', cls: 'btn-func' },
        { label: 'mod', action: 'mod', cls: 'btn-func' },
        { label: '²√x', action: 'sqrt', cls: 'btn-func', id: 'btnSqrt', altLabel: '³√x', altAction: 'cbrt' },
        { label: '(', action: 'openParen', cls: 'btn-func' },
        { label: ')', action: 'closeParen', cls: 'btn-func' },
        { label: 'n!', action: 'factorial', cls: 'btn-func' },
        { label: '÷', action: 'divide', cls: 'btn-operator' },
        { label: 'xʸ', action: 'power', cls: 'btn-func', id: 'btnPow', altLabel: 'ʸ√x', altAction: 'nthRoot' },
        { label: '7', action: '7', cls: 'btn-base' },
        { label: '8', action: '8', cls: 'btn-base' },
        { label: '9', action: '9', cls: 'btn-base' },
        { label: '×', action: 'multiply', cls: 'btn-operator' },
        { label: '10ˣ', action: 'pow10', cls: 'btn-func', id: 'btnPow10', altLabel: '2ˣ', altAction: 'pow2' },
        { label: '4', action: '4', cls: 'btn-base' },
        { label: '5', action: '5', cls: 'btn-base' },
        { label: '6', action: '6', cls: 'btn-base' },
        { label: '−', action: 'subtract', cls: 'btn-operator' },
        { label: 'log', action: 'log10', cls: 'btn-func', id: 'btnLog', altLabel: 'logᵧ', altAction: 'logY' },
        { label: '1', action: '1', cls: 'btn-base' },
        { label: '2', action: '2', cls: 'btn-base' },
        { label: '3', action: '3', cls: 'btn-base' },
        { label: '+', action: 'add', cls: 'btn-operator' },
        { label: 'ln', action: 'ln', cls: 'btn-func', id: 'btnLn', altLabel: 'eˣ', altAction: 'eToX' },
        { label: '+/−', action: 'negate', cls: 'btn-base' },
        { label: '0', action: '0', cls: 'btn-base' },
        { label: '.', action: 'decimal', cls: 'btn-base' },
        { label: '=', action: 'equals', cls: 'btn-equals' }
    ];
}
export function renderButtons() {
    const grid = document.getElementById('btnGrid');
    const newGrid = grid.cloneNode(false);
    grid.parentNode.replaceChild(newGrid, grid);
    const buttons = calc.mode === 'standard'
        ? getStandardButtons()
        : getScientificButtons();
    newGrid.className = `btn-grid ${calc.mode === 'standard'
        ? 'standard-grid'
        : 'scientific-grid'}`;
    newGrid.innerHTML = buttons.map(btn => {
        const label = calc.secondMode && btn.altLabel
            ? btn.altLabel
            : btn.label;
        const secondActiveClass = btn.action === 'second' && calc.secondMode
            ? 'btn-second-active'
            : '';
        return `
            <button
                class="calc-btn ${btn.cls} ${secondActiveClass}"
                data-action="${calc.secondMode && btn.altAction
            ? btn.altAction
            : btn.action}"
                ${btn.id ? `id="${btn.id}"` : ''}
            >${label}</button>
        `;
    }).join('');
    newGrid.querySelectorAll('.calc-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const action = btn.dataset.action;
            handleButtonClick(action);
        });
    });
}
export function updateDisplay() {
    const displayEl = document.getElementById('displayValue');
    const exprEl = document.getElementById('displayExpression');
    let val = calc.display;
    if (calc.feMode && !isNaN(parseFloat(val))) {
        val = parseFloat(val).toExponential();
    }
    displayEl.textContent = val;
    exprEl.textContent = calc.expression;
    displayEl.className = 'display-value';
    if (val.length > 16)
        displayEl.classList.add('xsmall-text');
    else if (val.length > 10)
        displayEl.classList.add('small-text');
}
export function addToHistory(expr, result) {
    calc.historyList.unshift({ expr, result });
    if (calc.currentTab === 'history')
        renderHistoryPanel();
}
export function renderHistoryPanel() {
    const content = document.getElementById('historyContent');
    if (calc.currentTab === 'history') {
        if (calc.historyList.length === 0) {
            content.innerHTML =
                `<div class="history-empty">There's no history yet.</div>`;
        }
        else {
            content.innerHTML = calc.historyList.map((item, i) => `
                <div class="history-item" data-index="${i}">
                    <div class="hist-expr">${item.expr}</div>
                    <div class="hist-result">${item.result}</div>
                </div>
            `).join('');
            content.querySelectorAll('.history-item').forEach(el => {
                el.addEventListener('click', () => {
                    var _a, _b;
                    const idx = parseInt(el.dataset.index);
                    calc.display = (_b = (_a = calc.historyList[idx]) === null || _a === void 0 ? void 0 : _a.result) !== null && _b !== void 0 ? _b : '0';
                    calc.shouldReset = true;
                    updateDisplay();
                });
            });
        }
    }
    else {
        if (calc.memoryList.length === 0) {
            content.innerHTML =
                `<div class="history-empty">There's nothing saved in memory.</div>`;
        }
        else {
            content.innerHTML = calc.memoryList.map((item) => `
                <div class="history-item">
                    <div class="hist-result">${item.val}</div>
                </div>
            `).join('');
        }
    }
}
export function calculate(first, operator, second) {
    const a = parseFloat(first);
    const b = parseFloat(second);
    if (isNaN(a) || isNaN(b))
        return NaN;
    if (['add', 'subtract', 'multiply', 'divide'].includes(operator)) {
        if (operator === 'divide') {
            if (b === 0)
                return NaN;
            return a / b;
        }
        return calc.calculateBinary(a, operator, b);
    }
    switch (operator) {
        case 'power':
            if (a === 0 && b <= 0)
                return NaN;
            return Math.pow(a, b);
        case 'nthRoot':
            if (a === 0)
                return NaN;
            if (b < 0 && a % 2 === 0)
                return NaN;
            return Math.pow(b, 1 / a);
        case 'logY':
            if (a <= 0 || a === 1 || b <= 0)
                return NaN;
            return Math.log(b) / Math.log(a);
        case 'mod':
            if (b === 0)
                return NaN;
            return a % b;
        case 'exp':
            return a * Math.pow(10, b);
        default:
            return NaN;
    }
}
export function formatResult(num) {
    if (typeof num === 'string')
        return num;
    if (isNaN(num))
        return 'Error';
    if (!isFinite(num))
        return 'Cannot divide by zero';
    const str = num.toPrecision(15);
    const parsed = parseFloat(str);
    if (Math.abs(parsed) > 1e15 ||
        (Math.abs(parsed) < 1e-9 && parsed !== 0)) {
        return parsed.toExponential();
    }
    return String(parsed);
}
export function resetCalculatorState() {
    calc.display = '0';
    calc.expression = '';
    calc.firstOperand = null;
    calc.operator = null;
    calc.lastOperator = null;
    calc.lastSecondOperand = null;
    calc.waitingForSecond = false;
    calc.shouldReset = false;
    calc.parenCount = 0;
    updateDisplay();
}
//# sourceMappingURL=utilities.js.map