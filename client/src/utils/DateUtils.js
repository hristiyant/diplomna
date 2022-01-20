export const getDisplayDate = (date) => {
  const newDate = new Date(date);
  date = date.split("/");

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

  const year = date[2];
  const month = date[1];
  const day = date[0];

  // Create a Date object from passed parameter (month is 0-indexed)
  // let newDate = new Date(year, month - 1, day);
  // let newDate = new Date(year, month - 1, day);

  return daysOfWeek[newDate.getDay() - 1] + ", " +
    newDate.getDate() + " " +
    Months[newDate.getMonth()] + " " +
    newDate.getFullYear().toString();
}