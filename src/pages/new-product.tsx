import { useNewProductPage } from "../modules/products/add-product/useAddProduct";

const NewProductPage = () => {
  const { actions, model } = useNewProductPage();

  return (
    <div>
      {model.shouldShowForm && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const productName = new FormData(e.currentTarget).get(
              "name"
            ) as string;
            actions.addProduct(productName);
          }}
        >
          <label htmlFor="name">Product name:</label>
          <input id="name" name="name" />

          <button type="submit" disabled={model.shouldShowLoadingIndicator}>
            {model.shouldShowLoadingIndicator ? "Loading..." : "Save"}
          </button>
        </form>
      )}

      {model.error && <p>{model.error}</p>}

      {model.shouldShowSuccessMessage && <p>Product added successfully</p>}

      {model.products && (
        <ul>
          {model.products.map((product) => (
            <li key={product.name}>{product.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NewProductPage;
