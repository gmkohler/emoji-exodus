import { combineReducers } from 'redux';
import sourceEmoji from './SourceEmoji';
import pagination from './Pagination';
import setApiTokens from './SetApiTokens';

export default combineReducers({ sourceEmoji, pagination, setApiTokens });
