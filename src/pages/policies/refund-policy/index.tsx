import Link from "next/link";
import React from "react";

const RefundPolicy = () => {
  return (
    <div className="container mx-auto  py-10">
      <div className="px-3">
        <h1 className="text-4xl font-bold mb-8">Refund policy</h1>

        <section className="mb-8">
          <p className="text-lg mb-4">
            If you need to return an item, please{" "}
            <Link href="/contact" className="underline underline-offset-4">
              Contact Us
            </Link>{" "}
            providing your order number and details of the product you would
            like to return. We will endeavour to respond within two business
            days with instructions about the next steps. We will happily refund
            you for items that are faulty or defective as long as you contact us
            within 14 days of receiving your order. Should there be the need to
            return an item due to it being faulty or defective we will pay for
            the return postage.
          </p>
        </section>
      </div>
    </div>
  );
};

export default RefundPolicy;
