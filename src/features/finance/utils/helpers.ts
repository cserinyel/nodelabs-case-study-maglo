import currencyFormatter from "currency.js";

interface GetCurrencyWithSymbolProps {
  currency: string;
  value: number;
  removeZeroDecimals?: boolean;
  isExpense?: boolean;
}

export const getCurrencyWithSymbol = ({
  currency,
  value,
  removeZeroDecimals = false,
  isExpense = false,
}: GetCurrencyWithSymbolProps): string => {
  // Convert negative to positive
  const absoluteValue = Math.abs(value);
  let formatted: string;
  switch (currency) {
    case "USD":
    case "$":
      formatted = currencyFormatter(absoluteValue, { symbol: "$" }).format();
      break;
    case "TRY":
    case "₺":
      formatted = currencyFormatter(absoluteValue, { symbol: "₺" }).format();
      break;
    case "GBP":
    case "£":
      formatted = currencyFormatter(absoluteValue, { symbol: "£" }).format();
      break;
    case "EUR":
    case "€":
      formatted = currencyFormatter(absoluteValue, { symbol: "€" }).format();
      break;
    default:
      return absoluteValue.toString();
  }
  // Remove ".00" decimals if present
  if (removeZeroDecimals) {
    formatted = formatted.replace(/\.00$/, "");
  }
  if (isExpense) {
    return `- ${formatted}`;
  }
  return formatted;
};
