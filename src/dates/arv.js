import { createKeyValueTable } from 'https://shankarbus.github.io/kaadu-ui/kaadu-ui.js';

let resultDiv;

export function createArvCalculator() {
    const title = 'ARV Schedule Calculator';

    const calcUI = document.createElement('div');
    calcUI.className = 'calc-ui';

    const label = document.createElement('label');
    label.setAttribute('for', 'exposureDate');
    label.textContent = 'Date of Exposure:';
    calcUI.appendChild(label);

    const input = document.createElement('input');
    input.type = 'date';
    input.id = 'exposureDate';
    input.required = true;
    input.value = new Date().toISOString().split('T')[0];
    calcUI.appendChild(input);

    const button = document.createElement('button');
    button.textContent = 'Calculate';
    calcUI.appendChild(button);

    resultDiv = document.createElement('div');
    calcUI.appendChild(resultDiv);

    input.onchange = () => getScheduleFromExposure(input.value);
    button.onclick = () => getScheduleFromExposure(input.value);

    return {title: title, calcUI: calcUI};
}

function getScheduleFromExposure(exposure) {
    const base = new Date(exposure);

    resultDiv.innerHTML = '';

    const schedule = [0, 3, 7, 28].map(day => {
        const d = new Date(base);
        d.setDate(d.getDate() + day);
        return [`Day ${day}`, d.toLocaleDateString()];
    });

    const list = document.createElement('ul');
    schedule.forEach(item => {
        const li = document.createElement('li');
        const day = document.createElement('strong');
        day.textContent = item[0];
        const date = document.createElement('span');
        date.textContent = item[1];
        li.appendChild(day);
        li.appendChild(date);
        list.appendChild(li);
    });
    list.className = 'timeline-list';
    resultDiv.appendChild(list);
}
