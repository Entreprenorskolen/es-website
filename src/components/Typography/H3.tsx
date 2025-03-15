import { PRIMARY_BLUE } from "@app/constants";
import { TypographyProps } from "@app/types";

const H3 = ({ children, className }: TypographyProps) => {
  return (
    <h3
      className={`text-3xl font-semibold ${className}`}
      style={{ color: PRIMARY_BLUE }}
    >
      {children}
    </h3>
  );
};

export { H3 };
