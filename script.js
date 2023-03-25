const result = document.querySelector(".result");
const input = document.querySelectorAll("td");
const operators = ["+", "-", "*", "/", "="];

let isPrevOperator = false;
let prev_result = "";
let operator = "";
console.log(result, input);

input.forEach((element) => {
  element.addEventListener("click", () => {
    const value = element.innerText;
    console.log(value, prev_result, operator);

    if (operators.includes(value)) setOperator(value);
    else if (value === "AC") setResultZero();
    else if (value === "%") setResultPercent();
    else if (value === ".") setResultDecimalPoint();
    else setResultNumber(value);
  });
});

function setOperator(op) {
  if (result.innerHTML === "0") return; //result에 값이 입력되지 않았으면
  else if (
    operator !== "" ||
    (op === "=" && prev_result !== "" && operator !== "")
  )
    setResultCalculate(op);
  else {
    operator = op;
    isPrevOperator = true;
  }
}

function setResultZero() {
  result.innerText = "0";
  operator = "";
  prev_result = "";
  isPrevOperator = false;
}

function setResultPercent() {
  if (result.innerText === "0") return;
  result.innerText = parseFloat(result.innerText) / 100;
  isPrevOperator = false;
}

function setResultDecimalPoint() {
  if (!result.innerText.includes(".")) {
    result.innerText = result.innerText + ".";
    operator = "";
    isPrevOperator = false;
  }
}

function setResultNumber(value) {
  if (result.innerText === "0") result.innerText = value;
  else if ((prev_result !== "" && operator !== "") || operator === "")
    result.innerText = result.innerText + value;
  else if (operator !== "") {
    prev_result = result.innerText;
    result.innerText = value;
  }
  isPrevOperator = false;
}

function setResultCalculate(op) {
  if (isPrevOperator) return (operator = op);

  switch (operator) {
    case "+":
      result.innerText = parseFloat(prev_result) + parseFloat(result.innerText);
      break;
    case "-":
      result.innerText = parseFloat(prev_result) - parseFloat(result.innerText);
      break;
    case "*":
      result.innerText = parseFloat(prev_result) * parseFloat(result.innerText);
      break;
    case "/":
      result.innerText = parseFloat(prev_result) / parseFloat(result.innerText);
      break;
  }
  prev_result = "";
  isPrevOperator = true;
  op == "=" ? (operator = "") : (operator = op);
}
