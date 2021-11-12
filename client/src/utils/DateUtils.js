export const getDisplayDate = (date) => {
    const Months = [
      "Jan",
      "Febr",
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
      "Sun",
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat"
    ]
  
    let newDate = new Date(date);
    return daysOfWeek[newDate.getDay()] + ", " + newDate.getDate() + " " + Months[newDate.getMonth()] + " " +
      newDate.getFullYear().toString() + " @ " + formatTime(newDate.getHours()) + ":" + formatTime(newDate.getMinutes());
  }

  function formatTime(value) {
      return ("0" + value).slice(-2)
  }