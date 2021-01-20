import React, { useState, useEffect } from 'react';

const DisplayActivities = (props) => {
  const [allActivities, setAllActivities] = useState({});
  const [activityText, setActivityText] = useState('');
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
  };

  const deleteActivity = async () => {
    try {
      await fetch(`http://localhost:5000//api/activities/${id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'content-type': 'application/json',
        },
      });
    } catch (error) {
      console.log(error);
    }
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
          if (res.message) {
            console.log(res.message);
          }
          return res.json();
        })
        .then((result) => {
          //console.log(result);
          setAllActivities(result.activities);
        });
    } catch (error) {
      //console.log(error.response.message);
    }
  }, []);
  //console.log(allActivities);
  return (
    <div>
      <div className="task-activities">
        <br />
        <textarea
          placeholder="Add new activity here"
          value={activityText}
          onChange={changeHandler}></textarea>
        <button
          type="button"
          className="save-activity-button"
          onClick={saveActivity}>
          SAVE
        </button>
      </div>
      {allActivities !== undefined && allActivities.length > 0 ? (
        allActivities.map((activity) => (
          <div className="task-activities" key={activity._id}>
            <br />
            <textarea
              placeholder="Add new activity here"
              value={activity.activity}
              disabled></textarea>
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
