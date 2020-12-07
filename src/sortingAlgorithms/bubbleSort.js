function bubbleSortVisualiser(array) {
  return bubbleSort(array);
}

function bubbleSort(array) {
  const animation = [];

  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      animation.push([j, j + 1]);
      animation.push([j, j + 1]);
      if (array[j] > array[j + 1]) {
        animation.push([j + 1, array[j]]);
        animation.push([j, array[j + 1]]);
        let temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
      } else {
        animation.push([j, array[j]]);
        animation.push([j + 1, array[j + 1]]);
      }
    }
  }

  return animation;
}

export default bubbleSortVisualiser;
