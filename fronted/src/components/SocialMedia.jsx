import React from 'react';
import { BsLinkedin, BsGithub } from 'react-icons/bs';
import { SiGeeksforgeeks } from 'react-icons/si';

const SocialMedia = () => (
  <div className="app__social">
    <div>
      <a href="https://www.linkedin.com/in/amardeep-kumar-9234851b1/" target="_blank" rel="noreferrer">
        <BsLinkedin />
      </a>
    </div>
    <div>
      <a href="https://auth.geeksforgeeks.org/user/kumaramardeep882/practice" target="_blank" rel="noreferrer">
        <SiGeeksforgeeks />
      </a>
    </div>
    <div>
      <a href="https://github.com/kumarAmar882" target="_blank" rel="noreferrer">
        <BsGithub />
      </a>
    </div>
  </div>
);

export default SocialMedia;
