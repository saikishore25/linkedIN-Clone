interface CustomInputProps {

	label: string
	id: string
	type?: string
	register: any
	error?: {
		message?: string
	}

}

const CustomInput= ({ label, id, type = 'text', register, error }:CustomInputProps) => {

	return (

        <>
            <div className="mb-4 text-left">
                
                <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-white mb-1">
                    {label}
                </label>

                <input
                    id={id}
                    type={type}
                    {...register(id)}
                    className={`w-full px-3 py-2 border ${
                        error ? 'border-red-500' : 'border-gray-300'
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {error?.message && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
            </div>
        </>
	)
}

export default CustomInput
