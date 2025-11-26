import type { LineSeries } from "@nivo/line";
import type {
  FinancialWorkingCapital,
  FinancialWorkingCapitalData,
} from "../../../../../types/financial";
import type { LineGraphData } from "./types";

export const monthMap: { [key: string]: string } = {
  Ocak: "Jan",
  Şubat: "Feb",
  Mart: "Mar",
  Nisan: "Apr",
  Mayıs: "May",
  Haziran: "Jun",
  Temmuz: "Jul",
  Ağustos: "Aug",
  Eylül: "Sep",
  Ekim: "Oct",
  Kasım: "Nov",
  Aralık: "Dec",
};

export const formatNumber = (value: number): string => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(0)}K`;
  }
  return value.toString();
};

export const workingCapitalDataConverter = (
  data: FinancialWorkingCapital
): LineGraphData => {
  const initialData = data.data;
  if (!initialData || initialData.length === 0) {
    return { graphData: [], currency: data.currency };
  }

  const currency = data.currency;
  const graphData: LineSeries[] = [];

  const excludeKeys: string[] = ["month", "net"];

  Object.keys(initialData[0]).forEach((key) => {
    if (!excludeKeys.includes(key)) {
      graphData.push({
        id: key,
        data: initialData.map((item) => ({
          x: item.month,
          y: item[key as keyof FinancialWorkingCapitalData],
        })),
      });
    }
  });

  return { graphData, currency };
};
