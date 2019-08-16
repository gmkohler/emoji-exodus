import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import SourceEmojiActions from '../store/actions/SourceEmoji';
import { uiFriendlyEmojiListSelector } from '../store/selectors/SourceEmoji';
import EmojiList from './EmojiList';

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
      selectEmoji: PropTypes.func.isRequired,
    }).isRequired,
  };

  componentDidMount() {
    this.props.sourceEmojiActions.loadSourceEmoji();
  }

  render() {
    const { sourceEmoji, sourceEmojiActions } = this.props;
    const firstBatch = sourceEmoji.slice(0, 200);
    return <EmojiList sourceEmojiActions={sourceEmojiActions} sourceEmoji={firstBatch} />;
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
