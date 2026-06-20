import { en } from '../constants/baseLocalization';

export const useLocale = () => {
  const t = (key: string, variables?: Record<string, any>) => {
    const keys = key.split('.');
    let result: any = en;
    for (const k of keys) {
      if (result && result[k]) {
        result = result[k];
      } else {
        return key; // Fallback to key
      }
    }
    
    if (typeof result === 'string' && variables) {
      let templated = result;
      for (const [k, v] of Object.entries(variables)) {
        templated = templated.replace(`{{${k}}}`, String(v));
      }
      return templated;
    }
    
    return typeof result === 'string' ? result : key;
  };

  return { t };
};
