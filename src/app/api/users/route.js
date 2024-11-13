import { mongoConnect } from "@/lib/mogoose";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(req){
    await mongoConnect();
    const users = await User.find();
    return new NextResponse((JSON.stringify(users)))
}