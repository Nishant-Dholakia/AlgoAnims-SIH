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

async function swapInCanvas(canvas, arr) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const root = drawtree(canvas, arr)
            // drawBinaryTree(root , canvas)
            resolve(root)
        }, 500)
    })
}

async function waitForDraw(root, canvas) {
    drawBinaryTree(root, canvas);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, 100);
    })
}

// function changeValue(root, orignal, newval, canvas, mainroot) {
//     let node = findele(root, orignal);
//     node.value = newval;
//     drawBinaryTree(mainroot, canvas)
// }

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

async function swapCanvasValue(ele1, ele2, root, canvas, arr) {
    if (!ele1 || !ele2) {
        console.log("Invalid nodes for swap");
        return;
    }


    let orignalColor = ele1.nodeCircle.colorSettings.bgColor
    color(ele1, "green");
    color(ele2, "green");

    drawBinaryTree(root, canvas);

    const newRoot = await swapInCanvas(canvas, arr);
    return new Promise((resolve) => {
        setTimeout(async () => {

            color(ele1, orignalColor);
            color(ele2, orignalColor);
            drawBinaryTree(newRoot, canvas);
            resolve();
        }, 1000);
    });
}

async function changeBoarder(ele1, ele2, root, canvas) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {


            bordercolor(ele1, "black");
            bordercolor(ele2, "black");
            if (root) drawBinaryTree(root, canvas);
            resolve()
        }, 500);
    })
}

async function check(allDivs, canvas, arr, i, j, root) {
    if (arr[i] === undefined || arr[j] === undefined) return;

    const ele1 = findele(root, arr[i]);
    const ele2 = findele(root, arr[j]);
    // await changeBoarder(ele1 , ele2 , root , canvas)

    // bordercolor(ele1, "black");
    // bordercolor(ele2, "black");
    // if (root) drawBinaryTree(root, canvas);

    allDivs[i].style.backgroundColor = "red"
    allDivs[j].style.backgroundColor = "red"

    return new Promise((resolve) => {
        setTimeout(async () => {
            allDivs[i].style.backgroundColor = "white"
            allDivs[j].style.backgroundColor = "white"
            // bordercolor(ele1, "red");
            // bordercolor(ele2, "red");
            // if (root) drawBinaryTree(root, canvas);
            resolve();
        }, 1000);
    });
}

const actualSwap = (allDivs, i, j) => {
    let no = allDivs[i].innerText;
    allDivs[i].innerText = allDivs[j].innerText;
    allDivs[j].innerText = no;
}

async function divSwap(allDivs, i, j, root, canvas, arr) {
    const div1 = allDivs[i], div2 = allDivs[j];

    const div1Rect = div1.getBoundingClientRect();
    const div2Rect = div2.getBoundingClientRect();

    const xDiff = div2Rect.left - div1Rect.left;
    const yDiff = div2Rect.top - div1Rect.top;

    const ele1 = findele(root, div1.innerText);
    const ele2 = findele(root, div2.innerText);

    await swapCanvasValue(ele1, ele2, root, canvas, arr); // Make sure this works as intended

    await Promise.all([
        gsap.to(div1, { x: xDiff, y: yDiff, duration: 1 }),
        gsap.to(div2, { x: -xDiff, y: -yDiff, duration: 1 })
    ]);
    actualSwap(allDivs, i, j);

    gsap.set([div1, div2], { clearProps: "all" });
}

const heapify = async (arr, i, n, allDivs, canvas, root) => {
    let largest = i;
    let left = 2 * i + 1;
    let right = left + 1;

    if (left < n) {
        await check(allDivs, canvas, arr, i, left, root);
    }
    if (left < n && arr[largest] < arr[left]) {
        largest = left;
    }

    if (right < n) {
        await check(allDivs, canvas, arr, i, right, root);
    }
    if (right < n && arr[largest] < arr[right]) {
        largest = right;
    }

    if (largest !== i) {
        swap(arr, i, largest);
        await divSwap(allDivs, i, largest, root, canvas, arr);
        // await swapInCanvas(canvas, arr)
        await heapify(arr, largest, n, allDivs, canvas, root);
    }
}

async function main(allDivs, canvas, arr, root) {
    let n = arr.length;
    for (let i = Math.floor(n / 2 - 1); i >= 0; i--) {
        await heapify(arr, i, n, allDivs, canvas, root);
    }
}

export const animation = (allDivs, canvas, arr, root) => {
    main(allDivs, canvas, arr, root);
}