import { NumberFileComponent } from "./NumberFileComponent"
import { SizeFileComponent } from "./SizeFileComponent"
import { SharedFileComponent } from "./SharedFileComponent"



export const DashBoardTopContainer = () => {
    return (
        <div className="flex md:justify-between flex-col md:flex-row space-y-6 md:space-y-0">
            <SizeFileComponent maxSize={193222232} size={2123432} />
            <NumberFileComponent number={250} />
            <SharedFileComponent number={20} />
        </div>
    )
}

