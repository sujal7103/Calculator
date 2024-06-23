// math functions
function addNums(num1, num2) {
    return num1 + num2;
}

function subtractNums(num1, num2) {
    return num1 - num2;
}

function multiplyNums(num1, num2) {
    return num1 * num2;
}

function divideNums(num1, num2) {
    if (num2 == 0) {
        return "ERROR: DIVIDE BY 0"
    }
    return num1 / num2;
}
//

// calls a math function for a given operator and set of 2 nums
function operate(operator, num1, num2) {
    let val;
    switch(operator) {
        case '+':
            val = addNums(num1, num2);
            break;
        case '-':
            val = subtractNums(num1, num2);
            break;
        case '*':
            val = multiplyNums(num1, num2);
            break;
        case '/':
            val = divideNums(num1, num2);
            break;
    }
    if (val == "ERROR: DIVIDE BY 0") {
        return val;
    }
    return val.toFixed(8);
}

// returns a bool to determine whether or not an error is displayed
function noError() {
    if (display.textContent == "ERROR: DIVIDE BY 0") {
        return false;
    }
    return true;
}

// returns length of the displayed number
function displayNumLength() {
    return display.textContent.length;
}

// helper functions for the button and keyboard event listeners
function numPressed(num) {
    if (noError() && displayNumLength() < 10) {
        display.textContent += num;
    }
}

function operatorPressed(operator) {
    if (noError()) {
        if (storedValue) {
            storedValue = operate(lastOperatorEntered, +storedValue, +display.textContent);
        }   else {            
            storedValue = display.textContent;
        }
        lastOperatorEntered = operator;        
        display.textContent = "";
    }
}

function equalPressed() {
    if (noError()) {
        if (storedValue && lastOperatorEntered) {
            display.textContent = operate(lastOperatorEntered, +storedValue, +display.textContent);
            storedValue = null;
            lastOperatorEntered = null;          
        }
    }   
}

function decimalPressed() {
    if (noError()) {
        if (!display.textContent.includes(".")) {
            display.textContent += ".";
        }
    }
}

function clearPressed() {
    display.textContent = "";
    storedValue = null;
    lastOperatorEntered = null;
}

function backspacePressed() {
    if (noError()) {
        endIndex = display.textContent.length - 1;
        display.textContent = display.textContent.slice(0, endIndex);
    }
}
//

// event listener initializers for all buttons
function initNumButtonEventListeners() {
    const buttons = document.querySelectorAll('button.num');
    buttons.forEach(button => button.addEventListener('click', () => {
        numPressed(button.textContent);
    }));
}

function initOperatorButtonEventListeners() {
    const buttons = document.querySelectorAll('button.operator');
    buttons.forEach(button => button.addEventListener('click', () => {
        operatorPressed(button.textContent);
    }));
}

function initEqualsButtonEventListener() {
    const button = document.querySelector('button.equals');
    button.addEventListener('click', equalPressed)
}

function initDecimalButtonEventListener() {
    const button = document.querySelector('button.decimal');
    button.addEventListener('click', decimalPressed);
}

function initClearButtonEventListener() {
    const button = document.querySelector('button.clear');
    button.addEventListener('click', clearPressed);
}

function initBackspaceButtonEventListener() {
    const button = document.querySelector('button.backspace');
    button.addEventListener('click', backspacePressed);  
}
//

// calls all button event initializers for clarity
function initButtonEventListeners() {
    initNumButtonEventListeners();
    initOperatorButtonEventListeners();
    initEqualsButtonEventListener();
    initClearButtonEventListener();
    initDecimalButtonEventListener();
    initBackspaceButtonEventListener();
}

// event listener initializer for all possible keys
function initKeyboardEventListeners() {
    document.addEventListener('keydown', e => {
        switch (e.key) {
            case 'Backspace':
                backspacePressed();
                break;
            case '.':
                decimalPressed();
                break;
            case 'c':
                clearPressed();
                break;
            case 'Enter':
            case '=':
                equalPressed();
                break;
            case '+': 
            case '-': 
            case '*': 
            case '/':
                operatorPressed(e.key);
                break;
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
            case '0':
                numPressed(e.key);
                break;
        }
    })
}

const display = document.querySelector('#display');
display.textContent = "";
initButtonEventListeners();
initKeyboardEventListeners();
let storedValue = null;
let lastOperatorEntered = null;
