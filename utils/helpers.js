module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return format(new Date(date), "MM/dd/yyyy");
  },
  format_time: (date) => {
    // Format time as HH:mm:ss
    return format(new Date(date), "HH:mm:ss");
  },
  truncate_text: (text, length) => {
    // Truncate text to a specified length and add ellipsis
    if (text.length > length) {
      return text.slice(0, length) + "...";
    }
    return text;
  },
  get_date: (date) => {
    // Get just the date part as MM/DD/YYYY
    return format(new Date(date), "MM/dd/yyyy");
  },
  get_time: (date) => {
    // Get just the time part as HH:mm:ss
    return format(new Date(date), "HH:mm:ss");
  },
  is_equal: (a, b) => {
    // Check if two values are equal
    return a === b;
  },
};
