import React, { useEffect, useState } from 'react';
import { BinaryTreeNode, drawBinaryTree } from 'binary-tree-visualizer';
import './tree.css';

function Travel() {
  const [btn, setBtn] = useState(false);
  const [preorder, setPreorder] = useState([]);
  let [travel, setTravel] = useState([]);
  const [anistart, setanistart] = useState(false);
  const [isAnimationStopped, setIsAnimationStopped] = useState(false);


  async function animation(node, main) {
    return new Promise((resolve) => {
      setTimeout(() => {
        if(isAnimationStopped){
          resolve();
        }
        if (node.nodeCircle && node.nodeCircle.colorSettings) {
          node.nodeCircle.colorSettings = {
            ...node.nodeCircle.colorSettings,
            bgColor: '#111'
          };
        }
        drawBinaryTree(main, document.querySelector("#travel"));
        resolve();
      }, 2000);
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

  async function stpre(main, root) {
    for (let no of preorder) {
      if(isAnimationStopped){
        break;
      }
      let node = search(root, no);
      if (node) await animation(node, main);

      setTravel((prevTravel) => [...prevTravel, no]);
    }
  }

  function print(root) {
    if (root == null) {
      return;
    }
    preorder.push(root.value);
    print(root.left);
    print(root.right);
  }

  useEffect(() => {
    if (!btn) {
      const root = new BinaryTreeNode(3);
      root.left = new BinaryTreeNode(5);
      root.right = new BinaryTreeNode(8);
      root.left.left = new BinaryTreeNode(2);
      root.left.right = new BinaryTreeNode(1);
      root.right.right = new BinaryTreeNode(10);
      // console.log(root);

      const canvas = document.querySelector("#travel");
      let size = travel.length;
      for(let i =0 ; i < size ;i++){
        travel.shift();
      }

      root.nodeCircle.colorSettings.bgColor = "#fff"      

      drawBinaryTree(root, canvas);

    }
    else if (btn) {
      const root = new BinaryTreeNode(3);
      root.left = new BinaryTreeNode(5);
      root.right = new BinaryTreeNode(8);
      root.left.left = new BinaryTreeNode(2);
      root.left.right = new BinaryTreeNode(1);
      root.right.right = new BinaryTreeNode(10);
      // console.log(root);

      const canvas = document.querySelector("#travel");

      drawBinaryTree(root, canvas);

      let mainRoot = root;
      print(root);
      // console.log(preorder);
      async function main() {
        await stpre(mainRoot, mainRoot);
        setanistart(true);
      }
      main();
    }
  }, [btn]);

  return (
    <>
      <button
        onClick={(evt) => {
          setBtn((prev) => !prev);
          if (evt.target.innerText == 'Start Travel') {
            evt.target.innerText = 'Stop Travel';
            evt.target.classList.remove('bg-green-700', 'hover:bg-green-600');
            evt.target.classList.add('bg-red-700', 'hover:bg-red-600');
            setIsAnimationStopped(false);
          } else {
            evt.target.innerText = 'Start Travel';
            evt.target.classList.add('bg-green-700', 'hover:bg-green-600');
            evt.target.classList.remove('bg-red-700', 'hover:bg-red-600');
            setIsAnimationStopped(true)
          }
        }}
        className='p-4 bg-green-700 hover:bg-green-600 text-white z-10'>
        Start Travel
      </button>
      <div id='preorder'
        className='p-4 w-full h-1/4 bg-white text-black'
      >
        {travel.map((value, idx) => {
          return <span key={idx} className='text-2xl m-4'>{value}</span>
        })}
      </div>
      <canvas id='travel' className='z-0'></canvas>
    </>
  );
}

export default Travel;
