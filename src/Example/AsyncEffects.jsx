import React from 'react'
import {AsyncFn} from './utils'

const fakeApi = {
  fetchAll() {
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
    return Promise.resolve(stubs[name])
  }
}

class AsyncEffects extends React.Component {
  state = {
    initialAction: new AsyncFn(),
    showPersonState: new AsyncFn(),
  }

  componentDidMount = () => {
    this.setState(prevState => ({initialAction: prevState.initialAction.toPending()}))

    fakeApi.fetchAll()
      .then(result => {
        this.setState(prevState => ({initialAction: prevState.initialAction.toOk(result)}))
      })
    //   .catch(error => {
    //     this.setState(state => ({initialAction: {status: 'failure', payload: error}}))
    //   })
  }

  showPerson = name => () => {
    this.setState(prevState => ({showPersonState: prevState.showPersonState.toPending(name)}))

    fakeApi.getByName(name)
      .then(result => {
        this.setState(prevState => ({showPersonState: prevState.showPersonState.toOk(result)}))
      })
  }

  // onLoadUsername = stateUpdater => {
  //   stateUpdater(asyncAction.toPending())

  //   this.props.onLoadUsername()
  //     .then(result => stateUpdater(asyncAction.toOk(result)))
  //     .catch(error => stateUpdater(asyncAction.toFailure(error)))
  // }

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
      })
    })

    if (okContent) {
      return okContent
    }

    // if (status === 'failure') {
    //   return (
    //     <div>
    //       Error! This happened:
    //       {payload.message}
    //     </div>
    //   )
    // }

    return null
  }
}

export default AsyncEffects
