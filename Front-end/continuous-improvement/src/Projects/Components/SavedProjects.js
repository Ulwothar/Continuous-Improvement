import React from 'react';
let DUMMY_SUGGESTIONS = [
  {
    id: 's1',
    title: 'dummy new suggestion',
    name: 'Mateusz Krupa',
    department: 'High Care',
    shift: 'AM',
    type: 'Waiting',
    date: '19.09.2020 00:46',
    status: 'new',
    currentSituation:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    improvementSuggestion:
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here',
    comments:
      'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which do not look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there is not anything embarrassing hidden in the middle of text.',
    reviewerComments: 'just checking comment',
  },
  {
    id: 's2',
    title: 'dummy ongoing project',
    name: 'Mateusz Krupa',
    department: 'High Care',
    shift: 'AM',
    type: 'Processing',
    date: '19.09.2020 01:39',
    status: 'ongoing',
    currentSituation:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    improvementSuggestion:
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here',
    comments:
      'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which do not look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there is not anything embarrassing hidden in the middle of text.',
    reviewerComments: '',
  },
  {
    id: 's3',
    title: 'dummy finished project',
    name: 'Mateusz Krupa',
    department: 'High Care',
    shift: 'AM',
    type: 'Processing',
    date: '19.09.2020 01:39',
    status: 'finished',
    currentSituation:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    improvementSuggestion:
      'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here',
    comments:
      'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which do not look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there is not anything embarrassing hidden in the middle of text.',
    reviewerComments: '',
  },
];

export const placeNewSuggestion = (props) => {
  DUMMY_SUGGESTIONS.push(props);
};

export const changeStatus = (props) => {
  const suggestionIndex = DUMMY_SUGGESTIONS.findIndex(
    (element) => element.id === props.id,
  );
  DUMMY_SUGGESTIONS[suggestionIndex] = {
    ...DUMMY_SUGGESTIONS[suggestionIndex],
    status: props.status,
  };
  console.log(props);
};

export const updateComments = (props) => {
  const suggestionIndex = DUMMY_SUGGESTIONS.findIndex(
    (element) => element.id === props.id,
  );
  const newComment = <p>{props.reviewerComments}</p>;

  DUMMY_SUGGESTIONS[suggestionIndex] = {};
};

const SavedProjects = () => {
  return DUMMY_SUGGESTIONS;
};

export default SavedProjects;
