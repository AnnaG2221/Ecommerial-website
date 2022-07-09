import React from "react";

function Input(props) {
  // console.log(props)
  return (
    <div className='inputbar'>
      <label id='createLabel' htmlFor={props.formContent.name}>{props.formContent.detail}</label>
      <input id='createInput'onChange={props.onChange}type={props.formContent.type} id={props.formContent.name} required></input>
    </div>
  );
}

export default Input;
