import _random from 'lodash/random'
import _range from 'lodash/range'

type FuzzingRunProps = {
  funcs: (() => Promise<any>)[]
}
export const fuzzingRun = async ({ funcs }: FuzzingRunProps) => {
  const runs = _range(funcs.length).map(() => !!_random(0, 1))

  const result = []

  for (const [index, func] of funcs.entries()) {
    const shouldRun = runs[index]
    if (shouldRun) {
      result.push(await func())
    }
  }

  return result
}
