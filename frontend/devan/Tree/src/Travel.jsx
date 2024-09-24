import React, { useEffect, useState, useRef } from 'react';
import { drawBinaryTree } from 'binary-tree-visualizer';
import randomTreeGenrate from '../Public/randomTreeGenrate';
import './tree.css';
let anino = 0;

function Travel() {
  const [btn, setBtn] = useState(false);
  const [preorder, setPreorder] = useState([]);
  const [travel, setTravel] = useState([]);
  const isAnimationStopped = useRef(false);
  const [fixedTreeRoot, setFixedTreeroot] = useState(null);
  const [firstTime, setFirstTime] = useState(false);
  const [randomTree, setRandomTree] = useState(false);
  const [btnName, setBtnName] = useState("Start Travel");
  const [btncolor, setBtnColor] = useState("bg-green-700");
  const [btnhovercolor, setBtnhoverColor] = useState("hover:bg-green-600");
  const [speed, setSpeed] = useState(10);
  const [Reset, setReset] = useState(false);
  const [disableButtons, setDisableButtons] = useState(false); // New state for disabling buttons
  const inspeed = useRef(1600);

  function resetAll(root) {
    setReset(true);
    anino = 0;
    isAnimationStopped.current = true;
    setBtn(false);
    setBtnName('Start Travel');
    setBtnColor('bg-green-700');
    setBtnhoverColor('hover:bg-green-600');
    setPreorder([]);
    setTravel([]);
    setFixedTreeroot(root);
    resetColor(root);
    drawBinaryTree(root, document.querySelector("#travel"));
  }

  function resetColor(node) {
    if (node == null) return;
    if (node.nodeCircle && node.nodeCircle.colorSettings) {
      node.nodeCircle.colorSettings = {
        ...node.nodeCircle.colorSettings,
        bgColor: '#FFF2E0',
      };
    }
    resetColor(node.left);
    resetColor(node.right);
  }

  async function animation(node, main) {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (isAnimationStopped.current) {
          resolve();
          return;
        }

        if (node.nodeCircle && node.nodeCircle.colorSettings) {
          node.nodeCircle.colorSettings = {
            ...node.nodeCircle.colorSettings,
            bgColor: '#111',
          };
        }
        drawBinaryTree(main, document.querySelector("#travel"));
        resolve();
      }, inspeed.current);
    });
  }

  function search(root, value) {
    if (root == null) {
      return null;
    }
    if (root.value === value) {
      return root;
    }
    return search(root.left, value) || search(root.right, value);
  }

  async function startPreorderTraversal(main, root) {
    for (let i = 0; i < preorder.length; i++) {
      let no = preorder[i];
      if (isAnimationStopped.current) {
        return i;
      }
      if (i >= anino - 1) {
        let node = search(root, no);
        if (node) await animation(node, main);
        if (!isAnimationStopped.current) {
          setTravel((prevTravel) => [...prevTravel, no]);
        }
      }
    }
    isAnimationStopped.current = true;
    return preorder.length;
  }

  function collectPreorder(root) {
    if (root == null) {
      return;
    }
    preorder.push(root.value);
    collectPreorder(root.left);
    collectPreorder(root.right);
  }

  useEffect(() => {
    inspeed.current = 2600 - speed * 100;
  }, [speed]);

  useEffect(() => {
    if (Reset) {
      anino = 0;
    } else {
      if (firstTime) {
        if (btn) {
          const root = fixedTreeRoot;
          collectPreorder(root);
          main();
          async function main() {
            isAnimationStopped.current = false;
            anino = await startPreorderTraversal(root, root);
            if (anino == preorder.length) {
              isAnimationStopped.current = true;
            }
          }
        } else {
          setPreorder([]);
          isAnimationStopped.current = true;
        }
      } else {
        const root = randomTreeGenrate();
        resetAll(root);
      }
    }
  }, [btn, Reset]);

  return (
    <>
    <h1 className='text-2xl text-center p-4'>Preorder Travetion</h1>
      <div className='flex justify-center gap-4 reset-btn'>
        <button
          onClick={() => {
            resetAll(fixedTreeRoot);
          }}
          className='bg-orange-600 p-2 rounded-lg hover:bg-orange-500'
          disabled={disableButtons} // Disable based on state
        >
          Reset Travel
        </button>

        <button
          onClick={(evt) => {
            setReset(false);
            setFirstTime(true);
            if (btnName === 'Start Travel') {
              setBtn(true);
              setBtnName('Stop Travel');
              setBtnColor('bg-red-700');
              setBtnhoverColor('hover:bg-red-600');
              setDisableButtons(true); // Disable buttons during travel
            } else {
              setBtnName('Start Travel');
              setBtnColor('bg-green-700');
              setBtnhoverColor('hover:bg-green-600');
              setBtn(false);
              setDisableButtons(false); // Enable buttons when stopped
            }
            evt.target.disabled = true;
            evt.target.style.opacity = '0.7';
            setTimeout(() => {
              evt.target.disabled = false;
              evt.target.style.opacity = '1';
            }, 1200);
          }}
          className={`p-4 text-white z-10 rounded-lg ${btncolor}`}
        >
          {btnName}
        </button>

        <button
          onClick={() => {
            const root = randomTreeGenrate();
            resetAll(root);
          }}
          className='bg-blue-600 rounded-lg p-2 text-lg hover:bg-blue-500 random-btn'
          disabled={disableButtons} // Disable based on state
        >
          Random Tree
        </button>

        <div className='flex justify-center gap-2 items-center p-2'>
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
      </div>

      <div id='preorder' className='p-4 w-full h-1/4 bg-white text-black'>
        {travel.map((value, idx) => (
          <span key={idx} className='text-2xl m-4'>{value}</span>
        ))}
      </div>

      <canvas id='travel' className='z-0'></canvas>
    </>
  );
}

export default Travel;
