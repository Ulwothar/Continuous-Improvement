import { validationResult } from 'express-validator';

import Activity from '../models/activity';

export const addActivity = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(
      res
        .status(422)
        .json({ message: 'Invalid inputs passed, please check your data.' }),
    );
  }

  const { taskId, activity } = req.body;

  const newActivity = new Activity({ taskId, activity });

  try {
    await newActivity.save();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message:
        'Internal server error, could not add this activity! If the problem persist, please contact administrator.',
    });
  }

  res
    .status(201)
    .json({ message: 'Activity successfuly created!', newActivity });
};

export const showActivities = async (req, res, next) => {
  const taskId = req.params.tid;
  let activities;

  try {
    activities = await Activity.find({ taskId });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message:
        'Internal server error, please try again. If the problem persist, contact administrator.',
    });
  }

  if (activities.length === 0) {
    return res
      .status(500)
      .json({ message: 'There are no activities for this task yet.' });
  } else {
    res.status(200).json({
      activities: activities.map((activity) =>
        activity.toObject({ getters: true }),
      ),
    });
  }
};

export const updateActivity = async (req, res, next) => {
  const id = req.params.aid;
  const activity = req.body;

  if (!activity.activity) {
    return res
      .status(400)
      .json({ message: 'Error! Modified activity was not provided.' });
  }

  try {
    await Activity.findByIdAndUpdate(id, activity, { useFindAndModify: false });
  } catch (error) {
    //console.log(error);
    return res.status(500).json({ message: 'Could not modify this activity.' });
  }

  res.status(200).json({ message: 'Activity successfully updated!' });
};

export const deleteActivity = async (req, res, next) => {
  const id = req.params.aid;
  let deletedActivity;
  try {
    deletedActivity = await Activity.deleteOne({ _id: id });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: 'Internal server error, please try again' });
  }

  if (!deletedActivity.n) {
    return res
      .status(410)
      .json({ message: 'Error, activity already deleted!' });
  }
  res.status(200).json({ message: 'Activity successfully deleted.' });
};
