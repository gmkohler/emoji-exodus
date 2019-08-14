import React from 'react';
import { Provider } from 'react-redux';

import store from './store';
import './App.css';

import SourceList from './components/sourcelist/sourcelist';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>Emoji Transfer Ui</h1>
        <SourceList />
      </div>
    </Provider>
  );
}

export default App;
