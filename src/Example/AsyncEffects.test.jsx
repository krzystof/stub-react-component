/* eslint-env jest */
import React from 'react'
import {render, waitForElement} from 'react-testing-library'
import 'jest-dom/extend-expect'

import AsyncEffects from './AsyncEffects'

/**

We will run the test suite with the stub provided in this folder.

Later we might even try to run it on the generated file (when the
generator will be in place).

For now, let's assume that the AsyncEffects loads some data that look
like this:

```js
[
  {name: 'bob'},
  {name: 'fred'},
  {name: 'brandon'},
]
```

**/

test('runs a callback on initial page load', async () => {
  const {
    container,
    getByTestId,
    getByText,
  } = render(
    <AsyncEffects>
      {({initialState}) => (
        <div>
          <div data-testid="the-state">
            {initialState.map(person => (
              <div key={person.name}>{person.name}</div>
            ))}
          </div>
        </div>
      )}
    </AsyncEffects>
  )

  expect(container).toHaveTextContent('')

  await waitForElement(() => getByText('Loading...'))

  await waitForElement(() => getByTestId('the-state'))

  expect(getByTestId('the-state')).toHaveTextContent('bob')
  expect(getByTestId('the-state')).toHaveTextContent('fred')
  expect(getByTestId('the-state')).toHaveTextContent('brandon')
})

// initial load error

// initial load
