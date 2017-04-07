import { Observable } from 'rxjs/Observable'

import 'rxjs/add/operator/do'

export function debug<T>(
  this: Observable<T>,
  nextMsg?: string,
  errorMsg?: string,
  completeMsg?: string
): Observable<T> {
  return this.do(
    (v) => console.log.apply(console, nextMsg ? [nextMsg, v] : [v]),
    (e) => console.error.apply(console, (errorMsg || nextMsg) ? [errorMsg || nextMsg, e] : [e]),
    () => console.info(completeMsg || nextMsg || 'complete')
  )
}

declare module 'rxjs/Observable' {
  interface Observable<T> {
    debug: typeof debug
  }
}

Observable.prototype.debug = debug
