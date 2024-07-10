type Product = { name: string };

type NewProductPageModel = {
  error: string | null;
  shouldShowSuccessMessage: boolean;
  products: Array<Product> | null;
  shouldShowLoadingIndicator: boolean;
};

export type NewProductPageModelParams = {
  response?: Array<Product>;
  error?: Error | null;
  isPending: boolean;
  isSuccess: boolean;
};

export const getNewProductPageModel = (
  params: NewProductPageModelParams
): NewProductPageModel => {
  const { response, error, isPending, isSuccess } = params;

  return {
    error: error?.message ?? null,
    shouldShowSuccessMessage: isSuccess,
    products: response ?? null,
    shouldShowLoadingIndicator: isPending,
  };
};
