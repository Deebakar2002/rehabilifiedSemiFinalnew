// src/utils/dateUtils.js
export const formatDateRange = (start, end) => `${start} to ${end}`;

export const isValidDate = (dateString) => {
  // Implement validation logic here if needed
  return !isNaN(Date.parse(dateString));
};
