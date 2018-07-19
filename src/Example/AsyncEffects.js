import React from 'react'
import {AsyncFn} from './utils'

class AsyncEffects extends React.Component {
  state = {
    initialAction: new AsyncFn(),
  }

  componentDidMount = () => {
    this.setState({initialAction: {status: 'pending'}})

    this.props.onLoad()
      .then(result => {
        this.setState(() => ({initialAction: {status: 'ok', payload: result}}))
      })
      .catch(error => {
        this.setState(state => ({initialAction: {status: 'failure', payload: error}}))
      })
  }

  onLoadUsername = stateUpdater => {
    stateUpdater(asyncAction.toPending())

    this.props.onLoadUsername()
      .then(result => stateUpdater(asyncAction.toOk(result)))
      .catch(error => stateUpdater(asyncAction.toFailure(error)))
  }

  render() {
    const {status, payload} = this.state.initialAction

    if (status === 'ok') {
      return this.props.children({
        initialState: {
          ...payload,
          loadUsernameState: this.state.loadUsernameState,
        },
        loadUsername: this.onLoadUsername,
      })
    }

    if (status === 'pending') {
      return (
        <div>
          Loading...
        </div>
      )
    }

    if (status === 'failure') {
      return (
        <div>
          Error! This happened:
          {payload.message}
        </div>
      )
    }

    return null
  }
}

export default AsyncEffects
