import "./App.css";
import Header from "./components/Header";
import { useState } from "react";
function App() {
  const [tasks, setTasks] = useState([]);
  return (
    <div className="App">
      <Header></Header>
    </div>
  );
}

export default App;
