import currencyFormatter from "currency.js";

export const getCurrencyWithSymbol = (
  currency: string,
  value: number
): string => {
  let formatted: string;
  switch (currency) {
    case "USD":
      formatted = currencyFormatter(value, { symbol: "$" }).format();
      break;
    case "TRY":
      formatted = currencyFormatter(value, { symbol: "₺" }).format();
      break;
    case "GBP":
      formatted = currencyFormatter(value, { symbol: "£" }).format();
      break;
    default:
      return value.toString();
  }
  // Remove ".00" decimals if present
  return formatted.replace(/\.00$/, "");
};

