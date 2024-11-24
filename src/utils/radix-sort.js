export default class RadixSort {
  #bucketList;
  #radixStack;
  getBiggerNumber(array) {
    const length = array.length;
    let max = array[0];
    for (let i = 0; i < length; i++) {
      max = array[i] > max ? array[i] : max;
    }

    return max;
  }

  getMaxLength(number) {
    number = String(number);
    const size = number.length;
    return size;
  }

  generateBucketList() {
    this.#bucketList = Array.from({ length: 10 }, () => {
      return [];
    });
  }

  radixSorting(array) {
    const bigger = this.getBiggerNumber(array);
    const length = this.getMaxLength(bigger);
    this.generateBucketList();
    for (let size = 0; size < length; size++) {
      let unit = Math.pow(10, size);
      array.forEach((element) => {
        let algarism = Math.floor(element / unit) % 10;
        this.#bucketList[algarism].push(element);
      });
      this.#radixStack = [];
      for (let index = 9; index >= 0; index--) {
        while (this.#bucketList[index].length) {
          this.#radixStack.unshift(this.#bucketList[index].pop());
        }
      }
      array = this.#radixStack;
    }
    return array;
  }
}

const sorter = new RadixSort();

// Seção para testar o que tá rolando
/*const array = [170, 45, 75, 90, 802, 24, 2, 66];
console.log("Array antes de fazer a ordenação:", array);
console.log("Array após a ordenação:", sorter.radixSorting(array));*/
