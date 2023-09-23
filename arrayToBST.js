import { Node } from "./Node.js"

export function arrayToBST(array) {
  let root;
  if (array.length > 1) {
    const midPoint = Math.floor(array.length/2);
    const leftHalf = array.slice(0, midPoint);
    const rightHalf = array.slice(midPoint + 1);

    root = new Node(array[midPoint]);
    root.left = arrayToBST(leftHalf);
    root.right = arrayToBST(rightHalf);
  }
  else if (array.length === 1) {
    root = new Node(array[0], null, null);
  } else {
    return null;
  }
  return root;
}