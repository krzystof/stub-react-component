import React from 'react'

/**

Asynchronous Stuff
==================

I am still not sure how to handle this.
There is the case for the initial request,
which is ok because the lifecycle is resolved
in this class and the children is only rendered
on success.

But somehow, for example in our case when we
fetch a new username, I need to be able to
act on my UI based on this information.

I wanna make this file as generic as possible.



// @TODO
// THERE SHOULD BE NO REASON TO MODIFY THIS COMPONENT.
// to do this, I must keep only 2 things here: an onLoad props
// and an array of props that accept all our async callbacks.

**/

class AsyncActions extends React.Component {
  state = {
    initialAction: {status: 'wait'},
    loadUsernameState: {status: 'wait'},
  }

  componentDidMount = () => {
    this.setState({initialAction: {status: 'loading'}})

    this.props.onLoad()
      .then(result => {
        this.setState(() => ({initialAction: {status: 'ok', payload: result}}))
      })
      .catch(error => {
        this.setState(state => ({initialAction: {status: 'failure', payload: error}}))
      })
  }

  onLoadUsername = stateUpdater => {
    stateUpdater({status: 'pending'})

    this.props.onLoadUsername()
      .then(result => stateUpdater({status: 'ok', payload: result}))
      .catch(error => stateUpdater({status: 'failure', payload: error}))
  }

  render() {
    const {status, payload} = this.state.initialAction

    console.log('In AsyncActions', this.state.loadUsernameState.status)

    if (status === 'ok') {
      return this.props.children({
        ...payload,
        loadUsernameState: this.state.loadUsernameState,
      }, {
        loadUsername: this.onLoadUsername,
      })
    }

    if (status === 'loading') {
      return <div>Loading...</div>
    }

    if (status === 'failure') {
      return <div>Error! This happened: {payload.message}</div>
    }

    return null
  }
}

export default AsyncActions
