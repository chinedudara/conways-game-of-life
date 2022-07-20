import React, { useEffect, useRef, useState } from 'react';
import './App.css';

let rowCount = 30;
let colCount = 30;
let cellSize = '10px'
let generationCount = 0;
let initGrid: number[][] = [];

function generateGrid(){
  let grid = [];
  for(let i=0; i<rowCount; i++){
    let row = [];
    for(let j=0; j<colCount; j++){
      row.push(Math.floor(Math.random()*2));
    }
    grid.push(row);
  }
  return grid;
}

console.log(generateGrid());


function nextGeneration(grid: number[][]){
  let nextGrid = grid.map((row) => [...row]);

  grid.map((row, i) => {
    row.map((col, j) => {
      const cell = col;
      let liveNeighbours = 0

      for(let x=-1; x<2; x++){
        for(let y=-1; y<2; y++){
          if(x === 0 && y === 0) continue;
          const i_x = i + x;
          const j_y = j + y;
          if(i_x >= 0 && j_y >= 0 && i_x < rowCount && j_y < colCount){
            const currentNeighbour = grid[i + x][j + y];
            liveNeighbours += currentNeighbour;
          }          
        }
      }

      if(cell === 1 && liveNeighbours < 2){
        nextGrid[i][j] = 0;
      }
      if(cell === 1 && liveNeighbours > 3){
        nextGrid[i][j] = 0;
      }
      if(cell === 0 && liveNeighbours === 3){
        nextGrid[i][j] = 1;
      }
    })
  })
  // console.table(nextGrid);
  return nextGrid;
}

console.table(generateGrid());

function App () {
  const [grid, setGrid] = useState(initGrid);
  useEffect(() => setGrid(generateGrid()), []);

  useEffect(() => {
    const runSim = setInterval(() => {
      setGrid(nextGeneration(grid));
      generationCount++;
      // console.log(generationCount);      
    }, 30)

    return () => {
      clearInterval(runSim);
    };
  }, [grid]);
  
  return (
    <div>
      <div style={{
          display:'grid', 
          gridTemplateColumns: `repeat(${colCount}, ${cellSize})`
          }}>
        {grid && grid.map((row, i) => (
          row.map((col, j) => (
            <div key={i+'_'+j} style={{
              width: cellSize,
              height: cellSize,
              backgroundColor: grid[i][j] ? 'green' : '',
              // border: 'solid 0.1px red'
            }}>
            </div>
          ))
        ))}
      </div>
    </div>
  );
}

export default App;
