let calculationHistory = [];

const firstNumberInput = document.getElementById('firstNumber');
const secondNumberInput = document.getElementById('secondNumber');
const operatorSelect = document.getElementById('operator');
const calculateBtn = document.getElementById('calculateBtn');
const resultContainer = document.getElementById('resultContainer');

function validateInput(input) {
    let value = input.value.replace(/[^0-9.\-]/g, '');
    
    if (value.length > 0 && value[0] !== '-') {
        value = value.replace(/\-/g, '');
    } else if (value.length > 1) {
        value = '-' + value.substring(1).replace(/\-/g, '');
    }
    
    const dots = value.match(/\./g);
    if (dots && dots.length > 1) {
        const parts = value.split('.');
        value = parts[0] + '.' + parts.slice(1).join('').replace(/\./g, '');
    }
    
    if (/^[+*/]/.test(value)) {
        value = value.substring(1);
    }
    
    if (value.startsWith('.')) {
        value = '0' + value;
    }
    
    return value;
}

[firstNumberInput, secondNumberInput].forEach(input => {
    input.addEventListener('input', function() {
        const oldValue = this.value;
        const newValue = validateInput(this);
        
        if (newValue !== oldValue) {
            this.value = newValue;
        }
        
        this.classList.remove('error');
    });

    input.addEventListener('keypress', function(e) {
        const char = String.fromCharCode(e.which);
        if (!/[0-9.\-]/.test(char)) {
            e.preventDefault();
        }
    });
});

function calculate() {
    const firstValue = firstNumberInput.value.trim();
    const secondValue = secondNumberInput.value.trim();
    const operator = operatorSelect.value;

    firstNumberInput.classList.remove('error');
    secondNumberInput.classList.remove('error');

    if (!firstValue && !secondValue) {
        firstNumberInput.classList.add('error');
        secondNumberInput.classList.add('error');
        showError('Введите оба числа');
        return;
    }

    if (!firstValue) {
        firstNumberInput.classList.add('error');
        showError('Введите первое число');
        return;
    }

    if (!secondValue) {
        secondNumberInput.classList.add('error');
        showError('Введите второе число');
        return;
    }

    const num1 = parseFloat(firstValue);
    const num2 = parseFloat(secondValue);

    if (isNaN(num1)) {
        firstNumberInput.classList.add('error');
        showError('Первое число некорректно');
        return;
    }

    if (isNaN(num2)) {
        secondNumberInput.classList.add('error');
        showError('Второе число некорректно');
        return;
    }

    if (operator === '/' && num2 === 0) {
        secondNumberInput.classList.add('error');
        showError('Деление на ноль невозможно!');
        return;
    }

    let result;
    let operation;

    switch(operator) {
        case '+':
            result = num1 + num2;
            operation = `${num1} + ${num2} = ${result}`;
            break;
        case '-':
            result = num1 - num2;
            operation = `${num1} − ${num2} = ${result}`;
            break;
        case '*':
            result = num1 * num2;
            operation = `${num1} × ${num2} = ${result}`;
            break;
        case '/':
            result = num1 / num2;
            result = Math.round(result * 1000000) / 1000000;
            operation = `${num1} ÷ ${num2} = ${result}`;
            break;
    }

    calculationHistory.push(operation);
    if (calculationHistory.length > 5) {
        calculationHistory.shift();
    }

    displayResults();
}

function showError(message) {
    resultContainer.innerHTML = `<div class="result-item error">${message}</div>`;
}

function displayResults() {
    let html = '';
    
    if (calculationHistory.length > 1) {
        for (let i = 0; i < calculationHistory.length - 1; i++) {
            html += `<div class="result-item">${calculationHistory[i]}</div>`;
        }
    }
    
    html += `<div class="result-item success">${calculationHistory[calculationHistory.length - 1]}</div>`;
    
    resultContainer.innerHTML = html;
}

calculateBtn.addEventListener('click', calculate);

[firstNumberInput, secondNumberInput].forEach(input => {
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            calculate();
        }
    });
});

firstNumberInput.focus();