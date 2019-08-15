import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import SourceEmojiActions from '../../store/actions/source_emoji';
import { uiFriendlyEmojiListSelector } from '../../store/selectors/source_emoji';
import EmojiList from '../emojiList';

class SourceListBase extends Component {
  static propTypes = {
    sourceEmoji: PropTypes.arrayOf(
      PropTypes.shape({
        isSelected: PropTypes.bool,
        name: PropTypes.string,
        url: PropTypes.string,
      })
    ),
    sourceEmojiActions: PropTypes.shape({
      loadSourceEmoji: PropTypes.func.isRequired,
    }).isRequired,
  };

  componentDidMount() {
    this.props.sourceEmojiActions.loadSourceEmoji();
  }

  render() {
    const { sourceEmoji } = this.props;
    const firstBatch = sourceEmoji.slice(0, 200);
    return <EmojiList sourceEmoji={firstBatch} />;
  }
}


function mapStateToProps(state) {
  return { sourceEmoji: uiFriendlyEmojiListSelector(state) };
}

function mapDispatchToProps(dispatch) {
  return { sourceEmojiActions: bindActionCreators(SourceEmojiActions, dispatch) };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SourceListBase);
