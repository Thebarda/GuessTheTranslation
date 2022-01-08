export interface Translation {
  en: string;
  fr: Array<string>;
}

export enum CompareTranslationResult {
  Equal,
  AlmostEqual,
  Different,
}
