import { Product } from "../api/types";

type Props = {
  products: Array<Product>;
  className?: string;
};

export const ProductsList = (props: Props) => {
  return (
    <div className={"overflow-x-auto " + props.className}>
      <h2 className="text-2xl font-bold text-blue-700">Products:</h2>

      <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
        <thead className="ltr:text-left rtl:text-right">
          <tr>
            <th
              className={
                "whitespace-nowrap px-4 py-2 font-medium text-gray-900"
              }
            >
              Product name
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {props.products.map((product) => (
            <tr key={product.name} className="odd:bg-gray-50">
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                {product.name}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
