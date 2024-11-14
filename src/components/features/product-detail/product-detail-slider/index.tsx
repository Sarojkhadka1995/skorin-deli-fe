"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import Image from "next/image";
import { Facebook, Twitter } from "lucide-react";

export default function ProductDetailSlider() {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="relative aspect-square">
          <Image
            src="/placeholder.svg"
            alt="Tre Marie Panettone Milanese"
            fill
            className="object-contain"
            priority
          />
        </div>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">
            Tre Marie Panettone Milanese 750g
          </h1>
          <div className="text-3xl font-bold">$29.99</div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span>Quantity: {quantity}</span>
              <div className="w-32">
                <Slider
                  value={[quantity]}
                  onValueChange={(value) => setQuantity(value[0])}
                  min={1}
                  max={10}
                  step={1}
                  className="cursor-pointer"
                />
              </div>
            </div>
          </div>

          <Button className="w-full" size="lg">
            Add to cart [ Not used]
          </Button>

          <div className="prose prose-sm">
            <p>
              Tre Marie Panettone Milanese is a traditional cake made from the
              historical confectionary in Milan; with strict adherence to the
              original recipe: 3 kneading phases, 3 days of slow rising, 8 hours
              of cooling and the cutting of the distinctive eight-pointed star
              shape on top by hand called &quot;scarpatura&quot; from an ancient
              custom of cutting a cross into a loaf as a symbol of blessing the
              daily bread.
            </p>
            <p>
              Tre Marie&apos;s commitment and passion for quality are reflected
              in the carefully selected ingredients, from the flour to the fresh
              eggs, from the candied fruit to the raisins - including the most
              precious ingredient - the natural &quot;Mother&quot; yeast.
            </p>
            <p>
              Tre Marie Panettone Milanese is a low dome-shaped cake with a hand
              cut &quot;star&quot; on the top. Delicate, soft, buttery, this
              cake is studded with golden raisins and candied orange and citron
              peels. According to Tre Marie, keep panettone in a warm
              environment for at least one hour before serving. This will bring
              out its goodness and natural fragrance.
            </p>
          </div>

          <div className="space-y-2">
            <div className="font-medium">Share</div>
            <div className="flex gap-4">
              <Button variant="outline" size="icon">
                <Facebook className="w-4 h-4" />
                <span className="sr-only">Share on Facebook</span>
              </Button>
              <Button variant="outline" size="icon">
                <Twitter className="w-4 h-4" />
                <span className="sr-only">Share on Twitter</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
