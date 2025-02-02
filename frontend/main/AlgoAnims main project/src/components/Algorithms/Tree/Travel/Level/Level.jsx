import React, { useEffect, useState, useRef } from 'react';
import { drawBinaryTree, setTheme, VisualizationType } from 'binary-tree-visualizer';
import randomTreeGenrate from '/Public/randomTreeGenrate';
import '../travel.css'

const Level = () => {
  let anino = 0;
  setTheme({
    strokeColor: "#111",
    fontSize: 15,
    radius: 30,
    leafNodeSpace: 100,
    lineHeight: 150,
  })

  const option = {
    type: VisualizationType.HIGHLIGHT
  }
  const [resetDisabled, setResetDisabled] = useState(false);
  const [ramdomDisabled, setRandomDisabled] = useState(false);

  const [btn, setBtn] = useState(false);
  const [levelorder, setlevelorder] = useState([]);
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
  const [queueLength, setqueueLength] = useState([]);
  const [disabledArray, setDisabledArray] = useState(Array(15).fill(false));

  function resetAll(root) {
    setReset(true);
    anino = 0;
    isAnimationStopped.current = true;
    setBtn(false);
    setBtnName('Start Travel');
    setBtnColor('bg-green-700');
    setBtnhoverColor('hover:bg-green-600');
    // setlevelorder([]);
    setTravel([]);
    setFixedTreeroot(root);
    resetColor(root);
    drawBinaryTree(root, document.querySelector("#travel"), {
      type: VisualizationType.HIGHLIGHT
    });
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



  async function border(node , isPush) {
    return new Promise((resolve, reject) => {
      node.nodeCircle.colorSettings.borderColor = "#111"
      if(isPush) setqueueLength((prev) => [...prev, node]);

      //   node.nodeCircle.colorSettings.bgColor = "#fff2e0"
      drawBinaryTree(fixedTreeRoot, document.querySelector("#travel"), option)
      setTimeout(() => {
        node.nodeCircle.colorSettings.borderColor = "#f56042"
        drawBinaryTree(fixedTreeRoot, document.querySelector("#travel"), option)
        resolve(300)
      }, inspeed.current);
    })
  }


  async function collectLevel(node) {
    if (node == null) {
      return;
    }
  
    let queue = [];
    queue.push(node);
  
    await border(node, true);
    setqueueLength([...queue]);
    setDisabledArray((prev) => {
      let temp = [...prev];
      temp[0] = false;
      return temp;
    })

    let idx = 0;
    let deleteidx = 0;
  
    while (queue.length > 0) {
      let temp = queue.shift();
  
      if (temp.left != null) {
        await border(temp.left, true);
        queue.push(temp.left);
        idx++;
        setDisabledArray((prev) => {  
          let temp = [...prev];
          temp[idx] = false;
          return temp;
        })
      }
      if (temp.right != null) {
        await border(temp.right, true);
        queue.push(temp.right);
        idx++;
        setDisabledArray((prev) => {  
          let temp = [...prev];
          temp[idx] = false;
          return temp;
        })
      }
   
      await border(temp, false);
      temp.nodeCircle.colorSettings.bgColor = 'lightgreen';
      drawBinaryTree(fixedTreeRoot, document.querySelector("#travel"), option);
      setDisabledArray((prev)=>{
        let temp = [...prev];
        temp[0] = true;
        temp[deleteidx] = true;
        return temp
      })
      deleteidx++;
      
     
      setTravel((prevTravel) => [...prevTravel, temp.value]);
    }
  }
  

  function forTravelBtn(evt) {
    setReset(false);
    setFirstTime(true);
    if (btnName === 'Start Travel') {
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
            await collectLevel(root);
          }
        } else {
          // setlevelorder([]);
          isAnimationStopped.current = true;
        }
      } else {
        const root = randomTreeGenrate();
        resetAll(root);
      }
    }
  }, [btn, Reset]);
  return (
    <div><h1 className='text-2xl text-center p-4'>Level-Order Travel</h1>
      <div className='flex justify-center gap-4 flex-wrap '>

        <button
          onClick={(evt) => {
            if (levelorder.length != travel.length || levelorder.length == 0) {
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
          Start
        </button>

        <button

          className='bg-blue-600 rounded-lg p-2 text-lg hover:bg-blue-500 random-btn'
          // disabled={ramdomDisabled}
          onClick={() => {
            const root = randomTreeGenrate();
            resetAll(root);
          }}
        >
          Random Tree
        </button>

        <div className='flex justify-center gap-2 items-center p-2'>
          <label htmlFor="speed">Speed</label>
          <input

            defaultValue={10}
            min={1}
            max={20}
            type="range"
            name="speed"
            id="speed"
          />
          <span>{1 / 10}</span>
        </div>
      </div>

      <div id='levelorder' className=' flex  w-full h-1/4 bg-zinc-200 text-black'>
          {travel.map((value, idx) => (
            <div key={idx} className='text-2xl m-2 p-2'>{value}</div>
          ))}
      </div>

      <section className={`section w-full h-full p-3`}>
        <div className="algo dark:bg-black -z-10">
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
        <div className=' text-black z-50 flex justify-between '>
          
            {queueLength.map((node, idx) => (
              disabledArray[idx] ? <div key={idx} className={`opacity-50 border-black border-2 p-2`}>{node.value}</div> : <div key={idx} className={`border-black border-2 p-2`}>{node.value}</div>
            ))}
        </div>
        <canvas id='travel' className='z-0 mt-4 dark:bg-gray-800'></canvas>
      </section>
    </div>
  )
}

export default Level