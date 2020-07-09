import React, { useState } from "react";

import Story from '../../components/Story';

import './Stories.scss';

const Stories = ({ stories, getUserHandler }) => {
  
  return (
    <React.Fragment>
      <section className="stories" data-testid="stories">
        <div className="container">
        </div>
      </section>

      {stories.map(story =>  <Story story={story} />  )}
    </React.Fragment>
  );
};

export default Stories;
