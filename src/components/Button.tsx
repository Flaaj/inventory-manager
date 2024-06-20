import clsx from "clsx";
import { HTMLProps } from "react";

type Props = HTMLProps<HTMLButtonElement> & {
  type?: "button" | "submit" | "reset";
};

export const Button = ({ className, ...props }: Props) => {
  return (
    <button
      {...props}
      className={clsx(
        "inline-block rounded bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500",
        props.disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    />
  );
};
