import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

const ForgetPassword = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <nav className="text-sm mb-6">
        <Link className="text-muted-foreground hover:text-foreground" href="/">
          Home
        </Link>{" "}
        / <span className="text-foreground">Account</span>
      </nav>

      <h1 className="text-4xl font-bold mb-8">Reset your password</h1>

      <div className="max-w-md space-y-6 ">
        <Alert className="bg-gray-100">
          <AlertDescription>
            We will send you an email to reset your password.
          </AlertDescription>
        </Alert>

        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Email" required />
          </div>

          <div className="flex space-x-4">
            <Button
              variant="outline-black"
              size="lg"
              type="submit"
              className="flex-1"
            >
              Submit
            </Button>
            <Button
              variant="outline"
              size="lg"
              type="button"
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
