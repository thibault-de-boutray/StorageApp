

export const NumberFileComponent = ({ number }) => {

    return (
        <div className="container-secondary pl-0">
            <img src="/images/fichier.png" alt="image stockage" width={90} />
            <div className="flex flex-col ">
                <span className="text-2xl">{number}</span>
                <code className="text-lg font-light">Total Files</code>
            </div>

        </div>
    )
}
