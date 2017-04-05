import { Observable } from 'rxjs/Observable'

import 'rxjs/add/operator/do'

export function debug<T>(this: Observable<T>,
												 nextMsg: string = '',
												 errorMsg?: string,
												 completeMsg?: string): Observable<T> {

		return this.do(
			console.log.bind(console, nextMsg),
			console.error.bind(console, errorMsg || nextMsg),
			console.info.bind(console, completeMsg || nextMsg)
		)
	}

declare module 'rxjs/Observable' {
  interface Observable<T> {
    debug: typeof debug;
  }
}

Observable.prototype.debug = debug
