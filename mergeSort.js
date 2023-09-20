export function mergeSort(array) {
    let sortedLeft;
    let sortedRight;
    if (array.length > 1) {
        const half = Math.floor(array.length/2);
        const leftHalfArray = array.slice(0, half);
        const rightHalfArray = array.slice(half);
        
        sortedLeft = mergeSort(leftHalfArray);
        sortedRight = mergeSort(rightHalfArray);
    }
    else {
        return array;
    }
    
    let s = 0;
    let totalLength = sortedLeft.length + sortedRight.length;
    let sortedArray = [];

    while (s < totalLength) {
        if (sortedLeft.length === 0) {
            sortedArray = sortedArray.concat(sortedRight);
            break;
        }
        else if (sortedRight.length === 0) {
            sortedArray = sortedArray.concat(sortedLeft);
            break;
        }
        else {
            if (sortedLeft[0] < sortedRight[0]) {
                sortedArray.push(sortedLeft.shift());
                s++;

            }
            else if (sortedLeft[0] > sortedRight[0]) {
                sortedArray.push(sortedRight.shift());
                s++;
            }
            else {
              sortedRight.shift();
              s++;
            }
        }
    }

    return sortedArray;
}