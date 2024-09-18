import { TCurrencyRate } from "../types/currencyRate";

export const fetchCurrentCurrencyRate = async (
  format: "xml" | "json" | undefined = "json"
): Promise<TCurrencyRate[]> => {
  try {
    const data = await fetch(
      `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?${format}`
    ).then((r) => r.json());

    //remove currencies from aggressor countries
    const filteredData = data.filter(
      (currency: TCurrencyRate) =>
        currency.cc !== "RUB" && currency.cc !== "BYN"
    );

    //add ukrainian currency
    filteredData.unshift({
      r030: 0,
      txt: "Українська гривня",
      rate: 1,
      cc: "UAH",
      exchangedate: new Date().toLocaleDateString("uk-UA"),
    });

    return filteredData;

  } catch (error) {
    console.error("Error fetching current currency rate", error);
    return [];
  }
};
