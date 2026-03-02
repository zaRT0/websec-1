let calculationHistory = [];

const firstNumberInput = document.getElementById('firstNumber');
const secondNumberInput = document.getElementById('secondNumber');
const operatorSelect = document.getElementById('operator');
const calculateBtn = document.getElementById('calculateBtn');
const resultContainer = document.getElementById('resultContainer');

if (!firstNumberInput || !secondNumberInput || !operatorSelect || !calculateBtn || !resultContainer) {
    throw new Error('Необходимые элементы не найдены в DOM');
}

function calculate() {
    const firstValue = firstNumberInput.value.trim();
    const secondValue = secondNumberInput.value.trim();
    const operator = operatorSelect.value;

    firstNumberInput.classList.remove('error');
    secondNumberInput.classList.remove('error');

    if (!firstValue || !secondValue) {
        let errorText = `Введите ${!firstValue ? 'первое' : 'второе'} число`;
        if (!firstValue && !secondValue)
            errorText = 'Введите оба числа';

        if (!firstValue) firstNumberInput.classList.add('error');
        if (!secondValue) secondNumberInput.classList.add('error');

        showError(errorText);
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
            result.toFixed(6);
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
    resultContainer.innerHTML = calculationHistory.map((item, index) => {  
    const checkLast = index === calculationHistory.length - 1;  
    return `<div class="result-item ${checkLast ? 'current' : ''}">${item}</div>`  
})
}

calculateBtn.addEventListener('click', calculate);

[firstNumberInput, secondNumberInput].forEach(input => {
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            calculate();
        }
    });
    
    input.addEventListener('input', function() {
        this.classList.remove('error');
    });
});

firstNumberInput.focus();