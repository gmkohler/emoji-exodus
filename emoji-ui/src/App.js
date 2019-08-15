import React from 'react';
import { Provider } from 'react-redux';

import store from './store';
import './App.css';

import SlackTokenInput from './components/SlackTokenInput';
import SourceList from './components/SourceList/SourceList';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>Emoji Transfer Ui</h1>
        <SlackTokenInput />
        <SourceList />
      </div>
    </Provider>
  );
}

export default App;
