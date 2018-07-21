import React from 'react'
import AsyncContent from './AsyncContent'
import Products from './Products'
import fakeApi from './__mocks__/fake-api'

/**

Entry Point for the new component
=================================

This component's role is to compose the application
using the other components.

- AsyncContent loads some initial data
- ProductsData maintains the state of the app and owns all the logic
- ProductsUi is a pure function that given the state of the app, renders the UI.

It is possible to repeat this pattern at a lower level of the app.
In this case, ProductsUi should still be a pure function, but one of the
children could repeat the pattern we have here.

The reason to change this file is when adding new asynchronous
functions or changing the layout of the page.

**/

// Maybe you would need a check here
// to make sure we are not in production.
// Otherwise, change this value to quickly
// toggle between fake or real data.
const USE_FAKE_DATA = true

const api = USE_FAKE_DATA ? fakeApi : 'your api client goes here'

const Page = () => (
  <div>
    <h1>Products</h1>
    <div>
      {/*
      If you don't need initial content or async callbacks,
      just render the Products straight away.
      */}
      <AsyncContent onLoad={api.getProducts}>
        {(initialData) => (
          <Products
            initialData={initialData}
            getProduct={api.getProduct}
            saveProduct={api.saveProduct}
          />
        )}
      </AsyncContent>
    </div>
  </div>
)

export default Page
