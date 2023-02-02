import React, { useState, useEffect } from 'react';
import { Button } from 'reactstrap';

import { HiMenuAlt4, HiX } from 'react-icons/hi';
import { motion } from 'framer-motion';

import { images } from '../../constants';

import './Navbar.scss';
import { client } from '../../client';

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const [classFloat, setClassFloat] = useState('');
  const [active, setActive] = useState('');
  const [aboutMe, setAboutMe] = useState({});

  useEffect(() => {
    // eslint-disable-next-line no-use-before-define
    window.addEventListener('scroll', stickNavBar);
    const aboutMeQuery = `*[_type == "aboutme"][0]{
      profileImg,
     description,
     "resumeUrl": resume.asset -> url 
    }`;
    client.fetch(aboutMeQuery).then((data) => {
      setAboutMe(data);
    });
    return () => {
      // eslint-disable-next-line no-use-before-define
      window.removeEventListener('scroll', stickNavBar);
    };
  }, []);

  const stickNavBar = () => {
    if (window !== undefined) {
      const windowHeight = window.scrollY;
      if (windowHeight > 250) {
        setClassFloat('navbar-float');
      } else {
        setClassFloat('');
      }
    }
  };
  const viewResumeHandler = () => {
    window.open(aboutMe.resumeUrl, '_blank');
  };

  return (
    <nav className={`app__navbar ${classFloat}`}>
      <div className="app__navbar-logo">
        <img src={images.logo} alt="logo" />
      </div>
      <ul className="app__navbar-links">
        {['home', 'about', 'work', 'skills', /* 'testimonials', */ 'contact', 'resume'].map(
          (item) => (
            <li
              key={`link-${item}`}
              className={`app__flex p-text ${active === item ? 'active' : ''}`}
            >
              {item === 'resume' ? (
                <Button color="primary" onClick={viewResumeHandler}>
                  Resume
                </Button>
              ) : (
                <a href={`#${item}`} onClick={() => setActive(item)}>
                  {item}
                </a>
              )}
            </li>
          ),
        )}
      </ul>
      <div className="app__navbar-menu">
        <HiMenuAlt4 onClick={() => setToggle(true)} />
        {toggle && (
        <motion.div
          whileInView={{ x: [300, 0] }}
          transition={{ duration: 0.75, ease: 'easeOut' }}
        >
          <HiX onClick={() => setToggle(false)} />
          <ul>
            {['home', 'about', 'work', 'skills', /* 'testimonials', */ 'contact', 'resume'].map((item) => (
              <li key={item}>
                {item === 'resume' ? (
                  <Button color="primary" onClick={viewResumeHandler}>
                    Resume
                  </Button>
                ) : (
                  <a href={`#${item}`} onClick={() => setToggle(false)}>
                    {item}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </motion.div>
        )}
      </div>

    </nav>
  );
};

export default Navbar;
