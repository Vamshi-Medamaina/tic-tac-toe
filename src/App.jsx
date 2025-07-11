import { use, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  return(
    <>
    <Game />
    </>
  )
}

function Game(){

  //const [xIsNext,setXIsNext]=  useState(true);
  const [history,setHistory] =  useState([Array(9).fill(null)]);
  const [currentMove,setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];
  const xIsNext=currentMove%2===0;

  function handlePlay(nextSquares){
    const nextHistory=[...history.slice(0,currentMove+1),nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length-1);
    //setXIsNext(!xIsNext);
  }

  function jumpTo(nextMove){
    setCurrentMove(nextMove);
    //setXIsNext(nextMove % 2 ===0);
  }

  const moves=history.map((squares,move)=>{
    let description;
    if(move>0){
      description="Go to move #"+move;
    }else{
      description="Go to game start";
    }

    return (
      <li key={move}>
        <button  className="bg-blue-500 hover:bg-fuchsia-500 mt-1 text-white px-2 py-1 rounded" onClick={()=>{jumpTo(move)}}>{description}</button>
      </li>
    );
  });

  return(
    <>
    <div>
      <div className='game-board'>
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
      </div>
      <div className='game-info'>
        <ol>{moves}</ol>
      </div>
    </div>
    </>
  )
}


function Board({xIsNext,squares,onPlay}){


  function handleClick(i){
    const nextSquares = squares.slice();

    if(squares[i] || calculateWinner(squares)) return;

    if(xIsNext){
      nextSquares[i]="X";
    }
    else{
      nextSquares[i]="O";
    }
    onPlay(nextSquares);
  }

  const winner=calculateWinner(squares);
  let status;
  if(winner){
    status="Winner: "+winner;
  }
  else{
    status="Next Player: "+(xIsNext ? "X":"O");
  }

  return(
    <>
    <div className='status'>{status}</div>
    <div className="flex">
      <Square value={squares[0]} onSquareClick={()=>{handleClick(0)}}/>
      <Square value={squares[1]} onSquareClick={()=>{handleClick(1)}}/>
      <Square value={squares[2]} onSquareClick={()=>{handleClick(2)}}/>
    </div>
     <div className="flex">
      <Square value={squares[3]} onSquareClick={()=>{handleClick(3)}}/>
      <Square value={squares[4]} onSquareClick={()=>{handleClick(4)}}/>
      <Square value={squares[5]} onSquareClick={()=>{handleClick(5)}}/>
    </div>
     <div className="flex">
      <Square value={squares[6]} onSquareClick={()=>{handleClick(6)}}/>
      <Square value={squares[7]} onSquareClick={()=>{handleClick(7)}}/>
      <Square value={squares[8]} onSquareClick={()=>{handleClick(8)}}/>
    </div>
    </>
  )
}

function Square({value,onSquareClick}){

  return(
    <button onClick={onSquareClick} className='w-12 h-12  bg-white border border-black text-4xl'>{value}</button>
  )
}

function calculateWinner(squares){
  const lines=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ]

  for(let i=0;i<lines.length;i++){
    const [a,b,c]=lines[i];

    if(squares[a] && squares[a]==squares[b] && squares[a]==squares[c]){
      return squares[a];
    }
  }
  return null;
}

export default App
