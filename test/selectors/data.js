const data = {
  entities: {
    gistPreviews: {
      a: { id: 'a' },
      b: { id: 'b' },
      c: { id: 'c' },
    },
    gists: {
      a: { id: 'a', files: {} },
      b: { id: 'b', files: {} },
      c: { id: 'c', files: {} },
    },
    labels: {
      1: { name: 'Important', gistIds: ['a'] },
      2: { name: 'Other', gistIds: ['b', 'c'] },
    },
  },
  gistIds: ['a', 'b', 'c'],
  labelIds: [1, 2],
};

export default data;
