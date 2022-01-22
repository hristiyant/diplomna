export const getDisplayDate = (date) => {
  const newDate = new Date(date);

  const Months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];

  const daysOfWeek = [
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun"
  ]

  return daysOfWeek[newDate.getDay() - 1] + ", " +
    newDate.getDate() + " " +
    Months[newDate.getMonth()] + " " +
    newDate.getFullYear().toString() + " @ " +
    newDate.getUTCHours() + ":" +
    newDate.getUTCMinutes();
}