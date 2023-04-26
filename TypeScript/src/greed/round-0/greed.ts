// Greed is a dice game where you roll up to five dice to accumulate
// points.  The following "score" function will be used to calculate the
// score of a single roll of the dice.
//
// A greed roll is scored as follows:
//
// * A set of three ones is 1000 points
//
// * A set of three numbers (other than ones) is worth 100 times the
//   number. (e.g. three fives is 500 points).
//
// * A one (that is not part of a set of three) is worth 100 points.
//
// * A five (that is not part of a set of three) is worth 50 points.
//
// * Everything else is worth 0 points.
//
//
// Examples:
//
// score([1,1,1,5,1]) => 1150 points
// score([2,3,4,6,2]) => 0 points
// score([3,4,5,3,3]) => 350 points
// score([1,5,1,2,4]) => 250 points
//
// More scoring examples are given in the tests below:
//
// Your goal is to write the score method.
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
