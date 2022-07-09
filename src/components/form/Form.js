import React from "react";
// import { Form, Input, Button, Checkbox } from 'antd';
// import 'antd/dist/antd.css'
// import { Button, Modal } from 'antd'
import "./form.css";
import { formInfo } from "./formInfo";
import { useState, useRef } from "react";

const ReuseForm = (props) => {
  const [formType, setFormType] = useState(formInfo.signIn);
  // const [display, setDisplay] = useState(formInfo.display)
  const email = formInfo.email;
  const password = formInfo.passowrd;
  const passwardDisplay = useRef()
  console.log(passwardDisplay.current)


  const handleClick = () => {
    formType === formInfo.signIn
      ? setFormType(formInfo.signUp)
      : setFormType(formInfo.signIn);
  };

  const handleClickPassword = () => {
    // formType === formInfo.signIn
    //   ? setFormType(formInfo.update)
    //   : setFormType(formInfo.signIn);
    setFormType(formInfo.update)
      passwardDisplay.current.innerText=''
  };

  const submitHandle = (e) => {
    console.log(e)
  }


  // <div style={formType.updateDisplay}>
  //   Enter your email link, we will sent you the recovery link
  // </div>;

  return (
    <div className="form">
      <div className="innerForm">
        <h1>{formType.title}</h1>
        <div style={formType.updateDisplay}>
          Enter your email link, we will sent you the recovery link
        </div>
        <form action='/' onSubmit={submitHandle}>
          <div id="email" className="formInput">
            <label name={email}>{email}</label>
            <input type={email} placeholder={formInfo.placeholderEmail}></input>
            {/* <div style={formType.display}className='warning'>{formInfo.warnEmail}</div> */}
          </div>
          <div ref={passwardDisplay} id="passward" className="formInput">
            <label name={password}>{password}</label>
            <input
              type={password}
              placeholder={formInfo.placeholderPassword}
            ></input>
            {/* <div style={formType.display} className='warning'> {formInfo.warnPassword}</div> */}
          </div>
          <button onClick={submitHandle}>{formType.button}</button>
          <div className="innerBottom">
            <div>
              {formType.innerBottom}
              <a onClick={handleClick}>{formType.link}</a>
            </div>
            <a style={formType.display} onClick={handleClickPassword}>
              Forgot password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReuseForm;
