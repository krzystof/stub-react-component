import {AsyncFn} from './utils'

test('is idle by default', () => {
  const asyncFn = new AsyncFn()
  expect(asyncFn.whenIdle(true)).toBe(true)
})

test('whenIdle with a callback', () => {
  const asyncFn = new AsyncFn()
  expect(asyncFn.whenIdle(() => 'something')).toBe('something')
})

test('can be pending', () => {
  const asyncFn = new AsyncFn().toPending()
  expect(asyncFn.whenPending(true)).toBe(true)
  expect(asyncFn.whenIdle(true)).toBe(null)
})

test('can be ok', () => {
  const asyncFn = new AsyncFn().toOk({stub: 'data'})
  expect(asyncFn.whenOk(({stub}) => stub)).toBe('data')
})

test('can be ok with a string', () => {
  const asyncFn = new AsyncFn().toOk('fine')
  expect(asyncFn.whenOk((stub) => stub)).toBe('fine')
})

test('can be failure', () => {
  const asyncFn = new AsyncFn().toFailure({message: 'Something went wrong'})
  expect(asyncFn.whenFailure(({message}) => message)).toBe('Something went wrong')
})
