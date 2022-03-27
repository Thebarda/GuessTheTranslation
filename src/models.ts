export interface Translation {
  en: string;
  fr: Array<string>;
}

export enum CompareTranslationResult {
  Equal,
  AlmostEqual,
  Different,
}

export interface Language {
  from: string;
  to: string;
}

export interface Profile {
  language: Language;
  name: string;
  translations: Array<Translation>;
}

export interface Profiles {
  [key: string]: Profile;
}
