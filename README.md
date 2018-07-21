# Create React Component

> A fast way to generate a new component with tests anywhere in your app.

## Why?

I realized that my love for tests and tools was slowing me down lately when
creating new components. I would always wonder how I should do it, what should
I test, and so on.
And I almost always ended in the same place. Asynchronous actions, state, ui.
This tool generates a couple React components and the tests that comes with (using
react-testing-library).
Generate a new component, and start hacking on these files to tailor them to your
use case.

## Quick Overview

```sh
// if you don't already have an app
npx create-react-app my-app
cd my-app

npx create-react-component src/MyNewComponent
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
    <MyNewComponent />                                          // <-- and this
  </div>
)

export default App
```

And you should have an amazing component ready to be hacked!

## Generated template

When running `npx create-react-component src/Example`, the following files will be generated in `src/Example`:

### Tests

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

## Workflow
This is how I use this template.
- if I have a real api client, write tests for the requests I need. Then run the same suite of tests on the fake api.
- implement the functionality I need, changing `Product.test.jsx`, `ProductsData.jsx` and `ProductsUi.jsx` to suite my needs.
- update the `Page.test.jsx` and `Page.jsx` with a generic scenario.
- change the `USE_FAKE_DATA` constant to `false` in `Page.jsx` and see how it goes in the browser.
- add style to `products.css` and class names to `ProductsUi.jsx`.
- rename the file with a filename that contains `Product` to `MyComponent`.
