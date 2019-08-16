import React from 'react';
import { Provider } from 'react-redux';

import store from './store';
import './App.css';

import SlackTokenInput from './components/SlackTokenInput';
import EmojiList from './components/EmojiList';
import Pagination from './components/Pagination';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>Emoji Transfer Ui</h1>
        <SlackTokenInput />
        <EmojiList />
        <Pagination />
      </div>
    </Provider>
  );
}

export default App;
