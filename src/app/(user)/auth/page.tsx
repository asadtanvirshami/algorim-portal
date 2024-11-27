"use client";
import React, { memo } from "react";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { ArrowRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { authApi } from "@/services/auth/auth-api";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { loginSuccess } from "@/redux/actions/user-action";
import { useDispatch } from "react-redux";

// Define the shape of the post data
interface Credentials {
  email: string;
  password: string;
}

const Auth = () => {
  const { toast } = useToast();
  const router = useRouter();
  const dispatch = useDispatch();
  const [credentials, setCredentials] = React.useState<Credentials>({
    email: "",
    password: "",
  });

  // const handleSuccess = async (credentialResponse: any) => {
  //   // console.log(credentialResponse?.credential);
  //   // const request = await userSigninGoogleRequest(credentialResponse);
  //   // if (!request?.error && request?.data?.success) {
  //   //   await tokenCookie(request?.data?.token);
  //   //   toast({
  //   //     variant: "success",
  //   //     title: "Sign in with google is successful",
  //   //     description: "Redirecting to the dashboard.",
  //   //     duration: 800,
  //   //   });
  //   //   router.push("/dashboard");
  //   // }
  // };

  // const handleError = () => {
  //   console.log("Login Failed");
  // };

  const handleSignin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const request = await authApi.login(
        credentials.email,
        credentials.password
      );
      if (request?.data?.message === "success") {
        let jwtToken = jwtDecode(request?.data?.accessToken);

        Cookies.set("token", request?.data?.accessToken, {
          secure: true,
          sameSite: "Strict",
        });
        Cookies.set("user", JSON.stringify(jwtToken), {
          secure: true,
          sameSite: "Strict",
        });
        dispatch(loginSuccess(jwtToken));
        toast({
          variant: "success",
          title: "Sign in successful",
          description: "Redirecting to the dashboard.",
          duration: 800,
        });
        router.push("/protected-route/dashboard");
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Failed to sign in",
        description: error?.response?.data?.message || "Something went wrong",
        duration: 800,
      });
    }
  };

  return (
    <div
      data-cy="main-grid"
      className="grid items-center justify-center h-screen w-screen"
    >
      <div className="lg:grid bg-gradient-to-r dark:bg-black  bg-white lg:grid-cols-2 xl:grid xl:grid-cols-3 md:grid grid-cols-2 w-screen  ">
        <div className="hidden sm:flex h-screen align-middle justify-center items-center xl:col-span-2">
          <div className="justify-center align-middle items-center">
            {/* <h1 className="mx-auto text-8xl font-bold text-rose-500"> */}
            <h1 className="mx-auto text-[13rem] font-[family-name:var(--font-revamped)] font-semibold dark:text-white text-black">
              ALGORIM
            </h1>
          </div>
        </div>
        <div className="flex h-screen align-middle justify-center font-[family-name:var(--font-redhat)] items-center dark:bg-black  border-silver-500 border border-r-1  bg-white">
          <div className=" justify-center align-middle">
            <Card className="w-[350px] bg-card">
              <CardHeader>
                <CardTitle className="text-3xl ">Signin</CardTitle>
                <CardDescription>
                  Enter your account credentials to signin.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={(e) => handleSignin(e)}>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        onChange={(e) =>
                          setCredentials({
                            ...credentials,
                            email: e.target.value,
                          })
                        }
                        id="email"
                        placeholder="example@gmail.com"
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        onChange={(e) =>
                          setCredentials({
                            ...credentials,
                            password: e.target.value,
                          })
                        }
                        id="password"
                        placeholder="*********"
                      />
                    </div>
                    <hr></hr>
                    <div className="mx-auto">
                      {/* <GoogleLogin
                        onSuccess={handleSuccess}
                        onError={handleError}
                        useOneTap
                      /> */}
                    </div>
                  </div>
                  <div className="text-sm mt-4">
                    Click here to{" "}
                    <Link href={"/auth/signup"} className="text-orange-500">
                      create account.
                    </Link>
                  </div>
                  <div className="flex justify-end mt-4">
                    <Button
                      type="submit"
                      className=" bg-gradient-to-r from-orange-300 to-orange-500 text-white"
                    >
                      Continue
                      <ArrowRightIcon className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Auth);
