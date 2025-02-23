import React, { useState } from "react";
import Board from "./Board";
import "./GameStyle.css";
import { caculateWinner } from "./helper";

const Game = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [arrayOfX, setArrayOfX] = useState(Array(3).fill(null));
  const [arrayOfO, setArrayOfO] = useState(Array(3).fill(null));
  const [stepX, setStepX] = useState(0); 
  const [stepO, setStepO] = useState(0);

  const winner = caculateWinner(board);

  const handleClick = (index) => {
    const boardCopy = [...board];
    const xCopy = [...arrayOfX];
    const oCopy = [...arrayOfO];

    if (winner || boardCopy[index]) return;
    if (xIsNext) {
      let current = stepX % 3;
      boardCopy[index] = "X";
      if (xCopy[current] !== null) boardCopy[xCopy[current]] = null;
      xCopy[current] = index;
      setArrayOfX(xCopy);
      console.log(stepX);
      setStepX(stepX + 1);
    } else {
      let current = stepO % 3;
      boardCopy[index] = "O";
      if (oCopy[current] !== null) boardCopy[oCopy[current]] = null;
      oCopy[current] = index;
      setArrayOfO(oCopy);
      console.log(stepO);
      setStepO(stepO + 1);
    }
    setBoard(boardCopy);
    setXIsNext(!xIsNext);
  };

  const resetButton = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setArrayOfX(Array(3).fill(null));
    setArrayOfO(Array(3).fill(null));
    setStepX(0);
    setStepO(0);
  };

  return (
    <div className="game">
      <Board cells={board} onClick={handleClick}></Board>
      {winner ? <div className="game-winner"> Winner is {winner}</div> : null}
      <button className="reset-button" onClick={resetButton}>
        Reset game
      </button>
    </div>
  );
};

export default Game;
