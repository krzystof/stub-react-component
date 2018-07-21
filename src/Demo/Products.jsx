import React from 'react'
import PropTypes from 'prop-types'
import ProductsData from './ProductsData'
import ProductsUi from './ProductsUi'

/**

Compose the application

There should be no reasons to change this file.

**/

const Products = (pageProps) => (
  <ProductsData {...pageProps}>
    {(dataAndHandlers) => (
      <ProductsUi {...dataAndHandlers} />
    )}
  </ProductsData>
)

export default Products
