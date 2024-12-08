import {  useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { isLoggedIn, shareLink,  allContentAtom, filteredContentAtom } from "./recoil/atoms";
import axios from "axios";
import { useEffect, useState } from "react";
import Sidebar from "./ui/Sidebar";
import Card, { ContentType } from "./Card";
import Heading from "./ui/Heading";
import Button from "./ui/Button";
import { PlusIcon, Share2Icon } from "lucide-react";
import ContentForm from "./ContentForm";
import ShareModal from "./ShareModal";
import { useFetchContent } from "./hooks/useFetchContent";
import { useMediaQuery } from "./hooks/useMediaQuery";

const Dashboard = () => {
  const token = localStorage.getItem("token") || "";
  const userLogin = useRecoilValue(isLoggedIn);
  const setShareLink = useSetRecoilState(shareLink)
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [contentStore, setContentStore] = useRecoilState(allContentAtom)
  const [displayedContent, setDisplayedContent] = useRecoilState(filteredContentAtom)
  const fetchContent = useFetchContent();
  const isMobile = useMediaQuery()

  const [sideOpen, setSideOpen] = useState(isMobile ? false : true);
  const [isLoading, setIsLoading] = useState(false);
  const [modalStatus, setModalStatus] = useState(false);
  const [shareModal, setShareModal] = useState(false)
  

  useEffect(() => {
    if (userLogin && token) {
      fetchContent();
    }
  }, [userLogin, token, contentStore.length]);

  const handleContentSubmit = (newContent: ContentType) => {
    setContentStore((prevContent) => [...prevContent, newContent]);
    setDisplayedContent((prevContent) => [...prevContent, newContent]) 
    setModalStatus(false);
  };

  const handleShareLink = async () => {
    setIsLoading(true);
    setShareModal(true)
    try {
      const response = await axios.post(
        `${BASE_URL}/brain/share`,
        { share: true },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const hashedString = response.data.link;
      setShareLink(`${BASE_URL}/brain/${hashedString}`);
    } catch (error) {
      console.error("Failed to generate share link:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex ml-8">
      <Sidebar isOpen={sideOpen} toggleSidebar={() => setSideOpen((prev) => !prev)} />
      <div className="content px-6 py-5 flex-1">
        <div className="flex justify-between items-center">
          <Heading variant="primary" size={`${isMobile ? 'sm' : 'md'}`}>What I'm Learning</Heading>
          <div className="flex gap-4">
            <Button
              variant="secondary"
              className={`flex gap-1 items-center  `}
              onClick={handleShareLink}
            >
              <Share2Icon className={`w-4 h-4 `} />
              {!isMobile && 'Share List'}
            </Button>
            <Button
              variant="primary"
              className="flex gap-1 items-center"
              onClick={() => setModalStatus(true)}
            >
              <PlusIcon className={`w-4 h-4" `} />
              {!isMobile && 'Add Content'}
            </Button>
          </div>
        </div>
        <div
          className="cardsContainer grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4"
        >
          {isLoading ? (
            <p>Loading...</p>
          ) : displayedContent.length > 0 ? (
              displayedContent.map((item) => (
              <Card key={item._id} {...item} />
            ))
          ) : (
            <p>No content available</p>
          )}
        </div>
      </div>
      {modalStatus && (
        <ContentForm onClose={() => setModalStatus(false)} onSubmit={handleContentSubmit} />
      )}
      {shareModal && (
        <ShareModal onClick={() => setShareModal(false)}/>
      )}
    </div>
  );
};

export default Dashboard;
