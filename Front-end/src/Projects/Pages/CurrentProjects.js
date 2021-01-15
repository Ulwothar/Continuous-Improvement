import React from 'react';

import LoadProjects from '../Components/LoadProjects';
import './RecentSuggestions.css';

const CURRENT = {
  status: 'ongoing',
  message: 'There are no projects beeing processed at the moment',
  title: 'Currently proccessing projects:',
};

const CurrentProjects = () => {
  return (
    <LoadProjects
      status={CURRENT.status}
      message={CURRENT.message}
      title={CURRENT.title}
    />
  );
};

export default CurrentProjects;
