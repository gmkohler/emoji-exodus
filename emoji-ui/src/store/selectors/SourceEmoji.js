import { createSelector } from 'reselect';

const sourceEmojiListSelector = state => state.sourceEmoji.list;
const sourceEmojiFilterStringSelector = state => state.sourceEmoji.filterStr;
const sourceEmojiSelectionMapSelector = state => state.sourceEmoji.selectionMap;

const currentPage = state => state.pagination.currentPage;
const pageItemLimit = state => state.pagination.pageItemLimit;

/**
 * Filters the ui-friendly list based on a string.
 */
const filteredEmojiSelector = createSelector(
  sourceEmojiListSelector,
  sourceEmojiFilterStringSelector,
  (list, filterStr) => {
    if (!filterStr) {
      return list;
    }

    const regex = new RegExp(filterStr);
    return list.filter(item => item.name.match(regex));
  }
);

/**
 * Creates a simple array of all names of selected emoji.
 */
const selectedEmojiNameSelector = createSelector(
  sourceEmojiListSelector,
  sourceEmojiSelectionMapSelector,
  (list, selectionMap) => {
    return list.filter(item => selectionMap[item.name]).map(i => i.name);
  }
);

/**
 * Adds ui-related metadata to the list, such as whether an item was selected.
 */
const uiFriendlyEmojiListSelector = createSelector(
  filteredEmojiSelector,
  sourceEmojiSelectionMapSelector,
  (list, selectionMap) => {
    return list.map(({ name, url }) => {
      const isSelected = !!selectionMap[name];
      return { isSelected, name, url };
    });
  }
);

/**
 * Get the current page list
 */
const currentPageEmojiListSelector = createSelector(
  currentPage,
  pageItemLimit,
  uiFriendlyEmojiListSelector,
  (currentPage, pageItemLimit, list) => {
    const startIdx = (currentPage - 1) * pageItemLimit;
    return list.slice(startIdx, startIdx + pageItemLimit);
  }
);

export { selectedEmojiNameSelector, uiFriendlyEmojiListSelector, currentPageEmojiListSelector };
