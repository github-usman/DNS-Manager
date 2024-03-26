import React from 'react'
import styles from './domainCard.module.css'; 

import { GiSlicedMushroom } from "react-icons/gi";
import { GiMushroom } from "react-icons/gi";
import { GiMushroomHouse } from "react-icons/gi";
import { GiSuperMushroom } from "react-icons/gi";
import { GiJumpingDog } from "react-icons/gi";
import { FaCertificate } from "react-icons/fa6";
import { IoIosLocate } from "react-icons/io";
import { FaLocationCrosshairs } from "react-icons/fa6"
import { GiMushroomCloud } from "react-icons/gi";

const DomainCard = ({element,randomIndex}) => {

    // random generation
    console.log(randomIndex,'in card')
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
    ]
    
    const listOfIcons = [
        GiSlicedMushroom,
        GiMushroom,
        GiMushroomHouse,
        GiSuperMushroom,
        GiJumpingDog,
        FaCertificate,
        IoIosLocate,
        FaLocationCrosshairs,
        GiMushroomCloud
    ];
    const FinalIcon = listOfIcons[randomIndex] || GiSlicedMushroom;
    const color = listOfColor[randomIndex] || '#E2F4C5'
    
  return (
    <div className={styles.container}>
        <p className={styles.domainName}>{element.Name}</p>
        <FinalIcon size={100} style={{color:color}}/>
        <p>{element.ResourceRecordSetCount} Records</p>

    </div>
  )
}

export default DomainCard