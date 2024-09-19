import { useEffect, useRef, useState } from 'react';
import { BinaryTreeNode, drawBinaryTree } from 'binary-tree-visualizer';
import './App.css';

function App() {
  const [value, setValue] = useState(0);
  const [nodeno, setNodeno] = useState(0);
  const [position, setPosition] = useState('root');
  const [rootExit, setRootExit] = useState(false);
  const [btnState, setBtnState] = useState(false);
  let [treeArray, setTreeArray] = useState(Array(15).fill(999)); // initialized to an array of 15 elements
  const [treeTrack, setTreeTrack] = useState([
    '0', '01', '02', '011', '012', '021', '022', '0111', '0112', '0121', '0122', '0211', '0212', '0221', '0222'
  ]);
  const [first, setFirst] = useState(false);
  const root = useRef(null); // useRef for root

  useEffect(() => {
    if (first) {
      root.current = new BinaryTreeNode(value);
      // console.log(root.current);
      drawBinaryTree(root.current, document.querySelector('canvas'));
      setFirst(false);
    } else if (rootExit) {
      let dupli = root.current;
      let no = '';
      console.log(dupli);
      for (let i = 0; i < 15; i++) {
        if (treeArray[i] === parseInt(nodeno)) {
          no = treeTrack[i];
        }
      }
      console.log(no);

      for (let i = 1; i < no.length; i++) {
        if (no[i] === '1') {
          dupli = dupli.left;
        } else if (no[i] === '2') {
          dupli = dupli.right;
        }
      }

      console.log(dupli , position , value , nodeno);

      if (position === 'right') {
        setPosition('right');
        dupli.right = new BinaryTreeNode(value);
        drawBinaryTree(root.current, document.querySelector('canvas'));
      } else {
        setPosition('left');
        dupli.left = new BinaryTreeNode(value);
        drawBinaryTree(root.current, document.querySelector('canvas'));
        console.log("in")
      }

      no += position === 'left' ? '1' : '2';

      console.log(no);

      for (let i = 0; i < 15; i++) {
        if (treeTrack[i] === no) {
          treeArray[i] = value;
          break;
        }
      }
    }
  }, [btnState]);

  return (
    <>
      <div
        id="part"
        className="main flex gap-5 w-auto items-center relative bottom-full border-2 border-r-indigo-600 border-t-indigo-600 p-2"
      >
        <div>
          <label htmlFor="pos">Position</label>
          <select
            className="rounded-md"
            onChange={(evt) => {
              setPosition(evt.target.value);
            }}
            value={position}
            name="position"
            id="pos"
          >
            {rootExit === false ? (
              <option>root</option>
            ) : (
              <>
                <option>left</option>
                <option>right</option>
              </>
            )}
          </select>
        </div>

        <div>
          <label htmlFor="no">Value</label>
          <input
            className="w-1/2"
            value={value || ""} // Handle NaN: if value is NaN, set it to an empty string
            onChange={(evt) => {
              setValue(parseInt(evt.target.value) || 0); // Ensure value is a number, default to 0
            }}
            type="number"
            name="no"
            id="no"
          />
        </div>

        {rootExit === true ? (
          <div>
            <label htmlFor="whichnode">Node</label>
            <input
              className="w-1/2"
              value={nodeno || ""} // Handle NaN: if nodeno is NaN, set it to an empty string
              onChange={(evt) => {
                setNodeno(parseInt(evt.target.value) || 0); // Ensure nodeno is a number, default to 0
              }}
              type="number"
              name="nodeno"
              id="whichnode"
            />
          </div>
        ) : (
          <></>
        )}

        <button
          onClick={() => {
            if (!rootExit) {
              setRootExit(true);
              const newArray = [...treeArray];
              newArray[0] = value;
              setTreeArray(newArray);
              setFirst(true);
            }
            setBtnState((prev) => !prev);
          }}
          className="bg-blue-600 p-2 text-white hover:bg-blue-500 relative right-6"
        >
          Insert
        </button>
      </div>
    </>
  );
}

export default App;
