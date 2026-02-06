export const SharedFileComponent = ({ number }) => {

    return (
        <div className="container-secondary pl-0">
            <img src="/images/shared.png" alt="image stockage" width={120} />
            <div className="flex flex-col">
                <span className="text-2xl">{number}</span>
                <code className="text-lg font-light">Shared with me</code>
            </div>

        </div>
    )
}
