export const formatCurrency = (amount: number, currency: string = "MXN"): string => {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency,
  }).format(amount);
};