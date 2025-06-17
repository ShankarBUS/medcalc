import { createKeyValueTable } from 'https://shankarbus.github.io/kaadu-ui/kaadu-ui.js';

let resultDiv;

export function createHeightCalculator() {
    const title = 'Height Calculator';

    const calcUI = document.createElement('div');
    calcUI.className = 'calc-ui';

    const ageLabel = document.createElement('label');
    ageLabel.setAttribute('for', 'ageInput');
    ageLabel.textContent = 'Enter Age:';
    calcUI.appendChild(ageLabel);

    const ageInput = document.createElement('input');
    ageInput.type = 'number';
    ageInput.id = 'ageInput';
    ageInput.required = true;
    ageInput.min = 1;
    ageInput.Value = 1;
    calcUI.appendChild(ageInput);

    const button = document.createElement('button');
    button.textContent = 'Calculate';
    calcUI.appendChild(button);

    resultDiv = document.createElement('div');
    calcUI.appendChild(resultDiv);

    ageInput.onchange = () => calculateHeight(ageInput.value);
    button.onclick = () => calculateHeight(ageInput.value);

    return { title: title, calcUI: calcUI };
}

function calculateHeight(age) {
    if (!age || age < 0) {
        resultDiv.innerHTML = 'Please enter a valid age.';
        return;
    }

    resultDiv.innerHTML = '';

    let height = 0;

    if (age < 1) {
        height = 50;
    } else if (age == 1)
    {
        height = 75;
    }
    else if (age >= 2 && age <= 12)
    {
        height = age * 6 + 77;
    }

    const data = {
        'Expected Height': `${height} cm`
    };
    const table = createKeyValueTable(data);
    resultDiv.appendChild(table);
}
