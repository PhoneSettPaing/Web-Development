import React from "react";
import ReactDOM from "react-dom";

const img = "https://picsum.photos/200";

ReactDOM.render(
  <div>
    <h1 className="heading" contentEditable="true" spellCheck="false">
      My Favourite Foods
    </h1>
    <div>
      <img
        className="food-img"
        src="https://kristineskitchenblog.com/wp-content/uploads/2021/09/bacon-in-oven-square-.jpg"
        alt="Picture of Bacons on a plate"
      />
      <img
        className="food-img"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd6p7HWt6FyI9vGkukTJw07Qw25zm3bPH5fA&usqp=CAU"
        alt="Picture of Jamon on a plate"
      />
      <img
        className="food-img"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT9CmKEHEVHLRwcAjbFwCjRE-PV-gntbAK6g&usqp=CAU"
        alt="Picture of Noodles on a plate"
      />
    </div>
    <div>
      <h2 className="rand-pic">Random Photo</h2>
      <img src={img + "?grayscale"} alt="Random Picture" />
    </div>
  </div>,
  document.getElementById("root"),
);
