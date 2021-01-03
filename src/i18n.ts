import {NextApiRequest} from "next";
import ntGetT from "next-translate/getT";
import {Dictionary} from "./types";

export const localeXTerritory: Dictionary<string> = {
  "en": "en_US",
  "de": "de_DE",
  "es": "es_ES",
  "fr": "fr_FR",
  "pl": "pl_PL",
  "ru": "ru_RU",
};

export const apiGetT = (req: NextApiRequest, ns: string) => {
  const lang = req.query.__nextLocale as string;
  return ntGetT(lang, ns);
};
