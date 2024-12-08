
interface HeadingProps {
    children: React.ReactNode
    variant: "primary" | "secondary" 
    className?: string
    size?: "sm" | "md" | "lg" | "xs" | "jsm"
}

const sizeStyles = {
    "xs": "text-[0.8rem] md:text-[0.9rem] lg:text-[1.1rem]",
    "jsm": "text-[1.1rem] md:text-[1.3rem] lg:text-[1.5rem]",
    "sm": "text-[1.2rem] md:text-[1.5rem] lg:text-[2rem]",
    "md": "text-[2rem] md:text-[2.3rem] lg:text-[2.5rem]",
    "lg": "text-[2.5rem] md:text-[3.5rem] lg:text-[4rem]"
}
const variantStyles = {
    "primary" : "font-font1 font-semibold tracking-tight text-text ",
    "secondary": "font-semibold text-border",
}

const Heading: React.FC<HeadingProps> = (
    {
        children,
        variant,
        className='', 
        size='sm'
    }
) => {
    return(
        <div className={`${variantStyles[variant]} ${sizeStyles[size]} ${className}`}>
            {children}
        </div>
    )
}

export default Heading;