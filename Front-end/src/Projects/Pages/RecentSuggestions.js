import React from 'react';

import LoadProjects from '../Components/LoadProjects';
import './RecentSuggestions.css';

const NEW_SUGGESTIONS = {
  status: 'new',
  message: 'There are no new suggestions.',
  title: 'New suggestions',
};

const RecentSuggestion = () => {
  return (
    <LoadProjects
      status={NEW_SUGGESTIONS.status}
      message={NEW_SUGGESTIONS.message}
      title={NEW_SUGGESTIONS.title}
    />
  );
};

export default RecentSuggestion;
