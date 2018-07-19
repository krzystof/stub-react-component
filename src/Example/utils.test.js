import {AsyncFn} from './utils'

test('is idle by default', () => {
  const asyncFn = new AsyncFn()
  expect(asyncFn.whenIdle(true)).toBe(true)
})

test('whenIdle with a callback', () => {
  const asyncFn = new AsyncFn()
  expect(asyncFn.whenIdle(() => 'something')).toBe('something')
})

test('return true when the state is valid', () => {
  const asyncFn = new AsyncFn()
  expect(asyncFn.whenIdle()).toBe(true)
})

test('can be pending', () => {
  const asyncFn = new AsyncFn().toPending()
  expect(asyncFn.whenPending(true)).toBe(true)
  expect(asyncFn.whenIdle(true)).toBe(null)
})

test('can be pending with the given argument', () => {
  const asyncFn = new AsyncFn().toPending('see me?')
  expect(asyncFn.whenPending(arg => arg)).toBe('see me?')
})

test('can be ok', () => {
  const asyncFn = new AsyncFn().toOk({stub: 'data'})
  expect(asyncFn.whenOk(({stub}) => stub)).toBe('data')
})

test('can be ok with an array', () => {
  const asyncFn = new AsyncFn().toOk(['one', 'two', 'three'])
  expect(asyncFn.whenOk(stub => stub)).toEqual(['one', 'two', 'three'])
})

test('can be ok with a string', () => {
  const asyncFn = new AsyncFn().toOk('fine')
  expect(asyncFn.whenOk((stub) => stub)).toBe('fine')
})

test('can be failure', () => {
  const asyncFn = new AsyncFn().toFailure({message: 'Something went wrong'})
  expect(asyncFn.whenFailure(({message}) => message)).toBe('Something went wrong')
})
