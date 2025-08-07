import { useState } from 'react'
import './App.css'

function Square({value,onSquareClick}){
  //square ke 2 hi fun h to click(change the value) and to have a value
  return(
    //we have lifted state up from the square coz the game logic needs to have the value 
    <button onClick={onSquareClick}>
      {value}
    </button>
  )
}

function Board({xIsNext,onPlay,squares}){
  //the borad function will take 3 value as props 
  //one is the memory who is next , another is the fucntion 
  //telling the game logic when to play
  //and a set of game which of the squares is X and which is O

  function handleClick(i){
    //we will take i as a prop coz it will tell us which square is being clicked
    //we have to be sure when to handle click and when not to handle clicks
    if(squares[i] || calculateWinner(squares)) return ;

    const nextSquares = squares.slice();

    if(xIsNext){
       nextSquares[i] = "X";
    }else{
      nextSquares[i] = "O";
    }

    onPlay(nextSquares);
  }
  const winner = calculateWinner(squares);
  let status  ;
  if(winner){
    status = "Winner:" + winner;
  }else{
    status = "Next Player:" + (xIsNext ? 'X' : 'O');
  }

  return(
    <>
     <h2>{status}</h2>
     <div className="board-row">
         <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
         <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
         <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
     </div>
     <div className="board-row">
         <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
         <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
         <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
     </div>
     <div className="board-row">
         <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
         <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
         <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
     </div>
    </>
  );
}

function Game(){
  const [history,setHistory] = useState([Array(9).fill(null)])
  //Array creates a new array of size 9 and fill with null
  //[Array(9)...] bracket closes the array inside a new array
  // we don't use useState(Array(9).fill(null)) because we need to store all the moves inside the array which hagve been played 
  // but the useState(Array(9).fill(null)) only creates a single board setup not the complete history of game
  const [currentMove,setCurrentMove] = useState(0);
  const xIsNext = currentMove%2 == 0 ;
  const currentSquares = history[currentMove];
  
  //create a handle play function so that we can handle the game logic

  function handlePlay(nextSquares){
      const nextHistory = [...history.slice(0,currentMove+1),nextSquares];
      setHistory(nextHistory);
      setCurrentMove(nextHistory.length - 1);
      //equal to the length of the array
  }

  function jumpTo(nextMove){
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move)=>{
    let description ;
    if(move>0){
      description = "Go to move #" + move;
    }else{
      description = "Go to game start" ;
    }
    return(
       <li key={move}>
        <button onClick={()=>jumpTo(move)}>{description}</button>
       </li>
    )
  });
   return(
    <div className="game"> 
        <div className="game-board">
            <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
        </div>
        <div>
            <ol>{moves}</ol>
        </div>
    </div>
   );
}

function calculateWinner(squares){
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

  for(let i=0; i<lines.length ; i++){
    const[a,b,c] = lines[i];
    if(squares[a] && squares[a]==squares[b] && squares[a]==squares[c]){
      return squares[a];
    }
  }
  return null ;
}

function App() {

  return (
    <>
      <Game />
    </>
  )
}

export default App
