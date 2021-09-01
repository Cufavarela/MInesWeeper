import Flag from "../Assets/flag.png";
import Mine from "../Assets/mine.png";
import { putFlag, revealSquare } from "./Utils";

export const Square = ({ tile, updateTileMap, tileMap, index }) => {
  const handleRightClick = (e, tile) => {
    e.preventDefault();
    const updatedTile = putFlag(tile);
    const boardCopy = tileMap.slice();
    boardCopy.splice(index, 1, updatedTile);
    updateTileMap(boardCopy);
  };

  const handleLeftClick = (tile) => {
    revealSquare(tileMap, tile, index, updateTileMap);
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
