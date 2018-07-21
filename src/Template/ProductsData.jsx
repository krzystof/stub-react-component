import {Component} from 'react'
import PropTypes from 'prop-types'
import {ProductListItemType} from './custom-prop-types'
import {AsyncFn} from './utils'

/**

State Management
================

This Container component will contain quite a bit of logic as it hold
the state and how it updates depending on what's going on in the app.


You will edit this file to add your own logic.
What is included in the template will most likely be deleted,
but feel free to change the name and reuse some pieces of logic.

**/


class ProductsData extends Component {
  static propTypes = {
    initialData: PropTypes.arrayOf(ProductListItemType).isRequired,
    getProduct: PropTypes.func.isRequired,
    saveProduct: PropTypes.func.isRequired,
    children: PropTypes.func.isRequired,
  }

  state = {
    // delete that if you don't require initial data
    products: this.props.initialData,
    productDetail: new AsyncFn(),
    saveProduct: new AsyncFn(),
    showingForm: false,
    name: '',
    description: '',
    filterTerm: '',
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

  changeFilterTerm = event => this.setState({filterTerm: event.target.value})
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
      onChangeFilterTerm: this.changeFilterTerm,
    })
  }
}

export default ProductsData
