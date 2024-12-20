import { useRecoilValue } from "recoil"
import Button from "./ui/Button"
import Heading from "./ui/Heading"
import { shareLink } from "./recoil/atoms"
interface ShareModalProps {
    onClick: () => void
    setShareModal: React.Dispatch<React.SetStateAction<boolean>>
}

const ShareModal: React.FC<ShareModalProps> = ({
    onClick,
    setShareModal
}) => {
    
    const share = useRecoilValue(shareLink).toString()
    const handleCopy = () => {
        navigator.clipboard.writeText(share)
        setShareModal(false)
    }
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-5 rounded-lg shadow-xl relative w-[300px] md:w-[350px] text-[0.75rem] lg:text-[1rem] text-black font-font1">
                <Button
                    variant="primary"
                    onClick={onClick}
                    className="absolute top-3 right-4 text-gray-600 hover:text-gray-900"
                >
                    ✕
                </Button>
                <div className="flex flex-col space-y-4">
                    <div className="flex flex-col">
                        <Heading variant="primary" size="sm">
                            <span className="text-black">
                                Share List
                            </span>
                        </Heading>
                        <Heading variant="secondary" size="xs">
                            <span className="text-cardColor-2">
                                Share your list with the world
                            </span>
                        </Heading>
                    </div>
                    <div className="flex items-center gap-2 ">
                        <input type="text" value={share} className="bg-secondary-2 text-white p-2 flex-1 rounded-lg" disabled/>
                        <Button 
                            variant="secondary" 
                            className="rounded-lg"
                            onClick={handleCopy}
                        >
                            Copy
                        </Button>
                    </div>
                </div>
            </div>
        </div>
            


    )
}

export default ShareModal
