import { selectedEmojiNameSelector, uiFriendlyEmojiListSelector } from '../../../store/selectors/SourceEmoji';

describe('selectors: SourceEmoji', () => {
  let store;

  beforeEach(() => {
    const sourceEmoji = {
      filterStr: '',
      list: [
        { name: 'chai', url: 'teapot.jpg' },
        { name: 'earl-grey', url: 'nom-nom-boba.png' },
        { name: 'jasmine', url: 'floral-pretty.png' },
      ],
      selectionMap: { chai: false, jasmine: true },
    };
    store = { sourceEmoji };
  });

  describe('selectedEmojiNameSelector', () => {
    it('passes an empty string if there are no selected names', () => {
      store.sourceEmoji.selectionMap = {};
      expect(selectedEmojiNameSelector(store)).toEqual([]);
    });

    it('passes all selected names when there is a selection', () => {
      store.sourceEmoji.selectionMap = { chai: true, jasmine: true };
      expect(selectedEmojiNameSelector(store)).toEqual(['chai', 'jasmine']);
    });
  });

  describe('uiFriendlyEmojiListSelector', () => {
    it('makes a pretty array', () => {
      const result = uiFriendlyEmojiListSelector(store);
      expect(result).toEqual([
        { isSelected: false, name: 'chai', url: 'teapot.jpg' },
        { isSelected: false, name: 'earl-grey', url: 'nom-nom-boba.png' },
        { isSelected: true, name: 'jasmine', url: 'floral-pretty.png' },
      ]);
    });

    it('allows for filtering by name', () => {
      store.sourceEmoji.filterStr = "asmi";
      const result = uiFriendlyEmojiListSelector(store);
      expect(result).toEqual([
        { isSelected: true, name: 'jasmine', url: 'floral-pretty.png' },
      ]);
    });

    it('allows for filtering by special characters', () => {
      store.sourceEmoji.filterStr = "a.*i";
      const result = uiFriendlyEmojiListSelector(store);
      expect(result).toEqual([
        { isSelected: false, name: 'chai', url: 'teapot.jpg' },
        { isSelected: true, name: 'jasmine', url: 'floral-pretty.png' },
      ]);
    });
  });
});
