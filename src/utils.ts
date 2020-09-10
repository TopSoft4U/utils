import {SyntheticEvent} from "react";

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
