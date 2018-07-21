/* eslint-env jest */
import React from 'react'
import {
  render,
  cleanup,
  fireEvent,
  waitForElement,
} from 'react-testing-library'
import 'jest-dom/extend-expect'
import Products from '../Products'

afterEach(cleanup)

const stubProducts = [
  {id: 1, name: 'Broom', description: 'Can be used as a weapon.'},
  {id: 2, name: 'Hoover', description: 'Expensive but handy.'},
  {id: 3, name: 'Dustpan', description: 'Better than with your bare hands.'},
  {id: 4, name: 'Wipes', description: 'Smells soooo good.'},
  {id: 5, name: 'Detergent', description: 'DO. NOT. DRINK.'},
]

const simplifiedList = stubProducts.map(({id, name}) => ({id, name}))

/**
Render a Products component with some default props.
Useful to target the tests on a specific piece of behaviour.
**/
const renderProducts = ({
  initialData = simplifiedList,
  getProduct = () => null,
  saveProduct = () => null,
} = {}) => render(
  <Products
    initialData={initialData}
    getProduct={getProduct}
    saveProduct={saveProduct}
  />
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

test('View a product description', async () => {
  const mockShowProduct = jest.fn(id => Promise.resolve(
    stubProducts.find(product => product.id === id)
  ))

  const {container, getByTestId, getByText} = renderProducts({
    getProduct: mockShowProduct,
  })

  fireEvent.click(getByTestId('show-2'))

  expect(mockShowProduct).toHaveBeenCalled()
  expect(mockShowProduct).toHaveBeenCalledWith(2)

  await waitForElement(() => getByText('Loading Hoover details'))
  await waitForElement(() => getByText('Hoover'))

  expect(container).toHaveTextContent('Expensive but handy.')
})

test('Fail to view a product description', async () => {
  const mockShowProduct = jest.fn(() => Promise.reject(
    new Error('request failed')
  ))

  const {getByTestId, getByText} = renderProducts({
    getProduct: mockShowProduct,
  })

  fireEvent.click(getByTestId('show-2'))

  await waitForElement(() => getByText('Could not load product: request failed'))
})


test('Add a product', async () => {
  const mockSaveProduct = jest.fn((name, description) => Promise.resolve({
    id: 6,
    name,
    description,
  }))

  const {getByTestId, getByText, getByLabelText} = renderProducts({
    saveProduct: mockSaveProduct,
  })

  fireEvent.click(getByText('Add a product'))

  const nameInput = getByLabelText('Name')
  nameInput.value = 'Flower Pot'
  fireEvent.change(nameInput)

  const descriptionInput = getByLabelText('Description')
  descriptionInput.value = 'Beautiful and waterproof.'
  fireEvent.change(descriptionInput)

  const saveButton = getByText('Save')
  fireEvent.click(saveButton)
  expect(saveButton.disabled).toBe(true)

  expect(mockSaveProduct).toHaveBeenCalled()
  expect(mockSaveProduct).toHaveBeenCalledWith('Flower Pot', 'Beautiful and waterproof.')

  await waitForElement(() => getByText('Saving product...'))
  await waitForElement(() => getByText('Product saved!'))

  expect(getByTestId('products')).toHaveTextContent('Flower Pot')
})

test('Filter the list', () => {
  const {container, getByLabelText} = renderProducts({
    initialData: [
      {id: 1, name: 'Bucket'},
      {id: 2, name: 'Bin'},
    ]
  })

  const filterInput = getByLabelText('Filter')
  filterInput.value = 'Bi'
  fireEvent.change(filterInput)

  expect(container).not.toHaveTextContent('Bucket')
  expect(container).toHaveTextContent('Bin')
})
