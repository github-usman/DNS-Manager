import React from 'react';
import { Link } from 'react-router-dom';
import styles from './welcomePage.module.css';
import { ReactTyped } from 'react-typed';
import { Fade } from 'react-awesome-reveal';

import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
const WelcomePage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <div className={styles.etiquette}>Hi there!</div>
        <h2 className={styles.welcome}>Welcome! to DNS Manager</h2>
        <h3 className={styles.reactTyped}>
          <ReactTyped
            strings={[
              'You will Directly Connect to DNS system on AWS Route 53',
              'One Click Deal',
            ]}
            typeSpeed={40}
            backSpeed={50}
            attr="placeholder"
            loop
          >
            <input type="text" className={styles.reactTypedInner} disabled />
          </ReactTyped>
        </h3>
        <div>
          <Link to="/login" className={styles.btnGetStarted}>
            Get started
          </Link>
        </div>
        <div className={styles.para}>
          <Fade className={styles.firstContainer} cascade damping={0.1}>
            <p>
              <IoMdCheckmarkCircleOutline className={styles.checkIcon} />{' '}
              <span className={styles.headings}>
                Seamless Backend API Integration:
              </span>{' '}
              Easily manage DNS settings with Directly Connect to DNS system on
              AWS Route 53.
            </p>
            <p>
              <IoMdCheckmarkCircleOutline className={styles.checkIcon} />{' '}
              <span className={styles.headings}>
                Complete Control with CRUD Operations:
              </span>{' '}
              Enjoy full control over DNS records through intuitive Create,
              Read, Update, and Delete functions.
            </p>
            <p>
              <IoMdCheckmarkCircleOutline className={styles.checkIcon} />{' '}
              <span className={styles.headings}>Guided User Experience:</span>{' '}
              Stay informed with clear alerts and notifications for hassle-free
              DNS management.
            </p>
            <p>
              <IoMdCheckmarkCircleOutline className={styles.checkIcon} />{' '}
              <span className={styles.headings}>Secure Access Control:</span>{' '}
              Ensure data safety with robust user authentication and
              authorization.
            </p>
          </Fade>
          <Fade className={styles.secondContainer} cascade damping={0.1}>
            <p>
              <span className={styles.headings}>User-Friendly Dashboard:</span>{' '}
              Conveniently manage domains and records in a clear, organized
              dashboard.{' '}
              <IoMdCheckmarkCircleOutline className={styles.checkIcon} />{' '}
            </p>
            <p>
              {' '}
              <span className={styles.headings}>
                Effortless Management:
              </span>{' '}
              Add, edit, or delete DNS records effortlessly with streamlined
              forms and modals.{' '}
              <IoMdCheckmarkCircleOutline className={styles.checkIcon} />
            </p>
            <p>
              {' '}
              <span className={styles.headings}>
                Advanced Search and Filtering:
              </span>{' '}
              Quickly find information with powerful search and filtering
              options.{' '}
              <IoMdCheckmarkCircleOutline className={styles.checkIcon} />
            </p>
            <p>
              {' '}
              <span className={styles.headings}>
                Insightful Data Visualization:
              </span>{' '}
              Gain insights with graphical charts illustrating domain and record
              type distribution.{' '}
              <IoMdCheckmarkCircleOutline className={styles.checkIcon} />
            </p>
            <p>
              {' '}
              <span className={styles.headings}>
                Efficient Data Management:
              </span>{' '}
              Simplify tasks with CSV or JSON bulk uploads for seamless data
              handling.{' '}
              <IoMdCheckmarkCircleOutline className={styles.checkIcon} />
            </p>
          </Fade>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
