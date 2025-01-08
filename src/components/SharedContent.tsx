import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Card, { ContentType } from './Card'
import Sidebar from './ui/Sidebar'
import Heading from './ui/Heading'
import { useMediaQuery } from './hooks/useMediaQuery'
import ContentBlur from './ui/ContentBlur'
import SearchBar from './SearchBar'

function SharedContent() {
    const { sharelink } = useParams()
    const BASE_URL = import.meta.env.VITE_BASE_URL
    const [contentStore, setContentStore] = useState<ContentType[]>([])
    const [displayedContent, setDisplayedContent] = useState<ContentType[]>([])
    const [username, setUsername] = useState<string | null>(null)
    const [error, setError] = useState(null)
    const [sideOpen, setSideOpen] = useState(false)
    const isMobile = useMediaQuery()

    useEffect(() => {
        const fetchSharedContent = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/brain/${sharelink}`)
                console.log(response.data)
                setContentStore(response.data.content)
                setDisplayedContent(response.data.content)
                setUsername(response.data.content[0].userId.username)
            } catch (err) {
                // @ts-ignore
                setError(err.response?.data?.message || 'Failed to fetch shared content')
            }
        }

        fetchSharedContent()
    }, [sharelink])

    if (error) {
        return <div>Error: {error}</div>
    }

    return (
        <>
            <Sidebar
                isOpen={sideOpen} 
                toggleSidebar={() => setSideOpen(p => !p)}
                contentStore={contentStore}
                setDisplayedContent={setDisplayedContent}
            />
            <div className='flex flex-col min-h-screen mx-auto max-w-7xl'>
                <div className='flex-1'>
                    <ContentBlur sideOpen={sideOpen}>
                        <div className='flex flex-col gap-5 px-10 py-10'>
                            {/* @ts-ignore */}
                            <Heading variant="primary" size={`${isMobile ? 'jsm' : 'md'}`}>{`${username?.charAt(0).toUpperCase() + username?.slice(1)}'s Brain`}</Heading>
                            <SearchBar contentStore={contentStore}/>
                            <div className='cardsContainer grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4'>
                            {displayedContent.length > 0 ? (
                                displayedContent.map((item) => (
                                <Card key={item.contentId} {...item} sideOpen={sideOpen} variant={true}/>
                                ))
                            ) : (
                                <p>No content available</p>
                            )}
                            </div>
                        </div>
                    </ContentBlur>
                </div>
            </div>
        </>
        
    )
}

export default SharedContent