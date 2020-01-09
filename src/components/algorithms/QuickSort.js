const QuickSort = (array, animations = []) => {

  const partition = (array, begin, end) => {
    let pivot = begin;
    for (let i = begin; i <= end; i++) {
      if (array[i] < array[begin]) {
        pivot++;
        [array[pivot], array[i]] = [array[i], array[pivot]];
      }
    }
    [array[begin], array[pivot]] = [array[pivot], array[begin]];
    return pivot;
  }

  const sort = (array, begin, end) => {
    if (begin < end) {
      const pivot = partition(array, begin, end);
      sort(array, begin, pivot - 1);
      sort(array, pivot + 1, end);
    }
  }

  return sort(array, 0, array.length);
}

export default QuickSort