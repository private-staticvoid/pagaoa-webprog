import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="App">
        <header className="App Header">
          <h1>Welcome to my React App!</h1>
          <p>
            Name: Achiles Troy Pagaoa <br />
            Email: pagaoaachilestroy@gmail.com <br />
            Other Info:
            <a
              href="https://github.com/private-staticvoid"
              target="_blank"
              rel="noopener noreferrer"
            >
              My GitHub Account
            </a>
          </p>
        </header>
      </div>
    </>
  );
}

export default App;
