import { createKeyValueTable } from 'https://shankarbus.github.io/kaadu-ui/kaadu-ui.js';
import { ComboBox } from 'https://shankarbus.github.io/kaadu-ui/combo-box.js';

let resultDiv;
let ageInput;
let selectedUnit;

export function createWeightCalculator() {
    const title = 'Weight Calculator';

    const calcUI = document.createElement('div');
    calcUI.className = 'calc-ui';

    const ageLabel = document.createElement('label');
    ageLabel.setAttribute('for', 'ageInput');
    ageLabel.textContent = 'Enter Age:';
    calcUI.appendChild(ageLabel);

    ageInput = document.createElement('input');
    ageInput.type = 'number';
    ageInput.id = 'ageInput';
    ageInput.required = true;
    ageInput.min = 3;
    ageInput.value = 3;
    calcUI.appendChild(ageInput);

    const ageUnitLabel = document.createElement('label');
    ageUnitLabel.setAttribute('for', 'ageUnit');
    ageUnitLabel.textContent = 'Select Unit:';
    calcUI.appendChild(ageUnitLabel);

    const ageUnit = new ComboBox();
    ageUnit.setAttribute('placeholder', 'Select Unit');
    ageUnit.loadOptions([
        { value: 'm', label: 'Month(s)' },
        { value: 'y', label: 'Year(s)' }
    ]);
    ageUnit.setSelectedItem('m');
    selectedUnit = 'm';
    calcUI.appendChild(ageUnit);

    const button = document.createElement('button');
    button.textContent = 'Calculate';
    calcUI.appendChild(button);

    resultDiv = document.createElement('div');
    calcUI.appendChild(resultDiv);

    ageInput.onchange = () => calculateWeight();
    ageUnit.addEventListener('selectionChanged', (e) => unitChanged(e.detail.value));
    button.onclick = () => calculateWeight();

    return { title: title, calcUI: calcUI };
}

function unitChanged(unit) {
    if (unit === 'm') {
        ageInput.min = 3;
        if (ageInput.value < 3) {
            ageInput.value = 3;
        }
    } else if (unit === 'y') {
        ageInput.min = 1;
    }

    selectedUnit = unit;
    calculateWeight();
}

function calculateWeight() {
    if (!ageInput || !ageInput.value) {
        resultDiv.innerHTML = 'Please enter a valid age.';
        return;
    }

    resultDiv.innerHTML = '';

    let age = parseInt(ageInput.value);
    let weight = 0;

    if (selectedUnit === 'm' && age >= 3) {
        // If age is in months and >= 3, then use (x + 9) / 2
        // Else if age is in months and > 12, use weightFromYears
        weight = age < 12 ? (age + 9) / 2 : weightFromYears(age / 12);
    }
    else if (selectedUnit === 'y') {
        weight = weightFromYears(age);
    } else {
        resultDiv.innerHTML = 'Invalid age or unit.';
        return;
    }

    const data = {
        'Expected Weight': `${weight} kg`
    };
    const table = createKeyValueTable(data);
    resultDiv.appendChild(table);
}

function weightFromYears(age) {
    if (age >= 1 && age < 7) {
        // For ages 1 to 6 years, use 2x + 8
        return age * 2 + 8;
    } else if (age >= 7 && age <= 12) {
        // For ages 7 to 12 years, use (7x - 5) / 2
        return (age * 7 - 5) / 2;
    } else {
        return age * 3;
    }
}