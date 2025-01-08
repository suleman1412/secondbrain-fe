import { useMediaQuery } from './hooks/useMediaQuery'
import Heading from './ui/Heading'
import Button from './ui/Button'
import {  useRecoilState, useRecoilValue } from 'recoil'
import { PlusIcon, Share2Icon } from 'lucide-react'
import Card from './Card'
import ContentBlur from './ui/ContentBlur'
import { filteredContentAtom, modalStatus, shareModal } from './recoil/atoms'
import ContentForm from './ContentForm'
import ShareModal from './ShareModal'
import SearchBar from './SearchBar'

interface ContentProps {
  handleShareLink: () => Promise<void>;
  sideOpen: boolean,
}

const Content: React.FC<ContentProps> = ({ 
  handleShareLink, 
  sideOpen,
  }) => {
    const isMobile = useMediaQuery()
    const displayedContent = useRecoilValue(filteredContentAtom)
    const [AddModalStatus, setAddModalStatus] = useRecoilState(modalStatus)
    const ShareModalStatus = useRecoilValue(shareModal)
    
    return (
    <>
      <ContentBlur sideOpen={sideOpen}>
        <div className='layoutContainer flex flex-col px-10 py-10 gap-10'>
          <SearchBar contentStore={displayedContent}/>
          <div className='contentContainer min-h-[80vh]'>
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
                  onClick={sideOpen ? undefined : () => setAddModalStatus(true)}
                  disabled={sideOpen}
                >
                  <PlusIcon className={`w-4 h-4" `} />
                  {!isMobile && 'Add Content'}
                </Button>
              </div>
            </div>
            <div className="cardsContainer grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4">
              {displayedContent.length > 0 ? 
                (
                  displayedContent.map((item) => (
                  <Card key={item.contentId} {...item} sideOpen={sideOpen}/> //Frontend updates automatically as displayedContent is a state variable
                ))
              ) : (
                <p>No content available</p>
              )}
            </div>
          </div>  
        </div>
      </ContentBlur>
      
      {AddModalStatus && (
        <ContentForm onClose={() => setAddModalStatus(false)}  />
      )}
      {ShareModalStatus && (
        <ShareModal/>
      )}
    </>
    )
}



export default Content
