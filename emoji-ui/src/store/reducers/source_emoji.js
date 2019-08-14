import ActionTypes from '../action_types';

const DEFAULT_STATE = {
  filterStr: '',
  list: []
};

/**
 * Stores map of all emoji from the source.
 */
export default function sourceEmoji(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case ActionTypes.LOAD_SOURCE_EMOJI_FULFILLED:
      return { ...state, list: _formatToList(action.payload) };
    case ActionTypes.SET_SOURCE_EMOJI_FILTER_STRING:
      return { ...state, filterStr: action.payload.filterStr };
    default:
      return state;
  }
}

function _formatToList(emojiMap) {
  return Object.keys(emojiMap).sort().map(name => {
    return { name, url: emojiMap[name] };
  });
}
