import React from "react";
import emojipedia from "../emojipedia.js";
import Entry from "./Entry.jsx";

function createEntry(item) {
  return(
    <Entry 
      key={item.id}
      icon={item.emoji}
      name={item.name}
      meaning={item.meaning}
    />
  );
}

function App() {
  return (
    <div>
      <h1>
        <span>emojipedia</span>
      </h1>
      <dl className="dictionary">
        {emojipedia.map(createEntry)}
      </dl>
    </div>
  );
}

export default App;
