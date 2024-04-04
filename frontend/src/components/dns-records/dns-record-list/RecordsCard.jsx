import React from 'react';
import styles from './recordsCard.module.css';
import DNSCreationForm from '../create-methods/DNSCreationForm';

const RecordsCard = ({ details }) => {
  console.log(
    details.ResourceRecords.length,
    'record length values of subdomain',
  );
  return (
    <>
      <div className={styles.container}>
        <p className={styles.cell} style={{ width: '22%' }}>
          <button className={styles.btn}>Delete</button> <button className={styles.btn}>Edit</button> {details.Name}
        </p>
        <p className={styles.cell} style={{ width: '5%' }}>
          {details.Type}
        </p>
        <p className={styles.cell} style={{ width: '8%' }}>
          {details.TTL}
        </p>
        <div className={styles.cellRight}>
          {details.ResourceRecords.map((e) => {
            return <p>{e.Value}</p>;
          })}
        </div>
      </div>
    </>
  );
};

export default RecordsCard;
