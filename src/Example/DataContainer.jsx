import {Component} from 'react'

class DataContainer extends Component {
  state = this.props.initialState

  /**
  Render the children and pass all
  the state and handlers as props.
  **/
  render() {
    return this.props.children({
      ...this.state
    })
  }
}

export default DataContainer
