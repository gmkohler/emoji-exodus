import ActionTypes from '../action_types';

/**
 * Stores map of all emoji from the source.
 */
export default function sourceEmoji(state = { list: [] }, action) {
  console.log(action);
  switch (action.type) {
    case ActionTypes.LOAD_SOURCE_EMOJI_FULFILLED:
      return { list: _formatToList(action.payload) };
    default:
      return state;
  }
}

function _formatToList(emojiMap) {
  return Object.keys(emojiMap).sort().map(name => {
    return { name, url: emojiMap[name] };
  });
}
