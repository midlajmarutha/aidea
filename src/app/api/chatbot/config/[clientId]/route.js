import { NextResponse } from "next/server"

export async function GET(req,{params}){
    const clientID = (await params).clientId
    // TODO: Check user role, retrive config
    const res = NextResponse.next()

    // add the CORS headers to the response
    res.headers.append('Access-Control-Allow-Credentials', "true")
    res.headers.append('Access-Control-Allow-Origin', '*') // replace this your actual origin
    res.headers.append('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT')
    res.headers.append(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )

    const headers = {
        "Access-Control-Allow-Credentials":"true",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,DELETE,PATCH,POST,PUT',
        'Access-Control-Allow-Headers':
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    }
    const config = {
        theme: "green",
        welcomeMessage: "Hey, ask me anything",
        chatbotName: "Support",
        iconURL:"",
        brandLogoURL:"",
        
    }
    return new NextResponse(JSON.stringify(config),{status:200,headers})
}