"use client"

import Loading from "@/components/ui/loading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TriangleAlert } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FormEvent, useState } from "react";
import { useForm } from "react-hook-form"


export default function Signin() {
    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState({error: false, message: ""})

    const {watch, register, formState: {errors}} = useForm()
    const password = watch("Password")
    const email = watch("Email")
    console.log(password)
    const {data} = useSession()
    if (data){
        redirect("/dashboard")
    }
    async function onSubmit(event) {
        event.preventDefault();
        setLoading(true)
        const formData = new FormData(event.currentTarget)
        const Email = formData.get("Email")
        const Password = formData.get("Password")
        if(Email && Password){
            const signinRes = await signIn("credentials",
                {
                email:Email,
                password:Password,
                redirect: false,
                }
            )
            if (signinRes){
                setLoading(false);
                if(signinRes.ok){
                    redirect("/dashboard")
                }
                if(signinRes.error){
                    setErr({error: true, message: signinRes.error})
                }
            }
        }
        else{
            setErr({error: true, message: "Make sure to enter email and password"})
            setLoading(false);
        }
    }
    return (
        <div className="w-full h-screen flex items-center justify-center">
            <div className="lg:w-[464px] md:w-[368px]  flex flex-col items-center gap-4 p-12 rounded-xl  shadow-lg">
               <div className="flex justify-start">
                    <h1 className="text-2xl font-bold text-gray-700">Sign in to your account</h1>
               </div>
                <form onSubmit={onSubmit} className="flex flex-col items-center gap-5 w-full">
                    <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="Email" className="text-sm font-medium text-gray-700">Email</label>
                        <Input type="email" {...register("Email", {required: true})} id="Email"/>
                        {errors.Email && <span className="text-red-500 text-sm">{errors.Email.message}</span>}
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                        <div className="flex justify-between">
                            <label htmlFor="Password" className="text-sm font-medium text-gray-700">Password</label>
                            <Link href={"/auth/forgotpassword"} className="text-sm text-indigo-600 font-medium">Forgot your password?</Link>
                        </div>
                        <Input type="password" {...register("Password", {required: "Password is required"})} id="Password"/>
                    </div>
                    {err.error && 
                        <div className="w-full">
                            <span className="flex items-start gap-2">
                                <span><TriangleAlert size={16} className="text-red-700" /></span>
                                <p className="text-red-700 text-sm">{err.message}</p>
                            </span>
                        </div>}
                    <div className="w-full flex gap-4">
                        
                        <Button className="w-full bg-indigo-600 hover:bg-indigo-700 font-semibold" type="submit">{loading? <Loading className="" size="24"/>:"Sign in"}</Button>
                    </div>
                </form>
                <div className="flex w-full items-center gap-1 justify-between">
                    <span className="bg-slate-200 h-[1px] w-1/4"></span>
                    <p className="text-sm text-slate-600">or continue with</p>
                    <span className="bg-slate-200 h-[1px] w-1/4"></span>
                </div>
                <div className="flex flex-col items-center gap-1 w-full">
                    <Button variant={"outline"} color="red" className="w-full"
                    onClick={()=>{
                    signIn("google",{
                        redirect: true,
                        redirectTo: "/dashboard"
                    }
                )}}>
                    
                    <Image
                        alt="google logo"
                        src={"/google-logo.svg"}
                        width={20}
                        height={20}/>
                </Button>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-sm">New to trador?</span>
                    <span>
                        <Link href={"/auth/signup" } className="text-sm text-slate-600">Create account</Link>
                    </span>
                    {/* <a href="/auth/login" className="text-sm">already have an account?</a> */}
                </div>
            </div>
        </div>
    )
}