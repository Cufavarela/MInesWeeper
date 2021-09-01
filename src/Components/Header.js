import { mines } from "../Assets/Constants";

export const Header = ({ setNewGame, foundedMines }) => {
  return (
    <section className="header">
      <div className="minesCounter">
        <span>{foundedMines}</span>
      </div>
      <div className="emojiPlace">
        <span>{foundedMines === mines ? "😎" : "🤔"}</span>
      </div>
      <div className="buttonContainer">
        <button onClick={() => setNewGame(true)}>New Game!</button>
      </div>
    </section>
  );
};
