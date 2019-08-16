import { createSelector } from 'reselect';
import { uiFriendlyEmojiListSelector } from './SourceEmoji';

const pageItemLimit = state => state.pagination.pageItemLimit;

/**
 * Calculate total page number
 */
const totalPageNumberSelector = createSelector(
  uiFriendlyEmojiListSelector,
  pageItemLimit,
  (list, pageItemLimit) => {
    return Math.ceil(list.length / pageItemLimit);
  }
);

export { totalPageNumberSelector };
