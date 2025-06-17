import { createKeyValueTable } from 'https://shankarbus.github.io/kaadu-ui/kaadu-ui.js';

let resultDiv;

export function createEddCalculator() {
    const title = 'Estimated Date of Delivery (EDD) Calculator';

    const calcUI = document.createElement('div');
    calcUI.className = 'calc-ui';

    const label = document.createElement('label');
    label.setAttribute('for', 'lmpDate');
    label.textContent = 'Last Menstrual Period (LMP):';
    calcUI.appendChild(label);

    const input = document.createElement('input');
    input.type = 'date';
    input.id = 'lmpDate';
    input.required = true;
    input.value = new Date().toISOString().split('T')[0];
    calcUI.appendChild(input);

    const button = document.createElement('button');
    button.textContent = 'Calculate';
    calcUI.appendChild(button);

    resultDiv = document.createElement('div');
    calcUI.appendChild(resultDiv);

    input.onchange = () => getEDDFromLMP(input.value);
    button.onclick = () => getEDDFromLMP(input.value);

    return { title: title, calcUI: calcUI };
}

function getEDDFromLMP(lmp) {
    if (!lmp) return '';

    resultDiv.innerHTML = '';

    const lmpDate = new Date(lmp);
    const today = new Date();
    const eddDate = new Date(lmpDate.getTime());
    eddDate.setDate(eddDate.getDate() + 280); // Naegle's rule: 280 days from LMP

    const diffMs = today - lmpDate;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(diffDays / 7);
    const days = diffDays % 7;
    let gestAge = '';
    if (diffDays >= 0) {
        gestAge = `${weeks} week${weeks !== 1 ? 's' : ''}` + (days > 0 ? `, ${days} day${days !== 1 ? 's' : ''}` : '');
    } else {
        gestAge = 'N/A';
    }

    const data = {
        'Estimated Date of Delivery': eddDate.toLocaleDateString(),
        'Gestational Age': gestAge
    };
    const table = createKeyValueTable(data);
    resultDiv.appendChild(table);
}
