import NextI18Next, {InitConfig} from "next-i18next";

import {Dictionary} from "./types";

const baseCfg: InitConfig = {
  defaultLanguage: "en",
  otherLanguages: [],
  browserLanguageDetection: true,
  serverLanguageDetection: true,
  keySeparator: false,
  nsSeparator: false,
  shallowRender: true,
  react: {
    useSuspense: false,
    wait: true,
  }
};

export class _NextI18Next {
  private static instance: NextI18Next;

  private constructor() {
    // Locked
  }

  static getInstance() {
    return _NextI18Next.instance;
  }

  static i18n() {
    return _NextI18Next.instance?.i18n;
  }

  static init(cfg: InitConfig, namespaces: object) {
    _NextI18Next.instance = new NextI18Next({
      ...baseCfg,
      ...cfg,
      ns: [
        ...Object.values(i18nSharedNamespaces), ...Object.values(namespaces),
      ]
    });
  }

  static allLanguages() {
    return _NextI18Next.instance.config.allLanguages;
  }
}

export enum i18nSharedNamespaces {
  API = "api",
  Error = "error",
  Common = "common",
  Shared = "shared",
}

export const localeXTerritory: Dictionary<string> = {
  "en": "en_US",
  "de": "de_DE",
  "es": "es_ES",
  "fr": "fr_FR",
  "pl": "pl_PL",
  "ru": "ru_RU",
};

export type NamespaceLike<T> = ((T)[keyof T]) | ((typeof i18nSharedNamespaces)[keyof typeof i18nSharedNamespaces]) | string;

export const includeSharedNamespaces = <T extends Dictionary<string>>(namespaces: Array<NamespaceLike<T>> = []): string[] => [i18nSharedNamespaces.Common, i18nSharedNamespaces.Shared, i18nSharedNamespaces.Error, i18nSharedNamespaces.API, ...namespaces];

// @ts-ignore
export {nextI18NextRewrites} from "next-i18next/rewrites";
