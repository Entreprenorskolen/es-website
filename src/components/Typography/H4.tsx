import { PRIMARY_BLUE } from "@app/constants";
import { TypographyProps } from "@app/types";

const H4 = ({ children, className }: TypographyProps) => {
  return (
    <h4
      className={`text-xl font-semibold ${className}`}
      style={{ color: PRIMARY_BLUE }}
    >
      {children}
    </h4>
  );
};

export { H4 };
