import { useState } from "react";

function Square({ value, highlight, onSquareClick }) {
  return (
    <button className={`square ${highlight ? "highlight" : ""}`} onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, status, onPlay }) {
  const { winner, winningLine } = status;
  function handleClick(i) {
    if (squares[i] || winner) return;
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    onPlay(nextSquares);
  }

  const statusMsg = winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? "X" : "O"}`;

  function renderSquare(i) {
    return (
      <Square
        key={i}
        value={squares[i]}
        highlight={winningLine && winningLine.indexOf(i) >= 0}
        onSquareClick={() => handleClick(i)}
      />
    );
  }

  function renderRow(n) {
    const rows = [];
    for (let i = n; i < n + 3; i++) {
      rows.push(renderSquare(i));
    }

    return rows;
  }

  function renderBoard() {
    const boardRows = [];
    for (let i = 0; i < 3; i++) {
      boardRows.push(
        <div key={i} className="board-row">
          {renderRow(i * 3)}
        </div>
      );
    }

    return boardRows;
  }

  return (
    <>
      <div className="status">{statusMsg}</div>
      {renderBoard()}
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null), move: 0 }]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[history.findIndex(({ _, move }) => move === currentMove)].squares;
  const [descending, setDescending] = useState(true);
  const toggleDesc = `Change to ${descending ? "▲▲▲▲▲" : "▼▼▼▼▼"}`;
  const status = calculateWinner(currentSquares);

  function handlePlay(nextSquares) {
    const nextMove = currentMove + 1;
    const nextHistory = [...history.slice(0, nextMove), { squares: nextSquares, move: nextMove }];
    setCurrentMove(nextMove);
    setHistory(nextHistory);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  function handleToggle() {
    setDescending(!descending);
  }

  function renderMoves() {
    const orderedHistory = descending ? history : history.toSorted((a, b) => b.move - a.move);

    return orderedHistory.map(({ _, move }) => {
      let description = move > 0 ? `move #${move}` : "game start";

      return (
        <li key={move}>
          {move === currentMove ? (
            `You are at ${description}`
          ) : (
            <button onClick={() => jumpTo(move)}>Go to {description}</button>
          )}
        </li>
      );
    });
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} status={status} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <button onClick={handleToggle}>{toggleDesc}</button>
        <ol>{renderMoves()}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        winner: squares[a],
        winningLine: [a, b, c],
      };
    }
  }
  return {
    winner: null,
    winningLine: null,
  };
}
