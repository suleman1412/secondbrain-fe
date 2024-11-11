import {  useRecoilState, useSetRecoilState } from "recoil";
import { isLoggedIn, shareLink,  allContentAtom, filteredContentAtom } from "./recoil/atoms";
import axios from "axios";
import { useEffect, useState } from "react";
import Sidebar from "./ui/Sidebar";
import { ContentType } from "./Card";
import ContentForm from "./ContentForm";
import ShareModal from "./ShareModal";
import { useFetchContent } from "./hooks/useFetchContent";
import Content from "./Content";

const Dashboard = () => {
  const token = localStorage.getItem("token") || "";
  const [userLogin, setUserLogin] = useRecoilState(isLoggedIn);
  const setShareLink = useSetRecoilState(shareLink)
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [contentStore, setContentStore] = useRecoilState(allContentAtom)
  const setDisplayedContent = useSetRecoilState(filteredContentAtom)
  const fetchContent = useFetchContent();

  const [sideOpen, setSideOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modalStatus, setModalStatus] = useState(false);
  const [shareModal, setShareModal] = useState(false)
  

  useEffect(() => {
    if (userLogin && token) {
      console.log('fetching')
      console.log(userLogin)
      console.log(token)
      fetchContent();
    }
  }, [userLogin, token, contentStore.length]);

  const handleContentSubmit = (newContent: ContentType) => {
    setContentStore((prevContent) => [...prevContent, newContent]);
    setDisplayedContent((prevContent) => [...prevContent, newContent]) 
    setModalStatus(false);
  };

  const onLogout = () => {
    setUserLogin(false)
    localStorage.removeItem('token')
  }

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
      setShareLink(`${import.meta.env.VITE_FRONTEND_URL}/shared/${hashedString}`);
    } catch (error) {
      console.error("Failed to generate share link:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Sidebar 
        isOpen={sideOpen} 
        toggleSidebar={() => setSideOpen((prev) => !prev)} 
        contentStore={contentStore}
        setDisplayedContent={setDisplayedContent}
        showLogout={true}
        onLogout={onLogout}
      />
      <div className="flex flex-col min-h-screen mx-auto max-w-7xl">
        <Content 
          handleShareLink={handleShareLink} 
          setModalStatus={setModalStatus} 
          isLoading={isLoading}
          sideOpen={sideOpen}
        />
        {modalStatus && (
          <ContentForm onClose={() => setModalStatus(false)} onSubmit={handleContentSubmit} />
        )}
        {shareModal && (
          <ShareModal onClick={() => setShareModal(false)}/>
        )}
      </div>
    </>
  );
};

export default Dashboard;
