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
    saveProduct: new AsyncFn(),
    showingForm: false,
    name: '',
    description: '',
  }

  showProduct = product => () => {
    this.changeProductDetailState(asyncFn => asyncFn.toPending(product.name))

    this.props.getProduct(product.id)
      .then(productDetail => {
        this.changeProductDetailState(asyncFn => asyncFn.toOk(productDetail))
      })
      .catch(error => {
        this.changeProductDetailState(asyncFn => asyncFn.toFailure(error.message))
      })
  }

  changeProductDetailState = updateFn => {
    this.setState(prevState => ({productDetail: updateFn(prevState.productDetail)}))
  }

  saveProduct = event => {
    event.preventDefault()
    this.setState(prevState => ({saveProduct: prevState.saveProduct.toPending()}))

    this.props.saveProduct(this.state.name, this.state.description)
      .then(product => {
        this.setState(prevState => ({
          saveProduct: prevState.saveProduct.toOk(),
          products: [...prevState.products, product],
          showingForm: false,
        }))
      })
      .catch(error => {
        this.setState(prevState => ({
          saveProduct: prevState.saveProduct.toFailure(error.message)
        }))
      })
  }

  changeSaveProductState = updateFn => {
    this.setState(prevState => ({saveProduct: updateFn(prevState.saveProduct)}))
  }

  showForm = () => {
    this.setState(prevState => ({
      showingForm: true,
      saveProduct: prevState.saveProduct.toIdle()
    }))
  }

  changeName = event => this.setState({name: event.target.value})
  changeDescription = event => this.setState({description: event.target.value})

  render() {
    return this.props.children({
      ...this.state,
      onShowProduct: this.showProduct,
      onAddProduct: this.showForm,
      onChangeName: this.changeName,
      onChangeDescription: this.changeDescription,
      onSaveProduct: this.saveProduct,
    })
  }
}

export default ProductsData
