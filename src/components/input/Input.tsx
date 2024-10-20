interface InputProps {
    id: string
    type?: string
    placeholder?: string
    value?: string
    disabled?: boolean
    textSize?: string
}

export default function Input({ id, type = 'text', placeholder = '', value = '', disabled = false, textSize = 'text-md' }: InputProps) {
    return (
        <label
            htmlFor={id}
            className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
        >
            <input
                readOnly
                type={type}
                id={id}
                value={value}
                disabled={disabled}
                className={`${textSize} peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 h-12 mx-4 w-[calc(100%-2rem)]`}
                placeholder={placeholder}
            />

            <span
                className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
            >
                {placeholder}
            </span>
        </label>

    )
}