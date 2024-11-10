import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const Contact = () => {
  return (
    <div className="container py-8">
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Contact </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <h1 className="text-3xl font-bold mb-6">Drop us a line</h1>
          <form className="space-y-4">
            <Input placeholder="Name" />
            <Input type="email" placeholder="Email" />
            <Textarea placeholder="Message" className="min-h-[150px]" />
            <Button
              size="lg"
              variant="outline-black"
              type="submit"
              className="w-full md:w-auto text-lg"
            >
              Submit
            </Button>
          </form>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Before hitting Submit</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Please provide your order number when enquiring about outstanding
              orders.
            </p>
            <p>
              Information about delivery areas and costs can be found in our{" "}
              <Link
                href="/delivery-info"
                className="text-primary hover:underline"
              >
                Delivery Info
              </Link>{" "}
              page while answers to frequently asked questions can be found
              halfway down the{" "}
              <Link href="/" className="text-primary hover:underline">
                Home
              </Link>{" "}
              page.
            </p>
            <p>
              We will endeavour to reply to your message within 2 business days.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Contact;
