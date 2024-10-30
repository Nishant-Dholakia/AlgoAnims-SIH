import React, { useEffect, useRef, useState } from 'react'
import Insert from '../insert/insert'
import { BinarySearchTreeNode, drawBinaryTree ,setTheme, VisualizationType } from 'binary-tree-visualizer';
import Delete from '../delete/Delete';

const Crud = () => {
  setTheme({
    radius : 20,
    leafNodeSpace : 130,
    lineHeight : 130,
  })

  const [rootNode, setrootNode] = useState(null);
  const [first, setfirst] = useState(true);
  const canvas = useRef(null)
  const [insertValue, setInsertValue] = useState(0);
  const [speed, setSpeed] = useState(10);
  const inspeed = useRef(1600);
  const [deleteNode , setDeleteNode] = useState(0);


  const someInsertNode = () => {
    const root = new BinarySearchTreeNode(100);
    [50, 145, 150, 130, 120, 140, 30, 70, 75,10,40,60,160,147].forEach((ele) => {
      root.insert(ele)
    })

    // setTimeout(() => {
    //   root.delete(145 , root);
    //   drawBinaryTree(root, document.querySelector("#bst"),{
    //     type : VisualizationType.PRETTY
    //   });
    // }, 2000);

    setrootNode(root)
    setfirst(false);
    setTheme({
      fontSize : 24,
      leafNodeSpace : 130,
      lineHeight : 130,
    });
    drawBinaryTree(root, document.querySelector("#bst"),{
      type : VisualizationType.PRETTY
    });

  }



  useEffect(() => {
    inspeed.current = 2600 - speed * 100;
    // someInsertNode();
  }, [speed]);



  return (



    <>
      <div className="main flex justify-around items-center p-10 text-white bg-zinc-950">
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

        <div className="insert-block flex items-center gap-2 ">
          <input type="number"
          value={insertValue}
          className='text-black'
            min={0}
            max={99}
            onChange={(evt) => {
              setInsertValue(evt.target.value);
            }} />
          <Insert speed={inspeed.current}
            first={first}
            canvas={"bst"}
            value={insertValue}
            defaultColor={"#f56042"}
            convertColor={"black"}
            rootNode={rootNode}
            setFirst={setfirst}
            setRootNode={setrootNode}
          />
        </div>

        <div className="delete-block flex items-center gap-2">
          <input type="number"
          className='text-black'
            min={0}
            max={99}
            value={deleteNode}
            onChange={(evt) => {
              setDeleteNode(evt.target.value);
            }} />
          <Delete 

            canvas = {"bst"}
            rootNode = {rootNode}
            node = {deleteNode}
            defaultColor={"#f56042"}
            convertColor={"black"}
            setRootNode={setrootNode}
            speed={inspeed.current}
          />
        </div>
      </div>
      <canvas ref={canvas} id='bst' className='bg-zinc-600 h-1/2 w-1/2'></canvas>
    </>
  )
}

export default Crud