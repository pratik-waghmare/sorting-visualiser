function mergeSortVisualiser(array) {
  const animation = [];
  if (array.length <= 1) return array;
  const auxilaryArray = array.slice();

  mergeSort(array, 0, array.length - 1, auxilaryArray, animation);

  return animation;
}

function mergeSort(array, startIdx, endIdx, auxilaryArray, animation) {
  if (startIdx === endIdx) return;

  const midIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSort(auxilaryArray, startIdx, midIdx, array, animation);
  mergeSort(auxilaryArray, midIdx + 1, endIdx, array, animation);
  domerge(array, startIdx, midIdx, endIdx, auxilaryArray, animation);
}

function domerge(array, startIdx, midIdx, endIdx, auxilaryArray, animation) {
  let k = startIdx;
  let i = startIdx;
  let j = midIdx + 1;

  while (i <= midIdx && j <= endIdx) {
    animation.push([i, j]);
    animation.push([i, j]);

    if (auxilaryArray[i] <= auxilaryArray[j]) {
      animation.push([k, auxilaryArray[i]]);
      array[k++] = auxilaryArray[i++];
    } else {
      animation.push([k, auxilaryArray[j]]);
      array[k++] = auxilaryArray[j++];
    }
  }

  while (i <= midIdx) {
    animation.push([i, i]);
    animation.push([i, i]);
    animation.push([k, auxilaryArray[i]]);
    array[k++] = auxilaryArray[i++];
  }

  while (j <= endIdx) {
    animation.push([j, j]);
    animation.push([j, j]);
    animation.push([k, auxilaryArray[j]]);
    array[k++] = auxilaryArray[j++];
  }
}

export default mergeSortVisualiser;
