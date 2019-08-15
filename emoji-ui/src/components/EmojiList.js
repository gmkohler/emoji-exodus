import PropTypes from 'prop-types';
import React, { Component } from 'react';
import EmojiItem from './EmojiItem';
import './EmojiList.css';

class EmojiList extends Component {
  static propTypes = {
    sourceEmoji: PropTypes.arrayOf(
      PropTypes.shape({
        isSelected: PropTypes.bool,
        name: PropTypes.string,
        url: PropTypes.string,
      })
    ).isRequired,
    sourceEmojiActions: PropTypes.shape({
      selectEmoji: PropTypes.func.isRequired,
    }).isRequired,
  };

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

export default EmojiList;
