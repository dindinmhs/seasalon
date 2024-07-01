import connectDB from "@/utils/connectdb"
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export async function POST(req) {
    const data = await req.json()
    try {
        const db = await connectDB()
        const coll = db.collection('services')
        const services = await coll.find({branch : data.branch}).toArray()
        return NextResponse.json(services,{status : 200})
    } catch (error) {
        console.log('failed fetching',error)
        return NextResponse.json({ error : 'failed fetch' }, { status: 500 })
    }
}