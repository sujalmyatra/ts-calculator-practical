import { formatResult, updateDisplay, renderHistoryPanel } from "./utilities.js";
import { calc } from "./Calculator.js";


//memory feature handlers

export function memoryClear(): void {

    calc.memory = 0;
    calc.hasMemory = false;
    calc.memoryList = [];

    updateMemoryButtons();

    if (calc.currentTab === 'memory') {
        renderHistoryPanel();
    }
}

export function memoryRecall(): void {

    calc.display = formatResult(calc.memory);
    calc.expression = calc.display;
    calc.shouldReset = true;

    updateDisplay();
    renderHistoryPanel();
}

export function memoryAdd(): void {

    calc.memory += parseFloat(calc.display);
    calc.hasMemory = true;

    calc.memoryList.push({ val: calc.memory });

    updateMemoryButtons();
    renderHistoryPanel();
}

export function memorySub(): void {

    calc.memory -= parseFloat(calc.display);
    calc.hasMemory = true;

    calc.memoryList.push({ val: calc.memory });

    updateMemoryButtons();
    renderHistoryPanel();
}

export function memoryStore(): void {

    calc.memory = parseFloat(calc.display);
    calc.hasMemory = true;

    calc.memoryList = [{ val: calc.memory }];

    updateMemoryButtons();
    renderHistoryPanel();
}

export function updateMemoryButtons(): void {

    const mcBtn = document.getElementById('mcBtn') as HTMLButtonElement | null;
    const mrBtn = document.getElementById('mrBtn') as HTMLButtonElement | null;

    if (mcBtn) mcBtn.disabled = !calc.hasMemory;
    if (mrBtn) mrBtn.disabled = !calc.hasMemory;
}