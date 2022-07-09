import React from "react";
import './foot.css'

const Foot = () => {
  return (
    <div className='foot'>
      <span className='copy-right'>@2022 All Rights Reserved.</span>
      <div className='icon'>
      <i className="fa-brands fa-youtube"></i>
      <i className="fa-brands fa-twitter"></i>
      <i className="fa-brands fa-facebook-square"></i>
      </div>
      <div className='links'>
        <a>Contact us</a>
        <a>Privacy Policies</a>
        <a>Help</a>
      </div>
    </div>
  );
};

export default Foot;
