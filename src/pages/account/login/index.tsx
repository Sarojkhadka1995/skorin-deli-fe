import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Login = () => {
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

        <h1 className="text-4xl font-bold mb-8">Customer Login</h1>

        <form className="space-y-6 max-w-md">
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
            Login
          </Button>
        </form>

        <div className="mt-6 space-y-2 text-center">
          <Link
            href="/account/forgot-password"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Forgot your password?
          </Link>
          <div>
            <Link
              href="/account/signup"
              className="text-sm font-semibold hover:underline"
            >
              New Customer? Sign Up!
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
