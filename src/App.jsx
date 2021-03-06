import React from 'react'
import './App.css'
import {hot} from 'react-hot-loader'
import TemplatePage from './Template/Page'

const App = () => (
  <div className="App">
    <header className="App-header">
      <h1 className="App-title">React Architecture Demo</h1>
    </header>
    <div className="App-intro">
      {/*

      Let's say that this part of the app is your main layout,
      where the navbar will be rendered.
      There might be some state, like an authenticated user,
      or preferences, or any other state, but this is a problem
      for another day.

      */}
      <p>
        In an attempt to find a standard that works well for me in React,
        I have put together this little demo app.
      </p>
      <p>
        The interesting bits are in the code and can be used to kickstart
        any new page or component you might need.
      </p>
    </div>
    <TemplatePage />
  </div>
)

export default hot(module)(App)
