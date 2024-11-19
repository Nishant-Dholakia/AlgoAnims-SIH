import { drawBinaryTree } from "binary-tree-visualizer";
import gsap from "gsap";
const swap = (arr, i, j) => {
    let no = arr[i];
    arr[i] = arr[j];
    arr[j] = no;
};


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
function findele(root, no) {
    if (root == null) return null;
    if (root.value == no) return root;

    return findele(root.left, no) || findele(root.right, no);
}

function bordercolor(node, color) {
    if (node && node.nodeCircle && node.nodeCircle.colorSettings) {
        node.nodeCircle.colorSettings = {
            ...node.nodeCircle.colorSettings,
            borderColor: color
        };
    }
}

function changeBoarder(ele1, ele2, root, canvas, color) {
    bordercolor(ele1, color);
    bordercolor(ele2, color);
    drawBinaryTree(root, canvas);
}

function changeDivAndCanvas(root, canvas, allDivs, i, j, speed, arr) {
    let ele1 = findele(root, arr[i]);
    let ele2 = findele(root, arr[j]);

    allDivs[i].style.backgroundColor = "red";
    allDivs[j].style.backgroundColor = "red";

    let orignalColor = root.nodeCircle.colorSettings.borderColor;

    changeBoarder(ele1, ele2, root, canvas, "black");


    return new Promise((resolve, reject) => {
        setTimeout(() => {
            allDivs[i].style.backgroundColor = "#fff";
            allDivs[j].style.backgroundColor = "#fff";

            changeBoarder(ele1, ele2, root, canvas, orignalColor);
            resolve();
        }, speed);
    })
}



async function check(root, i, j, canvas, allDivs, speed , arr) {
    await changeDivAndCanvas(root, canvas, allDivs, i, j, speed, arr);
    // if (arr[i] < arr[j]) {
    //     return i;
    // }
    // return j;
}




async function heapify(root, arr, i, j, allDivs, speed, canvas) {

    let largest = i;
    let left = 2 * i + 1;
    let right = left + 1;

    // console.log("in heapify function")
    if (left < j) {
        await check(root, largest, left, canvas, allDivs, speed , arr);
        if(arr[left] > arr[largest]) largest = left;
        // console.log(largest);t
    }

    if (right < j) {
        await check(root, largest, right, canvas, allDivs, speed , arr);
        if(arr[right] > arr[largest]) largest = right;
        // console.log(largest);
    }

    if (i != largest) {
        swap(arr , i , j);
        await divSwap(allDivs , i ,largest , root , canvas , arr , speed)
        await heapify(root, arr, i, j, allDivs, speed, canvas);
    }
}





export default async function animation(root, canvas, arr, speed, allDivs) {
    let n = arr.length;
    console.log("in")
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        await heapify(root, arr, i, n, allDivs, speed, canvas);
    }
}

