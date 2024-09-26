import { useEffect, useRef, useState } from 'react';
import { BinaryTreeNode, drawBinaryTree } from 'binary-tree-visualizer';
import '../../tree.css'
import DrawMode from '../Drawmode/DrawMode.jsx';

function Tree() {
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



  useEffect(() => {
    function isValidNodeNo() {
      return treeArray.includes(nodeno);
    }

    function isDuplicate() {
      return treeArray.includes(value);
    }

    if (first) {
      root.current = new BinaryTreeNode(value);
      drawBinaryTree(root.current, document.querySelector('#tree'));
      setFirst(false);
    } else if (rootExit) {
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
          drawBinaryTree(root.current, document.querySelector('#tree'));
        }
      } else if (position === 'left') {
        if (dupli.left) {
          alert("Node already exists on the left");
        } else {
          dupli.left = new BinaryTreeNode(value);
          drawBinaryTree(root.current, document.querySelector('#tree'));
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


  return (
    <>
      <div
        id="part"
        className="main flex gap-5 w-auto items-center relative bottom-full border-2 border-r-indigo-600 border-t-indigo-600 p-2"
      >
        <DrawMode
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
          setBtnState = {setBtnState}
          setFirst = {setFirst}
          disabled = {false}
        />

      </div>


      <canvas id='tree'></canvas>
    </>
  );
}

export default Tree;
