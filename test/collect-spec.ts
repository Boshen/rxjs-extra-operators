import { Observable } from 'rxjs/Observable'
import * as chai from 'chai'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import { expect } from 'chai'

import 'rxjs/add/observable/of'
import 'rxjs/add/operator/share'

import '../src'

chai.use(sinonChai)

describe('Observable.prototype.collect', () => {

  it('should collect', () => {
    let result: number[]
    Observable.of(1, 2, 3)
      .collect(() => [], (arr: number[], item: number) => {
        arr.push(item)
        return arr
      })
      .subscribe((arr: number[]) => {
        result = arr
      })
    expect(result).to.eql([1, 2, 3])
  })

  it('should collect multiple times with seed factory and it does not duplicate', () => {
    let result1: number[]
    let result2: number[]
    const stream = Observable.of(1, 2, 3)
      .collect(() => [], (arr: number[], item: number) => {
        arr.push(item)
        return arr
      })
    stream.subscribe((arr: number[]) => {
      result1 = arr
    })
    stream.subscribe((arr: number[]) => {
      result2 = arr
    })
    expect(result1).to.eql([1, 2, 3])
    expect(result2).to.eql([1, 2, 3])
  })

})
