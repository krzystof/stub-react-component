/* eslint-env jest */
import React from 'react'
import {
  render, cleanup, waitForElement
} from 'react-testing-library'
import 'jest-dom/extend-expect'
import AsyncContent from './AsyncContent'

afterEach(cleanup)

describe('<AsyncEffects /> initial page load', () => {
  test('fetch data successfully', async () => {
    const loadPeople = () => (
      new Promise((resolve) => {
        setTimeout(() => resolve([
          {name: 'Bob'},
          {name: 'Brandon'},
          {name: 'Fred'},
        ]))
      })
    )

    const {
      container,
      getByTestId,
      getByText,
    } = render(
      <AsyncContent onLoad={loadPeople}>
        {initialState => (
          <div data-testid="the-persons">
            {initialState.map(person => (
              <div key={person.name}>{person.name}</div>
            ))}
          </div>
        )}
      </AsyncContent>
    )

    expect(container).toHaveTextContent('')

    await waitForElement(() => getByText('Loading...'))

    await waitForElement(() => getByTestId('the-persons'))

    expect(getByTestId('the-persons')).toHaveTextContent('Bob')
    expect(getByTestId('the-persons')).toHaveTextContent('Brandon')
    expect(getByTestId('the-persons')).toHaveTextContent('Fred')
  })

  test('errors during fetching', async () => {
    const loadPeople = () => (
      new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Could not retrieve people.')))
      })
    )

    const {
      container,
      getByText,
    } = render(
      <AsyncContent onLoad={loadPeople}>
        {() => (
          <div>
            That will never render
          </div>
        )}
      </AsyncContent>
    )

    expect(container).toHaveTextContent('')
    await waitForElement(() => getByText('Loading...'))
    await waitForElement(() => getByText('Something went wrong: Could not retrieve people.'))
  })
})
