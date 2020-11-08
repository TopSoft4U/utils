import {SyntheticEvent} from "react";
import {_NextI18Next} from "./i18n";

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

export const boolToText = (val: boolean) => {
  const {i18n} = _NextI18Next.getInstance();
  const t = i18n.t.bind(i18n);

  if (val)
    return t("Yes", {ns: "shared"});

  return t("No", {ns: "shared"});
};