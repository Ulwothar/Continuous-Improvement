import React from 'react';

import LoadProjects from '../Components/LoadProjects';
import './RecentSuggestions.css';

const FINISHED = {
  status: 'finished',
  message: 'There are no finished projects',
  title: 'Finished projects:',
};

const FinishedProjects = () => {
  return (
    <LoadProjects
      status={FINISHED.status}
      message={FINISHED.message}
      title={FINISHED.title}
    />
  );
};

export default FinishedProjects;
