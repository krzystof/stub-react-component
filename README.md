# Stub React Component

> A fast way to generate a new component with tests anywhere in your app.

## Why?

I realized that my love for tests and tools was slowing me down lately when
creating new components. I would always wonder how I should do it, what should
I test, and so on.
And I almost always ended in the same place. Asynchronous actions, state, ui.
This tool generates a couple React components and the tests that comes with (using
react-testing-library).
Generate a new component, and modify the files to fit you use case.

## Quick Overview

```sh
# if you don't already have an app
npx create-react-app my-app
cd my-app

npx stub-react-component src/MyNewComponent
```

Modify `src/App.jsx`:

```jsx
import React from 'react'
import './App.css'
import MyNewComponent from './MyNewComponent/Page'              // <-- add this

const App = () => (
  <div className="App">
    <header className="App-header">
      <h1 className="App-title">React Architecture Demo</h1>
    </header>
    <MyNewComponent />                                         {/* <-- and this */}
  </div>
)

export default App
```

Then run `yarn start`, head off to `http://localhost:3000` to view the created component.

What is included in the stub component:
- fetch initial products from a fake api
- display a list of products
- a button to display the detail of a product (fetch from the fake api)
- filter the products by name
- button to display a form and create a new product (backed by the fake api)



## TDD Workflow

That's how these stubs can be used when working on a new feature.

- first, if a real API client is available, write tests against this client
- test-drive the fake-api by running the same set of tests that were written for the real client. Running the same tests is very powerful as it ensures that the fake has the same behaviour as the real client.
- update the `Page.test.jsx` by adding a generic scenario for the new feature and use it to drive the implementation of `Page.jsx`.
- implement, tests-first, the functionalities at a lower level by adding tests to `Products.test.jsx`. use it to drive the implementations of `ProductsData.jsx` and `ProductsUi.jsx`.
- change the `USE_FAKE_DATA` constant to `false` in `Page.jsx` and verify that everything works as expected in the browser.
- add style to `products.css` and class names to `ProductsUi.jsx`.
- rename the files as needed. Lean on Eslint to make sure that all paths to the components are resolved.

## Generated template

When running `npx stub-react-component src/Example`, the following files will be generated in `src/Example`:

### Component

**AsyncContent.jsx**

A component that triggers and handles an `AsyncFn` and then render its children using a render props.
Customize with your desired loading and errors state. Or remove it.

**Page.jsx**

Create the component by linking the asynchronous callbacks with the components.

**Products.jsx**

Link the data container with the UI. You shouldn't have to change it, but feel free to.

**ProductsData.jsx**

Owns and manage all the state of the component. Modify it to integrate all the state
management that fits your needs.

**ProductsUi.jsx**

Render the UI as a functional component. It gets all the data and handlers needed from the `<ProductsData/>`.
It is one big component, but it is a good thing to break it down into smaller components to make it more
maintainable.

**custom-prop-types.js**

Define your custom types here if you are into it. Import and reuse them anywhere.

**products.css**

Write your styles in here, it is imported by the `<Page/>`. I like my css-out-of-js.

**utils.js**

Contains the `AsyncFn` utility, but again, delete it or add your own.

### Tests

**__mocks__/fake-api.js**

Return some stubbed data that will be used in your component and in `Page.test.jsx`.
Modify it so that it returns the same shape of data as your API.
Ideally, it should the same data you get from the real API, so you could test this fake api
and the real api with the same tests.

**__tests__/AsyncContent.test.jsx**

Test for the `<AsyncContent/>` component. Delete it if you use another component to handle
initial loading of data.

**__tests__/Page.test.jsx**

Test the `<Page/>` with a generic scenario using the `fake-api`. Useful to make sure that the `<Page/>`
component is built using the proper asynchronous callbacks .
You could ever run the same test against your real api if it returns the same data as the fake one.

**__tests__/Products.test.jsx**

Lower level tests that don't rely on the initial data fetching. Each test is more focused on one
functionality of the component.

**__tests__/utils.test.jsx**

Test the `AsyncFn` utility. Delete it if you are not using it.

Check out the template in `src/Template`. There are comments and info in each of them.
