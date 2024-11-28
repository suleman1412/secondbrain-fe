
interface AlertProps {
    text: string
}

const Alert: React.FC<AlertProps> = ({
    text
}) => {
    return (
    <div className="px-5 py-2 text-white bg-black rounded border-border font-font1 tracking-wider font-light text-[0.75rem] 
    text-center absolute bottom-1/5 left-1/2 -translate-x-1/2 translate-y-6 z-50">
        {text}
    </div>
    )
} 

export default Alert
