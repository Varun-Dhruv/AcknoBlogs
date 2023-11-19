export const dateConverter = (dateString) => {
  const dateObject = new Date(dateString);

  // Extract day, month, and year from the Date object
  const day = dateObject.getUTCDate();
  const month = dateObject.getUTCMonth() + 1; // Month is zero-based, so we add 1
  const year = dateObject.getUTCFullYear();

  // Format day and month with leading zeros if necessary
  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;

  // Create the formatted date string in "dd-mm-yyyy" format
  const formattedDateString = `${formattedDay}-${formattedMonth}-${year}`;
  return formattedDateString;
};
