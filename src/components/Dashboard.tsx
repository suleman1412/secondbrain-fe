import {  useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
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
  const userLogin = useRecoilValue(isLoggedIn);
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
    <>
      <Sidebar isOpen={sideOpen} toggleSidebar={() => setSideOpen((prev) => !prev)} />
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
    </>
  );
};

export default Dashboard;
