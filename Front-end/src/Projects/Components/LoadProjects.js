import React from 'react';

import Preview from './Preview';
import DisplayProject from './DisplayProject';
import SavedProjects from './SavedProjects';
import './LoadProjects.css';

//this component will use the 'async/await get' method to get projects from back-end
const LoadProjects = (props) => {
  //   const LoadedProjects = SavedProjects();
  //   const chooseProjects = () => {
  //     if (props.status) {
  //       return LoadedProjects.map((project) =>
  //         project.status === props.status ? (
  //           <Preview
  //             key={project.id}
  //             id={project.id}
  //             title={project.title}
  //             name={project.name}
  //             department={project.department}
  //             shift={project.shift}
  //             type={project.type}
  //             date={project.date}
  //             currentSituation={project.currentSituation}
  //             improvementSuggestion={project.improvementSuggestion}
  //             comments={project.comments}
  //           />
  //         ) : null,
  //       );
  //     } else if (props.id) {
  //       return LoadedProjects.map((project) =>
  //         project.id === props.id ? (
  //           <DisplayProject
  //             key={project.id}
  //             id={project.id}
  //             status={project.status}
  //             title={project.title}
  //             name={project.name}
  //             department={project.department}
  //             shift={project.shift}
  //             type={project.type}
  //             date={project.date}
  //             currentSituation={project.currentSituation}
  //             improvementSuggestion={project.improvementSuggestion}
  //             comments={project.comments}
  //             reviewerComments={project.reviewerComments}
  //           />
  //         ) : null,
  //       );
  //     }
  //   };
  //   if (LoadedProjects.length > 0) {
  //     return (
  //       <>
  //         <h3 className="page-title">{props.title}</h3>

  //         {chooseProjects()}
  //       </>
  //     );
  //   } else {
  //     return <h3>{props.message}</h3>;
  //   }
  if (props.status) {
    const status = props.status;
    const loadedProjects = SavedProjects({ status });
    //console.log('loadProject: ' + status);
    return loadedProjects.map((project) => (
      <Preview
        key={project.id}
        id={project.id}
        title={project.title}
        name={project.name}
        department={project.department}
        shift={project.shift}
        type={project.type}
        date={project.date}
        currentSituation={project.currentSituation}
        improvementSuggestion={project.improvementSuggestion}
        comments={project.comments}
      />
    ));
  }
};

export default LoadProjects;
