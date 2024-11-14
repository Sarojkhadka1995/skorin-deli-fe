import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import useForgotPassword from "@/hooks/useForgotPassword";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import useGlobalHook from "@/hooks/useGlobalHook";
const ForgetPassword = () => {
  const { form, onSubmit, forgotPasswordLoading } = useForgotPassword();

  const { goBack } = useGlobalHook();

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
        {/* <form className="space-y-4">
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
        </form> */}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Email"
                      required
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex space-x-4">
              <Button
                variant="outline-black"
                size="lg"
                type="submit"
                className="flex-1"
                disabled={forgotPasswordLoading}
              >
                Submit{" "}
                {forgotPasswordLoading && (
                  <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                )}
              </Button>
              <Button
                variant="outline"
                size="lg"
                type="button"
                className="flex-1"
                onClick={goBack}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ForgetPassword;
