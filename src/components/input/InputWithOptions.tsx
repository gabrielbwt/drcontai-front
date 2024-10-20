"use client"

import { useState } from "react"

interface InputWithOptionsProps {
    id: string
    type?: string
    setValueId: (value: string) => void
    placeholder?: string
    withOptions?: boolean
    listOptions?: any[]
    color?: string
}

export default function InputWithOptions({ id, type = 'text', placeholder = '', color = 'bg-white', listOptions, setValueId }: InputWithOptionsProps) {

    const showSelect = true

    const [isFocused, setIsFocused] = useState(false);
    const [value, setValue] = useState('');

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setTimeout(() => setIsFocused(false), 50);

    const updatedListOptions = listOptions
        ?.filter((option) => {
            return option.descriptionTranslated.toLowerCase().includes(value.toLowerCase())
        })
        .sort((a, b) => a.descriptionTranslated.localeCompare(b.descriptionTranslated))

    function handleSelectOption(option: any) {
        setValueId(option.id)
        setValue(option.descriptionTranslated)
        setIsFocused(false)
    }

    return (
        <div className={`relative ${color}`}>
            <label
                htmlFor={id}
                className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
            >
                <input
                    type={type}
                    id={id}
                    className="peer text-sm border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 h-12 mx-4 w-[calc(100%-2rem)]"
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />

                <span
                    className={`pointer-events-none absolute rounded-sm start-2.5 top-0 -translate-y-1/2 ${color} p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs`}
                >
                    {placeholder}
                </span>
            </label>
            <div
                className={`absolute z-[55] flex flex-col w-full bg-white ${isFocused && 'border'} border-gray-300 rounded-lg left-0 top-14 ${showSelect
                    ? 'opacity-100 visible transition-opacity duration-300'
                    : 'opacity-0 invisible transition-opacity duration-300'
                    }`}
            >
                <div className="max-h-[10rem] overflow-scroll">
                    {isFocused && updatedListOptions?.map((option) => {
                        return (
                            <div key={option.id} onMouseDown={() => handleSelectOption(option)}> {/* Usando onMouseDown */}
                                <div className="h-px w-full bg-gray-200"></div>
                                <div
                                    className="flex items-center justify-start px-4 h-10 cursor-pointer hover:bg-gray-100 text-sm"
                                >
                                    {option.descriptionTranslated}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
