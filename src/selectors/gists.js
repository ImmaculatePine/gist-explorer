import { getLabel, getLabels } from './labels';

// Returns IDs of gists after applying filters.
// Available filters: by label.
export function getFilteredGistIds(state) {
  const selectedLabelId = state.labels.selectedId;
  if (selectedLabelId === undefined) {
    return state.data.gistIds;
  }
  const label = getLabel(state, selectedLabelId);
  return label.gistIds;
}

// Returns a list of all filtered gist previews.
export function getGists(state) {
  return getFilteredGistIds(state).map(id => (
    {
      ...state.data.entities.gistPreviews[id],
      labels: getLabels(state).filter(label => label.gistIds.includes(id)),
    }
  ));
}

// Returns the selected gist.
// If there is no selected gist, it returns undefined value.
export function getSelectedGist(state) {
  const id = state.gists.list.selectedId;
  if (id === undefined) {
    return undefined;
  }

  return {
    ...state.data.entities.gists[id],
    labels: getLabels(state).filter(label => label.gistIds.includes(id)),
  };
}
