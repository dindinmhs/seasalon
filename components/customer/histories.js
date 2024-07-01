import { useEffect,useState } from "react"
import { Loading } from "../loading/loading"
import { MdDateRange } from "react-icons/md"
import { IoMdTime } from "react-icons/io"
import { NoHistory } from "./nohistory"
export function DashboardHistories({data}) {
    const [histories,setHistories] = useState()
    const [isPending, setPending] = useState(false)
    async function fetchHistory() {
        setPending(true)
        if (data) {
            try{
                const res = await fetch('/api/get-histories',{
                    method : 'POST',
                    headers : {
                        'Content-Type' : 'application/json'
                    },
                    body : JSON.stringify(data.user)
                })
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                const reservations = await res.json()
                setHistories(reservations)
            } catch (error) {
                console.error(error)
            } finally {
                setPending(false)
            }
        }
    }
    useEffect(()=>{
        fetchHistory()
    },[])
    if (isPending) {
        return (<Loading/>)
    } else {
        return (
            <>
                <h2 className="text-2xl mb-6 font-bold">Histories</h2>
                <div className="flex flex-wrap font-bold gap-6 mb-[6rem] md:mb-0">
                {histories?.length === 0?(<NoHistory/>):
                    histories?.map(list=>(
                        <div className="w-[30rem] bg-slate-900 text-red-200 p-6">
                            <h3 className="text-lg mb-2">{list.name}</h3>
                            <div className="flex items-center gap-4 my-1">
                                <MdDateRange size={30} className=""/>
                                <p>{list.date}</p>
                            </div>
                            <div className="flex items-center gap-4 my-1">
                                <IoMdTime size={30} className=""/>
                                <p>{list.time}</p>
                            </div>
                            <div className="flex justify-end gap-2 mt-2">
                                <p className="bg-red-200 text-slate-900 w-fit px-4 py-1 rounded-full truncate">{list.type}</p>
                                <p className="bg-red-200 text-slate-900 w-fit px-4 py-1 rounded-full">{`${list.duration} hour`}</p>
                            </div>
                        </div>
                ))}
                </div>
            </>
        )
    }
}