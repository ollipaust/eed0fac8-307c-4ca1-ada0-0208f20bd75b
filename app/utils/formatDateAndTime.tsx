export const formatRawDate = (dateString: string | null): string => {
  return dateString?.split("T")[0] || 'No date available.';
};

export const formatDisplayDate = (dateString: string | null): string => {
  const formattedDateTime = dateString?.split("T");

  if (!formattedDateTime) {
    return 'No date available.';
  }

  const datePart = formattedDateTime[0];
  const [year, month, day] = datePart.split("-"); // Updated this line

  return `${day}/${month}/${year}`;
};

export const formatDateAndTime = (date: Date): string => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString().slice(-2);
  
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const amPM = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12 || 12;

  return `${day}/${month}/${year}, ${hours}:${minutes} ${amPM}`;
};

interface TimeFormatProps {
startTime: string;
endTime: string;
fallBackTime: string;
}

const TimeFormat: React.FC<TimeFormatProps> = ({ startTime, endTime, fallBackTime }) => {
if (!startTime || !endTime) {
  return 'No date available.';
}

const startDateTime = new Date(startTime);
const endDateTime = new Date(endTime);

if (isNaN(startDateTime.getTime()) || isNaN(endDateTime.getTime())) {
  return formatRawDate(fallBackTime);
} else {
  return (
    <>
      {formatDateAndTime(startDateTime)} &mdash; {formatDateAndTime(endDateTime)}
    </>
  );
}
};

export default TimeFormat;
