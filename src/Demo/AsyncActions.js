import React from 'react'
import PossibleStates from 'possible-states'

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

const asyncAction = PossibleStates(
  'wait',
  'pending',
  'ok<data>',
  'failure<error>',
)

class AsyncActions extends React.Component {
  state = {
    initialAction: {status: 'wait'},
    loadUsernameState: asyncAction.toWait(),
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
      return <div>Loading...</div>
    }

    if (status === 'failure') {
      return <div>Error! This happened: {payload.message}</div>
    }

    return null
  }
}

export default AsyncActions
