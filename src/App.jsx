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
         <Square value={squares[0]} onSquareClick={handleClick} />
         <Square value={squares[1]} onSquareClick={handleClick} />
         <Square value={squares[2]} onSquareClick={handleClick} />
     </div>
     <div className="board-row">
         <Square value={squares[3]} onSquareClick={handleClick} />
         <Square value={squares[4]} onSquareClick={handleClick} />
         <Square value={squares[5]} onSquareClick={handleClick} />
     </div>
     <div className="board-row">
         <Square value={squares[6]} onSquareClick={handleClick} />
         <Square value={squares[7]} onSquareClick={handleClick} />
         <Square value={squares[8]} onSquareClick={handleClick} />
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
  const [current,setCurrent] = useState(0);
  const xIsNext = current%2 == 0 ;
  const currentSquare = history[current];

}

function App() {

  return (
    <>
      <h1>hello</h1>
    </>
  )
}

export default App
