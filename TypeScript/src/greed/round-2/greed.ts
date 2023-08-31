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
export const score = (dice: number[]) =>
  unique(dice).reduce((total, die) => {
    const count = dice.filter((v) => v === die).length
    const scoreForAllTriples = scoreForSetOfThree(die) * Math.trunc(count / 3)
    const scoreForAllSingles = scoreForSingle(die) * (count % 3)
    return total + scoreForAllTriples + scoreForAllSingles
  }, 0)

const unique = (items: number[]) => [...new Set(items)]

const scoreForSingle = orElse(
  {
    1: 100,
    5: 50,
  },
  () => 0,
)

const scoreForSetOfThree = orElse(
  {
    1: 1000,
  },
  (die) => die * 100,
)

function orElse(values: any, fallback: (key: number) => number) {
  return (key: number) => {
    const mapping = values[key]
    if (typeof mapping === 'number') {
      return mapping
    }
    return fallback(key)
  }
}
