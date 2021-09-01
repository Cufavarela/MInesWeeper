export const Header = ({ setNewGame }) => {
  return (
    <section>
      <div className="buttonContainer">
        <button onClick={() => setNewGame(true)}>New Game!</button>
      </div>
    </section>
  );
};
