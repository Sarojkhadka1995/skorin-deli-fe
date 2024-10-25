import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const SignUp = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-[469px]">
        <nav className="text-sm mb-6">
          <Link
            className="text-muted-foreground hover:text-foreground"
            href="/"
          >
            Home
          </Link>{" "}
          / <span className="text-foreground">Account</span>
        </nav>

        <h1 className="text-4xl font-bold mb-8">Create an account</h1>

        <form className="space-y-6 max-w-md">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input id="firstName" placeholder="First Name" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input id="lastName" placeholder="Last Name" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Email" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Password"
              required
            />
          </div>
          <Button variant="outline" size="lg" type="submit" className="w-full">
            Create
          </Button>
        </form>

        <div className="mt-6 text-center">
          <Link
            href="/account/login"
            className="text-sm font-semibold hover:underline"
          >
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
