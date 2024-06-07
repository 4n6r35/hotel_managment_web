export function formatPriceToCurrency (price: string): string {
  const numericPrice = parseFloat(price);
  if (isNaN(numericPrice)) {
    throw new Error("Invalid price format");
  }

  const formattedPrice = numericPrice.toLocaleString('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });

  return formattedPrice;
}