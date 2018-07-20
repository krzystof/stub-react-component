import React, { Component } from 'react';
import './App.css';
import DemoPage from './Demo/Page'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">React Architecture Demo</h1>
        </header>
        <div className="Content">
          {/*

            Let's say that this part of the app is your main layout,
            where the navbar will be rendered.
            There might be some state, like an authenticated user,
            or preferences, or any other state, but this is a problem
            for another day.

          */}
          <p>
            In an attempt to find a standard that works well for me in React,
            I have put together this repository.
          </p>
          <DemoPage />
        </div>
      </div>
    );
  }
}

export default App;
