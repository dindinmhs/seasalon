import { useEffect,useState } from "react"
import { Loading } from "../loading/loading"
import { MdDateRange } from "react-icons/md"
import { IoMdTime } from "react-icons/io"
import { NoHistory } from "./nohistory"
import { FaLocationDot } from "react-icons/fa6"
import { HiOfficeBuilding } from "react-icons/hi"
import { IoPerson } from "react-icons/io5"
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
                <h2 className="text-4xl mb-6 font-bold">Histories</h2>
                <div className="flex flex-wrap font-bold gap-6 mb-[6rem] md:mb-0">
                {histories?.length === 0?(<NoHistory/>):
                    histories?.map(list=>(
                        <div key={list._id} className="w-[30rem] bg-slate-900 text-red-200 p-6">
                            <div className="flex items-center gap-4 my-2 border-red-200 border-b-2 pb-2">
                                <HiOfficeBuilding size={30} className=""/>
                                <h3 className="text-xl truncate">{list.branch}</h3>
                            </div>
                            <div className="flex items-center mt-4 mb-2 gap-4">
                                <FaLocationDot size={22} className=""/>
                                <p className="truncate">{list.location}</p>
                            </div>
                            <div className="flex items-center gap-4 my-2">
                                <IoPerson size={22} className=""/>
                                <p className="truncate">{list.name}</p>
                            </div>
                            <div className="flex items-center gap-4 my-2">
                                <MdDateRange size={22} className=""/>
                                <p>{list.date}</p>
                            </div>
                            <div className="flex items-center gap-4 my-2">
                                <IoMdTime size={22} className=""/>
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