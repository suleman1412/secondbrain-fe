import { PlusIcon, Share2 } from "lucide-react"
import { useSetRecoilState } from "recoil"
import { modalStatus, shareModal } from "../recoil/atoms"

const SeachSuggestions = () => {
    const setAddModalStatus = useSetRecoilState(modalStatus)
    const setShareModalStatus = useSetRecoilState(shareModal)
    const defaultOptions = [
        {
            icon: <PlusIcon />,
            text: "Add new memory",
            onClick: () => handleAddMemory
        },
        {
            icon: <Share2 />,
            text: "Share your memories",
            onClick: () => handleShareMemory
        }
    ]

    const handleAddMemory = () => {
        console.log("Adding memory clicked")
        setAddModalStatus(true)
    }

    const handleShareMemory = () => {
        console.log("Share memory clicked")
        setShareModalStatus(true)
    }
    return (
    <div className="absolute bg-cardColor-2 rounded-lg top-[50%] w-full h-[200px] pt-10 px-5 flex gap-2 flex-col"> 
        {defaultOptions.map((option, index) => (
            <div 
                key={index} 
                className="py-2 cursor-pointer  hover:bg-cardColor-1 rounded-md text-gray-600 
                hover:text-gray-200 transition-colors flex gap-2 shadow-md "
                onClick={option.onClick()}
            >
                {option.icon} {option.text}
            </div>
        ))}
    </div>
  )
}

export default SeachSuggestions
