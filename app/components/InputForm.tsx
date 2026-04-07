type Props = {
    name: string
    id: string
    placeholder: string
    icon: React.ReactNode
    type?: string
    readOnly?: boolean
    value?: string
}

export function InputForm({ name, id, placeholder, icon, type = "text", readOnly = false, value }: Props) {
    return (
        <div className="flex flex-col w-full gap-y-2">
            <label htmlFor={id}>{name}</label>
            <div className="flex relative">
                <span
                    className="absolute left-0 bottom-0 top-0 aspect-square flex items-center justify-center text-color2"
                >
                    {icon}
                </span>
                <input
                    type={type}
                    className={`pl-10 w-full py-3 pr-4 border border-light3 focus:outline-none focus:border-color2 rounded-full ${readOnly ? "cursor-not-allowed" : ""}`}
                    name={id}
                    id={id}
                    placeholder={placeholder}
                    readOnly={readOnly}
                    value={value}
                />
            </div>
        </div>
    )
}