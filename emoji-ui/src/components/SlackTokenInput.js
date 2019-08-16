import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import TokenActions from '../store/actions/SetApiTokens';
import './SlackTokenInput.css';

class SlackTokenInput extends Component {
  static propTypes = {
    sourceToken: PropTypes.string.isRequired,
    destinationToken: PropTypes.string.isRequired,
    tokenActions: PropTypes.shape({
      setApiTokens: PropTypes.func.isRequired,
    }).isRequired,
  };

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
    const { setApiTokens } = this.props.tokenActions;
    setApiTokens(this.state.sourceSlackApiKey, this.state.destinationSlackApiKey);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="token-input-form">
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
          while inspecting the &quot;customize slack&quot; webpage of a slack
          instance. They should start with xoxs-*.
        </small>

        <input className="token-input-submit" type="submit" value="Save API Tokens" />
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    sourceToken: state.setApiTokens.sourceToken,
    destinationToken: state.setApiTokens.destinationToken,
  };
}

function mapDispatchToProps(dispatch) {
  return { tokenActions: bindActionCreators(TokenActions, dispatch) };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SlackTokenInput);
