import  { useEffect, useRef, useState } from "react";
import { randomArray, drawtree } from "./array";
import { setTheme } from "binary-tree-visualizer";
// import { animation } from "./sorting";
import animation from "./temp";

const Heapsort = () => {
  setTheme({
    fontSize: 16,
    strokeColor: "#111",
  });

//   const [insert, setinsert] = useState(0);
  const [arr, setArr] = useState([]);
  const arrRef = useRef([]);
  const [start, setstart] = useState(false);
  const [speed, setSpeed] = useState(10);
  const inspeed = useRef(1600);
  const arrDivRef = useRef(null);
  const rootRef = useRef(null);

  useEffect(() => {
    setTheme({
      radius: 36,
    });
    let array = randomArray();
    setArr(array);
    arrRef.current = array;
    const root = drawtree(document.querySelector("canvas"), arrRef.current);
    rootRef.current = root;
  }, []);

  useEffect(() => {
    if (start) {
      console.log(arrRef.current);
      let allDivs = arrDivRef.current.querySelectorAll("div");

      if (rootRef.current) {
        animation(
          rootRef.current , 
          document.querySelector("#heap"),
          arrRef.current,
          inspeed.current,
          allDivs
        )
      }
    }
  }, [start]);

  useEffect(() => {
    inspeed.current = 2600 - speed * 100;
  }, [speed]);

  return (
    <>
      <h1>Heap Sort</h1>
      <div className="speed-block flex items-center gap-2">
        <label htmlFor="speed">Speed</label>
        <input
          onChange={(evt) => setSpeed(evt.target.value)}
          defaultValue={10}
          min={1}
          max={20}
          type="range"
          name="speed"
          id="speed"
        />
        <span>{speed / 10}</span>
      </div>
      <div ref={arrDivRef} className="flex flex-wrap justify-center ">
        {arr.map((ele, idx) => {
          return (
            <>
              <div
                className="p-4 text-black bg-white border-black border-2"
                key={idx}
              >
                <h3 key={idx}>{ele}</h3>
              </div>
            </>
          );
        })}
      </div>

      <button
        onClick={() => {
          setstart((prev) => !prev);
        }}
        className="p-2 bg-green-400 rounded-md"
      >
        Start
      </button>
      <canvas id="heap" className="w-1/2 h-1/2 bg-zinc-300"></canvas>
    </>
  );
};

export default Heapsort;
