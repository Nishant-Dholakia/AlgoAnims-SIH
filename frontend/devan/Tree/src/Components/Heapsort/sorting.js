import { BinaryTreeNode, drawBinaryTree } from "binary-tree-visualizer";
import gsap from "gsap";
import { drawtree } from "./array";

const swap = (arr, i, j) => {
    let no = arr[i];
    arr[i] = arr[j];
    arr[j] = no;
};

function findele(root, no) {
    if (root == null) return null;
    if (root.value == no) return root;

    return findele(root.left, no) || findele(root.right, no);
}

async function swapInCanvas(canvas, arr , speed) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const root = drawtree(canvas, arr)
            resolve(root)
        }, speed)
    })
}

function bordercolor(node, color) {
    if (node && node.nodeCircle && node.nodeCircle.colorSettings) {
        node.nodeCircle.colorSettings = {
            ...node.nodeCircle.colorSettings,
            borderColor: color
        };
    }
}

function color(node, color) {
    // console.log(node.nodeCircle.colorSettings)
    if (node && node.nodeCircle && node.nodeCircle.colorSettings) {
        node.nodeCircle.colorSettings = {
            ...node.nodeCircle.colorSettings,
            bgColor: color
        };
    }
}

async function swapCanvasValue(ele1, ele2, root, canvas, arr , speed) {
    if (!ele1 || !ele2) {
        console.log("Invalid nodes for swap");
        return;
    }


    let orignalColor = ele1.nodeCircle.colorSettings.bgColor
    // color(ele1, "green");
    // color(ele2, "green");

    // drawBinaryTree(root, canvas);

    const newRoot = await swapInCanvas(canvas, arr , speed);
    return new Promise((resolve) => {
        setTimeout(async () => {

            // color(ele1, orignalColor);
            // color(ele2, orignalColor);
            // drawBinaryTree(newRoot, canvas);
            resolve();
        }, speed);
    });
}

async function changeBoarder(ele1, ele2, root, canvas,speed) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {


            bordercolor(ele1, "black");
            bordercolor(ele2, "black");
            if (root) drawBinaryTree(root, canvas);
            
            resolve()
        }, speed);
    })
}

async function check(allDivs, canvas, arr, i, j, root , speed) {
    if (arr[i] === undefined || arr[j] === undefined) return;

    const ele1 = findele(root, arr[i]);
    const ele2 = findele(root, arr[j]);
    // await changeBoarder(ele1 , ele2 , root , canvas , speed)

    // bordercolor(ele1, "black");
    // bordercolor(ele2, "black");
    // if (root) drawBinaryTree(root, canvas);

    allDivs[i].style.backgroundColor = "red"
    allDivs[j].style.backgroundColor = "red"

    return new Promise((resolve) => {
        setTimeout(async () => {
            allDivs[i].style.backgroundColor = "white"
            allDivs[j].style.backgroundColor = "white"
            // bordercolor(ele2, "red" , speed);
            // bordercolor(ele1, "red" , speed);
            // if (root) drawBinaryTree(root, canvas);
            resolve();
        }, speed);
    });
}

const actualSwap = (allDivs, i, j) => {
    let no = allDivs[i].innerText;
    allDivs[i].innerText = allDivs[j].innerText;
    allDivs[j].innerText = no;
}

async function divSwap(allDivs, i, j, root, canvas, arr , speed) {
    const div1 = allDivs[i], div2 = allDivs[j];

    const div1Rect = div1.getBoundingClientRect();
    const div2Rect = div2.getBoundingClientRect();

    const xDiff = div2Rect.left - div1Rect.left;
    const yDiff = div2Rect.top - div1Rect.top;

    const ele1 = findele(root, div1.innerText);
    const ele2 = findele(root, div2.innerText);


    // await Promise.all([
        gsap.to(div1, { x: xDiff, y: yDiff }),
        gsap.to(div2, { x: -xDiff, y: -yDiff }),
 
        // await swapCanvasValue(ele1 , ele2 , root , canvas , arr , speed)
    // ]);
    actualSwap(allDivs, i, j);


    // gsap.set([div1, div2], { clearProps: "all" });
}

const heapify = async (arr, i, n, allDivs, canvas, root , speed) => {
    let largest = i;
    let left = 2 * i + 1;
    let right = left + 1;

    if (left < n) {
        await check(allDivs, canvas, arr, i, left, root , speed);
    }
    if (left < n && arr[largest] < arr[left]) {
        largest = left;
    }

    if (right < n) {
        await check(allDivs, canvas, arr, i, right, root , speed);
    }
    if (right < n && arr[largest] < arr[right]) {
        largest = right;
    }

    if (largest !== i) {
        swap(arr, i, largest);
        await divSwap(allDivs, i, largest, root, canvas, arr , speed);
        // await swapInCanvas(canvas, arr)
        await heapify(arr, largest, n, allDivs, canvas, root , speed);
    }
}

function setlastele(allDivs , i){
    allDivs[i].style.opacity = 0.3;
}

function removelastFromTree(canvas , arr , i){
    let newarr = [];
    
    for (let index = 0; index < i; index++) {
        const element = arr[index];
        newarr.push(element);
    }

    return drawtree(canvas , newarr)
}

async function main(allDivs, canvas, arr, root ,speed) {
    let n = arr.length;
    for (let i = Math.floor(n / 2 - 1); i >= 0; i--) {
        await heapify(arr, i, n, allDivs, canvas, root , speed);
    }

    for(let i = n - 1; i> 0 ;i--){
        swap(arr , 0 , i)
        await divSwap(allDivs , 0 , i, root , canvas , arr , speed);
        setlastele(allDivs , i);
        root = removelastFromTree(canvas , arr , i)
        drawBinaryTree(root , canvas)
        await heapify(arr , 0 , i ,allDivs , canvas , root , speed);
    }

    setlastele(allDivs , 0);
}

export const animation = (allDivs, canvas, arr, root , speed) => {
    main(allDivs, canvas, arr, root , speed);
}