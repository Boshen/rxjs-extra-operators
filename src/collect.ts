import { Observable } from 'rxjs/Observable'

import 'rxjs/add/operator/reduce'

function collect<T>(
  this: Observable<T>,
  seedFactory: () => T[],
  accumulator: (acc: T[], value: T, index: number) => T[]
): Observable<T[]> {
  return this.reduce(
    (acc = seedFactory(), value: T, index: number) => {
      return accumulator(acc, value, index)
    },
    undefined
  )
}

declare module 'rxjs/Observable' {
  interface Observable<T> {
    collect: typeof collect
  }
}

Observable.prototype.collect = collect
