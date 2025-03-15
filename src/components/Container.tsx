import { cn } from "@app/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const Container = ({ children, className }: ContainerProps) => {
  return (
    <div
      className={cn(
        "container mx-auto mb-12 px-4 sm:px-6 md:px-8 lg:px-12",
        className,
      )}
    >
      {children}
    </div>
  );
};
