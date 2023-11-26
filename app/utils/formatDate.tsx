export const formatDate = (dateString: string): string => {
    const date = dateString
    const datePart = date.split("T")[0];
    return datePart;
};
  