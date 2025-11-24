import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { ArrowDownIcon } from "../../../assets/icons/icons";
import Icon from "../icon/icon";

type SelectOption = {
  key: string;
  value: string;
  disabled?: boolean;
};

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];
  selectedOptionKey?: SelectOption["key"];
  className?: string;
  name: string;
  label?: string;
  error?: string[];
}

const Select = ({ options, name, label, selectedOptionKey }: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<
    SelectOption | undefined
  >(options.find((option) => option.key === selectedOptionKey));

  const handleChange = (key: string) => {
    const selectedOption = options.find((option) => option.key === key);
    if (selectedOption) {
      setSelectedOption(selectedOption);
      setIsOpen(false);
    }
  };

  const handleSelectClick = () => {
    setIsOpen((prev) => !prev);
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
    <div className={classes}>
      {label && (
        <label htmlFor={name} className={labelClasses}>
          {label}
        </label>
      )}
      <div className="relative">
        <div className={selectClasses} onClick={handleSelectClick}>
          {selectedOption?.value || "Select an option"}
          <Icon src={ArrowDownIcon} size="xxs" />
        </div>
        {isOpen && (
          <div className="absolute z-50 left-0 min-w-full max-h-[200px] overflow-y-auto top-[calc(100%+10px)] flex flex-col shadow-md rounded-md bg-(--bg-color-1)">
            {options.map((option) => (
              <div
                key={option.key}
                className={optionClasses}
                data-selected={selectedOption?.key === option.key}
                onClick={() => handleChange(option.key)}
              >
                {option.value}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Select;
