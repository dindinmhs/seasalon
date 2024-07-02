import { useEffect,useState } from "react"
import { Loading } from "../loading/loading"
import Image from "next/image"
export function Profile({data}) {
    const [profile,setProfile] = useState()
    const [isPending, setPending] = useState(false)
    async function fetchHistory() {
        setPending(true)
        if (data) {
            try{
                const res = await fetch('/api/get-user',{
                    method : 'POST',
                    headers : {
                        'Content-Type' : 'application/json'
                    },
                    body : JSON.stringify(data.user)
                })
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                const user = await res.json()
                setProfile(user)
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
                <h2 className="text-4xl mb-6 font-bold">Profile</h2>
                <div className="flex bg-slate-900 text-red-200 gap-8 items-center mb-[8rem] md:mb-0 flex-wrap px-6 md:px-10 py-6">
                    <div className="w-[20rem]">
                        <Image
                            src={'/dashboard/profile-default.svg'}
                            width={100}
                            height={100}
                            alt="profile"
                            priority={true}
                            className={`rounded-full m-auto`}
                        />
                    </div>
                    <div className="border-red-200 w-full md:w-fit border-t-2 md:border-t-0 md:pl-4 md:border-l-2 md:text-lg truncate">
                        <h3 className="my-2"><b>Name : </b>{profile?.name}</h3>
                        <h3 className="my-2"><b>Email : </b>{profile?.email}</h3>
                        <h3 className="my-2"><b>Phone Number : </b>{profile?.tel}</h3>
                        <h3 className="my-2"><b>Role : </b>{profile?.role}</h3>
                    </div>
                </div>
            </>
        )
    }
}