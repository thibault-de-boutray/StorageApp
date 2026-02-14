export const Input = ({
    className = '',
    placeholder = '',
    value,
    type,
    onChange,
    ...props

}) => {
    return (
        <input
            className={`input ${className || ""}`}
            placeholder={placeholder}
            value={value}
            type={type}
            onChange={onChange}
            {...props}
        />
    )
}
