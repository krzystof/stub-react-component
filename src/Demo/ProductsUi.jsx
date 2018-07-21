import React from 'react'
// import PropTypes from 'prop-types'

const ProductsUi = ({
  products,
  productDetail,
  saveProduct,
  showingForm,
  name,
  description,
  onShowProduct,
  onAddProduct,
  onChangeName,
  onChangeDescription,
  onSaveProduct,
}) => {
  return (
    <div>
      <div>
        {saveProduct.whenOk(
          <div>Product saved!</div>
        )}
        <div data-testid="products">
          {products.map(product => (
            <div key={product.id}>
              <div>
                {product.name}
              </div>
              <button
                type="button"
                data-testid={`show-${product.id}`}
                onClick={onShowProduct(product)}>
                view
              </button>
            </div>
          ))}
        </div>
        <div>
          {showingForm ? (
            <form onSubmit={onSaveProduct}>
              {saveProduct.whenPending(<div>Saving product...</div>)}
              <div>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" value={name} onChange={onChangeName} />
              </div>
              <div>
                <label htmlFor="description">Description</label>
                <input type="text" id="description" value={description} onChange={onChangeDescription} />
              </div>
              <button type="submit" disabled={saveProduct.whenPending()}>Save</button>
            </form>
          ) : (
            <button type="button" onClick={onAddProduct}>Add a product</button>
          )}
        </div>
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
