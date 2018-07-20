import {Component} from 'react'

class DataContainer extends Component {
  state = {
    ...this.props.initialState,
    isCool: false,
  }

  /**
  That's the usual form of handlers.
  Just do what you gotta do here.
  **/
  toggleIsCool = event => {
    event.preventDefault()
    this.setState(state => ({isCool: !state.isCool}))
  }

  /**
  Render the children and pass all
  the state and handlers as props.
  **/
  render() {
    return this.props.children({
      ...this.state,
      toggleIsCool: this.toggleIsCool
    })
  }
}

export default DataContainer
