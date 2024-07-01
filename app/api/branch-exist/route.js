import connectDB from "@/utils/connectdb"
import { NextResponse } from 'next/server'

export async function POST(req) {
    const data = await req.json()
    try {
        const db = await connectDB()
        const coll = db.collection('branch')
        const exist = await coll.findOne({ branch : data.branch})
        if (exist) {
            return NextResponse.json({exist : true }, {status : 409})
        } else {
            return NextResponse.json({exist : false}, {status : 200})
        }
    } catch (error) {
        console.log('failed fetching',error)
        return NextResponse.json({ error: 'failed fetch' }, { status: 500 })
    }
}