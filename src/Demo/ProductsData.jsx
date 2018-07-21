import {Component} from 'react'
import {AsyncFn} from './utils'

/**

State Management
================

This Container component will contain quite a bit of logic as it hold
the state and how it updates depending on what's going on in the app.

This stub provides 2 alternatives for managing update:

1. A function per action
That's the common React class. Each method updates the state directly.

2. A state reducer
Same as Redux, but in the class. All updates are piped through this function.


Reasons to change:

Adding a new feature, changing the behaviour or the shape of the data,
... Loads in fact.
BUT it should not change if we change the UI, refactor the markup, and so on.
AND it should not change if we add another async functions that the UI can dispatch.


// @TODO
  // Is it possible to use a state reducer pattern?
  // Is it possible to forward asynchronous callbacks to the UI without changing stuff here?

**/


class ProductsData extends Component {
  state = {
    products: this.props.initialData,
    productDetail: new AsyncFn(),
  }

  showProduct = product => () => {
    this.setState(prevState => ({productDetail: prevState.productDetail.toPending(product.name)}))

    this.props.onShowProduct(product.id)
      .then(productDetail => {
        this.changeProductDetailState(state => state.toOk(productDetail))
      })
  }

  render() {
    return this.props.children({
      ...this.state,
      onShowProduct: this.showProduct,
    })
  }
}

export default ProductsData
