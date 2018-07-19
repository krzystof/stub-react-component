/* eslint-env jest */
import React from 'react'
import {
  render, cleanup, fireEvent, waitForElement
} from 'react-testing-library'
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
  {name: 'Bob'},
  {name: 'Fred'},
  {name: 'Brandon'},
]
```
For the sake of testing, passing a "failOnLoad" props to the components will
cause the request to fail. Ideally, if you want to test this, pass the async
callbacks as a props to the AsyncEffects component.

Then the AsyncEffects components pass a props to load a specific username.

```
Bob => {name: 'Bob', bio: 'Coding night and day.'},
Fred => {name: 'Bob', bio: 'Essential. Friends of all.'},
Brandon => {name: 'Brandon', bio: 'A modern time adventurer.'},
```

Fetching by a name that does not exists will throw an error.

**/

afterEach(cleanup)

describe('initial page load', () => {
  test('fetch data', async () => {
    const {
      container,
      getByTestId,
      getByText,
    } = render(
      <AsyncEffects>
        {({initialState}) => (
          <div>
            <div data-testid="the-persons">
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

    await waitForElement(() => getByTestId('the-persons'))

    expect(getByTestId('the-persons')).toHaveTextContent('Bob')
    expect(getByTestId('the-persons')).toHaveTextContent('Fred')
    expect(getByTestId('the-persons')).toHaveTextContent('Brandon')
  })

  test('errors during fetching', async () => {
    const {
      container,
      getByText,
    } = render(
      <AsyncEffects failOnLoad>
        {() => (
          <div>
            That will never render
          </div>
        )}
      </AsyncEffects>
    )

    expect(container).toHaveTextContent('')
    await waitForElement(() => getByText('Loading...'))
    await waitForElement(() => getByText('Something went wrong: Could not retrieve people.'))
  })
})

// initial load failure?

test('fetch data when clicking a button, keep the state in the AsyncEffect', async () => {
  const {
    getByTestId,
    getByText,
  } = render(
    <AsyncEffects>
      {({initialState, showPersonState, onShowPerson}) => (
        <div>
          <div data-testid="the-persons">
            {initialState.map(person => (
              <div key={person.name}>
                <div>
                  {person.name}
                </div>
                <button type="button" onClick={onShowPerson(person.name)}>
                  show {person.name} bio
                </button>
              </div>
            ))}
          </div>
          {showPersonState.whenPending(name => (
            <div>Loading {name} bio...</div>
          ))}
          {showPersonState.whenOk(person => (
            <div data-testid="the-person">
              {person.name}: {person.bio}
            </div>
          ))}
        </div>
      )}
    </AsyncEffects>
  )

  await waitForElement(() => getByTestId('the-persons'))

  fireEvent.click(getByText('show Brandon bio'))

  await waitForElement(() => getByText('Loading Brandon bio...'))
  await waitForElement(() => getByTestId('the-person'))

  expect(getByTestId('the-person')).toHaveTextContent('Brandon: A modern time adventurer.')
})

// failure?

// test('Handle async effect, state is managed in the child component', async () => {
// failure?
