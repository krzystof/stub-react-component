import React from 'react'
// import PropTypes from 'prop-types'

const ProductsUi = ({
  products,
  productDetail,
  onShowProduct,
}) => {
  return (
    <div>
      <div>
        {products.map(product => (
          <div key={product.id}>
            <div>
              {product.name}
            </div>
            <button type="button" onClick={onShowProduct(product)}>
              view
            </button>
          </div>
        ))}
      </div>
      <div>
        {productDetail.when({
          pending: name => <div>Loading {name} details</div>,
          ok: product => (
            <div>
              <div>{product.name}</div>
              <div>{product.description}</div>
            </div>
          ),
          failure: message => (
            <div>Could not load product: {message}</div>
          )
        })}
      </div>
    </div>
  )
}

export default ProductsUi
