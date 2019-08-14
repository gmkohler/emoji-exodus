import { createSelector } from 'reselect';

const sourceEmojiListSelector = state => state.sourceEmoji.list;
const sourceEmojiFilterStringSelector = state => state.sourceEmoji.filterStr;

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

export { filteredEmojiSelector };
