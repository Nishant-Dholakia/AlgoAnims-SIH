import React, { useEffect, useState, useRef } from 'react';
import { drawBinaryTree } from 'binary-tree-visualizer';
import randomTreeGenrate from '../Public/randomTreeGenrate';
import './tree.css';
let anino = 0;
function Travel() {
  const [btn, setBtn] = useState(false);
  const [preorder, setPreorder] = useState([]);
  const [travel, setTravel] = useState([]);
  const isAnimationStopped = useRef(false); // Use useRef for animation control
  const [fixedTreeRoot, setFixedTreeroot] = useState(null);
  const [firstTime, setFirstTime] = useState(false);
  const [randomTree, setRandomTree] = useState(false);
  const [btnName, setBtnName] = useState("Start Travel");
  const [btncolor, setBtnColor] = useState("bg-green-700");
  const [btnhovercolor, setBtnhoverColor] = useState("hover:bg-green-600");
  const [speed, setSpeed] = useState(10);
  const [Reset , setReset] = useState(false);
  const inspeed = useRef(1600);
  

  function reset() {
    isAnimationStopped.current = true;
    setTravel([]);
    setPreorder([]);
    anino = 0;
    setFirstTime(true);
    btnsetting(false); 
  }

  function resetColor(node) {
    if (node == null) return;
    // Reset the color settings to the initial color
    if (node.nodeCircle && node.nodeCircle.colorSettings) {
      node.nodeCircle.colorSettings = {
        ...node.nodeCircle.colorSettings,
        bgColor: '#FFF2E0', // The initial color of the nodes
      };
    }
    resetColor(node.left); // Reset left subtree
    resetColor(node.right); // Reset right subtree
  }

  function btnsetting(sp) {
    if (sp && btnName === 'Start Travel') {
      setBtnName('Stop Travel');
      setBtnColor('bg-red-700');
      setBtnhoverColor('hover:bg-red-600');
    } else {
      setBtnName('Start Travel');
      setBtnColor('bg-green-700');
      setBtnhoverColor('hover:bg-green-600');
    }
  }

  async function animation(node, main) {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (isAnimationStopped.current) {
          resolve(); // Stop the animation when isAnimationStopped is true
          return;
        }
        // Update the node color to indicate it's been visited
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
    console.log(anino)
    for (let i = 0; i < preorder.length; i++) {
      let no = preorder[i];
      if (isAnimationStopped.current) {
        return i;
      }
      if (i >= anino-1) {
        let node = search(root, no);
        if (node) await animation(node, main);
        if (!isAnimationStopped.current) {
          setTravel((prevTravel) => [...prevTravel, no]);
        }
      }
    }
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
    reset();
    const root = randomTreeGenrate();
    setFixedTreeroot(root);
    drawBinaryTree(root, document.querySelector("#travel"));
    anino = 0;
    reset(true)
    setBtn(false)
  }, [randomTree]);

  useEffect(() => {
      if (firstTime) {
        if (btn) {
          const root = fixedTreeRoot;
          collectPreorder(root); // Collect the traversal order before animation
          async function main() {
            isAnimationStopped.current = false;
            anino = await startPreorderTraversal(root, root);
            
          }
          main();
        } else {
          isAnimationStopped.current = true; // Stop animation
        }
      }
    
    
  }, [btn,  Reset]);

  return (
    <>
      <div className='flex justify-center gap-4'>
        <button
          onClick={() => {
            setBtn(true)
            isAnimationStopped.current = true;
            anino = 0; 
            reset(); 
            const root = fixedTreeRoot;
            resetColor(root); 
            drawBinaryTree(root, document.querySelector("#travel"));
            setReset(true)
            
          }}
          className='bg-orange-600 p-2 rounded-lg hover:bg-orange-500'
        >
          Reset Travel
        </button>

        <button
          onClick={() => {
            setFirstTime(true);
            if (btnName === 'Start Travel') {
              setBtn(true)
              setBtnName('Stop Travel');
              setBtnColor('bg-red-700');
              setBtnhoverColor('hover:bg-red-600');
            } else {
              setBtnName('Start Travel');
              setBtnColor('bg-green-700');
              setBtnhoverColor('hover:bg-green-600');
              setBtn(false)
              
            }
          }}
          className={`p-4 text-white z-10 rounded-lg ${btncolor} ${btnhovercolor}`}
        >
          {btnName}
        </button>
        <button
          onClick={() => {
            isAnimationStopped.current = true;
            setRandomTree((prev) => !prev);
            btnsetting(false);
            setReset(true)
            setFirstTime(false);
            anino = 0;
          }}
          className='bg-blue-600 rounded-lg p-2 text-lg hover:bg-blue-500'
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
