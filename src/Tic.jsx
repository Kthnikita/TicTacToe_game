import React, { useState } from 'react'
import './Tic.css'
import { Howl } from 'howler';
function Tic() {
  let [arr,setarr]=useState(Array(9).fill(""));
  let [player,setplayer]=useState(true);
  let [status,setstatus]=useState(true);
  const [winner,setwinner]=useState(null);
  const sounds = {
    click: new Howl({ src: ['/pick-92276.mp3'] }),
    win: new Howl({ src: ['/win.mp3'] }),
    tie: new Howl({ src: ['/game-over-38511.mp3'] }),
  };
  function gameend(){
    const ar1 =[
      [0,1,2],[3,4,5],[6,7,8],[0,4,8],[2,4,6],[0,3,6],[1,4,7],[2,5,8]
    ]
    for(let i=0;i<8;i++){
      const [a,b,c]=ar1[i];
      if(arr[a]==arr[b] && arr[b]==arr[c] && arr[a]!="")return arr[a];
    }
    return null;
  }
  function isArrayFull(arr) {
    return arr.every(cell => cell !== "");
  }
  function fn(index){
    if(!status)return;
    if(arr[index]!="")return;
    if(player)arr[index]="O";
    else
     arr[index]="X";

    player=!player;
    setarr(arr);
    sounds.click.play();
    setplayer(player);

    const winner=gameend();
    if(winner){
      setwinner(`${winner} wins!`)
      sounds.win.play();
      setstatus(false);
      return;
    }
    if (isArrayFull(arr)) {
      setwinner("It's a draw!");
      sounds.tie.play(); 
      setstatus(false);
    } 
  }
  function restartGame() {
    setarr(Array(9).fill(""));
    setplayer(true);
    setstatus(true);
    setwinner(null);
  }
  return (
    <div className="game-container">
    {winner && (
      <div className="modal">
        <div className="modal-content">
          <p>{winner}</p>
          <button onClick={restartGame}>Restart</button>
        </div>
      </div>
    )}
  
    <div className="board">
      {arr.map((_,index)=>(
         <div key={index} className="cell" onClick={()=>{fn(index)}}>
          {arr[index]}
         </div>
      ))}
    </div>
  </div>
  )
}

export default Tic
