import { TypographyProps } from "@app/types";
import { PRIMARY_ORANGE } from "@app/constants";

const H1 = ({ children, className }: TypographyProps) => {
  return (
    <h1
      className={`text-5xl font-bold ${className}`}
      style={{ color: PRIMARY_ORANGE }}
    >
      {children}
    </h1>
  );
};

export { H1 };
