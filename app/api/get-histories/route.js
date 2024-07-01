import connectDB from "@/utils/connectdb"
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export async function POST(req) {
    const data = await req.json()
    console.log(data)
    try {
        const db = await connectDB()
        const coll = db.collection('reservation')
        const history = await coll.find({email_id : data.email}).toArray()
        console.log(history)
        return NextResponse.json(history,{status : 200})
    } catch (error) {
        console.log('failed fetching',error)
        return NextResponse.json({ error : 'failed fetch' }, { status: 500 })
    }
}