import currencyFormatter from "currency.js";

export const getCurrencyWithSymbol = (
  currency: string,
  value: number
): string => {
  switch (currency) {
    case "USD":
      return currencyFormatter(value, { symbol: "$" }).format();
    case "TRY":
      return currencyFormatter(value, { symbol: "₺" }).format();
    case "GBP":
      return currencyFormatter(value, { symbol: "£" }).format();
    default:
      return value.toString();
  }
};
