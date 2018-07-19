import React from 'react'
import PropTypes from 'prop-types'

const AsyncAction = ({subject, when, children}) => (
  subject.status === when
    ? children(subject.payload)
    : null
)

const StatsUi = ({state, username, loadUsernameState, onLoadUsername}) => {
  return (
    <div>
      <div>
        Hey! {loadUsernameState.status === 'ok' ? loadUsernameState.payload.username : username}!
      </div>
      <div>
        <button type="button" onClick={onLoadUsername}>Load another</button>
      </div>
      <AsyncAction subject={loadUsernameState} when="failure">
        {(error) => (
          <div>Something went... bad... {error.message}</div>
        )}
      </AsyncAction>
      <AsyncAction subject={loadUsernameState} when="pending">
        {() => (
          <div>LOADING USERNAME...</div>
        )}
      </AsyncAction>
    </div>
  )
}

export default StatsUi
