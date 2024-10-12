import React, { useEffect, useState, useRef } from 'react';
import { drawBinaryTree, setTheme } from 'binary-tree-visualizer';
import { BinaryTreeNode } from 'binary-tree-visualizer';
import randomTreeGenrate from '/Public/randomTreeGenrate.js';
import '../../../tree.css';
import '../travel.css';
import DrawMode from '../../Drawmode/DrawMode.jsx';
import { VisualizationType } from 'binary-tree-visualizer';


let anino = 0;

function Travel() {






  const [resetDisabled, setResetDisabled] = useState(false);
  const [ramdomDisabled, setRandomDisabled] = useState(false);

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
  const [drawDisable, setDrawDisable] = useState(false);
  const inspeed = useRef(1600);
  const [drawMode, setDrawMode] = useState(false);
  const [inserDisabled, setInserDisabled] = useState(false);

  const [value, setValue] = useState(0);
  const [nodeno, setNodeno] = useState(0);
  const [position, setPosition] = useState('left');
  const [rootExit, setRootExit] = useState(false);
  const [btnState, setBtnState] = useState(false);
  let [treeArray, setTreeArray] = useState(Array(15).fill(999)); // initialized to an array of 15 elements
  const [treeTrack, setTreeTrack] = useState([
    '0', '01', '02', '011', '012', '021', '022', '0111', '0112', '0121', '0122', '0211', '0212', '0221', '0222'
  ]);
  const [first, setFirst] = useState(false);
  const root = useRef(null); // useRef for root

  const canvas = document.querySelector("canvas");
  const ctx = canvas.getContext("2d");
 


  function forDrawMode() {
    isAnimationStopped.current = true;
    // setBtnName('Start Travel');
    // setBtnColor('bg-green-700');
    // setBtnhoverColor('hover:bg-green-600');
  }

  function deleteTree() {
    // Set the root to null to delete the tree structure
    setRootExit(false)
    root.current = null;
    resetAll(fixedTreeRoot)

    for (let i = 0; i < 15; i++) {
      treeArray[i] = 999;
    }
    clearCanvas();
  }

  function clearCanvas() {
    const canvas = document.getElementById('travel');
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the entire canvas
    }
  }
  useEffect(() => {



    function isValidNodeNo() {
      return treeArray.includes(nodeno);
    }

    function isDuplicate() {
      return treeArray.includes(value);
    }

    if (first) {
      root.current = new BinaryTreeNode(value);
      drawBinaryTree(root.current, document.querySelector('#travel'), {
        type: VisualizationType.HIGHLIGHT,


      });
      setFirst(false);
      setFixedTreeroot(root.current);

      forDrawMode();

    } else if (rootExit) {
      forDrawMode();
      if (!isValidNodeNo()) {
        alert("You entered the wrong node number");
        return;
      }

      if (isDuplicate()) {
        alert("You cannot enter a duplicate value");
        return;
      }

      let dupli = root.current;
      let currentNodePath = '';

      // Find the path in the treeArray where the node should be inserted
      for (let i = 0; i < 15; i++) {
        if (treeArray[i] === parseInt(nodeno)) {
          currentNodePath = treeTrack[i];
        }
      }

      // Traverse the tree based on the path (left = 1, right = 2)
      for (let i = 1; i < currentNodePath.length; i++) {
        if (!dupli) {
          alert("Traversal failed, node doesn't exist");
          return;
        }
        if (currentNodePath[i] === '1') {
          dupli = dupli.left;
        } else if (currentNodePath[i] === '2') {
          dupli = dupli.right;
        }
      }

      // Insert the new node based on position (left or right)
      if (position === 'right') {
        if (dupli.right) {
          alert("Node already exists on the right");
        } else {
          dupli.right = new BinaryTreeNode(value);
          drawBinaryTree(root.current, document.querySelector('#travel'), {
            type: VisualizationType.HIGHLIGHT,
            strokeColor: "#111",
            // A random color that is selected for each node circle
            // (DEFAULT [{bgColor: '#fff2e0', borderColor: '#f56042'}])
            colorArray: {
              borderColor: "drakgray",
              bgColor: "#fff"
            },

          });
        }
      } else if (position === 'left') {
        if (dupli.left) {
          alert("Node already exists on the left");
        } else {
          dupli.left = new BinaryTreeNode(value);
          drawBinaryTree(root.current, document.querySelector('#travel'), {
            type: VisualizationType.HIGHLIGHT,
            strokeColor: "#111",
            // A random color that is selected for each node circle
            // (DEFAULT [{bgColor: '#fff2e0', borderColor: '#f56042'}])
            colorArray: {
              borderColor: "drakgray",
              bgColor: "#fff"
            }
          });
        }
      }

      // Update the treeArray and the treeTrack with the new node
      let newPath = currentNodePath + (position === 'left' ? '1' : '2');
      for (let i = 0; i < 15; i++) {
        if (treeTrack[i] === newPath) {
          treeArray[i] = value;
          break;
        }
      }
    }
  }, [btnState]);

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
    drawBinaryTree(root, document.querySelector("#travel"), {
      type: VisualizationType.HIGHLIGHT,

    });
  }

  function resetColor(node) {
    if (node == null) return;
    if (node.nodeCircle && node.nodeCircle.colorSettings) {
      node.nodeCircle.colorSettings = {
        ...node.nodeCircle.colorSettings,
        bgColor: 'red',
        borderColor: 'white'
      };
    }
    resetColor(node.left);
    resetColor(node.right);
  }




  function updateNodeTheme(node, color) {
    console.log( node)
    setTheme({
      strokeColor: color
    });
  }

  // console.log(setTheme)
  function drawPath(node , ctx) {
    let x = node.nodeCircle.x,y=node.nodeCircle.y,h=100 ,w=5;
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.closePath();
    console.log(`Draw path at (${x}, ${y}) with size (${w}, ${h})`); // Debugging output
}

