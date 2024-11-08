import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google"
import { mongoConnect } from "@/lib/mogoose";
import User from "@/models/User";
import { userHelper } from "@/lib/helpers/user";

const handler =  NextAuth({
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
        jwt: true
    },
    pages: {
        signIn: "/auth/signin", // Custom sign-in page
    },
    secret: process.env.NEXTAUTH_SECRET
});

export {handler as GET, handler as POST}