import { HTMLAttributes } from "react"
import { motion } from "framer-motion";

interface ContentBlur extends HTMLAttributes<HTMLDivElement>  {
    sideOpen: boolean
    children: React.ReactNode
}
const ContentBlur:React.FC<ContentBlur> = ({
    sideOpen,
    children
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`contentBlur flex-1 ${sideOpen && 'pointer-events-none  blur-[2px]'} `}>
      {children}
    </motion.div>
  )
}

export default ContentBlur
