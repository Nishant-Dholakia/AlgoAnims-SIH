import { useEffect, useRef, useState } from "react";
import { randomArray, drawtree } from "./array";
import { setTheme } from "binary-tree-visualizer";
import { animation, setmainSpeed } from "./sorting";

const Heapsort = () => {
  const [arr, setArr] = useState([]);
  const arrRef = useRef([]);
  const [start, setStart] = useState(false);
  const [speed, setSpeed] = useState(10);
  const [sorted, setSorted] = useState(false);
  const speedRef = useRef(1600);
  const arrDivRef = useRef(null);
  const rootRef = useRef(null);

  useEffect(() => {
    setTheme({ radius: 36, fontSize: 16, strokeColor: "#111" });
    const array = randomArray();
    setArr(array);
    arrRef.current = array;
    const root = drawtree(document.querySelector("canvas"), array);
    rootRef.current = root;
  }, []);

  useEffect(() => {
    if (start) {
      const allDivs = arrDivRef.current.querySelectorAll("div");
      if (rootRef.current) {
        animation(
          allDivs,
          document.querySelector("#heap"),
          arrRef.current,
          rootRef.current,
        );
      }
    }
    }, [start]);

  useEffect(() => {
    speedRef.current = 2600 - speed * 100;
    setmainSpeed(speedRef.current);
  }, [speed]);

  return (
    <div className="heapsort-container">
      <h1>Heap Sort</h1>
      <div className="speed-block flex items-center gap-2">
        <label htmlFor="speed">Speed:</label>
        <input
          type="range"
          id="speed"
          min={1}
          max={20}
          defaultValue={10}
          onChange={(e) => setSpeed(e.target.value)}
        />
        <span>{speed / 10}s</span>
      </div>
      <div ref={arrDivRef} className="array-container flex flex-wrap justify-center">
        {arr.map((ele, idx) => (
          <div key={idx} className="array-element p-4 text-black bg-white border-2 border-black">
            <h3>{ele}</h3>
          </div>
        ))}
      </div>
      <button
        onClick={() => setStart((prev) => !prev)}
        className="start-button p-2 bg-green-400 rounded-md"
      >
        {start ? "Stop" : "Start"}
      </button>
      {sorted && <button onClick={() => setSorted(false)} className="start-button p-2 bg-green-400 rounded-md">Sort Again</button>}
      <canvas id="heap" className="heap-canvas w-1/2 h-1/2 bg-zinc-300"></canvas>
    </div>
  );
};

export default Heapsort;
