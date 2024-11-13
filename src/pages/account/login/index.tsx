import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormMessage,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { EyeOff, Eye, Loader2 } from "lucide-react";
import useLogin from "@/hooks/useLogin";

const Login = () => {
  const {
    form,
    onSubmit,
    loginLoading,
    setPasswordVisibility,
    passwordVisibility,
  } = useLogin();

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

        {/* <form className="space-y-6 max-w-md">
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
        </form> */}

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 max-w-md"
          >
            {/* Email Field */}
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

            {/* Password Field */}
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="password">Password</FormLabel>

                  <FormControl>
                    <div className="relative">
                      <Input
                        type={passwordVisibility ? "text" : "password"}
                        placeholder="Password"
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() =>
                          setPasswordVisibility(!passwordVisibility)
                        }
                      >
                        {passwordVisibility ? (
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

            {/* Submit Button */}
            <Button
              variant="outline"
              size="lg"
              type="submit"
              className="w-full"
              disabled={loginLoading}
            >
              Login{" "}
              {loginLoading && <Loader2 className="h-4 w-4 animate-spin" />}
            </Button>
          </form>
        </Form>

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
