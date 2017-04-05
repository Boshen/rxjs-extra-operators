import { Observable } from 'rxjs/Observable'
import * as chai from 'chai'
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'
import { expect } from 'chai'
import { SinonStub } from 'sinon'

import 'rxjs/add/observable/of'
import 'rxjs/add/observable/throw'

import '../src'

chai.use(sinonChai)

describe('Observable.prototype.debug', () => {

  let logNext: SinonStub
  let logError: SinonStub
  let logComplete: SinonStub

  beforeEach(() => {
		logNext = sinon.stub(console, 'log')
		logError = sinon.stub(console, 'error')
		logComplete = sinon.stub(console, 'info')
  })

  afterEach(() => {
		logNext.restore()
		logError.restore()
		logComplete.restore()
  })

  it('should log next value', () => {
    Observable.of(42).debug('debug').subscribe()
    expect(logNext).to.be.calledWithExactly('debug', 42)
    expect(logComplete).to.be.calledWithExactly('debug')
  })

  it('should log error value', () => {
    Observable.throw(42).debug('error').subscribe(null, () => {})
    expect(logError).to.be.calledWithExactly('error', 42)
  })

  it('should log next and complete separately', () => {
    Observable.of(42).debug('next', 'error', 'complete').subscribe()
    expect(logNext).to.be.calledWithExactly('next', 42)
    expect(logComplete).to.be.calledWithExactly('complete')
  })

  it('should log error message from the second argument', () => {
    Observable.throw(42).debug('next', 'error').subscribe(null, () => {})
    expect(logError).to.be.calledWithExactly('error', 42)
  })

  it('should log next and complete without message', () => {
    Observable.of(42).debug().subscribe()
    expect(logNext).to.be.calledWithExactly(42)
    expect(logComplete).to.be.calledWithExactly('complete')
  })

  it('should log error without message', () => {
    Observable.throw(42).debug().subscribe(null, () => {})
    expect(logError).to.be.calledWithExactly(42)
  })

})
