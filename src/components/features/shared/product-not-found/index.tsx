import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PackageX } from "lucide-react";

interface ProductNotFoundCardProps {
  title?: string;
  message?: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

export default function ProductNotFoundCard({
  title = "Product Not Found",
  message = "We couldn't find the product you're looking for. It may have been removed or doesn't exist.",
  buttonText = "Go Back to Products",
  onButtonClick = () => {},
}: ProductNotFoundCardProps) {
  return (
    <Card className="w-full max-w-md mx-auto my-6">
      <CardHeader className="text-center">
        <div className="w-20 h-20 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
          <PackageX className="h-10 w-10 text-muted-foreground" />
        </div>
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-center text-muted-foreground">{message}</p>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button size="lg" variant="outline" onClick={onButtonClick}>
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
}