async function animation(node, main) {
    return new Promise((resolve) => {
        setTimeout(() => {
            if (isAnimationStopped.current) {
                resolve();
                return;
            }

            if (node.nodeCircle && node.nodeCircle.colorSettings) {
                // const canvas = document.querySelector("#canvas");
                // const ctx = canvas.getContext("2d");

                node.nodeCircle.colorSettings.bgColor = '#111'; 

                drawBinaryTree(main, document.querySelector("#travel"), {
                    type: VisualizationType.HIGHLIGHT,
                });

                updateNodeTheme(node , 'black');

                // drawPath(node , ctx);
            }

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

  function forTravelBtn(evt) {
    setReset(false);
    setFirstTime(true);
    if (btnName === 'Start Travel') {
      console.log(drawMode);
      setBtn(true);
      setBtnName('Stop Travel');
      setBtnColor('bg-red-700');
      setBtnhoverColor('hover:bg-red-600');

    } else {
      setBtnName('Start Travel');
      setBtnColor('bg-green-700');
      setBtnhoverColor('hover:bg-green-600');
      setBtn(false);

    }
    evt.target.disabled = true;
    evt.target.style.opacity = '0.7';
    setTimeout(() => {
      evt.target.disabled = false;
      evt.target.style.opacity = '1';
      if (btnName === 'Start Travel') {
        setRandomDisabled(true)
        setResetDisabled(true);
        setDrawDisable(true);
        setInserDisabled(true);
      } else {
        setRandomDisabled(false);
        setResetDisabled(false);
        setDrawDisable(false);
        setInserDisabled(false);
      }
    }, 1200);


    // if (drawMode) {
    //   setRandomDisabled(true);
    // }

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
      <div className='flex justify-center gap-4 flex-wrap'>

        <button
          className='rounded-lg p-2 text-lg bg-gray-600'
          onClick={() => {
            setDrawMode((prev) => !prev);
            setRandomDisabled((prev) => !prev); // Disable random tree when entering draw mode
            setBtnName('Start Travel');
            setBtnColor('bg-green-700');
            setBtnhoverColor('hover:bg-green-600');
            setBtn(false);
            deleteTree();
            isAnimationStopped.current = true;
          }}
          disabled={drawDisable}
        >Draw Tree</button>


        <button
          onClick={() => {
            resetAll(fixedTreeRoot);
            setInserDisabled(false);
          }}
          className='bg-orange-600 p-2 rounded-lg hover:bg-orange-500'
          disabled={resetDisabled} // Disable based on state
        >
          Reset Travel
        </button>

        <button
          onClick={(evt) => {
            if (preorder.length != travel.length || preorder.length == 0) {
              forTravelBtn(evt);
            } else {
              setBtnName('Start Travel');
              setBtnColor('bg-green-700');
              setBtnhoverColor('hover:bg-green-600');
              setRandomDisabled(false);
              setResetDisabled(false);
              resetColor(fixedTreeRoot);
            }
          }}
          className={`p-4 text-white z-10 rounded-lg ${btncolor}`}
        >
          {btnName}
        </button>

        <button
          onClick={() => {
            const root = randomTreeGenrate();
            console.log(root)
            resetAll(root);
            root.nodeCircle.colorSettings.bgColor = "#fff"
          }}
          className='bg-blue-600 rounded-lg p-2 text-lg hover:bg-blue-500 random-btn'
          disabled={ramdomDisabled} // Disable based on state
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

      <section className={`section w-full h-full p-3`}>
        <div
          id="drawMode" className='z-10 flex flex-col gap-20 items-center '>
          {!drawMode ? <>
            <div>DrawMode is off</div>
          </> : <DrawMode
            value={value}
            nodeno={nodeno}
            position={position}
            rootExit={rootExit}
            treeArray={treeArray}
            setRootExit={setRootExit}
            setTreeArray={setTreeArray}
            setValue={setValue}
            setPosition={setPosition}
            setNodeno={setNodeno}
            setBtnState={setBtnState}
            setFirst={setFirst}
            disabled={inserDisabled}
          />}
        </div>
        <canvas id='travel' className='z-0'></canvas>
      </section>
    </>
  );
}

export default Travel;
