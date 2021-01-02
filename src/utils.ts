import {SyntheticEvent} from "react";
import getT from "next-translate/getT";

export const isServer = () => typeof window === "undefined";
export const isDev = () => process.env.NODE_ENV !== "production";

export const isDefined = (value: unknown): boolean => {
  return !!value;
};

export const callIfExists = (func: unknown, ...args: unknown[]): unknown =>
  (typeof func === "function") && func(...args);

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

export const boolToText = async (val: boolean, lang = "en") => {
  const t = await getT(lang, "shared");

  if (val)
    return t("shared:yes");

  return t("shared:no");
};
