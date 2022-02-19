export const formatBalance = (number) => {
  const digits = Math.floor(number).toString().length;
  if (digits >= 6) return number.toPrecision(digits + 1);
  return number.toPrecision(6);
};
