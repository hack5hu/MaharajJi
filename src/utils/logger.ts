export const Logger = {
  log: (message: string, ...optionalParams: any[]) => {
    if (__DEV__) {
      console.log(`[LOG] ${message}`, ...optionalParams);
    }
  },
  error: (message: string, ...optionalParams: any[]) => {
    if (__DEV__) {
      console.log(`[ERROR] ${message}`, ...optionalParams);
    }
  },
  warn: (message: string, ...optionalParams: any[]) => {
    if (__DEV__) {
      console.log(`[WARN] ${message}`, ...optionalParams);
    }
  },
  redact: (data: any) => {
    // Redacts sensitive PII information
    if (!data) return data;
    const redacted = { ...data };
    if (redacted.phoneNumber) {
      redacted.phoneNumber = '******' + String(redacted.phoneNumber).slice(-4);
    }
    return redacted;
  },
};
