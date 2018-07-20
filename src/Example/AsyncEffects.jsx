import React from 'react'
import {AsyncFn} from './utils'

const fakeApi = {
  fetchAll(shouldFail) {
    if (shouldFail) {
      return Promise.reject(new Error('Could not retrieve people.'))
    }
    return Promise.resolve([
      {name: 'Bob'},
      {name: 'Fred'},
      {name: 'Brandon'},
    ])
  },

  getByName(name) {
    const stubs = {
      Bob: {name: 'Bob', bio: 'Coding night and day.'},
      Fred: {name: 'Bob', bio: 'Essential. Friends of all.'},
      Brandon: {name: 'Brandon', bio: 'A modern time adventurer.'},
    }
    if (!stubs[name]) {
      return Promise.reject(new Error(`${name} is not a valid person.`))
    }
    return Promise.resolve(stubs[name])
  },

  getBestFriend(name) {
    const stubs = {
      Bob: {name: 'Martin'},
      Fred: {name: 'Julie'},
      Brandon: {name: 'Kim'},
    }

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!stubs[name]) {
          return reject(new Error(`${name} is not a valid person.`))
        }
        return resolve(stubs[name])
      }, 50)
    })
  }
}

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

  // This is an example of the state of an asynchronous request state owned by the <AsyncEffects /> component.
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

  // This is an example to handle the change of an asynchronous piece of state owned by a child component.
  // I am not sure yet what are the benefits of one over the other.
  showBestFriend = (name, stateUpdater) => {
    const fn = new AsyncFn()
    stateUpdater(fn.toPending(name))

    fakeApi.getBestFriend(name)
      .then(result => stateUpdater(fn.toOk(result)))

    // this.setState(prevState => ({showPersonState: prevState.showPersonState.toPending(name)}))

    //     fakeApi.getByName(name)
    //       .then(result => {
    //         this.setState(prevState => ({showPersonState: prevState.showPersonState.toOk(result)}))
    //       })
    //       .catch(error => {
    //         this.setState(prevState => ({
    //           initialAction: prevState.showPersonState.toFailure(error.message)
    //         }))
    //       })
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
