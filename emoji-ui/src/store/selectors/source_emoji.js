import { createSelector } from 'reselect';

const sourceEmojiListSelector = state => state.sourceEmoji.list;
const sourceEmojiFilterStringSelector = state => state.sourceEmoji.filterStr;
const sourceEmojiSelectionMapSelector = state => state.sourceEmoji.selectionMap;

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

export { uiFriendlyEmojiListSelector };
