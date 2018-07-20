/* eslint-env jest */
import React from 'react'
import {render, fireEvent, cleanup} from 'react-testing-library'
import 'jest-dom/extend-expect'
import DataContainer from './DataContainer'

afterEach(cleanup)

/**

What needs to be tested here?
We have a data container that receives some initial state.

- I can update it using traditional cb.
- I can update it using a state reducer style.
- It is updated by an async stuff.

**/

test('<DataContainer /> with some initialState', () => {
  const {container} = render(
    <DataContainer initialState={{check: 'me out'}}>
      {props => (
        <div>{props.check}</div>
      )}
    </DataContainer>
  )
  expect(container).toHaveTextContent('me out')
})

test('<DataContainer /> traditional handler', () => {
  const {container, getByTestId} = render(
    <DataContainer initialState={{isCool: false}}>
      {({isCool, toggleIsCool}) => (
        <button type="button" data-testid="btn" onClick={toggleIsCool}>
          {isCool ? 'Neat!' : 'Shame...'}
        </button>
      )}
    </DataContainer>
  )
  expect(container).toHaveTextContent('Shame...')

  fireEvent.click(getByTestId('btn'))
  expect(container).toHaveTextContent('Neat!')

  fireEvent.click(getByTestId('btn'))
  expect(container).toHaveTextContent('Shame...')
})
