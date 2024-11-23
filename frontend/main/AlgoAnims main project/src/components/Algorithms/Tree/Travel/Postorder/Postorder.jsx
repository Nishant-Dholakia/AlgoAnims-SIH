import React, { useEffect, useState, useRef } from 'react';
import { drawBinaryTree, setTheme } from 'binary-tree-visualizer';
import randomTreeGenrate from '/Public/randomTreeGenrate';
import '../travel.css'
let anino = 0;

function Postorder() {
//   setTheme({
//     strokeColor : "#111",
//     fontSize: 12,
//   })
  const [resetDisabled, setResetDisabled] = useState(false);
  const [ramdomDisabled, setRandomDisabled] = useState(false);

  const [btn, setBtn] = useState(false);
  const [postorder, setpostorder] = useState([]);
  const [travel, setTravel] = useState([]);
  const isAnimationStopped = useRef(false);
  const [fixedTreeRoot, setFixedTreeroot] = useState(null);
  const [firstTime, setFirstTime] = useState(false);
  const [btnName, setBtnName] = useState("Start Travel");
  const [btncolor, setBtnColor] = useState("bg-green-700");
  const [btnhovercolor, setBtnhoverColor] = useState("hover:bg-green-600");
  const [speed, setSpeed] = useState(10);
  const [Reset, setReset] = useState(false);
  const [drawDisable, setDrawDisable] = useState(false);
  const inspeed = useRef(1600);
  const [drawMode, setDrawMode] = useState(false);
  const [inserDisabled, setInserDisabled] = useState(false);

  function resetAll(root) {
    setReset(true);
    anino = 0;
    isAnimationStopped.current = true;
    setBtn(false);
    setBtnName('Start Travel');
    setBtnColor('bg-green-700');
    setBtnhoverColor('hover:bg-green-600');
    setpostorder([]);
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
        bgColor: '#fff2e0',
        
      };
    }
    resetColor(node.left);
    resetColor(node.right);
  }



  async function border(node){
    return new Promise((resolve, reject) => {
      node.nodeCircle.colorSettings.borderColor = "#111"
      node.nodeCircle.colorSettings.bgColor = "#fff2e0"
      drawBinaryTree(fixedTreeRoot , document.querySelector("#travel"))
      setTimeout(() => {
        node.nodeCircle.colorSettings.borderColor = "#f56042"
        drawBinaryTree(fixedTreeRoot , document.querySelector("#travel"))
        resolve(300)
      }, inspeed.current);
    })
  }


  async function collectPostorder(node){

      if (node == null) {
        return;
      }
    //   console.log(node)
      await border(node);

      await collectPostorder(node.left);

      await border(node);
      await collectPostorder(node.right);
      await border(node);
      node.nodeCircle.colorSettings.bgColor = 'lightgreen';
      drawBinaryTree(fixedTreeRoot, document.querySelector("#travel"));
      setTravel((prevTravel) => [...prevTravel, node.value]);
      postorder.push(node.value);
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
      if (btnName === 'Start Travel'){
        setRandomDisabled(true)
        setResetDisabled(true);
        setDrawDisable(true);
        setInserDisabled(true);
      }else{
        setRandomDisabled(false);
        setResetDisabled(false);
        setDrawDisable(false);
        setInserDisabled(false);
      }
    }, 1200);

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
          main();
          async function main() {
            await collectPostorder(root);
          }
        } else {
          setpostorder([]);
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
      
      <h1 className='text-2xl text-center p-4'>Postorder Travel</h1>
      <div className='flex justify-center gap-4 flex-wrap '>

        <button
          onClick={(evt) => {
            if (postorder.length != travel.length || postorder.length == 0) {
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
            resetAll(root);
          }}
          className='bg-blue-600 rounded-lg p-2 text-lg hover:bg-blue-500 random-btn'
          disabled={ramdomDisabled}
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

      <div id='postorder' className='p-4 w-full h-1/4 bg-white text-black'>
        {travel.map((value, idx) => (
          <span key={idx} className='text-2xl m-4'>{value}</span>
        ))}
      </div>

      <section className={`section w-full h-full p-3`}>
      <div className="algo dark:bg-black">
            <h2 className='text-2xl text-center'>Algorithm</h2>
            <div className='text-xl p-4 mt-4'>
              <pre className=''> void Inorder(TreeNode* root){"{"} </pre>
              <pre className='opacity-55' id='null'>       if(root == nullptr)  return;</pre>
              <pre className='opacity-55' >                                   </pre>
              <pre className='opacity-55' id='left'>       Inorder(root.left)</pre>
              <pre className='opacity-55' id='print'>       print(root.value)</pre>
              <pre className='opacity-55' id='right'>       Inorder(root.right)</pre>
              <pre className='' > {"}"}</pre>
            </div>
        </div>
        <canvas id='travel' className='z-0 dark:bg-gray-800'></canvas>
      </section>
    </>
  );
}

export default Postorder;
