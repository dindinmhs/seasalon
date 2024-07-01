import { useEffect,useState } from "react"
import { Loading } from "../loading/loading"
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
            <div>
                <h2 className="text-2xl mb-6 font-bold">Profile</h2>
                <h3><b>Name : </b>{profile?.name}</h3>
                <h3><b>Email : </b>{profile?.email}</h3>
                <h3><b>Phone Number : </b>{profile?.tel}</h3>
                <h3><b>Role : </b>{profile?.role}</h3>
            </div>
        )
    }
}