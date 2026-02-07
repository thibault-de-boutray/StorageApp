import { RecentFileContainer } from "./RecentFileDashBoard/RecentFileContainer"
import { ShareFileContainer } from "./SharedFileDashBoard/ShareFileContainer"
import { StorageUsageContainer } from "./StorageUsageDashBoard/StorageUsageContainer"

export const DashBoardMainContainer = ({ recentFiles, sharedFiles, storageUsage, addSharedFile }) => {
    return (
        <div className="dashboard-main">
            <RecentFileContainer files={recentFiles} />
            <div name="content-droite" className="dashboard-right">
                <StorageUsageContainer data={storageUsage} />
                <ShareFileContainer files={sharedFiles} onUpload={addSharedFile} />
            </div>
        </div>
    )
}
