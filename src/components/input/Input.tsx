import { useState } from 'react';

interface InputProps {
    id: string;
    type?: string;
    placeholder?: string;
    value?: string;
    disabled?: boolean;
    textSize?: string;
    setInput: (string: string) => void;
}

export default function Input({
    id,
    type = 'text',
    placeholder = '',
    value = '',
    disabled = false,
    textSize = 'text-md',
    setInput,
}: InputProps) {
    const [showPassword, setShowPassword] = useState(false);

    const isPasswordField = type === 'password';
    const inputType = isPasswordField && showPassword ? 'text' : type;

    return (
        <label
            htmlFor={id}
            className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-vibrant-green-dark focus-within:ring-1 focus-within:ring-vibrant-green-dark focus-within:ring-opacity-50"
        >
            <input
                type={inputType}
                id={id}
                value={value}
                disabled={disabled}
                className={`${textSize} peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 h-12 mx-4 w-[calc(100%-2rem)]`}
                placeholder={placeholder}
                onChange={(e) => setInput(e.target.value)}
            />

            <span
                className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
            >
                {placeholder}
            </span>

            {isPasswordField && (
                <button
                    type="button"
                    className="absolute end-2.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                    onClick={() => setShowPassword((prev) => !prev)}
                >
                    {showPassword ? (
                        <svg className='mr-2' xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#000"><path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" /></svg>
                    ) : (
                        <svg className='mr-2' xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#000"><path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z" /></svg>
                    )}
                </button>
            )}
        </label>
    );
}
