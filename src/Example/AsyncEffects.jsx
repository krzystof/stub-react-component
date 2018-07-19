import React from 'react'
import {AsyncFn} from './utils'

const fakeApi = {
  onLoad() {
    return Promise.resolve([
      {name: 'bob'},
      {name: 'fred'},
      {name: 'brandon'},
    ])
  }
}

class AsyncEffects extends React.Component {
  state = {
    initialAction: new AsyncFn(),
  }

  componentDidMount = () => {
    this.setState(prevState => ({initialAction: prevState.initialAction.toPending()}))

    fakeApi.onLoad()
      .then(result => {
        this.setState(prevState => ({initialAction: prevState.initialAction.toOk(result)}))
      })
    //   .catch(error => {
    //     this.setState(state => ({initialAction: {status: 'failure', payload: error}}))
    //   })
  }

  // onLoadUsername = stateUpdater => {
  //   stateUpdater(asyncAction.toPending())

  //   this.props.onLoadUsername()
  //     .then(result => stateUpdater(asyncAction.toOk(result)))
  //     .catch(error => stateUpdater(asyncAction.toFailure(error)))
  // }

  render() {
    const {status, payload} = this.state.initialAction

    if (status === 'ok') {
      return this.props.children({
        initialState: {
          ...payload,
          // loadUsernameState: this.state.loadUsernameState,
        },
        // loadUsername: this.onLoadUsername,
      })
    }

    if (this.state.initialAction.whenPending()) {
      return (
        <div>
          Loading...
        </div>
      )
    }

    const okContent = this.state.initialAction.whenOk(data => {
      return this.props.children({
        initialState: data,
        // loadUsernameState: this.state.loadUsernameState,
      })
    })

    if (okContent) {
      return okContent
    }

    if (this.state.initialAction.whenOk()) {
      return
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
