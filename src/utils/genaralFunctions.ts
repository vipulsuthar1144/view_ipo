import { IIPOSchema } from "@/schema/ipo.schema";
import { Timestamp } from "firebase/firestore";
import moment from "moment";

export const convertToISODate = (created_at: Timestamp) => {
  const milliseconds = created_at.seconds * 1000 + Math.floor(created_at.nanoseconds / 1000000);
  const date = new Date(milliseconds);
  return date.toISOString();
};

type TDateFormat = "MMM DD, YYYY" | "DD MMM YYYY, hh:mm:ss A" | "DD-MM-YY hh:mm A";
export const formatDate = (date?: string, outputFormat: TDateFormat = "MMM DD, YYYY"): string => {
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
    moment(dateToCompare).isBefore(moment().startOf("day")) || moment(dateToCompare).isSame(moment().startOf("day"))
  );
};

export const computeIPOStatus = (ipo: IIPOSchema) => {
  const today = new Date();
  const openDate = new Date(ipo?.timeline?.open_date ?? "");
  const closeDate = new Date(ipo?.timeline?.end_date ?? "");
  const allotmentDate = new Date(ipo?.timeline?.allotment_date ?? "");
  const listedDate = new Date(ipo?.timeline?.listing_date ?? "");

  if (today >= openDate && today <= closeDate)
    return {
      status: "LIVE",
      bgColor: "green",
    };

  if (today > closeDate && today <= allotmentDate)
    return {
      status: "CLOSE",
      bgColor: "red",
    };
  if (today > allotmentDate && today <= listedDate)
    return {
      status: "ALLOTMENT OUT",
      bgColor: "orange",
    };
  if (today > listedDate)
    return {
      status: "LISTED",
      bgColor: "secondary.main",
    };
  return {
    status: "UPCOMING",
    bgColor: "primary.main",
  };
};
