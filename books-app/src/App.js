import React, { Component } from 'react';
import './App.css';
import BookList from './components/BookList'
import { usePromiseTracker } from 'react-promise-tracker';
import Loader from 'react-promise-loader';

class App extends Component {

  render() {
    return (
      <div className="App">
        <BookList/>
        <Loader promiseTracker={usePromiseTracker} color={'#3d5e61'} background={'rgba(255,255,255,.5)'} />
      </div>
    );
  }
}

export default App;
