import { Ghost } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div>
      <div className="min-h-screen bg-background flex flex-col items-center justify-center text-center px-4">
        <Ghost className="w-24 h-24 text-muted-foreground mb-8 animate-float" />
        <h1 className="text-4xl font-bold mb-2">404 - Page Not Found</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Oops! It seems you&apos;ve ventured into uncharted territory.
        </p>
        <p className="text-muted-foreground max-w-md mb-8">
          The page you&apos;re looking for might have been moved, deleted, or
          possibly never existed. Don&apos;t worry, even the best explorers
          sometimes lose their way!
        </p>
        <Button asChild>
          <Link href="/">Return to Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
