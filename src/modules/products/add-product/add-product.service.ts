type Product = { name: string };

type NewProductPageModel = {
  error: string | null;
  shouldShowSuccessMessage: boolean;
  products: Array<Product> | null;
  shouldShowLoadingIndicator: boolean;
};

export const getNewProductPageModel = (
  response?: Array<Product>,
  error?: Error | null,
  isPending = false,
  isSuccess = false
): NewProductPageModel => {
  return {
    error: error?.message ?? null,
    shouldShowSuccessMessage: isSuccess,
    products: response ?? null,
    shouldShowLoadingIndicator: isPending,
  };
};
