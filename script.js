function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    return "can't divide";
  }
  return a / b;
}

function operate(operator, a, b) {
  switch (operator) {
    case '+':
      return add(a, b);
    case '-':
      return subtract(a, b);
    case '*':
      return multiply(a, b);
    case '/':
      return divide(a, b);

    default:
      return 'Invalid operator';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const display = document.querySelector('[name="display"]');
  const numberButtons = document.querySelectorAll('.number');
  const operatorButtons = document.querySelectorAll('.operator');
  const clearButton = document.querySelector('.clear');
  const backspaceButton = document.querySelector('.backspace');
  const decimalButton = document.querySelector('.decimal');
  const equalButton = document.querySelector('.equal');

  let currentInput = '';
  let storedInput = '';
  let currentOperator = '';
  let isResultDisplayed = false;

  function updateDisplay() {
    display.value = currentInput;
  }

  numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
      if (isResultDisplayed) {
        currentInput = '';
        isResultDisplayed = false;
      }
      if (button.value === '0' && currentInput === '0') return;

      currentInput += button.value;
      updateDisplay();
    });
  });

  operatorButtons.forEach((button) => {
    button.addEventListener('click', () => {
      if (currentInput === '') return;
      if (storedInput !== '' && currentOperator !== '') {
        currentInput = operate(
          currentOperator,
          parseFloat(storedInput),
          parseFloat(currentInput)
        );
        updateDisplay();
      }
      currentOperator = button.value;
      storedInput = currentInput;
      currentInput = '';
    });
  });

  clearButton.addEventListener('click', () => {
    currentInput = '';
    storedInput = '';
    currentOperator = '';
    updateDisplay();
  });

  backspaceButton.addEventListener('click', () => {
    if (isResultDisplayed) {
      currentInput = '';
      isResultDisplayed = false;
    } else {
      currentInput = currentInput.slice(0, -1);
    }
    updateDisplay();
  });

  decimalButton.addEventListener('click', () => {
    if (isResultDisplayed) {
      currentInput = '';
      isResultDisplayed = false;
    }
    if (currentInput.includes('.')) return;
    currentInput += '.';
    updateDisplay();
  });

  equalButton.addEventListener('click', () => {
    if (currentInput === '' || storedInput === '' || currentOperator === '')
      return;
    currentInput = operate(
      currentOperator,
      parseFloat(storedInput),
      parseFloat(currentInput)
    ).toString();
    updateDisplay();
    storedInput = '';
    currentOperator = '';
    isResultDisplayed = true;
  });

  display.addEventListener('input', () => {
    if (isResultDisplayed) {
      currentInput = '';
      isResultDisplayed = false;
    }
    currentInput = display.value;
    updateDisplay();
  });
});
