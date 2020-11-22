export const padTime = (val: number, times = 2) => `${val || 0}`.padStart(times, "0");
export const dateTimeFormat = (date: Date | string) => {
  if (!(date instanceof Date))
    date = new Date(date);

  return date?.toISOString();
};

export const parseDate = (inputDate: ConstructorParameters<typeof Date>[0] | string | undefined) => {
  if (!inputDate)
    return new Date();

  const output: Date = new Date(inputDate);

  if (Object.prototype.toString.call(output) === "[object Date]") {
    if (output && !isNaN(output.getTime()))
      return output;
  }

  return new Date();
};
