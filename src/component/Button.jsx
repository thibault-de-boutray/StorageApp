export const Button = ({
    className = '',
    children,
    onClick,
    href,
    ...props
}) => {
    const classes = `${className || ""}`.trim()

    if (href) {
        return (
            <a
                className={classes}
                href={href}
                {...props}
            >
                {children}
            </a>
        )
    }
    return (
        <button
            className={classes}
            onClick={onClick}
            type="submit"
            {...props}
        >
            {children}
        </button>
    )
}
