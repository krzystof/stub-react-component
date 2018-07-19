/* eslint-env jest */

/**

We will run the test suite with the stub provided in this folder.

Later we might even try to run it on the generated file (when the
generator will be in place).

For now, let's assume that the AsyncActions loads some data that look
like this on load:

```js
{
  stubData: 'Here is a thing'
}
```

**/

test('runs a callback on initial page load', () => {
  const {container, getByTestId, getByText} = render(
    <AsyncActions>
      {({initialState}) => (
        <div>
          <div data-testid="the-state">{initialState.stubData}</div>
        </div>
      )}
    </AsyncActions>
  )

  expect(container).toHaveTextContent('')

  await waitForElement(() => getByText('Loading'))

  await waitForElement(() => getByTestId('the-state'))

  expect(getByTestId('the-state')).toHaveTextContent('Here is a thing')
})

// initial load error

// initial load
