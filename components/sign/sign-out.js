import { FaRightFromBracket } from "react-icons/fa6"
import { signOut } from "next-auth/react"
export function ButtonSignOut() {
    return(
        <button onClick={()=>signOut({callbackUrl:"/sign-up"})}>
            <FaRightFromBracket className="inline"/>
            Sign Out
        </button>
    )
}