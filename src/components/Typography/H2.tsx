import { PRIMARY_BLUE } from "@app/constants";
import { TypographyProps } from "@app/types";

const H2 = ({ children, className }: TypographyProps) => {
  return (
    <h2
      className={`text-4xl font-bold ${className}`}
      style={{ color: PRIMARY_BLUE }}
    >
      {children}
    </h2>
  );
};

export { H2 };
