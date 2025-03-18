import React from 'react';
import Case from './case/case';

function App() {
  // const [selectedCase, setSelectedCase] = useState('Case1');

  // const renderCase = () => {
  //   switch (selectedCase) {
  //     case 'Case1':
  //       return <Case1 />;
  //     case 'Case2':
  //       return <Case2 />;
  //     case 'Case3':
  //       return <Case3 />;
  //     case 'Case4':
  //       return <Case4 />;
  //     case 'Case5':
  //       return <Case5 />; 
  //     case 'Case6':
  //       return <Case6 />;
  //     default:
  //       return <Case1 />;
  //   }
  // };

  return (
    <div style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column",}}
    >
      <h2>Game Selector</h2>
      {/* <select onChange={(e) => setSelectedCase(e.target.value)} value={selectedCase}>
        <option value='Case1'>Case 1</option>
        <option value='Case2'>Case 2</option>
        <option value='Case3'>Case 3</option>
        <option value='Case4'>Case 4</option>
        <option value='Case5'>Case 5</option>
        <option value='Case6'>Case 6</option>
      </select> */}
      <div style={{ marginTop: '20px' }}>{Case()}</div>
    </div>
  );
}

export default App;
