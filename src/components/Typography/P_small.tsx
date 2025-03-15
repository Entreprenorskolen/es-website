import { TypographyProps } from "@app/types";
import { PRIMARY_GRAY } from "@app/constants";
const P = ({ children, className }: TypographyProps) => {
  return (
    <p className={`text-lg ${className}`} style={{ color: PRIMARY_GRAY }}>
      {children}
    </p>
  );
};

export { P };
