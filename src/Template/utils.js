/**

AsyncFn is a small object that model the lifecycle of an
Promise.

Instead of relying on checking strings and booleans to
render the result of a Promise, this object allow you to
use a more declarative API.

A couple examples:

```jsx
let asyncFn = new AsyncFn()

// Use it once to check for a state
<button disabled={asyncFn.whenPending()}>Don't click me</button>

// transition to another state
asyncFn = asyncFn.toPending('some query params')

asyncFn.whenPending(query => (
  <div>Loading data for {query}</div>
))

asyncFn = asyncFn.toOk(['some', 'data'])

asyncFn.whenOk(data => (
  data.map(something => <div>{something}</div>)
))

asyncFn = asyncFn.toFailure(new Error('Uh oh'))

asyncFn.whenFailure(error => (
  <div>Oops! {error.message}<div>
))

// You can also return an element
asyncFn.whenFailure(<div>Error!</div>)

// or use `when` with an object to match on the state.
// You don't have to handle all the cases.
asyncFn.when({
  pending: <div>loading</div>,
  ok: data => <Component data={data} />
})
```

Remove this file if you already have it globally in your app and don't need it.

**/

const maybeCall = (state, query, data) => val => {
  if (state !== query) {
    return null
  }
  if (typeof val === 'function') {
    return val(data)
  }
  return typeof val === 'undefined' ? true : val
}

const AsyncFn = (state = 'idle', data = null) => {
  return {
    whenIdle: maybeCall(state, 'idle'),
    whenPending: maybeCall(state, 'pending', data),
    whenOk: maybeCall(state, 'ok', data),
    whenFailure: maybeCall(state, 'failure', data),

    when: cases => {
      const cb = cases[state]
      return typeof cb === 'function' ? cb(data) : cb
    },

    toIdle: () => new AsyncFn('idle'),
    toPending: (arg) => new AsyncFn('pending', arg),
    toOk: (newData) => new AsyncFn('ok', newData),
    toFailure: (newData) => new AsyncFn('failure', newData),
  }
}

export {AsyncFn}
