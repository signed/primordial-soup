import { readFileSync } from 'node:fs'
import { expect, test } from 'vitest'
import { setupTemporaryFolder } from './temporary-folder.js'

const folder = setupTemporaryFolder()

test('temporary file', () => {
  const path = folder.writeFileWith('the content')
  expect(readFileSync(path).toString()).toEqual('the content')
})
