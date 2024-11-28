
interface LabelProps{
    children: React.ReactNode;
}
const Label: React.FC<LabelProps> = ({
    children,
}) => {
  return (
    <div className="label1 flex p-2 items-center gap-2 text-border text-[1rem] font-font1 font-semibold hover:bg-border hover:text-white 
    rounded-lg cursor-pointer hover:font-bold">
        {children}
    </div>
  )
}

export default Label
