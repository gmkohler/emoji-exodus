import ActionTypes from '../ActionTypes';

function setCurrentPage(pageNum) {
  return {
    payload: parseInt(pageNum || 0),
    type: ActionTypes.SET_CURRENT_PAGE,
  };
}

export default { setCurrentPage };
