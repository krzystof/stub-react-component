import {AsyncFn} from './utils'

test('is idle by default', () => {
  const asyncFn = new AsyncFn(() => null)
  expect(asyncFn.whenIdle(true)).toBe(true)
})

test('whenIdle with a callback', () => {
  const asyncFn = new AsyncFn(() => Promise.resolve())
  expect(asyncFn.whenIdle(() => 'something')).toBe('something')
})

test('can be pending', () => {
  const asyncFn = new AsyncFn().toPending()
  expect(asyncFn.whenPending(true)).toBe(true)
  expect(asyncFn.whenIdle(true)).toBe(null)
})

test('can be ok', async () => {
  const asyncFn = await new AsyncFn(() => Promise.resolve({stub: 'data'})).execute()
  expect(asyncFn.whenOk(({stub}) => stub)).toBe('data')
})

test('can be ok with a string', async () => {
  const asyncFn = await new AsyncFn(() => Promise.resolve('fine')).execute()
  expect(asyncFn.whenOk((stub) => stub)).toBe('fine')
})

test('can be failure', async () => {
  const asyncFn = await new AsyncFn(() => Promise.reject({message: 'Something went wrong'})).execute()
  expect(asyncFn.whenFailure(({message}) => message)).toBe('Something went wrong')
})
