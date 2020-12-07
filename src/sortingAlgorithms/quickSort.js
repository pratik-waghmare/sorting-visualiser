function quickSortAnimation(array) {
  const animations = [];
  quickSortHelper(array, 0, array.length - 1, animations);
  // const arr = array.slice();
  return animations;
}

function quickSortHelper(array, startIdx, endIdx, animations) {
  if (startIdx >= endIdx) return;
  const idx = partition(array, startIdx, endIdx, animations);

  quickSortHelper(array, startIdx, idx - 1, animations);
  quickSortHelper(array, idx + 1, endIdx, animations);
}

function partition(array, low, high, animations) {
  let pivot = array[high];
  let i = low - 1;

  for (let j = low; j < high; j++) {
    if (array[j] < pivot) {
      i++;

      animations.push([i, j]);
      animations.push([i, j]);

      animations.push([i, array[j]]);
      animations.push([j, array[i]]);

      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }
  i++;

  animations.push([i, high]);
  animations.push([i, high]);

  animations.push([i, array[high]]);
  animations.push([high, array[i]]);

  let temp = array[i];
  array[i] = array[high];
  array[high] = temp;

  return i;
}

export default quickSortAnimation;
