import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { useHistory } from 'react-router-dom';

import { addComments, deleteComment } from './Comments';
import { statusSelect } from '../../shared/UIComponents/form-select';
//import { changeStatus } from './SavedProjects';
import './DisplayProject.css';

const DisplayProject = (props) => {
  const [value, setValue] = useState(props.status); //State used to change status of project - NEED TO ADD OPTION TO DELETE PROJECT HERE!!!
  const [comments, setComments] = useState(''); //State used to change textarea with comments
  const [reviewerComments, setReviewerComments] = useState([]);
  const [reloadComments, setReloadComments] = useState(reviewerComments.length);
  const id = props.id;
  const history = useHistory();

  const StatusChange = (statusValue) => {
    setValue(statusValue);
  };

  const changeHandler = (event) => {
    setComments(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    //let commentId = Math.floor(Math.random() * 1000000).toString();
    const newComment = {
      projectId: `${props.id}`,
      comment: `${comments}`,
    };
    event.target.reset();
    addComments(newComment);
    try {
      await fetch(`http://localhost:5000/api/comments/${id}`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          projectId: id,
          comment: comments,
        }),
      });
    } catch (error) {
      console.log(error);
    }
    setReloadComments(reloadComments + 1);
  };

  const deleteProjectHandler = async () => {
    try {
      await fetch(`http://localhost:5000/api/projects/${id}`, {
        method: 'DELETE',
        headers: {
          'content-type': 'applicaton/json',
        },
        credentials: 'include',
      }).then(() => {
        history.push(`/${value}`);
      });
    } catch (error) {
      console.log(error);
    }
  };

  async function fetchChangeStatus(status, id) {
    try {
      await fetch(`http://localhost:5000/api/projects/status/${id}`, {
        method: 'PATCH',
        headers: {
          'content-type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          status: status,
        }),
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    //Updating project status when Select input is changed
    if (value.value) {
      const id = props.id;
      const status = value.value;
      fetchChangeStatus(status, id);

      console.log(status);
    }
  }, [value.value, props.id]);

  async function fetchComments(id) {
    try {
      await fetch(`http://localhost:5000/api/comments/${id}`, {
        credentials: 'include',
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.comments) {
            setReviewerComments(result.comments);
            //console.log(result.comments);
          } else {
            setReviewerComments(result);
            //console.log(result);
          }
        });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchComments(id);
    //console.log(reviewerComments);
  }, [id, reloadComments]);

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
      <span>
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
        <button
          className="delete-project-button"
          onClick={deleteProjectHandler}>
          DELETE
        </button>
      </span>
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

        <h4 className="description-label">Reviewer Comments:</h4>
        {/* <ViewComments id={id} key={id} /> */}
        {reviewerComments.length > 0 ? (
          reviewerComments.map((revComment) => (
            <span key={revComment._id}>
              <p className="reviewer-description-text">
                {revComment.comment}

                <button
                  className="delete-comment-button"
                  onClick={async () => {
                    await fetch(
                      `http://localhost:5000/api/comments/${revComment._id}`,
                      {
                        method: 'DELETE',
                        headers: {
                          'content-type': 'application/json',
                        },
                        credentials: 'include',
                      },
                    );
                    setReloadComments(reloadComments - 1);
                  }}>
                  DELETE
                </button>
              </p>
            </span>
          ))
        ) : (
          <p className="reviewer-description-text">
            {reviewerComments.message}
          </p>
        )}

        <form className="modify-project-form" onSubmit={submitHandler}>
          <label className="reviewer-label">
            <textarea
              className="reviewer-comments-textarea"
              placeholder="Type any comments to this project"
              required
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
