const PlaceNewSuggestion = async (props) => {
  try {
    const request = await fetch(`http://localhost:5000/api/projects/`, {
      method: 'POST',
      headers: {
        'content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: props.name,
        shift: props.shift,
        status: props.status,
        title: props.title,
        type: props.type,
        date: props.date,
        department: props.department,
        currentSituation: props.currentSituation,
        improvementSuggestion: props.improvementSuggestion,
        comments: props.comments,
      }),
    });
  } catch (err) {
    console.log(err);
  }
};

export default PlaceNewSuggestion;
