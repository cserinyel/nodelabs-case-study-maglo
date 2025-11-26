import dayjs from "dayjs";

export const delay = async (ms: number = 1000): Promise<void> =>
  await new Promise((resolve) => setTimeout(resolve, ms));

export const formatDate = (
  date: string,
  format: string = "DD MMM YYYY"
): string => {
  const dateObject = new Date(date.toString());
  return dayjs(dateObject).format(format);
};
