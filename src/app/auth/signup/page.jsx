"use client"

import Loading from "@/components/ui/loading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { TriangleAlert } from "lucide-react";
import { useState } from "react";

// Validation patterns
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PASSWORD_PATTERN = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/
const USERNAME_PATTERN = /^[a-zA-Z0-9_]+$/



export default function Signup() {
    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState({
        error: false,
        message: ""
    })

    const { 
        register, 
        handleSubmit,
        formState: { errors } 
    } = useForm({
        mode: "onChange"
    })

    const {data} = useSession()
    if (data){
        redirect("/dashboard")
    }

    const onSubmit = async (formData) => {
        setLoading(true)
        try {
            const data = await signIn("credentials", {
                username: formData.username,
                email: formData.email,
                password: formData.password,
                redirect: false,
            })

            if (data) {
                if(data.ok) {
                    redirect("/dashboard")
                }
                if(data.error) {
                    setErr({error: true, message: data.error})
                }
            }
        } catch (error) {
            setErr({error: true, message: "An error occurred during sign up"})
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-full h-screen flex items-center justify-center">
            <div className="lg:w-[464px] md:w-[368px] flex flex-col items-center gap-4 p-12 rounded-xl shadow-lg">
                <div className="flex justify-start">
                    <h1 className="text-2xl font-bold text-gray-700">Create your account</h1>
                </div>
                
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-5 w-full">
                    <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="username" className="text-sm font-medium text-gray-700">
                            Username
                        </label>
                        <Input
                            type="text"
                            id="username"
                            {...register("username", {
                                required: "Username is required",
                                minLength: {
                                    value: 3,
                                    message: "Username must be at least 3 characters"
                                },
                                maxLength: {
                                    value: 30,
                                    message: "Username must be less than 30 characters"
                                },
                                pattern: {
                                    value: USERNAME_PATTERN,
                                    message: "Username can only contain letters, numbers, and underscore"
                                }
                            })}
                            className={errors.username ? "border-red-500" : ""}
                        />
                        {errors.username && (
                            <span className="text-red-500 text-sm">
                                {errors.username.message}
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="email" className="text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <Input
                            type="email"
                            id="email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: EMAIL_PATTERN,
                                    message: "Please enter a valid email address"
                                }
                            })}
                            className={errors.email ? "border-red-500" : ""}
                        />
                        {errors.email && (
                            <span className="text-red-500 text-sm">
                                {errors.email.message}
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="password" className="text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <Input
                            type="password"
                            id="password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 8,
                                    message: "Password must be at least 8 characters"
                                },
                                maxLength: {
                                    value: 128,
                                    message: "Password must be less than 128 characters"
                                },
                                pattern: {
                                    value: PASSWORD_PATTERN,
                                    message: "Password must contain uppercase, lowercase, number, and special character"
                                }
                            })}
                            className={errors.password ? "border-red-500" : ""}
                        />
                        {errors.password && (
                            <span className="text-red-500 text-sm">
                                {errors.password.message}
                            </span>
                        )}
                    </div>

                    {err.error && (
                        <div className="w-full">
                            <span className="flex items-start gap-2">
                                <TriangleAlert size={16} className="text-red-700" />
                                <p className="text-red-700 text-sm">{err.message}</p>
                            </span>
                        </div>
                    )}

                    <div className="w-full">
                        <Button 
                            className="w-full bg-indigo-600 hover:bg-indigo-700 font-semibold" 
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? <Loading className="" size="24"/> : "Sign up"}
                        </Button>
                    </div>
                </form>

                <div className="flex w-full items-center gap-1 justify-between">
                    <span className="bg-slate-200 h-[1px] w-1/4"></span>
                    <p className="text-sm text-slate-600">or continue with</p>
                    <span className="bg-slate-200 h-[1px] w-1/4"></span>
                </div>

                <div className="flex flex-col items-center gap-1 w-full">
                    <Button 
                        variant={"outline"} 
                        className="w-full" 
                        onClick={() => {
                            signIn("google", {
                                redirect: true,
                                redirectTo: "/dashboard"
                            })
                        }}
                    >
                        <Image
                            alt="google logo"
                            src={"/google-logo.svg"}
                            width={20}
                            height={20}
                        />
                    </Button>
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-sm">Already have an account?</span>
                    <Link href={"/auth/signin"} className="text-sm text-indigo-600 font-medium">
                        Sign in
                    </Link>
                </div>

                <Link href={"/privacypolicy"} className="text-sm text-slate-600">
                    Know more about privacy policies
                </Link>
            </div>
        </div>
    )
}