import {SyntheticEvent} from "react";

export const isServer = () => typeof window === "undefined";
export const isDev = () => process.env.NODE_ENV !== "production";

export const stopEvent = (e?: SyntheticEvent): void => {
  if (!e)
    return;

  if (e.preventDefault)
    e.preventDefault();

  if (e.stopPropagation)
    e.stopPropagation();
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
