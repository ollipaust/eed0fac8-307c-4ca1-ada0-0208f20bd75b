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
