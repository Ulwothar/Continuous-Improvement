import React from 'react';

//To be removed and replaced with comments from backend
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

//Takes prject id as prop and returns all comments made by reviewer to this project
export const ViewComments = (props) => {
  // return DUMMY_COMMENTS.map((comments) =>
  //   comments.projectId === props.id ? (
  //     <p className="reviewer-description-text" key={comments.id}>
  //       {comments.reviewerComment}
  //     </p>
  //   ) : null,
  // );
  // const id = props.id;
  // let reviewerComments;
  // try {
  //   fetch(`http://localhost:5000/api/comments/${id}`)
  //     .then((res) => res.json())
  //     .then((result) => (reviewerComments = result.comments));
  // } catch (error) {
  //   console.log(error);
  // }
  // console.log(reviewerComments);
  // return <p>does it work?</p>;
};

//Takes comment id, finds it's index and removes it
//To be changed to DELETE path to backend and delete comment from database
export const deleteComment = (props) => {
  return null;
};
