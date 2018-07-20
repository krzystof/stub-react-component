/* eslint-env jest */
import React from 'react'
import {render} from 'react-testing-library'
import 'jest-dom/extend-expect'
import DataContainer from './DataContainer'

/**

What needs to be tested here?
We have a data container that receives some initial state.

- it has some initial state
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
