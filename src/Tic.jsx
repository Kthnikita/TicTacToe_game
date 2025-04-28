import React, { useState } from 'react'
import './Tic.css'
import { Howl } from 'howler';
function Tic() {
  let [arr,setarr]=useState(Array(9).fill(""));
  let [player,setplayer]=useState(true);
  let [status,setstatus]=useState(true);
  const [winner,setwinner]=useState(null);
  const [winline,setwinline]=useState(null);
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
      if(arr[a]==arr[b] && arr[b]==arr[c] && arr[a]!="")return {win:arr[b],line:ar1[i]};
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
      setwinner(`${winner.win} wins!`)
      setwinline(winner.line);
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
    setwinline(null);
  }
  function getline(indices){
    const pos=[{ x: 16.67, y: 16.67 }, { x: 50, y: 16.67 }, { x: 83.33, y: 16.67 },
      { x: 16.67, y: 50 }, { x: 50, y: 50 }, { x: 83.33, y: 50 },
      { x: 16.67, y: 83.33 }, { x: 50, y: 83.33 }, { x: 83.33, y: 83.33 }];
      const start=pos[indices[0]];
      const end=pos[indices[2]];
      const dx=end.x-start.x;
      const dy=end.y-start.y;
      const dis=Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);
      return {
        position: "absolute",
        top: `calc(${start.y}%)`, 
    left: `calc(${start.x}% )`,
        width: `${dis}%`,
        height: "4px",
        backgroundColor:" #2980b9",
        opacity:0.5,
        transform: `rotate(${angle}deg)`,
        transformOrigin: "0% 50%",
        zIndex: 999,
      };
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
    <div className="cells">
    {arr.map((_, index) => (
      <div key={index} className="cell" onClick={() => fn(index)}>
        {arr[index]}
      </div>
    ))}
     {winline && <div style={getline(winline)} />}
  </div>
     
    </div>
    
  </div>
  )
}

export default Tic
