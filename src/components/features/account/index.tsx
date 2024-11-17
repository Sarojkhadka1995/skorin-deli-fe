"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  changePassword,
  getProfile,
  updatePersonalDetails,
  PersonalDetails,
  ApiResponse,
} from "@/service/account.service";
import { ApiError } from "next/dist/server/api-utils";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import OrderHistory from "./order-history";
import { Trash2 } from "lucide-react";

// Zod Schemas
const personalDetailsSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(10, "Address must be at least 10 characters"),
  profileImage: z.any(),
});

const passwordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type PersonalDetailsFormData = Omit<PersonalDetails, "profileImage"> & {
  profileImage: File | string | null;
};

export default function UserProfile() {
  const queryClient = useQueryClient();

  const personalDetailsForm = useForm<PersonalDetailsFormData>({
    resolver: zodResolver(personalDetailsSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      profileImage: null,
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

  const { data: profileData } = useQuery<ApiResponse<PersonalDetails>>({
    queryKey: ["getProfile"],
    queryFn: getProfile,
  });

  useEffect(() => {
    if (profileData?.data) {
      personalDetailsForm.reset({
        name: profileData.data.name,
        email: profileData.data.email,
        phone: profileData.data.phone,
        address: profileData.data.address,
        profileImage: profileData.data.profileImage,
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
      toast.success("Personal details updated successfully");
      queryClient.invalidateQueries({ queryKey: ["getProfile"] });
    },
  });

  const changePasswordMutation = useMutation({
    mutationFn: changePassword,
    onSuccess: (data) => {
      toast.success("Password updated successfully");
      console.log("data:", data);
      passwordForm.reset();
    },
    onError: (error: ApiError) => {
      toast.error("Failed to update password");
      console.log("error:", error);
    },
  });

  const onPersonalDetailsSubmit = (data: PersonalDetailsFormData) => {
    const updateData: PersonalDetails = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      profileImage:
        typeof data.profileImage === "string" ? data.profileImage : "",
    };

    if (data.profileImage instanceof File) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateProfile({
          ...updateData,
          profileImage: reader.result as string,
        });
      };
      reader.readAsDataURL(data.profileImage);
    } else {
      updateProfile(updateData);
    }
  };

  const onPasswordSubmit = async (data: z.infer<typeof passwordSchema>) => {
    changePasswordMutation.mutate(data);
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
                  <div className="flex items-center space-x-4">
                    <div className="relative group">
                      <Avatar className="w-20 h-20">
                        <AvatarImage
                          src={
                            personalDetailsForm.watch("profileImage") instanceof
                            File
                              ? URL.createObjectURL(
                                  personalDetailsForm.watch(
                                    "profileImage"
                                  ) as File
                                )
                              : (personalDetailsForm.watch(
                                  "profileImage"
                                ) as string) || "/placeholder.svg"
                          }
                          alt="Profile picture"
                        />
                        <AvatarFallback>
                          {personalDetailsForm
                            .watch("name")?.[0]
                            ?.toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <label
                        htmlFor="profileImage"
                        className="absolute inset-0 flex items-center justify-center bg-black/50 text-white opacity-0 group-hover:opacity-100 rounded-full cursor-pointer transition-opacity"
                      >
                        Change
                      </label>
                      <input
                        type="file"
                        id="profileImage"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            personalDetailsForm.setValue("profileImage", file);
                          }
                        }}
                      />
                    </div>
                    {(personalDetailsForm.watch("profileImage") ||
                      profileData?.data?.profileImage) && (
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => {
                          personalDetailsForm.setValue("profileImage", null);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      {...personalDetailsForm.register("name")}
                      // disabled={updateProfile.}
                    />
                    {personalDetailsForm.formState.errors.name && (
                      <p className="text-sm text-red-500">
                        {personalDetailsForm.formState.errors.name.message}
                      </p>
                    )}
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
                <Button>Logout</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
