import PropTypes from 'prop-types';
import React, { Component } from 'react';
import './EmojiItem.css';

class EmojiItem extends Component {
  static propTypes = {
    emoji: PropTypes.shape({
      isSelected: PropTypes.bool.isRequired,
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }).isRequired,
    onSelect: PropTypes.func.isRequired,
  };

  constructor() {
    super(...arguments);
    this._onSelect = this._onSelect.bind(this);
  }

  _onSelect() {
    const { emoji, onSelect } = this.props;
    onSelect(emoji.name, !emoji.isSelected);
  }

  render() {
    const { isSelected, name, url } = this.props.emoji;
    const styles = { backgroundImage: `url(${url})` };
    let containerClasses = 'emoji-container';
    if (isSelected) {
      containerClasses += ` ${containerClasses}--selected`;
    }
    const ariaLabel = `Emoji ${name}`;

    return (
      <div className={containerClasses}>
        <button
          alia-label={ariaLabel}
          className="emoji-item"
          onClick={this._onSelect}
          style={styles}>
        </button>
      </div>
    );
  }
}

export default EmojiItem;
