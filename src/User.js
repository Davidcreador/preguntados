import React from 'react';

export const User = (props) => {
  return (
    <div>
      <p>Username: {props.userData.username}</p>
      <p>Win: {props.userData.win}</p>
      <p>Lose: {props.userData.lose}</p>
      <a onClick={props.selectUser}>Select</a>
    </div>
  );
};
