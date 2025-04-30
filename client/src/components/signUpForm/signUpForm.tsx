'use client'
import Link from "next/link";
import clsx from "clsx";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { FaRegEye } from "react-icons/fa";

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [show, setShow] = useState(false);

  function handleShow() {
    setShow((prev)=>!prev);
  }
  return (
    <div className={clsx("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">
                  {" "}
                  Create an Sendrr Account
                </h1>
                <p className="text-muted-foreground text-balance mt-3 text-sm">
                  Let's get started. Fill in the details below to create your
                  account
                </p>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Alex Johns"
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Contact No.</Label>
                <Input
                  id="contact"
                  type="number"
                  min={0}
                  max={9999999999}
                  placeholder="0129102198"
                  required
                />
              </div>
              <div className="grid gap-3 relative">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" type="password" required />
                {show === false ? (
                  <FaRegEyeSlash
                    onClick={handleShow}
                    className="absolute top-9 right-4 cursor-pointer"
                  />
                ) : (
                  <FaRegEye onClick={handleShow} className="absolute top-9 right-4 cursor-pointer" />
                )}
              </div>
              <div className="grid gap-3 relative">
                <div className="flex items-center">
                  <Label htmlFor="confirm password">Confirm Password</Label>
                </div>
                <Input id="confirm password" type="password" required />
                {show === false ? (
                  <FaRegEyeSlash
                    onClick={handleShow}
                    className="absolute top-9 right-4  cursor-pointer"
                  />
                ) : (
                  <FaRegEye onClick={handleShow} className="absolute top-9 right-4 cursor-pointer" />
                )}
              </div>
              <Button
                type="submit"
                className="w-full bg-black text-white font-medium"
              >
                Sign Up
              </Button>
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Or continue with
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  type="button"
                  className="w-full flex items-center gap-2"
                >
                  <FaFacebook />
                  <span className="sr-only">Login with Facebook</span>
                </Button>

                <Button variant="outline" type="button" className="w-full">
                  <FcGoogle />
                  <span className="sr-only">Login with Google</span>
                </Button>
              </div>
              <div className="text-center text-sm">
                Do you have an account?{" "}
                <Link
                  href="/pages/Login"
                  className="underline underline-offset-4"
                >
                  Login
                </Link>
              </div>
            </div>
          </form>
          <div className="bg-muted relative hidden md:block">
            <img
              src="/assests/premium_photo-1677252438450-b779a923b0f6.jpg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
