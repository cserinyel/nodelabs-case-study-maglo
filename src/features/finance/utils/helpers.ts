import currencyFormatter from "currency.js";

export const getCurrencyWithSymbol = (
  currency: string,
  value: number
): string => {
  // Convert negative to positive
  const absoluteValue = Math.abs(value);
  let formatted: string;
  switch (currency) {
    case "USD":
      formatted = currencyFormatter(absoluteValue, { symbol: "$" }).format();
      break;
    case "TRY":
      formatted = currencyFormatter(absoluteValue, { symbol: "₺" }).format();
      break;
    case "GBP":
      formatted = currencyFormatter(absoluteValue, { symbol: "£" }).format();
      break;
    default:
      return absoluteValue.toString();
  }
  // Remove ".00" decimals if present
  return formatted.replace(/\.00$/, "");
};
