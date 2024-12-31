import React, { useEffect, useState, useRef } from 'react';
import { drawBinaryTree, setTheme } from 'binary-tree-visualizer';
import randomTreeGenrate from '/Public/randomTreeGenrate';
import '../travel.css'

const Level = () => {
  return (
    <div><h1 className='text-2xl text-center p-4'>Postorder Travel</h1>
      <div className='flex justify-center gap-4 flex-wrap '>

        <button
          className={`p-4 text-white rounded-lg bg-green-600 hover:bg-green-500`}
        >
          Start
        </button>

        <button

          className='bg-blue-600 rounded-lg p-2 text-lg hover:bg-blue-500 random-btn'
        // disabled={ramdomDisabled}
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

      {/* <div id='postorder' className='p-4 w-full h-1/4 bg-white text-black'>
            {travel.map((value, idx) => (
              <span key={idx} className='text-2xl m-4'>{value}</span>
            ))}
          </div> */}

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
        <canvas id='travel' className='z-0 dark:bg-gray-800'></canvas>
      </section></div>
  )
}

export default Level