import React from 'react';
import Case from './case/case';

function App() {
  return (
    <div style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column",}}>
      <h2>Game Selector</h2>
      <div>{Case()}</div>
    </div>
  );
}

export default App;
