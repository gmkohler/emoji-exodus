import ActionTypes from '../ActionTypes';

function setCurrentPage(pageNum) {
  return {
    payload: pageNum, // callers must sanitize pageNum
    type: ActionTypes.SET_CURRENT_PAGE,
  };
}

export default { setCurrentPage };
