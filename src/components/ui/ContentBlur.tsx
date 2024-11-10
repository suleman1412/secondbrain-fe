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
    <div className={`content px-10 py-5 flex-1 mt-8 md:mt-10  ${sideOpen && 'pointer-events-none opacity-80 blur-[1px]'}`}>
        {children}
    </div>
  )
}

export default ContentBlur
