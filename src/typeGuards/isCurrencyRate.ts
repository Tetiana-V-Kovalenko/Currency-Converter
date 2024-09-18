import { TCurrencyRate } from "../types/currencyRate";

export function isCurrencyRate(obj: any): obj is TCurrencyRate {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof obj.r030 === "number" &&
    typeof obj.txt === "string" &&
    typeof obj.rate === "number" &&
    typeof obj.cc === "string" &&
    typeof obj.exchangedate === "string"
  );
}
export function isCurrencyRateArray(
  arr: any[] | TCurrencyRate[]
): arr is TCurrencyRate[] {
  return Array.isArray(arr) && arr.every(isCurrencyRate);
}
