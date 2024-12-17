import { drawtree } from "./array";
import { BinaryTreeNode, drawBinaryTree } from "binary-tree-visualizer";
import gsap from "gsap";

let speed = 1600;

const swap = (arr, i, j) => {
  [arr[i], arr[j]] = [arr[j], arr[i]];
};

function findNode(root, value) {
  if (!root) return null;
  if (root.value === value) return root;
  return findNode(root.left, value) || findNode(root.right, value);
}

function preorderTraversal(node, preorder = []) {
  if (node == null) return;

  preorder.push(node.value);

  preorderTraversal(node.left, preorder);
  preorderTraversal(node.right, preorder);
  return preorder;
}

function changeBorder(root, node, color, canvas, arr) {
  if (node && node.nodeCircle && node.nodeCircle.colorSettings) {
    node.nodeCircle.colorSettings = {
      ...node.nodeCircle.colorSettings,
      borderColor: color
    };
  }
}

function changeBg(node, color) {
  
  if (node && node.nodeCircle && node.nodeCircle.colorSettings) {
    node.nodeCircle.colorSettings = {
      ...node.nodeCircle.colorSettings,
      bgColor: color
    };

  }
}

async function updateTree(canvas, arr) {

  return new Promise((resolve) => {
    const root = drawtree(canvas, arr);
    setTimeout(() => {
      resolve(root);
    }, speed);
  });
}


async function highlightSwap(allDivs, i, j, color, canvas, root, arr) {
  updateTree(canvas, arr)

  if (!allDivs[i] || !allDivs[j]) return;

  const node1 = findNode(root, parseInt(allDivs[i].innerText));
  const node2 = findNode(root, parseInt(allDivs[j].innerText));

  // changeBorder(root , node1 , "black" , canvas , arr);
  // changeBorder(root , node2 , "black" , canvas , arr);
  // drawBinaryTree(root , canvas);

  allDivs[i].style.backgroundColor = color;
  allDivs[j].style.backgroundColor = color;

  return new Promise((resolve) => {
    setTimeout(() => {
      allDivs[i].style.backgroundColor = "white";
      allDivs[j].style.backgroundColor = "white";
      // changeBorder(root , node1 , "red" , canvas , arr);
      // changeBorder(root , node2 , "red" , canvas , arr);
      // drawBinaryTree(root , canvas);
      resolve();
    }, speed);
  });
}


async function divSwap(allDivs, i, j, root, canvas, arr) {

  const div1 = allDivs[i];
  const div2 = allDivs[j];
  if (!div1 || !div2) return;

  const div1Rect = div1.getBoundingClientRect();
  const div2Rect = div2.getBoundingClientRect();

  const xDiff = div2Rect.left - div1Rect.left;
  const yDiff = div2Rect.top - div1Rect.top;

  let node1 = findNode(root , arr[i]);
  let node2 = findNode(root , arr[j]);
  console.log(node1)

  // changeBg(node1 , "red");
  // changeBg(node2 , "red");
  // drawBinaryTree(root,canvas);

  await Promise.all([
    gsap.to(div1, { x: xDiff, y: yDiff }),
    gsap.to(div2, { x: -xDiff, y: -yDiff }),
    updateTree(canvas, arr),
  ]);

  // changeBg(node1 , "white");
  // changeBg(node2 , "white");
  // drawBinaryTree(root,canvas);

  [div1.innerText, div2.innerText] = [div2.innerText, div1.innerText];
  gsap.set([div1, div2], { clearProps: "all" });
}

async function heapify(arr, i, n, allDivs, canvas, root) {

  let largest = i;
  const left = 2 * i + 1;
  const right = left + 1;

  if (left < n) await highlightSwap(allDivs, i, left, "red", canvas, root, arr);
  if (left < n && arr[left] > arr[largest]) largest = left;

  if (right < n) await highlightSwap(allDivs, i, right, "red", canvas, root, arr);
  if (right < n && arr[right] > arr[largest]) largest = right;

  if (largest !== i) {
    swap(arr, i, largest);

    await divSwap(allDivs, i, largest, root, canvas, arr);
    root = await updateTree(canvas, arr)
    await heapify(arr, largest, n, allDivs, canvas, root);
  }
}

async function heapSort(allDivs, canvas, arr, root) {
  const n = arr.length;

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    await heapify(arr, i, n, allDivs, canvas, root);
  }

  for (let i = n - 1; i > 0; i--) {
    swap(arr, 0, i);
    await divSwap(allDivs, 0, i, root, canvas, arr);
    allDivs[i].style.opacity = "0.5";
    let newArr = [];
    for (let j = 0; j < i; j++) {
      newArr.push(arr[j]);
    }
    root = await updateTree(canvas, newArr);
    arr = newArr;
    await heapify(arr, 0, i, allDivs, canvas, root);
  }

  allDivs[0].style.opacity = "0.5";
  canvas.style.display = "none";
}

export const animation = (allDivs, canvas, arr, root) => {
  heapSort(allDivs, canvas, arr, root);
};

export const setmainSpeed = (sp) => {
  speed = sp;
};
