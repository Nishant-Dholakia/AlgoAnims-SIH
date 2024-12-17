import { BinaryTreeNode, drawBinaryTree } from "binary-tree-visualizer";

export const  randomArray = () => {
    let arr = [];

    for(let i = 0; i < 10 ;i++){
        let no = Math.ceil(Math.random()*100);

        while(arr.includes(no)){
            no = Math.ceil(Math.random()*100);
        }

        arr.push(no)
    }
    return arr;
}

export const drawtree = (canvas , arr) => {
    const root = new BinaryTreeNode(arr[0]);
    let i = 1;
    let queue = [root];
    

    while(i < arr.length){
        let top = queue.shift();

        if(i < arr.length){
            top.left = new BinaryTreeNode(arr[i++]);
            queue.push(top.left);
        }

        if(i < arr.length){
            top.right = new BinaryTreeNode(arr[i++]);
            queue.push(top.right);
        }
    }

    
    drawBinaryTree(root ,  canvas)

    return root;
}