export let hasShownPreloader = false;
export let isLanguageSwitching = false;

export const setPreloaderShown = (value: boolean) => {
  hasShownPreloader = value;
};

export const setIsLanguageSwitching = (value: boolean) => {
  isLanguageSwitching = value;
};
