import { size } from "../Assets/Constants";

export const getAroundTiles = (index, size) => {
  const gridSize = size * size;
  const aroundTiles = [
    -size - 1,
    -size,
    -size + 1,
    -1,
    0,
    1,
    size - 1,
    size,
    size + 1,
  ];

  return aroundTiles
    .map((tile) => {
      const tileIndex = tile + index;
      if (tileIndex < 0 || tileIndex >= gridSize || tileIndex === index)
        return null;
      if ((index + 1) % size === 0 && tileIndex % size === 0) return null; // Edge case (literally)
      if (index % size === 0 && (tileIndex + 1) % size === 0) return null; // Edge case (literally)
      return tileIndex;
    })
    .filter((tile) => tile !== null);
};

export const revealSquare = (boardCopy, index) => {
  if (!boardCopy[index].faceDown) {
    return boardCopy;
  }

  let flipped = [];
  flipped.push({ ...boardCopy[index], index: index });
  while (flipped.length !== 0) {
    let one = flipped.pop();

    if (one.faceDown) {
      const openTile = { ...boardCopy[one.index], faceDown: false };
      boardCopy.splice(one.index, 1, openTile);
      one.faceDown = false;
    }
    if (one.minesAround !== 0) {
      break;
    }

    const surroundedTiles = getAroundTiles(one.index, size);
    surroundedTiles.forEach((item) => {
      if (boardCopy[item].minesAround === 0 && boardCopy[item].faceDown) {
        flipped.push({ ...boardCopy[item], index: item });
      }
      if (boardCopy[item].faceDown) {
        const openTile = { ...boardCopy[item], faceDown: false };
        boardCopy.splice(item, 1, openTile);
      }
    });
  }
  return boardCopy;
};

export const putFlag = (tile) => {
  const newTile = { ...tile, hasFlag: !tile.hasFlag };
  return newTile;
};

export const gameLost = (tileMap, updateTileMap) => {
  const revealedMap = tileMap.map((item) => ({ ...item, faceDown: false }));
  updateTileMap(revealedMap);
};
