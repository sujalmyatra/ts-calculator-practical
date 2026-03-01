import { calc } from "./controllers/Calculator.js";
import {
  renderButtons,
  renderHistoryPanel,
  addToHistory,
  updateDisplay,
  resetCalculatorState,
} from "./controllers/utilities.js";
import { handleButtonClick } from "./controllers/buttonHandler.js";
import { handleTrig } from "./controllers/sciHandler.js";

const modeTitle = document.getElementById("modeTitle") as HTMLElement;
const sciControls = document.getElementById(
  "scientificControls",
) as HTMLElement;
const sciExtra = document.getElementById("scientificExtra") as HTMLElement;
const calcWrapper = document.getElementById("calcWrapper") as HTMLElement;

const checkStandard = document.getElementById("checkStandard") as HTMLElement;
const checkScientific = document.getElementById(
  "checkScientific",
) as HTMLElement;

const modeMenu = document.getElementById("modeMenu") as HTMLElement;

const hamburgerBtn = document.getElementById("hamburgerBtn") as HTMLElement;

const histTab = document.getElementById("histTab") as HTMLElement;
const memTab = document.getElementById("memTab") as HTMLElement;

const trigDropdown = document.getElementById("trigDropdown") as HTMLElement;
const funcDropdown = document.getElementById("funcDropdown") as HTMLElement;

const trigBtn = document.getElementById("trigBtn") as HTMLElement;
const funcBtn = document.getElementById("funcBtn") as HTMLElement;
const degBtn = document.getElementById("degBtn") as HTMLElement;
const feBtn = document.getElementById("feBtn") as HTMLElement;

