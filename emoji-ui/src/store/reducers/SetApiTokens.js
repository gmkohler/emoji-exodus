import ActionTypes from '../ActionTypes';

const DEFAULT_STATE = {
  sourceToken: '',
  destinationToken: ''
};

export default function setApiTokens(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case ActionTypes.SET_API_TOKENS:
      return {
        ...state,
        sourceToken: action.payload.sourceToken,
        destinationToken: action.payload.destinationToken
      };
    default:
      return state;
  }
}
