import { RecentFileContainer } from "./RecentFileDashBoard/RecentFileContainer"
import { ShareFileContainer } from "./SharedFileDashBoard/ShareFileContainer"

export const DashBoardMainContainer = ({ recentFiles, sharedFiles, addSharedFile }) => {
    return (
        <div className="dashboard-main">
            <RecentFileContainer files={recentFiles} />
            <div name="content-droite" className="dashboard-right">
                <div className="dashboard-right-top" name="content-right-top">

                </div>
                <ShareFileContainer files={sharedFiles} onUpload={addSharedFile} />
            </div>
        </div>
    )
}
