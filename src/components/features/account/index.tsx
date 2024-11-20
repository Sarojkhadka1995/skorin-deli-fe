"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import {
  changePassword,
  updatePersonalDetails,
  PersonalDetails,
  ApiResponse,
} from "@/service/account.service";
import { ApiError } from "next/dist/server/api-utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import OrderHistory from "./order-history";
import { TOAST_TYPES } from "@/utils/toast-utils/toast-util";
import { showToast } from "@/utils/toast-utils/toast-util";
import { VALIDATION_MESSAGE } from "@/constants/validation";
import { PASSWORD_REGEX } from "@/constants/regex";
import { deleteCookie } from "cookies-next";
import { COOKIE_CONFIG } from "@/config/app";
import { useRouter } from "next/navigation";
import useProfileStore from "@/store/useProfileStore";

// Zod Schemas
const personalDetailsSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(10, "Address must be at least 10 characters"),
});

const passwordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, { message: VALIDATION_MESSAGE.get("Password", "required") }),
    newPassword: z
      .string()
      .min(1, { message: VALIDATION_MESSAGE.get("New Password", "required") })
      .regex(PASSWORD_REGEX, {
        message:
          "Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character",
      }),
    confirmPassword: z.string().min(1, {
      message: VALIDATION_MESSAGE.get("Confirm Password", "required"),
    }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type PersonalDetailsFormData = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
};

