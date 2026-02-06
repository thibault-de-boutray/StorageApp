import { NumberFileComponent } from "./NumberFileComponent"
import { SizeFileComponent } from "./SizeFileComponent"
import { SharedFileComponent } from "./SharedFileComponent"



export const DashBoardTopContainer = () => {
    return (
        <div className="flex justify-between ">
            <SizeFileComponent maxSize={193222232} size={2123432} />
            <NumberFileComponent number={10} />
            <SharedFileComponent />
        </div>
    )
}

