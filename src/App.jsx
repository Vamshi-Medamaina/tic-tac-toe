import { useState } from 'react'
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
  


  return(
    <>
    <div>
      <div className='game'>
        <Board />
      </div>
      <div className='game-info'>
        <ol></ol>
      </div>
    </div>
    </>
  )
}


function Board(){
  const [xIsNext,setXIsNext] = new useState(true);
  const [squares,setSquares]= new useState(Array(9).fill(null));

  function handleClick(i){
    const nextSquares = squares.slice();

    if(squares[i] || calculateWinner(squares)) return;

    if(xIsNext){
      nextSquares[i]="X";
    }
    else{
      nextSquares[i]="O";
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
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
    <button onClick={onSquareClick} className='w-12 h-12  bg-white-300 border-black outline text-4xl'>{value}</button>
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
