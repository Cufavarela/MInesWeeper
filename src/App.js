import { useState } from "react";
import "./Assets/Styles/App.scss";
import { Board } from "./Components/Board";
import { Header } from "./Components/Header";

function App() {
  const [newGame, setNewGame] = useState(false);

  return (
    <main>
      <h1>MINESWEEPER</h1>
      <Header newGame={newGame} setNewGame={setNewGame} />
      <Board newGame={newGame} setNewGame={setNewGame} />
    </main>
  );
}

export default App;
