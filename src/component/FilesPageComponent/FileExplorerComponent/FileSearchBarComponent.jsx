import { useState } from "react"
import { FaMagnifyingGlass } from "react-icons/fa6"
export const FileSearchBarComponent = () => {
    const [research, setResearch] = useState("")
    const handleChange = (e) => {
        setResearch(e.target.value)
    }
    return (
        <div className="relative w-[60%] ">
            <input type='text' placeholder='Search Files...' value={research} onChange={handleChange} className=' w-[100%] pl-10 text-white text-0.7xl border-white/20 border-1 p-2 bg-slate-800 rounded-xl' />
            <FaMagnifyingGlass className="absolute top-3.5 left-3" />
        </div>
    )
}

