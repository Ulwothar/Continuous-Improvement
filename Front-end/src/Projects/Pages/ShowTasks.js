import React from 'react';
import { useParams } from 'react-router-dom';

import LoadTasks from '../Components/LoadTasks';

const ShowTasks = () => {
  const id = useParams().pid;
  const message = "Ooops, I'm sorry but this project does not exist...";
  const title = 'Project review';

  return <LoadTasks id={id} message={message} title={title} />;
};

export default ShowTasks;
