import React from 'react'
import PropTypes from 'prop-types'

const AsyncAction = ({subject, when, children}) => (
  subject.status === when
    ? children(subject.payload)
    : null
)

const StatsUi = ({
  state,
  username,
  loadUsernameState,
  onLoadUsername,
  searchTerm,
  changeSearchTerm,
}) => {
  console.log(loadUsernameState.current(), loadUsernameState.data())
  return (
    <div>
      <div>
        Hey! {loadUsernameState.whenOk(({data}) => data.username) || username}
      </div>
      <div>
        <button type="button" onClick={onLoadUsername}>Load another</button>
      </div>

      {loadUsernameState.whenPending(<div>LOADING USERNAME</div>)}

      {loadUsernameState.whenFailure(({message}) => (
          <div>Something went... bad... {message}</div>
      ))}

      <div>
        <p>This is a test for some synchronous events:</p>
        <label>Search</label>
        <input type="text" value={searchTerm} onChange={changeSearchTerm}/>
        <h2>{searchTerm}</h2>
      </div>
    </div>
  )
}

export default StatsUi
