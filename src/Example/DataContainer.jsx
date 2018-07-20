import {Component} from 'react'

/**
If using the reducer pattern, we can
define an object holding all the available
messages we can dispatch.
**/
const Msg = {
  ChangeSearchTerm: 'ChangeSearchTerm',
}

class DataContainer extends Component {
  state = {
    ...this.props.initialState,
    searchTerm: '',
  }

  /**
  That's the usual form of handlers.
  Just do what you gotta do here.
  **/
  toggleIsCool = event => {
    event.preventDefault()
    this.setState(state => ({isCool: !state.isCool}))
  }

  /**
  Using a reducer a la Redux.
  I like the Msg separation, but I am not sure it's really easier to
  read At least there is only one place to check for to see how the
  state can be updated an in which way.
  **/
  changeSearchTerm = event => this.update(Msg.ChangeSearchTerm, event.target.value)

  update = (msg, payload) => {
    const handleMsg = {
      ChangeSearchTerm: (state, newTerm) => ({...state, searchTerm: newTerm}),
    }

    this.setState(prevState => handleMsg[msg](prevState, payload))
  }

  /**
  Render the children and pass all
  the state and handlers as props.
  **/
  render() {
    return this.props.children({
      ...this.state,
      toggleIsCool: this.toggleIsCool,
      changeSearchTerm: this.changeSearchTerm
    })
  }
}

export default DataContainer
