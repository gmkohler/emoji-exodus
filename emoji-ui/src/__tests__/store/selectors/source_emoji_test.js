import { uiFriendlyEmojiListSelector } from '../../../store/selectors/source_emoji';

describe('selectors: source emoji', () => {
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
