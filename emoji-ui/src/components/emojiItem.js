import PropTypes from 'prop-types';
import React, { Component } from 'react';
import './emojiItem.css';

class EmojiItem extends Component {
  static propTypes = {
    isSelected: PropTypes.bool.isRequired,
    url: PropTypes.string.isRequired,
    clickHandler: PropTypes.func.isRequired.isRequired,
  };

  render() {
    const { isSelected, url, clickHandler } = this.props;
    const styles = { backgroundImage: `url(${url})` };
    const containerClasses = `Emoji-container${isSelected ? ' Emoji-container-selected' : ''}`;

    return (
      <div className={containerClasses}>
        <button style={styles} className='Emoji-item' onClick={clickHandler}></button>
      </div>
    );
  }
}

export default EmojiItem;
