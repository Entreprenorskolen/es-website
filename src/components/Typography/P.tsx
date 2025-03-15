import { TypographyProps } from "@app/types";
import { PRIMARY_GRAY } from "@app/constants";
const P = ({ children, className }: TypographyProps) => {
  return (
    <p className={`text-xl ${className}`} style={{ color: PRIMARY_GRAY }}>
      {children}
    </p>
  );
};

export { P };
