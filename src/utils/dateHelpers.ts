import { addDays, isSameDay, format, isAfter, addHours } from 'date-fns';

export interface DayOption {
  date: Date;
  dayName: string;
  dayNumber: string;
}

/**
 * Gets the next 14 days starting from today.
 */
export const getNext14Days = (): DayOption[] => {
  const today = new Date();
  return Array.from({ length: 14 }).map((_, i) => {
    const date = addDays(today, i);
    return {
      date,
      dayName: format(date, 'E'), // e.g., Mon, Tue
      dayNumber: format(date, 'd'), // e.g., 14, 15
    };
  });
};

/**
 * Validates that the selected start time is at least 1 hour in the future,
 * ONLY IF the selected date is today.
 */
export const validateStartTime = (selectedDate: Date, selectedStartTime: Date): boolean => {
  const now = new Date();
  if (!isSameDay(selectedDate, now)) {
    return true; // Not today, so any time is fine
  }

  // Create a Date object representing the selected time today
  const timeToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), selectedStartTime.getHours(), selectedStartTime.getMinutes());
  
  // Must be > now + 1 hour
  const oneHourFromNow = addHours(now, 1);
  return isAfter(timeToday, oneHourFromNow);
};

/**
 * Validates that the end time is strictly after the start time.
 */
export const validateEndTime = (startTime: Date, endTime: Date): boolean => {
  // Compare just the hours/minutes
  const start = new Date();
  start.setHours(startTime.getHours(), startTime.getMinutes(), 0, 0);
  
  const end = new Date();
  end.setHours(endTime.getHours(), endTime.getMinutes(), 0, 0);

  return isAfter(end, start);
};
