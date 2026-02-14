import { NumberFileComponent } from "./NumberFileComponent"
import { SizeFileComponent } from "./SizeFileComponent"
import { SharedFileComponent } from "./SharedFileComponent"



export const DashBoardTopContainer = ({ stockage, sharedCount }) => {
    const safeStockage = {
        nombreFichiers: Number(stockage?.nombreFichiers) || 0,
        tailleUtilisee: Number(stockage?.tailleUtilisee) || 0,
        tailleMax: Number(stockage?.tailleMax) || 0
    }

    return (
        <div className="flex md:justify-between flex-col md:flex-row space-y-6 md:space-y-0">
            <SizeFileComponent maxSize={safeStockage.tailleMax} size={safeStockage.tailleUtilisee} />
            <NumberFileComponent number={safeStockage.nombreFichiers} />
            <SharedFileComponent number={sharedCount || 0} />
        </div>
    )
}

