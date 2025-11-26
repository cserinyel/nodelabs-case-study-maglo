import { useState, useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";
import { ArrowDownIcon } from "../../../assets/icons/icons";
import Icon from "../icon/icon";

type SelectOption = {
  key: string;
  value: string;
  disabled?: boolean;
};

interface SelectProps {
  options: SelectOption[];
  value?: SelectOption["key"];
  defaultValue?: SelectOption["key"];
  className?: string;
  name: string;
  label?: string;
  error?: string[];
  onChange?: (key: string, option: SelectOption) => void;
  placeholder?: string;
}

const Select = ({
  options,
  name,
  label,
  value,
  defaultValue,
  onChange,
  placeholder = "Select an option",
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState<string | undefined>(
    defaultValue
  );
  const containerRef = useRef<HTMLDivElement>(null);

  // Determine if controlled or uncontrolled
  const isControlled = value !== undefined;
  const selectedKey = isControlled ? value : internalValue;
  const selectedOption = options.find((option) => option.key === selectedKey);

  const listboxId = `${name}-listbox`;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (key: string) => {
    const option = options.find((opt) => opt.key === key);
    if (option && !option.disabled) {
      if (!isControlled) {
        setInternalValue(key);
      }
      onChange?.(key, option);
      setIsOpen(false);
    }
  };

  const handleSelectClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleSelectClick();
    } else if (e.key === "Escape" && isOpen) {
      setIsOpen(false);
    }
  };

  const handleOptionKeyDown = (e: React.KeyboardEvent, key: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleChange(key);
    }
  };

  const classes = twMerge(
    "max-w-[200px]",
    "border border-(--border-color) rounded-md"
  );
  const selectClasses = twMerge(
    "flex items-center justify-between gap-[10px]",
    "text-[12px]/[100%] font-[400] text-(--text-color-1)",
    "bg-(--bg-color-1)",
    "rounded-md",
    "cursor-pointer",
    "pl-[10px] pr-[8px] py-[6px] w-full",
    "transition-all duration-200",
    "hover:bg-(--bg-color-2) hover:text-(--text-color-1)"
  );
  const labelClasses = twMerge(
    "text-input-label",
    "h-[36px] flex items-center"
  );
  const optionClasses = twMerge(
    "flex items-center justify-between gap-[10px]",
    "text-[12px]/[100%] text-(--text-color-3)",
    "bg-(--bg-color-1)",
    "pl-[10px] pr-[8px] py-[8px] w-full",
    "hover:bg-(--bg-color-2) hover:text-(--text-color-1)",
    "cursor-pointer",
    "data-[selected=true]:text-(--text-color-1)"
  );
  return (
    <div className={classes} ref={containerRef}>
      {label && (
        <label id={`${name}-label`} className={labelClasses}>
          {label}
        </label>
      )}
      <div className="relative">
        <input type="hidden" name={name} value={selectedKey || ""} />
        <button
          type="button"
          className={selectClasses}
          onClick={handleSelectClick}
          onKeyDown={handleKeyDown}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-labelledby={label ? `${name}-label` : undefined}
          aria-controls={listboxId}
        >
          <span>{selectedOption?.value || placeholder}</span>
          <Icon src={ArrowDownIcon} size="xxs" aria-hidden="true" />
        </button>
        {isOpen && (
          <ul
            id={listboxId}
            role="listbox"
            aria-labelledby={label ? `${name}-label` : undefined}
            className="absolute z-50 left-0 min-w-full max-h-[200px] overflow-y-auto top-[calc(100%+10px)] flex flex-col shadow-md rounded-md bg-(--bg-color-1)"
          >
            {options.map((option) => (
              <li
                key={option.key}
                role="option"
                aria-selected={selectedKey === option.key}
                aria-disabled={option.disabled}
                className={twMerge(
                  optionClasses,
                  option.disabled && "opacity-50 cursor-not-allowed"
                )}
                data-selected={selectedKey === option.key}
                onClick={() => !option.disabled && handleChange(option.key)}
                onKeyDown={(e) =>
                  !option.disabled && handleOptionKeyDown(e, option.key)
                }
                tabIndex={option.disabled ? -1 : 0}
                aria-label={option.value}
              >
                {option.value}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Select;
