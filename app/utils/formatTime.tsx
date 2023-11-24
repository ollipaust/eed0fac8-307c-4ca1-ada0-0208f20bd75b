import React from 'react';
import { formatDate } from './formatDate';
import { formatDateAndTime } from './formatDateAndTime'

interface TimeFormatProps {
  startTime: string;
  endTime: string;
  fallBackTime: string;
}

const TimeFormat: React.FC<TimeFormatProps> = ({ startTime, endTime, fallBackTime }) => {
  const startDateTime = new Date(startTime);
  const endDateTime = new Date(endTime);
  if (isNaN(startDateTime.getTime()) || isNaN(endDateTime.getTime())) {
    return formatDate(fallBackTime);
  } else {
     return (
    <>
      Start: {formatDateAndTime(startDateTime)}
      <br />
      End: {formatDateAndTime(endDateTime)}
    </>
  ); 
  }

};

export default TimeFormat;
