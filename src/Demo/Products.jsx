import React from 'react'
import ProductsData from './ProductsData'
import ProductsUi from './ProductsUi'
import './products.css'

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
