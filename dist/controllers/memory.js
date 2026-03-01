import { formatResult, updateDisplay, renderHistoryPanel } from "./utilities.js";
import { calc } from "./Calculator.js";
export function memoryClear() {
    calc.memory = 0;
    calc.hasMemory = false;
    calc.memoryList = [];
    updateMemoryButtons();
    if (calc.currentTab === 'memory') {
        renderHistoryPanel();
    }
}
export function memoryRecall() {
    calc.display = formatResult(calc.memory);
    calc.expression = calc.display;
    calc.shouldReset = true;
    updateDisplay();
    renderHistoryPanel();
}
export function memoryAdd() {
    calc.memory += parseFloat(calc.display);
    calc.hasMemory = true;
    calc.memoryList.push({ val: calc.memory });
    updateMemoryButtons();
    renderHistoryPanel();
}
export function memorySub() {
    calc.memory -= parseFloat(calc.display);
    calc.hasMemory = true;
    calc.memoryList.push({ val: calc.memory });
    updateMemoryButtons();
    renderHistoryPanel();
}
export function memoryStore() {
    calc.memory = parseFloat(calc.display);
    calc.hasMemory = true;
    calc.memoryList = [{ val: calc.memory }];
    updateMemoryButtons();
    renderHistoryPanel();
}
export function updateMemoryButtons() {
    const mcBtn = document.getElementById('mcBtn');
    const mrBtn = document.getElementById('mrBtn');
    if (mcBtn)
        mcBtn.disabled = !calc.hasMemory;
    if (mrBtn)
        mrBtn.disabled = !calc.hasMemory;
}
//# sourceMappingURL=memory.js.map