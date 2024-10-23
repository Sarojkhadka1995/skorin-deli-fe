import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Newsletter = () => {
  return (
    <div className="container mb-10">
      <Card className="w-full mx-auto bg-black text-white p-6">
        <CardHeader className="text-center">
          <div className="mb-6">
            <svg
              className="w-12 h-12 mx-auto rotate-45"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </div>
          <CardTitle className="text-3xl font-medium pb-7">
            Sign up for our newsletter
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col sm:flex-row gap-0 max-w-2xl mx-auto mb-6">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-grow bg-transparent border-r-0 border-gray-600 rounded-l-lg rounded-r-none text-xl h-[50px]"
            />
            <Button
              type="submit"
              variant="outline-black"
              size="lg"
              className="rounded-l-none bg-transparent border-[#4b5563] border-[1px]"
            >
              Submit
            </Button>
          </form>
          <p className="text-sm text-gray-400 mt-4 text-center">
            Subscribe to our newsletter to receive exclusive offers and exciting
            updates.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Newsletter;
