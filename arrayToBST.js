import { Node } from "./Node.js"

export function arrayToBST(array) {
  if (array.length > 1) {
    const midPoint = Math.floor(array.length/2);
    const leftHalf = array.slice(0, midPoint);
    const rightHalf = array.slice(midPoint + 1);

    const root = Node(array[midPoint]);
    root.left = arrayToBST(leftHalf);
    root.right = arrayToBST(rightHalf);
  }
  else {
    const root = Node(array[0], null, null);
  }
  return root;
}