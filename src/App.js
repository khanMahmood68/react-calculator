import { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import "./App.css";

function App() {
  const [prevState, setPrevState] = useState("");
  const [currState, setCurrState] = useState("");
  const [input, setInput] = useState("0");
  const [operator, setOperator] = useState(null);
  const [total, setTotal] = useState(false);

  function reset() {
    setPrevState("");
    setCurrState("");
    setInput("0");
  }

  function percent() {
    prevState
      ? setCurrState(String((parseFloat(currState) / 100) * prevState))
      : setCurrState(String(parseFloat(currState) / 100));
  }

  function minusplus() {
    if (currState.charAt(0) === "-") {
      setCurrState(currState.substring(1));
    } else {
      setCurrState("-" + currState);
    }
  }

  function operatorType(e) {
    setTotal(false);
    setOperator(e.target.innerText);
    if (currState === "") return;
    if (prevState !== "") {
      equals();
    } else {
      setPrevState(currState);
      setCurrState("");
    }
  }

  function inputNum(e) {
    if (currState.includes(".") && e.target.innerText === ".") return;

    if (total) {
      setPrevState("");
    }
    currState
      ? setCurrState((prev) => prev + e.target.innerText)
      : setCurrState(e.target.innerText);
    setTotal(false);
  }

  function equals(e) {
    if (e?.target.innerText === "") {
      setTotal(true);
    }
    let cal;

    switch (operator) {
      case "/":
        cal = String(parseFloat(prevState) / parseFloat(currState));
        break;

      case "X":
        cal = String(parseFloat(prevState) * parseFloat(currState));
        break;

      case "+":
        cal = String(parseFloat(prevState) + parseFloat(currState));
        break;

      case "-":
        cal = String(parseFloat(prevState) - parseFloat(currState));
        break;

      default:
        return;
    }
    setInput("");
    setPrevState(cal);
    setCurrState("");
  }

  useEffect(() => {
    setInput(currState);
  }, [currState]);

  useEffect(() => {
    setInput("0");
  }, []);

  return (
    <div className="container">
      <div className="wrapper">
        <div className="screen">
          {input !== "" || input === "0" ? (
            <NumericFormat
              value={input}
              displayType={"text"}
              thousandSeparator={true}
            />
          ) : (
            <NumericFormat
              value={prevState}
              displayType={"text"}
              thousandSeparator={true}
            />
          )}
        </div>
        <div className="btn light-grey" onClick={reset}>
          AC
        </div>
        <div className="btn light-grey" onClick={percent}>
          %
        </div>
        <div className="btn light-grey" onClick={minusplus}>
          +/-
        </div>

        <div className="btn orange" onClick={operatorType}>
          /
        </div>
        <div className="btn" onClick={inputNum}>
          7
        </div>
        <div className="btn" onClick={inputNum}>
          8
        </div>
        <div className="btn" onClick={inputNum}>
          9
        </div>

        <div className="btn orange" onClick={operatorType}>
          X
        </div>
        <div className="btn" onClick={inputNum}>
          4
        </div>
        <div className="btn" onClick={inputNum}>
          5
        </div>
        <div className="btn" onClick={inputNum}>
          6
        </div>

        <div className="btn orange" onClick={operatorType}>
          +
        </div>
        <div className="btn" onClick={inputNum}>
          1
        </div>
        <div className="btn" onClick={inputNum}>
          2
        </div>
        <div className="btn" onClick={inputNum}>
          3
        </div>

        <div className="btn orange" onClick={operatorType}>
          -
        </div>
        <div className="btn" onClick={inputNum}>
          0
        </div>
        <div className="btn" onClick={inputNum}>
          .
        </div>
        <div className="btn equals" onClick={equals}>
          =
        </div>
      </div>
    </div>
  );
}

export default App;
