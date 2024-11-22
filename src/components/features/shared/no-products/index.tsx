import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Package, Plus } from "lucide-react";
import Link from "next/link";

export default function NoProducts({
  title,
  description,
}: {
  title?: string;
  description?: string;
}) {
  return (
    <Card className="w-full max-w-md mx-auto my-6">
      <CardHeader>
        <CardTitle className="text-center text-xl">
          {title || "No Products Found"}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-4">
        <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
          <Package className="w-10 h-10 text-black" />
        </div>
        <p className="text-center text-muted-foreground">
          {description ||
            "It looks like there are no products in your inventory yet. Start by adding your first product!"}
        </p>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Link href="/">
          <Button variant="outline-black" size="lg">
            <Plus className="mr-2 h-4 w-4" /> Continue Shopping
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
