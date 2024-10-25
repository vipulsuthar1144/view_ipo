import { Timestamp } from "firebase/firestore";
import moment from "moment";

export const convertToISODate = (created_at: Timestamp) => {
  const milliseconds =
    created_at.seconds * 1000 + Math.floor(created_at.nanoseconds / 1000000);
  const date = new Date(milliseconds);
  return date.toISOString();
};

type TDateFormat =
  | "MMM DD, YYYY"
  | "DD MMM YYYY, hh:mm:ss A"
  | "DD-MM-YY hh:mm A";
export const formatDate = (
  date?: string,
  outputFormat: TDateFormat = "MMM DD, YYYY"
): string => {
  if (!moment(date).isValid()) return "";
  return moment(date).format(outputFormat);
};

export const formatPrice = (price?: number) => {
  if (!price || price == null) return "-";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
};

export const formatNumber = (num?: number) => {
  if (num == 0) return "0";
  if (!num || num == null) return "-";
  return new Intl.NumberFormat("en-IN").format(num);
};

export const isPastDate = (dateToCompare?: string) => {
  if (!moment(dateToCompare).isValid()) return;
  return moment(dateToCompare).isBefore(moment().startOf("day"));
};
export const isPastOrSameDate = (dateToCompare?: string) => {
  if (!moment(dateToCompare).isValid()) return;
  return (
    moment(dateToCompare).isBefore(moment().startOf("day")) ||
    moment(dateToCompare).isSame(moment().startOf("day"))
  );
};
