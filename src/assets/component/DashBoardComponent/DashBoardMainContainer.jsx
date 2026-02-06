import { RecentFileContainer } from "./RecentFileDashBoard/RecentFileContainer"

export const DashBoardMainContainer = ({ recentFiles }) => {
    return (
        <div className="dashboard-main">
            <RecentFileContainer files={recentFiles} />
            <div name="content-droite" className="dashboard-right">
                <div className="dashboard-right-top" name="content-right-top">

                </div>
                <div className="dashboard-right-bottom" name="content-right-bottom">

                </div>
            </div>
        </div>
    )
}
