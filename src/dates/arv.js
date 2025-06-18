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

    return { title: title, calcUI: calcUI, doc: 'details/arv.md' };
}

function getOrdinal(n) {
    const ordinals = ['1st', '2nd', '3rd', '4th'];
    return ordinals[n] || `${n + 1}th`;
}

function getScheduleFromExposure(exposure) {
    const base = new Date(exposure);

    resultDiv.innerHTML = '';

    const schedule = [0, 3, 7, 28].map((day, idx) => {
        const d = new Date(base);
        d.setDate(d.getDate() + day);
        return [`${getOrdinal(idx)} dose (Day ${day})`, d.toLocaleDateString()];
    });

    const list = document.createElement('ul');
    schedule.forEach(item => {
        const li = document.createElement('li');
        const dose = document.createElement('strong');
        dose.textContent = item[0];
        const date = document.createElement('span');
        date.textContent = item[1];
        li.appendChild(dose);
        li.appendChild(date);
        list.appendChild(li);
    });
    list.className = 'timeline-list';
    resultDiv.appendChild(list);
}
