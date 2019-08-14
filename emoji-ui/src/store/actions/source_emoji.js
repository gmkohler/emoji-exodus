import ActionTypes from '../action_types';
import { fetchSourceEmoji } from '../../network/source';

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
      payload: fetchSourceEmoji(),
    });
  };
}

export default { filterBy, loadSourceEmoji };