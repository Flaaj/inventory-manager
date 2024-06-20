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
  error?: { error: string },
  isLoading = false
): NewProductPageModel => {
  return {
    shouldShowForm: !response,
    error: error?.error ?? null,
    shouldShowSuccessMessage: !!response,
    products: response ?? null,
    shouldShowLoadingIndicator: isLoading,
  };
};
