import { enableStickyHeader, enableFloatingFooter, enableHamburgerMenu, createExpander, setupMessagePopup, showMessagePopup, createKeyValueTable } from 'https://shankarbus.github.io/kaadu-ui/kaadu-ui.js';
import { ComboBox } from 'https://shankarbus.github.io/kaadu-ui/combo-box.js';
import { createArvCalculator } from './dates/arv.js';
import { createEddCalculator } from './dates/edd.js';

enableStickyHeader();
enableFloatingFooter();
enableHamburgerMenu();
setupMessagePopup();

const arvCard = document.getElementById('arvCard');
const eddCard = document.getElementById('eddCard');
const calcListColumn = document.getElementById('calcListColumn');
const calcUIColumn = document.getElementById('calcUIColumn');
const backBtn = document.getElementById('backBtn');
const calcTitle = document.getElementById('calcTitle');
const calcSubGroup = document.getElementById('calcSubGroup');

function showMainMenu() {
    calcUIColumn.style.display = 'none';
    calcListColumn.style.display = '';
}

function showCalculator(calcName) {
    calcListColumn.style.display = 'none';
    calcSubGroup.innerHTML = '';
    calcUIColumn.style.display = 'block';
    let values = null;
    if (calcName === 'arv') {
        values = createArvCalculator();
    } else if (calcName === 'edd') {
        values = createEddCalculator();
    }
    calcTitle.textContent = values.title;
    calcSubGroup.appendChild(values.calcUI);
    window.history.pushState({ calcName: calcName }, '', `?calc=${calcName}`);
}

arvCard.addEventListener('click', () => {
    showCalculator('arv');
});
eddCard.addEventListener('click', () => {
    showCalculator('edd');
});

window.onpopstate = function () {
    showMainMenu();
};

backBtn.addEventListener('click', () => {
    showMainMenu();
    history.pushState({}, '', window.location.pathname);
});

function handleInitialCalcFromURL() {
    const params = new URLSearchParams(window.location.search);
    const calc = params.get('calc');
    if (calc !== null && calc !== '') {
        showCalculator(calc);
    }
}

handleInitialCalcFromURL();