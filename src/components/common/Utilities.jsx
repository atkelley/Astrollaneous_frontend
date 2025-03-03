const getOrdinalNumber = (number) => {
  let selector = ((number > 3 && number < 21) || number % 10 > 3) ? 0 : number % 10;  
  return number + ['th', 'st', 'nd', 'rd'][selector];
};

export const getFormalDateString = (dateString) => {
  let date = (dateString) ? new Date(dateString.split("T")[0] + "T12:00:00.000Z") : new Date();
  let day = getOrdinalNumber(date.getDate());
  let month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][date.getMonth()];
  let year = date.getFullYear();
  return `${month} ${day}, ${year}`;
}

export const getConvertedDateTime = (dateString) => {
  let date = new Date(dateString);
  return ((date.getHours() % 12) ? date.getHours() % 12 : 12) + ':' + ((date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes()) + ' ' + ((date.getHours() >= 12) ? 'PM' : 'AM');
}

export const capitalizeEveryFirstLetter = (string) => {
  return (string.toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' '));
}

export const reformatDateString = (dateString) => {
  let dateArray = dateString.split('-');
  return `${dateArray[1]}/${dateArray[2]}/${dateArray[0].substring(2, 4)}`;
}

export const getNextDate = (date) => {
  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + 1);
  return nextDate;
}
