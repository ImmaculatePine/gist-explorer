import { expect } from 'chai';
import * as selectors from '../../src/selectors/gists';
import data from './data';

describe('getFilteredGistIds(state)', () => {
  it('returns all gist IDs when no filters are selected', () => {
    const state = {
      data,
      labels: {},
    };
    expect(selectors.getFilteredGistIds(state)).to.eql(['a', 'b', 'c']);
  });

  it('returns only matched gist IDs by label', () => {
    const state = {
      data,
      labels: {
        selectedId: 2,
      },
    };
    expect(selectors.getFilteredGistIds(state)).to.eql(['b', 'c']);
  });
});

describe('getGists(state)', () => {
  it('returns a list of all filtered gist previews', () => {
    const state = {
      data,
      labels: {},
    };
    expect(selectors.getGists(state)).to.eql([
      {
        id: 'a',
        labels: [
          { name: 'Important', gistIds: ['a'] },
        ],
      },
      {
        id: 'b',
        labels: [
          { name: 'Other', gistIds: ['b', 'c'] },
        ],
      },
      {
        id: 'c',
        labels: [
          { name: 'Other', gistIds: ['b', 'c'] },
        ],
      },
    ]);
  });
});

describe('getSelectedGist(state)', () => {
  it('returns undefined if nothing is selected', () => {
    const state = {
      data,
      gists: {
        list: {},
      },
    };
    expect(selectors.getSelectedGist(state)).to.be.not.defined;
  });

  it('returns the selected gist', () => {
    const state = {
      data,
      gists: {
        list: {
          selectedId: 'a',
        },
      },
    };
    expect(selectors.getSelectedGist(state)).to.eql({
      id: 'a',
      files: {},
      labels: [
        { name: 'Important', gistIds: ['a'] },
      ],
    });
  });
});
