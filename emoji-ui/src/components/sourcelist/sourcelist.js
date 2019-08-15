import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import SourceEmojiActions from '../../store/actions/source_emoji';
import { uiFriendlyEmojiListSelector } from '../../store/selectors/source_emoji';

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
    const firstTwenty = sourceEmoji.slice(0, 20);
    return <h1>{JSON.stringify(firstTwenty)}</h1>;
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
