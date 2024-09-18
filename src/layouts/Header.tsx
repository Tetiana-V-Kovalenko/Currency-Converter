import { useEffect, useState } from "react";
import { fetchCurrentCurrencyRate } from "../service/fetchCurrentCurrency";
import { TCurrencyRate } from "../types/currencyRate";
import { useCurrencyStore } from "../store/CurrencyStore";

const Header = () => {
  const [displayedCurrencies, setDisplayedCurrencies] = useState<
    TCurrencyRate[]
  >([]);

  const { setCurrentCurrencies } = useCurrencyStore();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchCurrentCurrencyRate();
      const filteredData = data.filter(
        (d: TCurrencyRate) => d.cc === "USD" || d.cc === "EUR"
      );
      setCurrentCurrencies(data);
      setDisplayedCurrencies(filteredData);
    };

    fetchData();
  }, []);

  return (
    <header className=" w-full bg-emerald-200  h-[70px]">
      <div className="max-w-[1200px] px-4 w-[80%] mx-auto h-full justify-between  flex items-center font-jost font-semibold text-emerald-900">
        <div className="text-[24px]">Currency converter</div>
        <div className="flex items-center gap-9">
          <div>
            {displayedCurrencies.length !== 0
              ? displayedCurrencies[0].exchangedate
              : null}
          </div>
          {displayedCurrencies.map((currency) => (
            <div key={currency.cc}>
              <div>{currency.cc}</div>
              <div className="font-normal">
                {Math.round(currency.rate * 100) / 100}
              </div>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
};
export default Header;
