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
