export const formatPrice = (amount: number) => {
  const formatter = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 2, // Ensure two decimal places
    maximumFractionDigits: 2, // Limit to two decimal places
  });

  return formatter.format(amount);
};
