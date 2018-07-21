import React from 'react'
import ProductsData from './ProductsData'
import ProductsUi from './ProductsUi'
import './products.css'

/**

Compose the application

There should be no reasons to change this file.
It only link the Data and the Ui and is used
in tests and when mounting the <Page>.

**/

const Products = (pageProps) => (
  <ProductsData {...pageProps}>
    {(dataAndHandlers) => (
      <ProductsUi {...dataAndHandlers} />
    )}
  </ProductsData>
)

export default Products
