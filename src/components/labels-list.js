import React, { PropTypes } from 'react';

const LabelsList = ({ labels }) => (
  <span>
    {labels.length ? labels.map(label => label.name).join(', ') : 'No labels' }
  </span>
);

LabelsList.propTypes = {
  labels: PropTypes.array.isRequired,
};

export default LabelsList;
