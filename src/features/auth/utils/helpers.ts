import type { ValidationResult } from "./types";

const NAME_MIN_LENGTH = 3;
const NAME_MAX_LENGTH = 50;
const NAME_PATTERN = /^[a-zA-Z\s'-]+$/;
const NAME_CONSECUTIVE_SPACES_PATTERN = /\s{2,}/;
const NAME_LEADING_TRAILING_SPECIAL_CHARACTERS_PATTERN = /^[-']|[-']$/;
const EMAIL_MAX_LENGTH = 255;
const EMAIL_DOMAIN_MAX_LENGTH = 255;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_LENGTH = 128;
const PASSWORD_UPPERCASE_PATTERN = /[A-Z]/;
const PASSWORD_LOWERCASE_PATTERN = /[a-z]/;
const PASSWORD_SPECIAL_CHARACTERS_PATTERN =
  /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

export const validateName = (name: string): ValidationResult => {
  // Required check
  const trimmed = name.trim();
  if (name.length === 0 || trimmed.length === 0)
    return { isValid: false, errors: ["Name is required"] };

  // Minimum length
  if (trimmed.length < NAME_MIN_LENGTH || trimmed.length > NAME_MAX_LENGTH)
    return {
      isValid: false,
      errors: [
        `Name must be between ${NAME_MIN_LENGTH} and ${NAME_MAX_LENGTH} characters`,
      ],
    };

  // Character pattern (letters, spaces, hyphens, apostrophes)
  if (!NAME_PATTERN.test(trimmed)) {
    return {
      isValid: false,
      errors: [
        "Name can only contain letters, spaces, hyphens, and apostrophes",
      ],
    };
  }

  // No consecutive spaces
  if (NAME_CONSECUTIVE_SPACES_PATTERN.test(trimmed)) {
    return {
      isValid: false,
      errors: ["Name cannot contain consecutive spaces"],
    };
  }

  // No leading/trailing special characters
  if (NAME_LEADING_TRAILING_SPECIAL_CHARACTERS_PATTERN.test(trimmed)) {
    return {
      isValid: false,
      errors: ["Name cannot start or end with a hyphen or apostrophe"],
    };
  }

  return { isValid: true, errors: [] };
};

export const validateEmail = (email: string): ValidationResult => {
  const trimmed = email.trim();
  // Required check
  if (email.length === 0 || trimmed.length === 0)
    return { isValid: false, errors: ["Email is required"] };

  // Maximum length (RFC 5321 limit)
  if (trimmed.length > EMAIL_MAX_LENGTH)
    return {
      isValid: false,
      errors: [`Email is too long (max ${EMAIL_MAX_LENGTH} characters)`],
    };

  // Basic format validation (local@domain)
  if (!EMAIL_PATTERN.test(trimmed))
    return { isValid: false, errors: ["Invalid email address"] };

  // Check for spaces (not allowed in email)
  if (/\s/.test(trimmed))
    return { isValid: false, errors: ["Email cannot contain spaces"] };

  const [localPart, domainPart] = trimmed.split("@");
  // Check for valid local part length (before @)
  if (localPart.length === 0 || localPart.length > 64)
    return { isValid: false, errors: ["Invalid email address"] };

  // Check for valid domain part (after @)
  if (
    !domainPart ||
    domainPart.length === 0 ||
    domainPart.length > EMAIL_DOMAIN_MAX_LENGTH
  )
    return { isValid: false, errors: ["Invalid email address"] };

  return { isValid: true, errors: [] };
};

export const validatePasswordEntry = (password: string): ValidationResult => {
  // Required check
  if (password.length === 0)
    return { isValid: false, errors: ["Password is required"] };

  // Minimum length
  if (password.length < PASSWORD_MIN_LENGTH)
    return {
      isValid: false,
      errors: [
        `Password must be at least ${PASSWORD_MIN_LENGTH} characters long`,
      ],
    };

  // Maximum length
  if (password.length > PASSWORD_MAX_LENGTH)
    return {
      isValid: false,
      errors: [`Password is too long (max ${PASSWORD_MAX_LENGTH} characters)`],
    };

  // Check for leading/trailing whitespace (usually not desired)
  if (password !== password.trim())
    return {
      isValid: false,
      errors: ["Password cannot start or end with spaces"],
    };

  return { isValid: true, errors: [] };
};

export const validatePasswordCreation = (
  password: string
): ValidationResult => {
  const errors: string[] = [];
  // Required check
  if (password.length === 0)
    return { isValid: false, errors: ["Password is required"] };

  // Minimum length
  if (password.length < PASSWORD_MIN_LENGTH)
    errors.push(
      `Password must be at least ${PASSWORD_MIN_LENGTH} characters long`
    );

  // Uppercase character
  if (!PASSWORD_UPPERCASE_PATTERN.test(password))
    errors.push("Password must include at least one uppercase character");

  // Lowercase character
  if (!PASSWORD_LOWERCASE_PATTERN.test(password))
    errors.push("Password must include at least one lowercase character");

  // Special character
  if (!PASSWORD_SPECIAL_CHARACTERS_PATTERN.test(password))
    errors.push("Password must contain at least one special character");

  return {
    isValid: !errors.length,
    errors: errors.length > 0 ? errors : [],
  };
};
