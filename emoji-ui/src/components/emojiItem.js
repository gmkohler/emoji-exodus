import PropTypes from 'prop-types';
import React, { Component } from 'react';
import './emojiItem.css';

class EmojiItem extends Component {
  static propTypes = {
    emoji: PropTypes.shape({
      isSelected: PropTypes.bool,
      name: PropTypes.string,
      url: PropTypes.string,
    }),
    clickHandler: PropTypes.func,
  };

  render() {
    const { clickHandler } = this.props;
    const { isSelected, url, name } = this.props.emoji;
    const styles = { backgroundImage: `url(${url})` };
    const containerClasses = `emoji-container${isSelected ? ' emoji-container--selected' : ''}`;

    return (
      <div className={containerClasses}>
        <button style={styles} className='emoji-item' onClick={() => clickHandler(name)}></button>
      </div>
    );
  }
}

export default EmojiItem;
