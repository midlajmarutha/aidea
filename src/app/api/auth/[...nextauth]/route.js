import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google"
import { mongoConnect } from "@/lib/mongoose";
import User from "@/models/User";
import { userHelper } from "@/lib/helpers/user";

export const BASE_PATH = "/api/auth"
const handler =  NextAuth({
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        Credentials({
            async authorize(credentials) {
                const res = await userHelper.userSignin(credentials);
                if(!res.error){
                    return res;
                }
            },
        }),
        GoogleProvider({
            clientId : process.env.GOOGLE_CLIENT_ID,
            clientSecret : process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    session: {
        strategy:"jwt"
    },
    pages: {
        signIn: "/auth/signin", // Custom sign-in page
    },
});

export {handler as GET, handler as POST}