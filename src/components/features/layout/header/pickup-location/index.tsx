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
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13253.127627170563!2d151.091966!3d-33.856625!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12a4d5a11be6a5%3A0x5cab7361a57d6800!2sSKORIN%20DELI!5e0!3m2!1sen!2snp!4v1730731527385!5m2!1sen!2snp"
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
                <p className="font-medium">215 Concord Rd</p>
                <p className="font-medium">North Strathfield NSW 2137</p>
              </div>
              <div className="px-6 mb-3 text-base font-light">
                <h3 className="font-semibold ">Opening Hours</h3>
                <p>Mon-Fri: 8am - 5:30pm</p>
                <p>Sat: 8am - 5pm</p>
                <p>Sun: 8am -2pm</p>
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
