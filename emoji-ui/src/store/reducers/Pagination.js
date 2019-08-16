import ActionTypes from '../ActionTypes';

const DEFAULT_STATE = {
  currentPage: 1,
  pageItemLimit: 50,
};

/**
 * Set currentPage
 */
export default function sourceEmoji(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case ActionTypes.SET_CURRENT_PAGE:
      return { ...state, currentPage: action.payload };
    default:
      return state;
  }
}
