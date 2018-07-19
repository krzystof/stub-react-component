/**

Remove this file if you already have it globally in your app and don't need it.

**/

const maybeCall = (state, query, data) => val => {
  if (state !== query) {
    return null
  }
  return typeof val === 'function' ? val(data) : val
}

const buildAsyncFn = (callable, state = 'idle', data = null) => {
  const fn = {
    toIdle: () => buildAsyncFn(callable, 'idle'),
    toPending: () => buildAsyncFn(callable, 'pending'),
    toOk: (newData) => buildAsyncFn(callable, 'ok', typeof newData === 'object' ? {...newData} : newData),
    toFailure: (newData) => buildAsyncFn(callable, 'failure', typeof newData === 'object' ? {...newData} : newData),
  }

  return {
    whenIdle: maybeCall(state, 'idle'),
    whenPending: maybeCall(state, 'pending'),
    whenOk: maybeCall(state, 'ok', data),
    whenFailure: maybeCall(state, 'failure', data),

    execute: () => {
      return callable()
        .then(result => fn.toOk(result))
        .catch(error => fn.toFailure(error))
    }
  }
}

const AsyncFn = (callable) => {
  return buildAsyncFn(callable)
}

export {AsyncFn}
