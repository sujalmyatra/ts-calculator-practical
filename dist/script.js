import { calc } from "./controllers/Calculator.js";
import { renderButtons, renderHistoryPanel, updateDisplay, resetCalculatorState, } from "./controllers/utilities.js";
import { handleButtonClick } from "./controllers/buttonHandler.js";
import { handleTrig } from "./controllers/sciHandler.js";
const modeTitle = document.getElementById("modeTitle");
const sciControls = document.getElementById("scientificControls");
const sciExtra = document.getElementById("scientificExtra");
const calcWrapper = document.getElementById("calcWrapper");
const checkStandard = document.getElementById("checkStandard");
const checkScientific = document.getElementById("checkScientific");
const modeMenu = document.getElementById("modeMenu");
const hamburgerBtn = document.getElementById("hamburgerBtn");
const histTab = document.getElementById("histTab");
const memTab = document.getElementById("memTab");
const trigDropdown = document.getElementById("trigDropdown");
const funcDropdown = document.getElementById("funcDropdown");
const trigBtn = document.getElementById("trigBtn");
const funcBtn = document.getElementById("funcBtn");
const degBtn = document.getElementById("degBtn");
const feBtn = document.getElementById("feBtn");
function switchMode(mode) {
    calc.mode = mode;
    resetCalculatorState();
    modeTitle.textContent = mode === "standard" ? "Standard" : "Scientific";
    if (mode === "scientific") {
        sciControls.classList.remove("d-none");
        sciControls.classList.add("d-flex");
        sciExtra.classList.remove("d-none");
        sciExtra.classList.add("d-flex");
        calcWrapper.style.height = "76vh";
    }
    else {
        sciControls.classList.add("d-none");
        sciControls.classList.remove("d-flex");
        sciExtra.classList.add("d-none");
        sciExtra.classList.remove("d-flex");
        calcWrapper.style.height = "";
    }
    checkStandard.style.visibility = mode === "standard" ? "visible" : "hidden";
    checkScientific.style.visibility =
        mode === "scientific" ? "visible" : "hidden";
    calcWrapper.classList.remove("calc-height");
    renderButtons();
    closeModeMenu();
}
function closeModeMenu() {
    modeMenu.classList.remove("show");
}
document.addEventListener("DOMContentLoaded", () => {
    hamburgerBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        modeMenu.classList.toggle("show");
    });
    modeMenu.addEventListener("click", (e) => {
        const target = e.target;
        const item = target.closest("[data-mode]");
        if (item) {
            const mode = item.dataset.mode;
            switchMode(mode);
        }
    });
    histTab.addEventListener("click", () => {
        calc.currentTab = "history";
        histTab.classList.add("active");
        memTab.classList.remove("active");
        renderHistoryPanel();
    });
    memTab.addEventListener("click", () => {
        calc.currentTab = "memory";
        memTab.classList.add("active");
        histTab.classList.remove("active");
        renderHistoryPanel();
    });
    init();
});
function closeAllDropdowns() {
    if (modeMenu) {
        modeMenu.classList.remove("show");
    }
    trigDropdown.classList.remove("show");
    funcDropdown.classList.remove("show");
}
document.addEventListener("click", () => closeAllDropdowns());
trigBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    trigDropdown.classList.toggle("show");
    funcDropdown.classList.remove("show");
});
funcBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    funcDropdown.classList.toggle("show");
    trigDropdown.classList.remove("show");
});
trigDropdown.addEventListener("click", (e) => {
    var _a;
    const target = e.target;
    const item = target.closest("[data-trig]");
    if (item) {
        calc.activeTrig = (_a = item.dataset.trig) !== null && _a !== void 0 ? _a : "";
        trigDropdown
            .querySelectorAll(".trig-dropdown-item")
            .forEach((el) => el.classList.remove("selected"));
        item.classList.add("selected");
        trigBtn.innerHTML = `<span>&#9651;</span> ${calc.activeTrig} <span class="arrow">&#8964;</span>`;
        trigDropdown.classList.remove("show");
    }
    handleTrig();
});
funcDropdown.addEventListener("click", (e) => {
    var _a;
    const target = e.target;
    const item = target.closest("[data-func]");
    if (item) {
        calc.activeFunc = (_a = item.dataset.func) !== null && _a !== void 0 ? _a : "";
        funcDropdown
            .querySelectorAll(".func-dropdown-item")
            .forEach((el) => el.classList.remove("selected"));
        item.classList.add("selected");
        funcBtn.innerHTML = `<span style="font-style:italic">f</span> ${calc.activeFunc} <span class="arrow">&#8964;</span>`;
        funcDropdown.classList.remove("show");
        handleButtonClick(calc.activeFunc);
    }
});
degBtn.addEventListener("click", () => {
    const modes = ["DEG", "RAD", "GRAD"];
    const idx = modes.indexOf(calc.angleMode);
    calc.angleMode = modes[(idx + 1) % modes.length];
    degBtn.textContent = calc.angleMode;
});
feBtn.addEventListener("click", () => {
    calc.feMode = !calc.feMode;
    feBtn.style.color = calc.feMode ? "#4a6fa5" : "";
    updateDisplay();
});
document.addEventListener("keydown", (e) => {
    const keyMap = {
        "0": "0",
        "1": "1",
        "2": "2",
        "3": "3",
        "4": "4",
        "5": "5",
        "6": "6",
        "7": "7",
        "8": "8",
        "9": "9",
        ".": "decimal",
        "+": "add",
        "-": "subtract",
        "*": "multiply",
        "/": "divide",
        Enter: "equals",
        "=": "equals",
        Backspace: "backspace",
        Escape: "clear",
        "%": "percent",
    };
    const action = keyMap[e.key];
    if (action) {
        e.preventDefault();
        handleButtonClick(action);
    }
});
(function () {
    const BREAKPOINT = 700;
    const btn = document.getElementById("mobileHistoryBtn");
    const sheet = document.getElementById("bottomSheet");
    const backdrop = document.getElementById("bottomSheetBackdrop");
    const closeBtn = document.getElementById("bottomSheetClose");
    const mHistTab = document.getElementById("mobileHistTab");
    const mMemTab = document.getElementById("mobileMemTab");
    const mContent = document.getElementById("mobileHistoryContent");
    const desktopContent = document.getElementById("historyContent");
    function syncMobileContent() {
        mContent.innerHTML = desktopContent.innerHTML;
        mContent.querySelectorAll(".history-item[data-index]").forEach((el) => {
            el.addEventListener("click", () => {
                const desktopItem = document.querySelector(`#historyContent .history-item[data-index="${el.dataset.index}"]`);
                desktopItem === null || desktopItem === void 0 ? void 0 : desktopItem.click();
                closeSheet();
            });
        });
    }
    function openSheet() {
        syncMobileContent();
        sheet.classList.add("open");
        backdrop.classList.remove("d-none");
        backdrop.classList.add("show");
    }
    function closeSheet() {
        sheet.classList.remove("open");
        backdrop.classList.remove("show");
        setTimeout(() => backdrop.classList.add("d-none"), 300);
    }
    btn.addEventListener("click", openSheet);
    closeBtn.addEventListener("click", closeSheet);
    backdrop.addEventListener("click", closeSheet);
    mHistTab.addEventListener("click", () => {
        mHistTab.classList.add("active");
        mMemTab.classList.remove("active");
        histTab.click();
        setTimeout(syncMobileContent, 50);
    });
    mMemTab.addEventListener("click", () => {
        mMemTab.classList.add("active");
        mHistTab.classList.remove("active");
        memTab.click();
        setTimeout(syncMobileContent, 50);
    });
    function applyResponsive() {
        const isMobile = window.innerWidth < BREAKPOINT;
        const histPanel = document.getElementById("historyPanel");
        if (isMobile) {
            histPanel.classList.add("history-panel-hidden");
            btn.classList.remove("d-none");
        }
        else {
            histPanel.classList.remove("history-panel-hidden");
            btn.classList.add("d-none");
            closeSheet();
        }
    }
    applyResponsive();
    window.addEventListener("resize", applyResponsive);
})();
(function () {
    const btn = document.getElementById("keepOnTopBtn");
    const themeIcon = document.getElementById("themeIcon");
    function applyTheme(dark) {
        document.body.classList.toggle("dark", dark);
        themeIcon.className = dark ? "bi bi-sun" : "bi bi-moon";
    }
    btn.addEventListener("click", () => {
        const isDark = !document.body.classList.contains("dark");
        localStorage.setItem("calcDark", String(isDark));
        applyTheme(isDark);
    });
    applyTheme(localStorage.getItem("calcDark") === "true");
})();
["mc", "mr", "mp", "mm", "ms"].forEach((id) => {
    var _a;
    (_a = document
        .getElementById(`${id}Btn`)) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => handleButtonClick(id));
});
function init() {
    renderButtons();
    updateDisplay();
    renderHistoryPanel();
}
init();
//# sourceMappingURL=script.js.map