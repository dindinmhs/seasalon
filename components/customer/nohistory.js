import Link from "next/link";

export function NoHistory(params) {
    return (
        <div className="font bold flex flex-col w-full h-full items-center gap-4">
            <h2>No History</h2>
            <Link href="/dashboard/customer/booking" className="bg-slate-900 text-pink-200 px-4 py-2 rounded-full">Book Now</Link>
        </div>
    )
}