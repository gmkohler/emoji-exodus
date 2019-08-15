import PropTypes from 'prop-types';
import React, { Component } from 'react';
import EmojiItem from './emojiItem';
import './emojiList.css';

class EmojiList extends Component {
  static propTypes = {
    sourceEmoji: PropTypes.arrayOf(
      PropTypes.shape({
        isSelected: PropTypes.bool,
        name: PropTypes.string,
        url: PropTypes.string,
      })
    ).isRequired,
    clickHandler: PropTypes.func,
  };

  render() {
    const { sourceEmoji } = this.props;
    const emojiListItem = sourceEmoji.map((emoji) => {
      return <EmojiItem key={emoji.name} emoji={emoji} clickHandler={this.clickHandler} />
    })
    return <div className="emoji-list-container">{emojiListItem}</div>
  }
}

export default EmojiList;
