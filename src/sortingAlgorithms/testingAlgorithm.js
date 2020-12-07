function arraysAreEqual(arr, array) {
  if (arr.length !== array.length) return false;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== array[i]) return false;
  }
  return true;
}

export default arraysAreEqual;
