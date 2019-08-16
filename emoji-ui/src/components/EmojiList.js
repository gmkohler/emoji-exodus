import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import SourceEmojiActions from '../store/actions/SourceEmoji';
import { currentPageEmojiListSelector } from '../store/selectors/SourceEmoji';
import EmojiItem from './EmojiItem';
import './EmojiList.css';

class EmojiListBase extends Component {
  static propTypes = {
    sourceEmoji: PropTypes.arrayOf(
      PropTypes.shape({
        isSelected: PropTypes.bool,
        name: PropTypes.string,
        url: PropTypes.string,
      })
    ).isRequired,
    sourceEmojiActions: PropTypes.shape({
      loadSourceEmoji: PropTypes.func.isRequired,
      selectEmoji: PropTypes.func.isRequired,
    }).isRequired,
  };

  componentDidMount() {
    this.props.sourceEmojiActions.loadSourceEmoji();
  }

  render() {
    const { sourceEmoji, sourceEmojiActions } = this.props;
    const { selectEmoji } = sourceEmojiActions;

    const emojiListItem = sourceEmoji.map((emoji) => {
      return (
        <EmojiItem key={emoji.name} emoji={emoji} onSelect={selectEmoji} />
      );
    });
    return <div className="emoji-list-container">{emojiListItem}</div>
  }
}

function mapStateToProps(state) {
  return { sourceEmoji: currentPageEmojiListSelector(state) };
}

function mapDispatchToProps(dispatch) {
  return { sourceEmojiActions: bindActionCreators(SourceEmojiActions, dispatch) };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmojiListBase);
