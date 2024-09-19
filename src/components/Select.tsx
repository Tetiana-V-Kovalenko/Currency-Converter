import { ChangeEvent } from "react";
import {
  isCurrencyRate,
  isCurrencyRateArray,
} from "../typeGuards/isCurrencyRate";
import { TCurrencyRate } from "../types/currencyRate";

export type SelectProps = {
  data: TCurrencyRate[] | number[];
  onChange: (value: TCurrencyRate | null) => void;
  label?: string;
};
const Select = ({ data, onChange, label }: SelectProps) => {
  
  if (!isCurrencyRateArray(data)) {
    return <div>Error: Data is not valid.</div>;
  }

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedCC = e.target.value;
    const selectedItem = data.find((item) => item.cc === selectedCC);
    if (isCurrencyRate(selectedItem)) {
      onChange(selectedItem);
    } else {
      onChange(null);
    }
  };
  return (
    <div>
      {label ? (
        <label
          htmlFor="vehicle"
          className="block text-lg font-medium text-green-900"
        >
          {label}
        </label>
      ) : null}
      <select
        id="vehicle"
        name="makes"
        onChange={handleSelect}
        className="mt-2 block w-fit h-[50px] py-2 px-3 border border-green-600 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-green-900 text-sm"
      >
        <option value="" className="text-green-600">
          -- Select --
        </option>
        {data.map((item) => (
          <option key={item.cc} value={item.cc}>
            {item.txt} ({item.cc})
          </option>
        ))}
      </select>
    </div>
  );
};
export default Select;
