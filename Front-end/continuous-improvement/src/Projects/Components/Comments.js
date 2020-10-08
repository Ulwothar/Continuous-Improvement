import React from 'react';

let DUMMY_COMMENTS = [
  {
    id: '1',
    projectId: 's1',
    reviewerComment: 'Comment for "new suggestion"',
  },
  {
    id: '2',
    projectId: 's2',
    reviewerComment: 'Comment for "ongoing suggestion"',
  },
  {
    id: '3',
    projectId: 's3',
    reviewerComment: 'Comment for "finished suggestion"',
  },
];

export const addComments = (props) => {
  DUMMY_COMMENTS.push(props);
};

export const ViewComments = (props) => {
  return DUMMY_COMMENTS.map((comments) =>
    comments.projectId === props.id ? (
      <p className="reviewer-description-text" key={comments.id}>
        {comments.reviewerComment}
      </p>
    ) : null,
  );
};

export const deleteComment = (props) => {
  let commentIndex = DUMMY_COMMENTS.findIndex(props.id);
  DUMMY_COMMENTS = DUMMY_COMMENTS.splice(commentIndex, 1);
};
