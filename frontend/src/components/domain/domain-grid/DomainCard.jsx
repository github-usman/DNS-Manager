import React, { useContext, useEffect, useState } from 'react';
import styles from './domainCard.module.css';
import { toast } from 'react-hot-toast';

import { GiSlicedMushroom } from 'react-icons/gi';
import { GiMushroom } from 'react-icons/gi';
import { GiMushroomHouse } from 'react-icons/gi';
import { GiSuperMushroom } from 'react-icons/gi';
import { GiJumpingDog } from 'react-icons/gi';
import { FaCertificate } from 'react-icons/fa6';
import { IoIosLocate } from 'react-icons/io';
import { FaLocationCrosshairs } from 'react-icons/fa6';
import { GiMushroomCloud } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import { DnsContext } from '../../../context-api/DnsContext';
import { MdDelete } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import { MdCancel } from 'react-icons/md';
const URL = import.meta.env.VITE_API_URI || '';

const DomainCard = ({ element, randomIndex }) => {
  // random generation
  console.log(randomIndex, 'in card');
  const listOfColor = [
    '#496989',
    '#58A399',
    '#A8CD9F',
    '#E2F4C5',
    '#007F73',
    '#824D74',
    '#FF204E',
    '#76885B',
    '#E178C5',
    '#9BB0C1',
    '#FCDC2A',
  ];

  const listOfIcons = [
    GiSlicedMushroom,
    GiMushroom,
    GiMushroomHouse,
    GiSuperMushroom,
    GiJumpingDog,
    FaCertificate,
    IoIosLocate,
    FaLocationCrosshairs,
    GiMushroomCloud,
  ];
  const FinalIcon = listOfIcons[randomIndex] || GiSlicedMushroom;
  const color = listOfColor[randomIndex] || '#4cbbd1';
  // HostedZoneId, setHostedZoneId
  const { setHostedZoneId, setNeedReload } = useContext(DnsContext);

  const handleClick = (e) => {
    const newHostedZone = element.Id.slice(12);
    console.log('AFTER CLICK THE new hostedzone set is ', newHostedZone);
    setHostedZoneId(newHostedZone);
    sessionStorage.setItem('HostedZoneId', JSON.stringify(newHostedZone));
  };


  useEffect(() => {
    const storedHostedZoneId = sessionStorage.getItem('HostedZoneId');
    if (storedHostedZoneId) {
      setHostedZoneId(JSON.parse(storedHostedZoneId));
    }
  }, []);

  const [isDelete, setIsDelete] = useState(false);

  const handleDelete = async () => {
    try {
      const response = await fetch(`${URL}/domain/delete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([{ Name: element.Name }]),
      });

      if (response.ok) {
        setNeedReload(true);
        setIsDelete(false);
        toast.success(`${element.Name} deleted successfully`);
        // Handle success scenario, e.g., show a success message
      } else {
        toast.error('Failed to delete domain');
        // Handle failure scenario, e.g., show an error message
      }
    } catch (error) {
      toast.error('Error occurred: ' + error);
      // Handle error scenario, e.g., show an error message
    }
  };

  const deleteVerificatio = () => {
    setIsDelete(() => !isDelete);
  };
  return (
    <div className={styles.container}>
      <Link
        to={`/dns-records/${element.Name}`}
        onClick={handleClick}
        className={styles.links}
      >
        <p className={styles.domainName}>{element.Name}</p>
        <FinalIcon size={80} style={{ color: color }} />
        <p>{element.ResourceRecordSetCount} Records</p>
      </Link>
      {isDelete ? (
        <div
          className={styles.btn}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <p style={{ color: 'red' }}> Are You Sure? </p>
          <MdCancel
            size={25}
            style={{ cursor: 'pointer' }}
            color="green"
            onClick={deleteVerificatio}
          />
          <MdDelete
            size={25}
            style={{ cursor: 'pointer' }}
            color="red"
            onClick={handleDelete}
          />{' '}
        </div>
      ) : (
        <div className={styles.btn}>
          <MdDelete
            size={25}
            style={{ cursor: 'pointer' }}
            color="red"
            onClick={deleteVerificatio}
          />{' '}
          <FaEdit style={{ cursor: 'not-allowed' }} size={25} color="black" />
        </div>
      )}
    </div>
  );
};

export default DomainCard;
