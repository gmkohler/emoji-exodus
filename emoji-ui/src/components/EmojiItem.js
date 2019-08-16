import PropTypes from 'prop-types';
import React, { Component } from 'react';
import './EmojiItem.css';

export default class EmojiItem extends Component {
  static propTypes = {
    isSelected: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired,
    url: PropTypes.string.isRequired,
  };

  constructor() {
    super(...arguments);
    this._onSelect = this._onSelect.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return Object.entries(this.props).some(([key, val]) => nextProps[key] !== val);
  }

  _onSelect() {
    const { isSelected, name, onSelect } = this.props;
    onSelect(name, !isSelected);
  }

  render() {
    const { isSelected, name, url } = this.props;
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
          style={styles}
          title={name}>
        </button>
      </div>
    );
  }
}
