import { useState } from "react";
import "./Assets/Styles/App.scss";
import { Board } from "./Components/Board";
import { Header } from "./Components/Header";

function App() {
  const [newGame, setNewGame] = useState(false);
  const [foundedMines, setFoundedMines] = useState(0);

  return (
    <main>
      <div className="gameContainer">
        <h1>MINESWEEPER</h1>
        <Header
          newGame={newGame}
          setNewGame={setNewGame}
          foundedMines={foundedMines}
        />
        <Board
          newGame={newGame}
          setNewGame={setNewGame}
          setFoundedMines={setFoundedMines}
          foundedMines={foundedMines}
        />
      </div>
    </main>
  );
}

export default App;
