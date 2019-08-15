import ActionTypes from '../../../store/ActionTypes';
import sourceEmoji from '../../../store/reducers/SourceEmoji';

const SAMPLE_EMOJI_PAYLOAD = Object.freeze({
  'earl-grey': 'nom-nom-boba.png',
  'jasmine': 'floral-pretty.png',
  'chai': 'teapot.jpg',
});

describe('reducers: SourceEmoji', () => {
  it('has a default empty list of emoji', () => {
      const store = sourceEmoji(undefined, { type: 'NOT_A_REAL_ACTION' });
      expect(store.list).toEqual([]);
  });

  describe('LOAD_SOURCE_EMOJI_FULFILLED', () => {
    it('stores loaded emoji', () => {
      const action = { type: ActionTypes.LOAD_SOURCE_EMOJI_FULFILLED, payload: SAMPLE_EMOJI_PAYLOAD };
      const store = sourceEmoji(undefined, action);
      expect(store.list).toEqual([
        { name: 'chai', url: 'teapot.jpg' },
        { name: 'earl-grey', url: 'nom-nom-boba.png' },
        { name: 'jasmine', url: 'floral-pretty.png' },
      ]);
    });
  });

  describe('SELECT_SOURCE_EMOJI', () => {
    let startingStore;

    beforeEach(() => {
      const action = { type: ActionTypes.LOAD_SOURCE_EMOJI_FULFILLED, payload: SAMPLE_EMOJI_PAYLOAD };
      startingStore = sourceEmoji(undefined, action);
    });

    it('starts with nothing selected', () => {
      expect(startingStore.selectionMap).toEqual({});
    });

    it('records emoji selection', () => {
      const action = {
        type: ActionTypes.SELECT_SOURCE_EMOJI,
        payload: { emojiName: 'jasmine', isSelected: true },
      };
      const store = sourceEmoji(startingStore, action);
      expect(store.selectionMap).toEqual({ jasmine: true });
    });

    it('does nothing to already-selected emoji', () => {
      const action = {
        type: ActionTypes.SELECT_SOURCE_EMOJI,
        payload: { emojiName: 'jasmine', isSelected: true },
      };
      const midStore = sourceEmoji(startingStore, action);
      const finalStore = sourceEmoji(midStore, action);
      expect(finalStore.selectionMap).toEqual({ jasmine: true });
    });

    it('allows multiple emoji to be selected', () => {
      const type = ActionTypes.SELECT_SOURCE_EMOJI;
      let payload = { emojiName: 'jasmine', isSelected: true };
      const midStore = sourceEmoji(startingStore, { type, payload });

      payload = { emojiName: 'earl-grey', isSelected: true };
      const finalStore = sourceEmoji(midStore, { type, payload });
      expect(finalStore.selectionMap).toEqual({ 'earl-grey': true, jasmine: true });
    });

    it('allows emoji deselection', () => {
      const type = ActionTypes.SELECT_SOURCE_EMOJI;
      const actionAdd1 = { type,  payload: { emojiName: 'jasmine', isSelected: true } };
      const actionAdd2 = { type,  payload: { emojiName: 'chai', isSelected: true } };
      const actionRem1 = { type,  payload: { emojiName: 'jasmine', isSelected: false } };
      const actionRem2 = { type,  payload: { emojiName: 'chai', isSelected: false } };
      const actionRem3 = { type,  payload: { emojiName: 'earl-grey', isSelected: false } };

      let store = sourceEmoji(startingStore, actionAdd1);
      store = sourceEmoji(store, actionAdd2);
      expect(store.selectionMap).toEqual({ chai: true, jasmine: true });

      store = sourceEmoji(store, actionRem1);
      expect(store.selectionMap).toEqual({ chai: true, jasmine: false });

      store = sourceEmoji(store, actionRem2);
      expect(store.selectionMap).toEqual({ chai: false, jasmine: false });

      store = sourceEmoji(store, actionRem3);
      expect(store.selectionMap).toEqual({ chai: false, 'earl-grey': false, jasmine: false });
    });
  });

  describe('SET_SOURCE_EMOJI_FILTER_STRING', () => {
    it('sets a filter string', () => {
      const type = ActionTypes.SET_SOURCE_EMOJI_FILTER_STRING;
      const action = { type, payload: { filterStr: 'grey' } };
      const store = sourceEmoji(undefined, action);
      expect(store.filterStr).toBe('grey');
    });
  });
});
