//Create a React app from scratch.
//Show a single h1 that says "Good morning" if between midnight and 12PM.
//or "Good Afternoon" if between 12PM and 6PM.
//or "Good evening" if between 6PM and midnight.
//Apply the "heading" style in the styles.css
//Dynamically change the color of the h1 using inline css styles.
//Morning = red, Afternoon = green, Night = blue.

//import React from "react";
import ReactDOM from "react-dom/client";

const hour = new Date().getHours();
console.log(hour);
let greeting;
let textStyle;
if (hour < 12) {
  greeting = "Good Morning";
  textStyle = { color: "red" };
} else if (hour < 18) {
  greeting = "Good Afternoon";
  textStyle = { color: "green" };
} else {
  greeting = "Good Night";
  textStyle = { color: "blue" };
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <h1 className="heading" style={textStyle}>
    {greeting}
  </h1>,
);
