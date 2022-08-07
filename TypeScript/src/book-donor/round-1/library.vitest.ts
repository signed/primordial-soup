import { expect, test } from 'vitest'
import { Library, Title } from './library.js'

test('add donated titles to the library with one default copy', () => {
  const library = new Library()
  const titleName = 'Jaws 3D'
  const donorId = 'Jason123'
  const donor = { id: donorId }
  let donatedTitle = new Title(titleName, donor)
  library.donate(donatedTitle)
  donatedTitle = ensure(library.getTitles().get(titleName))
  expect(donatedTitle.getName()).toBe(titleName)
  expect(donatedTitle.getDonorId()).toBe(donorId)
  expect(donatedTitle.getCopyCount()).toBe(1)
  expect(library.getTitlesDonatedByMember(donorId).length).toBe(1)
})

const ensure = (maybe?: Title) => {
  if (maybe === undefined) {
    throw 'nope'
  }
  return maybe
}
