// Returns a label by ID.
export function getLabel(state, id) {
  return state.data.entities.labels[id]
}

// Returns a list of all labels
export function getLabels(state) {
  return state.data.labelIds.map(id => getLabel(state, id))
}
