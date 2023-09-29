import { mergeSort } from "./mergeSort.js";
import { arrayToBST } from "./arrayToBST.js";
import { preOrder } from "./breadthFirstSearch.js";
import { Node } from "./Node.js";

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

  insert(value) {
    let newArray = this.array;
    newArray.push(value);
    
    let tmp = this.root;
    
    while(tmp !== null) {
      if (value <= tmp.data) { 
        if (tmp.left !== null) {
          tmp = tmp.left;
        } else {
          let node = new Node(value, null, null);
          tmp.left = node;
          break;
        }
      } else {
        if (tmp.right !== null) {
          tmp = tmp.right;
        } else {
          let node = new Node(value, null, null);
          tmp.right = node;
          break;
        }
      }
    }
  }

  delete(value) {
    const index = this.array.indexOf(value);
    
    if (index > -1) {
      this.array.splice(index, 1);
    } else {
      return 'Value not found!';
    }

    this.root = this.buildTree(this.array);
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

  depth(node) {
    let currentNode = this.root;
    let depth = 0;

    while(node !== currentNode.data) {
      if (node > currentNode.data) {
        currentNode = currentNode.right;
      } else {
        currentNode = currentNode.left;
      }

      if (currentNode === null) {
        return 'Node not found in tree!';
      }
      depth++;
    }

    return depth;
  }

  isBalanced() {
    const leftSubTree = this.height(this.root.left) + 1;
    const rightSubTree = this.height(this.root.right) + 1;
    const difference = Math.abs(leftSubTree - rightSubTree);

    if (difference >= 0 && difference <= 1) {
      return true;
    } else {
      return false;
    }
  }

  reBalance(array) {
    return this.buildTree(array);
  }
}