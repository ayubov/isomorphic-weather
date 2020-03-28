import React from 'react';

import { imagePath } from '../../utils/assetUtils';
import styles from './about.module.scss';

const About = () => (
  <div>
    <h1>About</h1>
    <p>Tiny isomorphic react app about the weather in the Netherlands</p>
    <img className={styles.icon} src={imagePath('weather.svg')} alt="Weather icon" />
    <img className={styles.icon} src={imagePath('flag.svg')} alt="Flag icon" />
  </div>
);

export default About;
