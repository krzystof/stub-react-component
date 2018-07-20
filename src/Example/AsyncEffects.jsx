import React from 'react'
import {AsyncFn} from './utils'
import fakeApi from './__mocks__/fake-api'

class AsyncEffects extends React.Component {
  state = {
    initialAction: new AsyncFn(),
    showPersonState: new AsyncFn(),
  }

  componentDidMount = () => {
    this.setState(prevState => ({initialAction: prevState.initialAction.toPending()}))

    // This is an example request that can be set to fail for testing purposes.
    // Alternatively, you might want to consider passing the async callbacks as props.
    fakeApi.fetchAll(this.props.failOnLoad)
      .then(result => {
        this.setState(prevState => ({initialAction: prevState.initialAction.toOk(result)}))
      })
      .catch(error => {
        this.setState(prevState => ({
          initialAction: prevState.initialAction.toFailure(error.message)
        }))
      })
  }

  /**
  This is an example of the state of an asynchronous
  request state owned by the <AsyncEffects /> component.
  **/
  showPerson = name => () => {
    this.setState(prevState => ({showPersonState: prevState.showPersonState.toPending(name)}))

    fakeApi.getByName(name)
      .then(result => {
        this.setState(prevState => ({showPersonState: prevState.showPersonState.toOk(result)}))
      })
      .catch(error => {
        this.setState(prevState => ({
          initialAction: prevState.showPersonState.toFailure(error.message)
        }))
      })
  }

  /**
  This is an example to handle the change of an asynchronous
  piece of state owned by a child component.
  I am not sure yet what are the benefits of one over the other.
  **/
  showBestFriend = (name, stateUpdater) => {
    const fn = new AsyncFn()
    stateUpdater(fn.toPending(name))

    fakeApi.getBestFriend(name)
      .then(result => stateUpdater(fn.toOk(result)))
      .catch(error => stateUpdater(fn.toFailure(error)))
  }

  render() {
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
        showPersonState: this.state.showPersonState,
        onShowPerson: this.showPerson,
        onShowBestFriend: this.showBestFriend,
      })
    })

    if (okContent) {
      return okContent
    }

    const failureContent = this.state.initialAction.whenFailure(message => {
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

export default AsyncEffects
