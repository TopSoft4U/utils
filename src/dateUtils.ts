export const padTime = (val: number, times = 2) => `${val || 0}`.padStart(times, "0");
export const dateTimeFormat = (date: Date) => {
  return date.toISOString();
};