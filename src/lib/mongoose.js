import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI
if (!MONGODB_URI){
    throw new Error("Mongo uri not provided")
}
let global = {}

let cached = global.mongoose;

if (!cached){
    cached = global.mongoose = {conn:null, promise:null}
}

export async function mongoConnect(){
    if (cached.conn)
    {
        return cached.promise
    }
    if (!cached.promise){
        console.log("Cach Miss");
        const opts = {
            bufferCommands : false,
        };
        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            return mongoose;
        });
    }
    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
}