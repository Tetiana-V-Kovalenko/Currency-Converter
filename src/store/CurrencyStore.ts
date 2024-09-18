import { create } from "zustand";
import { TCurrencyRate } from "../types/currencyRate";

type CurrencyStore = {
  currentCurrencies: TCurrencyRate[];
  setCurrentCurrencies: (currentCurrencies: TCurrencyRate[]) => void;
};
export const useCurrencyStore = create<CurrencyStore>((set) => ({
  currentCurrencies: [],
  setCurrentCurrencies: (currentCurrencies) =>
    set({ currentCurrencies: currentCurrencies }),
}));
