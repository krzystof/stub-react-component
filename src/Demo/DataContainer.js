import React, {Component} from 'react'

/**

State Management
================

This Container component will contain quite a bit of logic as it hold
the state and how it updates depending on what's going on in the app.



Reasons to change:

Adding a new feature, changing the behaviour or the shape of the data,
... Loads in fact.
BUT it should not change if we change the UI, refactor the markup, and so on.
AND it should not change if we add another async functions that the UI can dispatch.




// @TODO
  // Is it possible to use a state reducer pattern?
  // Is it possible to forward asynchronous callbacks to the UI without changing stuff here?

**/


class DataContainer extends Component {
  state = {
    ...this.props.initialState,
    searchTerm: '',
  }

  loadUsername = () => {
    //
    // That's how we handle an asynchronous thing.
    // Run the async function and give it a callback
    // that explains how the state should be updated.
    //
    // The responsibility of the async function is then
    // just to track the lifecycle of the request and
    // execute the callback whenever something changes.
    //
    // By doing this, we keep this class pure (we can
    // pass a fake "loadUsername" function for testing).
    //
    this.props.loadUsername(loadUsernameState => {
        return this.setState(state => ({loadUsernameState}))
    })
  }

  changeSearchTerm = event => {
    event.preventDefault()
    this.setState({searchTerm: event.target.value})
  }

  render() {
    return this.props.children({
      ...this.state,
      changeSearchTerm: this.changeSearchTerm,
      onLoadUsername: this.loadUsername,
    })
  }
}

export default DataContainer
