import ActionTypes from '../ActionTypes';

function setApiTokens(sourceToken, destinationToken) {
  return {
    payload: { sourceToken, destinationToken },
    type: ActionTypes.SET_API_TOKENS
  };
}

export default {
  setApiTokens
};