export default function UserProfile() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { profileData } = useProfileStore();

  const personalDetailsForm = useForm<PersonalDetailsFormData>({
    resolver: zodResolver(personalDetailsSchema),
    defaultValues: {
      first_name: profileData?.first_name || "",
      last_name: profileData?.last_name || "",
      email: profileData?.email || "",
      phone: profileData?.phone || "",
      address: profileData?.address || "",
    },
  });

  const passwordForm = useForm({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (profileData) {
      personalDetailsForm.reset({
        first_name: profileData.first_name,
        last_name: profileData.last_name,
        email: profileData.email,
        phone: profileData.phone,
        address: profileData.address,
      });
    }
  }, [profileData, personalDetailsForm]);

  const { mutate: updateProfile } = useMutation<
    ApiResponse<PersonalDetails>,
    Error,
    PersonalDetails
  >({
    mutationFn: updatePersonalDetails,
    onSuccess: (data) => {
      console.log("data:", data);
      showToast(TOAST_TYPES.success, "Personal details updated successfully");
      queryClient.invalidateQueries({ queryKey: ["getProfile"] });
    },
  });

  const changePasswordMutation = useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      showToast(TOAST_TYPES.success, "Password updated successfully");
      passwordForm.reset();
    },
    onError: (error: ApiError) => {
      showToast(TOAST_TYPES.error, "Failed to update password");
      console.log("error:", error);
    },
  });

  const onPersonalDetailsSubmit = (data: PersonalDetailsFormData) => {
    console.log("data:", data);
    updateProfile({
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      id: profileData?.id || 1,
    });
  };

  const onPasswordSubmit = async (data: z.infer<typeof passwordSchema>) => {
    const payload = {
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    };
    changePasswordMutation.mutate(payload);
  };

  const logout = () => {
    deleteCookie(COOKIE_CONFIG.loggedIn);
    deleteCookie(COOKIE_CONFIG.accessToken);
    deleteCookie(COOKIE_CONFIG.refreshToken);
    router.push("/account/login");
    showToast(TOAST_TYPES.success, "Logged out successfully");
  };

  return (
    <div className="flex flex-col h-[830px] bg-gray-100">
      <Tabs
        defaultValue="personal"
        className="flex flex-grow w-full max-w-4xl mx-auto my-8 bg-white rounded-lg shadow-lg overflow-hidden"
      >
        <TabsList className="flex flex-col items-stretch h-[230px] w-1/4 bg-gray-50 p-4 space-y-2 m-8 me-0 border rounded-xl">
          <TabsTrigger value="personal" className="justify-start">
            Personal Details
          </TabsTrigger>
          <TabsTrigger value="password" className="justify-start">
            Change Password
          </TabsTrigger>
          <TabsTrigger value="orderHistory" className="justify-start">
            Order History
          </TabsTrigger>
          <TabsTrigger value="delete" className="justify-start">
            Delete Account
          </TabsTrigger>
          <TabsTrigger value="logout" className="justify-start">
            Logout
          </TabsTrigger>
        </TabsList>
        <div className="flex flex-col w-3/4 p-6 overflow-auto">
          <TabsContent value="personal">
            <Card>
              <form
                onSubmit={personalDetailsForm.handleSubmit(
                  onPersonalDetailsSubmit
                )}
              >
                <CardHeader>
                  <CardTitle>Personal Details</CardTitle>
                  <CardDescription>
                    Update your personal information here.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first_name">First Name</Label>
                      <Input
                        id="first_name"
                        placeholder="Your first name"
                        {...personalDetailsForm.register("first_name")}
                        // disabled={updateProfile.}
                      />
                      {personalDetailsForm.formState.errors.first_name && (
                        <p className="text-sm text-red-500">
                          {
                            personalDetailsForm.formState.errors.first_name
                              .message
                          }
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        placeholder="Your last name"
                        {...personalDetailsForm.register("last_name")}
                        // disabled={updateProfile.}
                      />
                      {personalDetailsForm.formState.errors.last_name && (
                        <p className="text-sm text-red-500">
                          {
                            personalDetailsForm.formState.errors.last_name
                              .message
                          }
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      {...personalDetailsForm.register("email")}
                      id="email"
                      type="email"
                      placeholder="Your email"
                    />
                    {personalDetailsForm.formState.errors.email && (
                      <p className="text-sm text-red-500">
                        {personalDetailsForm.formState.errors.email.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      {...personalDetailsForm.register("phone")}
                      id="phone"
                      type="tel"
                      placeholder="Your phone number"
                    />
                    {personalDetailsForm.formState.errors.phone && (
                      <p className="text-sm text-red-500">
                        {personalDetailsForm.formState.errors.phone.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      {...personalDetailsForm.register("address")}
                      id="phone"
                      type="tel"
                      placeholder="Your address"
                    />
                    {personalDetailsForm.formState.errors.phone && (
                      <p className="text-sm text-red-500">
                        {personalDetailsForm.formState.errors.phone.message}
                      </p>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit">Update</Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          <TabsContent value="password">
            <Card>
              <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}>
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                  <CardDescription>Update your password here.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input
                      {...passwordForm.register("currentPassword")}
                      id="currentPassword"
                      type="password"
                    />
                    {passwordForm.formState.errors.currentPassword && (
                      <p className="text-sm text-red-500">
                        {passwordForm.formState.errors.currentPassword.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      {...passwordForm.register("newPassword")}
                      id="newPassword"
                      type="password"
                    />
                    {passwordForm.formState.errors.newPassword && (
                      <p className="text-sm text-red-500">
                        {passwordForm.formState.errors.newPassword.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">
                      Confirm New Password
                    </Label>
                    <Input
                      {...passwordForm.register("confirmPassword")}
                      id="confirmPassword"
                      type="password"
                    />
                    {passwordForm.formState.errors.confirmPassword && (
                      <p className="text-sm text-red-500">
                        {passwordForm.formState.errors.confirmPassword.message}
                      </p>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit">Update Password</Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          <TabsContent value="orderHistory">
            <Card>
              <CardHeader>
                <CardTitle>Order History</CardTitle>
                <CardDescription>View your order history here.</CardDescription>
              </CardHeader>
              <CardContent>
                <OrderHistory />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="delete">
            <Card>
              <CardHeader>
                <CardTitle>Delete Account</CardTitle>
                <CardDescription>
                  Permanently delete your account and all associated data.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  This action cannot be undone. Please be certain.
                </p>
                <Button variant="destructive">Delete Account</Button>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="logout">
            <Card>
              <CardHeader>
                <CardTitle>Logout</CardTitle>
                <CardDescription>Sign out of your account.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={logout}>Logout</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
