import React, { useEffect, useState } from "react";
import MyAlert from "./MyAlert";
function App() {
  const [alert, setAlert] = useState(null);

  const handleAlert = (message, type) => {
    setAlert({
      message: message,
      color: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };

  const [game, setGame] = useState(Array(9).fill(null));
  const [count, setCount] = useState(0);
  const Turn = count % 2 === 0;
  const winner = calculateWinner(game);

  const handleClick = (i) => {
    if (game[i] || calculateWinner(game)) return;
    const temp = game.slice();
    temp[i] = Turn ? "X" : "O";
    document.getElementById(i).classList.add("clicked");
    setTimeout(() => {
      document.getElementById(i).classList.remove("clicked");
    }, 2000);
    setGame(temp);
    setCount(count + 1);
  };

  useEffect(() => {
    if (winner) {
      handleAlert("Winner: " + winner + "!! Refresh To Restart!! ", "green");
    } else {
      handleAlert("Your Turn: " + (Turn ? "X" : "O"), Turn ? "red" : "blue");
    }
  }, [winner, Turn]);

  useEffect(() => {
    if (!calculateWinner(game) && count === 9) {
      handleAlert("It is Draw!! Refresh To Restart!!", "yellow");
    }
  },[count,calculateWinner]);

  return (
    <div className=" flex flex-col items-center mt-10 h-full">
      <MyAlert alert={alert} />
      <div className=" w-64 h-64 grid grid-cols-3 text-6xl">
        <button
          onClick={() => handleClick(0)}
          className="BTN  h-24 border-b-4 border-r-4 border-black"
        >
          <span id="0">{game[0]}</span>
        </button>
        <button
          onClick={() => handleClick(1)}
          className="BTN h-24 border-b-4 border-black"
        >
          <span id="1">{game[1]}</span>
        </button>
        <button
          onClick={() => handleClick(2)}
          className="BTN h-24 border-b-4 border-l-4 border-black"
        >
          <span id="2">{game[2]}</span>
        </button>
        <button
          onClick={() => handleClick(3)}
          className="BTN h-24 border-b-4 border-r-4 border-black"
        >
          <span id="3">{game[3]}</span>
        </button>
        <button
          onClick={() => handleClick(4)}
          className="BTN h-24 border-b-4 border-black"
        >
          <span id="4">{game[4]}</span>
        </button>
        <button
          onClick={() => handleClick(5)}
          className="BTN h-24 border-b-4 border-l-4 border-black"
        >
          <span id="5">{game[5]}</span>
        </button>
        <button
          onClick={() => handleClick(6)}
          className="BTN h-24 border-r-4 border-black"
        >
          <span id="6">{game[6]}</span>
        </button>
        <button onClick={() => handleClick(7)} className="BTN h-24">
          <span id="7">{game[7]}</span>
        </button>
        <button
          onClick={() => handleClick(8)}
          className="BTN h-24 border-l-4 border-black"
        >
          <span id="8">{game[8]}</span>
        </button>
      </div>
    </div>
  );
}

export default App;

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
      return squares[a];
    }
  }
  return null;
}
