import { mergeSort } from "./mergeSort.js";
import { arrayToBST } from "./arrayToBST.js";
import { preOrder } from "./breadthFirstSearch.js";

export class Tree {
  constructor(array) {
    this.array = array;
    this.root = this.buildTree(array);
  }

  get root() {
    return this._root;
  }

  set root(value) {
    this._root = value;
  }

  get array() {
    return this._array;
  }

  set array(value) {
    this._array = value;
  }

  buildTree(array) {
    const sortedArray = mergeSort(array);
    const root = arrayToBST(sortedArray);

    return root;
  }

  find(value) {
    const array = preOrder(this.root);
    for (let i = 0; i < array.length; i += 1) {
      if (value === array[i].data) {
        return array[i];
      }
    }
    return 'Value not found!';
  }

  height(node) {
    if (node === null) {
      return -1;
    }
    
    let heightLeft;
    let heightRight;
    heightLeft = 1 + this.height(node.left);
    heightRight = 1 + this.height(node.right);

    if (heightLeft >= heightRight) {
      return heightLeft;
    } else {
      return heightRight;
    }
  }
}