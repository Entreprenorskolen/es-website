import { TypographyProps } from "@app/types";
import { PRIMARY_BLUE } from "@app/constants";
const ParagraphBlue = ({ children, className }: TypographyProps) => {
  return (
    <p className={`text-lg ${className}`} style={{ color: PRIMARY_BLUE }}>
      {children}
    </p>
  );
};

export { ParagraphBlue };
