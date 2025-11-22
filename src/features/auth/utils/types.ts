export type ValidationResult = {
  isValid: boolean;
  error?: string;
};

export type ValidationResultsList = {
  isValid: boolean;
  errors: string[];
};
