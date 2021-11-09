export const isServer = () => typeof window === "undefined";
export const isDev = () => process.env.NODE_ENV !== "production";

export const stopEvent = (e?: Pick<Event, "preventDefault" | "stopPropagation">): void => {
  e?.preventDefault?.();
  e?.stopPropagation?.();
};

export const updateItemInArray = <T>(array: T[], index: number, value?: T) => {
  const newArray = [...array];

  if (!value)
    newArray.splice(index, 1);
  else if (index >= newArray.length) {
    newArray.push(value);
  } else {
    newArray[index] = value;
  }

  return newArray;
};
