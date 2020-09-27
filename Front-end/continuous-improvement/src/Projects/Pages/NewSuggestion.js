import React, { useState } from 'react';

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

  const onChangeHandler = async (event) => {
    let thisName = event.target.name;
    //thisSuggestion[thisName] = event.target.value;
    setNewSuggestion({
      ...NewForm,
      [thisName]: event.target.value,
    });
    //thisSuggestion[thisName] = NewForm[thisName];
    //console.log(thisSuggestion[thisName]);
  };

  const submitHandler = async (event) => {
    // logic to be added when back and db are ready
    event.preventDefault(); //prevents site from reloading when submitting suggestion
    NewForm.date = Date().toString().slice(0, 24);
    NewForm.id = Math.floor(Math.random() * 1000000).toString();
    placeNewSuggestion(NewForm);
    console.log(NewForm);
  };

  return (
    <div className="suggestion-form-container">
      <h2 className="suggestion-form-header">Suggestion Proposal Form</h2>
      <form className="new-suggestion-form" onSubmit={submitHandler}>
        <label>
          Name
          <input
            type="text"
            name="userName"
            id="your-name"
            placeholder="Enter Your Name"
            className="name-form"
            onChange={onChangeHandler}
            required
          />
        </label>
        <label>
          Department
          <select
            name="department"
            id="department"
            className="department-select"
            onChange={onChangeHandler}
            placeholder="Department">
            <option value="RMP">RMP</option>
            <option value="High Care">High Care</option>
            <option value="Packing">Packing</option>
            <option value="GoodsIn">Goods In</option>
            <option value="Yard">Yard</option>
            <option value="Engineering">Engineering</option>
            <option value="Human Resourcess">Human Resourcess</option>
            <option value="Night Higiene">Night Higiene</option>
            <option value="Cleaning">Cleaning</option>
            <option value="Management">Management</option>
            <option value="Finance">Finance</option>
          </select>
        </label>
        <label>
          Shift
          <select
            name="shift"
            id="shift"
            className="shift-select"
            onChange={onChangeHandler}
            label="Choose your shift pattern">
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </label>
        <label>
          Waste type seen (please choose)
          <select
            name="type"
            id="waste"
            className="waste-select"
            onChange={onChangeHandler}
            label="Waste type seen (Please choose from the list below)">
            <option value="defects">Defects</option>
            <option value="overproduction">Overproduction</option>
            <option value="waiting">Waiting</option>
            <option value="non-utilisedTalent">Non-utilised talent</option>
            <option value="transportation">Transportation</option>
            <option value="inventory">Inventory</option>
            <option value="motion">Motion</option>
            <option value="extra-processing">Extra-Processing</option>
          </select>
        </label>
        <label className="suggestion-title">
          Suggestion title
          <input
            type="text"
            name="title"
            id="title-input"
            onChange={onChangeHandler}
            placeholder="Please put a short title of your suggestion"
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
        <button type="submit" className="suggestion-form-submit-button">
          Submit Suggestion
        </button>
      </form>
    </div>
  );
};

export default NewSuggestion;
