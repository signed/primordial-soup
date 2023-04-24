export const score = (dice: number[]) => {
  const count_by_dice = new Map<number, number>()
  const b = [1, 2, 3, 4, 5, 6]
  b.forEach((i) => {
    count_by_dice.set(i, dice.filter((v) => v === i).length)
  })

  let total = 0
  count_by_dice.forEach((count, die) => {
    if (count === 0) {
      return
    }
    if (count >= 3) {
      if (die === 1) {
        total += 1000
      } else {
        total += die * 100
      }
    }

    if (die == 5) {
      total += 50 * (count % 3)
    }
    if (die == 1) {
      total += 100 * (count % 3)
    }
  })
  return total
}
