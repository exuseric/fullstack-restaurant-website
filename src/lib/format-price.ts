export const AmountWithCurrency = (price: number, locale="en-KE", maxFractions = 2, currency="KES") => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: maxFractions,
  }).format(price);
};