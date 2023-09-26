export function levelOrder(root, func) {
  if (root === null) {
    return null;
  }

  if (func !== undefined) {
    let queue = [];
    queue.push(root);
    
    while (queue.length > 0) {
      const node = queue[0];
      if (node.left !== null) {
        queue.push(node.left);
      }
      if (node.right !== null) {
        queue.push(node.right);
      }
      func(queue.shift());
    }
  } else {
    let queue = [];
    let finalOrder = [];
    queue.push(root);
    
    while (queue.length !== 0) {
      const node = queue[0];
      if (node.left !== null) {
        queue.push(node.left);
      }
      if (node.right !== null) {
        queue.push(node.right);
      }
      finalOrder.push(queue.shift());
    }
    return finalOrder;
  }
}

export function inOrder(node, func) {
  if (node === null) {
    if (func === undefined) {
      return [];
    } else {
      return null;
    }
  }

  if (func !== undefined) {
    inOrder(node.left, func);
    func(node);
    inOrder(node.right, func);
  } else {
    let array = [];
    let tmp;
    tmp = inOrder(node.left);
    array = array.concat(tmp);
    array = array.concat(node);
    tmp = inOrder(node.right);
    array = array.concat(tmp);
    return array;
  }
}

export function preOrder(node, func) {
  if (node === null) {
    if (func === undefined) {
      return [];
    } else {
      return null;
    }
  }

  if (func !== undefined) {
    func(node);
    preOrder(node.left, func);
    preOrder(node.right, func);
  } else {
    let array = [node];
    array = array.concat(preOrder(node.left));
    array = array.concat(preOrder(node.right));
    return array;
  }
}

export function postOrder(node, func) {
  if (node === null) {
    if (func === undefined) {
      return [];
    } else {
      return null;
    }
  }

  if (func !== undefined) {
    postOrder(node.left, func);
    postOrder(node.right, func);
    func(node);
  } else {
    let array = [];
    let tmp;
    tmp = postOrder(node.left);
    array = array.concat(tmp);
    tmp = postOrder(node.right);
    array = array.concat(tmp);
    array = array.concat(node);
    return array;
  }
}