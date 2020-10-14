import React from 'react';
import { useParams } from 'react-router-dom';

import LoadProjects from '../Components/LoadProjects';
import './ReviewSuggestion.css';

const ReviewSuggestion = () => {
  const id = useParams().pid;
  const message = "Ooops, I'm sorry but this project does not exist...";
  const title = 'Project review';

  return <LoadProjects id={id} message={message} title={title} />;
};

export default ReviewSuggestion;
