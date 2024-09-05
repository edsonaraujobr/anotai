export function Input( { type, placeholder } ) {
    return (
        <input type={type} className='bg-transparent border rounded-md px-2 text-white outline-none ' placeholder={placeholder} />
    )
}