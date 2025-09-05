import { BlockRenderer, H3 } from "@app/components";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@app/components/Accordion";
import { PRIMARY_BLUE } from "@app/constants/colors";
import { Block } from "@app/types";
interface FAQSectionProps {
  faqs: {
    title: string;
    content: Block[];
  }[];
}

export function FAQ({ faqs }: FAQSectionProps) {
  return (
    <div className="w-full">
      <H3 className="text-2xl font-semibold mb-6">
        Frequently Asked Questions
      </H3>
      <Accordion type="single" collapsible className="space-y-4">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger
              className="text-left"
              style={{ color: PRIMARY_BLUE }}
            >
              {faq.title}
            </AccordionTrigger>
            <AccordionContent>
              <BlockRenderer blocks={faq.content} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
