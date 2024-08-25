import './App.css';
import React, { useState, useEffect } from "react";

function App() {
    const [number1, setNumber1] = useState("");
    const [number2, setNumber2] = useState("");
    const [currentOperation, setCurrentOperation] = useState("");
    const [result, setResult] = useState("");

    function allClear() {
        setNumber1("");
        setNumber2("");
        setCurrentOperation("");
        setResult("");
    }

    function clickNumber(val) {
        if (currentOperation === "") {
            setNumber1(number1 + val);
        } else {
            setNumber2(number2 + val);
        }
    }

    function clickOperation(val) {
        if (number1 && !number2) {
            setCurrentOperation(val);
        } else if (number1 && number2) {
            getResult();
            setCurrentOperation(val);
            setNumber1(result);
            setNumber2("");
        }
    }

    function getResult() {
        if (!number1 || !number2) return;

        const num1 = Number(number1);
        const num2 = Number(number2);

        switch (currentOperation) {
            case "+":
                setResult(num1 + num2);
                break;
            case "-":
                setResult(num1 - num2);
                break;
            case "*":
                setResult(num1 * num2);
                break;
            case "/":
                if (num2 !== 0) {
                    setResult(num1 / num2);
                } else {
                    setResult("Error"); // Handle division by zero
                }
                break;
            default:
                break;
        }
    }

    function handleKeyPress(e) {
        const key = e.key;

        if (key >= '0' && key <= '9') {
            clickNumber(key);
        } else if (key === '.') {
            clickNumber(key);
        } else if (key === '+' || key === '-' || key === '*' || key === '/') {
            clickOperation(key);
        } else if (key === 'Enter') {
            getResult();
        } else if (key === 'Backspace') {
            // Handle Backspace (DEL)
            if (currentOperation === "") {
                setNumber1(number1.slice(0, -1));
            } else {
                setNumber2(number2.slice(0, -1));
            }
        } else if (key === 'Escape') {
            allClear();
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [number1, number2, currentOperation, result, handleKeyPress]);

    return (
        <div className="App">
            <h1 className="title">My Calculator</h1>
            <div className="calculator-grid">
                <div className="output">
                    <div className="previous-operand">
                        {currentOperation ? number1 + " " + currentOperation : ""}
                    </div>
                    <div className="current-operand">
                        {result !== "" ? result : (currentOperation ? number2 : number1)}
                    </div>
                </div>
                <button onClick={allClear} className="span-two">AC</button>
                <button onClick={() => {clickNumber('Backspace')}}>DEL</button>
                <button onClick={() => {clickOperation("/")}}>/</button>
                <button onClick={() => {clickNumber("7")}}>7</button>
                <button onClick={() => {clickNumber("8")}}>8</button>
                <button onClick={() => {clickNumber("9")}}>9</button>
                <button onClick={() => {clickOperation("*")}}>*</button>
                <button onClick={() => {clickNumber("4")}}>4</button>
                <button onClick={() => {clickNumber("5")}}>5</button>
                <button onClick={() => {clickNumber("6")}}>6</button>
                <button onClick={() => {clickOperation("+")}}>+</button>
                <button onClick={() => {clickNumber("1")}}>1</button>
                <button onClick={() => {clickNumber("2")}}>2</button>
                <button onClick={() => {clickNumber("3")}}>3</button>
                <button onClick={() => {clickOperation("-")}}>-</button>
                <button onClick={() => {clickNumber(".")}}>.</button>
                <button onClick={() => {clickNumber("0")}}>0</button>
                <button onClick={getResult} className="span-two">=</button>
            </div>
        </div>
    );
}

export default App;
