export const calculateCurrencyAmount = (
  baseRate: number,
  targetRate: number,
  amount: number
) => {
  return Math.round(amount * (baseRate / targetRate) * 100) / 100;
};
