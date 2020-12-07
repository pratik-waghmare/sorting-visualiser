function selectionSortVisualiser(array) {
  return selectionSort(array);
}

function selectionSort(array) {
  const animations = [];

  for (let i = 0; i < array.length - 1; i++) {
    let idx = i;
    for (let j = i + 1; j < array.length; j++) {
      animations.push([i, j]);
      animations.push([i, j]);
      if (array[j] < array[idx]) {
        animations.push([j, array[j]]);
        animations.push([idx, array[idx]]);
        idx = j;
      } else {
        animations.push([j, array[j]]);
        animations.push([idx, array[idx]]);
      }
    }

    animations.push([i, idx]);
    animations.push([i, idx]);

    animations.push([i, array[idx]]);
    animations.push([idx, array[i]]);
    let temp = array[i];
    array[i] = array[idx];
    array[idx] = temp;
  }

  return animations;
}

export default selectionSortVisualiser;
