import connectDB from "@/utils/connectdb"
import { NextResponse } from 'next/server'

export async function GET() {
    try {
        const db = await connectDB()
        const coll = db.collection('reviews')
        const reviews = await coll.find().toArray()
        return NextResponse.json(reviews,{status : 200})
    } catch (error) {
        console.log('failed fetching',error)
        return NextResponse.json({ error : 'failed fetch' }, { status: 500 })
    }
}