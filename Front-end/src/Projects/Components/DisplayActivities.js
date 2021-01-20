import React, { useState, useEffect } from 'react';
import './DisplayActivities.css';

const DisplayActivities = (props) => {
  const [allActivities, setAllActivities] = useState([]);
  const [activityText, setActivityText] = useState('');
  const [reloadActivities, setReloadActivities] = useState(
    allActivities !== undefined ? allActivities.length : 0,
  );
  const { id } = props;

  const changeHandler = (event) => {
    setActivityText(event.target.value);
  };

  const saveActivity = async () => {
    try {
      await fetch(`http://localhost:5000/api/activities`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ taskId: id, activity: activityText }),
      });
    } catch (error) {
      console.log(error);
    }

    setAllActivities({
      ...allActivities,
      activity: activityText,
    });
    setReloadActivities(reloadActivities + 1);
    setActivityText('');
  };

  useEffect(() => {
    try {
      fetch(`http://localhost:5000/api/activities/${id}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'content-type': 'application/json',
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((result) => {
          if (result.message) {
            console.log(result.message);
          }
          setAllActivities(result.activities);
        });
    } catch (error) {
      console.log(error);
    }
  }, [id, reloadActivities]);

  return (
    <div>
      <div className="task-activities">
        <br />
        <textarea
          placeholder="Add new activity here"
          value={activityText}
          onChange={changeHandler}></textarea>
        <button
          type="submit"
          className="save-activity-button"
          disabled={activityText.length > 0 ? false : true}
          onClick={saveActivity}>
          SAVE
        </button>
      </div>
      {allActivities !== undefined && allActivities.length > 0 ? (
        allActivities.map((activity) => (
          <div className="task-activities" key={activity._id}>
            <br />
            <p placeholder="Add new activity here">{activity.activity}</p>
            <button
              type="button"
              className="delete-activity-button"
              onClick={async () => {
                try {
                  await fetch(
                    `http://localhost:5000/api/activities/${activity._id}`,
                    {
                      method: 'DELETE',
                      credentials: 'include',
                      headers: {
                        'content-type': 'application/json',
                      },
                    },
                  );
                } catch (error) {
                  console.log(error);
                }
                //console.log(reloadActivities);
                setReloadActivities(reloadActivities - 1);
              }}>
              DELETE
            </button>
          </div>
        ))
      ) : (
        <></>
      )}
    </div>
  );
};

export default DisplayActivities;
