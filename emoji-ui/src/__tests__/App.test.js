import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';

describe('component: app', () => {
  let testContainer;

  beforeEach(() => {
    testContainer = document.createElement('div');
    ReactDOM.render(<App />, testContainer);
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(testContainer);
  });

  it('renders the header', () => {
    const header = testContainer.querySelector('h1');
    expect(header.textContent).toBe('Emoji Transfer Ui');
  });
});
