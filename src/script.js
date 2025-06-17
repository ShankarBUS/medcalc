import { enableStickyHeader, enableFloatingFooter, enableHamburgerMenu, createExpander, setupMessagePopup, showMessagePopup, createKeyValueTable } from 'https://shankarbus.github.io/kaadu-ui/kaadu-ui.js';
import { ComboBox } from 'https://shankarbus.github.io/kaadu-ui/combo-box.js';
import { createArvCalculator } from './dates/arv.js';
import { createEddCalculator } from './dates/edd.js';
import { createWeightCalculator } from './anthropometry/weight.js';
import { createHeightCalculator } from './anthropometry/height.js';

enableStickyHeader();
enableFloatingFooter();
enableHamburgerMenu();
setupMessagePopup();

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
    } else if (calcName === 'weight') {
        values = createWeightCalculator();
    } else if (calcName === 'height') {
        values = createHeightCalculator();
    } else {
        showMessagePopup('Error', 'Calculator not found.');
        return;
    }

    calcTitle.textContent = values.title;
    calcSubGroup.appendChild(values.calcUI);
    window.history.pushState({ calcName: calcName }, '', `?calc=${calcName}`);
}

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

const calcMap = {
    'arv': 'arvCard',
    'edd': 'eddCard',
    'weight': 'wtCard',
    'height': 'htCard'
};

function mapCalcsToCard() {
    Object.keys(calcMap).forEach(calcName => {
        const cardId = calcMap[calcName];
        if (cardId) {
            const card = document.getElementById(cardId);
            if (card) {
                card.addEventListener('click', () => showCalculator(calcName));
            }
        }
    });
}

mapCalcsToCard();