//calculator mode menu listener and functions
function switchMode(mode: "standard" | "scientific"): void {
  calc.mode = mode;
  resetCalculatorState();

  modeTitle.textContent = mode === "standard" ? "Standard" : "Scientific";

  if (mode === "scientific") {
    sciControls.classList.remove("d-none");
    sciControls.classList.add("d-flex");

    sciExtra.classList.remove("d-none");
    sciExtra.classList.add("d-flex");

    calcWrapper.style.height = "76vh";
  } else {
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

function closeModeMenu(): void {
  modeMenu.classList.remove("show");
}

document.addEventListener("DOMContentLoaded", () => {
  hamburgerBtn.addEventListener("click", (e: MouseEvent) => {
    e.stopPropagation();
    modeMenu.classList.toggle("show");
  });

  modeMenu.addEventListener("click", (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const item = target.closest("[data-mode]") as HTMLElement | null;
    if (item) {
      const mode = item.dataset.mode as "standard" | "scientific";
      switchMode(mode);
    }
  });


//history panel listener
  histTab.addEventListener("click", () => {
    calc.currentTab = "history";
    histTab.classList.add("active");
    memTab.classList.remove("active");
    renderHistoryPanel();
  });
//memory panel listener
  memTab.addEventListener("click", () => {
    calc.currentTab = "memory";
    memTab.classList.add("active");
    histTab.classList.remove("active");
    renderHistoryPanel();
  });

  init();
});

function closeAllDropdowns(): void {
  if (modeMenu) {
    modeMenu.classList.remove("show");
  }

  trigDropdown.classList.remove("show");
  funcDropdown.classList.remove("show");
}

//trigo and function sections
document.addEventListener("click", () => closeAllDropdowns());

trigBtn.addEventListener("click", (e: MouseEvent) => {
  e.stopPropagation();
  trigDropdown.classList.toggle("show");
  funcDropdown.classList.remove("show");
});

funcBtn.addEventListener("click", (e: MouseEvent) => {
  e.stopPropagation();
  funcDropdown.classList.toggle("show");
  trigDropdown.classList.remove("show");
});

//trigonometry droapdown listener
trigDropdown.addEventListener(
  "click",
  (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const item = target.closest("[data-trig]") as HTMLElement | null;

    if (item) {
      calc.activeTrig = item.dataset.trig ?? "";

      trigDropdown
        .querySelectorAll(".trig-dropdown-item")
        .forEach((el) => el.classList.remove("selected"));

      item.classList.add("selected");

      trigBtn.innerHTML = `<span>&#9651;</span> ${calc.activeTrig} <span class="arrow">&#8964;</span>`;

      trigDropdown.classList.remove("show");
    }

    handleTrig();
  },
);

//function droapdown listener
funcDropdown.addEventListener("click", (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  const item = target.closest("[data-func]") as HTMLElement | null;

  if (item) {
    calc.activeFunc = item.dataset.func ?? "";

    funcDropdown
      .querySelectorAll(".func-dropdown-item")
      .forEach((el) => el.classList.remove("selected"));

    item.classList.add("selected");

    funcBtn.innerHTML = `<span style="font-style:italic">f</span> ${calc.activeFunc} <span class="arrow">&#8964;</span>`;

    funcDropdown.classList.remove("show");

    handleButtonClick(calc.activeFunc);
  }
});

//angle listener
degBtn.addEventListener("click", () => {
  const modes = ["DEG", "RAD", "GRAD"] as const;
  type AngleMode = (typeof modes)[number];

  const idx = modes.indexOf(calc.angleMode as AngleMode);
  calc.angleMode = modes[(idx + 1) % modes.length] as AngleMode;
  degBtn.textContent = calc.angleMode;
});

feBtn.addEventListener("click", () => {
  calc.feMode = !calc.feMode;

  feBtn.style.color = calc.feMode ? "#4a6fa5" : "";

  updateDisplay();
});

//keyboard key mappings
document.addEventListener("keydown", (e: KeyboardEvent) => {
  const keyMap: Record<string, string> = {
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

//calculator responsive section
(function () {
  const BREAKPOINT = 700;

  const btn = document.getElementById("mobileHistoryBtn") as HTMLElement;
  const sheet = document.getElementById("bottomSheet") as HTMLElement;
  const backdrop = document.getElementById(
    "bottomSheetBackdrop",
  ) as HTMLElement;
  const closeBtn = document.getElementById("bottomSheetClose") as HTMLElement;
  const mHistTab = document.getElementById("mobileHistTab") as HTMLElement;
  const mMemTab = document.getElementById("mobileMemTab") as HTMLElement;
  const mContent = document.getElementById(
    "mobileHistoryContent",
  ) as HTMLElement;
  const desktopContent = document.getElementById(
    "historyContent",
  ) as HTMLElement;

  function syncMobileContent(): void {
    mContent.innerHTML = desktopContent.innerHTML;

    mContent.querySelectorAll(".history-item[data-index]").forEach((el) => {
      el.addEventListener("click", () => {
        const desktopItem = document.querySelector(
          `#historyContent .history-item[data-index="${(el as HTMLElement).dataset.index}"]`,
        ) as HTMLElement | null;

        desktopItem?.click();
        closeSheet();
      });
    });
  }

  function openSheet(): void {
    syncMobileContent();
    sheet.classList.add("open");
    backdrop.classList.remove("d-none");
    backdrop.classList.add("show");
  }

  function closeSheet(): void {
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

  function applyResponsive(): void {
    const isMobile = window.innerWidth < BREAKPOINT;
    const histPanel = document.getElementById("historyPanel") as HTMLElement;

    if (isMobile) {
      histPanel.classList.add("history-panel-hidden");
      btn.classList.remove("d-none");
    } else {
      histPanel.classList.remove("history-panel-hidden");
      btn.classList.add("d-none");
      closeSheet();
    }
  }

  applyResponsive();
  window.addEventListener("resize", applyResponsive);
})();
//calculator theme section
(function () {
  const btn = document.getElementById("keepOnTopBtn") as HTMLElement;
  const themeIcon = document.getElementById("themeIcon") as HTMLElement;

  function applyTheme(dark: boolean): void {
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
//memmory selectors
["mc", "mr", "mp", "mm", "ms"].forEach((id) => {
  document
    .getElementById(`${id}Btn`)
    ?.addEventListener("click", () => handleButtonClick(id));
});
//initial function
function init(): void {
  renderButtons();
  updateDisplay();
  renderHistoryPanel();
}

init();
