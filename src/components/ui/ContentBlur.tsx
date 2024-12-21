import { HTMLAttributes } from "react"

interface ContentBlur extends HTMLAttributes<HTMLDivElement>  {
    sideOpen: boolean
    children: React.ReactNode
}
const ContentBlur:React.FC<ContentBlur> = ({
    sideOpen,
    children
}) => {
  return (
    <div className={`content flex-1   ${sideOpen && 'pointer-events-none opacity-80 blur-[1px]'}`}>
        {children}
    </div>
  )
}

export default ContentBlur
