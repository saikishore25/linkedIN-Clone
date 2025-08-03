import { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonProps = { children: ReactNode } & ButtonHTMLAttributes<HTMLButtonElement>

const Button = ({ children, onClick, disabled = false, ...rest }: ButtonProps)=>{
    
	return (
		<button
			onClick={onClick}
			disabled={disabled}
			aria-disabled={disabled}
			className="inline-flex items-center justify-center h-10 gap-2 tracking-wide transition duration-300 rounded focus-visible:outline-none whitespace-nowrap bg-customBlue-500 hover:bg-customBlue-400 focus:bg-customBlue-400 disabled:cursor-not-allowed disabled:border-gray-300 text-white disabled:bg-gray-300 disabled:shadow-none font-bold p-4"
			{...rest}
		>
			<span className="font-bold">{children}</span>
		</button>
	)
}


export default Button;