import { Button } from "../components/Button";
import Input from "../components/Input";
import { ProductsList } from "../components/ProductsList";
import { useNewProductPage } from "../modules/products/add-product/useAddProduct";

export const NewProductPage = () => {
  const { actions, model } = useNewProductPage();

  return (
    <div className="flex flex-col items-center">
      {model.products && (
        <ProductsList
          products={model.products}
          className="mt-5 w-96 max-w-full"
        />
      )}

      <form
        className="flex flex-col gap-4 w-96 max-w-full mt-6"
        onSubmit={(e) => {
          e.preventDefault();
          const productName = new FormData(e.currentTarget).get(
            "name"
          ) as string;
          actions.addProduct(productName);
          e.currentTarget.reset();
        }}
      >
        <h2 className="text-2xl font-bold text-blue-700">Add a new product</h2>

        <Input id="name" name="name" label="Product name:" autoFocus />

        <Button type="submit" disabled={model.shouldShowLoadingIndicator}>
          {model.shouldShowLoadingIndicator ? "Adding..." : "Save"}
        </Button>

        {model.error && (
          <p className="text-red-600 text-center">{model.error}</p>
        )}
      </form>

      {model.shouldShowSuccessMessage && (
        <p className="text-xl text-green-500 mt-4">
          Product added successfully
        </p>
      )}
    </div>
  );
};
