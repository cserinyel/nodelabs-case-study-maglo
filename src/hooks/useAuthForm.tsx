import { useState, useCallback } from "react";
import toast, { type Renderable } from "react-hot-toast";
import type { ValidationResult } from "../features/auth/utils/types";

type ValidationErrors = Record<string, string[] | undefined>;

interface ToastMessages {
  loadingText: string;
  successText: Renderable;
  errorText: string;
}

interface UseAuthFormOptions<T extends object> {
  initialData: T;
  validate: (data: T) => { isValid: boolean; errors: ValidationErrors };
  onSubmit: (data: T) => Promise<unknown>;
  toastMessages: ToastMessages;
}

export const useAuthForm = <T extends object>({
  initialData,
  validate,
  onSubmit,
  toastMessages,
}: UseAuthFormOptions<T>) => {
  const [formData, setFormData] = useState<T>(initialData);
  const [validationError, setValidationError] = useState<ValidationErrors>();

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { id, value } = e.target;
      setFormData((prev) => ({ ...prev, [id]: value }));
    },
    []
  );

  const handleValidation = useCallback(
    (data: T): boolean => {
      const { isValid, errors } = validate(data);
      setValidationError(isValid ? undefined : errors);
      return isValid;
    },
    [validate]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const isValid = handleValidation(formData);
      if (!isValid) {
        toast.error("Please fill in all fields correctly");
        return;
      }

      toast.promise(onSubmit(formData), {
        loading: toastMessages.loadingText,
        success: toastMessages.successText,
        error: (err) => (
          <b>
            {err?.response?.data?.message ||
              err?.message ||
              toastMessages.errorText}
          </b>
        ),
      });
    },
    [formData, handleValidation, onSubmit, toastMessages]
  );

  return {
    formData,
    validationError,
    handleInputChange,
    handleSubmit,
  };
};

// Helper to create validation function from individual field validators
export const createValidator = <T extends object>(fieldValidators: {
  [K in keyof T]: (value: string) => ValidationResult;
}) => {
  return (data: T): { isValid: boolean; errors: ValidationErrors } => {
    const errors: ValidationErrors = {};
    let isValid = true;

    for (const [field, validator] of Object.entries(fieldValidators) as [
      keyof T,
      (value: string) => ValidationResult
    ][]) {
      const result = validator(data[field] as string);
      if (!result.isValid) {
        isValid = false;
        errors[field as string] = result.errors;
      }
    }

    return { isValid, errors };
  };
};
