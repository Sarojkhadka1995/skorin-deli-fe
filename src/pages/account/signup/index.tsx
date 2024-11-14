import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useSignUp from "@/hooks/useSignUp";
import {
  Form,
  FormMessage,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { EyeOff, Eye, Loader2 } from "lucide-react";

const SignUp = () => {
  const {
    form,
    onSubmit,
    signUpLoading,
    togglePasswordVisibility,
    passwordVisibility,
  } = useSignUp();
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

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 max-w-md"
          >
            <FormField
              name="first_name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="First Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="last_name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Last Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={passwordVisibility.password ? "text" : "password"}
                        placeholder="Password"
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => togglePasswordVisibility("password")}
                      >
                        {passwordVisibility.password ? (
                          <Eye className="h-4 w-4" />
                        ) : (
                          <EyeOff className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="password_confirmation"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={
                          passwordVisibility.password_confirmation
                            ? "text"
                            : "password"
                        }
                        placeholder="Confirm Password"
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() =>
                          togglePasswordVisibility("password_confirmation")
                        }
                      >
                        {passwordVisibility.password_confirmation ? (
                          <Eye className="h-4 w-4" />
                        ) : (
                          <EyeOff className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              variant="outline"
              size="lg"
              type="submit"
              className="w-full"
              disabled={signUpLoading}
            >
              Create{" "}
              {signUpLoading && (
                <Loader2 className="w-4 h-4 ml-2 animate-spin" />
              )}
            </Button>
          </form>
        </Form>

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
