function insertionSortVisualiser(array) {
  return insertionSort(array);
}

function insertionSort(array) {
  const animations = [];

  for (let i = 0; i < array.length; i++) {
    let key = array[i];
    let j = i - 1;

    while (j >= 0 && array[j] > key) {
      animations.push([j, j + 1]);
      animations.push([j, j + 1]);
      animations.push([j + 1, array[j]]);
      array[j + 1] = array[j];
      j--;
    }
    animations.push([i, j + 1]);
    animations.push([i, j + 1]);
    animations.push([j + 1, key]);
    array[j + 1] = key;
  }

  return animations;
}

export default insertionSortVisualiser;
