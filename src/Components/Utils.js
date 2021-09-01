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

export const revealSquare = (tileMap, tile, index, updateTileMap) => {
  const updatedTile = { ...tile, faceDown: false };
  if (tile.faceDown) {
    const boardCopy = tileMap.slice();
    boardCopy.splice(index, 1, updatedTile);
    updateTileMap(boardCopy);
    if (tile.hasMine) {
      gameLost(tileMap, updateTileMap);
    }
  }
};

export const putFlag = (tile) => {
  const newTile = { ...tile, hasFlag: !tile.hasFlag };
  return newTile;
};

const gameLost = (tileMap, updateTileMap) => {
  const revealedMap = tileMap.map((item) => ({ ...item, faceDown: false }));
  updateTileMap(revealedMap);
};
