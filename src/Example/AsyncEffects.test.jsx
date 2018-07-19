/* eslint-env jest */
import React from 'react'
import {render, waitForElement} from 'react-testing-library'

import AsyncEffects from './AsyncEffects'

/**

We will run the test suite with the stub provided in this folder.

Later we might even try to run it on the generated file (when the
generator will be in place).

For now, let's assume that the AsyncEffects loads some data that look
like this on load:

```js
{
  stubData: 'Here is a thing'
}
```

**/

test('runs a callback on initial page load', async () => {
  const mockLoad = jest.fn(() => Promise.resolve({stubData: 'Here is a thing'}))

  const {container, getByTestId, getByText} = render(
    <AsyncEffects onLoad={mockLoad}>
      {({initialState}) => (
        <div>
          <div data-testid="the-state">
            {initialState.stubData}
          </div>
        </div>
      )}
    </AsyncEffects>
  )

  expect(container).toHaveTextContent('')

  await waitForElement(() => getByText('Loading'))

  await waitForElement(() => getByTestId('the-state'))

  expect(getByTestId('the-state')).toHaveTextContent('Here is a thing')
})

// initial load error

// initial load
