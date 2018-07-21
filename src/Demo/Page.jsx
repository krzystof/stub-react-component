import React from 'react'
import AsyncActions from './AsyncActions'
import DataContainer from './DataContainer'
import StatsUi from './StatsUi'

/**

Entry Point for a given page
============================

There are 2 things to consider for async functions.
- initial data needed to view the page
- asynchronous actions that have an effect on the UI

This starter template takes the example of a CRUD app
for items. Run the command line tool to initialize it
in a directory.

This component loads links all the other one.

**/

const USE_FAKE_DATA = true

const api = USE_FAKE_DATA ? fakeApi : 'yourApiClient'

const Page = () => (
  <div>
    <div>Products</div>
    <div>
      {/*
      If you don't need initial content, just
      render the data container straight away.
      */}
      <AsyncContent onLoad={api.getStuff}>
        {(initialData) => (
          <DataContainer initialData={initialData}>
            {({...props}) => (
              <ProductsUi {...props} />
            )}
          </DataContainer>
        )}
      </AsyncContent>
    </div>
  </div>
)

export default Page
