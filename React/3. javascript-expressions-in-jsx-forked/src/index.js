import React from "react";
import ReactDOM from "react-dom";

const fname = "Steven";
const lname = "Sett";
const luckNum = 7;

ReactDOM.render(
  <div>
    <h1>Hello {fname + " " + lname}!</h1>
    <p>Your lucky number is {luckNum}.</p>
  </div>,
  document.getElementById("root")
);
