import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQAccordion() {
  const faqs = [
    {
      question: "Do you deliver to...?",
      answer:
        "We deliver to most locations. Please check our delivery page for more details on specific areas we serve.",
    },
    {
      question: "When will the product I'm looking for be available?",
      answer:
        "Product availability varies. You can check the status of specific items on their respective product pages.",
    },
    {
      question: "Can I be notified when a product will be available?",
      answer:
        "Yes! You can sign up for email notifications on the product page of items that are currently out of stock.",
    },
    {
      question: "Do you stock...?",
      answer:
        "We stock a wide range of products. If you're looking for something specific, please use our search function or contact our customer service.",
    },
    {
      question: "Do you have availability of...?",
      answer:
        "Availability can change quickly. For the most up-to-date information, please check the product page or contact our customer service team.",
    },
    {
      question: "What's your phone number?",
      answer:
        "Our customer service can be reached at (555) 123-4567 during business hours.",
    },
  ];

  return (
    <div className="w-full container mx-auto pb-10">
      <h2 className="text-3xl font-bold mb-2">FAQs</h2>
      <p className="text-lg text-muted-foreground mb-6">
        Frequently asked questions
      </p>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
