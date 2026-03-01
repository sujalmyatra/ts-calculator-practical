import { calc } from "./Calculator.js";
import { formatResult, updateDisplay } from "./utilities.js";


declare global {
    interface Window {
        sin: (x: number) => number;
        cos: (x: number) => number;
        tan: (x: number) => number;
        asin: (x: number) => number;
        acos: (x: number) => number;
        atan: (x: number) => number;
        sinh: (x: number) => number;
        cosh: (x: number) => number;
        tanh: (x: number) => number;
        factorial: (x: number) => number;
    }
}

//scintific handleres

export function insertConstant(val: number, sym: string): void {
    calc.display = formatResult(val);
    calc.expression = sym;
    calc.shouldReset = true;
    updateDisplay();
}

export function toggleSecond(): void {
    calc.secondMode = !calc.secondMode;
}



export function handleOpenParen(): void {
    const last = calc.expression.slice(-1);
    const isDigit = /[0-9]/.test(last);

    if (last && (last === ')' || isDigit || last === '.')) {
        calc.expression += '*(';
    } else {
        calc.expression += '(';
    }

    calc.parenCount++;
    calc.shouldReset = true;

    updateDisplay();
}

export function handleCloseParen(): void {
    if (calc.parenCount <= 0) return;

    calc.expression += ')';
    calc.parenCount--;
    calc.shouldReset = false;

    updateDisplay();
}



export function handleTrig(): void {

    const numberRegex = /(-?\d+\.?\d*)$/;
    calc.expression = calc.expression.replace(numberRegex, '');

    const last = calc.expression.slice(-1);
    if (last === ')' || /\d/.test(last)) {
        calc.expression += '*';
    }

    const val = parseFloat(calc.display);
    const trig = calc.activeTrig;
    const rad = toRadians(val);
    let result: number | string | undefined;

    switch (trig) {
        case 'sin':
            result = Math.sin(rad);
            break;

        case 'cos':
            result = Math.cos(rad);
            break;

        case 'tan':
            if (calc.angleMode === 'DEG') {
                const normalized = ((val % 180) + 180) % 180;
                if (Math.abs(normalized - 90) < 1e-9) {
                    result = 'Error';
                    break;
                }
            } else if (calc.angleMode === 'GRAD') {
                const normalized = ((val % 200) + 200) % 200;
                if (Math.abs(normalized - 100) < 1e-9) {
                    result = 'Error';
                    break;
                }
            }
            result = Math.tan(rad);
            break;

        case 'sin⁻¹':
            result = toDegrees(Math.asin(val));
            break;

        case 'cos⁻¹':
            result = toDegrees(Math.acos(val));
            break;

        case 'tan⁻¹':
            result = toDegrees(Math.atan(val));
            break;

        case 'sinh':
            result = Math.sinh(rad);
            break;

        case 'cosh':
            result = Math.cosh(rad);
            break;

        case 'tanh':
            result = Math.tanh(rad);
            break;
    }

    calc.expression += `${trig}(${calc.display})`;

    if (
        result === 'Error' ||
        (typeof result === 'number' && !isFinite(result)) ||
        Number.isNaN(result)
    ) {
        calc.display = 'Error';
    } else if (typeof result === 'number') {
        calc.display = formatResult(result);
    }

    calc.shouldReset = true;

    updateDisplay();
}



export function factorial(n: number): number {

    n = Number(n);

    if (
        Number.isNaN(n) ||
        !Number.isFinite(n) ||
        !Number.isInteger(n) ||
        n < 0
    ) {
        return NaN;
    }

    if (n === 0 || n === 1) {
        return 1;
    }

    if (n > 170) {
        return Infinity;
    }

    let result = 1;

    for (let i = 2; i <= n; i++) {
        result *= i;
    }

    return result;
}

window.factorial = factorial;


export function handleAbs(): void {

    const value = calc.display;

    calc.expression =
        calc.expression.slice(0, -value.length) + `abs(${value})`;

    calc.display = Math.abs(parseFloat(value)).toString();

    calc.shouldReset = true;

    updateDisplay();
}



export function toRadians(val: number): number {
    if (calc.angleMode === 'DEG') return val * Math.PI / 180;
    if (calc.angleMode === 'GRAD') return val * Math.PI / 200;
    return val;
}

export function toDegrees(val: number): number {
    if (calc.angleMode === 'DEG') return val * 180 / Math.PI;
    if (calc.angleMode === 'GRAD') return val * 200 / Math.PI;
    return val;
}



window.sin = (x: number): number => Math.sin(toRadians(x));
window.cos = (x: number): number => Math.cos(toRadians(x));
window.tan = (x: number): number => Math.tan(toRadians(x));

window.asin = (x: number): number => toDegrees(Math.asin(x));
window.acos = (x: number): number => toDegrees(Math.acos(x));
window.atan = (x: number): number => toDegrees(Math.atan(x));

window.sinh = (x: number): number => Math.sinh(toRadians(x));
window.cosh = (x: number): number => Math.cosh(toRadians(x));
window.tanh = (x: number): number => Math.tanh(toRadians(x));

export {};