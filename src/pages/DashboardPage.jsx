import { DashBoardTopContainer } from "../assets/component/DashBoardComponent/DashBoadTopContainer"
import { useUserContext } from "../Context/UserContext"

export const DashboardPage = () => {
    const { user } = useUserContext()
    return (
        <div className="flex flex-col mt-10 mx-auto bg-black w-[80vw] space-y-6">
            <h1 className="block text-4xl">
                Welcome {user.identifiant}
            </h1>
            <DashBoardTopContainer />
        </div>
    )
}
