// src/utils/validationUtils.js
export const isRequired = (value) => value.trim() !== '';
export const isPositiveNumber = (value) => Number(value) > 0;
