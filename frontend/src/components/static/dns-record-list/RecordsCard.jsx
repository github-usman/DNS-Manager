import React from 'react';
import styles from './recordsCard.module.css';

const RecordsCard = ({ details }) => {
  console.log(
    details.ResourceRecords.length,
    'record length values of subdomain',
  );
  return (
    <div className={styles.container}>
      <p className={styles.cell} style={{ width: '300px' }}>
        {' '}
        <button>Delete</button> <button>Edit</button> {details.Name}
      </p>
      <p className={styles.cell} style={{ width: '100px' }}>
        {' '}
        {details.Type}
      </p>
      <p className={styles.cell} style={{ width: '100px' }}>
        {' '}
        {details.TTL}
      </p>
      <div className={styles.cellRight}>
        {details.ResourceRecords.map((e) => {
          return <p>{e.Value}</p>;
        })}
      </div>
    </div>
  );
};

export default RecordsCard;
