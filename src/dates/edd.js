import { createKeyValueTable } from 'https://shankarbus.github.io/kaadu-ui/kaadu-ui.js';
import '../radial-progress.js';

let resultDiv;
let radialProgress;

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

    radialProgress = document.createElement('radial-progress');
    radialProgress.setAttribute('value', 0);
    radialProgress.setAttribute('max', 100);
    radialProgress.style.display = 'none';
    calcUI.appendChild(radialProgress);

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
        let gestPercent = Math.max(0, Math.min(100, Math.round((diffDays / 280) * 100)));
        radialProgress.setAttribute('value', gestPercent);
        radialProgress.setAttribute('label', `${weeks}w` + (days > 0 ? `+${days}d` : ''));
        radialProgress.style.display = 'block';
    } else {
        gestAge = 'N/A';
        radialProgress.setAttribute('value', 0);
        radialProgress.setAttribute('label', 'N/A');
        radialProgress.style.display = 'none';
    }

    const data = {
        'Estimated Date of Delivery': eddDate.toLocaleDateString(),
        'Gestational Age': gestAge
    };
    const table = createKeyValueTable(data);
    resultDiv.appendChild(table);
}
