import React from 'react';
import {search}  from '../seach';
import { BinaryTreeNode, drawBinaryTree , VisualizationType , setTheme } from 'binary-tree-visualizer';

const Insert = (props) => {
    setTheme({
        radius : 20,
        leafNodeSpace : 130,
        lineHeight : 130,
        fontSize : 24,
      })
    const insert = () => {
        let rootNode = props.rootNode;
        const canvas = document.querySelector(`#${props.canvas}`);
        const { speed, defaultColor, convertColor, first, value, setFirst, setRootNode } = props;

        if (first) {

            rootNode = new BinaryTreeNode(value);
            console.log(rootNode)
            drawBinaryTree(rootNode, canvas);
            setFirst(false);
            setRootNode(rootNode);
            return;
        }

        setTimeout(async() => {
            const parent = await search(canvas, value, rootNode, speed, defaultColor, convertColor);

            if (parent) {

                if (value < parseInt(parent.value)) {
                    parent.left = new BinaryTreeNode(value);
                } else {
                    parent.right = new BinaryTreeNode(value);
                }

                drawBinaryTree(rootNode, canvas,{
                    type : VisualizationType.PRETTY
                });
            }
        }, 100);
    };

    return (
        <button onClick={insert} className="bg-blue-500 p-2 rounded-lg">
            Insert
        </button>
    );
};

export default Insert;
