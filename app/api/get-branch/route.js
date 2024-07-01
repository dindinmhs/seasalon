import connectDB from "@/utils/connectdb"
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export async function GET() {
    try {
        const db = await connectDB()
        const coll = db.collection('branch')
        const branchs = await coll.find().toArray()
        return NextResponse.json(branchs,{status : 200})
    } catch (error) {
        console.log('failed fetching',error)
        return NextResponse.json({ error : 'failed fetch' }, { status: 500 })
    }
}