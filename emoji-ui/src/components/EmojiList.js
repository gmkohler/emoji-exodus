import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import EmojiItem from './EmojiItem';
import SourceEmojiActions from '../store/actions/SourceEmoji';
import { currentPageEmojiListSelector } from '../store/selectors/SourceEmoji';
import './EmojiList.css';

class EmojiListBase extends Component {
  static propTypes = {
    loadSourceEmoji: PropTypes.func.isRequired,
    selectEmoji: PropTypes.func.isRequired,
    sourceEmoji: PropTypes.arrayOf(
      PropTypes.shape({
        isSelected: PropTypes.bool,
        name: PropTypes.string,
        url: PropTypes.string,
      })
    ).isRequired,
  };

  componentDidMount() {
    this.props.loadSourceEmoji();
  }

  render() {
    const { selectEmoji, sourceEmoji } = this.props;

    return (
      <div className="emoji-list-container">
        {sourceEmoji.map(emoji => (
          <EmojiItem {...emoji} key={emoji.name} onSelect={selectEmoji} />
        ))}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { sourceEmoji: currentPageEmojiListSelector(state) };
}

function mapDispatchToProps(dispatch) {
  return {
    loadSourceEmoji: bindActionCreators(SourceEmojiActions.loadSourceEmoji, dispatch),
    selectEmoji: bindActionCreators(SourceEmojiActions.selectEmoji, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmojiListBase);
