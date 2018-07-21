/* eslint-env jest */
import React from 'react'
import {
  render,
  cleanup,
  fireEvent,
  waitForElement,
} from 'react-testing-library'
import 'jest-dom/extend-expect'
import Page from '../Page'

afterEach(cleanup)

/**

Integration test
================

A generic test that loads the product,
click one to view the details, then create one.

It uses the api client provided (depending on the value of USE_FAKE_DATA).

Use it with fake data to make sure your Page is builded properly.

This test is intended to read more like a general
story than the more focused ones on Products.test.js.

This file is ideal when testing against your real api with results
you know will be true. It makes sure that your api client behaves
as expected.

**/

test('A functional product page', async () => {
  const {
    container,
    getByText,
    getByTestId,
    getByLabelText,
  } = render(<Page />)

  // initial page load
  expect(container).toHaveTextContent('Products')
  await waitForElement(() => getByText('Loading...'))

  // view the products
  await waitForElement(() => getByText('Broom'))
  expect(container).toHaveTextContent('Hoover')
  expect(container).toHaveTextContent('Dustpan')
  expect(container).toHaveTextContent('Wipes')
  expect(container).toHaveTextContent('Detergent')

  // // click to show one
  fireEvent.click(getByTestId('show-3'))
  await waitForElement(() => getByText('Better than with your bare hands.'))

  // // create a product
  fireEvent.click(getByText('Add a product'))
  const nameInput = getByLabelText('Name')
  nameInput.value = 'Flower Pot'
  fireEvent.change(nameInput)
  const descriptionInput = getByLabelText('Description')
  descriptionInput.value = 'Beautiful and waterproof.'
  fireEvent.change(descriptionInput)
  fireEvent.click(getByText('Save'))

  await waitForElement(() => getByText('Product saved!'))

  // // click it to view its description
  fireEvent.click(getByTestId('show-6'))
  await waitForElement(() => getByText('Beautiful and waterproof.'))
})
