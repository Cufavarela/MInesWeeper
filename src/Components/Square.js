import Flag from "../Assets/flag.png";
import Mine from "../Assets/mine.png";
import { gameLost, putFlag, revealSquare } from "./Utils";

export const Square = ({
  tile,
  updateTileMap,
  tileMap,
  index,
  setFoundedMines,
  foundedMines,
}) => {
  const handleRightClick = (e, tile) => {
    e.preventDefault();
    const updatedTile = putFlag(tile);
    const boardCopy = tileMap.slice();
    boardCopy.splice(index, 1, updatedTile);
    updateTileMap(boardCopy);
    if (tile.hasMine) {
      setFoundedMines(foundedMines + 1);
    }
  };

  const handleLeftClick = (tile) => {
    const boardCopy = tileMap.slice();
    if (tile.hasMine) {
      gameLost(tileMap, updateTileMap);
    } else {
      let revealedSquares = revealSquare(boardCopy, index);
      updateTileMap(revealedSquares);
    }
  };

  return (
    <div
      onClick={() => handleLeftClick(tile)}
      onContextMenu={(e) => handleRightClick(e, tile)}
      className={tile.faceDown ? "faceDown" : "visible"}
    >
      <div className="square">
        {tile.faceDown ? (
          tile.hasFlag ? (
            <img src={Flag} height="30" width="30" />
          ) : null
        ) : tile.hasMine ? (
          <img src={Mine} height="30" width="30" />
        ) : tile.minesAround > 0 ? (
          <span>{tile.minesAround}</span>
        ) : null}
      </div>
    </div>
  );
};
