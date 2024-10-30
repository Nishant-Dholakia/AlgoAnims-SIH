import { drawBinaryTree , setTheme , VisualizationType } from "binary-tree-visualizer";

setTheme({
    radius : 20,
    lineHeight : 130,
    leafNodeSpace : 130,
  })

function changer(rootNode , node, color, canvas) {
    if (node.nodeCircle && node.nodeCircle.colorSettings) {
        node.nodeCircle.colorSettings = {
            ...node.nodeCircle.colorSettings,
            borderColor: color
        };
        setTheme({
            fontSize : 24,
        })
        drawBinaryTree(rootNode , canvas,{
            type : VisualizationType.PRETTY
        });
    }
}

async function border(rootNode, canvas, node, convertColor, defaultColor, speed) {
    // const root = new BinarySearchTreeNode(5);
    changer(rootNode , node, convertColor , canvas);

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            changer(rootNode , node, defaultColor , canvas);
            resolve(100);
        }, speed);
    })
}





export async function search(canvas, node, rootNode, speed, defaultColor, convertColor) {
    let prev = null;
    let temp = rootNode;
    node = parseInt(node);

    while (temp) {

        await border(rootNode, canvas, temp, convertColor, defaultColor, speed);

        if(temp.value == node) return prev;
        prev = temp;


        if (parseInt(temp.value) > node) {
            if (temp.left) temp = temp.left;
            else {
                break;
            }
        } else {
            if (temp.right) temp = temp.right;
            else {
                break;
            }
        }
    }

    return prev;
}
