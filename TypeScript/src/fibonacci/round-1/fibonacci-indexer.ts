const initialSequence = () => {
  return [0, 1]
}

export class FibonacciIndexer {
  findIndexOf(fibonacci: number) {
    if (fibonacci >= 0 && fibonacci < 2) {
      return fibonacci
    }
    return this.seek(fibonacci)
  }

  private seek(fibonacci: number) {
    let indexOfFibonacci = -1
    let currentIndex = 2
    let f = 0
    const sequence = initialSequence()
    while (f < fibonacci) {
      f = sequence[currentIndex - 1] + sequence[currentIndex - 2]
      if (f == fibonacci) indexOfFibonacci = currentIndex
      sequence.push(f)
      currentIndex++
    }

    return indexOfFibonacci
  }
}
