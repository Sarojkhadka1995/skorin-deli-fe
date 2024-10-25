import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function PickupLocation() {
  return (
    <DialogContent className="min-w-[calc(100vw-9rem)] shadow-none">
      <DialogHeader>
        <DialogTitle className="text-3xl font-normal">
          Pickup location
        </DialogTitle>
      </DialogHeader>
      <Card className="w-full mx-auto border-none">
        <CardContent className="p-0">
          <div className="grid md:grid-cols-2 gap-5">
            <div className="relative aspect-[4/3] md:aspect-auto rounded-lg overflow-hidden border">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d35238.5351493298!2d85.35227012103594!3d27.697371587688895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1bda4a951f0f%3A0x3ddabb234891c3bd!2sBuddha%20Stupa!5e0!3m2!1sen!2snp!4v1729833734399!5m2!1sen!2snp"
                style={{ border: 0, height: "100%", width: "100%" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div className="py-6 border rounded-lg">
              <h2 className="text-xl font-semibold px-6 mb-1">Find Us</h2>
              <p className="text-base text-black px-6 pb-3 border-b">
                <span className=" font-medium">Free Click & Collect.</span>{" "}
                <span className="font-light">
                  Usually ready next business day.
                </span>
              </p>
              <div className="px-6 pt-3 mb-3">
                <p className="font-medium">101/20 Dale Street</p>
                <p className="font-medium">Brookvale NSW 2100</p>
              </div>
              <div className="px-6 mb-3 text-base font-light">
                <h3 className="font-semibold ">Opening Hours</h3>
                <p>Mon-Fri: 7am - 3pm</p>
                <p>Sat-Sun: Closed</p>
                <p className="mt-2 font-semibold">
                  Public Holidays: <span className="font-normal">Closed</span>
                </p>
              </div>
              <p className="text-base px-6 pb-3">Limited Parking in basement</p>
              <div className="px-6">
                <Button size="lg" className="text-lg" variant="outline">
                  Get directions
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </DialogContent>
  );
}
