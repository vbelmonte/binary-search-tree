import { mergeSort } from "./mergeSort.js";
import { arrayToBST } from "./arrayToBST.js";

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
}