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

    let currentNode = this.root;
    let parentNode;

    // find the node with the value you want to delete
    while(currentNode !== null) {
      /*console.log('checking if currentNode data is the one we need');*/
      if (currentNode.data === value) {
        console.log('found the node to delete');
        console.log(currentNode.data);
        // CASE 1: deleting currentNode that is a leaf node
        if (currentNode.left === null && currentNode.right === null) {
          if (currentNode.data < parentNode.data) {
            parentNode.left = null;
            break;
          } else {
            parentNode.right = null;
            break;
          }
        }

        // CASE 2: deleting a root node
        if (currentNode === this.root) {
          let smallestNode = currentNode.right;
          let parentOfSmallestNode = currentNode;

          while (smallestNode.left !== null) {
            parentOfSmallestNode = smallestNode;
            smallestNode = smallestNode.left;
          }
          // Subcase 1: smallestNode is a leaf node
          if (smallestNode.left === null && smallestNode.right === null) {
            smallestNode.left = currentNode.left;
            smallestNode.right = currentNode.right;
            parentOfSmallestNode.left = null;
            currentNode.left = null;
            currentNode.right = null;
            this.root = smallestNode;
            break;
          }
          // Subcase 2: smallestNode is not a leaf node
          else {
            smallestNode.left = currentNode.left;
            currentNode.left = null;
            currentNode.right = null;
            this.root = smallestNode;
            break;
          }
        }

        // CASE 3: deleting currentNode that has one child
        // Subcase 1: currentNode does not have a left child
        else if (currentNode.left === null) {
          if (currentNode.data < parentNode.data) {
            parentNode.left = currentNode.right;
          } else {
            parentNode.right = currentNode.right;
          }
          break;
        // Subcase 2: node does not have a right child
        } else if (currentNode.right === null) {
          if (currentNode.data < parentNode.data) {
            parentNode.left = currentNode.left;
          } else {
            parentNode.right = currentNode.left;
          }
          break;
        }

        // CASE 4: deleting currentNode that has left and right children and isn't the root
        else {
          console.log('currentNode has left and right children and is not a root');
          let smallestNode = currentNode.right;
          let parentOfSmallestNode = currentNode;

          while (smallestNode.left !== null) {
            parentOfSmallestNode = smallestNode;
            smallestNode = smallestNode.left;
          }
          // Subcase 1: smallestNode is a leaf node
          if (smallestNode.left === null && smallestNode.right === null) {
            console.log('smallest node is a leaf node');
            console.log(smallestNode.data);
            smallestNode.left = currentNode.left;
            if (smallestNode !== currentNode.right) {
              smallestNode.right = currentNode.right;
            } else {
              smallestNode.right = null;
            }
            parentOfSmallestNode.left = null;
            currentNode.left = null;
            currentNode.right = null;
            if (smallestNode.data < parentNode.data) {
              parentNode.left = smallestNode;
            } else {
              parentNode.right = smallestNode;
            }
            break;
          }
          // Subcase 2: smallestNode is not a leaf node
          else {
            smallestNode.left = currentNode.left;
            currentNode.left = null;
            currentNode.right = null;
            if (smallestNode.data < parentNode.data) {
              parentNode.left = smallestNode;
            } else {
              parentNode.right = smallestNode;
            }
            break;
          }
        }

      } else {
        if (value < currentNode.data) {
          parentNode = currentNode;
          currentNode = currentNode.left;
        } else {
          parentNode = currentNode;
          currentNode = currentNode.right;
        }
      }
    }
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