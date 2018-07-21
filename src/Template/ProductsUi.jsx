import React from 'react'
import PropTypes from 'prop-types'
import {ProductListItemType, AsyncFunctionType} from './custom-prop-types'

/**

Rendering the component
=======================

Using the data and the handlers passed down by the data
container, render the UI.

It is absolutely possible to include here another component
created with `create-react-component`.

**/

const ProductsUi = ({
  products,
  productDetail,
  saveProduct,
  showingForm,
  name,
  description,
  filterTerm,
  onShowProduct,
  onAddProduct,
  onChangeName,
  onChangeDescription,
  onSaveProduct,
  onChangeFilterTerm,
}) => {
  return (
    <div className="Products">
      <div>
        {saveProduct.whenOk(
          <div className="Products__success">Product saved!</div>
        )}
        <div className="Products__filter-box">
          <label htmlFor="filter">Filter</label>
          <input type="text" id="filter" value={filterTerm} onChange={onChangeFilterTerm} className="Products__filter-input" />
        </div>
        <div className="Products__content">
          <div data-testid="products" className="Products__list">
            {products
              .filter(product => product.name.includes(filterTerm))
              .map(product => (
                <div key={product.id} className="Products__list-item">
                  <div>
                    {product.name}
                  </div>
                  <div>
                    <button
                      type="button"
                      data-testid={`show-${product.id}`}
                      onClick={onShowProduct(product)}>
                      view
                    </button>
                  </div>
                </div>
              ))}
          </div>
          <div>
            {productDetail.when({
              pending: loadingName => <div>Loading {loadingName} details</div>,
              ok: product => (
                <div className="Products__detail">
                  <h3>{product.name}</h3>
                  <div>{product.description}</div>
                </div>
              ),
              failure: message => (
                <div>Could not load product: {message}</div>
              )
            })}
          </div>
        </div>
        <div>
          {showingForm ? (
            <form className="Products__form" onSubmit={onSaveProduct}>
              {saveProduct.whenPending(<div>Saving product...</div>)}
              <h3>Create a new product</h3>
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
    </div>
  )
}

ProductsUi.propTypes = {
  products: PropTypes.arrayOf(ProductListItemType).isRequired,
  productDetail: AsyncFunctionType.isRequired,
  saveProduct: AsyncFunctionType.isRequired,
  showingForm: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  filterTerm: PropTypes.string.isRequired,
  onShowProduct: PropTypes.func.isRequired,
  onAddProduct: PropTypes.func.isRequired,
  onChangeName: PropTypes.func.isRequired,
  onChangeDescription: PropTypes.func.isRequired,
  onSaveProduct: PropTypes.func.isRequired,
  onChangeFilterTerm: PropTypes.func.isRequired,
}

export default ProductsUi
