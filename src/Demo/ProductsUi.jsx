import React from 'react'
// import PropTypes from 'prop-types'

const ProductsUi = ({
  products,
}) => {
  return (
    <div>
      <div>
        {products.map(product => (
          <div key={product.id}>{product.name}</div>
        ))}
      </div>
    </div>
  )
}

export default ProductsUi
