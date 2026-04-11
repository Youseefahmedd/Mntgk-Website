const dictionaries = {
  en: () => import('@/dictionaries/en.json').then((module) => module.default),
  ar: () => import('@/dictionaries/ar.json').then((module) => module.default),
};

export const getDictionary = async (locale) => {
  if (!dictionaries[locale]) {
    return dictionaries.en();
  }
  return dictionaries[locale]();
};
