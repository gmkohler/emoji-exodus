import ActionTypes from '../ActionTypes';
import * as Network from '../../network/Source';
import { selectedEmojiNameSelector } from '../selectors/SourceEmoji';

function filterBy(filterStr) {
  return {
    payload: { filterStr },
    type: ActionTypes.SET_SOURCE_EMOJI_FILTER_STRING,
  };
}

function loadSourceEmoji() {
  return dispatch => {
    dispatch({
      type: ActionTypes.LOAD_SOURCE_EMOJI,
      payload: Network.fetchSourceEmoji(),
    });
  };
}

function selectEmoji(emojiName, isSelected) {
  return {
    payload: { emojiName, isSelected },
    type: ActionTypes.SELECT_SOURCE_EMOJI,
  };
}

function transferSelectedEmoji() {
  return (dispatch, getState) => {
    const emojiNames = selectedEmojiNameSelector(getState());
    dispatch({
      type: ActionTypes.TRANSFER_SELECTED_EMOJI,
      payload: Network.transferSourceEmojiToDestination(emojiNames),
    });
  };
}

export default {
  filterBy,
  loadSourceEmoji,
  selectEmoji,
  transferSelectedEmoji,
};
