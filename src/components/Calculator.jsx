import { useState, useMemo, useEffect } from "react";
import "./Calculator.css";
import HistoryPanel from "./HistoryPanel";

const Calculator = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState("0");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const storedHistory = localStorage.getItem("calculatorHistory");
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("calculatorHistory", JSON.stringify(history));
  }, [history]);

  const updateExpression = (exp) => {
    try {
      const fn = new Function("return " + exp);
      return fn();
    } catch (error) {
      console.error("there is error in your expression:", error);
      return null;
    }
  };

  const handleInput = (value) => {
    if (value === "=") {
      const newResult = updateExpression(query);
      if (newResult !== null) {
        setResult(newResult.toString());
        setHistory([...history, { query, result: newResult.toString() }]);
      } else {
        setResult("Error");
      }
      setQuery("");
    } else {
      setQuery((prevQuery) => prevQuery + value);
    }
  };

  const clearEnd = () => {
    setQuery((prevQuery) => prevQuery.replace(/[\d.]+$/, ""));
  };

  const clearAll = () => {
    setQuery("");
    setResult("0");
  };

  const deleteLast = () => {
    setQuery((prevQuery) => prevQuery.slice(0, -1));
  };

  const historyList = useMemo(() => {
    return history.map((entry, index) => (
      <li key={entry.query + "-" + index}>
        <span>
          {entry.query} = {entry.result}
        </span>
      </li>
    ));
  }, [history]);

  return (
    <div className="calculator">
      <div className="history">
        <HistoryPanel>{historyList}</HistoryPanel>
      </div>
      <div className="calciDisplay">
        <span className="title">Simple Calculator</span>
        <div className="display">
          <input type="text" value={query} readOnly />
          <br />
          <span>{result}</span>
        </div>

        <div className="buttons">
          <div className="row first-row">
            <button onClick={() => clearEnd()}>CE</button>
            <button onClick={() => clearAll()}>C</button>
            <button onClick={() => deleteLast()}>← </button>
            <button onClick={() => handleInput("/")}>÷</button>
          </div>
          <div className="row">
            <button onClick={() => handleInput("7")}>7</button>
            <button onClick={() => handleInput("8")}>8</button>
            <button onClick={() => handleInput("9")}>9</button>
            <button onClick={() => handleInput("*")}>×</button>
          </div>
          <div className="row">
            <button onClick={() => handleInput("4")}>4</button>
            <button onClick={() => handleInput("5")}>5</button>
            <button onClick={() => handleInput("6")}>6</button>
            <button onClick={() => handleInput("-")}>-</button>
          </div>
          <div className="row">
            <button onClick={() => handleInput("1")}>1</button>
            <button onClick={() => handleInput("2")}>2</button>
            <button onClick={() => handleInput("3")}>3</button>
            <button onClick={() => handleInput("+")}>+</button>
          </div>
          <div className="row last-row">
            <button onClick={() => handleInput(".")}>.</button>
            <button onClick={() => handleInput("0")}>0</button>
            <button onClick={() => handleInput("=")}>=</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
