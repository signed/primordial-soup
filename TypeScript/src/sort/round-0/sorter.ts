export type SortKind = 'bubble' | 'quick' | 'insertion'

export class Sorter {
  public sort(kind: SortKind, input: number[]): number[] {
    switch (kind) {
      case 'bubble':
        let sorted = false
        while (!sorted) {
          sorted = true
          for (let i = 0; i < input.length - 1; i++) {
            if (input[i] > input[i + 1]) {
              this.swap(input, i, i + 1)
              sorted = false
            }
          }
        }
      case 'quick':
        input = this.quicksort(input, 0, input.length - 1)
      case 'insertion':
        for (let i = 0; i < input.length - 1; i++) {
          for (let j = i + 1; j > 0; j--) {
            if (input[j] < input[j - 1]) {
              this.swap(input, j, j - 1)
            }
          }
        }
    }
    return input
  }

  private swap(input: number[], index1: number, index2: number) {
    const first = input[index1]
    const second = input[index2]
    input[index1] = second
    input[index2] = first
  }

  private quicksort(input: number[], left: number, right: number): number[] {
    let i = left,
      j = right
    const pivot = input[Math.floor((left + right) / 2)]
    let k = i
    while (k <= j) {
      while (input[k] < pivot) k++
      while (input[j] > pivot) j--
      if (k <= j) {
        this.swap(input, k, j)
        k++
        j--
      }
    }

    i = k
    const index = i
    if (left < index - 1) {
      this.quicksort(input, left, index - 1)
    }
    if (index < right) {
      this.quicksort(input, index, right)
    }
    return input
  }
}
