import dayjs from "dayjs";
import { twMerge } from "tailwind-merge";

export const delay = async (ms: number = 1000): Promise<void> =>
  await new Promise((resolve) => setTimeout(resolve, ms));

export const formatDate = (
  date: string,
  format: string = "DD MMM YYYY"
): string => {
  const dateObject = new Date(date.toString());
  return dayjs(dateObject).format(format);
};

export const mediaQueryMerger = (query: string, classes: string): string => {
  const classesArray = classes.split(" ");
  const classesArrayWithQuery = classesArray.map((cls) => `${query}:${cls}`);
  return twMerge(...classesArrayWithQuery);
};
