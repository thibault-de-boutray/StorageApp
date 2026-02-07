import { FilesFolderContainer } from "../component/FilesPageComponent/FilesFolderContainer"



export const FilesPage = () => {
    const numbers = [10, 20, 30, 10, 20, 15]
    const size = 2.1
    const maxSize = 193.2

    return (
        <div className=" mx-auto w-[90vw] mt-15">
            <h1 className="mb-6">My Files</h1>
            <div name="container files" className="flex gap-10">
                <FilesFolderContainer numbers={numbers} size={size} maxSize={maxSize} />
            </div>
        </div>
    )
}

