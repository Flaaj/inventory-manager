type Product = { name: string };

type NewProductPageModel = {
  shouldShowForm: boolean;
  error: string | null;
  shouldShowSuccessMessage: boolean;
  products: Array<Product> | null;
  shouldShowLoadingIndicator: boolean;
};

export const getNewProductPageModel = (
  response?: Array<Product>,
  error?: Error | null,
  isPending = false
): NewProductPageModel => {
  return {
    shouldShowForm: !response,
    error: error?.message ?? null,
    shouldShowSuccessMessage: !!response,
    products: response ?? null,
    shouldShowLoadingIndicator: isPending,
  };
};
