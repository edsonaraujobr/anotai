import "./input.css"

export function Input( { type, placeholder, onChange, value, required } ) {
    return (
        <input 
            type={type} 
            className='bg-transparent border rounded-md px-2 text-white outline-none ' 
            placeholder={placeholder} 
            onChange={onChange}
            value={value}
            required={required}
        />
    )
}