import { Dispatch, SetStateAction } from 'react'
import { useMediaQuery } from './hooks/useMediaQuery'
import Heading from './ui/Heading'
import Button from './ui/Button'
import {  useRecoilValue } from 'recoil'
import { PlusIcon, Share2Icon } from 'lucide-react'
import Card from './Card'
import ContentBlur from './ui/ContentBlur'
import { filteredContentAtom } from './recoil/atoms'
import ContentForm from './ContentForm'
import ShareModal from './ShareModal'

interface ContentProps {
  handleShareLink: () => Promise<void>;
  setModalStatus: Dispatch<SetStateAction<boolean>>;
  modalStatus: boolean,
  shareModal: boolean
  isLoading: boolean;
  sideOpen: boolean,
  setShareModal: Dispatch<SetStateAction<boolean>>
}

const Content: React.FC<ContentProps> = ({ 
  handleShareLink, 
  setModalStatus,
  modalStatus,
  shareModal,
  isLoading,
  sideOpen,
  setShareModal
  }) => {
    const isMobile = useMediaQuery()
    const displayedContent = useRecoilValue(filteredContentAtom)

    
    return (
    <>
      <ContentBlur sideOpen={sideOpen}>
        {/* Heading and Buttons */}
        <div className="flex justify-between items-center gap-2">
          <Heading variant="primary" size={`${isMobile ? 'jsm' : 'md'}`}>What I'm Learning</Heading>
          <div className="flex gap-2 md:gap-4">
            <Button
              variant="secondary"
              className={`flex gap-1 items-center  `}
              onClick={sideOpen ? undefined : handleShareLink}
              disabled={sideOpen}
            >
              <Share2Icon className={`w-4 h-4 `} />
              {!isMobile && 'Share List'}
            </Button>
            <Button
              variant="primary"
              className="flex gap-1 items-center"
              onClick={sideOpen ? undefined : () => setModalStatus(true)}
              disabled={sideOpen}
            >
              <PlusIcon className={`w-4 h-4" `} />
              {!isMobile && 'Add Content'}
            </Button>
          </div>
        </div>
        {/* Cards Container */}
        <div className="cardsContainer grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4">
          {isLoading ? (
            <p>Loading...</p>
          ) : displayedContent.length > 0 ? (
              displayedContent.map((item) => (
              <Card key={item.contentId} {...item} sideOpen={sideOpen}/> //Frontend updates automatically as displayedContent is a state variable
            ))
          ) : (
            <p>No content available</p>
          )}
      </div>
      </ContentBlur>
      {modalStatus && (
        <ContentForm onClose={() => setModalStatus(false)} />
      )}
      {shareModal && (
        <ShareModal onClick={() => setShareModal(false)} setShareModal={setShareModal}/>
      )}
    </>
    )
}

export default Content
