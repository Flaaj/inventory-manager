import clsx from "clsx";
import { HTMLProps } from "react";

type Props = HTMLProps<HTMLSelectElement> & {
  id: string;
  name: string;
  label?: string;
};

export const Select = ({ className, label, children, ...props }: Props) => (
  <label
    htmlFor={props.id}
    className={clsx(
      "block overflow-hidden rounded-md border border-gray-200 px-3 py-2 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600",
      className
    )}
  >
    {label && (
      <span className="text-xs font-medium text-gray-700"> {label} </span>
    )}

    <select
      className="mt-1 w-full border-none p-0 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
      {...props}
    >
      {children}
    </select>
  </label>
);
