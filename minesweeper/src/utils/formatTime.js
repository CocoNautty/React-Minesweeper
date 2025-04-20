/**
 * Formats a time in milliseconds into a string of the format "mm:ss.ms".
 * The function divides the milliseconds into minutes, seconds, and milliseconds and formats them into a readable string.
 *
 * @param {number} milseconds - The time in milliseconds to be formatted.
 * @returns {string} - The formatted time in the "mm:ss.ms" format.
 *
 * @example
 * // Format a time of 12500 milliseconds (12.5 seconds)
 * const formattedTime = formatTime(12500);
 * console.log(formattedTime); // Output: "00:12.50"
 */

export const formatTime = (milseconds) => {
  const minutes = Math.floor(milseconds / 6000);
  const remainingSeconds = Math.floor((milseconds - minutes * 6000) / 100);
  const remainMilSeconds = milseconds % 100;
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(remainingSeconds).padStart(2, '0');
  const formattedMilSeconds = String(remainMilSeconds).padStart(2, '0');
  return `${formattedMinutes}:${formattedSeconds}.${formattedMilSeconds}`;
};
