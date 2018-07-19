import React from 'react'
import AsyncActions from './AsyncActions'
import DataContainer from './DataContainer'
import StatsUi from './StatsUi'

/**

Entry Point for a given page
============================

The component links external services, such as an API,
and link it to our page component.

When opening this file, it should be obvious to spot
the external depencies of our page (file system,
APIs, any other asynchronous requests).



Reason to change:

The only reason to modify this file should be
when adding external needs from the Page component.


  // @TODO
  // Move the async bindings into the Async class.
  // This file should have no reasons to change.

**/

const apiGetStuff = () => {
  return Promise.resolve({username: '@bob'})
}

const onLoadUsername = () => {
  const items = [
    '@krzystof',
    '@david',
    '@matt',
    '@sam',
    '@tom',
  ]

  const username = items[Math.floor(Math.random() * items.length)]

  // if (username === '@sam') {
  //   Promise.reject({message: 'NO!'})
  // }

  return Promise.resolve({username})
}

const Page = () => (
  <AsyncActions onLoad={apiGetStuff} onLoadUsername={onLoadUsername}>
    {(initialState, asyncHandlers) => (
      <DataContainer initialState={initialState} {...asyncHandlers} >
        {({...props}) => (
          <StatsUi {...props} />
        )}
      </DataContainer>
    )}
  </AsyncActions>
)

export default Page
