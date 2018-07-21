/* eslint-env jest */
import React from 'react'
import {render, cleanup, waitForElement} from 'react-testing-library'
import 'jest-dom/extend-expect'
import Products from './Products'

afterEach(cleanup)

// const stubProducts = [
//   {id: 1, name: 'Broom', description: 'Can be used as a weapon.'},
//   {id: 2, name: 'Hoover', description: 'Expensive but handy.'},
//   {id: 3, name: 'Dustpan', description: 'Better than with your bare hands.'},
//   {id: 4, name: 'Wipes', description: 'Smells soooo good.'},
//   {id: 5, name: 'Detergent', description: 'DO. NOT. DRINK.'},
// ]

const simplifiedList = null

/**
Render a Products component with some default props.
Useful to target the tests on a specific piece of behaviour.
**/
const renderProducts = ({
  initialData = simplifiedList
}) => render(
  <Products initialData={initialData} />
)

test('Displays a list of products', () => {
  const {container} = renderProducts({
    initialData: [
      {id: 1, name: 'Bucket'},
      {id: 2, name: 'Bin'},
    ]
  })

  expect(container).toHaveTextContent('Bucket')
  expect(container).toHaveTextContent('Bin')
})

// display a list of products
// click on a product to view the description
// adding a product
