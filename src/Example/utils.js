/**

Remove this file if you already have it globally in your app and don't need it.

**/

const call = (state, query) => val => {
  if (state !== query) {
    return null
  }
  return typeof val === 'function' ? val() : val
}


const AsyncFn = (state = 'idle') => {
  return {
    whenIdle: call(state, 'idle'),
    whenPending: call(state, 'pending'),

    toPending: () => new AsyncFn('pending')
  }
}

export {AsyncFn}
