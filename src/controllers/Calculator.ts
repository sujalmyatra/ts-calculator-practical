export type AngleMode = 'DEG' | 'RAD' | 'GRAD';
export type Mode = 'standard' | 'scientific';

export interface HistoryItem {
    expr: string;
    result: string;
}

export interface MemoryItem {
    val: number;
}

//Calculator Class

export class Calculator {

    mode: Mode;
    display: string;
    expression: string;

    firstOperand: string | null;
    operator: string | null;

    waitingForSecond: boolean;
    shouldReset: boolean;

    memory: number;
    hasMemory: boolean;

    historyList: HistoryItem[];
    memoryList: MemoryItem[];

    angleMode: AngleMode;
    feMode: boolean;
    secondMode: boolean;

    activeTrig: string;
    activeFunc: string;

    currentTab: 'history' | 'memory';

    parenCount: number;

    lastOperator: string | null;
    lastSecondOperand: string | null;

    constructor() {

        this.mode = 'standard';
        this.display = '0';
        this.expression = '';

        this.firstOperand = null;
        this.operator = null;

        this.waitingForSecond = false;
        this.shouldReset = false;

        this.memory = 0;
        this.hasMemory = false;

        this.historyList = [];
        this.memoryList = [];

        this.angleMode = 'DEG';
        this.feMode = false;
        this.secondMode = false;

        this.activeTrig = 'sin';
        this.activeFunc = 'floor';

        this.currentTab = 'history';

        this.parenCount = 0;

        this.lastOperator = null;
        this.lastSecondOperand = null;
    }

    calculateBinary(a: number, operator: string, b: number): number | string {

        switch (operator) {
            case 'add':      return a + b;
            case 'subtract': return a - b;
            case 'multiply': return a * b;
            case 'divide':   return b === 0 ? 'Error' : a / b;
            default:         return b;
        }
    }
}

export const calc = new Calculator();