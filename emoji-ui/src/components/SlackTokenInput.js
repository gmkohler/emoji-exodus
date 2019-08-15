import React, { Component } from 'react';
import './SlackTokenInput.css';

class SlackTokenInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sourceSlackApiKey: '',
      destinationSlackApiKey: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(e) {
    const name = e.target.name;
    this.setState({
      [name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    // saving doesn't actually do anything yet!
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label className="token-input-section">
          Source Slack Api Key
          <input
            className="token-input-input"
            type="text"
            name="sourceSlackApiKey"
            value={this.state.sourceSlackApiKey}
            onChange={this.handleInputChange}
          />
        </label>

        <label className="token-input-section">
          Destination Slack Api Key
          <input
            className="token-input-input"
            type="text"
            name="destinationSlackApiKey"
            value={this.state.destinationSlackApiKey}
            onChange={this.handleInputChange}
          />
        </label>

        <small className="token-input-help-text">
          API keys can be found under window.TS.boot_data.api_token
          while inspecting the "customize slack" webpage of a slack
          instance. They should start with xoxs-*.
        </small>

        <input className="token-input-submit" type="submit" value="Save" />
      </form>
    );
  }
}

export default SlackTokenInput;
