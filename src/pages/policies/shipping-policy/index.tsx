import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";

const ShippingPolicy = () => {
  return (
    <div className="container mx-auto  py-10">
      <div className="px-3">
        <h1 className="text-4xl font-bold mb-8">Shipping policy</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Orders Processing</h2>
          <p className="text-lg mb-4">
            We aim to process each order within one business day of your order
            placement. Once your order has been processed, we typically dispatch
            the following business day.
          </p>
          <p className="text-lg mb-4">
            You will receive a notification via email when your order has been
            dispatched. The email will include tracking information for your
            delivery if your parcel is being sent with an external carrier. If
            your parcel is delivered by one of our drivers, the email will not
            contain tracking details and the parcel will be delivered on the day
            the email is sent.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            Standard delivery terms
          </h2>
          <p className="text-lg mb-4">
            For a timely and successful delivery, you must provide a complete
            and correct delivery address (i.e. when more than one residence is
            present at a property, the unit number MUST be provided, suburb name
            and postcode must match, etc.).
          </p>
          <p className="text-lg mb-4">
            All our parcels are sent with &quot;Authority to Leave&quot;, which
            means the courier will leave your order in a safe place if no one is
            available to receive it. You acknowledge this &quot;Authority to
            Leave&quot; when placing your order. In some cases, where the
            carrier does not deem safe to leave the parcel, the parcel may be
            taken to a local collection point, and you will receive an email
            advising where to pick it up. If you do not pick up the parcel
            within the given time-frame, it will be returned to us.
          </p>
          <p className="text-lg mb-4">
            It is your responsibility to nominate an address that is accessible
            to courier delivery. If an item is undeliverable due to locked
            fences, locked apartment buildings, closed business etc, an
            additional postage fee will be charged for redelivery. This may
            exceed your original subsidized delivery cost.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">
            Delivery costs and <span className="underline">estimated</span>{" "}
            transit times
          </h2>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px]">Destination</TableHead>
                  <TableHead>Cost</TableHead>
                  <TableHead>Estimated Transit Time*</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">
                    Sydney Northern Beaches
                    <div className="text-sm text-muted-foreground">
                      (excludes 2084, 2104, 2105, 2106, 2107, 2108)
                    </div>
                  </TableCell>
                  <TableCell>Free (min spend $50) or $10</TableCell>
                  <TableCell>1-2 business days</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Sydney</TableCell>
                  <TableCell>Free (min spend $150) or $10</TableCell>
                  <TableCell>2-3 business days</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    Gosford, Wollongong, Newcastle
                  </TableCell>
                  <TableCell>$10</TableCell>
                  <TableCell>2-3 business days</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    Melbourne, Brisbane, Canberra, Adelaide
                  </TableCell>
                  <TableCell>15</TableCell>
                  <TableCell>2-5 business days</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    Albury, Coffs Harbour, Lismore, Ballarat, Bendigo, Geelong,
                    Mornington, Gympie, Gold Coast, Sunshine Coast, Toowoomba
                  </TableCell>
                  <TableCell>15</TableCell>
                  <TableCell>2-5 business days</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    Other areas not listed above
                  </TableCell>
                  <TableCell>As calculated at check-out</TableCell>
                  <TableCell>5+ business days</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            * This is only an estimate of how long a parcel may take to arrive
            at destination. At times it may take shorter or longer depending on
            a number of factors, including but not limited to, carriers&apos;
            capacity, weather events, industrial action and other unforeseen
            circumstances.
          </p>
        </section>
      </div>
    </div>
  );
};

export default ShippingPolicy;
