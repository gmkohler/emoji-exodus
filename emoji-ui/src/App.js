import React from 'react';
import { Provider } from 'react-redux';

import store from './store';
import './App.css';

import SlackTokenInput from './components/SlackTokenInput';
import SourceEmojiSection from './components/SourceEmojiSection';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>Emoji Transfer Ui</h1>
        <SlackTokenInput />
        <SourceEmojiSection />
      </div>
    </Provider>
  );
}

export default App;
