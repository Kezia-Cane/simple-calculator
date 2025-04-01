import React, { useState } from 'react';
import './App.css';

function App() {
  const [displayValue, setDisplayValue] = useState('0');
  const [firstOperand, setFirstOperand] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

  const inputDigit = (digit) => {
    if (waitingForSecondOperand) {
      setDisplayValue(String(digit));
      setWaitingForSecondOperand(false);
    } else {
      setDisplayValue(displayValue === '0' ? String(digit) : displayValue + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForSecondOperand) {
      setDisplayValue('0.');
      setWaitingForSecondOperand(false);
      return;
    }
    if (!displayValue.includes('.')) {
      setDisplayValue(displayValue + '.');
    }
  };

  const clearDisplay = () => {
    setDisplayValue('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const toggleSign = () => {
    setDisplayValue(String(parseFloat(displayValue) * -1));
  };

  const inputPercent = () => {
    const value = parseFloat(displayValue);
    setDisplayValue(String(value / 100));
  };

  const performOperation = (nextOperator) => {
    const inputValue = parseFloat(displayValue);

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator);
      setDisplayValue(String(result));
      setFirstOperand(result);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  const calculate = (first, second, op) => {
    switch (op) {
      case '+':
        return first + second;
      case '-':
        return first - second;
      case '*':
        return first * second;
      case '/':
        return first / second;
      default:
        return second; // '=' case
    }
  };

  return (
    <div className="calculator">
      <div className="display">{displayValue}</div>
      <div className="keypad">
        <button className="key function" onClick={clearDisplay}>AC</button>
        <button className="key function" onClick={toggleSign}>+/-</button>
        <button className="key function" onClick={inputPercent}>%</button>
        <button className="key operator" onClick={() => performOperation('/')}>÷</button>

        <button className="key digit" onClick={() => inputDigit(7)}>7</button>
        <button className="key digit" onClick={() => inputDigit(8)}>8</button>
        <button className="key digit" onClick={() => inputDigit(9)}>9</button>
        <button className="key operator" onClick={() => performOperation('*')}>×</button>

        <button className="key digit" onClick={() => inputDigit(4)}>4</button>
        <button className="key digit" onClick={() => inputDigit(5)}>5</button>
        <button className="key digit" onClick={() => inputDigit(6)}>6</button>
        <button className="key operator" onClick={() => performOperation('-')}>−</button>

        <button className="key digit" onClick={() => inputDigit(1)}>1</button>
        <button className="key digit" onClick={() => inputDigit(2)}>2</button>
        <button className="key digit" onClick={() => inputDigit(3)}>3</button>
        <button className="key operator" onClick={() => performOperation('+')}>+</button>

        <button className="key digit zero" onClick={() => inputDigit(0)}>0</button>
        <button className="key digit" onClick={inputDecimal}>.</button>
        <button className="key operator" onClick={() => performOperation('=')}>=</button>
      </div>
    </div>
  );
}

export default App;
