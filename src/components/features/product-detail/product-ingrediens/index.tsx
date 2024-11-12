import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface NutritionalDataItem {
  nutrient: string;
  per100g: string;
  perServing: string;
  dv: string;
}

interface ProductIngredientsProps {
  nutritionalData: NutritionalDataItem[];
  ingredients: string;
}

export default function ProductIngredients({
  nutritionalData,
  ingredients,
}: ProductIngredientsProps) {
  return (
    <Accordion type="single" collapsible className="w-full max-w-2xl mt-3">
      <AccordionItem value="nutrition">
        <AccordionTrigger className="text-lg font-semibold px-3 !rounded-lg overflow-hidden">
          Nutritional Information
        </AccordionTrigger>
        <AccordionContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nutrient</TableHead>
                  <TableHead>Per 100g/ml</TableHead>
                  <TableHead>Per Serving</TableHead>
                  <TableHead>%DI*</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {nutritionalData.map((row) => (
                  <TableRow key={row.nutrient}>
                    <TableCell className="font-medium">
                      {row.nutrient}
                    </TableCell>
                    <TableCell>{row.per100g}</TableCell>
                    <TableCell>{row.perServing}</TableCell>
                    <TableCell>{row.dv}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            * Percentage Daily Intakes are based on an average adult diet of
            8700 kJ. Your daily intakes may be higher or lower depending on your
            energy needs.
          </p>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="ingredients">
        <AccordionTrigger className="text-lg font-semibold px-3 rounded-lg">
          Ingredients
        </AccordionTrigger>
        <AccordionContent>
          <div
            className="text-sm leading-relaxed"
            dangerouslySetInnerHTML={{ __html: ingredients }}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
