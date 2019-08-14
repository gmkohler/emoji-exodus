import ActionTypes from '../action_types';
import { fetchSourceEmoji } from '../../network/source';

function loadSourceEmoji() {
  return dispatch => {
    dispatch({
      type: ActionTypes.LOAD_SOURCE_EMOJI,
      payload: fetchSourceEmoji(),
    });
  };
}

export default { loadSourceEmoji };