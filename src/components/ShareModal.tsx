import { useRecoilValue } from "recoil"
import Button from "./ui/Button"
import Heading from "./ui/Heading"
import { shareLink } from "./recoil/atoms"

interface ShareModalProps {
    onClick: () => void
}

const ShareModal: React.FC<ShareModalProps> = ({
    onClick,
}) => {
    
    const share = useRecoilValue(shareLink).toString()
    const handleCopy = () => {
        navigator.clipboard.writeText(share)
        alert('Link Copied')
    }
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-xl relative w-[500px] text-black font-font1">
                <button
                    onClick={onClick}
                    className="absolute top-3 right-4 text-gray-600 hover:text-gray-900"
                >
                    ✕
                </button>
                <div className="flex flex-col space-y-4">
                    <div className="flex flex-col -space-y-4">
                        <Heading variant="primary">
                            <span className="text-black">
                                Share List
                            </span>
                        </Heading>
                        <Heading variant="secondary">
                            <span className="text-cardColor-2 text-[1rem] ">
                                Share your list with the world
                            </span>
                        </Heading>
                    </div>
                    <div className="flex items-center gap-2 text-[0.8rem] ">
                        <input type="text" value={share} className="bg-secondary-2 text-white p-2 flex-1 rounded-lg" disabled/>
                        <Button 
                            variant="secondary" 
                            className="rounded-lg"
                            onClick={handleCopy}
                        >
                            Copy Link
                        </Button>
                    </div>
                </div>
            </div>
        </div>
            


    )
}

export default ShareModal
