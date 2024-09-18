import { ChangeEvent, FC, useEffect, useState } from "react";

type InputProps = {
  value: string;
  onChange: (value: string) => void;
  label?: string | null;
};

const Input: FC<InputProps> = ({
  value: initialValue,
  onChange,
  label,
}) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const regex = /^[0-9]*\.?[0-9]*$/;
    if (regex.test(inputValue)) {
      setValue(inputValue);
      onChange(inputValue);
    }
  };

  return (
    <div className="relative my-3 w-full">
      <input
        value={value}
        onChange={handleChange}
        type="number"
        className="text-emerald-900  border peer block w-full appearance-none rounded-md border-green-600 px-0 py-[14px] pl-6 text-sm focus:border-emerald-500 focus:outline-none focus:ring-0"
      />
      {label && (
        <label className="absolute pointer-events-none top-4 left-6 text-emerald-600 text-sm bg-white duration-300 transform -translate-y-6 transparent peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6 peer-focus:px-[4px] peer-focus:transparent">
          {label}
        </label>
      )}
    </div>
  );
};

export default Input;
