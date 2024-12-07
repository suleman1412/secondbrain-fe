
interface LabelProps{
    children: React.ReactNode;
    onClick?: () => void
}
const Label: React.FC<LabelProps> = ({
    children,
    onClick
}) => {
  return (
    <div className="label1 flex p-2 items-center gap-2 text-[1rem] font-font1 font-semibold hover:bg-border hover:text-white 
    rounded-lg cursor-pointer hover:font-bold" onClick={onClick}>
        {children}
    </div>
  )
}

export default Label
