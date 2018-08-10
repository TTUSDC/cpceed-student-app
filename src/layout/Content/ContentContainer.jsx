import React from 'react';
import logger from 'logger.js';
import Content from './components';

const ContentContainer = () => {
  logger.info('rendering');

  return (
    <Content />
  );
};

export default ContentContainer;
