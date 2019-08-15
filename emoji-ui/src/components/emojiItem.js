import PropTypes from 'prop-types';
import React, { Component } from 'react';
import './EmojiItem.css';

class EmojiItem extends Component {
  static propTypes = {
    isSelected: PropTypes.bool.isRequired,
    url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    clickHandler: PropTypes.func.isRequired,
  };

  render() {
    const { isSelected, url, name, clickHandler } = this.props;
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
