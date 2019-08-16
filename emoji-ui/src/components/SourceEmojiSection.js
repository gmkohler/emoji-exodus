import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import EmojiList from './EmojiList';
import Pagination from './Pagination';
import SourceEmojiActions from '../store/actions/SourceEmoji';
import './SourceEmojiSection.css';

class SourceEmojiSectionBase extends Component {
  static propTypes = {
    transferSelectedEmoji: PropTypes.func.isRequired,
  };

  render() {
    const { transferSelectedEmoji } = this.props;

    return (
      <div>
        <h2>Source Emoji List</h2>
        <button onClick={transferSelectedEmoji}>Transfer Selected Emoji</button>
        <EmojiList />
        <Pagination />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    transferSelectedEmoji: bindActionCreators(SourceEmojiActions.transferSelectedEmoji, dispatch),
  };
}

export default connect(
  null,
  mapDispatchToProps
)(SourceEmojiSectionBase);
