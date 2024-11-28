
interface HeadingProps {
    children: React.ReactNode
    variant: "primary" | "secondary" 
    className?: string
    size: "sm" | "md" | "lg" | "xs"
}

const sizeStyles = {
    "xs": "text-[0.7rem] md:text-[0.8rem] lg:text-[1rem]",
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
        className, 
        size
    }
) => {
    return(
        <h1 className={`${variantStyles[variant]} ${sizeStyles[size]} ${className}`}>
            {children}
        </h1>
    )
}

export default Heading;