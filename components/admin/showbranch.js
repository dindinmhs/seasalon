import { IoMdTime } from "react-icons/io"
import { FaLocationDot } from "react-icons/fa6"
import { HiOfficeBuilding } from "react-icons/hi"
import { FaPlus } from "react-icons/fa"
export function ShowBranch({branchs, isPending, setOpen}) {
    return (
        <>
            <h2 className="text-4xl mb-6 font-bold">Branch</h2>
            <div className="flex flex-wrap font-bold gap-6 mb-[6rem] md:mb-0">
                {branchs?.map(list=>(
                    <div key={list._id} className="w-[20rem] bg-slate-900 text-red-200 p-6">
                            <div className="flex items-center gap-4 my-2 border-red-200 border-b-2 pb-2">
                                <HiOfficeBuilding size={30} className=""/>
                                <h3 className="text-xl truncate">{list.branch}</h3>
                            </div>
                            <div className="flex items-center mt-4 mb-2 gap-4">
                                <FaLocationDot size={22} className=""/>
                                <p className="truncate">{list.location}</p>
                            </div>
                            <div className="flex items-center gap-4 my-2">
                                <IoMdTime size={22} className=""/>
                                <p>{`${list.open} - ${list.close}`}</p>
                            </div>
                    </div>
                ))}
                {isPending?(
                    <div className={`loader animate-spin bg-slate-900 w-12 m-auto`}></div>
                ):(
                    <button onClick={()=>setOpen(open=>!open)} className={`w-[20rem] bg-slate-900 text-red-200 p-6 flex flex-col gap-2 justify-center items-center hover:bg-slate-800 mb-[6rem] md:mb-0`}>
                        <h2 className="text-lg">Add New Branch</h2>
                        <FaPlus size={45}/>
                    </button>
                )}
                
            </div>
        </>
    )
}