import React from "react";
import logo from './logo.svg';
import oran from './discord oran.png'
import './App.css';

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  },[]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={oran} className="App-logo" alt="logo" />
        <p>
          {!data ? "Loading..." : data}
        </p>
      </header>
    </div>
  );
}

export default App;
