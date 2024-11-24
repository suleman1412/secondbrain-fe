
interface AlertProps {
    text: string
}

const Alert: React.FC<AlertProps> = ({
    text
}) => {
    return (
    <div className="px-5 py-2 text-white bg-black rounded border-border">
        {text}
    </div>
    )
} 

export default Alert
