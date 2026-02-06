import { Link } from "react-router-dom"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

const COLORS = ["#4F8BFF", "#F6B25B", "#5CD6A1", "#8B7CF6"]

export const StorageUsageContainer = ({ data }) => {
    return (
        <div className="dashboard-right-top" name="content-storage-usage">
            <div className="flex items-center justify-between px-8 pt-6">
                <h1 className="font-bold text-2xl">Storage Usage</h1>
                <Link to="/files" className="text-blue-400/80 hover:text-blue-300 text-sm">
                    View all
                </Link>
            </div>
            <div className="flex flex-col items-center gap-3 p-3 sm:flex-row sm:items-center sm:gap-8 sm:p-6">
                <div className="w-36 h-36 sm:w-40 sm:h-40">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie data={data} dataKey="value" innerRadius={45} outerRadius={65} paddingAngle={2}>
                                {data?.map((entry, index) => (
                                    <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="space-y-0.5 text-[11px] sm:text-sm w-full max-w-[220px]">
                    {data?.map((entry, index) => (
                        <div key={entry.name} className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                                <span>{entry.name}</span>
                            </div>
                            <span className="text-gray-200/80">{entry.value}%</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
