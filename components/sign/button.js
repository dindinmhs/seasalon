export function Submit({name, isPending}) {
    return (
        <button type="submit" className={`${isPending?'hidden':'block'} bg-slate-900 text-slate-200 px-4 py-2 rounded-full font-bold text-xl w-full`}>{name}</button>
    )
}