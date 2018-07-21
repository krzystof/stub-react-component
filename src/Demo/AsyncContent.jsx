import React from 'react'
import PropTypes from 'prop-types'
import {AsyncFn} from './utils'

class AsyncContent extends React.Component {
  static propTypes = {
    onLoad: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.node,
    ]).isRequired,
  }

  state = {
    loadContentState: new AsyncFn(),
  }

  componentDidMount = () => {
    this.updateContentState(this.state.loadContentState.toPending())

    this.props.onLoad()
      .then(result => this.updateContentState(this.state.loadContentState.toOk(result)))
      .catch(error => this.updateContentState(this.state.loadContentState.toFailure(error.message)))
  }

  updateContentState = newContentState => {
    this.setState(() => ({
      loadContentState: newContentState
    }))
  }

  render() {
    if (this.state.loadContentState.whenPending()) {
      return (
        <div>
          Loading...
        </div>
      )
    }

    const okContent = this.state.loadContentState.whenOk(data => {
      return this.props.children(data)
    })

    if (okContent) {
      return okContent
    }

    const failureContent = this.state.loadContentState.whenFailure(message => {
      return (
        <div>
          Something went wrong: {message}
        </div>
      )
    })

    if (failureContent) {
      return failureContent
    }

    return null
  }
}

export default AsyncContent
