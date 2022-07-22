export type Sort = (input: number[]) => number[]

export class Sorter {
  public sort(sorter: Sort, input: number[]) {
    return sorter(input)
  }
}

export const swap = (input: number[], index1: number, index2: number) => {
  const first = input[index1]
  const second = input[index2]
  input[index1] = second
  input[index2] = first
}
