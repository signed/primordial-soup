import { tmpdir } from 'node:os'
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { sep, resolve } from 'node:path'
import { randomUUID } from 'node:crypto'
import { afterEach } from 'vitest'

const tmpDir = tmpdir()

interface TemporaryFolder {
  writeFileWith(content: string): string
}

export const setupTemporaryFolder = (): TemporaryFolder => {
  let temporaryRoot: string | undefined

  afterEach(() => {
    if (temporaryRoot) {
      rmSync(temporaryRoot, { recursive: true })
      temporaryRoot = undefined
    }
  })

  return new (class implements TemporaryFolder {
    writeFileWith(content: string): string {
      if (temporaryRoot === undefined) {
        temporaryRoot = mkdtempSync(`${tmpDir}${sep}`)
      }
      const tmpFile = resolve(temporaryRoot, randomUUID())
      writeFileSync(tmpFile, content)
      return tmpFile
    }
  })()
}
