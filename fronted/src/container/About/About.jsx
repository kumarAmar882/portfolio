/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button, Card, CardBody, CardTitle } from 'reactstrap';

import { client, urlFor } from '../../client';
import { AppWrap, MotionWrap } from '../../wrapper';
import './About.scss';

const About = () => {
  const [abouts, setAbouts] = useState([]);
  const [aboutMe, setAboutMe] = useState({});

  useEffect(() => {
    const aboutsQuery = '*[_type == "abouts"] | order(title asc)';
    const aboutMeQuery = `*[_type == "aboutme"][0]{
      profileImg,
     description,
     "resumeUrl": resume.asset -> url 
    }`;
    client.fetch(aboutsQuery).then((data) => {
      setAbouts(data);
    });
    client.fetch(aboutMeQuery).then((data) => {
      setAboutMe(data);
    });
  }, []);

  const viewResumeHandler = () => {
    window.open(aboutMe.resumeUrl, '_blank');
  };

  return (
    <>
      <h2 className="head-text">
        Web design is the <span>first impression</span>
        <br />
        of your business, <span>make it count.</span><br />
      </h2><br />
      <>
        <Card className="card-bg bg-warning">
          <CardBody>
            <CardTitle className="text-warning" tag="h3">About me</CardTitle>
            <p className="p-text text-white">{aboutMe.description}</p>
            <div>
              <Button className="resume-btn" color="success text-white" onClick={viewResumeHandler}>
                Resume
              </Button>
            </div>
          </CardBody>
        </Card>
        <br />
      </>

      <div className="app__profiles">
        {abouts.map((about, index) => (
          <motion.div
            whileInView={{ opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1.1 }}
            transition={{ duration: 0.2, type: 'tween' }}
            className="app__profile-item"
            key={about.title + index}
          >
            <img src={urlFor(about.imgUrl)} alt={about.title} />
            <h2 className="bold-text" style={{ marginTop: '20px' }}>
              {about.title}
            </h2>
            <h2 className="p-text" style={{ marginTop: '10px' }}>
              {about.description}
            </h2>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(About, 'app__about'),
  'about',
  'app__whitebg',
);
