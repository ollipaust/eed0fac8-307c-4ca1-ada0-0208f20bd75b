interface TimeFormatProps {
  startTime: string;
  endTime: string;
}

const formatDateAndTime = (date: Date): string => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString().slice(-2);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${day}.${month}.${year}, ${hours}:${minutes}:00`;
};

const TimeFormat: React.FC<TimeFormatProps> = ({ startTime, endTime }) => {
  const startDateTime = new Date(startTime);
  const endDateTime = new Date(endTime);

  return (
    <>
      Start: {formatDateAndTime(startDateTime)}
      <br />
      End: {formatDateAndTime(endDateTime)}
    </>
  );
};

export default TimeFormat;
