import { Block } from "@app/types";
import { PortableText, PortableTextReactComponents } from "@portabletext/react";
import { PRIMARY_GRAY } from "@app/constants";
import {
  PortableTextComponentProps,
  PortableTextMarkComponentProps,
} from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";

interface SanityBlockProps {
  blocks: Block[];
  customComponents?: Partial<PortableTextReactComponents>;
}

// ✅ Use PortableTextComponentProps for block components
const components: Partial<PortableTextReactComponents> = {
  block: {
    h1: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
      <h1 className="text-2xl font-bold text-accent mt-4">{children}</h1>
    ),
    h2: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
      <h2 className="text-2xl font-bold text-accent mt-4">{children}</h2>
    ),
    h3: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
      <h3 className="text-2xl font-bold text-accent mt-4">{children}</h3>
    ),
    normal: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
      <p className="mt-2" style={{ color: PRIMARY_GRAY }}>
        {children}
      </p>
    ),
  },
  listItem: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
    <li className="list-disc list-inside">{children}</li>
  ),
  list: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
    <ul className="list-disc list-inside ml-4">{children}</ul>
  ),
  marks: {
    strong: ({
      children,
    }: PortableTextMarkComponentProps<PortableTextBlock>) => (
      <strong className="font-bold">{children}</strong>
    ),
    em: ({ children }: PortableTextMarkComponentProps<PortableTextBlock>) => (
      <em className="italic">{children}</em>
    ),
    link: ({
      value,
      children,
    }: {
      value?: { href?: string };
      children: React.ReactNode;
    }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="underline"
      >
        {children}
      </a>
    ),
  },
};

const SanityBlock = ({ blocks, customComponents }: SanityBlockProps) => {
  return (
    <PortableText
      value={blocks}
      components={{ ...components, ...customComponents }}
    />
  );
};

export { SanityBlock };
