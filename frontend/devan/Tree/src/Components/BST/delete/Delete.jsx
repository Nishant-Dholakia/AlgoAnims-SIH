import React, { useState } from 'react'
import { search } from '../seach';
import { BinaryTreeNode, drawBinaryTree, setTheme , VisualizationType } from 'binary-tree-visualizer';
import './delete.css';
import gsap from 'gsap';

const Delete = (props) => {
  

  async function wait(rightcanvas) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        rightcanvas.classList.add("hidden")
        resolve(100)
      }, 100);
    })
  }

  async function merg(leftcanvas , rightcanvas , speed, leftNode , rightNode) {
    return new Promise((resolve, reject) => {
      setTimeout(async() => {
        let tl = gsap.timeline()
        tl
          .to(leftcanvas , {
             y : '30%'
          } , "with")
          .to(rightcanvas , {
            y : '30%',
          } , "with")
          let prevright = null;
          let temp = rightNode;

          while(rightNode != null){
            prevright = rightNode;
            rightNode = rightNode.left;
          }

          if(prevright) {prevright.left = leftNode;
            drawBinaryTree(temp , leftcanvas,{
              type : VisualizationType.PRETTY
            });
          }
          await wait(rightcanvas);
          
          resolve(100);


      }, speed);
    })
  }

  setTheme({
    radius : 48,
    leafNodeSpace : 130,
    lineHeight : 130,
  })


  const deleteProcess = async () => {
    let { rootNode, node, defaultColor, convertColor, setRootNode, speed } = props;
    console.log(rootNode)
    const canvas = document.querySelector(`#${props.canvas}`);
    const finalNode = await search(canvas, node, rootNode, speed, defaultColor, convertColor)

    if(finalNode &&  finalNode.left == finalNode.right  && finalNode.right == null){
      return;
    }

    let deleteNode = new BinaryTreeNode(node);
    let leftRoot;
    let rightRoot;
    
    if (finalNode && finalNode.left && finalNode.left.value == deleteNode.value) {
      leftRoot = finalNode.left.left;
      rightRoot = finalNode.left.right;
      deleteNode = finalNode.left;
    } else if (finalNode && finalNode.right && finalNode.right.value == deleteNode.value) {
      leftRoot = finalNode.right.left;
      rightRoot = finalNode.right.right;
      deleteNode  = finalNode.right;
    }else if(deleteNode.value == rootNode.value && !finalNode){
      leftRoot = rootNode.left;
      rightRoot = rootNode.right;
      deleteNode  = rootNode;
    }



    if(deleteNode.left == deleteNode.right && deleteNode.left == null){
      console.log(deleteNode.value);
      // rootNode.delete(deleteNode.value , rootNode);
      if(finalNode.left == deleteNode) finalNode.left = null;
      else if(finalNode.right == deleteNode) finalNode.right = null;
      setRootNode(rootNode)
      drawBinaryTree(rootNode , canvas ,{
        type : VisualizationType.PRETTY
      });
      return;
    }else if(deleteNode.left == null && deleteNode.right){
      console.log("in left null ");
      // rightRoot = deleteNode.right;
      // leftRoot = null;
      deleteNode = rightRoot;
      drawBinaryTree(rootNode , canvas);
      // console.log(rightRoot , deleteNode)
      return;
    }else if(deleteNode.left && deleteNode.right == null){
      console.log("in left null ");
      // leftRoot = deleteNode.left;
      // rightRoot = null;
      console.log(deleteNode , leftRoot , finalNode)
      deleteNode = leftRoot;
      drawBinaryTree(rootNode , canvas);
      return;
    }


    const leftcanvas = document.querySelector(".left-canvas");
    const rightcanvas = document.querySelector(".right-canvas");

    leftcanvas.classList.remove("hidden");
    rightcanvas.classList.remove("hidden");

    gsap.to(".left-canvas" , {
      x : '80vw',
    })
    gsap.to(".right-canvas" , {
      x: '80vw',
      y : '50vh',
    })

    
    
    setTheme({
      fontSize : 24,
      leafNodeSpace : 130,
      lineHeight : 130,
    })
   if(leftRoot) drawBinaryTree(leftRoot, leftcanvas )
   if(rightRoot) drawBinaryTree(rightRoot, rightcanvas)

   
    await merg(leftcanvas , rightcanvas ,speed ,leftRoot , rightRoot);

   

// console.log(finalNode.nodeCircle.x);
    gsap.to(".left-canvas", {
      delay : 0.5,
      x : "40vw",
    })

    setTimeout(() => {
      if(finalNode && finalNode.left && finalNode.left == deleteNode){
        finalNode.left = rightRoot; 
      }
      else if(finalNode && finalNode.right && finalNode.right == deleteNode){
        finalNode.right = rightRoot;
      }
      else if(!finalNode && deleteNode.value == rootNode.value){
        rootNode = rightRoot;
        setRootNode(rightRoot);
      }
  
      drawBinaryTree(rootNode , canvas,{
        type : VisualizationType.PRETTY
      });
      leftcanvas.classList.add("hidden")
      gsap.to(leftcanvas ,{
        x : "-50vw"
      });gsap.to(rightcanvas ,{
        x : "-50vw"
      })
      console.log(leftcanvas , rightcanvas)

    }, speed);
    
    
  }

  return (
    <>
      <button
        onClick={deleteProcess}
        className="bg-red-500 p-2 rounded-lg">
        Delete
      </button>

      

        
        <canvas className='left-canvas  bg-zinc-500 w-1/4 left-0 fixed bottom-1/2 border-2 border-black hidden'></canvas>
        
        <canvas className='right-canvas bg-zinc-500 w-1/4 left-0 fixed bottom-1/2 border-2 border-black hidden'>
        </canvas>

    </>
  )
}

export default Delete