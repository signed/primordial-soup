import { expect, test } from 'vitest'
import { Library } from './library.js'

test('add donated titles to the library with one default copy', () => {
  const library = new Library()
  const titleName = 'Jaws 3D'
  const donorId = 'Jason123'
  library.donate(titleName, donorId)
  const donatedTitle = library.getTitles().get(titleName)
  expect(donatedTitle?.[0]).toBe(titleName)
  expect(donatedTitle?.[1]).toBe(donorId)
  expect(donatedTitle?.[2]).toBe(1)
  expect(library.getTitlesDonatedByMember(donorId).length).toBe(1)
})
