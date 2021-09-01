import { useEffect, useState } from "react";
import { Square } from "./Square";
import { size, mines } from "../Assets/Constants";
import { getAroundTiles } from "./Utils";

export const Board = ({
  newGame,
  setNewGame,
  foundedMines,
  setFoundedMines,
}) => {
  const [tileMap, setTileMap] = useState([]);

  const prepareTileMap = () => {
    const gridAmount = size * size;
    const minesIndex = [];
    const baseItem = {
      faceDown: true,
      hasMine: false,
      hasFlag: false,
      minesAround: 0,
    };
    const map = new Array(gridAmount).fill(baseItem);
    setNewGame(false);

    while (minesIndex.length < mines) {
      minesIndex.push(Math.floor(Math.random() * gridAmount));
    }
    minesIndex
      .filter((item, index, self) => self.indexOf(item) === index)
      .forEach((index) => {
        const aroundTiles = getAroundTiles(index, size);
        map[index] = { ...baseItem, hasMine: true };
        aroundTiles.forEach((aroundIndex) => {
          map[aroundIndex] = {
            ...map[aroundIndex],
            minesAround: map[aroundIndex]["minesAround"] + 1,
          };
        });
      });
    return map;
  };

  useEffect(() => {
    setTileMap(prepareTileMap());
  }, []);

  useEffect(() => {
    if (newGame) {
      setTileMap(prepareTileMap());
      setFoundedMines(0);
    }
  }, [newGame]);

  return (
    <div>
      <section className="grid" style={{ "--size": 10 }}>
        {tileMap.map((tile, index) => (
          <Square
            key={index}
            index={index}
            tile={tile}
            updateTileMap={setTileMap}
            tileMap={tileMap}
            setFoundedMines={setFoundedMines}
            foundedMines={foundedMines}
          />
        ))}
      </section>
    </div>
  );
};
