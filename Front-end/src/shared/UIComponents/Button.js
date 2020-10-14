import React from 'react';

import './Button.css';

const Button = (props) => {
  return (
    <button className={props.class} name={props.name} type="submit">
      {props.message}
    </button>
  );
};

export default Button;
