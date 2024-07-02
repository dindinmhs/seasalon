export function Submit({name, isPending, loadService}) {
    return (
        <button disabled={loadService} type="submit" className={`${isPending?'hidden':'block'} hover:bg-slate-800 bg-slate-900 text-slate-200 px-4 py-2 rounded-full font-bold text-xl w-full`}>{name}</button>
    )
}