import React, { useState, useEffect } from 'react';
import Select from 'react-select';

import { addComments, deleteComment, ViewComments } from './Comments';
import { statusSelect } from '../../shared/UIComponents/form-select';
import { changeStatus } from './SavedProjects';
import './DisplayProject.css';

const DisplayProject = (props) => {
  const [value, setValue] = useState(props.status); //State used to change status of project
  const [comments, setComments] = useState(props.reviewerComments); //State used to change textarea with comments
  const id = props.id;

  const StatusChange = (statusValue) => {
    setValue(statusValue);
  };

  const changeHandler = (event) => {
    setComments(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    let commentId = Math.floor(Math.random() * 1000000).toString();
    const newComment = {
      id: `${commentId}`,
      projectId: `${props.id}`,
      reviewerComment: `${comments}`,
    };
    addComments(newComment);
    event.target.reset();
  };

  const deleteCommentHandler = (event) => {
    deleteComment(id);
  };

  useEffect(() => {
    console.log(comments);
  }, [comments]);

  useEffect(() => {
    //Updating project status when Select input is changed
    if (value.value) {
      const id = props.id;
      const status = value.value;
      changeStatus({ id: id, status: status });
    }
  }, [value.value, props.id]);

  const statusOptions = statusSelect();
  return (
    <div className="project-window">
      <h3 className="suggestion-title">{props.title}</h3>
      <p className="suggestion-date">{props.date}</p>

      <span className="suggestion-details">
        <label>
          Name:
          <p>{props.name}</p>
        </label>
        <label>
          Department:
          <p>{props.department}</p>
        </label>
        <label>
          Shift:
          <p>{props.shift}</p>
        </label>
        <label>
          Type:
          <p>{props.type}</p>
        </label>
      </span>

      <label>
        Status:
        <div className="status-select">
          <Select
            name="status"
            isSearchable={false}
            onChange={StatusChange}
            className="status-select-button"
            options={statusOptions}
            defaultValue={{ label: value, value: value }}></Select>
        </div>
      </label>

      <div className="suggestion-description">
        <h4 className="description-label">Current situation:</h4>
        <p className="description-text">{props.currentSituation}</p>
        <h4 className="description-label">Improvement suggestion:</h4>
        <p className="description-text">{props.improvementSuggestion}</p>
        {props.comments.length > 0 ? (
          <>
            <h4 className="description-label">Comments:</h4>
            <p className="description-text">{props.comments}</p>
          </>
        ) : (
          <></>
        )}
        {ViewComments(id).length > 2 ? (
          <>
            <h4 className="description-label">Reviewer Comments:</h4>
            <ViewComments id={id} key={id} />
          </>
        ) : (
          <></>
        )}
        <form className="modify-project-form" onSubmit={submitHandler}>
          <label className="reviewer-label">
            <textarea
              className="reviewer-comments-textarea"
              placeholder="Type any comments to this project"
              onChange={changeHandler}
            />
            <button type="submit" className="reviewer-submit-button">
              SUBMIT
            </button>
          </label>
        </form>
      </div>
    </div>
  );
};

export default DisplayProject;
