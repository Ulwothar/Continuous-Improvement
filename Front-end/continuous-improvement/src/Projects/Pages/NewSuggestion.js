import React, { useState, useEffect } from 'react';
import Select from 'react-select';

import {
  departmentSelect,
  shiftSelect,
  wasteSelect,
} from '../../shared/UIComponents/form-select';
import { placeNewSuggestion } from '../Components/SavedProjects';
import './NewSuggestion.css';

let thisSuggestion = {
  id: '',
  userName: '',
  department: 'RMP',
  shift: 'AM',
  type: 'defects',
  title: '',
  currentSituation: '',
  improvementSuggestion: '',
  comments: '',
  date: '',
  status: 'new',
};

const NewSuggestion = () => {
  const [NewForm, setNewSuggestion] = useState(thisSuggestion);

  const department = departmentSelect();
  const shift = shiftSelect();
  const waste = wasteSelect();

  let thisName = '';

  const onChangeHandler = (event) => {
    thisName = event.target.name;
    setNewSuggestion({
      ...NewForm,
      [thisName]: event.target.value,
    });
  };

  const selectChangeHandler = (value, action) => {
    thisName = action.name;
    setNewSuggestion({ ...NewForm, [thisName]: value.value });
  };

  const submitHandler = async (event) => {
    // logic to be added when back and db are ready
    event.preventDefault(); //prevents site from reloading when submitting suggestion
    NewForm.date = Date().toString().slice(0, 24);
    NewForm.id = Math.floor(Math.random() * 1000000).toString();
    placeNewSuggestion(NewForm);
    event.target.reset();
    console.log(NewForm);
  };

  useEffect(() => {
    console.log(NewForm);
  }, [NewForm]);

  return (
    <div className="suggestion-form-container">
      <h2 className="suggestion-form-header">Suggestion Proposal Form</h2>
      <form className="new-suggestion-form" onSubmit={submitHandler}>
        <label>
          Name
          <input
            type="text"
            name="name"
            id="your-name"
            placeholder="Enter Your Name"
            className="name-form"
            onChange={onChangeHandler}
            required
          />
        </label>

        <div className="department-select">
          <Select
            options={department}
            name="department"
            id="department"
            onChange={selectChangeHandler}
            placeholder="Department"></Select>
        </div>

        <div className="shift-select">
          <Select
            name="shift"
            id="shift"
            placeholder="Shift"
            onChange={selectChangeHandler}
            options={shift}></Select>
        </div>

        <div className="waste-select">
          <Select
            name="type"
            id="waste"
            onChange={selectChangeHandler}
            label="Waste type seen (Please choose from the list below)"
            placeholder="Waste type"
            required
            options={waste}></Select>
        </div>

        <label className="suggestion-title">
          Suggestion title
          <input
            type="text"
            name="title"
            id="title-input"
            onChange={onChangeHandler}
            placeholder="Suggestion title"
            maxLength="50"
            required
          />
        </label>
        <label className="current-label">
          Current situation
          <textarea
            id="current"
            name="currentSituation"
            onChange={onChangeHandler}
            placeholder="Please describe the current situation here..."
            label="Current Situation:"
            className="current-situation-text"
            required
          />
        </label>
        <label className="suggestion-label">
          Improvement suggestion
          <textarea
            id="improvement-suggestion"
            name="improvementSuggestion"
            onChange={onChangeHandler}
            placeholder="Please describe your improvement suggestion here..."
            label="Improvement Suggestion:"
            className="suggestion-text"
            required
          />
        </label>
        <label className="comment-label">
          Additional Comments
          <textarea
            placeholder="If you have any other comments, please type them here..."
            label="Additional Comments:"
            className="comments-text"
            id="additional-comments"
            name="comments"
            onChange={onChangeHandler}
          />
        </label>
        <div className="suggestion-form-submit-button">
          <button type="submit">SUBMIT</button>
        </div>
      </form>
    </div>
  );
};

export default NewSuggestion;
