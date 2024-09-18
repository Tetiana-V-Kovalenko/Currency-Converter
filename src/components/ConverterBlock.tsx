import { useState } from "react";
import Select from "./Select";
import Input from "./Input";
import { TCurrencyRate } from "../types/currencyRate";
import { useCurrencyStore } from "../store/CurrencyStore";
import { calculateCurrencyAmount } from "../utils/calculateCurrencyAmount";

const ConverterBlock = () => {
  const { currentCurrencies } = useCurrencyStore();

  const [currencyRateExchange, setCurrencyRateExchange] =
    useState<TCurrencyRate | null>(null);
  const [currencyRateGet, setCurrencyRateGet] = useState<TCurrencyRate | null>(
    null
  );
  const [amountToExchange, setAmountToExchange] = useState<number>(0);
  const [amountToGet, setAmountToGet] = useState<number>(0);

  const handleCurrencyChange = (
    selectedCurrency: TCurrencyRate | null,
    isExchange: boolean
  ) => {
    if (isExchange) {
      setCurrencyRateExchange(selectedCurrency);
      if (selectedCurrency && currencyRateGet) {
        setAmountToGet(
          calculateCurrencyAmount(
            selectedCurrency.rate,
            currencyRateGet.rate,
            amountToExchange
          )
        );
      }
    } else {
      setCurrencyRateGet(selectedCurrency);
      if (currencyRateExchange && selectedCurrency) {
        setAmountToExchange(
          calculateCurrencyAmount(
            currencyRateExchange.rate,
            selectedCurrency.rate,
            amountToGet
          )
        );
      }
    }
  };

  const handleAmountChange = (amount: number, isExchange: boolean) => {
    if (isExchange) {
      setAmountToExchange(amount || 0);
      if (currencyRateExchange && currencyRateGet) {
        setAmountToGet(
          calculateCurrencyAmount(
            currencyRateExchange.rate,
            currencyRateGet.rate,
            amount
          )
        );
      }
    } else {
      setAmountToGet(amount || 0);
      if (currencyRateExchange && currencyRateGet) {
        setAmountToExchange(
          calculateCurrencyAmount(
            currencyRateGet.rate,
            currencyRateExchange.rate,
            amount
          )
        );
      }
    }
  };
  return (
    <div className="max-w-[1200px] w-[80%] mx-auto bg-white h-full flex justify-center gap-9 px-4 pt-[70px]">
      <div>
        <Select
          data={currentCurrencies}
          onChange={(selected) => handleCurrencyChange(selected, true)}
          label="Exchange"
        />
        <Input
          value={amountToExchange.toString()}
          onChange={(value) => handleAmountChange(Number(value), true)}
          label={currencyRateExchange?.cc}
        />
      </div>
      <div>
        <Select
          data={currentCurrencies}
          onChange={(selected) => handleCurrencyChange(selected, false)}
          label="Get"
        />
        <Input
          value={amountToGet.toString()}
          onChange={(value) => handleAmountChange(Number(value), false)}
          label={currencyRateGet?.cc}
        />
      </div>
    </div>
  );
};

export default ConverterBlock;
