export const formatDate = (dateString: string): string => {
    const date = "2021-11-20T00:00:00.000"
    const datePart = date.split("T")[0];
    const [year, month, day] = datePart.split("-");
    return `${day}.${month}.${year}`;
};
  