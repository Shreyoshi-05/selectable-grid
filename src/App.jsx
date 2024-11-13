import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [matrix, setMatrix] = useState([]);
  const [start , setStart] = useState();
  const [end , setEnd] = useState();

  function makeGrid() {
    const arr = [];
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        let obj = {
          coloured: false,
          pair: [i, j],
        };
        arr.push(obj);
      }
    }
    setMatrix(arr);
  }

  function handelStart(no){
    setStart(no);
    makeGrid();
  }
  function  handelend(no){
    setEnd(no);
  }

  useEffect(() => {
    makeGrid();
  }, []);


  function getColour(st , ed){
    if (!st || !ed) return;

    const [startR , startC] = st;
    const [endR , endC] = ed;

    
    let selected = [];
    for(let i=startR; i<=endR; i++){
      for(let j=startC; j<=endC; j++){
        let obj = {i , j};
        selected.push([i,j].join(''));
      }
    }

    let copy = [...matrix];
    copy = copy.map((item)=>{
      const{pair} = item;
      const pairval = pair.join('');

      if(selected.includes(pairval)){
        item.coloured = true;
      }
      return item;
    })
    
    setMatrix(copy);
    
  }

  useEffect(()=>{
    getColour(start , end);
  },[start , end])

  return (
    <div className="page">
      <h1>Selectable Grid</h1>

      <div className="grid_outer_container">
        <div className="grid_container">
          {matrix.map((item , i) => {
            return (
              <div
                draggable
                key={i}
                className={`cell ${item.coloured && "selected"}`}
                onDrag={(e) => handelStart(item.pair)}
                onDragOver={(e) => handelend(item.pair)}
              >
                {item.pair}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default App;
