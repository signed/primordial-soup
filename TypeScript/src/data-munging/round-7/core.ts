import { readFileSync } from 'node:fs'

type DataWithPivot = { pivot: number }

export function minimumIn<T extends DataWithPivot>(values: () => T[], sentinel: T) {
  return values().reduce((acc, cur) => {
    return cur.pivot < acc?.pivot ? cur : acc
  }, sentinel)
}

export const extractDataLines = (fileContent: string, lineFilter: any) =>
  fileContent
    .split('\n')
    .filter((_line, lineNumber) => lineNumber !== 0)
    .filter((line) => line.trim() !== '')
    .filter(lineFilter)

export function valueExtractorFor<T extends DataWithPivot>(
  pathToData: string,
  lineFilter: (line: string, _index: number) => boolean,
  lineToValue: (line: string) => T,
) {
  return () => {
    return extractDataLines(readFileSync(pathToData).toString(), lineFilter).map(lineToValue)
  }
}
