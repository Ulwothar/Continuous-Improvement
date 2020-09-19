import React from 'react';
import './NewSuggestion.css';

const NewSuggestion = () => {
  return (
    <div className="suggestion-form-container">
      <h2 className="suggestion-form-header">Suggestion Proposal Form</h2>
      <form className="new-suggestion-form">
        <label>
          Name
          <input
            type="text"
            id="your-name"
            placeholder="Enter Your Name"
            className="name-form"
          />
        </label>
        <label>
          Department
          <select
            name="departments"
            id="department"
            className="department-select"
            placeholder="Department">
            <option value="RMP">RMP</option>
            <option value="HighCare">High Care</option>
            <option value="Packing">Packing</option>
            <option value="GoodsIn">Goods In</option>
            <option value="Yard">Yard</option>
            <option value="Engineering">Engineering</option>
            <option value="HumanResourcess">Human Resourcess</option>
            <option value="NightHigiene">Night Higiene</option>
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
            label="Choose your shift pattern">
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </label>
        <label>
          Waste type seen (please choose)
          <select
            name="waste"
            id="waste"
            className="waste-select"
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
        <label className="current-label">
          Current situation
          <textarea
            id="current"
            name="current"
            placeholder="Please describe the current situation here..."
            label="Current Situation:"
            className="current-situation-text"
          />
        </label>
        <label className="suggestion-label">
          Improvement suggestion
          <textarea
            id="improvement-suggestion"
            name="improvement-suggestion"
            placeholder="Please describe your improvement suggestion here..."
            label="Improvement Suggestion:"
            className="suggestion-text"
          />
        </label>
        <label className="comment-label">
          Additional Comments
          <textarea
            placeholder="If you have any other comments, please type them here..."
            label="Additional Comments:"
            className="comments-text"
            id="additional-comments"
            name="additional-comments"
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